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
  "orion": {
    "id": "orion",
    "name": "Orion MPCV",
    "subtitle": "NASA // Built to Carry Astronauts to the Moon",
    "agency": "NASA // USA",
    "agencyClass": "nasa",
    "agencyBadge": "NASA // USA",
    "cameraDistance": 6.8,
    "components": [
      {
        "id": "orion-docking",
        "num": 1,
        "name": "Space Docking Hatch (Air-Lock)",
        "system": "Docking Door & Guidance",
        "pos": [
          0,
          2.05,
          0
        ],
        "desc": "The spaceship’s front door! It uses automatic lasers and cameras to gently connect with space stations and lunar landers so astronauts can float inside safely.",
        "specs": [
          {
            "label": "Role",
            "val": "Connects to Lunar Stations"
          },
          {
            "label": "Guidance",
            "val": "Laser & Camera Auto-Docking"
          },
          {
            "label": "Passage",
            "val": "80 cm Astronaut Tunnel"
          },
          {
            "label": "Standard",
            "val": "International Space Docking"
          }
        ]
      },
      {
        "id": "orion-cm",
        "num": 2,
        "name": "Astronaut Cabin (Crew Module)",
        "system": "Living Space & Controls",
        "pos": [
          0,
          1.35,
          0.45
        ],
        "desc": "The cozy home for 4 astronauts during their trip to the Moon! It provides fresh air to breathe, comfy seats, touchscreens to fly, and a shelter to protect against solar radiation.",
        "specs": [
          {
            "label": "Crew Capacity",
            "val": "4 Astronauts"
          },
          {
            "label": "Air Supply",
            "val": "Earth-like Oxygen & Nitrogen"
          },
          {
            "label": "Mission Length",
            "val": "Up to 21 Days in Deep Space"
          },
          {
            "label": "Cabin Hull",
            "val": "Lightweight Aluminum-Lithium Metal"
          }
        ]
      },
      {
        "id": "orion-windows",
        "num": 3,
        "name": "Deep Space Viewports",
        "system": "High-Strength Windows",
        "pos": [
          0.35,
          1.45,
          0.75
        ],
        "desc": "Thick 3-layer bulletproof glass windows that give astronauts breathtaking views of Earth and the Moon while blocking harmful UV radiation and tiny space pebbles.",
        "specs": [
          {
            "label": "Glass Panes",
            "val": "3 Protective Layers"
          },
          {
            "label": "Protection",
            "val": "Blocks UV Rays & Space Dust"
          },
          {
            "label": "View",
            "val": "Panoramic Earth & Moon Views"
          },
          {
            "label": "Material",
            "val": "Fused Silica Quartz Glass"
          }
        ]
      },
      {
        "id": "orion-rcs",
        "num": 4,
        "name": "Steering Thrusters (RCS)",
        "system": "Direction & Turn Jets",
        "pos": [
          1.25,
          0.75,
          0.4
        ],
        "desc": "16 small rocket jets placed around the capsule. Firing quick puffs of gas lets astronauts steer, turn, and point the spaceship in any direction in zero gravity.",
        "specs": [
          {
            "label": "Thrusters",
            "val": "16 Mini Rocket Jets"
          },
          {
            "label": "Function",
            "val": "Steer Up, Down, Left & Right"
          },
          {
            "label": "Steering",
            "val": "Full 3-Axis Direction Control"
          },
          {
            "label": "Speed",
            "val": "Instant Millisecond Puffs"
          }
        ]
      },
      {
        "id": "orion-heatshield",
        "num": 5,
        "name": "Lunar Heat Shield",
        "system": "Thermal Re-entry Shield",
        "pos": [
          0,
          0.48,
          0
        ],
        "desc": "The giant protective bottom of the spacecraft! When returning from the Moon at 40,000 km/h, friction with air heats up to 2,800°C. This shield melts away slowly to keep the astronauts safe and cool inside.",
        "specs": [
          {
            "label": "Shield Width",
            "val": "5.0 meters across (Giant!)"
          },
          {
            "label": "Max Heat",
            "val": "Withstands 2,800°C (hotter than lava!)"
          },
          {
            "label": "Return Speed",
            "val": "40,000 km/h from the Moon"
          },
          {
            "label": "Material",
            "val": "Molded Avcoat Heat Shield"
          }
        ]
      },
      {
        "id": "orion-esm",
        "num": 6,
        "name": "Service Module (Power & Life Support)",
        "system": "Engine Room & Supplies",
        "pos": [
          0,
          -0.28,
          0
        ],
        "desc": "Built by European engineers, this is the spaceship’s engine room! It stores tanks of fresh drinking water, clean oxygen, and radiators to keep the cabin comfortable.",
        "specs": [
          {
            "label": "Builder",
            "val": "European Space Agency (ESA)"
          },
          {
            "label": "Supplies",
            "val": "Water, Oxygen & Power Tanks"
          },
          {
            "label": "Cooling",
            "val": "Space Radiators for Cabin Temperature"
          },
          {
            "label": "Length",
            "val": "4.0 meters"
          }
        ]
      },
      {
        "id": "orion-solar",
        "num": 7,
        "name": "X-Wing Solar Wings",
        "system": "Solar Energy Power",
        "pos": [
          2.5,
          -0.38,
          0.5
        ],
        "desc": "Four giant solar wings that fold out like an X! Packed with 15,000 solar cells, they track the Sun to generate clean electricity for all the ship’s computers and lights.",
        "specs": [
          {
            "label": "Wingspan",
            "val": "19 meters across (as wide as a house!)"
          },
          {
            "label": "Power Output",
            "val": "11,000 Watts of Solar Energy"
          },
          {
            "label": "Tracking",
            "val": "Automatically turns to face the Sun"
          },
          {
            "label": "Solar Cells",
            "val": "Advanced Space Solar Panels"
          }
        ]
      },
      {
        "id": "orion-engine",
        "num": 8,
        "name": "Main Rocket Engine",
        "system": "Deep Space Engine",
        "pos": [
          0,
          -1.25,
          0
        ],
        "desc": "The big rocket engine at the back! It fires powerful bursts to push Orion out of Earth’s gravity, fly toward the Moon, and brake into lunar orbit.",
        "specs": [
          {
            "label": "Power",
            "val": "Strong enough to lift 6 cars!"
          },
          {
            "label": "Mission Role",
            "val": "Flies the Ship to the Moon & Back"
          },
          {
            "label": "Heritage",
            "val": "Proven Space Shuttle Rocket Engine"
          },
          {
            "label": "Steering",
            "val": "Swivels to steer the spacecraft"
          }
        ]
      }
    ]
  },
  "crew-dragon": {
    "id": "crew-dragon",
    "name": "Crew Dragon (Dragon 2)",
    "subtitle": "SpaceX // Commercial Autonomous Astronaut Capsule",
    "agency": "SPACEX // USA",
    "agencyClass": "spacex",
    "agencyBadge": "SPACEX // USA",
    "cameraDistance": 6.6,
    "components": [
      {
        "id": "dragon-nosecone",
        "num": 1,
        "name": "Pivoting Nose Cone & Docking Door",
        "system": "Aerodynamic Cap & Air-Lock",
        "pos": [
          0,
          2.05,
          0
        ],
        "desc": "A protective nose cone that opens up like a helmet visor once in space! Inside is the docking ring and laser cameras that allow Crew Dragon to park itself at the International Space Station.",
        "specs": [
          {
            "label": "Nose Cap",
            "val": "Opens smoothly like a visor in space"
          },
          {
            "label": "Docking",
            "val": "Fits the International Space Station"
          },
          {
            "label": "Sensors",
            "val": "Laser cameras that measure distance"
          },
          {
            "label": "Piloting",
            "val": "Autonomous (computer parks itself!)"
          }
        ]
      },
      {
        "id": "dragon-cabin",
        "num": 2,
        "name": "Astronaut Touchscreen Cabin",
        "system": "Living Quarters & Touchscreen Controls",
        "pos": [
          0,
          1.25,
          0.35
        ],
        "desc": "A futuristic spaceship cabin with 4 custom carbon-fiber seats and 3 giant touchscreens! Astronauts wear slim spacesuits and tap the screens just like a tablet.",
        "specs": [
          {
            "label": "Crew Capacity",
            "val": "Up to 4 Astronauts"
          },
          {
            "label": "Controls",
            "val": "3 Big HD Touchscreens"
          },
          {
            "label": "Seats",
            "val": "Custom Sporty Carbon-Fiber Seats"
          },
          {
            "label": "Life Support",
            "val": "Automatic Clean Air & Climate Control"
          }
        ]
      },
      {
        "id": "dragon-superdraco",
        "num": 3,
        "name": "SuperDraco Emergency Escape Engines",
        "system": "Astronaut Safety Eject System",
        "pos": [
          1.12,
          0.78,
          0.45
        ],
        "desc": "8 super-fast 3D-printed rocket engines built into the sides. If something goes wrong during launch, they fire in just 0.1 seconds to carry the astronaut capsule miles away to safety!",
        "specs": [
          {
            "label": "Engines",
            "val": "8 3D-Printed Escape Engines"
          },
          {
            "label": "Reaction Time",
            "val": "Instant firing in 0.1 seconds!"
          },
          {
            "label": "Safety Role",
            "val": "Pulls astronauts away from danger"
          },
          {
            "label": "Speed",
            "val": "Blasts capsule to 100 km/h in 1.2 sec"
          }
        ]
      },
      {
        "id": "dragon-draco",
        "num": 4,
        "name": "Draco Maneuvering Thrusters",
        "system": "Space Steering Jets",
        "pos": [
          0.65,
          1.48,
          0.55
        ],
        "desc": "16 small thrusters that fire tiny puffs to turn the capsule in space and guide it with millimeter accuracy when docking to the Space Station.",
        "specs": [
          {
            "label": "Thrusters",
            "val": "16 Precision Steering Thrusters"
          },
          {
            "label": "Accuracy",
            "val": "Millimeter-precise Space Parking"
          },
          {
            "label": "Movement",
            "val": "Allows moving forward, backward & spinning"
          },
          {
            "label": "Response",
            "val": "Fires pulses lasting tiny milliseconds"
          }
        ]
      },
      {
        "id": "dragon-heatshield",
        "num": 5,
        "name": "PICA-X Reusable Heat Shield",
        "system": "Thermal Plasma Shield",
        "pos": [
          0,
          0.32,
          0
        ],
        "desc": "A state-of-the-art heat shield made with NASA technology. It protects the capsule from 1,950°C glowing plasma when returning through Earth’s atmosphere, and can fly to space again and again!",
        "specs": [
          {
            "label": "Material",
            "val": "NASA-developed PICA-X Material"
          },
          {
            "label": "Reusability",
            "val": "Can fly to space 5 or more times!"
          },
          {
            "label": "Heat Resistance",
            "val": "Survives 1,950°C glowing heat"
          },
          {
            "label": "Diameter",
            "val": "4.0 meters wide"
          }
        ]
      },
      {
        "id": "dragon-solar",
        "num": 6,
        "name": "Curved Body Solar Panels",
        "system": "Sun Power Generators",
        "pos": [
          0,
          -0.45,
          0.85
        ],
        "desc": "Instead of folding wings, Crew Dragon has flexible solar panels wrapped directly around its body cylinder! This clever design means no moving parts that could break.",
        "specs": [
          {
            "label": "Design",
            "val": "Smooth body-wrapped solar panels"
          },
          {
            "label": "Moving Parts",
            "val": "Zero moving parts to jam!"
          },
          {
            "label": "Electricity",
            "val": "Powers cabin displays & life support"
          },
          {
            "label": "Cooling",
            "val": "Built-in heat radiators on backside"
          }
        ]
      },
      {
        "id": "dragon-fins",
        "num": 7,
        "name": "Aerodynamic Stabilizer Fins",
        "system": "Flight Balance Fins",
        "pos": [
          1.45,
          -0.62,
          0
        ],
        "desc": "Four sturdy aerodynamic fins on the trunk. If an emergency launch escape happens at supersonic speed, these fins keep the capsule flying straight and steady like an arrow.",
        "specs": [
          {
            "label": "Fins",
            "val": "4 Aerodynamic Stabilizers"
          },
          {
            "label": "Material",
            "val": "Super-strong Carbon Composite"
          },
          {
            "label": "Purpose",
            "val": "Keeps rocket steady like feathers on an arrow"
          },
          {
            "label": "Disposal",
            "val": "Separates before re-entering Earth"
          }
        ]
      },
      {
        "id": "dragon-trunk",
        "num": 8,
        "name": "Cargo Trunk Bay",
        "system": "Cargo & Equipment Carrier",
        "pos": [
          0,
          -0.85,
          0
        ],
        "desc": "The open trunk at the back of the spaceship! It carries cargo, food, space station batteries, and scientific experiments up to the ISS.",
        "specs": [
          {
            "label": "Cargo Room",
            "val": "Big enough for giant space station batteries"
          },
          {
            "label": "Height",
            "val": "3.7 meters tall"
          },
          {
            "label": "Cargo Type",
            "val": "Science gear, food & spare parts"
          },
          {
            "label": "Return",
            "val": "Disposed in atmosphere before splashdown"
          }
        ]
      }
    ]
  },
  "gaganyaan": {
    "id": "gaganyaan",
    "name": "Gaganyaan Orbital Module",
    "subtitle": "ISRO // India’s Indigenous Human Spaceflight Programme",
    "agency": "ISRO // INDIA",
    "agencyClass": "isro",
    "agencyBadge": "ISRO // INDIA",
    "cameraDistance": 6.5,
    "components": [
      {
        "id": "gaganyaan-parachute",
        "num": 1,
        "name": "Ocean Splashdown Parachutes",
        "system": "Safe Landing Parachutes",
        "pos": [
          0,
          2.05,
          0
        ],
        "desc": "Housed at the top of the capsule are 3 huge orange-and-white parachutes designed by Indian defense scientists. They gently float the astronaut capsule down into the sea at a safe, smooth speed.",
        "specs": [
          {
            "label": "Developer",
            "val": "ADRDE (DRDO) & ISRO"
          },
          {
            "label": "Main Chutes",
            "val": "3 Giant Orange & White Parachutes"
          },
          {
            "label": "Landing Speed",
            "val": "Gentle splash into sea at ~7.5 m/s"
          },
          {
            "label": "Opening",
            "val": "Automatic sensors deploy chutes at safe height"
          }
        ]
      },
      {
        "id": "gaganyaan-cm",
        "num": 2,
        "name": "Vyomanaut Crew Cabin",
        "system": "Indian Astronaut Living Cabin",
        "pos": [
          0,
          1.25,
          0.42
        ],
        "desc": "The safe, sealed cabin for 3 Indian astronauts (called Vyomanauts!). It keeps air pressure just like on Earth, controls temperature, and lets astronauts live and conduct science experiments for up to 7 days.",
        "specs": [
          {
            "label": "Crew Capacity",
            "val": "3 Indian Vyomanauts"
          },
          {
            "label": "Cabin Air",
            "val": "Comfortable Earth-like Air Pressure"
          },
          {
            "label": "Mission Orbit",
            "val": "400 km high above Earth"
          },
          {
            "label": "Trip Duration",
            "val": "Up to 7 days in space"
          }
        ]
      },
      {
        "id": "gaganyaan-viewports",
        "num": 3,
        "name": "Astronaut Lookout Windows",
        "system": "High-Strength Quartz Windows",
        "pos": [
          0.32,
          1.35,
          0.72
        ],
        "desc": "Two clear, double-pane quartz glass windows. They give Vyomanauts amazing views of India, Earth’s blue oceans, and starry space while keeping out intense heat and solar radiation.",
        "specs": [
          {
            "label": "Glass",
            "val": "Heat-proof Fused Quartz Glass"
          },
          {
            "label": "Heat Resistance",
            "val": "Withstands up to 1,200°C"
          },
          {
            "label": "Window Count",
            "val": "2 Forward Lookout Windows"
          },
          {
            "label": "View",
            "val": "Panoramic views of planet Earth"
          }
        ]
      },
      {
        "id": "gaganyaan-livery",
        "num": 4,
        "name": "Indian Flag & ISRO Insignia",
        "system": "Pride of India Space Emblem",
        "pos": [
          0,
          0.78,
          0.75
        ],
        "desc": "Proudly wearing India’s saffron, white, and green tricolor flag and the ISRO logo! Gaganyaan makes India only the 4th nation in human history to send astronauts to space on its own rocket.",
        "specs": [
          {
            "label": "Flagship Mission",
            "val": "India’s Human Spaceflight Programme"
          },
          {
            "label": "Lead Center",
            "val": "Human Space Flight Centre (Bengaluru)"
          },
          {
            "label": "Rocket",
            "val": "Human-Rated LVM3 (HRLV) Rocket"
          },
          {
            "label": "Achievement",
            "val": "India joins elite human spaceflight nations!"
          }
        ]
      },
      {
        "id": "gaganyaan-heatshield",
        "num": 5,
        "name": "Indian Thermal Heat Shield",
        "system": "Re-entry Heat Protection",
        "pos": [
          0,
          0.42,
          0
        ],
        "desc": "Built by ISRO’s Vikram Sarabhai Space Centre in Kerala, this thick protective shield guards the crew against 2,000°C friction heat as the capsule re-enters Earth’s atmosphere at 28,000 km/h!",
        "specs": [
          {
            "label": "Developed By",
            "val": "VSSC (ISRO Thiruvananthapuram)"
          },
          {
            "label": "Max Heat",
            "val": "Resists 2,000°C glowing plasma heat"
          },
          {
            "label": "Diameter",
            "val": "3.5 meters across"
          },
          {
            "label": "Technology",
            "val": "Ablative thermal heat shield tiles"
          }
        ]
      },
      {
        "id": "gaganyaan-rcs",
        "num": 6,
        "name": "Attitude Control Thrusters (RCS)",
        "system": "Space Steering Jet System",
        "pos": [
          1.02,
          0.78,
          0.4
        ],
        "desc": "12 precision liquid thrusters on the capsule. They let the astronauts steer the spaceship, keep it facing the right way in orbit, and aim the heat shield forward for safe re-entry.",
        "specs": [
          {
            "label": "Thrusters",
            "val": "12 Mini Steering Rocket Engines"
          },
          {
            "label": "Role",
            "val": "Pitches, rolls and turns the spaceship"
          },
          {
            "label": "Safety",
            "val": "Backup twin fuel pipes for safety"
          },
          {
            "label": "Fuel",
            "val": "High-reliability liquid space propellant"
          }
        ]
      },
      {
        "id": "gaganyaan-sm",
        "num": 7,
        "name": "Golden Service Module",
        "system": "Engine & Supplies Compartment",
        "pos": [
          0,
          -0.35,
          0
        ],
        "desc": "Wrapped in shiny golden insulation blankets to protect against solar heat! It holds fuel tanks, electrical power, and rocket engines to support the crew cabin throughout the mission.",
        "specs": [
          {
            "label": "Structure",
            "val": "Golden cylindrical engine room"
          },
          {
            "label": "Insulation",
            "val": "Shiny gold blankets to block sun heat"
          },
          {
            "label": "Carries",
            "val": "4.5 tonnes of propellant & power supplies"
          },
          {
            "label": "Separation",
            "val": "Detaches safely before capsule lands"
          }
        ]
      },
      {
        "id": "gaganyaan-solar",
        "num": 8,
        "name": "Deployable Solar Wings",
        "system": "Clean Solar Electricity",
        "pos": [
          2.5,
          -0.32,
          0.3
        ],
        "desc": "Two foldable solar panels that spread out like wings once in space! They capture sunlight to generate electricity and charge the spaceship’s powerful batteries.",
        "specs": [
          {
            "label": "Wings",
            "val": "2 Fold-out Solar Wings"
          },
          {
            "label": "Power",
            "val": "Generates 3,500 Watts of solar energy"
          },
          {
            "label": "Batteries",
            "val": "Charges high-tech lithium-ion batteries"
          },
          {
            "label": "Cells",
            "val": "High-efficiency multi-layer solar cells"
          }
        ]
      },
      {
        "id": "gaganyaan-lam",
        "num": 9,
        "name": "LAM Main Rocket Engines",
        "system": "Orbital Power Engines",
        "pos": [
          0,
          -1.22,
          0
        ],
        "desc": "Two reliable liquid rocket engines! They fire to boost Gaganyaan into its final circular orbit around Earth, and later fire in reverse (retro-burn) to slow down and begin the journey home.",
        "specs": [
          {
            "label": "Engines",
            "val": "Twin 440 N Liquid Rocket Motors"
          },
          {
            "label": "Missions",
            "val": "Same trusted engines used on Mars & Moon missions"
          },
          {
            "label": "Job",
            "val": "Brakes the capsule to return safely to Earth"
          },
          {
            "label": "Steering",
            "val": "Precision orbital speed control"
          }
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
          btn3D.innerHTML = '<span>3D Model</span>';
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
  // COMPONENTS LIST & LABELS OVERLAY (Pure 3D Model View - Content Suppressed)
  // =========================================================================
  function buildComponentsList(craftId) {
    if (!compListEl) compListEl = document.getElementById('craft3DComponentsList');
    if (!labelsOverlayEl) labelsOverlayEl = document.getElementById('craft3DLabelsOverlay');

    if (compListEl) compListEl.innerHTML = '';
    if (labelsOverlayEl) labelsOverlayEl.innerHTML = '';
    pinElements = [];
  }

  function selectActiveComponent(compId) {
    activeCompId = compId;
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
