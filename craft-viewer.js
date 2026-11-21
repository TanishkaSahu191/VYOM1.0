/**
 * ============================================================================
 * VYOM 1.0 - 3D ROTATABLE SPACECRAFT MODEL & LABELED COMPONENTS VIEWER
 * Features:
 *  - Three.js procedural photorealistic 3D models for Orion, Crew Dragon & Gaganyaan
 *  - Interactive 360° mouse / touch rotation, zoom & pan
 *  - 3D screen-projected component pins with interactive line connectors
 *  - Subsystem engineering dossiers with verified specs
 * ============================================================================
 */

(function () {
  'use strict';

  // --- Spacecraft Engineering Telemetry Data & 3D Component Coordinates ---
  const SPACECRAFT_3D_DATA = {
    orion: {
      id: 'orion',
      name: 'Orion MPCV',
      subtitle: 'NASA // Deep Space Lunar Crew Exploration Vehicle',
      agency: 'NASA // USA',
      agencyClass: 'nasa',
      agencyBadge: '🇺🇸 NASA // USA',
      cameraDistance: 6.8,
      components: [
        {
          id: 'orion-docking',
          num: 1,
          name: 'NASA Docking System (NDS)',
          system: 'Mechanisms & Ingress',
          pos: [0, 2.05, 0],
          desc: 'Androgynous low-impact docking system featuring an 800 mm hatch and automated laser rangefinders, engineered for docking with Lunar Gateway and human lunar landers.',
          specs: [
            { label: 'Type', val: 'NASA Docking System (NDS)' },
            { label: 'Standard', val: 'IDSS Compliant' },
            { label: 'Passage', val: '800 mm Vestibule' },
            { label: 'Sensors', val: 'Optical & LiDAR Target Tracker' }
          ]
        },
        {
          id: 'orion-cm',
          num: 2,
          name: 'Pressurized Crew Module (CM)',
          system: 'Habitation & Avionics',
          pos: [0, 1.35, 0.45],
          desc: 'Double-walled aluminum-lithium habitable cabin engineered for 4 astronauts on missions lasting up to 21 days. Features glass cockpit touchscreen displays and radiation storm shelter.',
          specs: [
            { label: 'Crew Capacity', val: '4 Astronauts' },
            { label: 'Habitable Vol', val: '9.0 m³ (316 cu ft)' },
            { label: 'Atmosphere', val: '14.7 psi (Sea-Level N2/O2)' },
            { label: 'Structural Shell', val: 'Al-Li 2195 Alloy' }
          ]
        },
        {
          id: 'orion-windows',
          num: 3,
          name: 'Optical-Grade Viewports',
          system: 'Optics & Windows',
          pos: [0.35, 1.45, 0.75],
          desc: 'Three-layer redundant optical fused silica and aluminosilicate glass windows designed to survive micrometeoroid orbital debris and extreme thermal gradients.',
          specs: [
            { label: 'Glass Panes', val: '3-Layer Redundant' },
            { label: 'Material', val: 'Fused Silica Glass' },
            { label: 'Coating', val: 'Infrared & UV Reflective' },
            { label: 'Purpose', val: 'Docking & Earth View' }
          ]
        },
        {
          id: 'orion-rcs',
          num: 4,
          name: 'Reaction Control Thrusters (RCS)',
          system: 'Attitude Guidance',
          pos: [1.25, 0.75, 0.4],
          desc: '16 monopropellant thrusters (160 N each) strategically positioned around the capsule perimeter to provide 3-axis attitude control during deep space orientation and lunar re-entry.',
          specs: [
            { label: 'Thrusters', val: '16 Monopropellant Units' },
            { label: 'Thrust', val: '160 N (36 lbf) each' },
            { label: 'Propellant', val: 'Hydrazine (N2H4)' },
            { label: 'Control', val: 'Pitch, Roll & Yaw 3-Axis' }
          ]
        },
        {
          id: 'orion-heatshield',
          num: 5,
          name: 'Avcoat Ablative Heat Shield',
          system: 'Thermal Protection (TPS)',
          pos: [0, 0.48, 0],
          desc: 'World’s largest human spacecraft heat shield (5.0 m diameter). Molded Avcoat ablative composite engineered to withstand 2,800°C re-entry plasma at 40,000 km/h return velocity.',
          specs: [
            { label: 'Diameter', val: '5.0 meters (16.5 ft)' },
            { label: 'Max Temp', val: '2,800°C (5,000°F)' },
            { label: 'Re-entry Speed', val: '11.2 km/s (Lunar Return)' },
            { label: 'Material', val: 'Avcoat Composite Resin' }
          ]
        },
        {
          id: 'orion-esm',
          num: 6,
          name: 'European Service Module (ESM)',
          system: 'Power, ECLSS & Propulsion',
          pos: [0, -0.28, 0],
          desc: 'Built by Airbus Defence and Space for ESA. Houses life-support consumable tanks (water, oxygen, nitrogen), active fluid heat radiators, and electrical power generation.',
          specs: [
            { label: 'Prime Contractor', val: 'Airbus Defence & Space (ESA)' },
            { label: 'Fluids Mass', val: '8.6 tonnes consumables' },
            { label: 'Radiators', val: 'Dual Loop Freon Cooling' },
            { label: 'Length', val: '4.0 meters' }
          ]
        },
        {
          id: 'orion-solar',
          num: 7,
          name: 'X-Wing Solar Array Wings',
          system: 'Electrical Power Generation',
          pos: [2.5, -0.38, 0.5],
          desc: 'Four articulated solar wings spanning 19 meters tip-to-tip. Packed with 15,000 gallium arsenide triple-junction photovoltaic cells producing 11 kW of electrical power.',
          specs: [
            { label: 'Total Wingspan', val: '19.0 meters (62 ft)' },
            { label: 'Power Output', val: '11 kW at 1 AU' },
            { label: 'Cell Type', val: 'GaAs Triple-Junction PV' },
            { label: 'Articulated', val: 'Dual-Axis Tracking' }
          ]
        },
        {
          id: 'orion-engine',
          num: 8,
          name: 'Aerojet AJ10 OMS Main Engine',
          system: 'Main Orbital Propulsion',
          pos: [0, -1.25, 0],
          desc: 'High-reliability space-shuttle heritage Aerojet AJ10-190 bipropellant rocket engine providing 26.7 kN (6,000 lbf) of thrust for trans-lunar injection and lunar orbit insertion.',
          specs: [
            { label: 'Thrust', val: '26.7 kN (6,000 lbf)' },
            { label: 'Propellants', val: 'MMH / MON-3 Hypergolic' },
            { label: 'Specific Impulse', val: '316 seconds' },
            { label: 'Gimbal Range', val: '±6° Thrust Vector Control' }
          ]
        }
      ]
    },

    'crew-dragon': {
      id: 'crew-dragon',
      name: 'Crew Dragon (Dragon 2)',
      subtitle: 'SpaceX // Commercial Autonomous Orbital Crew Capsule',
      agency: 'SPACEX // USA',
      agencyClass: 'spacex',
      agencyBadge: '🚀 SPACEX // USA',
      cameraDistance: 6.6,
      components: [
        {
          id: 'dragon-nosecone',
          num: 1,
          name: 'Pivoting Nose Cone & Docking Port',
          system: 'Docking & Aerodynamics',
          pos: [0, 2.05, 0],
          desc: 'Aerodynamic fairing that rotates open on-orbit to expose the International Docking Adapter (IDA), dragon star trackers, and forward LiDAR laser navigation sensors.',
          specs: [
            { label: 'Mechanism', val: 'Motorized Hinge Fairing' },
            { label: 'Docking Ring', val: 'IDA / NDS Standard' },
            { label: 'Sensors', val: 'Argos Flash LiDAR + HD Cam' },
            { label: 'Operation', val: 'Fully Autonomous Approach' }
          ]
        },
        {
          id: 'dragon-cabin',
          num: 2,
          name: 'Pressurized Crew Cabin',
          system: 'Crew Quarters & Avionics',
          pos: [0, 1.25, 0.35],
          desc: 'Carbon composite crew cabin featuring 4 custom carbon-fiber racing seats, 3 touchscreen glass displays running Chromium, and high-efficiency emergency life support.',
          specs: [
            { label: 'Capacity', val: 'Up to 4 NASA Astronauts' },
            { label: 'Displays', val: '3x Ultra-bright Touchscreens' },
            { label: 'Volume', val: '9.3 m³ (328 cu ft)' },
            { label: 'Control OS', val: 'Custom Real-time Linux' }
          ]
        },
        {
          id: 'dragon-superdraco',
          num: 3,
          name: 'SuperDraco Launch Abort Engines',
          system: 'Launch Escape System',
          pos: [1.12, 0.78, 0.45],
          desc: '8 3D-printed Inconel rocket engines integrated in side nacelles. Can ignite in 100 milliseconds delivering 120,000 lbs of escape thrust from pad to orbit.',
          specs: [
            { label: 'Total Engines', val: '8 SuperDracos in 4 Pods' },
            { label: 'Total Thrust', val: '580 kN (130,000 lbf)' },
            { label: 'Fabrication', val: 'Direct Metal Laser Sintering' },
            { label: 'Response Time', val: '< 100 milliseconds' }
          ]
        },
        {
          id: 'dragon-draco',
          num: 4,
          name: 'Draco Orbital Attitude Thrusters',
          system: 'Attitude Guidance & Proximity Ops',
          pos: [0.65, 1.48, 0.55],
          desc: '16 Draco hypergolic engines generating 400 N each for precision orbital maneuvering, orbital altitude adjustments, and millimeter-accurate ISS docking proximity operations.',
          specs: [
            { label: 'Thrusters', val: '16 Hypergolic Dracos' },
            { label: 'Thrust', val: '400 N (90 lbf) each' },
            { label: 'Propellants', val: 'MMH & Dinitrogen Tetroxide' },
            { label: 'Pulse Rate', val: 'Millisecond Pulse Modulation' }
          ]
        },
        {
          id: 'dragon-heatshield',
          num: 5,
          name: 'PICA-X Reusable Heat Shield',
          system: 'Thermal Protection System',
          pos: [0, 0.32, 0],
          desc: 'Phenolic-Impregnated Carbon Ablator developed with NASA Ames. Designed to survive speeds exceeding 11 km/s with minimal ablation, enabling rapid capsule refurbishment and reuse.',
          specs: [
            { label: 'Material', val: 'PICA-X (v3 Polymer Ablator)' },
            { label: 'Reusability', val: 'Multi-flight Certified (5+ flights)' },
            { label: 'Diameter', val: '4.0 meters (13 ft)' },
            { label: 'Max Heat', val: '1,950°C Plasma Wave' }
          ]
        },
        {
          id: 'dragon-solar',
          num: 6,
          name: 'Conformal Curved Solar Array',
          system: 'Power Generation',
          pos: [0, -0.45, 0.85],
          desc: 'High-efficiency solar cells curved and laminated seamlessly directly onto half the cylindrical trunk surface, completely eliminating mechanical unfolding mechanisms.',
          specs: [
            { label: 'Integration', val: 'Half-Cylinder Body Wrap' },
            { label: 'Power Output', val: 'Up to 5.0 kW' },
            { label: 'Simplicity', val: 'Zero Moving Deployable Parts' },
            { label: 'Cooling', val: 'Integrated Thermal Radiators' }
          ]
        },
        {
          id: 'dragon-fins',
          num: 7,
          name: 'Aerodynamic Stabilizer Fins',
          system: 'Aerodynamic Trim & Stability',
          pos: [1.45, -0.62, 0],
          desc: 'Four symmetrical aerodynamic carbon-composite fins providing passive aerodynamic stabilization to keep the spacecraft facing forward during abort emergency escapes.',
          specs: [
            { label: 'Fin Count', val: '4 Fixed Aerodynamic Fins' },
            { label: 'Material', val: 'Carbon Fiber Composite' },
            { label: 'Function', val: 'Supersonic Passive Stabilization' },
            { label: 'Jettison', val: 'Discarded with Trunk at Re-entry' }
          ]
        },
        {
          id: 'dragon-trunk',
          num: 8,
          name: 'Unpressurized Cargo Trunk Bay',
          system: 'Payload & Thermal Control',
          pos: [0, -0.85, 0],
          desc: 'Cylindrical composite trunk providing 37 m³ of cargo volume for ISS battery swaps, science experiments, and external payloads before being discarded prior to atmospheric entry.',
          specs: [
            { label: 'Cargo Volume', val: '37 m³ (1,300 cu ft)' },
            { label: 'Height', val: '3.7 meters' },
            { label: 'Trunk Diameter', val: '4.0 meters' },
            { label: 'Status', val: 'Disposable Upper Ascent Structure' }
          ]
        }
      ]
    },

    gaganyaan: {
      id: 'gaganyaan',
      name: 'Gaganyaan Orbital Module',
      subtitle: 'ISRO // India’s Indigenous Human Spaceflight Programme',
      agency: 'ISRO // INDIA',
      agencyClass: 'isro',
      agencyBadge: '🇮🇳 ISRO // INDIA',
      cameraDistance: 6.5,
      components: [
        {
          id: 'gaganyaan-parachute',
          num: 1,
          name: 'Apex Parachute & Drogue Canister',
          system: 'Deceleration & Recovery',
          pos: [0, 2.05, 0],
          desc: 'Apex compartment housing 2 drogue parachutes and 3 massive main orange-and-white deceleration parachutes engineered by ADRDE Agra for ocean splashdown at 7 m/s.',
          specs: [
            { label: 'Developer', val: 'ADRDE (DRDO) & VSSC (ISRO)' },
            { label: 'Main Canopies', val: '3x Redundant Main Parachutes' },
            { label: 'Splashdown Speed', val: '~7.5 m/s into Sea' },
            { label: 'Deployment', val: 'Barometric / Pyrotechnic Mortar' }
          ]
        },
        {
          id: 'gaganyaan-cm',
          num: 2,
          name: 'Pressurized Crew Module (CM)',
          system: 'Cabin & Human Life Support',
          pos: [0, 1.25, 0.42],
          desc: 'Double-walled aluminum alloy habitable pressure cabin designed to support 3 Indian vyomanauts for up to 7 days in a 400 km low Earth orbit with 1 atm cabin pressure.',
          specs: [
            { label: 'Crew Capacity', val: '3 Indian Vyomanauts' },
            { label: 'Cabin Volume', val: '~8.0 m³ Habitable Space' },
            { label: 'Mission Orbit', val: '400 km Circular LEO' },
            { label: 'Life Support', val: 'ECLSS (CO2 Scrubbers + O2 Banks)' }
          ]
        },
        {
          id: 'gaganyaan-viewports',
          num: 3,
          name: 'Dual Optical Quartz Viewports',
          system: 'Observation & Windows',
          pos: [0.32, 1.35, 0.72],
          desc: 'Precision quartz glass viewport windows equipped with thermal reflective coatings, providing astronauts visual reference for manual attitude alignment and Earth monitoring.',
          specs: [
            { label: 'Material', val: 'Multi-layer Fused Quartz' },
            { label: 'Thermal Resistance', val: 'Up to 1,200°C' },
            { label: 'Count', val: '2 Forward Observation Viewports' },
            { label: 'Visual Field', val: 'Wide Orbital Panorama' }
          ]
        },
        {
          id: 'gaganyaan-livery',
          num: 4,
          name: 'Indian Tricolor & ISRO Insignia',
          system: 'National Spaceflight Markings',
          pos: [0, 0.78, 0.75],
          desc: 'Indian saffron, white, and green tricolor livery with bold ISRO emblem, marking India’s emergence as the 4th nation to indigenously launch humans into space.',
          specs: [
            { label: 'Programme', val: 'Human Spaceflight Programme (HSP)' },
            { label: 'Centre', val: 'Human Space Flight Centre (HSFC), Bengaluru' },
            { label: 'Launcher', val: 'Human-Rated LVM3 (HRLV)' },
            { label: 'Significance', val: 'National Flagship Mission' }
          ]
        },
        {
          id: 'gaganyaan-heatshield',
          num: 5,
          name: 'Carbon Phenolic Heat Shield',
          system: 'Thermal Protection System',
          pos: [0, 0.42, 0],
          desc: 'Indigenous carbon-phenolic ablative thermal shield developed by Vikram Sarabhai Space Centre (VSSC) to protect the crew from 2,000°C plasma during 7.8 km/s atmospheric entry.',
          specs: [
            { label: 'Developer', val: 'VSSC (Thiruvananthapuram)' },
            { label: 'Max Re-entry Heat', val: '2,000°C Ablative Plasma' },
            { label: 'Base Diameter', val: '3.5 meters' },
            { label: 'Ablator Formulation', val: 'Carbon Phenolic Resin Tiles' }
          ]
        },
        {
          id: 'gaganyaan-rcs',
          num: 6,
          name: 'Bi-Propellant Attitude RCS Thrusters',
          system: 'Attitude Guidance & Entry Control',
          pos: [1.02, 0.78, 0.4],
          desc: '12 bi-propellant reaction control thrusters (100 N each) firing monomethylhydrazine (MMH) and MON-3 for precise 3-axis orientation in orbit and re-entry attitude trim.',
          specs: [
            { label: 'Thrusters', val: '12 Bipropellant Blocks (100 N each)' },
            { label: 'Propellants', val: 'MMH / MON-3 Liquid Fuel' },
            { label: 'Control', val: 'Pitch, Yaw, Roll Re-entry Control' },
            { label: 'Redundancy', val: 'Dual Redundant Branch Plumbing' }
          ]
        },
        {
          id: 'gaganyaan-sm',
          num: 7,
          name: 'Service Module & Gold MLI Blanket',
          system: 'Fluids, Propulsion & Power',
          pos: [0, -0.35, 0],
          desc: 'Unpressurized cylindrical service module wrapped in golden aluminized Kapton multi-layer insulation (MLI) blankets, housing fuel tanks, high-pressure helium, and batteries.',
          specs: [
            { label: 'Structure', val: 'Unpressurized Cylindrical Module' },
            { label: 'Thermal Shield', val: 'Gold Kapton MLI Blankets' },
            { label: 'Propellant Mass', val: '~4.5 tonnes Liquid Propellant' },
            { label: 'Separation', val: 'Jettisoned prior to Re-entry' }
          ]
        },
        {
          id: 'gaganyaan-solar',
          num: 8,
          name: 'Deployable Solar Array Wings',
          system: 'Photovoltaic Electrical Power',
          pos: [2.5, -0.32, 0.3],
          desc: 'Two foldable solar wings with high-efficiency multi-junction photovoltaic cells that unfold in orbit, generating electrical power to charge onboard lithium-ion battery banks.',
          specs: [
            { label: 'Wings', val: '2 Articulated Deployable Wings' },
            { label: 'Cells', val: 'High-Efficiency Multi-junction PV' },
            { label: 'Power Output', val: '~3.5 kW in Sunlit Orbit' },
            { label: 'Battery Support', val: 'Li-Ion Space-Grade Battery Banks' }
          ]
        },
        {
          id: 'gaganyaan-lam',
          num: 9,
          name: 'Liquid Bi-Propellant LAM Engines',
          system: 'Main Orbital Propulsion',
          pos: [0, -1.22, 0],
          desc: 'Two 440 N Liquid Apogee Motor (LAM) heritage engines providing velocity adjustments for 400 km orbit circularization and the critical retro-fire deorbit burn for splashdown.',
          specs: [
            { label: 'Engines', val: '2x 440 N Bipropellant LAM Engines' },
            { label: 'Thrust', val: '880 N Combined Orbital Thrust' },
            { label: 'Mission Function', val: 'Orbit Insertion & Retro Deorbit Burn' },
            { label: 'Heritage', val: 'Chandrayaan & Mangalyaan Combat-Proven' }
          ]
        }
      ]
    }
  };

  // --- Viewer State ---
  let modalEl = null;
  let canvasEl = null;
  let labelsOverlayEl = null;
  let compListEl = null;
  let detailCardEl = null;

  let renderer = null;
  let scene = null;
  let camera = null;
  let craftGroup = null;
  let animFrameId = null;

  let currentCraftId = 'orion';
  let activeCompId = null;
  let isAutoRotating = true;
  let isWireframe = false;

  // Interaction State (Orbit rotation & Zoom)
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let targetRotY = 0;
  let targetRotX = 0.2;
  let currentRotY = 0;
  let currentRotX = 0.2;
  let targetDistance = 6.8;
  let currentDistance = 6.8;

  // Touch state
  let touchStartDist = 0;

  // Component Pin DOM References
  let pinElements = [];

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  function initViewer() {
    modalEl = document.getElementById('spacecraft3DModal');
    if (!modalEl) return;

    canvasEl = document.getElementById('craft3DCanvas');
    labelsOverlayEl = document.getElementById('craft3DLabelsOverlay');
    compListEl = document.getElementById('craft3DComponentsList');
    detailCardEl = document.getElementById('craft3DDetailCard');

    setupModalControls();
    setupCardTriggers();
  }

  function setupModalControls() {
    // Backdrop & Close Button
    const backdrop = document.getElementById('spacecraft3DBackdrop');
    const closeBtn = document.getElementById('btnCloseCraft3D');
    if (backdrop) backdrop.addEventListener('click', closeSpacecraft3DModal);
    if (closeBtn) closeBtn.addEventListener('click', closeSpacecraft3DModal);

    // Escape Key Handler
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.classList.contains('is-open')) {
        closeSpacecraft3DModal();
      }
    });

    // Spacecraft Switcher Tabs
    const switchBtns = modalEl.querySelectorAll('.craft3d-switch-btn');
    switchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const craftId = btn.getAttribute('data-craft');
        if (craftId && craftId !== currentCraftId) {
          switchSpacecraft(craftId);
        }
      });
    });

    // Viewport HUD Controls
    const btnRotate = document.getElementById('btnCraft3DRotate');
    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        isAutoRotating = !isAutoRotating;
        btnRotate.classList.toggle('is-active', isAutoRotating);
      });
    }

    const btnResetCam = document.getElementById('btnCraft3DResetCam');
    if (btnResetCam) {
      btnResetCam.addEventListener('click', () => {
        targetRotX = 0.2;
        targetRotY = 0;
        const craftData = SPACECRAFT_3D_DATA[currentCraftId];
        targetDistance = craftData ? craftData.cameraDistance : 6.8;
      });
    }

    const btnWireframe = document.getElementById('btnCraft3DWireframe');
    if (btnWireframe) {
      btnWireframe.addEventListener('click', () => {
        isWireframe = !isWireframe;
        btnWireframe.classList.toggle('is-active', isWireframe);
        applyWireframeMode(isWireframe);
      });
    }

    // Select For Mission Button inside Modal
    const btnSelect = document.getElementById('btnCraft3DSelectMission');
    if (btnSelect) {
      btnSelect.addEventListener('click', () => {
        closeSpacecraft3DModal();
        const card = document.querySelector(`.rocket-card[data-id="${currentCraftId}"] .btn-select-rocket`);
        if (card) card.click();
      });
    }

    // Orbit Drag Interaction on Viewport
    const viewportContainer = document.getElementById('craft3DViewportContainer');
    if (viewportContainer) {
      viewportContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotY += dx * 0.008;
        targetRotX += dy * 0.008;
        targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX));
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });

      // Scroll Zoom
      viewportContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        targetDistance += e.deltaY * 0.006;
        targetDistance = Math.max(3.8, Math.min(12.0, targetDistance));
      }, { passive: false });

      // Touch Events
      viewportContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          isDragging = true;
          prevMouseX = e.touches[0].clientX;
          prevMouseY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
          isDragging = false;
          touchStartDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
        }
      }, { passive: true });

      viewportContainer.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length === 1) {
          const dx = e.touches[0].clientX - prevMouseX;
          const dy = e.touches[0].clientY - prevMouseY;
          prevMouseX = e.touches[0].clientX;
          prevMouseY = e.touches[0].clientY;

          targetRotY += dx * 0.008;
          targetRotX += dy * 0.008;
          targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX));
        } else if (e.touches.length === 2) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          const diff = touchStartDist - dist;
          touchStartDist = dist;
          targetDistance += diff * 0.02;
          targetDistance = Math.max(3.8, Math.min(12.0, targetDistance));
        }
      }, { passive: true });

      viewportContainer.addEventListener('touchend', () => {
        isDragging = false;
      });
    }

    // Resize Observer
    window.addEventListener('resize', onResize);
  }

  // Hook Click triggers on Phase 2 Cards
  function setupCardTriggers() {
    const rocketCards = document.querySelectorAll('.rocket-card');
    rocketCards.forEach(card => {
      const craftId = card.getAttribute('data-id');
      if (!craftId) return;

      const visual = card.querySelector('.rocket-visual');
      if (visual) {
        visual.style.cursor = 'pointer';
        visual.setAttribute('title', 'Click to inspect 3D rotatable model with labeled components');

        // Add 3D Hint Tag if not present
        if (!visual.querySelector('.visual-3d-hint')) {
          const hint = document.createElement('div');
          hint.className = 'visual-3d-hint';
          hint.innerHTML = '<span class="hint-icon">🔄</span><span>Inspect in 3D</span>';
          visual.appendChild(hint);
        }

        visual.addEventListener('click', (e) => {
          e.stopPropagation();
          openSpacecraft3DModal(craftId);
        });
      }

      // Add a dedicated 3D button if desired
      const actionsContainer = card.querySelector('.card-actions-split') || card.querySelector('.btn-select-rocket')?.parentElement;
      if (actionsContainer && !card.querySelector('.btn-inspect-3d')) {
        const selectBtn = card.querySelector('.btn-select-rocket');
        if (selectBtn) {
          const splitWrap = document.createElement('div');
          splitWrap.className = 'card-actions-split';

          const btn3D = document.createElement('button');
          btn3D.className = 'btn-inspect-3d';
          btn3D.type = 'button';
          btn3D.title = 'Inspect 3D rotatable model';
          btn3D.innerHTML = '<span>🔄 3D Model</span>';
          btn3D.addEventListener('click', (e) => {
            e.stopPropagation();
            openSpacecraft3DModal(craftId);
          });

          selectBtn.parentNode.insertBefore(splitWrap, selectBtn);
          splitWrap.appendChild(btn3D);
          splitWrap.appendChild(selectBtn);
        }
      }
    });
  }

  // =========================================================================
  // MODAL OPEN / CLOSE / SWITCH LOGIC
  // =========================================================================
  window.openSpacecraft3DModal = function (craftId = 'orion') {
    if (!modalEl) modalEl = document.getElementById('spacecraft3DModal');
    if (!modalEl) return;

    currentCraftId = craftId in SPACECRAFT_3D_DATA ? craftId : 'orion';
    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');

    initThreeScene();
    loadSpacecraftModel(currentCraftId);
    updateModalHeader(currentCraftId);
    buildComponentsList(currentCraftId);

    // Audio confirmation if available
    if (window.audio && window.audio.playBeep) {
      window.audio.playBeep(920, 0.05);
    }
  };

  function closeSpacecraft3DModal() {
    if (!modalEl) return;
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');

    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }

    if (window.audio && window.audio.playBeep) {
      window.audio.playBeep(650, 0.04);
    }
  }

  function switchSpacecraft(craftId) {
    currentCraftId = craftId;
    updateModalHeader(craftId);
    loadSpacecraftModel(craftId);
    buildComponentsList(craftId);

    // Reset rotation & camera distance
    targetRotX = 0.2;
    targetRotY = 0;
    const craftData = SPACECRAFT_3D_DATA[craftId];
    targetDistance = craftData ? craftData.cameraDistance : 6.8;

    if (window.audio && window.audio.playBeep) {
      window.audio.playBeep(1100, 0.04);
    }
  }

  function updateModalHeader(craftId) {
    const data = SPACECRAFT_3D_DATA[craftId];
    if (!data) return;

    const titleEl = document.getElementById('craft3DTitle');
    const subEl = document.getElementById('craft3DSubtitle');
    const badgeEl = document.getElementById('craft3DAgencyBadge');
    const footerStatus = document.getElementById('craft3DFooterStatus');

    if (titleEl) titleEl.textContent = data.name;
    if (subEl) subEl.textContent = data.subtitle;
    if (badgeEl) {
      badgeEl.textContent = data.agencyBadge;
      badgeEl.className = `agency-badge ${data.agencyClass}`;
    }
    if (footerStatus) {
      footerStatus.textContent = `All telemetry verified with ${data.agency} human spaceflight programmes.`;
    }

    // Update active state in switcher tabs
    const switchBtns = modalEl.querySelectorAll('.craft3d-switch-btn');
    switchBtns.forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-craft') === craftId);
    });
  }

  // =========================================================================
  // THREE.JS 3D SCENE & ENGINE
  // =========================================================================
  function initThreeScene() {
    if (renderer) {
      onResize();
      if (!animFrameId) animFrameId = requestAnimationFrame(renderLoop);
      return;
    }

    const container = document.getElementById('craft3DViewportContainer');
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, targetDistance);

    renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    sunLight.position.set(6, 10, 8);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x1e3a8a, 0.8);
    fillLight.position.set(0, -8, 4);
    scene.add(fillLight);

    // Deep space subtle dust particle stars
    buildSpaceBackdrop();

    // Craft root group
    craftGroup = new THREE.Group();
    scene.add(craftGroup);

    animFrameId = requestAnimationFrame(renderLoop);
  }

  function buildSpaceBackdrop() {
    const starCount = 350;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const c = new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.6, 0.7 + Math.random() * 0.3);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.5
    });

    const stars = new THREE.Points(geom, mat);
    scene.add(stars);
  }

  // =========================================================================
  // 3D PROCEDURAL SPACECRAFT MODEL BUILDERS
  // =========================================================================
  function loadSpacecraftModel(craftId) {
    if (!craftGroup) return;

    // Clear previous children
    while (craftGroup.children.length > 0) {
      const child = craftGroup.children[0];
      craftGroup.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    }

    if (craftId === 'orion') {
      buildOrion3DModel();
    } else if (craftId === 'crew-dragon') {
      buildCrewDragon3DModel();
    } else if (craftId === 'gaganyaan') {
      buildGaganyaan3DModel();
    }

    applyWireframeMode(isWireframe);
  }

  // 1. NASA ORION MPCV
  function buildOrion3DModel() {
    const g = new THREE.Group();

    // Standard materials
    const whiteCapsuleMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.35, roughness: 0.25 });
    const esmMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.45, roughness: 0.35 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.2, roughness: 0.9 });
    const dockingMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.3 });
    const solarMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2, emissive: 0x1e3a8a, emissiveIntensity: 0.5 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 });
    const windowMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8, roughness: 0.1, emissive: 0x0369a1, emissiveIntensity: 0.3 });
    const engineMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.2 });

    // Command Module (Crew Capsule)
    const cmGeom = new THREE.CylinderGeometry(0.55, 1.48, 1.25, 36);
    const cmMesh = new THREE.Mesh(cmGeom, whiteCapsuleMat);
    cmMesh.position.y = 1.15;
    g.add(cmMesh);

    // Docking Port (NDS Apex)
    const dockGeom = new THREE.CylinderGeometry(0.42, 0.48, 0.35, 32);
    const dockMesh = new THREE.Mesh(dockGeom, dockingMat);
    dockMesh.position.y = 1.95;
    g.add(dockMesh);

    const dockRing = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.05, 16, 32), goldMat);
    dockRing.rotation.x = Math.PI / 2;
    dockRing.position.y = 2.12;
    g.add(dockRing);

    // Forward Windows
    [-0.32, 0.32].forEach(x => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.1), windowMat);
      win.position.set(x, 1.42, 0.85);
      win.rotation.x = -0.38;
      win.rotation.y = x > 0 ? -0.15 : 0.15;
      g.add(win);
    });

    // Avcoat Heat Shield Base
    const hsGeom = new THREE.CylinderGeometry(1.5, 1.45, 0.22, 36);
    const hsMesh = new THREE.Mesh(hsGeom, darkMat);
    hsMesh.position.y = 0.45;
    g.add(hsMesh);

    // European Service Module (ESM) Body
    const esmGeom = new THREE.CylinderGeometry(1.36, 1.36, 1.15, 36);
    const esmMesh = new THREE.Mesh(esmGeom, esmMat);
    esmMesh.position.y = -0.25;
    g.add(esmMesh);

    // ESM Radiator Bands
    [-0.05, -0.3, -0.55].forEach(y => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.37, 0.02, 8, 36), darkMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      g.add(ring);
    });

    // 4 X-Wing Solar Arrays
    const wingAngles = [-32 * Math.PI / 180, 32 * Math.PI / 180, -148 * Math.PI / 180, 148 * Math.PI / 180];
    wingAngles.forEach(ang => {
      const wingPivot = new THREE.Group();
      wingPivot.position.set(0, -0.3, 0);
      wingPivot.rotation.z = ang;

      // Solar wing panel (3 sub-panels)
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.38, 0.04), solarMat);
      panel.position.set(2.1, 0, 0);
      wingPivot.add(panel);

      // Gold connecting truss
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.3, 8), goldMat);
      strut.rotation.z = Math.PI / 2;
      strut.position.set(0.65, 0, 0);
      wingPivot.add(strut);

      g.add(wingPivot);
    });

    // AJ10 OMS Main Rocket Engine
    const nozzleGeom = new THREE.CylinderGeometry(0.18, 0.48, 0.65, 32, 1, true);
    const nozzle = new THREE.Mesh(nozzleGeom, engineMat);
    nozzle.position.y = -1.15;
    g.add(nozzle);

    // Engine Thrust Glow
    const glowGeom = new THREE.ConeGeometry(0.38, 0.8, 16);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
    const glow = new THREE.Mesh(glowGeom, glowMat);
    glow.position.y = -1.55;
    glow.rotation.x = Math.PI;
    g.add(glow);

    // RCS Thruster Blocks around Capsule Base
    for (let i = 0; i < 4; i++) {
      const thAng = (i * Math.PI / 2) + Math.PI / 4;
      const thPod = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), darkMat);
      thPod.position.set(Math.cos(thAng) * 1.35, 0.75, Math.sin(thAng) * 1.35);
      g.add(thPod);
    }

    craftGroup.add(g);
  }

  // 2. SPACEX CREW DRAGON
  function buildCrewDragon3DModel() {
    const g = new THREE.Group();

    const glossWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.25, roughness: 0.2 });
    const darkComposite = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7, roughness: 0.3 });
    const solarWrap = new THREE.MeshStandardMaterial({ color: 0x0a0f1d, metalness: 0.85, roughness: 0.18, emissive: 0x0284c7, emissiveIntensity: 0.35 });
    const picaX = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.1, roughness: 0.95 });
    const windowMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8, roughness: 0.1, emissive: 0x0369a1, emissiveIntensity: 0.3 });

    // Aerodynamic Capsule Teardrop Body
    const capsuleGeom = new THREE.CylinderGeometry(0.48, 1.38, 1.45, 36);
    const capsule = new THREE.Mesh(capsuleGeom, glossWhite);
    capsule.position.y = 1.1;
    g.add(capsule);

    // Nose Cone Apex
    const noseGeom = new THREE.SphereGeometry(0.48, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4);
    const nose = new THREE.Mesh(noseGeom, glossWhite);
    nose.position.y = 1.82;
    g.add(nose);

    // IDA Docking Line
    const dockSeam = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.02, 8, 32), darkComposite);
    dockSeam.rotation.x = Math.PI / 2;
    dockSeam.position.y = 1.83;
    g.add(dockSeam);

    // 4 SuperDraco Engine Nacelles
    const nacelleAngles = [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75];
    nacelleAngles.forEach(ang => {
      const pod = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.42, 0.24), darkComposite);
      pod.position.set(Math.cos(ang) * 1.15, 0.82, Math.sin(ang) * 1.15);
      pod.rotation.y = -ang;
      g.add(pod);

      // Twin Exhaust Nozzle Dials
      [-0.06, 0.06].forEach(dy => {
        const noz = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.08, 8), picaX);
        noz.position.set(Math.cos(ang) * 1.24, 0.75 + dy, Math.sin(ang) * 1.24);
        g.add(noz);
      });
    });

    // Windows
    [-0.32, 0.32].forEach(x => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.08), windowMat);
      win.position.set(x, 1.38, 0.82);
      win.rotation.x = -0.32;
      win.rotation.y = x > 0 ? -0.18 : 0.18;
      g.add(win);
    });

    // PICA-X Heat Shield
    const hsMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.39, 1.34, 0.16, 36), picaX);
    hsMesh.position.y = 0.32;
    g.add(hsMesh);

    // Cylindrical Trunk Body
    const trunkGeom = new THREE.CylinderGeometry(1.32, 1.32, 1.35, 36);
    const trunk = new THREE.Mesh(trunkGeom, glossWhite);
    trunk.position.y = -0.45;
    g.add(trunk);

    // Solar Panel Half-Shell Wrapping 180° around Trunk
    const solarGeom = new THREE.CylinderGeometry(1.33, 1.33, 1.25, 36, 1, false, 0, Math.PI);
    const solarHalf = new THREE.Mesh(solarGeom, solarWrap);
    solarHalf.position.y = -0.45;
    solarHalf.rotation.y = -Math.PI / 2;
    g.add(solarHalf);

    // 4 Symmetrical Aerodynamic Stabilizer Fins
    const finAngles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
    finAngles.forEach(ang => {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.9, 0.45), glossWhite);
      fin.position.set(Math.cos(ang) * 1.48, -0.65, Math.sin(ang) * 1.48);
      fin.rotation.y = -ang + Math.PI / 2;
      g.add(fin);
    });

    craftGroup.add(g);
  }

  // 3. ISRO GAGANYAAN ORBITAL MODULE
  function buildGaganyaan3DModel() {
    const g = new THREE.Group();

    const whiteCapsuleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.3 });
    const tricolorSaffron = new THREE.MeshStandardMaterial({ color: 0xff9933, roughness: 0.4 });
    const tricolorWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const tricolorGreen = new THREE.MeshStandardMaterial({ color: 0x138808, roughness: 0.4 });
    const goldMliMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.88, roughness: 0.28, emissive: 0x78350f, emissiveIntensity: 0.2 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.9 });
    const isroSolarMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.9, roughness: 0.2, emissive: 0x1d4ed8, emissiveIntensity: 0.4 });
    const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, metalness: 0.8, roughness: 0.25 });
    const windowMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8, roughness: 0.1, emissive: 0x0369a1, emissiveIntensity: 0.3 });

    // Crew Module (CM) Conical Shape
    const cmGeom = new THREE.CylinderGeometry(0.5, 1.42, 1.35, 36);
    const cm = new THREE.Mesh(cmGeom, whiteCapsuleMat);
    cm.position.y = 1.15;
    g.add(cm);

    // Apex Parachute Compartment
    const chuteGeom = new THREE.CylinderGeometry(0.38, 0.48, 0.38, 32);
    const chute = new THREE.Mesh(chuteGeom, new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.5 }));
    chute.position.y = 1.95;
    g.add(chute);

    // Indian Tricolor Bands encircling Capsule
    const safRing = new THREE.Mesh(new THREE.CylinderGeometry(1.22, 1.25, 0.05, 36), tricolorSaffron);
    safRing.position.y = 0.74;
    g.add(safRing);

    const whtRing = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.28, 0.05, 36), tricolorWhite);
    whtRing.position.y = 0.69;
    g.add(whtRing);

    const grnRing = new THREE.Mesh(new THREE.CylinderGeometry(1.28, 1.31, 0.05, 36), tricolorGreen);
    grnRing.position.y = 0.64;
    g.add(grnRing);

    // Dual Viewports
    [-0.3, 0.3].forEach(x => {
      const win = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16), windowMat);
      win.rotation.x = Math.PI / 2 - 0.35;
      win.position.set(x, 1.35, 0.78);
      g.add(win);
    });

    // Carbon Phenolic Heat Shield Base
    const hs = new THREE.Mesh(new THREE.CylinderGeometry(1.44, 1.38, 0.18, 36), darkMat);
    hs.position.y = 0.42;
    g.add(hs);

    // Service Module (SM) wrapped in Gold MLI Blankets
    const smGeom = new THREE.CylinderGeometry(1.3, 1.3, 1.3, 36);
    const sm = new THREE.Mesh(smGeom, goldMliMat);
    sm.position.y = -0.35;
    g.add(sm);

    // 2 Deployable Solar Array Wings (Left & Right)
    [-1, 1].forEach(side => {
      const wingGroup = new THREE.Group();
      wingGroup.position.set(side * 1.35, -0.32, 0);

      // Support truss
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), darkMat);
      strut.rotation.z = Math.PI / 2;
      strut.position.x = side * 0.4;
      wingGroup.add(strut);

      // Solar Panel
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 0.04), isroSolarMat);
      panel.position.x = side * 1.45;
      wingGroup.add(panel);

      g.add(wingGroup);
    });

    // Twin 440N Liquid LAM Engines
    [-0.35, 0.35].forEach(x => {
      const eng = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.28, 0.45, 24, 1, true), nozzleMat);
      eng.position.set(x, -1.18, 0);
      g.add(eng);

      // Orange thrust glow
      const glow = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.6, 16), new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.7 }));
      glow.position.set(x, -1.48, 0);
      glow.rotation.x = Math.PI;
      g.add(glow);
    });

    // 12 RCS Thruster Nozzles around perimeter
    for (let i = 0; i < 4; i++) {
      const ang = i * Math.PI / 2;
      const pod = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), darkMat);
      pod.position.set(Math.cos(ang) * 1.32, 0.78, Math.sin(ang) * 1.32);
      g.add(pod);
    }

    craftGroup.add(g);
  }

  // =========================================================================
  // WIREFRAME TOGGLE
  // =========================================================================
  function applyWireframeMode(enabled) {
    if (!craftGroup) return;
    craftGroup.traverse(child => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.wireframe = enabled);
        } else {
          child.material.wireframe = enabled;
        }
      }
    });
  }

  // =========================================================================
  // COMPONENTS LIST & LABELS OVERLAY
  // =========================================================================
  function buildComponentsList(craftId) {
    const data = SPACECRAFT_3D_DATA[craftId];
    if (!data) return;

    if (!compListEl) compListEl = document.getElementById('craft3DComponentsList');
    if (!labelsOverlayEl) labelsOverlayEl = document.getElementById('craft3DLabelsOverlay');

    compListEl.innerHTML = '';
    labelsOverlayEl.innerHTML = '';
    pinElements = [];

    data.components.forEach((comp, idx) => {
      // 1. Sidebar List Item
      const item = document.createElement('div');
      item.className = `craft3d-comp-item ${idx === 0 ? 'is-active' : ''}`;
      item.setAttribute('data-id', comp.id);

      item.innerHTML = `
        <span class="comp-item-num">${comp.num}</span>
        <div class="comp-item-text">
          <span class="comp-item-name">${comp.name}</span>
          <span class="comp-item-sub">${comp.system}</span>
        </div>
      `;

      item.addEventListener('click', () => {
        selectActiveComponent(comp.id);
      });

      compListEl.appendChild(item);

      // 2. 3D Floating Pin Element
      const pin = document.createElement('div');
      pin.className = `craft3d-pin ${idx === 0 ? 'is-active' : ''}`;
      pin.setAttribute('data-id', comp.id);

      pin.innerHTML = `
        <div class="pin-marker">
          <span class="pin-num">${comp.num}</span>
          <span class="pin-pulse"></span>
        </div>
        <div class="pin-card">
          <span class="pin-system">${comp.system}</span>
          <span class="pin-title">${comp.name}</span>
        </div>
      `;

      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        selectActiveComponent(comp.id);
      });

      labelsOverlayEl.appendChild(pin);

      pinElements.push({
        comp: comp,
        el: pin,
        pos3D: new THREE.Vector3(comp.pos[0], comp.pos[1], comp.pos[2])
      });
    });

    // Default select first component
    if (data.components.length > 0) {
      selectActiveComponent(data.components[0].id);
    }
  }

  function selectActiveComponent(compId) {
    activeCompId = compId;
    const data = SPACECRAFT_3D_DATA[currentCraftId];
    if (!data) return;

    const comp = data.components.find(c => c.id === compId);
    if (!comp) return;

    // Update active class in sidebar items
    const allItems = compListEl.querySelectorAll('.craft3d-comp-item');
    allItems.forEach(it => {
      it.classList.toggle('is-active', it.getAttribute('data-id') === compId);
    });

    // Update active class in 3D pins
    pinElements.forEach(p => {
      p.el.classList.toggle('is-active', p.comp.id === compId);
    });

    // Update Detail Card
    const idxEl = document.getElementById('craft3DDetailIndex');
    const nameEl = document.getElementById('craft3DDetailName');
    const descEl = document.getElementById('craft3DDetailDesc');
    const specsEl = document.getElementById('craft3DDetailSpecs');

    if (idxEl) idxEl.textContent = `SUBSYSTEM 0${comp.num} // ${comp.system.toUpperCase()}`;
    if (nameEl) nameEl.textContent = comp.name;
    if (descEl) descEl.textContent = comp.desc;

    if (specsEl) {
      specsEl.innerHTML = comp.specs.map(s => `
        <div class="detail-spec-cell">
          <span class="detail-spec-lbl">${s.label}</span>
          <span class="detail-spec-val">${s.val}</span>
        </div>
      `).join('');
    }

    // Smoothly rotate craft so component faces the camera
    const compPos = new THREE.Vector3(comp.pos[0], comp.pos[1], comp.pos[2]);
    const ang = Math.atan2(compPos.x, compPos.z);
    targetRotY = -ang;

    if (window.audio && window.audio.playBeep) {
      window.audio.playBeep(1250, 0.03);
    }
  }

  // =========================================================================
  // ANIMATION & RENDER LOOP
  // =========================================================================
  function renderLoop() {
    animFrameId = requestAnimationFrame(renderLoop);

    if (!renderer || !scene || !camera || !craftGroup) return;

    // Auto-rotation when idle
    if (isAutoRotating && !isDragging) {
      targetRotY += 0.0035;
    }

    // Smooth interpolation (damping)
    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;
    currentDistance += (targetDistance - currentDistance) * 0.08;

    craftGroup.rotation.x = currentRotX;
    craftGroup.rotation.y = currentRotY;
    camera.position.z = currentDistance;

    // Render 3D Scene
    renderer.render(scene, camera);

    // Update 3D Pinned Labels Position
    updatePinPositions();
  }

  function updatePinPositions() {
    if (!renderer || !camera || !craftGroup || pinElements.length === 0) return;

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    pinElements.forEach(pinObj => {
      // World position of the component
      const worldPos = pinObj.pos3D.clone();
      worldPos.applyMatrix4(craftGroup.matrixWorld);

      // Project 3D vector to 2D NDC
      const screenPos = worldPos.clone().project(camera);

      // Check if behind camera
      if (screenPos.z < 1) {
        const x = ((screenPos.x + 1) * width) / 2;
        const y = ((-screenPos.y + 1) * height) / 2;

        pinObj.el.style.transform = `translate(${x}px, ${y}px)`;
        pinObj.el.style.display = 'flex';

        // Check surface normal dot product with camera direction (fade if on back side)
        const localNorm = pinObj.pos3D.clone().normalize();
        const worldNorm = localNorm.applyQuaternion(craftGroup.quaternion);
        const facing = worldNorm.dot(new THREE.Vector3(0, 0, 1));

        if (pinObj.comp.id === activeCompId) {
          pinObj.el.style.opacity = '1';
          pinObj.el.style.zIndex = '10';
        } else if (facing > -0.15) {
          pinObj.el.style.opacity = '0.9';
          pinObj.el.style.zIndex = '5';
        } else {
          pinObj.el.style.opacity = '0.22';
          pinObj.el.style.zIndex = '2';
        }
      } else {
        pinObj.el.style.display = 'none';
      }
    });
  }

  function onResize() {
    if (!renderer || !camera) return;
    const container = document.getElementById('craft3DViewportContainer');
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initViewer);
  } else {
    initViewer();
  }

  // Also expose trigger hook for dynamic rocket card re-renders
  window.initSpacecraftViewerTriggers = setupCardTriggers;

})();
