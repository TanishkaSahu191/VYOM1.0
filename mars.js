/**
 * ============================================================================
 * MARS EXPLORER — VYOM 1.0
 * 3 missions · route cost (terrain, holes, sunlight) · 3D rover · minimal Arial flashcards
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // CONFIG
  // --------------------------------------------------------------------------
  const CONFIG = {
    walkSpeed: 6.5,
    roverSpeed: 16,
    turnSpeed: 2.0,
    oxygenMax: 100,
    batteryMax: 100,
    oxygenDrain: 0.55,
    batteryDrain: 0.4,
    solarCharge: 1.8,
    collectRange: 9
  };

  // --------------------------------------------------------------------------
  // MISSIONS + ROUTES + FLASHCARDS
  // --------------------------------------------------------------------------
  const MISSIONS = [
    {
      id: 'water',
      num: 1,
      name: 'Collect Water Ice',
      short: 'Water Ice',
      desc: 'Drive to a mid-latitude ice deposit and collect subsurface water ice for life support and propellant.',
      targetLabel: 'Water Ice Sample',
      targetPos: { x: 48, z: -72 },
      flashcards: [
        {
          title: 'First confirmed water ice on Mars',
          body: 'In 2008, NASA’s Phoenix lander dug into the northern polar soil and found water ice just centimeters below the surface. The ice sublimated when exposed, confirming pure water ice mixed with soil.'
        },
        {
          title: 'Why ice matters for humans',
          body: 'Water ice can be melted for drinking water, split by electrolysis into oxygen to breathe, and combined into liquid hydrogen and oxygen for rocket propellant. It is the most important in-situ resource for future crews.'
        }
      ],
      routes: [
        {
          id: 'w1',
          name: 'Southern valley (short)',
          distance: 82,
          holes: 1,
          sunlight: 35,
          note: 'Near base. Low sunlight. Acceptable because distance is short.',
          path: [
            { x: 0, z: 18 },
            { x: 20, z: -20 },
            { x: 48, z: -72 }
          ]
        },
        {
          id: 'w2',
          name: 'Sun ridge path',
          distance: 118,
          holes: 2,
          sunlight: 88,
          note: 'Longer but high sunlight. Battery can recharge while driving.',
          path: [
            { x: 0, z: 18 },
            { x: 40, z: 10 },
            { x: 70, z: -30 },
            { x: 48, z: -72 }
          ]
        },
        {
          id: 'w3',
          name: 'Crater rim detour',
          distance: 145,
          holes: 5,
          sunlight: 72,
          note: 'Far route with many holes. High battery cost. Use only if prepared.',
          path: [
            { x: 0, z: 18 },
            { x: -30, z: -10 },
            { x: -20, z: -50 },
            { x: 48, z: -72 }
          ]
        }
      ]
    },
    {
      id: 'hematite',
      num: 2,
      name: 'Collect Hematite Spherules',
      short: 'Hematite',
      desc: 'Reach a Meridiani-style plain and collect hematite “blueberry” concretions formed in ancient water.',
      targetLabel: 'Hematite Spherules',
      targetPos: { x: -85, z: 40 },
      flashcards: [
        {
          title: 'Opportunity and the blueberries',
          body: 'In 2004, NASA’s Opportunity rover found millions of small hematite spheres at Meridiani Planum. They formed inside water-soaked sediments billions of years ago and were nicknamed blueberries.'
        },
        {
          title: 'Evidence of past liquid water',
          body: 'Hematite of this type typically precipitates from liquid water. Their presence was strong evidence that Meridiani once had long-lived shallow water or groundwater.'
        }
      ],
      routes: [
        {
          id: 'h1',
          name: 'Direct dark plain',
          distance: 95,
          holes: 2,
          sunlight: 28,
          note: 'Moderate distance into a low-sun area. Battery drain will be higher.',
          path: [
            { x: 0, z: 18 },
            { x: -40, z: 25 },
            { x: -85, z: 40 }
          ]
        },
        {
          id: 'h2',
          name: 'Eastern sun corridor',
          distance: 132,
          holes: 3,
          sunlight: 91,
          note: 'Longer path with strong sunlight. Better for battery if you drive steadily.',
          path: [
            { x: 0, z: 18 },
            { x: 30, z: 50 },
            { x: -20, z: 60 },
            { x: -85, z: 40 }
          ]
        },
        {
          id: 'h3',
          name: 'Short ridge cut',
          distance: 78,
          holes: 4,
          sunlight: 55,
          note: 'Shortest option but more holes. Risk of extra battery use on rough ground.',
          path: [
            { x: 0, z: 18 },
            { x: -50, z: 30 },
            { x: -85, z: 40 }
          ]
        }
      ]
    },
    {
      id: 'clay',
      num: 3,
      name: 'Collect Delta Clay Sample',
      short: 'Delta Clay',
      desc: 'Drive to an ancient river-delta deposit and collect clay-rich sediment that can preserve organics.',
      targetLabel: 'Delta Clay Core',
      targetPos: { x: 70, z: 85 },
      flashcards: [
        {
          title: 'Jezero Crater and Perseverance',
          body: 'NASA’s Perseverance rover landed in Jezero Crater in 2021. The crater once held a lake fed by a river delta. Clays and carbonates there are prime places to look for ancient organic matter.'
        },
        {
          title: 'Why clays preserve organics',
          body: 'Fine clay minerals trap and shield organic molecules from radiation and oxidation. On Earth, the oldest evidence of life is often found in clay-rich sedimentary rocks.'
        }
      ],
      routes: [
        {
          id: 'c1',
          name: 'Northern sun track',
          distance: 110,
          holes: 2,
          sunlight: 84,
          note: 'Good sunlight for the distance. Preferred for steady charging.',
          path: [
            { x: 0, z: 18 },
            { x: 25, z: 50 },
            { x: 55, z: 75 },
            { x: 70, z: 85 }
          ]
        },
        {
          id: 'c2',
          name: 'Near-base approach',
          distance: 92,
          holes: 1,
          sunlight: 42,
          note: 'Closer to base with moderate sun. Viable if battery starts full.',
          path: [
            { x: 0, z: 18 },
            { x: 40, z: 55 },
            { x: 70, z: 85 }
          ]
        },
        {
          id: 'c3',
          name: 'Far crater edge',
          distance: 160,
          holes: 6,
          sunlight: 65,
          note: 'Long and hole-heavy. High cost. Not recommended for first attempt.',
          path: [
            { x: 0, z: 18 },
            { x: -20, z: 40 },
            { x: 20, z: 100 },
            { x: 70, z: 85 }
          ]
        }
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // AUDIO (minimal)
  // --------------------------------------------------------------------------
  class MarsAudio {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    }
    beep(freq, dur, type) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(freq, this.ctx.currentTime);
        g.gain.setValueAtTime(0.08, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start();
        o.stop(this.ctx.currentTime + dur);
      } catch (e) {}
    }
    collect() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      [659, 830, 988].forEach((f, i) => {
        try {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.07);
          g.gain.setValueAtTime(0.1, this.ctx.currentTime + i * 0.07);
          g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.07 + 0.28);
          o.connect(g);
          g.connect(this.ctx.destination);
          o.start(this.ctx.currentTime + i * 0.07);
          o.stop(this.ctx.currentTime + i * 0.07 + 0.3);
        } catch (e) {}
      });
    }
    toggle() {
      this.muted = !this.muted;
      return this.muted;
    }
  }

  // --------------------------------------------------------------------------
  // ENGINE
  // --------------------------------------------------------------------------
  class MarsExplorerEngine {
    constructor() {
      this.audio = new MarsAudio();
      this.isInitialized = false;
      this.canvas = null;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.sunLight = null;
      this.ambientLight = null;

      this.terrain = null;
      this.habGroup = null;
      this.roverGroup = null;
      this.targetMarker = null;
      this.holeMeshes = [];

      this.player = {
        oxygen: CONFIG.oxygenMax,
        battery: CONFIG.batteryMax,
        inRover: true,
        credits: 0,
        collected: {}
      };

      this.keys = { w: false, s: false, a: false, d: false };
      this.worldTime = 0;
      this.currentMission = null;
      this.selectedRoute = null;
      this.missionDone = { water: false, hematite: false, clay: false };
      this.flashQueue = [];
      this.flashIndex = 0;
      this.flashTimer = null;
      this.atTarget = false;
      this.routeHoles = [];
      this.routeSunFactor = 1;
    }

    // ---------- PUBLIC ----------
    init() {
      if (this.isInitialized) return;
      this.canvas = document.getElementById('marsCanvas');
      if (!this.canvas) return;

      this.setupScene();
      this.setupTerrain();
      this.setupHab();
      this.setupRover();
      this.setupEvents();
      this.isInitialized = true;
      this.updateHUD();
      this.animate();

      // Open mission select on first load
      setTimeout(() => this.openMissionSelect(), 400);
    }

    // ---------- THREE SETUP ----------
    setupScene() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xb45309);
      this.scene.fog = new THREE.FogExp2(0xb45309, 0.007);

      this.camera = new THREE.PerspectiveCamera(55, w / h, 0.2, 800);
      this.camera.position.set(0, 6, 28);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;

      this.ambientLight = new THREE.AmbientLight(0xff9966, 0.6);
      this.scene.add(this.ambientLight);

      this.sunLight = new THREE.DirectionalLight(0xfff3e0, 1.35);
      this.sunLight.position.set(100, 140, 80);
      this.sunLight.castShadow = true;
      this.sunLight.shadow.mapSize.set(1024, 1024);
      this.scene.add(this.sunLight);
    }

    setupTerrain() {
      const size = 320;
      const seg = 80;
      const geo = new THREE.PlaneGeometry(size, size, seg, seg);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const d = Math.sqrt(vx * vx + vy * vy);
        let h = 0;
        if (d > 16) {
          h = Math.sin(vx * 0.04) * Math.cos(vy * 0.04) * 3.5 +
              Math.sin(vx * 0.11 + vy * 0.1) * 1.4;
          if (d > 55 && d < 90) h += Math.sin((d - 55) * 0.12) * 2.8;
        }
        pos.setZ(i, h);
      }
      geo.computeVertexNormals();
      const mat = new THREE.MeshStandardMaterial({
        color: 0xc2410c,
        roughness: 0.95,
        metalness: 0.04,
        flatShading: true
      });
      this.terrain = new THREE.Mesh(geo, mat);
      this.terrain.rotation.x = -Math.PI / 2;
      this.terrain.receiveShadow = true;
      this.scene.add(this.terrain);

      // Scattered rocks
      const rockGeo = new THREE.DodecahedronGeometry(1.1, 0);
      const rockMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.9 });
      for (let i = 0; i < 50; i++) {
        const r = new THREE.Mesh(rockGeo, rockMat);
        const rx = (Math.random() - 0.5) * 260;
        const rz = (Math.random() - 0.5) * 260;
        if (Math.hypot(rx, rz) < 20) continue;
        const s = 0.4 + Math.random() * 1.6;
        r.scale.set(s, s * 0.7, s);
        r.position.set(rx, 0.4, rz);
        r.rotation.set(Math.random(), Math.random(), Math.random());
        this.scene.add(r);
      }
    }

    setupHab() {
      this.habGroup = new THREE.Group();
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(5, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4, metalness: 0.3 })
      );
      dome.position.y = 0.1;
      this.habGroup.add(dome);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(5.2, 0.25, 8, 32),
        new THREE.MeshStandardMaterial({ color: 0x64748b })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.15;
      this.habGroup.add(ring);
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(7, 7, 0.3, 24),
        new THREE.MeshStandardMaterial({ color: 0x44403c })
      );
      pad.position.y = 0.05;
      this.habGroup.add(pad);
      this.habGroup.position.set(0, 0, 0);
      this.scene.add(this.habGroup);
    }

    /** Build a readable 3D rover (body, wheels, mast, solar) */
    setupRover() {
      this.roverGroup = new THREE.Group();

      // Chassis
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 0.7, 4.2),
        new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.55, roughness: 0.35 })
      );
      body.position.y = 1.15;
      body.castShadow = true;
      this.roverGroup.add(body);

      // Deck plate
      const deck = new THREE.Mesh(
        new THREE.BoxGeometry(3.0, 0.15, 3.8),
        new THREE.MeshStandardMaterial({ color: 0xa1a1aa, metalness: 0.4, roughness: 0.5 })
      );
      deck.position.y = 1.55;
      this.roverGroup.add(deck);

      // Solar panel
      const solar = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 0.08, 2.4),
        new THREE.MeshStandardMaterial({ color: 0x1e3a5f, metalness: 0.7, roughness: 0.25 })
      );
      solar.position.set(0, 1.85, -0.3);
      this.roverGroup.add(solar);
      // Solar stripes
      for (let i = -1; i <= 1; i++) {
        const strip = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.09, 2.2),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0ea5e9, emissiveIntensity: 0.25 })
        );
        strip.position.set(i * 1.1, 1.9, -0.3);
        this.roverGroup.add(strip);
      }

      // Mast
      const mast = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.14, 2.2, 8),
        new THREE.MeshStandardMaterial({ color: 0x71717a })
      );
      mast.position.set(0.6, 2.7, 1.2);
      this.roverGroup.add(mast);
      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.4, 0.45),
        new THREE.MeshStandardMaterial({ color: 0x3f3f46 })
      );
      head.position.set(0.6, 3.7, 1.2);
      this.roverGroup.add(head);
      const cam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.2, 10),
        new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0284c7, emissiveIntensity: 0.4 })
      );
      cam.rotation.x = Math.PI / 2;
      cam.position.set(0.6, 3.7, 1.45);
      this.roverGroup.add(cam);

      // Wheels (6)
      const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.35, 12);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.85 });
      const positions = [
        [-1.5, 0.55, 1.5],
        [1.5, 0.55, 1.5],
        [-1.5, 0.55, 0],
        [1.5, 0.55, 0],
        [-1.5, 0.55, -1.5],
        [1.5, 0.55, -1.5]
      ];
      positions.forEach((p) => {
        const w = new THREE.Mesh(wheelGeo, wheelMat);
        w.rotation.z = Math.PI / 2;
        w.position.set(p[0], p[1], p[2]);
        w.castShadow = true;
        this.roverGroup.add(w);
      });

      // Arm
      const armBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.25, 0.25),
        new THREE.MeshStandardMaterial({ color: 0x52525b })
      );
      armBase.position.set(-1.2, 1.6, 1.6);
      this.roverGroup.add(armBase);
      const arm = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.18, 1.4),
        new THREE.MeshStandardMaterial({ color: 0xa1a1aa })
      );
      arm.position.set(-1.2, 1.6, 2.3);
      this.roverGroup.add(arm);

      this.roverGroup.position.set(0, 0, 18);
      this.scene.add(this.roverGroup);
    }

    placeTargetMarker(pos) {
      if (this.targetMarker) {
        this.scene.remove(this.targetMarker);
        this.targetMarker = null;
      }
      const g = new THREE.Group();
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 3.5, 8),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b })
      );
      pole.position.y = 1.75;
      g.add(pole);
      const flag = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.7, 0.05),
        new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 0.3 })
      );
      flag.position.set(0.6, 3.2, 0);
      g.add(flag);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(2.2, 2.6, 32),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.08;
      g.add(ring);
      g.position.set(pos.x, 0, pos.z);
      this.scene.add(g);
      this.targetMarker = g;
    }

    clearHoles() {
      this.holeMeshes.forEach((m) => this.scene.remove(m));
      this.holeMeshes = [];
    }

    placeHolesForRoute(route) {
      this.clearHoles();
      if (!route || !route.path) return;
      const n = route.holes || 0;
      for (let i = 0; i < n; i++) {
        const t = (i + 1) / (n + 1);
        const a = route.path[Math.floor(t * (route.path.length - 1))];
        const b = route.path[Math.min(Math.floor(t * (route.path.length - 1)) + 1, route.path.length - 1)];
        const x = a.x + (b.x - a.x) * (t * route.path.length % 1);
        const z = a.z + (b.z - a.z) * (t * route.path.length % 1);
        const hole = new THREE.Mesh(
          new THREE.CircleGeometry(1.8 + Math.random() * 1.2, 16),
          new THREE.MeshStandardMaterial({ color: 0x1c0a06, roughness: 1 })
        );
        hole.rotation.x = -Math.PI / 2;
        hole.position.set(x + (Math.random() - 0.5) * 8, 0.06, z + (Math.random() - 0.5) * 8);
        this.scene.add(hole);
        this.holeMeshes.push(hole);
      }
    }

    // ---------- MISSION FLOW ----------
    openMissionSelect() {
      const overlay = document.getElementById('marsMissionSelectModal');
      const grid = document.getElementById('marsMissionGrid');
      if (!overlay || !grid) return;
      grid.innerHTML = '';
      MISSIONS.forEach((m) => {
        const done = this.missionDone[m.id];
        const card = document.createElement('div');
        card.className = 'mars-mission-card' + (done ? ' is-done' : '');
        card.innerHTML =
          '<div class="mars-mission-num">MISSION 0' + m.num + '</div>' +
          '<div class="mars-mission-name">' + m.name + '</div>' +
          '<div class="mars-mission-desc">' + m.desc + '</div>' +
          '<div class="mars-mission-meta">' + (done ? 'Completed' : 'Not started') + '</div>';
        card.addEventListener('click', () => {
          if (done) return;
          this.openRoutePlanner(m);
        });
        grid.appendChild(card);
      });
      overlay.classList.add('is-open');
    }

    closeMissionSelect() {
      const overlay = document.getElementById('marsMissionSelectModal');
      if (overlay) overlay.classList.remove('is-open');
    }

    openRoutePlanner(mission) {
      this.closeMissionSelect();
      this.currentMission = mission;
      this.selectedRoute = null;

      const overlay = document.getElementById('marsRouteModal');
      const title = document.getElementById('marsRouteTitle');
      const intro = document.getElementById('marsRouteIntro');
      const list = document.getElementById('marsRouteList');
      const mapEl = document.getElementById('marsMiniMap');
      if (!overlay || !list) return;

      if (title) title.textContent = 'Select route — ' + mission.name;
      if (intro) {
        intro.textContent =
          'Routes are scored by distance, terrain holes, and sunlight. ' +
          'The rover charges from sunlight. Long trips need higher sunlight. ' +
          'Short trips from base can use darker paths. Cost is estimated battery use.';
      }

      // Mini map
      if (mapEl) {
        mapEl.innerHTML = '';
        const base = document.createElement('div');
        base.className = 'mars-mini-dot base';
        base.style.left = '50%';
        base.style.top = '55%';
        mapEl.appendChild(base);
        const bl = document.createElement('div');
        bl.className = 'mars-mini-map-label';
        bl.style.left = '52%';
        bl.style.top = '58%';
        bl.textContent = 'HAB';
        mapEl.appendChild(bl);

        const tx = 50 + (mission.targetPos.x / 160) * 45;
        const tz = 55 + (mission.targetPos.z / 160) * 40;
        const tgt = document.createElement('div');
        tgt.className = 'mars-mini-dot target';
        tgt.style.left = tx + '%';
        tgt.style.top = tz + '%';
        mapEl.appendChild(tgt);
        const tl = document.createElement('div');
        tl.className = 'mars-mini-map-label';
        tl.style.left = (tx + 2) + '%';
        tl.style.top = (tz - 2) + '%';
        tl.textContent = mission.short;
        mapEl.appendChild(tl);
      }

      list.innerHTML = '';
      mission.routes.forEach((r) => {
        const cost = this.estimateCost(r);
        const row = document.createElement('div');
        row.className = 'mars-route-option';
        row.dataset.routeId = r.id;
        row.innerHTML =
          '<div>' +
            '<div class="mars-route-name">' + r.name + '</div>' +
            '<div class="mars-route-stats">' +
              '<span>Distance <strong>' + r.distance + ' m</strong></span>' +
              '<span>Holes <strong>' + r.holes + '</strong></span>' +
              '<span>Sunlight <strong>' + r.sunlight + '%</strong> ' +
                '<span class="mars-route-sun"><span class="mars-route-sun-fill" style="width:' + r.sunlight + '%"></span></span>' +
              '</span>' +
            '</div>' +
            '<div style="font-size:0.78rem;color:#94a3b8;margin-top:6px;">' + r.note + '</div>' +
          '</div>' +
          '<div class="mars-route-cost">' +
            '<div class="mars-route-cost-label">EST. COST</div>' +
            '<div class="mars-route-cost-val">' + cost + '%</div>' +
          '</div>';
        row.addEventListener('click', () => {
          list.querySelectorAll('.mars-route-option').forEach((el) => el.classList.remove('is-selected'));
          row.classList.add('is-selected');
          this.selectedRoute = r;
          const startBtn = document.getElementById('marsBtnStartMission');
          if (startBtn) startBtn.disabled = false;
        });
        list.appendChild(row);
      });

      const startBtn = document.getElementById('marsBtnStartMission');
      if (startBtn) startBtn.disabled = true;

      overlay.classList.add('is-open');
    }

    estimateCost(route) {
      // Higher distance and holes raise cost; sunlight lowers effective cost
      const base = route.distance * 0.18 + route.holes * 6;
      const sunRelief = (route.sunlight / 100) * 22;
      return Math.max(8, Math.round(base - sunRelief));
    }

    closeRouteModal() {
      const overlay = document.getElementById('marsRouteModal');
      if (overlay) overlay.classList.remove('is-open');
    }

    startSelectedMission() {
      if (!this.currentMission || !this.selectedRoute) return;
      this.closeRouteModal();

      const m = this.currentMission;
      const r = this.selectedRoute;

      // Reset player at base
      this.roverGroup.position.set(0, 0, 18);
      this.roverGroup.rotation.y = 0;
      this.player.oxygen = CONFIG.oxygenMax;
      this.player.battery = CONFIG.batteryMax;
      this.player.inRover = true;
      this.atTarget = false;
      this.routeSunFactor = r.sunlight / 100;

      this.placeTargetMarker(m.targetPos);
      this.placeHolesForRoute(r);

      // Objectives HUD
      this.refreshObjectives();

      // Queue flashcards for this mission
      this.flashQueue = m.flashcards.slice(0, 2);
      this.flashIndex = 0;

      // First flashcard after a short delay
      setTimeout(() => this.showNextFlashcard(), 2500);

      this.audio.beep(880, 0.1);
      this.updateHUD();
    }

    refreshObjectives() {
      const list = document.getElementById('marsObjList');
      if (!list || !this.currentMission) return;
      const m = this.currentMission;
      const done = !!this.player.collected[m.id];
      list.innerHTML =
        '<div class="mars-obj-item' + (done ? ' is-done' : '') + '">' +
          '<span class="mars-obj-text">Reach ' + m.short + ' site</span>' +
          '<span class="mars-obj-tag">' + (done ? 'DONE' : 'ACTIVE') + '</span>' +
        '</div>' +
        '<div class="mars-obj-item' + (done ? ' is-done' : '') + '">' +
          '<span class="mars-obj-text">Collect ' + m.targetLabel + '</span>' +
          '<span class="mars-obj-tag">' + (done ? 'DONE' : 'PENDING') + '</span>' +
        '</div>' +
        '<div class="mars-obj-item">' +
          '<span class="mars-obj-text">Return to Hab (optional)</span>' +
          '<span class="mars-obj-tag">BASE</span>' +
        '</div>';
    }

    // ---------- FLASHCARDS (auto-dismiss after 5s, max 2 per mission) ----------
    showNextFlashcard() {
      if (!this.flashQueue.length || this.flashIndex >= this.flashQueue.length) return;
      if (this.flashIndex >= 2) return; // hard cap: 2 facts per mission
      const card = this.flashQueue[this.flashIndex];
      const el = document.getElementById('marsFlashcard');
      if (!el) return;
      const title = document.getElementById('marsFlashTitle');
      const body = document.getElementById('marsFlashBody');
      if (title) title.textContent = card.title;
      if (body) body.textContent = card.body;
      el.classList.add('is-open');
      clearTimeout(this.flashTimer);
      this.flashTimer = setTimeout(() => this.dismissFlashcard(), 5000);
    }

    dismissFlashcard() {
      const el = document.getElementById('marsFlashcard');
      if (!el) return;
      el.classList.remove('is-open');
      clearTimeout(this.flashTimer);
      this.flashIndex++;
      // Second card later in the drive (only if still under 2)
      if (this.flashIndex < this.flashQueue.length && this.flashIndex < 2) {
        setTimeout(() => this.showNextFlashcard(), 18000);
      }
    }

    // ---------- COLLECT ----------
    tryCollect() {
      if (!this.currentMission || this.player.collected[this.currentMission.id]) return;
      if (!this.atTarget) return;

      this.player.collected[this.currentMission.id] = true;
      this.missionDone[this.currentMission.id] = true;
      this.player.credits += 80;
      this.audio.collect();
      this.refreshObjectives();
      this.updateHUD();

      const prompt = document.getElementById('marsCollectPrompt');
      if (prompt) prompt.classList.remove('is-open');

      // Brief success notice (auto-hides in 5s)
      const el = document.getElementById('marsFlashcard');
      const title = document.getElementById('marsFlashTitle');
      const body = document.getElementById('marsFlashBody');
      if (el && title && body) {
        title.textContent = 'Sample secured';
        body.textContent =
          this.currentMission.targetLabel +
          ' is stored. Open Missions for the next objective.';
        el.classList.add('is-open');
        clearTimeout(this.flashTimer);
        this.flashTimer = setTimeout(() => {
          el.classList.remove('is-open');
        }, 5000);
      }
    }


    // ---------- LIVE MINIMAP ----------
    drawMinimap() {
      const canvas = document.getElementById('marsNavMap');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      // World half-extent maps to ~90% of canvas radius
      const worldR = 160;
      const scale = (Math.min(w, h) * 0.42) / worldR;

      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = '#1a0c08';
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.48, 0, Math.PI * 2);
      ctx.fill();

      // Grid rings
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.2)';
      ctx.lineWidth = 1;
      [40, 80, 120].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r * scale, 0, Math.PI * 2);
        ctx.stroke();
      });
      // Cross
      ctx.beginPath();
      ctx.moveTo(cx - 70, cy); ctx.lineTo(cx + 70, cy);
      ctx.moveTo(cx, cy - 70); ctx.lineTo(cx, cy + 70);
      ctx.stroke();

      // Hab base at origin
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#86efac';
      ctx.font = '9px Arial';
      ctx.fillText('HAB', cx + 7, cy - 4);

      // Target
      if (this.currentMission) {
        const tp = this.currentMission.targetPos;
        const tx = cx + tp.x * scale;
        const tz = cy + tp.z * scale;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(tx, tz, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(tx, tz, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#fef08a';
        ctx.font = '9px Arial';
        ctx.fillText(this.currentMission.short, tx + 8, tz + 3);

        // Line from rover to target
        if (this.roverGroup) {
          const rx = cx + this.roverGroup.position.x * scale;
          const rz = cy + this.roverGroup.position.z * scale;
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.55)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.moveTo(rx, rz);
          ctx.lineTo(tx, tz);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Rover + heading
      if (this.roverGroup) {
        const rx = cx + this.roverGroup.position.x * scale;
        const rz = cy + this.roverGroup.position.z * scale;
        const rot = this.roverGroup.rotation.y;
        // body
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(rx, rz, 5, 0, Math.PI * 2);
        ctx.fill();
        // heading arrow
        const hx = rx + Math.sin(rot) * 12;
        const hz = rz + Math.cos(rot) * 12;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(rx, rz);
        ctx.lineTo(hx, hz);
        ctx.stroke();
      }

      // Legend strip
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(4, h - 18, w - 8, 14);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '8px Arial';
      ctx.fillText('Green HAB  ·  Orange target  ·  Cyan you', 8, h - 8);
    }

    // ---------- HUD ----------
    updateHUD() {
      const oVal = document.getElementById('marsOxygenVal');
      const oFill = document.getElementById('marsOxygenFill');
      const bVal = document.getElementById('marsBatteryVal');
      const bFill = document.getElementById('marsBatteryFill');
      const cred = document.getElementById('marsCreditsDisplay');
      const pack = document.getElementById('marsBackpackDisplay');
      const mode = document.getElementById('marsVehicleMode');
      const sunBox = document.getElementById('marsSolarStatusBox');
      const sunText = document.getElementById('marsSolarStatusText');

      if (oVal) oVal.textContent = Math.round(this.player.oxygen) + '%';
      if (oFill) oFill.style.width = this.player.oxygen + '%';
      if (bVal) bVal.textContent = Math.round(this.player.battery) + '%';
      if (bFill) bFill.style.width = this.player.battery + '%';
      if (cred) cred.textContent = this.player.credits;
      if (pack) {
        const n = Object.keys(this.player.collected).length;
        pack.textContent = n + ' / 3';
      }
      if (mode) mode.textContent = this.player.inRover ? 'ROVER' : 'ON FOOT';

      if (sunBox && sunText) {
        const sun = this.routeSunFactor >= 0.55;
        sunBox.classList.toggle('is-cold', !sun);
        sunText.textContent = sun
          ? 'SUNLIGHT AVAILABLE (CHARGING OK)'
          : 'LOW SUNLIGHT (LIMITED CHARGE)';
      }
    }

    // ---------- EVENTS ----------
    setupEvents() {
      window.addEventListener('resize', () => {
        if (!this.camera || !this.renderer) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      });

      window.addEventListener('keydown', (e) => {
        const stage = document.getElementById('marsStage');
        if (!stage || stage.style.display === 'none') return;

        if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.w = true;
        if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.s = true;
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.a = true;
        if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.d = true;

        if (e.code === 'KeyE') this.tryCollect();
        if (e.code === 'KeyM') this.openMissionSelect();

        // Dismiss flashcard with Space or click handled separately
        if (e.code === 'Space' || e.code === 'Escape') {
          const fc = document.getElementById('marsFlashcard');
          if (fc && fc.classList.contains('is-open')) {
            e.preventDefault();
            this.dismissFlashcard();
          }
        }
      });

      window.addEventListener('keyup', (e) => {
        if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.w = false;
        if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.s = false;
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.a = false;
        if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.d = false;
      });

      // Flashcards auto-dismiss after 5s; click is optional
      const flash = document.getElementById('marsFlashcard');
      if (flash) flash.addEventListener('click', () => this.dismissFlashcard());

      const btnMissions = document.getElementById('marsBtnMissions');
      if (btnMissions) btnMissions.addEventListener('click', () => this.openMissionSelect());

      const btnStart = document.getElementById('marsBtnStartMission');
      if (btnStart) btnStart.addEventListener('click', () => this.startSelectedMission());

      const btnBackRoute = document.getElementById('marsBtnBackToMissions');
      if (btnBackRoute) {
        btnBackRoute.addEventListener('click', () => {
          this.closeRouteModal();
          this.openMissionSelect();
        });
      }

      const btnAudio = document.getElementById('marsAudioBtn');
      if (btnAudio) {
        btnAudio.addEventListener('click', () => {
          const muted = this.audio.toggle();
          btnAudio.textContent = muted ? 'Audio: OFF' : 'Audio: ON';
        });
      }

      document.querySelectorAll('.mars-modal-close').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const ov = e.target.closest('.mars-modal-overlay');
          if (ov) ov.classList.remove('is-open');
        });
      });

      const touchCollect = document.getElementById('marsTouchCollect');
      if (touchCollect) touchCollect.addEventListener('pointerdown', () => this.tryCollect());
    }

    // ---------- LOOP ----------
    animate() {
      requestAnimationFrame(() => this.animate());
      const dt = 0.016;
      this.worldTime += dt;

      // Day cycle light
      const cycle = (this.worldTime % 180) / 180;
      const ang = cycle * Math.PI * 2;
      this.sunLight.position.set(Math.cos(ang) * 140, Math.sin(ang) * 140, 70);
      if (Math.sin(ang) < 0) {
        this.scene.background.setHex(0x06020a);
        this.ambientLight.intensity = 0.22;
      } else {
        this.scene.background.setHex(0xb45309);
        this.ambientLight.intensity = 0.6;
      }

      const obj = this.roverGroup;
      if (!obj) {
        if (this.renderer && this.scene && this.camera) this.renderer.render(this.scene, this.camera);
        return;
      }

      if (this.keys.a) obj.rotation.y += CONFIG.turnSpeed * dt;
      if (this.keys.d) obj.rotation.y -= CONFIG.turnSpeed * dt;

      let move = 0;
      if (this.keys.w) move = 1;
      if (this.keys.s) move = -0.55;

      if (move !== 0) {
        const rot = obj.rotation.y;
        const spd = CONFIG.roverSpeed;
        obj.position.x += Math.sin(rot) * move * spd * dt;
        obj.position.z += Math.cos(rot) * move * spd * dt;
        obj.position.x = Math.max(-145, Math.min(145, obj.position.x));
        obj.position.z = Math.max(-145, Math.min(145, obj.position.z));

        // Battery: drain + sunlight charge while moving
        const drain = CONFIG.batteryDrain * (1.15 - this.routeSunFactor * 0.5);
        this.player.battery = Math.max(0, this.player.battery - drain * dt);
        if (this.routeSunFactor > 0.4) {
          this.player.battery = Math.min(
            CONFIG.batteryMax,
            this.player.battery + CONFIG.solarCharge * this.routeSunFactor * 0.35 * dt
          );
        }
        // Oxygen slight drain
        this.player.oxygen = Math.max(0, this.player.oxygen - CONFIG.oxygenDrain * 0.25 * dt);
      } else {
        // Stationary solar charge
        if (this.routeSunFactor > 0.35) {
          this.player.battery = Math.min(
            CONFIG.batteryMax,
            this.player.battery + CONFIG.solarCharge * this.routeSunFactor * dt
          );
        }
      }

      // Target proximity
      if (this.currentMission && !this.player.collected[this.currentMission.id]) {
        const tp = this.currentMission.targetPos;
        const dist = Math.hypot(obj.position.x - tp.x, obj.position.z - tp.z);
        this.atTarget = dist < CONFIG.collectRange;
        const prompt = document.getElementById('marsCollectPrompt');
        if (prompt) {
          if (this.atTarget) {
            prompt.textContent = 'Press E to collect ' + this.currentMission.targetLabel;
            prompt.classList.add('is-open');
          } else {
            prompt.classList.remove('is-open');
          }
        }
      }

      // Hazard near holes
      const banner = document.getElementById('marsHazardBanner');
      let nearHole = false;
      for (let i = 0; i < this.holeMeshes.length; i++) {
        const h = this.holeMeshes[i];
        if (Math.hypot(obj.position.x - h.position.x, obj.position.z - h.position.z) < 4) {
          nearHole = true;
          break;
        }
      }
      if (banner) {
        banner.style.display = nearHole ? 'flex' : 'none';
        if (nearHole) {
          const ht = document.getElementById('marsHazardText');
          if (ht) ht.textContent = 'TERRAIN HOLE — SLOW DOWN';
        }
      }

      // Camera follow
      const camOff = new THREE.Vector3(0, 5.5, -11);
      camOff.applyAxisAngle(new THREE.Vector3(0, 1, 0), obj.rotation.y);
      const targetCam = obj.position.clone().add(camOff);
      this.camera.position.lerp(targetCam, 0.1);
      this.camera.lookAt(obj.position.x, obj.position.y + 1.5, obj.position.z);

      // Compass
      const pin = document.getElementById('marsCompassHeading');
      if (pin) {
        const deg = Math.round(((obj.rotation.y * 180) / Math.PI) % 360);
        pin.textContent = ((deg + 360) % 360) + '°';
      }

      this.drawMinimap();
      this.updateHUD();
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }

  window.MarsExplorerEngine = new MarsExplorerEngine();
})();
