/**
 * Helios Solar OS - Solar Rooftop PV Sizing & 25-Year Financial ROI Model
 */

import { sound } from './audio.js';

export class SolarCalculator {
  constructor(appState) {
    this.appState = appState;
    this.canvas = null;
    this.ctx = null;

    // Default Parameters
    this.params = {
      roofArea: 80, // m²
      panelType: 'topcon', // monocrystalline, bifacial, poly, topcon
      locationPsh: 5.2, // Peak Sun Hours / day
      tiltAngle: 25, // degrees
      azimuth: 'south', // south, southwest, southeast, east, west
      shadingLoss: 5, // %
      electricityRate: 0.16, // $/kWh
      feedInTariff: 0.08, // $/kWh
      batteryBackup: 'lifepo4', // none, lifepo4, agm
      autonomyDays: 1, // days
      incentivePercent: 30 // % (e.g. Federal Solar Tax Credit / ITC)
    };

    // Panel Tech Constants
    this.panelSpecs = {
      topcon: { name: 'N-Type TOPCon (440W)', efficiency: 0.228, costPerWatt: 0.85, watts: 440, areaPerPanel: 1.95 },
      mono: { name: 'Monocrystalline PERC (410W)', efficiency: 0.212, costPerWatt: 0.78, watts: 410, areaPerPanel: 1.95 },
      bifacial: { name: 'Bifacial Glass-Glass (430W)', efficiency: 0.222, costPerWatt: 0.92, watts: 430, areaPerPanel: 1.95 },
      poly: { name: 'Polycrystalline Standard (330W)', efficiency: 0.175, costPerWatt: 0.65, watts: 330, areaPerPanel: 1.95 }
    };
  }

  init() {
    this.canvas = document.getElementById('roof-tilt-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }

    this.bindInputs();
    this.calculate();
    this.drawRoofVisualizer();
  }

  bindInputs() {
    // Roof Area Slider
    const areaInput = document.getElementById('calc-area-input');
    const areaVal = document.getElementById('calc-area-val');
    if (areaInput) {
      areaInput.addEventListener('input', (e) => {
        this.params.roofArea = parseFloat(e.target.value);
        if (areaVal) areaVal.textContent = `${this.params.roofArea} m² (${Math.round(this.params.roofArea * 10.764)} sq ft)`;
        this.calculate();
      });
    }

    // Tilt Slider
    const tiltInput = document.getElementById('calc-tilt-input');
    const tiltVal = document.getElementById('calc-tilt-val');
    if (tiltInput) {
      tiltInput.addEventListener('input', (e) => {
        this.params.tiltAngle = parseFloat(e.target.value);
        if (tiltVal) tiltVal.textContent = `${this.params.tiltAngle}°`;
        this.calculate();
        this.drawRoofVisualizer();
      });
    }

    // Shading Slider
    const shadeInput = document.getElementById('calc-shade-input');
    const shadeVal = document.getElementById('calc-shade-val');
    if (shadeInput) {
      shadeInput.addEventListener('input', (e) => {
        this.params.shadingLoss = parseFloat(e.target.value);
        if (shadeVal) shadeVal.textContent = `${this.params.shadingLoss}%`;
        this.calculate();
      });
    }

    // Tariff Slider
    const tariffInput = document.getElementById('calc-tariff-input');
    const tariffVal = document.getElementById('calc-tariff-val');
    if (tariffInput) {
      tariffInput.addEventListener('input', (e) => {
        this.params.electricityRate = parseFloat(e.target.value);
        if (tariffVal) tariffVal.textContent = `$${this.params.electricityRate.toFixed(2)}/kWh`;
        this.calculate();
      });
    }

    // Panel Type Select
    const panelSelect = document.getElementById('calc-panel-type');
    if (panelSelect) {
      panelSelect.addEventListener('change', (e) => {
        this.params.panelType = e.target.value;
        this.calculate();
      });
    }

    // Location / PSH Select
    const locSelect = document.getElementById('calc-location-psh');
    if (locSelect) {
      locSelect.addEventListener('change', (e) => {
        this.params.locationPsh = parseFloat(e.target.value);
        this.calculate();
      });
    }

    // Azimuth Select
    const azSelect = document.getElementById('calc-azimuth');
    if (azSelect) {
      azSelect.addEventListener('change', (e) => {
        this.params.azimuth = e.target.value;
        this.calculate();
      });
    }

    // Battery Select
    const batSelect = document.getElementById('calc-battery-type');
    if (batSelect) {
      batSelect.addEventListener('change', (e) => {
        this.params.batteryBackup = e.target.value;
        this.calculate();
      });
    }
  }

  calculate() {
    const spec = this.panelSpecs[this.params.panelType];

    // Number of panels that fit usable area (assume 80% packing factor)
    const usableArea = this.params.roofArea * 0.82;
    const numPanels = Math.floor(usableArea / spec.areaPerPanel);
    const systemSizeKWp = parseFloat(((numPanels * spec.watts) / 1000).toFixed(2));

    // Tilt & Orientation Derating Factor
    let orientationFactor = 1.0;
    if (this.params.azimuth === 'southwest' || this.params.azimuth === 'southeast') orientationFactor = 0.95;
    else if (this.params.azimuth === 'east' || this.params.azimuth === 'west') orientationFactor = 0.85;

    // Ideal tilt comparison (assume ~30 deg ideal)
    const tiltLoss = Math.abs(30 - this.params.tiltAngle) * 0.003;
    const tiltFactor = Math.max(0.85, 1 - tiltLoss);

    // Balance of System (BoS) & Shading derate
    const systemEfficiency = 0.82 * (1 - this.params.shadingLoss / 100);

    // Annual Energy Output (kWh)
    const dailyKWh = systemSizeKWp * this.params.locationPsh * orientationFactor * tiltFactor * systemEfficiency;
    const annualKWh = Math.round(dailyKWh * 365);

    // Battery Storage Sizing
    let batteryKWh = 0;
    let batteryCost = 0;
    if (this.params.batteryBackup === 'lifepo4') {
      batteryKWh = Math.round(dailyKWh * 0.6 * this.params.autonomyDays);
      batteryCost = batteryKWh * 450; // $450/kWh installed
    } else if (this.params.batteryBackup === 'agm') {
      batteryKWh = Math.round(dailyKWh * 1.0 * this.params.autonomyDays); // 50% DoD limit
      batteryCost = batteryKWh * 280;
    }

    // Financial Modeling
    const pvCapex = systemSizeKWp * 1000 * spec.costPerWatt + (systemSizeKWp * 350); // Inverter & racking BoS
    const totalCapex = Math.round(pvCapex + batteryCost);
    const taxIncentive = Math.round(totalCapex * (this.params.incentivePercent / 100));
    const netCapex = totalCapex - taxIncentive;

    // Annual Savings (80% self-consumed @ retail rate, 20% exported @ feed-in tariff)
    const selfConsumedKWh = annualKWh * 0.78;
    const exportedKWh = annualKWh * 0.22;
    const annualSavings = Math.round(selfConsumedKWh * this.params.electricityRate + exportedKWh * this.params.feedInTariff);

    // Simple Payback Period
    const paybackYears = annualSavings > 0 ? parseFloat((netCapex / annualSavings).toFixed(1)) : 99;

    // 25-Year Lifetime Savings & Net Present Value (NPV @ 4% discount rate, 0.5% annual panel degradation)
    let npv = -netCapex;
    let lifetimeSavings = 0;
    const discountRate = 0.04;

    for (let yr = 1; yr <= 25; yr++) {
      const yearDegradation = Math.pow(1 - 0.005, yr - 1);
      const yrSaving = annualSavings * yearDegradation;
      lifetimeSavings += yrSaving;
      npv += yrSaving / Math.pow(1 + discountRate, yr);
    }
    npv = Math.round(npv);
    lifetimeSavings = Math.round(lifetimeSavings);

    // Levelized Cost of Electricity (LCOE in $/kWh)
    const totalLifetimeKWh = annualKWh * 23.5;
    const lcoe = totalLifetimeKWh > 0 ? ((netCapex + (totalCapex * 0.015 * 25)) / totalLifetimeKWh).toFixed(3) : 0;

    // Environmental Offset
    // EPA average: ~0.85 lbs CO2 per kWh (approx 0.385 kg CO2/kWh)
    const co2TonsPerYear = parseFloat(((annualKWh * 0.385) / 1000).toFixed(1));
    const treesPlanted = Math.round(co2TonsPerYear * 45);

    // Update UI elements
    this.setElemText('res-system-size', `${systemSizeKWp} kWp`);
    this.setElemText('res-panel-count', `${numPanels} Panels`);
    this.setElemText('res-annual-yield', `${annualKWh.toLocaleString()} kWh`);
    this.setElemText('res-payback', `${paybackYears} yrs`);
    this.setElemText('res-net-capex', `$${netCapex.toLocaleString()}`);
    this.setElemText('res-annual-savings', `$${annualSavings.toLocaleString()}/yr`);
    this.setElemText('res-25yr-npv', `$${npv.toLocaleString()}`);
    this.setElemText('res-lcoe', `$${lcoe}/kWh`);
    this.setElemText('res-co2-offset', `${co2TonsPerYear} tons/yr`);
    this.setElemText('res-trees-equiv', `${treesPlanted} Trees`);
    this.setElemText('res-battery-size', batteryKWh > 0 ? `${batteryKWh} kWh (${Math.round((batteryKWh * 1000) / 48)} Ah)` : 'None');

    // Notify app to update financial chart
    if (this.appState && this.appState.onFinancialUpdate) {
      this.appState.onFinancialUpdate({
        netCapex,
        annualSavings,
        paybackYears,
        npv,
        annualKWh
      });
    }

    this.results = {
      systemSizeKWp,
      numPanels,
      annualKWh,
      dailyKWh: Math.round(dailyKWh),
      totalCapex,
      taxIncentive,
      netCapex,
      annualSavings,
      paybackYears,
      npv,
      lifetimeSavings,
      lcoe,
      co2TonsPerYear,
      treesPlanted,
      batteryKWh,
      panelName: spec.name
    };
  }

  drawRoofVisualizer() {
    if (!this.canvas || !this.ctx) return;
    const w = this.canvas.width = this.canvas.clientWidth;
    const h = this.canvas.height = this.canvas.clientHeight;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h - 30;
    const roofLen = 140;
    const rad = (this.params.tiltAngle * Math.PI) / 180;

    // Ground Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, cy);
    ctx.lineTo(w - 30, cy);
    ctx.stroke();

    // Angled Roof Surface
    const x2 = cx + roofLen * Math.cos(rad);
    const y2 = cy - roofLen * Math.sin(rad);

    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy);
    ctx.lineTo(x2 - 30, y2);
    ctx.stroke();

    // Solar Panels on Roof
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - 28, cy - 4);
    ctx.lineTo(x2 - 28, y2 - 4);
    ctx.stroke();

    // Solar Incident Sun Rays
    const sunAngle = Math.PI / 3;
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    for (let i = 0; i < 4; i++) {
      const rayStartX = cx + i * 25 - 40;
      const rayStartY = 20;
      ctx.beginPath();
      ctx.moveTo(rayStartX, rayStartY);
      ctx.lineTo(rayStartX + 35, rayStartY + 60);
      ctx.stroke();
    }
    ctx.restore();

    // Angle label arc
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx - 30, cy, 40, -rad, 0);
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px JetBrains Mono';
    ctx.fillText(`${this.params.tiltAngle}° Tilt`, cx + 25, cy - 12);
  }

  generateProposalModal() {
    sound.playClick();
    const modal = document.getElementById('proposal-modal');
    if (!modal || !this.results) return;

    const body = document.getElementById('proposal-modal-body');
    if (body) {
      body.innerHTML = `
        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; margin-bottom: 1.25rem;">
          <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: #fff;">Solar Proposal & Investment Summary</h3>
          <p style="color: #94a3b8; font-size: 0.85rem;">Generated by Helios Solar OS Sizing Engine</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem;">
          <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px;">
            <strong style="color: var(--solar-gold); display: block; margin-bottom: 0.4rem;">System Architecture</strong>
            <div>Panel Model: ${this.results.panelName}</div>
            <div>Installed Size: <strong>${this.results.systemSizeKWp} kWp</strong> (${this.results.numPanels} modules)</div>
            <div>Est. Generation: <strong>${this.results.annualKWh.toLocaleString()} kWh/yr</strong></div>
            <div>Battery Backup: <strong>${this.results.batteryKWh} kWh</strong></div>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px;">
            <strong style="color: var(--aurora-emerald); display: block; margin-bottom: 0.4rem;">Financial Outlook</strong>
            <div>Total CAPEX: <strong>$${this.results.totalCapex.toLocaleString()}</strong></div>
            <div>Tax Credit (30%): <strong>-$${this.results.taxIncentive.toLocaleString()}</strong></div>
            <div>Net Investment: <strong>$${this.results.netCapex.toLocaleString()}</strong></div>
            <div>Annual Savings: <strong>$${this.results.annualSavings.toLocaleString()}/yr</strong></div>
            <div>Simple Payback: <strong>${this.results.paybackYears} Years</strong></div>
          </div>
        </div>
        <div style="background: linear-gradient(135deg, rgba(6,182,212,0.15), rgba(16,185,129,0.15)); border: 1px solid var(--border-cyan); border-radius: 12px; padding: 1rem; text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 0.9rem; font-weight: 700; color: #fff;">25-Year Net Present Value (NPV): $${this.results.npv.toLocaleString()}</div>
          <div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.2rem;">Lifetime Savings: $${this.results.lifetimeSavings.toLocaleString()} • CO₂ Avoided: ${this.results.co2TonsPerYear * 25} Metric Tons</div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
          <button class="btn-secondary" onclick="window.print()">Print / Export PDF</button>
          <button class="btn-primary" id="btn-close-proposal">Close</button>
        </div>
      `;
    }

    modal.classList.add('active');

    const closeBtn = document.getElementById('btn-close-proposal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }
  }

  setElemText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
}
