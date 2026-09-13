/**
 * Helios Solar OS - 3D Solar System & Heliocentric Radiation Observatory
 * Powered by Three.js
 */

import * as THREE from 'three';

export class Solar3DSystem {
  constructor(canvasId, isMini = false) {
    this.canvas = document.getElementById(canvasId);
    this.isMini = isMini;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.planets = [];
    this.orbitLines = [];
    this.mode = 'orrery'; // 'orrery' or 'radiation'
    this.speedMultiplier = 1.0;
    this.isPaused = false;
    this.selectedPlanet = null;
    this.animationFrameId = null;

    // Camera control state
    this.isDragging = false;
    this.prevMousePos = { x: 0, y: 0 };
    this.spherical = { radius: this.isMini ? 45 : 120, theta: Math.PI / 4, phi: Math.PI / 3.5 };
    this.targetLookAt = new THREE.Vector3(0, 0, 0);

    // Astronomical Planetary Data
    this.planetData = [
      { name: 'Mercury', radius: 1.2, dist: 18, color: 0xa5a5a5, speed: 0.04, tilt: 0.03, temp: '167°C', irradiance: '9,126 W/m²', desc: 'Smallest planet with intense solar exposure.' },
      { name: 'Venus', radius: 2.2, dist: 28, color: 0xe3bb76, speed: 0.015, tilt: 3.1, temp: '464°C', irradiance: '2,613 W/m²', desc: 'Extreme runaway greenhouse effect with thick atmosphere.' },
      { name: 'Earth', radius: 2.4, dist: 42, color: 0x228be6, speed: 0.01, tilt: 0.41, temp: '15°C', irradiance: '1,361 W/m²', desc: 'Home planet, optimal solar habitable zone (1 AU).' },
      { name: 'Mars', radius: 1.6, dist: 56, color: 0xe05638, speed: 0.008, tilt: 0.44, temp: '-65°C', irradiance: '589 W/m²', desc: 'The Red Planet, receiving ~43% of Earth solar flux.' },
      { name: 'Jupiter', radius: 5.5, dist: 78, color: 0xd4a373, speed: 0.002, tilt: 0.05, temp: '-110°C', irradiance: '50 W/m²', desc: 'Gas giant with powerful magnetosphere and radiation belts.' },
      { name: 'Saturn', radius: 4.6, dist: 98, color: 0xf4d06f, speed: 0.0009, tilt: 0.47, temp: '-140°C', irradiance: '15 W/m²', desc: 'Famous for its stunning planetary ring system.' },
      { name: 'Uranus', radius: 3.2, dist: 118, color: 0x70d6ff, speed: 0.0004, tilt: 1.7, temp: '-195°C', irradiance: '3.7 W/m²', desc: 'Ice giant rotating on its side at a 97.8° tilt.' },
      { name: 'Neptune', radius: 3.1, dist: 136, color: 0x3a86ff, speed: 0.0001, tilt: 0.49, temp: '-200°C', irradiance: '1.5 W/m²', desc: 'Farthest major planet, supersonic dark storm winds.' }
    ];

    this.init();
  }

  init() {
    if (!this.canvas) return;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight || 1;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 2000);
    this.updateCameraPosition();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x334155, 0.4);
    this.scene.add(ambientLight);

    const sunPointLight = new THREE.PointLight(0xfff7ed, 3.5, 800, 0.6);
    this.scene.add(sunPointLight);

    // Build Skybox / Starfield
    this.createStarfield();

    // Build Sun
    this.createSun();

    // Build Planets & Orbits
    this.createPlanetarySystem();

    // Build Earth Solar Radiation Rays
    this.createRadiationBeams();

    // Input listeners
    this.setupInteractions();

    // Resize observer
    window.addEventListener('resize', () => this.onResize());

    // Start loop
    this.animate();
  }

  createStarfield() {
    const starCount = this.isMini ? 800 : 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const dist = THREE.MathUtils.randFloat(300, 900);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = dist * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = dist * Math.cos(phi);

      const tint = Math.random();
      if (tint > 0.8) {
        colors[i] = 0.9; colors[i + 1] = 0.8; colors[i + 2] = 1.0;
      } else if (tint > 0.6) {
        colors[i] = 1.0; colors[i + 1] = 0.9; colors[i + 2] = 0.7;
      } else {
        colors[i] = 0.8; colors[i + 1] = 0.9; colors[i + 2] = 1.0;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starField = new THREE.Points(geometry, material);
    this.scene.add(starField);
  }

  createSun() {
    const sunRadius = this.isMini ? 5 : 8;
    const sunGeo = new THREE.SphereGeometry(sunRadius, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffb703
    });
    this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
    this.scene.add(this.sunMesh);

    // Glowing Corona Outer Shell
    const glowGeo = new THREE.SphereGeometry(sunRadius * 1.35, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.28,
      side: THREE.BackSide
    });
    this.sunGlow = new THREE.Mesh(glowGeo, glowMat);
    this.sunMesh.add(this.sunGlow);

    const coronaOuterGeo = new THREE.SphereGeometry(sunRadius * 1.7, 32, 32);
    const coronaOuterMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide
    });
    this.sunCorona = new THREE.Mesh(coronaOuterGeo, coronaOuterMat);
    this.sunMesh.add(this.sunCorona);
  }

  createPlanetarySystem() {
    this.planets = [];
    const planetsToLoad = this.isMini ? this.planetData.slice(0, 4) : this.planetData;

    planetsToLoad.forEach((data) => {
      // Orbit Line
      const orbitGeo = new THREE.RingGeometry(data.dist - 0.1, data.dist + 0.1, 96);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0x334155,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
      orbitRing.rotation.x = Math.PI / 2;
      this.scene.add(orbitRing);
      this.orbitLines.push(orbitRing);

      // Planet Pivot Container (for clean orbital rotation)
      const pivot = new THREE.Group();
      this.scene.add(pivot);

      // Planet Mesh
      const pGeo = new THREE.SphereGeometry(data.radius, 32, 32);
      const pMat = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.7,
        metalness: 0.1
      });
      const planetMesh = new THREE.Mesh(pGeo, pMat);
      planetMesh.position.x = data.dist;
      planetMesh.rotation.z = data.tilt;
      planetMesh.userData = { ...data };
      pivot.add(planetMesh);

      // Special handling for Earth: add Moon and Atmosphere Glow
      if (data.name === 'Earth') {
        this.earthMesh = planetMesh;
        this.earthPivot = pivot;

        const atmoGeo = new THREE.SphereGeometry(data.radius * 1.08, 32, 32);
        const atmoMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.25,
          side: THREE.BackSide
        });
        const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
        planetMesh.add(atmoMesh);

        // Moon
        const moonGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(4.5, 0, 0);
        this.moonPivot = new THREE.Group();
        planetMesh.add(this.moonPivot);
        this.moonPivot.add(moonMesh);
      }

      // Saturn Rings
      if (data.name === 'Saturn') {
        const ringGeo = new THREE.RingGeometry(data.radius * 1.4, data.radius * 2.3, 48);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xcca466,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.2;
        planetMesh.add(ringMesh);
      }

      this.planets.push({
        pivot,
        mesh: planetMesh,
        speed: data.speed,
        angle: Math.random() * Math.PI * 2,
        data
      });
    });
  }

  createRadiationBeams() {
    this.radiationGroup = new THREE.Group();
    this.radiationGroup.visible = false;
    this.scene.add(this.radiationGroup);

    // Glowing solar flux vector lines from Sun towards Earth
    const beamCount = 7;
    for (let i = 0; i < beamCount; i++) {
      const beamGeo = new THREE.CylinderGeometry(0.12, 0.12, 30, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.7
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.rotation.z = Math.PI / 2;
      beam.position.y = (i - 3) * 0.9;
      this.radiationGroup.add(beam);
    }
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'radiation') {
      this.radiationGroup.visible = true;
      if (this.earthMesh) {
        this.focusOnObject(this.earthMesh, 24);
      }
      const hudWidget = document.getElementById('solar-angle-hud');
      if (hudWidget) hudWidget.classList.add('visible');
    } else {
      this.radiationGroup.visible = false;
      this.resetView();
      const hudWidget = document.getElementById('solar-angle-hud');
      if (hudWidget) hudWidget.classList.remove('visible');
    }
  }

  focusOnObject(mesh, distance = 30) {
    const worldPos = new THREE.Vector3();
    mesh.getWorldPosition(worldPos);
    this.targetLookAt.copy(worldPos);
    this.spherical.radius = distance;
    this.spherical.theta = Math.PI / 3;
    this.spherical.phi = Math.PI / 3;
    this.updateCameraPosition();
  }

  resetView() {
    this.targetLookAt.set(0, 0, 0);
    this.spherical.radius = this.isMini ? 45 : 120;
    this.spherical.theta = Math.PI / 4;
    this.spherical.phi = Math.PI / 3.5;
    this.updateCameraPosition();
  }

  updateCameraPosition() {
    const x = this.spherical.radius * Math.sin(this.spherical.phi) * Math.sin(this.spherical.theta);
    const y = this.spherical.radius * Math.cos(this.spherical.phi);
    const z = this.spherical.radius * Math.sin(this.spherical.phi) * Math.cos(this.spherical.theta);

    this.camera.position.set(
      this.targetLookAt.x + x,
      this.targetLookAt.y + y,
      this.targetLookAt.z + z
    );
    this.camera.lookAt(this.targetLookAt);
  }

  setupInteractions() {
    // Mouse Drag Rotation
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.prevMousePos.x;
      const deltaY = e.clientY - this.prevMousePos.y;
      this.prevMousePos = { x: e.clientX, y: e.clientY };

      this.spherical.theta -= deltaX * 0.008;
      this.spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.spherical.phi - deltaY * 0.008));
      this.updateCameraPosition();
    });

    // Zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.05;
      this.spherical.radius = Math.max(12, Math.min(450, this.spherical.radius + zoomFactor));
      this.updateCameraPosition();
    }, { passive: false });

    // Planet Click Raycaster (Main View only)
    if (!this.isMini) {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, this.camera);
        const meshes = this.planets.map(p => p.mesh);
        const intersects = raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
          const hitPlanet = intersects[0].object;
          this.showPlanetDetails(hitPlanet.userData);
          this.focusOnObject(hitPlanet, hitPlanet.userData.radius * 8);
        }
      });
    }
  }

  showPlanetDetails(data) {
    const drawer = document.getElementById('planet-info-drawer');
    if (!drawer) return;

    document.getElementById('planet-drawer-name').textContent = data.name;
    document.getElementById('planet-drawer-temp').textContent = data.temp;
    document.getElementById('planet-drawer-irradiance').textContent = data.irradiance;
    document.getElementById('planet-drawer-dist').textContent = `${(data.dist * 0.024).toFixed(2)} AU`;
    document.getElementById('planet-drawer-desc').textContent = data.desc;

    const dot = document.getElementById('planet-color-indicator');
    if (dot) {
      dot.style.backgroundColor = '#' + data.color.toString(16).padStart(6, '0');
      dot.style.boxShadow = `0 0 10px #${data.color.toString(16).padStart(6, '0')}`;
    }

    drawer.classList.add('open');
  }

  onResize() {
    if (!this.canvas || !this.renderer || !this.camera) return;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const timeDelta = 0.016;

    // Pulse Sun Corona
    if (this.sunGlow) {
      const pulse = 1 + Math.sin(Date.now() * 0.003) * 0.05;
      this.sunGlow.scale.set(pulse, pulse, pulse);
    }

    // Rotate Sun
    if (this.sunMesh) {
      this.sunMesh.rotation.y += 0.002;
    }

    // Animate Planets
    if (!this.isPaused) {
      this.planets.forEach((p) => {
        p.angle += p.speed * this.speedMultiplier * 0.4;
        p.pivot.rotation.y = p.angle;
        p.mesh.rotation.y += 0.02; // Self-rotation
      });

      if (this.moonPivot) {
        this.moonPivot.rotation.y += 0.05;
      }
    }

    // Heliocentric Solar Radiation Calculations
    if (this.mode === 'radiation' && this.earthMesh) {
      const now = new Date();
      // Day of year calculation for solar declination
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      // Solar Declination delta = 23.45 * sin(360/365 * (284 + n))
      const declinationRad = (23.45 * Math.sin((360 / 365) * (284 + dayOfYear) * (Math.PI / 180))) * (Math.PI / 180);
      const declinationDeg = (declinationRad * (180 / Math.PI)).toFixed(2);

      // Calculate instantaneous zenith solar flux (W/m^2)
      const solarConstant = 1361; // AM0 extraterrestrial
      const zenithFlux = (solarConstant * Math.cos(Math.abs(declinationRad))).toFixed(0);

      // Update HUD elements
      const decElem = document.getElementById('hud-declination-val');
      const fluxElem = document.getElementById('hud-flux-val');
      if (decElem) decElem.textContent = `${declinationDeg}°`;
      if (fluxElem) fluxElem.textContent = `${zenithFlux} W/m²`;

      // Keep radiation beams pointing from Sun to Earth
      const earthPos = new THREE.Vector3();
      this.earthMesh.getWorldPosition(earthPos);
      this.radiationGroup.position.copy(earthPos.clone().multiplyScalar(0.5));
      this.radiationGroup.lookAt(earthPos);
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
