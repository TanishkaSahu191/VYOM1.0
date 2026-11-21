/**
 * ============================================================================
 * MY SPACESHIP: LIFE IN SPACE — 3D CREW HABITAT + 4 EDUCATIONAL CHALLENGES
 * VYOM 1.0 · Cutaway hab module: Dock area, Sleeping, Bathing, Food, Control.
 * Astronaut model: Advanced_Crew_Escape_Suit.glb (converted to suit_data.js).
 * Rules: 4 challenges, 3 lives. Lose all 3 lives and the mission restarts.
 * ============================================================================
 */
(function () {
  'use strict';

  // ==========================================
  // 1. CONFIGURATION
  // ==========================================
  const CONFIG = { roomW: 26, roomD: 16, roomH: 5.2, walkSpeed: 2.3, freeSpeed: 3.2, lives: 3, fov: 50 };
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const angDiff = (a, b) => { let d = (b - a) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; return d; };
  const rand = (a, b) => a + Math.random() * (b - a);
  const shuffle = (arr) => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(p => p[1]);

  // Camera presets for each crew unit (also used by the left "Crew Units" bar)
  const UNITS = {
    dock:    { target: [0, 1.2, 0],     az: 0,    el: 0.62, dist: 25, title: 'Dock Area', sub: 'CENTRAL HAB · EXPLORE WITH W A S D',
               desc: 'The open middle of the module. Crew move between the sleeping, bathing, food and control units from here, pulling themselves along handrails. Walk the astronaut around with W A S D.',
               s1: 'FREE EXPLORE', s2: '4 UNITS CONNECTED' },
    sleep:   { target: [-10.5, 1.4, 4.5], az: 0.75, el: 0.4, dist: 11, title: 'Sleeping Unit', sub: 'CREW QUARTERS · CHALLENGE 1',
               desc: 'A private cubicle with a sleeping bag fixed to the wall and a few personal belongings such as a laptop. Fixing the bag matters: in zero gravity nothing keeps a sleeper in place.',
               s1: 'SLEEPING BAG: WALL-MOUNTED', s2: 'VENTILATION FAN: ON' },
    bath:    { target: [-9, 1.8, -5],   az: 0,    el: 0.3,  dist: 11.5, title: 'Bathing Unit', sub: 'HYGIENE STATION · CHALLENGES 2 & 3',
               desc: 'A blue hygiene kit hangs on the wall with a toothbrush, toothpaste, water pouch and nail clippers. A vent beside it pulls air (and loose debris) into a filter.',
               s1: 'WATER: RATIONED', s2: 'VENT: AIR INTAKE ACTIVE' },
    food:    { target: [10.5, 1.5, 4.5], az: -0.75, el: 0.4, dist: 11, title: 'Food Unit', sub: 'GALLEY · CHALLENGE 4',
               desc: 'Packaged meals on a shelf, a food warmer and a water dispenser. Everything is sealed or pouched so crumbs and droplets cannot escape into the cabin.',
               s1: 'FOOD: PACKAGED', s2: 'WATER: RECYCLED' },
    control: { target: [9, 1.8, -5],    az: 0,    el: 0.3,  dist: 11.5, title: 'Control Room', sub: 'FLIGHT CONSOLE',
               desc: 'The flight console: crew switch cabin lights and watch for debris from here. (A simple console; use the Day / Rest / Emergency lighting buttons at the top.)',
               s1: 'CONSOLE: ONLINE', s2: 'LIGHTS: CREW CONTROLLED' }
  };

  // ==========================================
  // 2. SYNTHESIZED WEB AUDIO
  // ==========================================
  class SpaceshipAudio {
    constructor() { this.ctx = null; this.isMuted = false; this.fanHumNode = null; this.fanGain = null; }
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) { this.ctx = new AC(); this.startFanAmbience(); }
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    }
    startFanAmbience() {
      if (!this.ctx || this.fanHumNode) return;
      try {
        const size = this.ctx.sampleRate * 2;
        const buf = this.ctx.createBuffer(1, size, this.ctx.sampleRate);
        const d = buf.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < size; i++) {
          const w = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
          d[i] = (b0 + b1 + b2) * 0.08;
        }
        const noise = this.ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
        const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(320, this.ctx.currentTime);
        this.fanGain = this.ctx.createGain(); this.fanGain.gain.setValueAtTime(this.isMuted ? 0 : 0.06, this.ctx.currentTime);
        noise.connect(f); f.connect(this.fanGain); this.fanGain.connect(this.ctx.destination); noise.start();
        this.fanHumNode = noise;
      } catch (e) {}
    }
    tone(freq, dur, type, vol, delay) {
      if (this.isMuted) return; this.init(); if (!this.ctx) return;
      try {
        const t0 = this.ctx.currentTime + (delay || 0);
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = type || 'triangle'; o.frequency.setValueAtTime(freq, t0);
        g.gain.setValueAtTime(vol || 0.08, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
        o.connect(g); g.connect(this.ctx.destination); o.start(t0); o.stop(t0 + dur);
      } catch (e) {}
    }
    playClickSound() { this.tone(1200, 0.04, 'triangle', 0.08); }
    playGood() { this.tone(520, 0.14, 'triangle', 0.09); this.tone(780, 0.22, 'triangle', 0.09, 0.13); }
    playBad() { this.tone(140, 0.45, 'sawtooth', 0.09); this.tone(100, 0.5, 'sawtooth', 0.09, 0.15); }
    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.fanGain) this.fanGain.gain.setValueAtTime(this.isMuted ? 0 : 0.06, this.ctx.currentTime);
      return this.isMuted;
    }
  }

  // ==========================================
  // 3. SMALL MESH HELPERS
  // ==========================================
  const mat = (color, o) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.55, metalness: 0.25 }, o || {}));
  function box(w, h, d, color, o, x, y, z, parent) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, o));
    m.position.set(x || 0, y || 0, z || 0); if (parent) parent.add(m); return m;
  }
  function cyl(rt, rb, h, color, o, x, y, z, parent, seg) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 16), mat(color, o));
    m.position.set(x || 0, y || 0, z || 0); if (parent) parent.add(m); return m;
  }
  function sphere(r, color, o, x, y, z, parent) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), mat(color, o));
    m.position.set(x || 0, y || 0, z || 0); if (parent) parent.add(m); return m;
  }
  function textSprite(text, w, h, font, bg) {
    const c = document.createElement('canvas'); c.width = 512; c.height = 96;
    const g = c.getContext('2d');
    if (bg) { g.fillStyle = 'rgba(15,23,42,0.82)'; g.fillRect(0, 0, 512, 96); g.strokeStyle = '#38bdf8'; g.lineWidth = 3; g.strokeRect(2, 2, 508, 92); }
    g.fillStyle = '#fff'; g.font = font || 'bold 40px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, 256, 50);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthTest: false }));
    s.scale.set(w, h, 1); s.renderOrder = 10; return s;
  }

  // ==========================================
  // 4. ASTRONAUT (Advanced Crew Escape Suit, limbs split for animation)
  // ==========================================
  function b64ToBuf(s) { const bin = atob(s); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; }

  function buildSuitPart(name) {
    const g = new THREE.Group();
    const SUIT = window.SUIT_DATA;
    SUIT.parts[name].forEach(p => {
      const p16 = new Int16Array(b64ToBuf(p.p)), n8 = new Int8Array(b64ToBuf(p.n));
      const pos = new Float32Array(p16.length), nor = new Float32Array(n8.length);
      for (let i = 0; i < pos.length; i++) { pos[i] = p16[i] / 8000; nor[i] = n8[i] / 127; }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
      geo.setIndex(new THREE.BufferAttribute(new Uint16Array(b64ToBuf(p.i)), 1));
      const mc = SUIT.materials[p.m];
      g.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: new THREE.Color(mc.c[0], mc.c[1], mc.c[2]), roughness: Math.min(0.9, mc.r), metalness: 0.05 })));
    });
    return g;
  }

  class Astronaut {
    constructor(scene) {
      this.root = new THREE.Group();          // position + heading (rotation.y)
      this.rig = new THREE.Group();           // pitch (lying down / floating)
      this.root.add(this.rig);
      const P = (window.SUIT_DATA && window.SUIT_DATA.pivots) || { hipY: 0.81, hipX: 0.125, shoulderY: 1.36, shoulderX: 0.27 };
      const mk = (part, px, py) => {
        const pivot = new THREE.Group(); pivot.position.set(px, py, 0);
        const mesh = window.SUIT_DATA ? buildSuitPart(part) : new THREE.Group();
        mesh.position.set(-px, -py, 0); pivot.add(mesh); this.rig.add(pivot); return pivot;
      };
      if (window.SUIT_DATA) {
        this.rig.add(buildSuitPart('body'));
        this.legL = mk('legL', -P.hipX, P.hipY);     this.legR = mk('legR', P.hipX, P.hipY);
        this.armL = mk('armL', -P.shoulderX, P.shoulderY); this.armR = mk('armR', P.shoulderX, P.shoulderY);
      } else { // fallback if suit_data.js is missing
        box(0.5, 0.8, 0.3, 0xf97316, {}, 0, 1.2, 0, this.rig); sphere(0.22, 0xf8fafc, {}, 0, 1.75, 0, this.rig);
        this.legL = new THREE.Group(); this.legR = new THREE.Group(); this.armL = new THREE.Group(); this.armR = new THREE.Group();
        [this.legL, this.legR, this.armL, this.armR].forEach(x => this.rig.add(x));
      }
      // CO2 bubble (shown when sleeping in the open)
      this.co2 = sphere(0.5, 0xf59e0b, { transparent: true, opacity: 0.0, roughness: 1, metalness: 0, depthWrite: false }, 0, 1.7, 0.1, this.rig);
      scene.add(this.root);
      this.mode = 'idle'; this.phase = 0; this.t = 0;
      this.headingGoal = 0; this.path = []; this.pathDone = null;
    }
    get pos() { return this.root.position; }
    handWorld(dx, dy, dz) { return this.root.localToWorld(new THREE.Vector3(dx, dy, dz)); }
    update(dt, speedMul) {
      this.t += dt;
      // heading smoothing
      this.root.rotation.y += angDiff(this.root.rotation.y, this.headingGoal) * Math.min(1, dt * 8);
      // path following
      let moving = false;
      if (this.path.length) {
        const tg = this.path[0], dx = tg.x - this.root.position.x, dz = tg.z - this.root.position.z, d = Math.hypot(dx, dz);
        if (d < 0.08) { this.path.shift(); if (!this.path.length && this.pathDone) { const f = this.pathDone; this.pathDone = null; this.mode = 'idle'; f(); } }
        else {
          const step = Math.min(d, CONFIG.walkSpeed * dt);
          this.root.position.x += dx / d * step; this.root.position.z += dz / d * step;
          this.headingGoal = Math.atan2(dx, dz); moving = true;
        }
      }
      if (moving) this.phase += dt * 7; else if (this.mode === 'walk' && !this.path.length) this.mode = 'idle';
      const s = Math.sin(this.phase);
      const set = (limb, x, z) => { limb.rotation.x += (x - limb.rotation.x) * Math.min(1, dt * 12); limb.rotation.z += ((z || 0) - limb.rotation.z) * Math.min(1, dt * 12); };
      const breathe = Math.sin(this.t * 1.6) * 0.04;
      let bob = 0;
      switch (this.mode) {
        case 'brush': { const w = Math.sin(this.t * 14) * 0.18; set(this.armR, -2.0 + w, -0.1); set(this.armL, -0.7, 0.15); set(this.legL, 0.1); set(this.legR, -0.1); bob = breathe; break; }
        case 'cut':   { set(this.armR, -1.35 + Math.sin(this.t * 9) * 0.08, -0.1); set(this.armL, -1.2, 0.1); set(this.legL, 0.1); set(this.legR, -0.1); bob = breathe; break; }
        case 'eat':   { const e = (Math.sin(this.t * 2.6) + 1) / 2; set(this.armR, -0.9 - e * 1.0, -0.1); set(this.armL, -1.1, 0.15); set(this.legL, 0.1); set(this.legR, -0.1); bob = breathe; break; }
        case 'float': set(this.armL, -0.3, 0.7); set(this.armR, -0.3, -0.7); set(this.legL, 0.35, 0.2); set(this.legR, -0.1, -0.2); break;
        case 'sleep': set(this.armL, 0, 0.05); set(this.armR, 0, -0.05); set(this.legL, 0); set(this.legR, 0); break;
        default:
          if (moving) { set(this.legL, s * 0.55); set(this.legR, -s * 0.55); set(this.armL, -s * 0.4, 0.1); set(this.armR, s * 0.4, -0.1); bob = Math.abs(s) * 0.05; }
          else { set(this.legL, 0.05); set(this.legR, -0.05); set(this.armL, 0.05, 0.12); set(this.armR, -0.05, -0.12); bob = breathe; }
      }
      if (this.mode !== 'sleep' && this.mode !== 'float') this.rig.position.y = bob;
      this.co2.material.opacity += ((this.mode === 'float' ? 0.28 + Math.sin(this.t * 3) * 0.06 : 0) - this.co2.material.opacity) * Math.min(1, dt * 3);
    }
  }

  // ==========================================
  // 5. MAIN ENGINE
  // ==========================================
  class SpaceshipEngine {
    constructor() {
      this.audio = new SpaceshipAudio();
      this.canvas = null; this.scene = null; this.camera = null; this.renderer = null;
      this.isInitialized = false;
      this.ambientLight = null; this.ceilingStripLight1 = null; this.ceilingStripLight2 = null;
      this.lightMode = 'day';
      this.cam = { tx: 0, ty: 1.2, tz: 0, az: 0, el: 0.62, dist: 25 };
      this.camGoal = Object.assign({}, this.cam);
      this.isDragging = false; this.dragMoved = 0; this.previousMousePos = { x: 0, y: 0 };
      this.keys = { w: false, s: false, a: false, d: false };
      this.earthMesh = null; this.blinkingLeds = []; this.animTime = 0;
      // game state
      this.run = 0; this.lives = CONFIG.lives; this.stage = 0; this.done = {};
      this.freeWalk = false; this.introShown = false;
      this.clickMeshes = []; this.handlers = {}; this.markers = []; this.items = {}; this.particles = []; this.zzz = [];
      this.shake = 0;
    }

    init() {
      if (this.isInitialized) return;
      this.canvas = document.getElementById('spaceshipCanvas');
      if (!this.canvas) return;
      this.setupThreeScene();
      this.buildRoom();
      this.buildSleepUnit(); this.buildBathUnit(); this.buildFoodUnit(); this.buildControlUnit();
      this.astro = new Astronaut(this.scene);
      this.resetAstro(0, 0, 2.5, 0);
      this.setupEventListeners();
      this.updateHud();
      this.isInitialized = true;
      this.animate();
    }

    // ------------------------------------------
    // SCENE & LIGHTING
    // ------------------------------------------
    setupThreeScene() {
      const w = window.innerWidth, h = window.innerHeight;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x020617);
      this.camera = new THREE.PerspectiveCamera(CONFIG.fov, w / h, 0.1, 600);
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: 'high-performance' });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.ambientLight = new THREE.AmbientLight(0xdbeafe, 0.7);
      this.scene.add(this.ambientLight);
      const sun = new THREE.DirectionalLight(0xffffff, 0.55); sun.position.set(6, 14, 12); this.scene.add(sun);
      this.ceilingStripLight1 = new THREE.PointLight(0xf8fafc, 1.1, 60, 1.2); this.ceilingStripLight1.position.set(-5, 4.6, 0); this.scene.add(this.ceilingStripLight1);
      this.ceilingStripLight2 = new THREE.PointLight(0xf8fafc, 1.1, 60, 1.2); this.ceilingStripLight2.position.set(5, 4.6, 0); this.scene.add(this.ceilingStripLight2);
      [[-9, -4.5], [9, -4.5], [-9, 4.5], [9, 4.5]].forEach(p => {
        const l = new THREE.PointLight(0xe0f2fe, 0.6, 16, 1.6); l.position.set(p[0], 4.2, p[1]); this.scene.add(l);
      });

      // Stars + Earth far behind the cutaway
      const sp = []; for (let i = 0; i < 700; i++) { const r = rand(150, 300), a = rand(0, TAU), b = rand(-0.5, 1.2); sp.push(Math.cos(a) * r, Math.sin(b) * r * 0.6 + 20, Math.sin(a) * r); }
      const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
      this.scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, sizeAttenuation: false })));
      this.earthMesh = new THREE.Mesh(new THREE.SphereGeometry(60, 32, 32), new THREE.MeshPhongMaterial({ color: 0x1d4ed8, specular: 0x60a5fa, shininess: 25 }));
      this.earthMesh.position.set(30, -50, -190); this.scene.add(this.earthMesh);
      const atmo = new THREE.Mesh(new THREE.SphereGeometry(63, 32, 32), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.2, side: THREE.BackSide }));
      atmo.position.copy(this.earthMesh.position); this.scene.add(atmo);
    }

    // ------------------------------------------
    // HAB ROOM: floor, walls, partitions, dock racks & hatch
    // ------------------------------------------
    buildRoom() {
      const S = this.scene, W = CONFIG.roomW, D = CONFIG.roomD, H = CONFIG.roomH;
      // floor with panel texture
      const fc = document.createElement('canvas'); fc.width = fc.height = 128;
      const fg = fc.getContext('2d'); fg.fillStyle = '#475569'; fg.fillRect(0, 0, 128, 128);
      fg.strokeStyle = '#64748b'; fg.lineWidth = 3; fg.strokeRect(1, 1, 126, 126);
      fg.strokeStyle = 'rgba(255,255,255,0.08)'; for (let i = 16; i < 128; i += 16) { fg.beginPath(); fg.moveTo(i, 0); fg.lineTo(i, 128); fg.stroke(); }
      const ft = new THREE.CanvasTexture(fc); ft.wrapS = ft.wrapT = THREE.RepeatWrapping; ft.repeat.set(13, 8);
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshStandardMaterial({ map: ft, roughness: 0.7, metalness: 0.5 }));
      floor.rotation.x = -Math.PI / 2; S.add(floor);
      // unit floor tints (match the sketch: bath TL, control TR, sleep BL, food BR)
      [[-9, -4.5, 0x06b6d4], [9, -4.5, 0xf59e0b], [-9, 4.5, 0x6366f1], [9, 4.5, 0x22c55e]].forEach(u => {
        const p = new THREE.Mesh(new THREE.PlaneGeometry(8, 7), new THREE.MeshBasicMaterial({ color: u[2], transparent: true, opacity: 0.22 }));
        p.rotation.x = -Math.PI / 2; p.position.set(u[0], 0.02, u[1]); S.add(p);
      });
      // outer walls (cutaway: no front wall, no ceiling)
      box(W + 0.6, H, 0.3, 0xe2e8f0, { roughness: 0.5 }, 0, H / 2, -D / 2 - 0.15, S);
      box(0.3, H, D, 0xdde5ef, { roughness: 0.5 }, -W / 2 - 0.15, H / 2, 0, S);
      box(0.3, H, D, 0xdde5ef, { roughness: 0.5 }, W / 2 + 0.15, H / 2, 0, S);
      // ISS blue trim + ceiling light strips on back wall
      box(W, 0.22, 0.06, 0x1d4ed8, {}, 0, 0.45, -D / 2 + 0.03, S);
      box(W, 0.22, 0.06, 0x1d4ed8, {}, 0, H - 0.5, -D / 2 + 0.03, S);
      [-6, 6].forEach(x => { const f = new THREE.Mesh(new THREE.BoxGeometry(7, 0.12, 0.08), new THREE.MeshBasicMaterial({ color: 0xffffff })); f.position.set(x, H - 0.25, -D / 2 + 0.05); f.name = 'ceilingFixture'; S.add(f); });

      // partitions (glass-like so the camera can see inside units) with door gaps toward the dock
      const glass = (cx, cz, w, d) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, 4.6, d), new THREE.MeshStandardMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.13, depthWrite: false, roughness: 0.1 }));
        m.position.set(cx, 2.3, cz); S.add(m);
        box(w + 0.02, 0.1, d + 0.02, 0xcbd5e1, {}, cx, 4.6, cz, S); box(w + 0.02, 0.1, d + 0.02, 0xcbd5e1, {}, cx, 0.05, cz, S);
      };
      const post = (x, z) => cyl(0.06, 0.06, 4.6, 0xf59e0b, { metalness: 0.6 }, x, 2.3, z, S);
      // top units: partition at x=+/-5 (door gap z -5.4..-3) and front glass at z=-1
      [-5, 5].forEach(x => { glass(x, -6.7, 0.1, 2.6); glass(x, -2, 0.1, 2); post(x, -5.4); post(x, -3); });
      glass(-9, -1, 8, 0.1); glass(9, -1, 8, 0.1);
      // bottom units: partition at x=+/-5 (door gap z 3..5.4) and back glass at z=1
      [-5, 5].forEach(x => { glass(x, 2, 0.1, 2); glass(x, 6.7, 0.1, 2.6); post(x, 3); post(x, 5.4); });
      glass(-9, 1, 8, 0.1); glass(9, 1, 8, 0.1);

      // dock hatch on the back wall + avionics racks either side
      const hz = -D / 2 + 0.1, hg = new THREE.Group();
      hg.add(new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.16, 14, 40), mat(0x475569, { metalness: 0.85, roughness: 0.3 })));
      const door = cyl(1.38, 1.38, 0.2, 0xe2e8f0, { metalness: 0.5 }, 0, 0, 0.05, hg, 40); door.rotation.x = Math.PI / 2;
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.04, 10, 24), mat(0xd97706, { metalness: 0.7 })); rim.position.z = 0.2; hg.add(rim);
      for (let i = 0; i < 8; i++) { const sp = cyl(0.025, 0.025, 0.5, 0xd97706, {}, 0, 0, 0.2, hg, 6); sp.rotation.z = i / 8 * Math.PI * 2; }
      sphere(0.07, 0x22c55e, { emissive: 0x22c55e }, 0.7, 0.6, 0.22, hg);
      hg.position.set(0, 2.3, hz); S.add(hg);
      [-3.3, 3.3].forEach((x, i) => this.buildRack(x, hz + 0.35, i));
      const lab = textSprite('DOCK AREA', 3.6, 0.68, 'bold 40px sans-serif', true); lab.position.set(0, 4.5, -5); S.add(lab);
      // handrails & foot restraints in the dock
      for (let x = -3; x <= 3; x += 3) { const l = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 8, 16, Math.PI), mat(0xf59e0b)); l.rotation.x = -Math.PI / 2; l.position.set(x, 0.04, 2.5); S.add(l); }
    }

    buildRack(x, z, idx) {
      const g = new THREE.Group();
      box(2.2, 3.4, 0.6, 0xe2e8f0, { metalness: 0.4 }, 0, 0, 0, g);
      box(2.0, 3.1, 0.1, 0x0f172a, { metalness: 0.75, roughness: 0.35 }, 0, 0, 0.32, g);
      const lcd = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), new THREE.MeshBasicMaterial({ color: idx % 2 ? 0x10b981 : 0x06b6d4 })); lcd.position.set(0, 0.9, 0.38); g.add(lcd);
      [0x22c55e, 0x06b6d4, 0xf59e0b, 0xef4444].forEach((c, i) => {
        const led = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), new THREE.MeshBasicMaterial({ color: c })); led.position.set(-0.6 + i * 0.4, 0.3, 0.38); g.add(led);
        this.blinkingLeds.push({ mesh: led, freq: 1.5 + i * 0.7 });
      });
      box(1.4, 0.5, 0.05, 0x1e293b, { roughness: 0.9 }, 0, -0.7, 0.38, g);
      g.position.set(x, 1.9, z); this.scene.add(g);
    }

    registerClick(id, obj) { obj.traverse(m => { if (m.isMesh) { m.userData.clickId = id; this.clickMeshes.push(m); } }); }

    // ------------------------------------------
    // SLEEPING UNIT (bottom-left): sleeping bag + personal belongings
    // ------------------------------------------
    buildSleepUnit() {
      const S = this.scene, g = new THREE.Group();
      // sleeping bag fixed to the left wall with bungee straps (axis along Z, head at -Z)
      const hull = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.5, 2.7, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.9, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false }));
      hull.rotation.x = Math.PI / 2; hull.position.set(-11.7, 1.3, 4.9); g.add(hull);
      const foot = sphere(0.5, 0x1d4ed8, { roughness: 0.9 }, -11.7, 1.3, 6.25, g); foot.scale.set(1, 1, 0.12);
      box(0.55, 0.18, 0.5, 0xf8fafc, { roughness: 1 }, -11.7, 1.62, 3.75, g); // pillow
      [4.0, 4.9, 5.8].forEach(z => box(1.0, 0.07, 0.12, 0xf59e0b, { roughness: 0.8 }, -12.4, 1.3, z, g));
      this.zipper = box(0.05, 0.03, 2.2, 0xfbbf24, {}, -11.7, 1.82, 4.9, g); this.zipper.visible = false;
      // wall panel with laptop & belongings
      box(0.08, 1.6, 2.2, 0xcbd5e1, { metalness: 0.3 }, -12.92, 2.9, 6.0, g);
      const lap = new THREE.Group(); box(0.9, 0.05, 0.6, 0x334155, {}, 0, 0, 0, lap);
      const scr = box(0.9, 0.55, 0.04, 0x0f172a, {}, 0, 0.3, -0.3, lap); scr.rotation.x = -0.25;
      const glow = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.45), new THREE.MeshBasicMaterial({ color: 0x38bdf8 })); glow.position.set(0, 0.3, -0.27); glow.rotation.x = -0.25; lap.add(glow);
      lap.rotation.y = Math.PI / 2; lap.position.set(-12.7, 3.0, 6.0); g.add(lap);
      box(0.25, 0.35, 0.5, 0xef4444, { roughness: 0.8 }, -12.78, 2.35, 5.2, g); box(0.2, 0.3, 0.35, 0x22c55e, { roughness: 0.8 }, -12.78, 2.35, 6.6, g);
      const lab = textSprite('SLEEPING UNIT', 3.6, 0.68, 'bold 40px sans-serif', true); lab.position.set(-9, 4.5, 4.5); g.add(lab);
      S.add(g); this.sleepBag = hull;
    }

    // ------------------------------------------
    // BATHING UNIT (top-left): blue tool kit, floating items, vent
    // ------------------------------------------
    buildBathUnit() {
      const S = this.scene, g = new THREE.Group();
      const kit = new THREE.Group(); kit.position.set(-10.5, 2.5, -7.65);
      box(1.8, 1.25, 0.3, 0x1d4ed8, { roughness: 0.6 }, 0, 0, 0, kit);
      box(1.8, 0.16, 0.34, 0x1e3a8a, {}, 0, 0.55, 0.01, kit);
      [-0.6, -0.2, 0.2, 0.6].forEach(x => box(0.34, 0.6, 0.06, 0x3b82f6, { roughness: 0.8 }, x, -0.12, 0.17, kit));
      box(0.5, 0.08, 0.06, 0xf8fafc, {}, 0, 0.7, 0.18, kit);
      g.add(kit); this.kit = kit; this.registerClick('kit', kit);
      this.kitFlap = box(1.7, 0.1, 0.4, 0x1e3a8a, {}, -10.5, 3.2, -7.5, g);
      // vent (air intake) beside the kit
      const vent = new THREE.Group(); vent.position.set(-7.0, 1.6, -7.8);
      box(1.3, 0.9, 0.14, 0x1e293b, { roughness: 0.9 }, 0, 0, 0, vent);
      for (let i = 0; i < 5; i++) box(1.1, 0.04, 0.06, 0x64748b, {}, 0, -0.3 + i * 0.15, 0.1, vent);
      g.add(vent); this.vent = vent;
      const vl = textSprite('AIR VENT', 1.7, 0.32, 'bold 38px sans-serif', true); vl.position.set(-7.0, 2.35, -7.5); g.add(vl);
      const kl = textSprite('TOOL KIT', 1.7, 0.32, 'bold 38px sans-serif', true); kl.position.set(-10.5, 3.45, -7.4); g.add(kl);
      const lab = textSprite('BATHING UNIT', 3.6, 0.68, 'bold 40px sans-serif', true); lab.position.set(-9, 4.5, -4.5); g.add(lab);
      S.add(g);

      // items: start inside the kit pockets, float out when the kit is touched
      const mkItem = (id, label, home, build) => {
        const it = new THREE.Group(); build(it); it.position.set(home[0], home[1], home[2]); S.add(it);
        this.registerClick('item_' + id, it);
        this.items[id] = { id, label, mesh: it, home: new THREE.Vector3(home[0], home[1], home[2]), anchor: new THREE.Vector3(), floating: false, held: false, vel: new THREE.Vector3(), spin: new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).multiplyScalar(0.6), phase: rand(0, 6) };
      };
      const hx = -10.5, hy = 2.38, hz = -7.45;
      mkItem('brush', 'Toothbrush', [hx - 0.6, hy, hz], it => { box(0.07, 0.5, 0.05, 0x22d3ee, {}, 0, 0, 0, it); box(0.1, 0.14, 0.06, 0xf8fafc, {}, 0, 0.3, 0, it); });
      mkItem('paste', 'Toothpaste', [hx - 0.2, hy, hz], it => { cyl(0.07, 0.07, 0.4, 0xf8fafc, {}, 0, 0, 0, it); cyl(0.05, 0.05, 0.1, 0x22c55e, {}, 0, 0.25, 0, it); box(0.15, 0.1, 0.02, 0x22c55e, {}, 0, -0.05, 0.07, it); });
      mkItem('water', 'Water pouch', [hx + 0.2, hy, hz], it => { box(0.3, 0.42, 0.1, 0x38bdf8, { transparent: true, opacity: 0.8, roughness: 0.2 }, 0, 0, 0, it); cyl(0.02, 0.02, 0.2, 0xf8fafc, {}, 0.08, 0.3, 0, it, 6); });
      mkItem('clipper', 'Nail clipper', [hx + 0.6, hy, hz], it => { box(0.3, 0.05, 0.08, 0xcbd5e1, { metalness: 0.9, roughness: 0.2 }, 0, 0, 0, it); box(0.22, 0.04, 0.06, 0x94a3b8, { metalness: 0.9 }, 0.02, 0.05, 0, it); });
    }

    // ------------------------------------------
    // FOOD UNIT (bottom-right): packaged food, heater, water dispenser
    // ------------------------------------------
    buildFoodUnit() {
      const S = this.scene, g = new THREE.Group();
      box(0.1, 1.7, 3.0, 0xcbd5e1, { metalness: 0.3 }, 12.9, 1.9, 3.8, g);
      box(0.4, 0.06, 3.0, 0x64748b, {}, 12.7, 1.0, 3.8, g); box(0.4, 0.06, 3.0, 0x64748b, {}, 12.7, 2.8, 3.8, g);
      const cols = [0xf97316, 0xef4444, 0xeab308, 0x22c55e, 0xa855f7];
      this.pouches = [];
      [2.5, 3.1, 3.7, 4.3, 4.9].forEach((z, i) => {
        const p = new THREE.Group(); box(0.12, 0.7, 0.5, cols[i], { roughness: 0.4 }, 0, 0, 0, p); box(0.13, 0.2, 0.3, 0xf8fafc, {}, -0.01, 0.1, 0, p); box(0.14, 0.08, 0.5, 0x0f172a, {}, 0, 0.3, 0, p);
        p.position.set(12.62, 1.4, z); g.add(p); this.pouches.push(p);
      });
      this.pouch = this.pouches[2]; this.pouchHome = this.pouch.position.clone(); this.registerClick('pouch', this.pouch);
      const lab1 = textSprite('FOOD PACKS', 1.9, 0.36, 'bold 38px sans-serif', true); lab1.position.set(12.2, 3.35, 3.8); g.add(lab1);
      // food warmer
      const heater = new THREE.Group(); heater.position.set(12.45, 1.45, 6.9);
      box(0.7, 0.9, 1.0, 0x475569, { metalness: 0.6 }, 0, 0, 0, heater);
      this.heatGlow = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.7), new THREE.MeshBasicMaterial({ color: 0x7c2d12 })); this.heatGlow.position.set(-0.36, 0, 0); heater.add(this.heatGlow);
      g.add(heater); this.heater = heater; this.registerClick('heater', heater);
      const lab2 = textSprite('FOOD WARMER', 1.9, 0.36, 'bold 38px sans-serif', true); lab2.position.set(12.0, 2.3, 6.9); g.add(lab2);
      // water dispenser
      cyl(0.28, 0.28, 0.9, 0x0ea5e9, { metalness: 0.4 }, 12.5, 1.45, 7.6, g); cyl(0.1, 0.1, 0.2, 0xf8fafc, {}, 12.2, 1.6, 7.6, g).rotation.z = Math.PI / 2;
      const lab3 = textSprite('WATER', 1.1, 0.3, 'bold 38px sans-serif', true); lab3.position.set(12.0, 2.25, 7.6); g.add(lab3);
      const lab = textSprite('FOOD UNIT', 3.6, 0.68, 'bold 40px sans-serif', true); lab.position.set(9, 4.5, 4.5); g.add(lab);
      S.add(g);
    }

    // ------------------------------------------
    // CONTROL ROOM (top-right): console + screens
    // ------------------------------------------
    buildControlUnit() {
      const S = this.scene, g = new THREE.Group();
      box(8, 1.1, 1.0, 0x1e293b, { metalness: 0.6 }, 9, 0.55, -7.3, g);
      [[-2.4, 0x06b6d4], [0, 0x22c55e], [2.4, 0xf59e0b]].forEach(m => {
        box(2.0, 1.2, 0.12, 0x0f172a, {}, 9 + m[0], 2.0, -7.6, g);
        const sc = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.0), new THREE.MeshBasicMaterial({ color: m[1] })); sc.position.set(9 + m[0], 2.0, -7.53); g.add(sc);
        for (let i = 0; i < 5; i++) box(1.5 - i * 0.2, 0.04, 0.01, 0x0f172a, {}, 9 + m[0], 2.3 - i * 0.2, -7.52, g);
      });
      cyl(0.05, 0.05, 0.4, 0x94a3b8, { metalness: 0.8 }, 9, 1.3, -6.9, g); sphere(0.12, 0xef4444, {}, 9, 1.55, -6.9, g);
      for (let i = 0; i < 8; i++) { const led = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x22c55e : 0xf59e0b })); led.position.set(6.8 + i * 0.28, 1.12, -6.78); g.add(led); this.blinkingLeds.push({ mesh: led, freq: 1 + i * 0.5 }); }
      const lab = textSprite('CONTROL ROOM', 3.6, 0.68, 'bold 40px sans-serif', true); lab.position.set(9, 4.5, -4.5); g.add(lab);
      S.add(g);
    }

    // ------------------------------------------
    // LIGHTING MODES (Day / Rest / Emergency)
    // ------------------------------------------
    setLightingMode(mode) {
      this.lightMode = mode; this.audio.playClickSound();
      document.querySelectorAll('.ship-light-pill').forEach(b => b.classList.toggle('active', b.getAttribute('data-mode') === mode));
      const fx = []; this.scene.traverse(o => { if (o.name === 'ceilingFixture') fx.push(o); });
      const cfg = { day: [0xdbeafe, 0.7, 0xf8fafc, 1.1, 0xffffff], night: [0x78350f, 0.4, 0xfbbf24, 0.5, 0xfbbf24], emergency: [0x7f1d1d, 0.45, 0xef4444, 1.5, 0xef4444] }[mode];
      if (!cfg) return;
      this.ambientLight.color.setHex(cfg[0]); this.ambientLight.intensity = cfg[1];
      this.ceilingStripLight1.color.setHex(cfg[2]); this.ceilingStripLight2.color.setHex(cfg[2]);
      this.ceilingStripLight1.intensity = cfg[3]; this.ceilingStripLight2.intensity = cfg[3];
      fx.forEach(f => f.material.color.setHex(cfg[4]));
    }

    // ------------------------------------------
    // CAMERA FOCUS / PRESETS + INSPECTOR CARD
    // ------------------------------------------
    focus(key) {
      const u = UNITS[key]; if (!u) return;
      Object.assign(this.camGoal, { tx: u.target[0], ty: u.target[1], tz: u.target[2], az: u.az, el: u.el, dist: u.dist });
      document.querySelectorAll('.ship-preset-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-preset') === key));
    }
    setCameraPreset(key) {
      this.audio.playClickSound(); this.focus(key);
      const u = UNITS[key], card = document.getElementById('shipInspectorCard'); if (!u || !card) return;
      document.getElementById('shipInspectTitle').textContent = u.title;
      document.getElementById('shipInspectSub').textContent = u.sub;
      document.getElementById('shipInspectDesc').textContent = u.desc;
      document.getElementById('shipSpecStatus').textContent = u.s1;
      document.getElementById('shipSpecPressure').textContent = u.s2;
      card.classList.add('is-open');
    }

    // ------------------------------------------
    // ASTRONAUT CONTROL HELPERS
    // ------------------------------------------
    resetAstro(x, y, z, heading) {
      const a = this.astro; a.path = []; a.pathDone = null; a.mode = 'idle';
      a.root.position.set(x, y, z); a.root.rotation.y = heading; a.headingGoal = heading;
      a.rig.rotation.set(0, 0, 0); a.rig.position.set(0, 0, 0); a.floatVel = null; a.lying = false;
    }
    walk(pts) {
      const r = this.run, a = this.astro;
      return new Promise(res => {
        a.path = pts.map(p => new THREE.Vector3(p[0], 0, p[1])); a.mode = 'walk';
        a.pathDone = () => { if (this.run === r) res(); };
      });
    }
    turn(h) { this.astro.headingGoal = h; return this.delay(450); }
    delay(ms) { const r = this.run; return new Promise(res => setTimeout(() => { if (this.run === r) res(); }, ms)); }
    tween(ms, fn) {
      const r = this.run; return new Promise(res => {
        const t0 = performance.now();
        const step = () => { if (this.run !== r) return; const k = clamp((performance.now() - t0) / ms, 0, 1); fn(k); if (k < 1) requestAnimationFrame(step); else res(); };
        step();
      });
    }

    // ------------------------------------------
    // CLICK TARGETS, MARKERS, FLOATING ITEMS, PARTICLES
    // ------------------------------------------
    waitClick(id, getPos) {
      const r = this.run;
      return new Promise(res => {
        this.addMarker(getPos);
        this.handlers[id] = () => { if (this.run !== r) return; delete this.handlers[id]; this.clearMarkers(); this.audio.playClickSound(); res(); };
      });
    }
    addMarker(getPos) {
      const m = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.38, 12), new THREE.MeshBasicMaterial({ color: 0xfacc15, depthTest: false }));
      m.rotation.x = Math.PI; m.renderOrder = 11; this.scene.add(m); const mk = { mesh: m, getPos }; this.markers.push(mk); return mk;
    }
    removeMarker(mk) { this.scene.remove(mk.mesh); this.markers = this.markers.filter(x => x !== mk); }
    clearMarkers() { this.markers.forEach(m => this.scene.remove(m.mesh)); this.markers = []; }
    openKit() {
      this.kitFlap.visible = false;
      Object.values(this.items).forEach(it => {
        it.floating = true; it.anchor.set(it.home.x + rand(-1.4, 1.4), rand(2.3, 3.7), rand(-6.2, -4.6));
        it.vel.set(rand(-0.2, 0.2), rand(0.2, 0.5), rand(0.8, 1.2));
      });
      this.toast('Zero gravity: the items drift out of the kit!');
    }
    stowItems(ids) { ids.forEach(id => { const it = this.items[id]; it.held = false; it.floating = false; it.mesh.visible = false; delete this.handlers['item_' + id]; }); }
    spawnParticles(n, origin, o) {
      for (let i = 0; i < n; i++) {
        const m = new THREE.Mesh(o.box ? new THREE.BoxGeometry(o.size, o.size * 0.5, o.size * 0.7) : new THREE.SphereGeometry(o.size * rand(0.6, 1.2), 8, 6), new THREE.MeshStandardMaterial({ color: o.color, roughness: 0.3, transparent: true, opacity: 0.9 }));
        m.position.copy(origin); this.scene.add(m);
        const v = o.dir ? o.dir.clone().add(new THREE.Vector3(rand(-1, 1), rand(-0.6, 0.8), rand(-1, 1)).multiplyScalar(o.spread)) : new THREE.Vector3(rand(-1, 1), rand(-0.3, 1), rand(-1, 1)).multiplyScalar(o.spread);
        this.particles.push({ mesh: m, vel: v.multiplyScalar(o.speed), toward: o.toward || null, life: o.life || 999, spin: rand(-3, 3) });
      }
    }
    clearParticles() { this.particles.forEach(p => this.scene.remove(p.mesh)); this.particles = []; }

    // ------------------------------------------
    // UI: dialog, mission card, toast, HUD
    // ------------------------------------------
    dialog(o) {
      const r = this.run;
      return new Promise(res => {
        const ov = document.getElementById('shipDialog'), box = document.getElementById('shipDialogBox'); if (!ov || !box) { res(); return; }
        box.innerHTML = '<div class="ship-dialog-header"><h3 class="ship-dialog-title ' + (o.tone || '') + '">' + o.title + '</h3></div><div class="ship-dialog-body">' + o.html + '</div><div class="ship-dialog-actions"><button class="ship-btn ship-btn-primary" type="button">' + (o.btn || 'Continue') + '</button></div>';
        ov.classList.add('is-open');
        box.querySelector('button').addEventListener('click', () => { this.audio.playClickSound(); ov.classList.remove('is-open'); if (this.run === r) res(); });
      });
    }
    setMission(tag, text, hint) {
      document.getElementById('shipMission').classList.add('is-open');
      document.getElementById('shipMissionTag').textContent = tag;
      document.getElementById('shipMissionText').textContent = text;
      document.getElementById('shipMissionHint').textContent = hint || '';
      document.getElementById('shipChoices').innerHTML = '';
    }
    hideMission() { document.getElementById('shipMission').classList.remove('is-open'); }
    ask(tag, text, choices, hint) {
      const r = this.run;
      return new Promise(res => {
        this.setMission(tag, text, hint);
        const wrap = document.getElementById('shipChoices');
        choices.forEach(c => {
          const b = document.createElement('button'); b.type = 'button'; b.className = 'ship-choice'; b.textContent = c.label;
          b.addEventListener('click', () => { this.audio.playClickSound(); wrap.innerHTML = ''; if (this.run === r) res(c.key); });
          wrap.appendChild(b);
        });
      });
    }
    toast(msg, ms) {
      const t = document.getElementById('shipToast'); if (!t) return; t.textContent = msg; t.classList.add('show');
      clearTimeout(this._tt); this._tt = setTimeout(() => t.classList.remove('show'), ms || 2600);
    }
    flash() { const f = document.getElementById('shipFlash'); if (!f) return; f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }
    updateHud() {
      const l = document.getElementById('shipLives'); if (l) l.textContent = 'Lives: ' + this.lives + ' / ' + CONFIG.lives;
      const s = document.getElementById('shipStageLabel'); if (s) s.textContent = 'Challenge ' + Math.min(this.stage + 1, 4) + ' / 4';
      const names = ['sleep', 'bath', 'bath', 'food'];
      document.querySelectorAll('#shipPips i').forEach((p, i) => { p.classList.toggle('done', !!this.done[i]); p.classList.toggle('now', i === this.stage && !this.done[i]); });
      document.querySelectorAll('.ship-preset-btn').forEach(b => { const k = b.getAttribute('data-preset'); b.classList.toggle('done', (k === 'sleep' && this.done[0]) || (k === 'bath' && this.done[2]) || (k === 'food' && this.done[3])); });
    }

    // ------------------------------------------
    // GAME FLOW
    // ------------------------------------------
    showIntro() {
      this.introShown = true;
      this.dialog({ title: 'Life in Space: 4 Challenges',
        html: '<p>You are an astronaut aboard the spacecraft. Complete <b>4 challenges</b> to learn how crew sleep, wash, groom and eat in <b>zero gravity</b>.</p><ul><li>Each challenge asks you to make a choice.</li><li>A wrong choice costs one of your <b>3 lives</b>.</li><li>Lose all 3 lives and the mission <b>starts again</b> from Challenge 1.</li><li>Between challenges, explore the dock with <span class="ship-kbd">W</span><span class="ship-kbd">A</span><span class="ship-kbd">S</span><span class="ship-kbd">D</span>. Drag to look around, scroll to zoom.</li></ul>',
        btn: 'Begin Mission' }).then(() => this.beginMission());
    }
    beginMission() {
      this.run++; this.lives = CONFIG.lives; this.stage = 0; this.done = {}; this.freeWalk = false; this.hideMission(); this.pouch.userData.carry = false; this.shake = 0;
      this.clearMarkers(); this.clearParticles(); this.handlers = {};
      Object.values(this.items).forEach(it => { it.floating = false; it.held = false; it.mesh.visible = true; it.mesh.position.copy(it.home); it.mesh.rotation.set(0, 0, 0); it.vel.set(0, 0, 0); });
      this.kitFlap.visible = true; this.zipper.visible = false; this.pouch.position.copy(this.pouchHome);
      this.resetAstro(0, 0, 2.5, 0); this.setLightingMode('day'); this.updateHud(); this.runMission();
    }
    async runMission() {
      const chal = [() => this.cSleep(), () => this.cBrush(), () => this.cNails(), () => this.cFood()];
      const unitFor = ['sleep', 'bath', 'bath', 'food'], names = ['Sleeping Unit', 'Bathing Unit: brushing teeth', 'Bathing Unit: cutting nails', 'Food Unit'];
      for (let i = 0; i < 4; i++) {
        this.stage = i; this.updateHud();
        await this.breakPoint(i, names[i]);
        await chal[i]();
        this.done[i] = true; this.updateHud();
        this.clearParticles(); this.clearMarkers();
      }
      this.hideMission(); this.focus('dock');
      await this.walk([[0, 2.5]]);
      this.audio.playGood();
      await this.dialog({ title: 'Mission Complete!', tone: 'good',
        html: '<p>You finished all 4 challenges with <b>' + this.lives + ' of 3 lives</b> left.</p><p>Key lessons: <b>fix yourself</b> to a ventilated wall when sleeping, <b>never let liquids or debris float free</b>, use <b>vents</b> to catch particles, and <b>treat water as precious</b> because every drop is recycled.</p>', btn: 'Play Again' });
      this.beginMission();
    }
    async breakPoint(i, name) {
      this.hideMission(); this.focus('dock');
      await this.walk([[0, 2.5]]);
      this.freeWalk = true;
      await this.ask('Challenge ' + (i + 1) + ' of 4 · Dock Area', 'Explore the dock with W A S D if you like. When you are ready, head to the ' + name + '.', [{ key: 'go', label: 'Start Challenge ' + (i + 1) }], 'Lives: ' + this.lives + ' / 3');
      this.freeWalk = false;
    }
    async lose(title, html) {
      this.lives--; this.updateHud(); this.audio.playBad(); this.flash(); this.shake = 0.5;
      const over = this.lives <= 0;
      await this.dialog({ title: title, tone: 'bad', html: html + '<p class="ship-lives-left">' + (over ? 'You have <b>no lives left</b>. The mission will restart from Challenge 1.' : 'Lives left: <b>' + this.lives + ' / 3</b>. Try again!') + '</p>', btn: over ? 'Restart Mission' : 'Try Again' });
      this.clearParticles();
      if (over) { this.beginMission(); return new Promise(() => {}); }
    }
    async win(title, html) { this.audio.playGood(); await this.dialog({ title: title, tone: 'good', html, btn: 'Next' }); }

    // ---------- Challenge 1: sleeping ----------
    async cSleep() {
      this.focus('sleep'); this.setMission('Challenge 1 of 4 · Sleeping Unit', 'Walking to your crew quarters…');
      await this.walk([[-3, 4.2], [-6.8, 4.2], [-9.6, 4.9]]); await this.turn(-Math.PI / 2);
      for (;;) {
        const pick = await this.ask('Challenge 1 · Sleeping Unit', 'Your shift is over. In zero gravity nothing holds you down. How do you sleep?', shuffle([
          { key: 'bag', label: 'Zip into the sleeping bag fixed to the wall of the sleeping unit' },
          { key: 'open', label: 'Float and sleep in the open dock area: it is roomier' }]));
        if (pick === 'bag') {
          this.hideMission(); const a = this.astro;
          await this.walk([[-10.6, 6.3]]); await this.turn(-Math.PI / 2);
          const from = a.root.position.clone();
          a.mode = 'sleep';
          await this.tween(1800, k => { a.root.position.set(lerp(from.x, -11.7, k), lerp(0, 1.3, k), lerp(from.z, 5.9, k)); a.root.rotation.y = lerp(-Math.PI / 2, 0, k); a.headingGoal = a.root.rotation.y; a.rig.rotation.x = lerp(0, -Math.PI / 2, k); });
          this.zipper.visible = true; this.setLightingMode('night'); this.toast('Arms tucked in, strapped to the wall. Sleeping…', 3000);
          await this.sleepZzz(3200); this.setLightingMode('day');
          await this.win('Challenge 1 complete: Sleeping',
            '<ul><li>ISS crew sleep in a <b>sleeping bag fixed to the wall</b> of a small private cabin, so they cannot drift into equipment.</li><li>Arms would float upward in zero gravity, so they are <b>tucked inside the bag</b>.</li><li>A fan keeps air moving around the head. Crew sleep about 8 hours, even though the station sees <b>16 sunrises and sunsets a day</b>, so lights are dimmed or eye masks are used.</li></ul>');
          this.resetAstro(-9.6, 0, 4.9, -Math.PI / 2);
          return;
        }
        this.hideMission(); const a = this.astro;
        await this.walk([[-6.8, 4.2], [-3, 2.5], [-1, 0]]); this.focus('dock');
        a.mode = 'float'; const from = a.root.position.clone();
        await this.tween(1600, k => { a.root.position.y = lerp(0, 2.3, k); a.rig.rotation.x = lerp(0, -Math.PI / 2 + 0.2, k); });
        this.toast('Asleep in mid-air… the air is not moving around your face.', 2500);
        const t0 = performance.now(); a.floatVel = new THREE.Vector3(0.35, 0.1, -2.1);
        await this.tween(3300, k => { a.headingGoal += 0.012; a.rig.rotation.y = 0; a.rig.rotation.z = Math.sin(k * 6) * 0.25; });
        a.floatVel = null; this.shake = 0.8; this.flash();
        await this.lose('Bumped into the equipment!',
          '<p>Sleeping adrift is dangerous:</p><ul><li>With no gravity, <b>nothing stops you drifting</b> into switches, cables, vents or other crew.</li><li>Air does not rise or sink without gravity, so <b>exhaled CO₂ gathers in a bubble around your face</b> (the amber glow). That can cause headaches and breathing trouble.</li></ul><p>Real crew fix their bag to a wall near a ventilation fan.</p>');
        this.focus('sleep'); this.resetAstro(-9.6, 0, 4.9, -Math.PI / 2);
      }
    }
    sleepZzz(ms) {
      const r = this.run; return new Promise(res => {
        let n = 0; const id = setInterval(() => {
          if (this.run !== r) { clearInterval(id); return; }
          const s = textSprite('Z z z', 1.2, 0.225, 'bold 70px sans-serif', false); s.position.set(-11.7, 2.2, 3.8); this.scene.add(s); this.zzz.push({ s, t: 0 });
          if (++n > ms / 500) { clearInterval(id); res(); }
        }, 500);
      });
    }

    // ---------- Challenge 2: brushing teeth ----------
    async cBrush() {
      this.focus('bath'); this.setMission('Challenge 2 of 4 · Bathing Unit', 'Walking to the hygiene station…');
      const a = this.astro; await this.walk([[-3, -4.2], [-6.8, -4.2], [-10.4, -5.6]]); await this.turn(Math.PI);
      this.setMission('Challenge 2 · Brush your teeth', 'Touch the blue tool kit on the wall.', 'Click the kit marked with the yellow arrow.');
      await this.waitClick('kit', () => new THREE.Vector3(-10.5, 3.7, -7.3));
      this.openKit();
      // collect the 3 needed items
      const need = ['brush', 'paste', 'water']; let got = 0;
      this.setMission('Challenge 2 · Brush your teeth', 'Everything floats! Grab the three things you need: toothbrush, toothpaste and water.', 'Collected 0 / 3');
      await new Promise(res => {
        const r = this.run;
        Object.keys(this.items).forEach(id => {
          const it = this.items[id];
          if (id !== 'clipper') it.marker = this.addMarker(() => it.mesh.position.clone().add(new THREE.Vector3(0, 0.55, 0)));
          this.handlers['item_' + id] = () => {
            if (this.run !== r) return;
            if (id === 'clipper') { this.toast('Keep the nail clipper for the next task.'); return; }
            delete this.handlers['item_' + id]; it.held = true; got++; this.audio.playClickSound();
            document.getElementById('shipMissionHint').textContent = 'Collected ' + got + ' / 3 (' + it.label + ')';
            if (it.marker) this.removeMarker(it.marker);
            if (got === 3) { this.clearMarkers(); res(); }
          };
        });
      });
      for (;;) {
        const pick = await this.ask('Challenge 2 · Brush your teeth', 'There is no sink and water forms floating blobs. How do you finish brushing?', shuffle([
          { key: 'good', label: 'Brush with a pea-sized dab of paste and a little water, then swallow the foam (or wipe it into a towel)' },
          { key: 'spit', label: 'Brush, then spit the foam out into the air like on Earth' }]));
        if (pick === 'good') {
          this.hideMission(); a.mode = 'brush';
          this.spawnParticles(6, a.handWorld(0, 1.62, 0.28), { size: 0.04, color: 0xffffff, spread: 0.5, speed: 0.25, life: 3.2 });
          await this.delay(4200); a.mode = 'idle'; this.stowItems(need);
          await this.win('Challenge 2 complete: Brushing teeth',
            '<ul><li>Space toothpaste is <b>edible</b>, so crew can swallow it or wipe the foam into a towel. You cannot spit into a sink.</li><li>Water is used in <b>tiny amounts</b> because every drop must be launched or recycled.</li><li>Loose blobs of liquid can drift into electronics or be breathed in, so everything stays controlled.</li></ul>');
          return;
        }
        this.hideMission();
        a.mode = 'idle'; this.spawnParticles(16, a.handWorld(0, 1.62, 0.3), { size: 0.09, color: 0xe0f2fe, dir: new THREE.Vector3(0, 0, -1), spread: 0.7, speed: 0.9 });
        this.toast('The foam does not fall. It floats away!', 2500); await this.delay(3000);
        await this.lose('Floating foam!',
          '<p>Without gravity, <b>spat-out foam and water just float</b> as little spheres.</p><ul><li>They can drift into <b>electronics</b> and cause short circuits, or into your <b>eyes and lungs</b>.</li><li>It also wastes precious water.</li></ul><p>Swallow the toothpaste or wipe it with a towel instead.</p>');
        this.focus('bath');
      }
    }

    // ---------- Challenge 3: cutting nails near the vent ----------
    async cNails() {
      this.setMission('Challenge 3 of 4 · Bathing Unit', 'Walking to the vent beside the tool kit…'); this.focus('bath');
      const a = this.astro; await this.walk([[-7.2, -6.6]]); await this.turn(Math.PI);
      const clip = this.items.clipper;
      this.setMission('Challenge 3 · Cut your nails', 'Grab the nail clipper that is floating by the kit.', 'Click the yellow arrow.');
      this.addMarker(() => clip.mesh.position.clone().add(new THREE.Vector3(0, 0.55, 0)));
      await new Promise(res => { const r = this.run; this.handlers.item_clipper = () => { if (this.run !== r) return; delete this.handlers.item_clipper; this.clearMarkers(); clip.held = true; this.audio.playClickSound(); res(); }; });
      for (;;) {
        const pick = await this.ask('Challenge 3 · Cut your nails', 'Nail clippings are sharp and tiny, and they will not fall to the floor. Where do you clip?', shuffle([
          { key: 'vent', label: 'Hold your hand right at the air vent so the airflow carries clippings into the filter' },
          { key: 'open', label: 'Clip in the middle of the cabin and collect them later' }]));
        const hand = a.handWorld(0, 1.2, 0.5);
        if (pick === 'vent') {
          this.hideMission(); a.mode = 'cut';
          this.spawnParticles(9, hand, { size: 0.05, color: 0xfde68a, box: true, spread: 0.3, speed: 0.4, toward: new THREE.Vector3(-7.0, 1.6, -7.6), life: 6 });
          await this.delay(3800); a.mode = 'idle'; clip.held = false; clip.mesh.visible = false;
          await this.win('Challenge 3 complete: Cutting nails',
            '<ul><li>Astronauts clip their nails <b>at an air vent</b>. The airflow pulls clippings into a filter instead of letting them scatter.</li><li>Loose clippings can <b>get in eyes, be inhaled or jam equipment</b>.</li><li>The cabin air is constantly cleaned by filters, so keeping debris near the vent keeps everyone safe.</li></ul>');
          return;
        }
        this.hideMission(); a.mode = 'cut';
        this.spawnParticles(14, hand, { size: 0.05, color: 0xfde68a, box: true, spread: 1, speed: 0.8 });
        this.toast('The clippings drift everywhere!', 2500); await this.delay(3000); a.mode = 'idle';
        await this.lose('Clippings everywhere!',
          '<p>In open air the clippings <b>float around the cabin</b> and can be breathed in, get into someone\'s eyes or jam equipment. That is why crew clip nails right at a vent, where the airflow catches them.</p>');
      }
    }

    // ---------- Challenge 4: eating packaged food ----------
    async cFood() {
      this.focus('food'); this.setMission('Challenge 4 of 4 · Food Unit', 'Walking to the galley…');
      const a = this.astro; await this.walk([[3, 4.2], [6.5, 4.2], [11.3, 4.4]]); await this.turn(Math.PI / 2);
      this.setMission('Challenge 4 · Eat a meal', 'Pick a packaged meal from the shelf.', 'Click the food pack with the yellow arrow.');
      await this.waitClick('pouch', () => this.pouch.position.clone().add(new THREE.Vector3(0, 0.7, 0)));
      this.pouch.userData.carry = true;
      this.setMission('Challenge 4 · Eat a meal', 'Now heat the pack in the food warmer.', 'Click the food warmer.');
      await this.waitClick('heater', () => this.heater.position.clone().add(new THREE.Vector3(0, 0.9, 0)));
      this.pouch.userData.carry = false; this.hideMission();
      this.pouch.position.set(12.0, 1.7, 6.9); this.heatGlow.material.color.setHex(0xf97316); this.toast('Heating…', 2000);
      await this.delay(2600); this.heatGlow.material.color.setHex(0x7c2d12); this.pouch.userData.carry = true;
      for (;;) {
        const pick = await this.ask('Challenge 4 · Eat a meal', 'Your meal is hot. Water is an essential, limited resource on board. How do you eat?', shuffle([
          { key: 'good', label: 'Eat with a spoon straight from the pouch, keeping all food and water inside' },
          { key: 'waste', label: 'Squeeze the food and water into the air and catch the bites with your mouth' }]));
        if (pick === 'good') {
          this.hideMission(); a.mode = 'eat'; await this.delay(4500); a.mode = 'idle'; this.pouch.userData.carry = false; this.pouch.position.copy(this.pouchHome);
          await this.win('Challenge 4 complete: Eating',
            '<ul><li>Meals come <b>pre-packed in pouches</b>, heated in a food warmer and eaten with a spoon, so crumbs and droplets stay contained.</li><li><b>Water is precious.</b> The ISS recycles sweat, breath moisture and even urine into drinking water, reaching about <b>98% recovery</b> in 2023.</li><li>Floating droplets can short-circuit equipment, and every wasted drop is water that had to be launched or recycled.</li></ul>');
          return;
        }
        this.hideMission(); a.mode = 'eat';
        this.spawnParticles(14, a.handWorld(0, 1.6, 0.4), { size: 0.1, color: 0x38bdf8, spread: 0.8, speed: 0.8 });
        this.spawnParticles(8, a.handWorld(0, 1.6, 0.4), { size: 0.06, color: 0xf97316, spread: 0.8, speed: 0.7 });
        this.toast('Droplets and crumbs escape across the cabin!', 2500); await this.delay(3000); a.mode = 'idle';
        await this.lose('Water and food wasted!',
          '<p>Free-floating water and food <b>drift into electronics and air vents</b>, can be inhaled, and waste <b>water, an essential resource</b> aboard the spacecraft.</p><p>Eat from the pouch with a spoon and keep everything contained.</p>');
        this.pouch.userData.carry = true;
      }
    }

    // ------------------------------------------
    // EVENT LISTENERS
    // ------------------------------------------
    setupEventListeners() {
      const stage = () => document.getElementById('spaceshipStage');
      window.addEventListener('resize', () => {
        if (!this.camera || !this.renderer) return;
        const w = window.innerWidth, h = window.innerHeight;
        this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); this.renderer.setSize(w, h);
      });
      const down = (x, y) => { this.isDragging = true; this.dragMoved = 0; this.previousMousePos = { x, y }; };
      const move = (x, y, k) => {
        if (!this.isDragging) return;
        const dx = x - this.previousMousePos.x, dy = y - this.previousMousePos.y; this.previousMousePos = { x, y };
        this.dragMoved += Math.abs(dx) + Math.abs(dy);
        this.camGoal.az -= dx * 0.005 * k; this.camGoal.el = clamp(this.camGoal.el + dy * 0.004 * k, 0.05, 1.3);
      };
      this.canvas.addEventListener('mousedown', e => { this.audio.init(); down(e.clientX, e.clientY); });
      window.addEventListener('mousemove', e => move(e.clientX, e.clientY, 1));
      window.addEventListener('mouseup', e => { if (this.isDragging && this.dragMoved < 6 && e.target === this.canvas) this.pick(e.clientX, e.clientY); this.isDragging = false; });
      this.canvas.addEventListener('touchstart', e => { if (e.touches.length === 1) down(e.touches[0].clientX, e.touches[0].clientY); });
      window.addEventListener('touchmove', e => { if (e.touches.length === 1) move(e.touches[0].clientX, e.touches[0].clientY, 1.4); });
      window.addEventListener('touchend', e => { if (this.isDragging && this.dragMoved < 8 && e.changedTouches[0]) this.pick(e.changedTouches[0].clientX, e.changedTouches[0].clientY); this.isDragging = false; });
      this.canvas.addEventListener('wheel', e => { e.preventDefault(); this.camGoal.dist = clamp(this.camGoal.dist + e.deltaY * 0.02, 6, 36); }, { passive: false });
      this.canvas.addEventListener('mousemove', e => { if (this.isDragging) return; this.canvas.style.cursor = this.hitId(e.clientX, e.clientY) ? 'pointer' : 'grab'; });

      const setKey = (e, v) => {
        const s = stage(); if (!s || s.style.display === 'none') return;
        if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.w = v;
        if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.s = v;
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.a = v;
        if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.d = v;
      };
      window.addEventListener('keydown', e => setKey(e, true));
      window.addEventListener('keyup', e => setKey(e, false));
      document.querySelectorAll('.ship-light-pill').forEach(p => p.addEventListener('click', () => this.setLightingMode(p.getAttribute('data-mode'))));
      document.querySelectorAll('.ship-preset-btn').forEach(b => b.addEventListener('click', () => this.setCameraPreset(b.getAttribute('data-preset'))));
      const cb = document.getElementById('shipInspectClose'); if (cb) cb.addEventListener('click', () => document.getElementById('shipInspectorCard').classList.remove('is-open'));
      const ab = document.getElementById('shipAudioBtn'); if (ab) ab.addEventListener('click', () => { const m = this.audio.toggleMute(); ab.textContent = m ? 'Audio: MUTED' : 'Audio: ON'; });
      const rb = document.getElementById('shipRestartBtn'); if (rb) rb.addEventListener('click', () => { if (confirm('Restart the mission from Challenge 1?')) { document.getElementById('shipDialog').classList.remove('is-open'); this.beginMission(); } });
    }
    hitId(cx, cy) {
      const rc = new THREE.Raycaster(), v = new THREE.Vector2(cx / window.innerWidth * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
      rc.setFromCamera(v, this.camera);
      const hits = rc.intersectObjects(this.clickMeshes, false);
      for (const h of hits) { const id = h.object.userData.clickId; if (this.handlers[id] && h.object.visible) return id; }
      return null;
    }
    pick(cx, cy) { const id = this.hitId(cx, cy); if (id) this.handlers[id](); }

    // ------------------------------------------
    // MAIN ANIMATION LOOP
    // ------------------------------------------
    animate() {
      requestAnimationFrame(() => this.animate());
      const st = document.getElementById('spaceshipStage');
      if (!st || st.style.display === 'none') return; // paused while another phase is open
      if (!this.introShown) { this.showIntro(); }
      const dt = 0.016; this.animTime += dt;
      const a = this.astro;

      // free walk (between challenges)
      if (this.freeWalk && a.mode !== 'walk') {
        const az = this.cam.az, f = (this.keys.w ? 1 : 0) - (this.keys.s ? 1 : 0), r = (this.keys.d ? 1 : 0) - (this.keys.a ? 1 : 0);
        if (f || r) {
          const dx = -Math.sin(az) * f + Math.cos(az) * r, dz = -Math.cos(az) * f - Math.sin(az) * r, l = Math.hypot(dx, dz) || 1;
          a.root.position.x = clamp(a.root.position.x + dx / l * CONFIG.freeSpeed * dt, -12.2, 12.2);
          a.root.position.z = clamp(a.root.position.z + dz / l * CONFIG.freeSpeed * dt, -7.2, 7.4);
          a.headingGoal = Math.atan2(dx, dz); a.phase += dt * 7; a.freeMoving = true;
        } else a.freeMoving = false;
      }
      a.update(dt);
      if (this.freeWalk && a.freeMoving) { const s = Math.sin(a.phase); a.legL.rotation.x = s * 0.55; a.legR.rotation.x = -s * 0.55; a.armL.rotation.x = -s * 0.4; a.armR.rotation.x = s * 0.4; }
      if (a.floatVel) a.root.position.addScaledVector(a.floatVel, dt);

      // camera easing (+shake)
      const c = this.cam, g = this.camGoal, k = 0.06;
      c.tx = lerp(c.tx, g.tx, k); c.ty = lerp(c.ty, g.ty, k); c.tz = lerp(c.tz, g.tz, k);
      c.az += angDiff(c.az, g.az) * k; g.az = c.az + angDiff(c.az, g.az); c.el = lerp(c.el, g.el, k); c.dist = lerp(c.dist, g.dist, k);
      const ce = Math.cos(c.el);
      this.camera.position.set(c.tx + Math.sin(c.az) * ce * c.dist, c.ty + Math.sin(c.el) * c.dist, c.tz + Math.cos(c.az) * ce * c.dist);
      if (this.shake > 0.01) { this.camera.position.x += rand(-1, 1) * this.shake * 0.25; this.camera.position.y += rand(-1, 1) * this.shake * 0.25; this.shake *= 0.9; }
      this.camera.lookAt(c.tx, c.ty, c.tz);

      // floating items
      Object.values(this.items).forEach(it => {
        if (!it.mesh.visible) return;
        if (it.held) { it.anchor.copy(a.handWorld(it.id === 'brush' ? 0.3 : it.id === 'paste' ? -0.3 : it.id === 'water' ? 0.0 : -0.25, it.id === 'water' ? 1.95 : 1.35, 0.55)); }
        if (it.floating || it.held) {
          const pull = it.held ? 3.5 : 0.5;
          it.vel.addScaledVector(it.anchor.clone().sub(it.mesh.position), pull * dt); it.vel.multiplyScalar(it.held ? 0.88 : 0.985);
          it.mesh.position.addScaledVector(it.vel, dt); it.mesh.position.y += Math.sin(this.animTime * 1.4 + it.phase) * 0.0025;
          it.mesh.rotation.x += it.spin.x * dt; it.mesh.rotation.y += it.spin.y * dt; it.mesh.rotation.z += it.spin.z * dt * 0.5;
        }
      });
      // carried food pouch follows the hand
      if (this.pouch.userData.carry) { const p = a.handWorld(0.0, 1.25, 0.5); this.pouch.position.lerp(p, 0.15); this.pouch.rotation.y += 0.01; }
      // particles (spit / crumbs / clippings / water)
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        if (p.toward) { p.vel.addScaledVector(p.toward.clone().sub(p.mesh.position).normalize(), 0.8 * dt); if (p.mesh.position.distanceTo(p.toward) < 0.35) { this.scene.remove(p.mesh); this.particles.splice(i, 1); continue; } }
        p.mesh.position.addScaledVector(p.vel, dt); p.mesh.rotation.x += p.spin * dt; p.mesh.rotation.y += p.spin * dt * 0.7;
        const hw = CONFIG.roomW / 2 - 0.3; if (Math.abs(p.mesh.position.x) > hw && p.vel.x * p.mesh.position.x > 0) p.vel.x *= -0.5;
        if ((p.mesh.position.y < 0.2 && p.vel.y < 0) || (p.mesh.position.y > 4.5 && p.vel.y > 0)) p.vel.y *= -0.6; if (p.mesh.position.z < -7.6 && p.vel.z < 0) p.vel.z *= -0.5;
        p.life -= dt; if (p.life < 0) { this.scene.remove(p.mesh); this.particles.splice(i, 1); }
      }
      // Zzz
      for (let i = this.zzz.length - 1; i >= 0; i--) { const z = this.zzz[i]; z.t += dt; z.s.position.y += dt * 0.5; z.s.position.x += Math.sin(z.t * 3) * 0.004; z.s.material.opacity = 1 - z.t / 2.2; if (z.t > 2.2) { this.scene.remove(z.s); this.zzz.splice(i, 1); } }
      // markers bounce
      this.markers.forEach(m => { const p = m.getPos(); m.mesh.position.set(p.x, p.y + Math.sin(this.animTime * 5) * 0.12, p.z); });
      // ambient animation
      if (this.earthMesh) this.earthMesh.rotation.y += 0.0008;
      this.blinkingLeds.forEach(i => { i.mesh.visible = Math.sin(this.animTime * i.freq) > -0.6; });
      if (this.lightMode === 'emergency') { const p = (Math.sin(this.animTime * 4) + 1) * 0.5; this.ceilingStripLight1.intensity = 0.5 + p * 1.5; this.ceilingStripLight2.intensity = 0.5 + p * 1.5; }
      this.renderer.render(this.scene, this.camera);
    }
  }

  window.SpaceshipEngine = new SpaceshipEngine();
})();
