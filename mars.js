/**
 * ============================================================================
 * MARS EXPLORER: ASTRONAUT MISSION 3D GAME ENGINE
 * Built for VYOM 1.0 - Interplanetary Exploration Protocol
 * Realistic Martian terrain, rover driving, sample scanning, survival & research
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================
  // 1. CONFIGURATION & TUNABLE PARAMETERS
  // ==========================================
  const CONFIG = {
    walkSpeed: 7.5,
    sprintSpeed: 13.0,
    roverSpeed: 18.0,
    turnSpeed: 2.2,
    baseOxygenMax: 100,
    baseBatteryMax: 100,
    oxygenDrainRate: 0.65, // % per second
    batteryDrainRate: 0.45,
    dayNightCycleDuration: 180, // seconds for full day/night
    baseBackpackCapacity: 4,
    scanRange: 12.0, // meters
    depositDistance: 14.0 // meters from Hab Dome
  };

  // ==========================================
  // 2. BILINGUAL TRANSLATIONS (EN & HI)
  // ==========================================
  const TRANSLATIONS = {
    en: {
      gameTitle: 'Mars Explorer: Astronaut Mission',
      gameSubtitle: 'SURFACE RECONNAISSANCE & SAMPLE CACHING',
      credits: 'Credits',
      backpack: 'Backpack',
      depositPrompt: 'At Base Station — Oxygen & Battery Refilled!',
      scanPrompt: 'Press [F] to Scan Sample',
      collectPrompt: 'Press [E] to Collect Sample',
      enterRoverPrompt: 'Press [R] to Drive Rover',
      exitRoverPrompt: 'Press [R] to Exit Rover',
      oxygenLow: 'WARNING: Oxygen below 20%! Return to Base immediately!',
      respawnMsg: 'Life support depleted! Evacuated back to Base Station.',
      samples: [
        {
          id: 'basalt',
          name: 'Volcanic Basalt Rock',
          classification: 'Igneous Mafic Rock',
          color: 0x334155,
          confidence: '98.4%',
          facts: 'Dense volcanic rock formed by rapid cooling of basaltic lava from ancient Martian shield volcanoes like Olympus Mons.',
          credits: 50
        },
        {
          id: 'hematite',
          name: 'Hematite Spherules ("Blueberries")',
          classification: 'Iron Oxide Mineral Concretion',
          color: 0x64748b,
          confidence: '96.2%',
          facts: 'Discovered by NASA’s Opportunity rover. These spherical mineral nodules only crystallize in standing liquid water!',
          credits: 90
        },
        {
          id: 'sandstone',
          name: 'Cross-Bedded Sandstone',
          classification: 'Sedimentary Rock',
          color: 0xd97706,
          confidence: '94.8%',
          facts: 'Formed by ancient riverdeltas and wind dunes. Proves billions of years ago Mars had flowing surface rivers and a thick atmosphere.',
          credits: 60
        },
        {
          id: 'ice',
          name: 'Subsurface Water Ice Soil',
          classification: 'Cryo-Regolith Matrix',
          color: 0xe0f2fe,
          confidence: '99.1%',
          facts: 'Water ice frozen centimeters beneath the dust. Critical resource for generating rocket fuel and drinking water for future human colonies!',
          credits: 120
        },
        {
          id: 'fossil',
          name: 'Biogenic Stromatolite Spheroid',
          classification: 'Possible Micro-Fossil Signature',
          color: 0x10b981,
          confidence: '91.7%',
          facts: 'Layered microbial structure resembling Earth’s earliest life forms. High-priority target for return to Earth laboratories!',
          credits: 150
        }
      ]
    },
    hi: {
      gameTitle: 'मंगल खोजकर्ता: अंतरिक्ष यात्री मिशन',
      gameSubtitle: 'मंगल ग्रह की सतह पर नमूने एकत्र करने का मिशन',
      credits: 'क्रेडिट्स',
      backpack: 'बैकपैक',
      depositPrompt: 'बेस स्टेशन पहुंचे — ऑक्सीजन और बैटरी फुल चार्ज!',
      scanPrompt: '[F] दबाकर नमूना स्कैन करें',
      collectPrompt: '[E] दबाकर नमूना उठाएं',
      enterRoverPrompt: '[R] दबाकर रोवर में बैठें',
      exitRoverPrompt: '[R] दबाकर रोवर से बाहर आएं',
      oxygenLow: 'चेतावनी: ऑक्सीजन 20% से कम! तुरंत बेस लौटें!',
      respawnMsg: 'लाइफ सपोर्ट समाप्त! आपातकालीन बेस पर वापसी।',
      samples: [
        {
          id: 'basalt',
          name: 'ज्वालामुखीय बेसाल्ट चट्टान',
          classification: 'आग्नेय चट्टान',
          color: 0x334155,
          confidence: '98.4%',
          facts: 'मंगल के प्राचीन ज्वालामुखियों से निकले लावा के ठंडे होने से बनी भारी और काली चट्टान।',
          credits: 50
        },
        {
          id: 'hematite',
          name: 'हेमेटाइट कंकड़ ("ब्लूबेरी")',
          classification: 'आयरन ऑक्साइड खनिज',
          color: 0x64748b,
          confidence: '96.2%',
          facts: 'नासा के अपॉर्चुनिटी रोवर ने इसे खोजा था। यह गोल कंकड़ केवल बहते पानी की मौजूदगी में ही बन सकते हैं!',
          credits: 90
        },
        {
          id: 'sandstone',
          name: 'तलछटी बलुआ पत्थर',
          classification: 'अवसादी शैल',
          color: 0xd97706,
          confidence: '94.8%',
          facts: 'अरबों साल पहले मंगल की प्राचीन नदियों और झीलों की तलछट जमने से बना पत्थर।',
          credits: 60
        },
        {
          id: 'ice',
          name: 'जमीन के नीचे दबी पानी की बर्फ',
          classification: 'क्रायो-रेगोलिथ',
          color: 0xe0f2fe,
          confidence: '99.1%',
          facts: 'धूल की सतह के नीचे जमी पानी की बर्फ। भविष्य के मानव मिशनों के लिए पानी और रॉकेट ईंधन का प्रमुख स्रोत!',
          credits: 120
        },
        {
          id: 'fossil',
          name: 'बायोजेनिक माइक्रोबियल जीवाश्म',
          classification: 'संभावित सूक्ष्मजीव जीवाश्म',
          color: 0x10b981,
          confidence: '91.7%',
          facts: 'पृथ्वी के प्रारंभिक जीवों जैसी परतदार संरचना, जो मंगल पर प्राचीन जीवन का सबसे बड़ा सुराग हो सकती है!',
          credits: 150
        }
      ]
    }
  };

  // ==========================================
  // 3. REAL MARS MISSIONS ENCYCLOPEDIA
  // ==========================================
  const REAL_MISSIONS = [
    {
      name: 'ISRO Mangalyaan (MOM)',
      agency: 'ISRO (India)',
      year: '2013 - 2022',
      badge: 'Historic 1st Attempt Triumph',
      desc: 'India became the FIRST nation in the world to successfully reach Mars orbit on its maiden attempt, and the fourth space agency overall. Built on an astonishingly lean budget of just ₹450 crore ($74M), less than major space movies!',
      findings: 'Mapped Mars surface morphology, photographed Phobos and Deimos moons, and analyzed atmospheric escape.'
    },
    {
      name: 'NASA Perseverance & Ingenuity',
      agency: 'NASA (USA)',
      year: '2021 - Present',
      badge: 'Jezero Crater Sample Return',
      desc: 'Rover exploring the ancient lakebed of Jezero Crater, searching for signs of ancient microbial life and caching rock cores for return to Earth. Carried the Ingenuity helicopter, the first powered flight on another planet!',
      findings: 'Drilled 24+ core samples, produced pure oxygen using MOXIE instrument from Martian CO2.'
    },
    {
      name: 'NASA Curiosity Rover',
      agency: 'NASA (USA)',
      year: '2012 - Present',
      badge: 'Gale Crater Veteran',
      desc: 'Nuclear-powered car-sized science laboratory roaming Mount Sharp inside Gale Crater for over 12 years. Proved that ancient Mars had lakes and river systems capable of supporting life.',
      findings: 'Discovered organic carbon molecules, ancient riverbed gravels, and seasonal methane spikes.'
    },
    {
      name: 'CNSA Tianwen-1 & Zhurong',
      agency: 'CNSA (China)',
      year: '2020 - Present',
      badge: 'Orbiter, Lander & Rover Trio',
      desc: 'China’s first Mars mission achieved orbit, soft-landing, and rover deployment all in a single mission. The solar-powered Zhurong rover explored the ancient plains of Utopia Planitia.',
      findings: 'Detected evidence of hydrated minerals formed by episodic water floods in Utopia Planitia.'
    },
    {
      name: 'Hope Probe (Al-Amal)',
      agency: 'UAE Space Agency',
      year: '2020 - Present',
      badge: 'First Arab Interplanetary Mission',
      desc: 'Orbital satellite in a unique high-altitude elliptical orbit, providing the first comprehensive global weather map of the Martian atmosphere across all seasons and day/night transitions.',
      findings: 'Captured high-resolution ultraviolet images of discrete Martian auroras and oxygen/hydrogen loss.'
    }
  ];

  // ==========================================
  // 4. SYNTHESIZED WEB AUDIO ENGINE
  // ==========================================
  class MarsAudio {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.windGain = null;
      this.windNode = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
          this.startWindAmbience();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    startWindAmbience() {
      if (!this.ctx || this.windNode) return;
      try {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.15;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, this.ctx.currentTime);

        this.windGain = this.ctx.createGain();
        this.windGain.gain.setValueAtTime(this.isMuted ? 0 : 0.05, this.ctx.currentTime);

        noise.connect(filter);
        filter.connect(this.windGain);
        this.windGain.connect(this.ctx.destination);
        noise.start();
        this.windNode = noise;
      } catch (e) {}
    }

    playBeep(freq = 900, duration = 0.08, type = 'sine') {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    }

    playScanSound() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        // High-tech rising scanner chirp
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.28);
      } catch (e) {}
    }

    playCollectSound() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        // Bright metallic discovery chime: E5 -> G#5 -> B5
        [659.25, 830.61, 987.77].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + idx * 0.08);
          osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
        });
      } catch (e) {}
    }

    playRoverEngine() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(65, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
      } catch (e) {}
    }

    playRefillSound() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        // Pressurized airlock hiss
        const bufferSize = this.ctx.sampleRate * 0.6;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.12;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);
        filter.Q.setValueAtTime(3.0, this.ctx.currentTime);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
      } catch (e) {}
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.windGain) {
        this.windGain.gain.setValueAtTime(this.isMuted ? 0 : 0.05, this.ctx.currentTime);
      }
      return this.isMuted;
    }
  }

  // ==========================================
  // 5. MAIN MARS EXPLORER ENGINE CLASS
  // ==========================================
  class MarsExplorerEngine {
    constructor() {
      this.audio = new MarsAudio();
      this.lang = 'en';
      this.isVoiceEnabled = true;
      this.isInitialized = false;

      // Three.js References
      this.canvas = null;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.sunLight = null;
      this.ambientLight = null;

      // 3D Scene Assets
      this.terrain = null;
      this.habGroup = null;
      this.roverGroup = null;
      this.astronautGroup = null;
      this.sampleMeshes = [];
      this.dustParticles = null;
      this.skyDome = null;
      this.phobosMesh = null;
      this.deimosMesh = null;

      // Player & Vehicle State
      this.player = {
        x: 0,
        z: 18,
        rotation: 0,
        oxygen: CONFIG.baseOxygenMax,
        oxygenMax: CONFIG.baseOxygenMax,
        battery: CONFIG.baseBatteryMax,
        batteryMax: CONFIG.baseBatteryMax,
        suitTemp: -48, // °C on Mars
        inRover: false,
        backpack: [],
        backpackMax: CONFIG.baseBackpackCapacity,
        credits: 100,
        speedBonus: 1.0,
        scannerUpgraded: false
      };

      this.keys = {
        w: false, s: false, a: false, d: false, shift: false
      };

      // Game World State
      this.worldTime = 0; // clock for day/night
      this.isStormActive = false;
      this.stormTimer = 0;
      this.targetedSample = null;

      // Mission Objectives Progress
      this.missions = {
        scanBasalt: false,
        findIce: false,
        collectHematite: false,
        depositBase: false
      };
    }

    init() {
      if (this.isInitialized) return;
      this.canvas = document.getElementById('marsCanvas');
      if (!this.canvas) return;

      this.setupThreeScene();
      this.setupMartianTerrain();
      this.setupBaseStation();
      this.setupRoverModel();
      this.setupAstronautModel();
      this.setupScannableSamples();
      this.setupDustParticles();
      this.setupEventListeners();

      this.isInitialized = true;
      this.updateHUD();
      this.animate();
    }

    // ------------------------------------------
    // 3D SCENE & LIGHTING
    // ------------------------------------------
    setupThreeScene() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xb45309); // Martian butterscotch sky
      this.scene.fog = new THREE.FogExp2(0xb45309, 0.008);

      this.camera = new THREE.PerspectiveCamera(55, w / h, 0.2, 1000);
      this.camera.position.set(0, 5, 26);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;

      // Martian Ambient & Distant Sun Light
      this.ambientLight = new THREE.AmbientLight(0xff9966, 0.65);
      this.scene.add(this.ambientLight);

      this.sunLight = new THREE.DirectionalLight(0xfff3e0, 1.4);
      this.sunLight.position.set(120, 150, 100);
      this.sunLight.castShadow = true;
      this.sunLight.shadow.mapSize.width = 1024;
      this.sunLight.shadow.mapSize.height = 1024;
      this.scene.add(this.sunLight);

      // Phobos and Deimos Moons
      const moonGeo = new THREE.DodecahedronGeometry(2.5, 1);
      const moonMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
      this.phobosMesh = new THREE.Mesh(moonGeo, moonMat);
      this.phobosMesh.position.set(-160, 180, -200);
      this.scene.add(this.phobosMesh);

      const dGeo = new THREE.DodecahedronGeometry(1.4, 1);
      this.deimosMesh = new THREE.Mesh(dGeo, moonMat);
      this.deimosMesh.position.set(220, 220, -180);
      this.scene.add(this.deimosMesh);
    }

    // ------------------------------------------
    // MARTIAN PROCEDURAL TERRAIN
    // ------------------------------------------
    setupMartianTerrain() {
      const size = 360;
      const segments = 90;
      const geo = new THREE.PlaneGeometry(size, size, segments, segments);

      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const dist = Math.sqrt(vx * vx + vy * vy);

        // Keep base station in center relatively flat
        let height = 0;
        if (dist > 18) {
          height = Math.sin(vx * 0.05) * Math.cos(vy * 0.05) * 4.5 +
                   Math.sin(vx * 0.12 + vy * 0.12) * 1.8;
          // Crater rim depression
          if (dist > 60 && dist < 95) {
            height += Math.sin((dist - 60) * 0.1) * 3.5;
          }
        }
        pos.setZ(i, height);
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: 0xc2410c, // Martian red-orange soil
        roughness: 0.95,
        metalness: 0.05,
        flatShading: true
      });

      this.terrain = new THREE.Mesh(geo, mat);
      this.terrain.rotation.x = -Math.PI / 2;
      this.terrain.receiveShadow = true;
      this.scene.add(this.terrain);

      // Add scattered boulders
      const rockGeo = new THREE.DodecahedronGeometry(1.2, 1);
      const rockMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.9 });
      for (let i = 0; i < 60; i++) {
        const rock = new THREE.Mesh(rockGeo, rockMat);
        const rx = (Math.random() - 0.5) * 280;
        const rz = (Math.random() - 0.5) * 280;
        if (Math.hypot(rx, rz) < 18) continue; // Keep clear of base
        const scale = 0.5 + Math.random() * 1.8;
        rock.scale.set(scale, scale * (0.6 + Math.random() * 0.4), scale);
        rock.position.set(rx, 0, rz);
        rock.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
        this.scene.add(rock);
      }
    }

    // ------------------------------------------
    // BASE STATION & HABITAT DOME
    // ------------------------------------------
    setupBaseStation() {
      this.habGroup = new THREE.Group();

      // Main Geodesic Pressurized Habitat Dome
      const domeGeo = new THREE.SphereGeometry(9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.35,
        metalness: 0.2
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.castShadow = true;
      this.habGroup.add(dome);

      // Airlock Chamber
      const airlockGeo = new THREE.CylinderGeometry(2.2, 2.2, 5, 16);
      const airlockMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
      const airlock = new THREE.Mesh(airlockGeo, airlockMat);
      airlock.rotation.z = Math.PI / 2;
      airlock.position.set(0, 1.8, 8.5);
      this.habGroup.add(airlock);

      // Glowing Airlock Ring (Refill & Sample Deposit Point)
      const ringGeo = new THREE.TorusGeometry(2.4, 0.15, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, 1.8, 10.5);
      this.habGroup.add(ring);

      // Solar Array Panels (Twin tracking panels)
      [-14, 14].forEach(x => {
        const postGeo = new THREE.CylinderGeometry(0.3, 0.3, 5, 8);
        const postMat = new THREE.MeshStandardMaterial({ color: 0x64748b });
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.set(x, 2.5, -4);

        const panelGeo = new THREE.BoxGeometry(8, 0.2, 4);
        const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.9, roughness: 0.15 });
        const panel = new THREE.Mesh(panelGeo, panelMat);
        panel.position.set(x, 5.2, -4);
        panel.rotation.x = 0.45;

        this.habGroup.add(post);
        this.habGroup.add(panel);
      });

      // High-Gain Communication Satellite Dish
      const dishGeo = new THREE.SphereGeometry(3.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 3);
      const dishMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, side: THREE.DoubleSide });
      const dish = new THREE.Mesh(dishGeo, dishMat);
      dish.position.set(0, 9.5, -3);
      dish.rotation.x = -1.2;
      this.habGroup.add(dish);

      this.scene.add(this.habGroup);
    }

    // ------------------------------------------
    // 6-WHEEL PRESSURIZED ROVER
    // ------------------------------------------
    setupRoverModel() {
      this.roverGroup = new THREE.Group();

      // Main Cabin Body
      const cabGeo = new THREE.BoxGeometry(3.4, 1.8, 5.2);
      const cabMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9, // White space-grade thermal paint
        metalness: 0.4,
        roughness: 0.3
      });
      const cab = new THREE.Mesh(cabGeo, cabMat);
      cab.position.y = 1.6;
      cab.castShadow = true;
      this.roverGroup.add(cab);

      // Gold Cockpit Windshield Visor
      const visorGeo = new THREE.BoxGeometry(3.0, 1.0, 1.2);
      const visorMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.95,
        roughness: 0.1
      });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.position.set(0, 2.0, 2.2);
      this.roverGroup.add(visor);

      // Top Equipment Rack & Mast
      const mastGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.5, 8);
      const mastMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
      const mast = new THREE.Mesh(mastGeo, mastMat);
      mast.position.set(0, 3.4, 0.8);
      this.roverGroup.add(mast);

      // 6 Heavy-Duty Martian Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.65, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.95 });
      const wheelPositions = [
        [-2.0, 0.75, -1.8], [2.0, 0.75, -1.8],
        [-2.0, 0.75, 0.0],  [2.0, 0.75, 0.0],
        [-2.0, 0.75, 1.8],  [2.0, 0.75, 1.8]
      ];
      wheelPositions.forEach(p => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(p[0], p[1], p[2]);
        this.roverGroup.add(wheel);
      });

      // Starting position parked outside Hab
      this.roverGroup.position.set(9, 0, 14);
      this.roverGroup.rotation.y = 0.5;
      this.scene.add(this.roverGroup);
    }

    // ------------------------------------------
    // ASTRONAUT 3D CHARACTER MODEL
    // ------------------------------------------
    setupAstronautModel() {
      this.astronautGroup = new THREE.Group();

      // White EVA Space Suit Torso
      const torsoGeo = new THREE.CylinderGeometry(0.55, 0.45, 1.4, 12);
      const suitMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 });
      const torso = new THREE.Mesh(torsoGeo, suitMat);
      torso.position.y = 1.3;
      torso.castShadow = true;
      this.astronautGroup.add(torso);

      // Gold-Reflective Visor Helmet
      const helmetGeo = new THREE.SphereGeometry(0.48, 16, 16);
      const helmetMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
      const helmet = new THREE.Mesh(helmetGeo, helmetMat);
      helmet.position.y = 2.2;
      this.astronautGroup.add(helmet);

      const visorGeo = new THREE.SphereGeometry(0.35, 16, 16, 0, Math.PI, 0, Math.PI);
      const visorMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.1 });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.rotation.x = Math.PI / 2;
      visor.position.set(0, 2.2, 0.2);
      this.astronautGroup.add(visor);

      // Life Support Backpack (PLSS)
      const plssGeo = new THREE.BoxGeometry(0.8, 1.1, 0.45);
      const plssMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
      const plss = new THREE.Mesh(plssGeo, plssMat);
      plss.position.set(0, 1.4, -0.35);
      this.astronautGroup.add(plss);

      // Initial Position
      this.astronautGroup.position.set(this.player.x, 0, this.player.z);
      this.scene.add(this.astronautGroup);
    }

    // ------------------------------------------
    // SCANNABLE ROCK & ICE SAMPLES
    // ------------------------------------------
    setupScannableSamples() {
      const sampleTypes = TRANSLATIONS.en.samples;
      const locations = [
        { type: 0, x: -28, z: 22 },  // Basalt
        { type: 1, x: 35, z: -30 },  // Hematite
        { type: 2, x: -45, z: -40 }, // Sandstone
        { type: 3, x: 55, z: 45 },   // Water Ice
        { type: 4, x: -65, z: 60 },  // Biogenic Spheroid
        { type: 0, x: 70, z: -60 },  // Basalt 2
        { type: 1, x: -80, z: -20 }, // Hematite 2
        { type: 3, x: 25, z: 80 }    // Water Ice 2
      ];

      locations.forEach((loc, idx) => {
        const typeData = sampleTypes[loc.type];
        const group = new THREE.Group();

        // 3D Rock Mesh
        const geo = new THREE.DodecahedronGeometry(0.7, 1);
        const mat = new THREE.MeshStandardMaterial({
          color: typeData.color,
          roughness: 0.85
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.scale.set(1.2, 0.8, 1.0);
        group.add(mesh);

        // Holographic Target Beacon Ring
        const ringGeo = new THREE.RingGeometry(1.2, 1.4, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x06b6d4,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7
        });
        const beacon = new THREE.Mesh(ringGeo, ringMat);
        beacon.rotation.x = -Math.PI / 2;
        beacon.position.y = 0.05;
        group.add(beacon);

        group.position.set(loc.x, 0.4, loc.z);
        group.userData = {
          sampleIndex: loc.type,
          collected: false,
          id: `sample_${idx}`
        };

        this.sampleMeshes.push(group);
        this.scene.add(group);
      });
    }

    // ------------------------------------------
    // DUST PARTICLES & STORM DYNAMICS
    // ------------------------------------------
    setupDustParticles() {
      const count = 600;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 200;
        pos[i * 3 + 1] = Math.random() * 25;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xea580c,
        size: 0.9,
        transparent: true,
        opacity: 0.45
      });

      this.dustParticles = new THREE.Points(geo, mat);
      this.scene.add(this.dustParticles);
    }

    // ------------------------------------------
    // INTERACTIVE ACTIONS: SCAN & COLLECT
    // ------------------------------------------
    scanNearestSample() {
      const activePos = this.player.inRover ? this.roverGroup.position : this.astronautGroup.position;
      let closest = null;
      let minDistance = CONFIG.scanRange;

      this.sampleMeshes.forEach(sGroup => {
        if (sGroup.userData.collected) return;
        const d = activePos.distanceTo(sGroup.position);
        if (d < minDistance) {
          minDistance = d;
          closest = sGroup;
        }
      });

      if (closest) {
        this.targetedSample = closest;
        const sData = TRANSLATIONS[this.lang].samples[closest.userData.sampleIndex];
        this.audio.playScanSound();

        // Update Mission Checkmarks
        if (sData.id === 'basalt') this.missions.scanBasalt = true;
        if (sData.id === 'ice') this.missions.findIce = true;
        if (sData.id === 'hematite') this.missions.collectHematite = true;

        // Display Scanner Card
        const card = document.getElementById('marsScannerCard');
        document.getElementById('marsScanName').textContent = sData.name;
        document.getElementById('marsScanClass').textContent = `${sData.classification} • AI CONFIDENCE: ${sData.confidence}`;
        document.getElementById('marsScanFacts').textContent = sData.facts;
        document.getElementById('marsScanCredits').textContent = `+${sData.credits} CREDITS`;
        card.classList.add('is-open');

        // Spoken AI Assistant Intel
        if (this.isVoiceEnabled) {
          this.speakIntel(`Scan analysis complete: ${sData.name}. ${sData.facts}`);
        }

        this.updateHUD();
      } else {
        this.audio.playBeep(400, 0.08);
      }
    }

    collectCurrentSample() {
      if (!this.targetedSample) return;
      if (this.player.backpack.length >= this.player.backpackMax) {
        this.audio.playBeep(300, 0.15);
        alert(this.lang === 'en' ? 'Backpack full! Return to Hab Dome to deposit samples.' : 'बैकपैक भर गया है! नमूने जमा करने के लिए बेस लौटें।');
        return;
      }

      this.targetedSample.userData.collected = true;
      this.targetedSample.visible = false;
      this.player.backpack.push(this.targetedSample.userData.sampleIndex);
      this.audio.playCollectSound();

      document.getElementById('marsScannerCard').classList.remove('is-open');
      this.targetedSample = null;
      this.updateHUD();
    }

    depositSamplesAtBase() {
      const activePos = this.player.inRover ? this.roverGroup.position : this.astronautGroup.position;
      const distToBase = activePos.distanceTo(new THREE.Vector3(0, 0, 8.5));

      if (distToBase < CONFIG.depositDistance) {
        // Refill Oxygen and Battery
        this.player.oxygen = this.player.oxygenMax;
        this.player.battery = this.player.batteryMax;

        // Deposit backpack items
        if (this.player.backpack.length > 0) {
          let earned = 0;
          this.player.backpack.forEach(sIdx => {
            earned += TRANSLATIONS.en.samples[sIdx].credits;
          });
          this.player.credits += earned;
          this.player.backpack = [];
          this.missions.depositBase = true;
          this.audio.playRefillSound();
          if (this.isVoiceEnabled) {
            this.speakIntel(this.lang === 'en'
              ? `Samples transferred to science lab! Earned ${earned} Mission Credits. Life support replenished.`
              : `नमूने प्रयोगशाला में जमा किए गए! ${earned} मिशन क्रेडिट अर्जित किए।`);
          }
        }
        this.updateHUD();
      }
    }

    toggleRover() {
      const dist = this.astronautGroup.position.distanceTo(this.roverGroup.position);
      if (!this.player.inRover) {
        // Enter Rover if close
        if (dist < 5.0) {
          this.player.inRover = true;
          this.astronautGroup.visible = false;
          this.audio.playBeep(980, 0.1);
          if (this.isVoiceEnabled) this.speakIntel('Pressurized Exploration Rover Online. Speed boosted.');
        } else {
          this.audio.playBeep(380, 0.08);
        }
      } else {
        // Exit Rover
        this.player.inRover = false;
        this.astronautGroup.visible = true;
        this.astronautGroup.position.set(
          this.roverGroup.position.x + 2.5,
          0,
          this.roverGroup.position.z
        );
        this.audio.playBeep(700, 0.1);
      }
      this.updateHUD();
    }

    // ------------------------------------------
    // UPGRADES & SHOP SYSTEM
    // ------------------------------------------
    openUpgradesModal() {
      document.getElementById('marsUpgradesModal').classList.add('is-open');
    }

    buyUpgrade(type) {
      if (type === 'oxygen' && this.player.credits >= 100) {
        this.player.credits -= 100;
        this.player.oxygenMax += 50;
        this.player.oxygen = this.player.oxygenMax;
        this.audio.playCollectSound();
        alert('Upgraded Oxygen Tank MK-II (+50% capacity)!');
      } else if (type === 'rover' && this.player.credits >= 150) {
        this.player.credits -= 150;
        this.player.speedBonus += 0.4;
        this.audio.playCollectSound();
        alert('Rover Turbo Engine Installed (+40% top speed)!');
      } else if (type === 'scanner' && this.player.credits >= 120) {
        this.player.credits -= 120;
        this.player.scannerUpgraded = true;
        this.audio.playCollectSound();
        alert('Quantum Spectrometer Installed (+50% scan range)!');
      } else if (type === 'battery' && this.player.credits >= 80) {
        this.player.credits -= 80;
        this.player.batteryMax += 40;
        this.player.battery = this.player.batteryMax;
        this.audio.playCollectSound();
        alert('Solar Super-Capacitor Battery Installed (+40% capacity)!');
      } else {
        this.audio.playBeep(320, 0.1);
        alert('Insufficient Mission Credits! Explore terrain and deposit samples at the Hab Dome.');
      }
      this.updateHUD();
    }

    openRealMissionsModal() {
      const modal = document.getElementById('marsRealMissionsModal');
      const list = document.getElementById('marsMissionsList');
      list.innerHTML = '';

      REAL_MISSIONS.forEach(m => {
        const item = document.createElement('div');
        item.style.background = 'rgba(255,255,255,0.03)';
        item.style.border = '1px solid rgba(249,115,22,0.2)';
        item.style.borderRadius = '8px';
        item.style.padding = '14px';
        item.style.marginBottom = '12px';
        item.innerHTML = `
          <div style="font-size:0.68rem; font-family:monospace; color:#f97316; font-weight:bold;">${m.agency} • ${m.year}</div>
          <div style="font-size:1.05rem; font-weight:bold; color:#fff; margin:4px 0 6px 0;">${m.name}</div>
          <div style="font-size:0.84rem; line-height:1.5; color:#cbd5e1; margin-bottom:8px;">${m.desc}</div>
          <div style="font-size:0.78rem; font-family:monospace; color:#06b6d4;"><strong>Key Discovery:</strong> ${m.findings}</div>
        `;
        list.appendChild(item);
      });

      modal.classList.add('is-open');
    }

    // ------------------------------------------
    // HUD & STATE SYNCHRONIZATION
    // ------------------------------------------
    updateHUD() {
      // Oxygen & Battery Bars
      const oxyPct = Math.max(0, Math.round((this.player.oxygen / this.player.oxygenMax) * 100));
      const batPct = Math.max(0, Math.round((this.player.battery / this.player.batteryMax) * 100));

      const oxyFill = document.getElementById('marsOxygenFill');
      const batFill = document.getElementById('marsBatteryFill');
      const oxyVal = document.getElementById('marsOxygenVal');
      const batVal = document.getElementById('marsBatteryVal');

      if (oxyFill) oxyFill.style.width = `${oxyPct}%`;
      if (batFill) batFill.style.width = `${batPct}%`;
      if (oxyVal) oxyVal.textContent = `${oxyPct}%`;
      if (batVal) batVal.textContent = `${batPct}%`;

      // Backpack & Credits
      const credVal = document.getElementById('marsCreditsVal');
      const packVal = document.getElementById('marsBackpackVal');
      if (credVal) credVal.textContent = `${this.player.credits}`;
      if (packVal) packVal.textContent = `${this.player.backpack.length} / ${this.player.backpackMax}`;

      // Vehicle Status
      const modeLabel = document.getElementById('marsVehicleMode');
      if (modeLabel) {
        modeLabel.textContent = this.player.inRover ? 'PRESSURIZED ROVER' : 'ON-FOOT EVA SUIT';
      }

      // Objectives Checkmarks
      const m1 = document.getElementById('objScanBasalt');
      const m2 = document.getElementById('objFindIce');
      const m3 = document.getElementById('objHematite');
      const m4 = document.getElementById('objDeposit');

      if (m1) m1.className = `mars-obj-item ${this.missions.scanBasalt ? 'is-done' : ''}`;
      if (m2) m2.className = `mars-obj-item ${this.missions.findIce ? 'is-done' : ''}`;
      if (m3) m3.className = `mars-obj-item ${this.missions.collectHematite ? 'is-done' : ''}`;
      if (m4) m4.className = `mars-obj-item ${this.missions.depositBase ? 'is-done' : ''}`;
    }

    speakIntel(text) {
      if (!this.isVoiceEnabled || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
      utterance.lang = (this.lang === 'hi') ? 'hi-IN' : 'en-US';
      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }

    toggleVoice() {
      this.isVoiceEnabled = !this.isVoiceEnabled;
      const btn = document.getElementById('marsVoiceBtn');
      if (btn) btn.textContent = this.isVoiceEnabled ? '🎙️ Voice: ON' : '🎙️ Voice: OFF';
    }

    toggleLanguage() {
      this.lang = (this.lang === 'en' ? 'hi' : 'en');
      const btn = document.getElementById('marsLangBtn');
      if (btn) btn.textContent = (this.lang === 'en' ? 'हिन्दी' : 'EN');
      this.updateHUD();
    }

    // ------------------------------------------
    // EVENT LISTENERS & CONTROLS
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

      // Keyboard Inputs
      window.addEventListener('keydown', (e) => {
        const stage = document.getElementById('marsStage');
        if (!stage || stage.style.display === 'none') return;

        if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.w = true;
        if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.s = true;
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.a = true;
        if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.d = true;
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.keys.shift = true;

        if (e.code === 'KeyF') this.scanNearestSample();
        if (e.code === 'KeyE') this.collectCurrentSample();
        if (e.code === 'KeyR') this.toggleRover();
      });

      window.addEventListener('keyup', (e) => {
        if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.w = false;
        if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.s = false;
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.a = false;
        if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.d = false;
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.keys.shift = false;
      });

      // UI Buttons
      document.getElementById('marsBtnScan').addEventListener('click', () => this.scanNearestSample());
      document.getElementById('marsBtnCollect').addEventListener('click', () => this.collectCurrentSample());
      document.getElementById('marsBtnRover').addEventListener('click', () => this.toggleRover());
      document.getElementById('marsBtnUpgrades').addEventListener('click', () => this.openUpgradesModal());
      document.getElementById('marsBtnRealMissions').addEventListener('click', () => this.openRealMissionsModal());
      document.getElementById('marsVoiceBtn').addEventListener('click', () => this.toggleVoice());
      document.getElementById('marsLangBtn').addEventListener('click', () => this.toggleLanguage());
      document.getElementById('marsAudioBtn').addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        document.getElementById('marsAudioBtn').textContent = isMuted ? '🔇 Audio: MUTED' : '🔊 Audio: ON';
      });

      // Dialog Close Buttons
      document.querySelectorAll('.mars-modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.target.closest('.mars-modal-overlay').classList.remove('is-open');
        });
      });

      // Upgrades Actions
      document.getElementById('btnUpgOxygen').addEventListener('click', () => this.buyUpgrade('oxygen'));
      document.getElementById('btnUpgRover').addEventListener('click', () => this.buyUpgrade('rover'));
      document.getElementById('btnUpgScanner').addEventListener('click', () => this.buyUpgrade('scanner'));
      document.getElementById('btnUpgBattery').addEventListener('click', () => this.buyUpgrade('battery'));

      // Touch Buttons for Mobile
      const tScan = document.getElementById('marsTouchScan');
      const tCollect = document.getElementById('marsTouchCollect');
      const tRover = document.getElementById('marsTouchRover');
      if (tScan) tScan.addEventListener('pointerdown', () => this.scanNearestSample());
      if (tCollect) tCollect.addEventListener('pointerdown', () => this.collectCurrentSample());
      if (tRover) tRover.addEventListener('pointerdown', () => this.toggleRover());
    }

    // ------------------------------------------
    // MAIN 60 FPS SIMULATION LOOP
    // ------------------------------------------
    animate() {
      requestAnimationFrame(() => this.animate());

      const dt = 0.016; // ~60 FPS
      this.worldTime += dt;

      // 1. Day / Night Cycle (Moving Sun and Changing Sky Color)
      const dayCycle = (this.worldTime % CONFIG.dayNightCycleDuration) / CONFIG.dayNightCycleDuration;
      const sunAngle = dayCycle * Math.PI * 2;
      this.sunLight.position.set(
        Math.cos(sunAngle) * 150,
        Math.sin(sunAngle) * 150,
        80
      );

      // Night Sky Shading
      if (Math.sin(sunAngle) < 0) {
        this.scene.background.setHex(0x06020a); // Night
        this.ambientLight.intensity = 0.25;
      } else {
        this.scene.background.setHex(0xb45309); // Day
        this.ambientLight.intensity = 0.65;
      }

      // Rotate Moons
      if (this.phobosMesh) this.phobosMesh.rotation.y += 0.002;
      if (this.deimosMesh) this.deimosMesh.rotation.y += 0.001;

      // 2. Dust Storm Dynamics (Occasional Dust Storm)
      this.stormTimer += dt;
      if (this.stormTimer > 45) {
        this.isStormActive = !this.isStormActive;
        this.stormTimer = 0;
        const stage = document.getElementById('marsStage');
        if (stage) stage.classList.toggle('mars-storm-active', this.isStormActive);
        if (this.isStormActive && this.isVoiceEnabled) {
          this.speakIntel('Notice: Martian dust storm incoming. Visibility reduced.');
        }
      }

      // Animate Dust Particles
      if (this.dustParticles) {
        const pArr = this.dustParticles.geometry.attributes.position.array;
        const stormSpeed = this.isStormActive ? 4.5 : 1.2;
        for (let i = 0; i < pArr.length / 3; i++) {
          pArr[i * 3] += stormSpeed * dt * 5;
          if (pArr[i * 3] > 100) pArr[i * 3] = -100;
        }
        this.dustParticles.geometry.attributes.position.needsUpdate = true;
      }

      // 3. Player Movement & Physics
      let speed = this.keys.shift ? CONFIG.sprintSpeed : CONFIG.walkSpeed;
      if (this.player.inRover) speed = CONFIG.roverSpeed * this.player.speedBonus;

      const activeObj = this.player.inRover ? this.roverGroup : this.astronautGroup;

      if (this.keys.a) activeObj.rotation.y += CONFIG.turnSpeed * dt;
      if (this.keys.d) activeObj.rotation.y -= CONFIG.turnSpeed * dt;

      let moveForward = 0;
      if (this.keys.w) moveForward = 1;
      if (this.keys.s) moveForward = -0.6;

      if (moveForward !== 0) {
        const rot = activeObj.rotation.y;
        activeObj.position.x += Math.sin(rot) * moveForward * speed * dt;
        activeObj.position.z += Math.cos(rot) * moveForward * speed * dt;

        if (this.player.inRover) {
          this.audio.playRoverEngine();
        }

        // Oxygen & Battery Consumption
        if (!this.player.inRover) {
          const drain = this.keys.shift ? CONFIG.oxygenDrainRate * 1.6 : CONFIG.oxygenDrainRate;
          this.player.oxygen = Math.max(0, this.player.oxygen - drain * dt);
          this.player.battery = Math.max(0, this.player.battery - CONFIG.batteryDrainRate * dt);
        } else {
          // In rover: rover battery drains, oxygen preserved
          this.player.battery = Math.max(0, this.player.battery - (CONFIG.batteryDrainRate * 0.7) * dt);
        }
      }

      // Keep position within bounds (-160 to 160)
      activeObj.position.x = Math.max(-150, Math.min(150, activeObj.position.x));
      activeObj.position.z = Math.max(-150, Math.min(150, activeObj.position.z));

      // 4. Camera Follow Behind Active Object
      const camOffset = this.player.inRover
        ? new THREE.Vector3(0, 4.5, -9.5)
        : new THREE.Vector3(0, 3.2, -6.5);
      camOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), activeObj.rotation.y);

      const targetCamPos = activeObj.position.clone().add(camOffset);
      this.camera.position.lerp(targetCamPos, 0.12);
      this.camera.lookAt(activeObj.position.x, activeObj.position.y + 1.8, activeObj.position.z);

      // Check proximity to base for refill and sample deposit
      this.depositSamplesAtBase();

      // Check Oxygen Depletion
      if (this.player.oxygen <= 0) {
        // Respawn at Base
        this.player.oxygen = this.player.oxygenMax;
        this.player.battery = this.player.batteryMax;
        this.player.backpack = []; // Lose carried samples
        activeObj.position.set(0, 0, 18);
        alert(TRANSLATIONS[this.lang].respawnMsg);
      }

      // 5. Update Compass Heading
      const compassPin = document.getElementById('marsCompassHeading');
      if (compassPin) {
        const deg = Math.round((activeObj.rotation.y * 180 / Math.PI) % 360);
        compassPin.textContent = `${(deg + 360) % 360}°`;
      }

      // Update HUD values
      this.updateHUD();

      // Render Three.js Scene
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }

  // Export engine to window
  window.MarsExplorerEngine = new MarsExplorerEngine();

})();
