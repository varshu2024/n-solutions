/**
 * Helios Solar OS - Real-time Solar IoT & Inverter/Battery Telemetry
 * Live telemetry simulator, animated topology flows, MPPT metrics, smart switches.
 */

import { sound } from './audio.js';

export class SolarTelemetryHub {
  constructor(appState) {
    this.appState = appState;
    this.intervalId = null;

    // Base state
    this.solarPower = 6.45; // kW
    this.batterySoC = 78.4; // %
    this.batteryPower = 1.85; // kW (+ charging, - discharging)
    this.homeLoad = 3.20; // kW
    this.gridPower = 1.40; // kW (+ export, - import)
    this.inverterEfficiency = 97.8; // %
    this.weather = 'sunny'; // sunny, cloudy, overcast, night

    // Smart Loads
    this.smartLoads = {
      ev: { name: 'EV Supercharger', power: 3.5, active: false },
      heatpump: { name: 'Heat Pump HVAC', power: 1.8, active: true },
      ac: { name: 'Smart Climate AC', power: 1.2, active: false },
      waterHeater: { name: 'Solar Thermal Booster', power: 1.0, active: true }
    };

    // MPPT Strings
    this.mppt = {
      string1: { voltage: 382.4, current: 8.45, temp: 42.1 },
      string2: { voltage: 378.1, current: 8.52, temp: 41.8 }
    };

    // Events
    this.eventLogs = [];
  }

  init() {
    this.bindSmartSwitches();
    this.bindWeatherControls();
    this.startStreaming();
    this.logEvent('System Online: Smart Inverter synchronized with grid & battery bank.', 'success');
  }

  bindSmartSwitches() {
    Object.keys(this.smartLoads).forEach((key) => {
      const checkbox = document.getElementById(`switch-${key}`);
      if (checkbox) {
        checkbox.checked = this.smartLoads[key].active;
        checkbox.addEventListener('change', (e) => {
          this.smartLoads[key].active = e.target.checked;
          const card = document.getElementById(`card-${key}`);
          if (card) {
            if (e.target.checked) card.classList.add('load-on');
            else card.classList.remove('load-on');
          }
          sound.playSwitch(e.target.checked);
          this.logEvent(`Smart Load ${this.smartLoads[key].name} toggled ${e.target.checked ? 'ON (+ ' + this.smartLoads[key].power + ' kW)' : 'OFF'}.`, 'info');
          this.computePowerBalance();
          this.updateUI();
        });
      }
    });
  }

  bindWeatherControls() {
    const weatherBtns = document.querySelectorAll('.weather-filter-btn');
    weatherBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        weatherBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.weather = btn.dataset.weather;
        sound.playClick();
        this.logEvent(`Weather condition switched to ${this.weather.toUpperCase()}.`, 'warning');
        this.computePowerBalance();
        this.updateUI();
      });
    });
  }

  setWeather(condition) {
    this.weather = condition;
    this.computePowerBalance();
    this.updateUI();
  }

  startStreaming() {
    this.intervalId = setInterval(() => {
      this.streamTick();
    }, 2000);
  }

  streamTick() {
    // Add realistic sensor jitter
    const jitter = (Math.random() - 0.5) * 0.15;

    // Weather impact on solar production
    let weatherFactor = 1.0;
    if (this.weather === 'cloudy') weatherFactor = 0.55;
    else if (this.weather === 'overcast') weatherFactor = 0.22;
    else if (this.weather === 'night') weatherFactor = 0.0;

    const baseSolar = 7.2 * weatherFactor;
    this.solarPower = Math.max(0, parseFloat((baseSolar + jitter).toFixed(2)));

    // MPPT updates
    if (this.solarPower > 0) {
      this.mppt.string1.voltage = +(380 + (Math.random() - 0.5) * 6).toFixed(1);
      this.mppt.string1.current = +(this.solarPower * 1.3 + (Math.random() - 0.5) * 0.4).toFixed(2);
      this.mppt.string2.voltage = +(376 + (Math.random() - 0.5) * 6).toFixed(1);
      this.mppt.string2.current = +(this.solarPower * 1.28 + (Math.random() - 0.5) * 0.4).toFixed(2);
    } else {
      this.mppt.string1.voltage = 12.0;
      this.mppt.string1.current = 0.0;
      this.mppt.string2.voltage = 11.5;
      this.mppt.string2.current = 0.0;
    }

    this.computePowerBalance();
    this.updateUI();

    // Trigger chart update in app
    if (this.appState && this.appState.onTelemetryTick) {
      this.appState.onTelemetryTick({
        solar: this.solarPower,
        load: this.homeLoad,
        battery: this.batteryPower,
        soc: this.batterySoC,
        grid: this.gridPower
      });
    }
  }

  computePowerBalance() {
    // Calculate total home load from base load (1.2 kW) + active smart loads
    let currentLoad = 1.20;
    Object.values(this.smartLoads).forEach(item => {
      if (item.active) currentLoad += item.power;
    });
    this.homeLoad = parseFloat(currentLoad.toFixed(2));

    // Power differential (Solar - Load)
    const netSurplus = this.solarPower - this.homeLoad;

    if (netSurplus >= 0) {
      // Solar is covering home load! Surplus goes to Battery first, then Grid
      if (this.batterySoC < 98) {
        this.batteryPower = parseFloat(Math.min(3.5, netSurplus).toFixed(2)); // Charge battery up to 3.5 kW
        this.batterySoC = Math.min(100, parseFloat((this.batterySoC + this.batteryPower * 0.02).toFixed(2)));
        this.gridPower = parseFloat((netSurplus - this.batteryPower).toFixed(2)); // Export surplus
      } else {
        this.batteryPower = 0.05; // Trickle
        this.gridPower = parseFloat(netSurplus.toFixed(2)); // Export all to grid
      }
    } else {
      // Deficit: Solar cannot cover all loads. Draw from Battery first, then Grid
      const deficit = Math.abs(netSurplus);
      if (this.batterySoC > 15) {
        this.batteryPower = -parseFloat(Math.min(3.5, deficit).toFixed(2)); // Discharging
        this.batterySoC = Math.max(10, parseFloat((this.batterySoC + this.batteryPower * 0.02).toFixed(2)));
        const remainingDeficit = deficit - Math.abs(this.batteryPower);
        this.gridPower = -parseFloat(remainingDeficit.toFixed(2)); // Import remaining
      } else {
        this.batteryPower = 0; // Battery low reserve
        this.gridPower = -parseFloat(deficit.toFixed(2)); // Import all deficit from grid
      }
    }
  }

  updateUI() {
    // 1. Overview Metric Cards
    this.setElemText('metric-solar-power', `${this.solarPower.toFixed(2)}`);
    this.setElemText('metric-battery-soc', `${this.batterySoC.toFixed(1)}%`);
    this.setElemText('metric-home-load', `${this.homeLoad.toFixed(2)}`);
    
    const gridValElem = document.getElementById('metric-grid-power');
    const gridLabelElem = document.getElementById('metric-grid-label');
    if (gridValElem) {
      gridValElem.textContent = Math.abs(this.gridPower).toFixed(2);
    }
    if (gridLabelElem) {
      gridLabelElem.textContent = this.gridPower >= 0 ? 'Exporting to Grid' : 'Importing from Grid';
    }

    // Metric Progress Fills
    const solarFill = document.getElementById('fill-solar');
    if (solarFill) solarFill.style.width = `${Math.min(100, (this.solarPower / 10) * 100)}%`;

    const batteryFill = document.getElementById('fill-battery');
    if (batteryFill) batteryFill.style.width = `${this.batterySoC}%`;

    const loadFill = document.getElementById('fill-load');
    if (loadFill) loadFill.style.width = `${Math.min(100, (this.homeLoad / 8) * 100)}%`;

    const gridFill = document.getElementById('fill-grid');
    if (gridFill) gridFill.style.width = `${Math.min(100, (Math.abs(this.gridPower) / 6) * 100)}%`;

    // 2. Topology Node Values
    this.setElemText('topo-solar-val', `${this.solarPower.toFixed(2)} kW`);
    this.setElemText('topo-inverter-val', `${(this.solarPower * (this.inverterEfficiency / 100)).toFixed(2)} kW`);
    this.setElemText('topo-battery-val', `${this.batterySoC.toFixed(1)}% (${this.batteryPower >= 0 ? '+' : ''}${this.batteryPower.toFixed(2)} kW)`);
    this.setElemText('topo-home-val', `${this.homeLoad.toFixed(2)} kW`);
    this.setElemText('topo-grid-val', `${this.gridPower >= 0 ? 'Export ' : 'Import '}${Math.abs(this.gridPower).toFixed(2)} kW`);

    // 3. Topology Flow Wire Dynamic Animation
    this.updateFlowWires();

    // 4. MPPT Telemetry
    this.setElemText('mppt1-v', `${this.mppt.string1.voltage} V`);
    this.setElemText('mppt1-i', `${this.mppt.string1.current} A`);
    this.setElemText('mppt1-p', `${((this.mppt.string1.voltage * this.mppt.string1.current) / 1000).toFixed(2)} kW`);

    this.setElemText('mppt2-v', `${this.mppt.string2.voltage} V`);
    this.setElemText('mppt2-i', `${this.mppt.string2.current} A`);
    this.setElemText('mppt2-p', `${((this.mppt.string2.voltage * this.mppt.string2.current) / 1000).toFixed(2)} kW`);
  }

  updateFlowWires() {
    const wireSolar = document.getElementById('wire-solar-inverter');
    const wireBattery = document.getElementById('wire-inverter-battery');
    const wireHome = document.getElementById('wire-inverter-home');
    const wireGrid = document.getElementById('wire-inverter-grid');

    if (wireSolar) {
      if (this.solarPower > 0.1) wireSolar.classList.add('active-flow', 'solar-flow');
      else wireSolar.classList.remove('active-flow');
    }

    if (wireBattery) {
      if (Math.abs(this.batteryPower) > 0.1) {
        wireBattery.classList.add('active-flow', 'battery-flow');
      } else {
        wireBattery.classList.remove('active-flow');
      }
    }

    if (wireHome) {
      wireHome.classList.add('active-flow', 'home-flow');
    }

    if (wireGrid) {
      if (Math.abs(this.gridPower) > 0.1) {
        wireGrid.classList.add('active-flow', 'grid-flow');
      } else {
        wireGrid.classList.remove('active-flow');
      }
    }
  }

  logEvent(message, type = 'info') {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const item = { time: timeStr, message, type };
    this.eventLogs.unshift(item);
    if (this.eventLogs.length > 25) this.eventLogs.pop();

    const container = document.getElementById('event-log-list');
    if (!container) return;

    const div = document.createElement('div');
    div.className = `event-log-item ${type}`;
    div.innerHTML = `
      <span>${message}</span>
      <span class="event-time">${timeStr}</span>
    `;
    container.prepend(div);
    if (container.children.length > 25) {
      container.removeChild(container.lastChild);
    }
  }

  setElemText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  destroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
