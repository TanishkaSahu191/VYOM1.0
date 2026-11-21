/**
 * ============================================================================
 * MY SPACESHIP: ISS HABITATION CORRIDOR 3D INTERIOR ENGINE
 * Built for VYOM 1.0 - Photorealistic Spacecraft Hab Module
 * Complete procedural 3D corridor, ISPR avionics racks, docking hatch & window
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================
  // 1. CONFIGURATION & TUNABLE PARAMETERS
  // ==========================================
  const CONFIG = {
    corridorLength: 36.0,  // meters (Z axis: -18 to +18)
    corridorWidth: 4.4,    // meters (X axis: -2.2 to +2.2)
    corridorHeight: 3.2,   // meters (Y axis: -1.6 to +1.6)
    walkSpeed: 6.0,        // m/s
    lookSensitivity: 0.0025,
    cameraFov: 60,
    racksPerSide: 7
  };

  // ==========================================
  // 2. SYNTHESIZED WEB AUDIO (VENTILATION HUM)
  // ==========================================
  class SpaceshipAudio {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.fanHumNode = null;
      this.fanGain = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
          this.startFanAmbience();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    startFanAmbience() {
      if (!this.ctx || this.fanHumNode) return;
      try {
        // Continuous soft ISS cabin ventilation hum (filtered pink noise)
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2) * 0.08;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, this.ctx.currentTime); // 320 Hz ventilation hum

        this.fanGain = this.ctx.createGain();
        this.fanGain.gain.setValueAtTime(this.isMuted ? 0 : 0.06, this.ctx.currentTime);

        noise.connect(filter);
        filter.connect(this.fanGain);
        this.fanGain.connect(this.ctx.destination);
        noise.start();
        this.fanHumNode = noise;
      } catch (e) {}
    }

    playClickSound() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {}
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.fanGain) {
        this.fanGain.gain.setValueAtTime(this.isMuted ? 0 : 0.06, this.ctx.currentTime);
      }
      return this.isMuted;
    }
  }

  // ==========================================
  // 3. MAIN PROCEDURAL SPACESHIP ENGINE CLASS
  // ==========================================
  class SpaceshipEngine {
    constructor() {
      this.audio = new SpaceshipAudio();
      this.canvas = null;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.isInitialized = false;

      // Lighting Elements
      this.ambientLight = null;
      this.ceilingStripLight1 = null;
      this.ceilingStripLight2 = null;
      this.lightMode = 'day'; // 'day' | 'night' | 'emergency'

      // Interactive Camera Control State
      this.cameraPos = new THREE.Vector3(0, 0, -12);
      this.cameraRot = { pitch: 0, yaw: 0 };
      this.isDragging = false;
      this.previousMousePos = { x: 0, y: 0 };
      this.keys = { w: false, s: false, a: false, d: false };

      // Outer Space Elements
      this.earthMesh = null;
      this.starField = null;

      // Indicator LED Materials (for blinking)
      this.blinkingLeds = [];
      this.animTime = 0;
    }

    init() {
      if (this.isInitialized) return;
      this.canvas = document.getElementById('spaceshipCanvas');
      if (!this.canvas) return;

      this.setupThreeScene();
      this.buildCorridorArchitecture();
      this.buildISPRPayloadRacks();
      this.buildDockingHatch();
      this.buildCupolaWindowAndEarth();
      this.buildCeilingPipesAndDucts();
      this.buildFloorGridAndFootRestraints();
      this.setupEventListeners();

      this.isInitialized = true;
      this.animate();
    }

    // ------------------------------------------
    // THREE.JS SCENE & SOFT INDUSTRIAL LIGHTING
    // ------------------------------------------
    setupThreeScene() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x020617);

      this.camera = new THREE.PerspectiveCamera(CONFIG.cameraFov, w / h, 0.1, 500);
      this.camera.position.copy(this.cameraPos);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // 1. Soft Balanced Ambient Light (Preserves depth and contrast)
      this.ambientLight = new THREE.AmbientLight(0xdbeafe, 0.55);
      this.scene.add(this.ambientLight);

      // 2. Dual Overhead Longitudinal LED Strip Fixtures
      this.ceilingStripLight1 = new THREE.PointLight(0xf8fafc, 1.2, 28, 1.5);
      this.ceilingStripLight1.position.set(-0.8, CONFIG.corridorHeight * 0.45, 0);
      this.scene.add(this.ceilingStripLight1);

      this.ceilingStripLight2 = new THREE.PointLight(0xf8fafc, 1.2, 28, 1.5);
      this.ceilingStripLight2.position.set(0.8, CONFIG.corridorHeight * 0.45, 0);
      this.scene.add(this.ceilingStripLight2);

      // Additional fill lights along the corridor
      [-10, 10].forEach(z => {
        const fill = new THREE.PointLight(0xe0f2fe, 0.7, 18, 1.8);
        fill.position.set(0, CONFIG.corridorHeight * 0.4, z);
        this.scene.add(fill);
      });
    }

    // ------------------------------------------
    // CORRIDOR ARCHITECTURAL ENVELOPE
    // ------------------------------------------
    buildCorridorArchitecture() {
      const halfW = CONFIG.corridorWidth / 2;
      const halfH = CONFIG.corridorHeight / 2;
      const length = CONFIG.corridorLength;

      // Wall Material (White/light-grey metallic with industrial powder coat)
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.48,
        metalness: 0.22
      });

      // Left Wall
      const lWallGeo = new THREE.PlaneGeometry(length, CONFIG.corridorHeight);
      const lWall = new THREE.Mesh(lWallGeo, wallMat);
      lWall.rotation.y = Math.PI / 2;
      lWall.position.set(-halfW, 0, 0);
      this.scene.add(lWall);

      // Right Wall
      const rWallGeo = new THREE.PlaneGeometry(length, CONFIG.corridorHeight);
      const rWall = new THREE.Mesh(rWallGeo, wallMat);
      rWall.rotation.y = -Math.PI / 2;
      rWall.position.set(halfW, 0, 0);
      this.scene.add(rWall);

      // Floor (Brushed aerospace aluminum grid with non-skid ribbed plating)
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.65,
        metalness: 0.7
      });
      const floorGeo = new THREE.PlaneGeometry(CONFIG.corridorWidth, length);
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(0, -halfH, 0);
      this.scene.add(floor);

      // Ceiling (Industrial utility raceway)
      const ceilingMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.7,
        metalness: 0.35
      });
      const ceilingGeo = new THREE.PlaneGeometry(CONFIG.corridorWidth, length);
      const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.set(0, halfH, 0);
      this.scene.add(ceiling);

      // Near End Bulkhead (Z = -18, Entrance Frame)
      const nearWallGeo = new THREE.PlaneGeometry(CONFIG.corridorWidth, CONFIG.corridorHeight);
      const nearWall = new THREE.Mesh(nearWallGeo, wallMat);
      nearWall.position.set(0, 0, -length / 2);
      this.scene.add(nearWall);

      // Structural Rib Bulkheads (Dividing bays every 5 meters)
      for (let z = -14; z <= 14; z += 4.5) {
        this.createStructuralBulkheadRib(z);
      }
    }

    createStructuralBulkheadRib(z) {
      const ribMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
      const halfW = CONFIG.corridorWidth / 2;
      const halfH = CONFIG.corridorHeight / 2;

      // Left rib column
      const lColGeo = new THREE.BoxGeometry(0.18, CONFIG.corridorHeight, 0.35);
      const lCol = new THREE.Mesh(lColGeo, ribMat);
      lCol.position.set(-halfW + 0.09, 0, z);
      this.scene.add(lCol);

      // Right rib column
      const rColGeo = new THREE.BoxGeometry(0.18, CONFIG.corridorHeight, 0.35);
      const rCol = new THREE.Mesh(rColGeo, ribMat);
      rCol.position.set(halfW - 0.09, 0, z);
      this.scene.add(rCol);

      // Ceiling rib beam
      const cBeamGeo = new THREE.BoxGeometry(CONFIG.corridorWidth, 0.2, 0.35);
      const cBeam = new THREE.Mesh(cBeamGeo, ribMat);
      cBeam.position.set(0, halfH - 0.1, z);
      this.scene.add(cBeam);
    }

    // ------------------------------------------
    // ISPR PAYLOAD RACKS & AVIONICS PANELS
    // ------------------------------------------
    buildISPRPayloadRacks() {
      const halfW = CONFIG.corridorWidth / 2;
      const rackWidth = 3.8;
      const rackHeight = 2.4;

      const zPositions = [-12, -7.5, -3, 1.5, 6, 10.5, 15];

      zPositions.forEach((z, idx) => {
        // Left Side Rack
        this.createEquipmentRack(-halfW + 0.22, 0, z, true, idx);

        // Right Side Rack
        this.createEquipmentRack(halfW - 0.22, 0, z, false, idx);
      });
    }

    createEquipmentRack(x, y, z, isLeft, idx) {
      const rackGroup = new THREE.Group();

      // Outer Rack Enclosure Frame (Modular ISPR Box)
      const frameGeo = new THREE.BoxGeometry(0.42, 2.5, 3.8);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.4,
        roughness: 0.5
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      rackGroup.add(frame);

      // Inset Instrumentation Panel (Dark Anodized Aluminum)
      const panelGeo = new THREE.BoxGeometry(0.45, 2.2, 3.5);
      const panelMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.75,
        roughness: 0.35
      });
      const panel = new THREE.Mesh(panelGeo, panelMat);
      rackGroup.add(panel);

      // Sub-panels, Circuit Breakers & Digital Displays
      // Top row: LCD Telemetry Monitors
      const lcdGeo = new THREE.PlaneGeometry(1.2, 0.6);
      const lcdMat = new THREE.MeshBasicMaterial({ color: (idx % 2 === 0 ? 0x06b6d4 : 0x10b981) });
      const lcd = new THREE.Mesh(lcdGeo, lcdMat);
      lcd.rotation.y = isLeft ? Math.PI / 2 : -Math.PI / 2;
      lcd.position.set(isLeft ? 0.23 : -0.23, 0.6, -0.6);
      rackGroup.add(lcd);

      // Switchboard Circuit Breakers Matrix
      const breakerRowGeo = new THREE.BoxGeometry(0.06, 0.08, 0.08);
      const breakerMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
      for (let bx = -1.2; bx <= 1.2; bx += 0.25) {
        for (let by = -0.3; by <= 0.2; by += 0.2) {
          const breaker = new THREE.Mesh(breakerRowGeo, breakerMat);
          breaker.position.set(isLeft ? 0.24 : -0.24, by, bx);
          rackGroup.add(breaker);
        }
      }

      // Indicator LED Array (Green, Amber, Blue, Red)
      const ledColors = [0x22c55e, 0x06b6d4, 0xf59e0b, 0xef4444];
      for (let i = 0; i < 6; i++) {
        const ledGeo = new THREE.SphereGeometry(0.035, 8, 8);
        const ledMat = new THREE.MeshBasicMaterial({ color: ledColors[i % ledColors.length] });
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(isLeft ? 0.24 : -0.24, 0.8, -1.2 + i * 0.45);
        rackGroup.add(led);
        this.blinkingLeds.push({ mesh: led, freq: 1.5 + (i * 0.7) });
      }

      // Ventilation Grilles (Acoustic Louvers)
      const ventGeo = new THREE.BoxGeometry(0.04, 0.45, 1.4);
      const ventMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
      const vent = new THREE.Mesh(ventGeo, ventMat);
      vent.position.set(isLeft ? 0.24 : -0.24, -0.85, 0);
      rackGroup.add(vent);

      // Yellow Zero-G Handrail for Astronaut Movement
      const railGeo = new THREE.CylinderGeometry(0.03, 0.03, 3.2, 12);
      const railMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.3 });
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.rotation.x = Math.PI / 2;
      rail.position.set(isLeft ? 0.35 : -0.35, 0.0, 0);
      rackGroup.add(rail);

      rackGroup.position.set(x, y, z);
      this.scene.add(rackGroup);
    }

    // ------------------------------------------
    // CIRCULAR PRESSURE-SEALED DOCKING HATCH (FAR END)
    // ------------------------------------------
    buildDockingHatch() {
      const hatchZ = (CONFIG.corridorLength / 2) - 0.2;
      const hatchGroup = new THREE.Group();

      // Outer Structural Bulkhead Ring Frame
      const ringGeo = new THREE.TorusGeometry(1.65, 0.18, 16, 48);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.85,
        roughness: 0.3
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      hatchGroup.add(ring);

      // Main Pressure Hatch Door Body (Concentric Metallic Bevels)
      const doorGeo = new THREE.CylinderGeometry(1.58, 1.58, 0.25, 48);
      const doorMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0, // Titanium white aerospace hatch
        metalness: 0.5,
        roughness: 0.4
      });
      const door = new THREE.Mesh(doorGeo, doorMat);
      door.rotation.x = Math.PI / 2;
      hatchGroup.add(door);

      // Rubber Pressure Gasket Seal
      const gasketGeo = new THREE.TorusGeometry(1.52, 0.05, 12, 48);
      const gasketMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
      const gasket = new THREE.Mesh(gasketGeo, gasketMat);
      gasket.position.z = -0.13;
      hatchGroup.add(gasket);

      // Manual 8-Spoke Rotating Latching Wheel
      const wheelHubGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.15, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.7, roughness: 0.3 }); // Safety amber
      const hub = new THREE.Mesh(wheelHubGeo, wheelMat);
      hub.rotation.x = Math.PI / 2;
      hub.position.z = -0.22;
      hatchGroup.add(hub);

      const wheelRimGeo = new THREE.TorusGeometry(0.55, 0.04, 12, 32);
      const rim = new THREE.Mesh(wheelRimGeo, wheelMat);
      rim.position.z = -0.22;
      hatchGroup.add(rim);

      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        const spokeGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8);
        const spoke = new THREE.Mesh(spokeGeo, wheelMat);
        spoke.rotation.z = theta;
        spoke.position.z = -0.22;
        hatchGroup.add(spoke);
      }

      // Small Circular Inspection Port Window
      const winGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.3, 24);
      const winMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.1,
        metalness: 0.95
      });
      const win = new THREE.Mesh(winGeo, winMat);
      win.rotation.x = Math.PI / 2;
      win.position.set(0, 0.65, -0.05);
      hatchGroup.add(win);

      // Pressure Equalization Valve & Status LEDs
      const valveGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 12);
      const valveMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
      const valve = new THREE.Mesh(valveGeo, valveMat);
      valve.rotation.x = Math.PI / 2;
      valve.position.set(-0.7, -0.5, -0.18);
      hatchGroup.add(valve);

      // Status indicator light
      const statusLedGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const statusLedMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
      const statusLed = new THREE.Mesh(statusLedGeo, statusLedMat);
      statusLed.position.set(0.7, 0.65, -0.2);
      hatchGroup.add(statusLed);

      hatchGroup.position.set(0, 0, hatchZ);
      this.scene.add(hatchGroup);
    }

    // ------------------------------------------
    // OBSERVATION WINDOW (CUPOLA PORT) & EARTH
    // ------------------------------------------
    buildCupolaWindowAndEarth() {
      const halfW = CONFIG.corridorWidth / 2;
      const windowGroup = new THREE.Group();

      // Circular Port Hole Bevel Frame on Left Wall at Z = 0
      const frameGeo = new THREE.TorusGeometry(0.95, 0.12, 16, 32);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.25 });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.rotation.y = Math.PI / 2;
      windowGroup.add(frame);

      // Outer Space Background Behind Window: Realistic Rotating 3D Earth
      const earthGeo = new THREE.SphereGeometry(16, 32, 32);
      const earthMat = new THREE.MeshPhongMaterial({
        color: 0x1d4ed8,
        specular: 0x60a5fa,
        shininess: 30
      });
      this.earthMesh = new THREE.Mesh(earthGeo, earthMat);
      this.earthMesh.position.set(-45, -12, 10);
      this.scene.add(this.earthMesh);

      // Atmosphere Fresnel Glow
      const atmoGeo = new THREE.SphereGeometry(16.8, 32, 32);
      const atmoMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide
      });
      const atmo = new THREE.Mesh(atmoGeo, atmoMat);
      atmo.position.copy(this.earthMesh.position);
      this.scene.add(atmo);

      windowGroup.position.set(-halfW + 0.05, 0.2, 0);
      this.scene.add(windowGroup);
    }

    // ------------------------------------------
    // CEILING VENTILATION DUCTS, CABLES & CONDUITS
    // ------------------------------------------
    buildCeilingPipesAndDucts() {
      const halfH = CONFIG.corridorHeight / 2;
      const length = CONFIG.corridorLength;

      // Central Long Overhead LED Light Strips
      [-0.85, 0.85].forEach(x => {
        const fixtureGeo = new THREE.BoxGeometry(0.25, 0.08, length);
        const fixtureMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const fixture = new THREE.Mesh(fixtureGeo, fixtureMat);
        fixture.position.set(x, halfH - 0.04, 0);
        fixture.name = 'ceilingFixture';
        this.scene.add(fixture);
      });

      // Flexible Air Ventilation Ducts (Cylinders running along top corners)
      [-1.85, 1.85].forEach(x => {
        const ductGeo = new THREE.CylinderGeometry(0.24, 0.24, length, 16);
        const ductMat = new THREE.MeshStandardMaterial({
          color: 0x94a3b8,
          metalness: 0.35,
          roughness: 0.8
        });
        const duct = new THREE.Mesh(ductGeo, ductMat);
        duct.rotation.x = Math.PI / 2;
        duct.position.set(x, halfH - 0.28, 0);
        this.scene.add(duct);
      });

      // Conduit Wire Trays & Fluid Utility Pipes (Blue for coolant, orange for gas)
      const pipeColors = [0x0284c7, 0xf97316, 0x22c55e];
      [-1.4, -1.2, 1.2, 1.4].forEach((x, i) => {
        const pipeGeo = new THREE.CylinderGeometry(0.04, 0.04, length, 8);
        const pipeMat = new THREE.MeshStandardMaterial({
          color: pipeColors[i % pipeColors.length],
          metalness: 0.8
        });
        const pipe = new THREE.Mesh(pipeGeo, pipeMat);
        pipe.rotation.x = Math.PI / 2;
        pipe.position.set(x, halfH - 0.15, 0);
        this.scene.add(pipe);
      });
    }

    // ------------------------------------------
    // METALLIC FLOOR WITH RECESSED FOOT RESTRAINTS
    // ------------------------------------------
    buildFloorGridAndFootRestraints() {
      const halfH = CONFIG.corridorHeight / 2;
      const length = CONFIG.corridorLength;

      // Center Utility Trench Cover Plates
      const trenchGeo = new THREE.BoxGeometry(1.2, 0.04, length);
      const trenchMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.4 });
      const trench = new THREE.Mesh(trenchGeo, trenchMat);
      trench.position.set(0, -halfH + 0.02, 0);
      this.scene.add(trench);

      // NASA Zero-G Foot Restraints (Yellow foot loops along the floor)
      for (let z = -14; z <= 14; z += 3.5) {
        const loopGeo = new THREE.TorusGeometry(0.18, 0.03, 8, 16, Math.PI);
        const loopMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 });
        const loop1 = new THREE.Mesh(loopGeo, loopMat);
        loop1.rotation.x = -Math.PI / 2;
        loop1.position.set(-0.35, -halfH + 0.04, z);

        const loop2 = new THREE.Mesh(loopGeo, loopMat);
        loop2.rotation.x = -Math.PI / 2;
        loop2.position.set(0.35, -halfH + 0.04, z);

        this.scene.add(loop1);
        this.scene.add(loop2);
      }
    }

    // ------------------------------------------
    // LIGHTING MODES (DAY / NIGHT / EMERGENCY)
    // ------------------------------------------
    setLightingMode(mode) {
      this.lightMode = mode;
      this.audio.playClickSound();

      document.querySelectorAll('.ship-light-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
      });

      const fixtures = [];
      this.scene.traverse(obj => {
        if (obj.name === 'ceilingFixture') fixtures.push(obj);
      });

      if (mode === 'day') {
        // Operational Day: Crisp, soft balanced 5000K white
        this.ambientLight.color.setHex(0xdbeafe);
        this.ambientLight.intensity = 0.55;
        this.ceilingStripLight1.color.setHex(0xf8fafc);
        this.ceilingStripLight2.color.setHex(0xf8fafc);
        this.ceilingStripLight1.intensity = 1.2;
        this.ceilingStripLight2.intensity = 1.2;
        fixtures.forEach(f => f.material.color.setHex(0xffffff));
      } else if (mode === 'night') {
        // Crew Rest Night: Muted amber/warm 2700K
        this.ambientLight.color.setHex(0x78350f);
        this.ambientLight.intensity = 0.35;
        this.ceilingStripLight1.color.setHex(0xfbbf24);
        this.ceilingStripLight2.color.setHex(0xfbbf24);
        this.ceilingStripLight1.intensity = 0.6;
        this.ceilingStripLight2.intensity = 0.6;
        fixtures.forEach(f => f.material.color.setHex(0xfbbf24));
      } else if (mode === 'emergency') {
        // Emergency Depressurization / Fire Alarm: Red Alert
        this.ambientLight.color.setHex(0x7f1d1d);
        this.ambientLight.intensity = 0.4;
        this.ceilingStripLight1.color.setHex(0xef4444);
        this.ceilingStripLight2.color.setHex(0xef4444);
        this.ceilingStripLight1.intensity = 1.5;
        this.ceilingStripLight2.intensity = 1.5;
        fixtures.forEach(f => f.material.color.setHex(0xef4444));
      }
    }

    // ------------------------------------------
    // CAMERA PRESETS
    // ------------------------------------------
    setCameraPreset(preset) {
      this.audio.playClickSound();
      document.querySelectorAll('.ship-preset-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-preset') === preset);
      });

      const card = document.getElementById('shipInspectorCard');
      const title = document.getElementById('shipInspectTitle');
      const sub = document.getElementById('shipInspectSub');
      const desc = document.getElementById('shipInspectDesc');

      switch (preset) {
        case 'overview':
          this.cameraPos.set(0, 0, -12);
          this.cameraRot.pitch = 0;
          this.cameraRot.yaw = 0;
          if (card) card.classList.remove('is-open');
          break;

        case 'hatch':
          this.cameraPos.set(0, 0, 14.5);
          this.cameraRot.pitch = 0;
          this.cameraRot.yaw = 0;
          if (card) {
            title.textContent = 'Common Berthing Mechanism (CBM)';
            sub.textContent = 'DOCKING HATCH & PRESSURE EQUALIZATION';
            desc.textContent = 'Pressure-sealed vestibule connecting habitation modules. Features manual 8-spoke latching wheel, optical alignment inspection port, and redundant pressure sensors.';
            document.getElementById('shipSpecPressure').textContent = '101.3 kPa (Delta: 0.0)';
            document.getElementById('shipSpecStatus').textContent = 'LATCHES ENGAGED';
            card.classList.add('is-open');
          }
          break;

        case 'cupola':
          this.cameraPos.set(-0.8, 0.2, 0);
          this.cameraRot.pitch = 0;
          this.cameraRot.yaw = Math.PI / 2; // Look directly out the window
          if (card) {
            title.textContent = 'Earth Observation Cupola Port';
            sub.textContent = 'LEO OPTICAL VIEWPORT (420 KM ORBIT)';
            desc.textContent = 'Thick fused-silica viewport looking out at planet Earth below. Crew members use this observation station for robotic arm operations and Earth sciences.';
            document.getElementById('shipSpecPressure').textContent = 'Altitude: 420.5 km';
            document.getElementById('shipSpecStatus').textContent = 'ORBITAL VELOCITY: 27,600 km/h';
            card.classList.add('is-open');
          }
          break;

        case 'racks':
          this.cameraPos.set(-0.6, 0, 4);
          this.cameraRot.pitch = 0;
          this.cameraRot.yaw = -Math.PI / 2.5; // Look at right wall racks
          if (card) {
            title.textContent = 'ISPR Avionics & ECLSS Payload Bay';
            sub.textContent = 'LIFE SUPPORT & POWER DISTRIBUTION';
            desc.textContent = 'Standardized 19-inch equipment racks managing cabin atmosphere, CO2 scrubbers, water recycling, and 120V DC power routing across primary bus channels.';
            document.getElementById('shipSpecPressure').textContent = 'O2: 21.2% | CO2: 0.3%';
            document.getElementById('shipSpecStatus').textContent = 'ALL CIRCUITS NOMINAL';
            card.classList.add('is-open');
          }
          break;
      }
    }

    // ------------------------------------------
    // EVENT LISTENERS & SMOOTH CONTROLS
    // ------------------------------------------
    setupEventListeners() {
      window.addEventListener('resize', () => {
        if (!this.camera || !this.renderer) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      });

      // Mouse Drag to Look Around (360 degrees)
      this.canvas.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.previousMousePos = { x: e.clientX, y: e.clientY };
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        const deltaX = e.clientX - this.previousMousePos.x;
        const deltaY = e.clientY - this.previousMousePos.y;
        this.previousMousePos = { x: e.clientX, y: e.clientY };

        this.cameraRot.yaw -= deltaX * CONFIG.lookSensitivity;
        this.cameraRot.pitch -= deltaY * CONFIG.lookSensitivity;

        // Clamp pitch to prevent flipping
        this.cameraRot.pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.cameraRot.pitch));
      });

      // Touch Drag for Mobile
      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      });
      window.addEventListener('touchend', () => {
        this.isDragging = false;
      });
      window.addEventListener('touchmove', (e) => {
        if (!this.isDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - this.previousMousePos.x;
        const deltaY = e.touches[0].clientY - this.previousMousePos.y;
        this.previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        this.cameraRot.yaw -= deltaX * (CONFIG.lookSensitivity * 1.5);
        this.cameraRot.pitch -= deltaY * (CONFIG.lookSensitivity * 1.5);
        this.cameraRot.pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.cameraRot.pitch));
      });

      // Mouse Wheel to Zoom FOV
      this.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        this.camera.fov += e.deltaY * 0.05;
        this.camera.fov = Math.max(35, Math.min(85, this.camera.fov));
        this.camera.updateProjectionMatrix();
      }, { passive: false });

      // Keyboard Glide Navigation (WASD / Arrows)
      window.addEventListener('keydown', (e) => {
        const stage = document.getElementById('spaceshipStage');
        if (!stage || stage.style.display === 'none') return;

        if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.w = true;
        if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.s = true;
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.a = true;
        if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.d = true;
      });

      window.addEventListener('keyup', (e) => {
        if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.w = false;
        if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.s = false;
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.a = false;
        if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.d = false;
      });

      // Lighting Mode Pills
      document.querySelectorAll('.ship-light-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          this.setLightingMode(pill.getAttribute('data-mode'));
        });
      });

      // Camera Preset Buttons
      document.querySelectorAll('.ship-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.setCameraPreset(btn.getAttribute('data-preset'));
        });
      });

      // Inspector Card Close Button
      const closeBtn = document.getElementById('shipInspectClose');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          document.getElementById('shipInspectorCard').classList.remove('is-open');
        });
      }

      // Audio Mute Toggle
      const audioBtn = document.getElementById('shipAudioBtn');
      if (audioBtn) {
        audioBtn.addEventListener('click', () => {
          const isMuted = this.audio.toggleMute();
          audioBtn.textContent = isMuted ? '🔇 Audio: MUTED' : '🔊 Audio: ON';
        });
      }
    }

    // ------------------------------------------
    // MAIN 60 FPS ANIMATION LOOP
    // ------------------------------------------
    animate() {
      requestAnimationFrame(() => this.animate());

      const dt = 0.016;
      this.animTime += dt;

      // 1. First-Person Movement inside Corridor
      const forwardDir = new THREE.Vector3(
        -Math.sin(this.cameraRot.yaw),
        0,
        -Math.cos(this.cameraRot.yaw)
      ).normalize();

      const sideDir = new THREE.Vector3(
        Math.cos(this.cameraRot.yaw),
        0,
        -Math.sin(this.cameraRot.yaw)
      ).normalize();

      if (this.keys.w) this.cameraPos.addScaledVector(forwardDir, CONFIG.walkSpeed * dt);
      if (this.keys.s) this.cameraPos.addScaledVector(forwardDir, -CONFIG.walkSpeed * dt);
      if (this.keys.a) this.cameraPos.addScaledVector(sideDir, -CONFIG.walkSpeed * dt);
      if (this.keys.d) this.cameraPos.addScaledVector(sideDir, CONFIG.walkSpeed * dt);

      // Clamp position inside corridor walls (avoid clipping)
      const maxZ = (CONFIG.corridorLength / 2) - 1.5;
      const minZ = -(CONFIG.corridorLength / 2) + 1.5;
      const maxX = (CONFIG.corridorWidth / 2) - 0.7;
      const minX = -(CONFIG.corridorWidth / 2) + 0.7;

      this.cameraPos.x = Math.max(minX, Math.min(maxX, this.cameraPos.x));
      this.cameraPos.z = Math.max(minZ, Math.min(maxZ, this.cameraPos.z));
      this.cameraPos.y = 0; // Fixed human eye-height relative to corridor center

      // Sync Camera Position & Look Direction
      this.camera.position.copy(this.cameraPos);

      const lookTarget = new THREE.Vector3(
        this.cameraPos.x - Math.sin(this.cameraRot.yaw) * Math.cos(this.cameraRot.pitch),
        this.cameraPos.y + Math.sin(this.cameraRot.pitch),
        this.cameraPos.z - Math.cos(this.cameraRot.yaw) * Math.cos(this.cameraRot.pitch)
      );
      this.camera.lookAt(lookTarget);

      // 2. Slow Earth Rotation Outside Window
      if (this.earthMesh) {
        this.earthMesh.rotation.y += 0.001;
      }

      // 3. Subtle Indicator LED Blinking
      this.blinkingLeds.forEach(item => {
        const pulse = Math.sin(this.animTime * item.freq);
        item.mesh.visible = pulse > -0.6;
      });

      // 4. Emergency Mode Red Alert Pulse
      if (this.lightMode === 'emergency') {
        const p = (Math.sin(this.animTime * 4.0) + 1.0) * 0.5;
        this.ceilingStripLight1.intensity = 0.5 + p * 1.5;
        this.ceilingStripLight2.intensity = 0.5 + p * 1.5;
      }

      // Render Scene
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }

  // Export engine to window
  window.SpaceshipEngine = new SpaceshipEngine();

})();
