/**
 * ============================================================================
 * ADITYA-L1: JOURNEY TO THE SUN'S DOORSTEP 3D ENGINE
 * Built for VYOM 1.0 - ISRO Solar Observatory & Space Weather Guardian
 * 3D Sun-Earth-L1 system, Halo Orbit, 7 instruments & playable CME defense
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================
  // 1. CONFIGURATION & TUNABLE PARAMETERS
  // ==========================================
  const CONFIG = {
    haloRadiusX: 18.0,
    haloRadiusY: 10.0,
    haloRadiusZ: 8.0,
    l1DistanceRatio: 0.15, // Compressed scale for visual clarity
    sunDistance: 120.0,
    earthDistance: -70.0,
    cmeSpeed: 18.0,
    eventInterval: 12.0 // seconds between solar events in Guardian mode
  };

  // ==========================================
  // 2. BILINGUAL TRANSLATIONS (EN & HI)
  // ==========================================
  const TRANSLATIONS = {
    en: {
      missionTitle: 'Aditya-L1: Journey to the Sun',
      missionSubtitle: 'ISRO SOLAR OBSERVATORY & SPACE WEATHER PROTOCOL',
      storyModeBtn: 'Cinematic Story',
      guardianModeBtn: 'Space Weather Guardian',
      instrumentsBtn: '7 Solar Instruments',
      quizBtn: 'Solar Quiz',
      haloInfoBtn: 'Halo Orbit Science',
      prevBtn: '← Previous',
      nextBtn: 'Next Stage →',
      stages: [
      {
              "id": 1,
              "name": "Liftoff on PSLV-C57",
              "sub": "Satish Dhawan Space Centre, Sriharikota • Sept 2, 2023",
              "desc": "India’s most reliable workhorse rocket, PSLV, launched with 6 strap-on boosters attached to its sides! It blasted Aditya-L1 into space to begin India’s very first mission to study our Sun.",
              "facts": [
                      "PSLV is famous as ISRO’s most trusted rocket with dozens of successful spaceflights.",
                      "Aditya-L1 was first placed into orbit around Earth before beginning its long solar journey.",
                      "Aditya means \"The Sun\" in Sanskrit!"
              ]
      },
      {
              "id": 2,
              "name": "Earth Orbit Boosts",
              "sub": "4 Gravity Slingshots • Sept 3 - 15, 2023",
              "desc": "Just like Chandrayaan-3, Aditya-L1 fired its rocket engine 4 times to stretch its orbit further and further away from Earth, gathering speed for the big leap toward the Sun.",
              "facts": [
                      "Each engine burn used Earth’s gravity like an invisible rubber band to propel the craft.",
                      "All 7 scientific telescopes and sensors were tested and passed with flying colors.",
                      "Instruments began sensing energetic particles from space even before leaving Earth!"
              ]
      },
      {
              "id": 3,
              "name": "Slingshot to Lagrange Point 1",
              "sub": "Leap into Deep Space • Sept 19, 2023",
              "desc": "With a powerful final engine burn, Aditya-L1 broke free from Earth’s gravity grip and set off on an epic 1.5-million-kilometer voyage toward Lagrange Point 1 (L1)!",
              "facts": [
                      "Lagrange Point 1 is a special parking spot in space where the gravity of the Sun and Earth balance out.",
                      "It left Earth’s gravitational neighborhood on September 30, 2023.",
                      "The journey through deep space took over 110 days!"
              ]
      },
      {
              "id": 4,
              "name": "Deep Space Cruise",
              "sub": "1.5 Million Kilometer Voyage • Oct - Dec 2023",
              "desc": "During its 4-month journey, Earth shrank into a small blue marble in the rear cameras while the Sun grew brighter. Aditya-L1 began testing its solar wind particle detectors along the way.",
              "facts": [
                      "L1 is located 1.5 million kilometers from Earth—about 4 times further than the Moon!",
                      "The spacecraft sailed through the solar wind—a stream of charged particles flowing from the Sun.",
                      "The SUIT telescope snapped its first ultraviolet test images of the Sun’s fiery surface."
              ]
      },
      {
              "id": 5,
              "name": "Arrival at Halo Orbit",
              "sub": "Parking at L1 • January 6, 2024",
              "desc": "Success! On January 6, 2024, ISRO fired the thrusters to steer Aditya-L1 into a special 3D loop called a \"Halo Orbit\" around Lagrange Point 1. It is now safely parked in space!",
              "facts": [
                      "A Halo Orbit is like an invisible rollercoaster loop in space that the satellite rides forever.",
                      "At L1, the satellite has a 24/7 unobstructed view of the Sun—never blocked by clouds or Earth!",
                      "India became only the fourth space agency in the world to successfully place a probe at L1."
              ]
      },
      {
              "id": 6,
              "name": "Watching the Sun 24/7",
              "sub": "Solar Science & Space Weather • Halo Orbit",
              "desc": "From its cosmic vantage point, Aditya-L1 watches the Sun non-stop! Its 7 high-tech cameras and sensors track solar storms, solar flares, and space weather to protect satellites and power grids on Earth.",
              "facts": [
                      "Solar flares can disrupt GPS and radio signals on Earth—Aditya-L1 gives early warnings!",
                      "The VELC instrument creates an artificial solar eclipse inside the camera to see the Sun’s outer glowing crown (Corona).",
                      "Aditya-L1 will protect Earth from space weather for more than 5 years!"
              ]
      }
]
    },
    hi: {
      missionTitle: 'आदित्य-एल1: सूर्य की दहलीज पर',
      missionSubtitle: 'इसरो सौर वेधशाला एवं अंतरिक्ष मौसम सुरक्षा प्रोटोकॉल',
      storyModeBtn: 'सिनेमैटिक कहानी',
      guardianModeBtn: 'अंतरिक्ष मौसम रक्षक',
      instrumentsBtn: '7 सौर उपकरण',
      quizBtn: 'सौर क्विज',
      haloInfoBtn: 'हेलो ऑर्बिट विज्ञान',
      prevBtn: '← पिछला',
      nextBtn: 'अगला चरण →',
      stages: [
        {
          id: 1,
          name: 'पीएसएलवी-सी57 से भव्य प्रक्षेपण',
          sub: 'सतीश धवन अंतरिक्ष केंद्र, श्रीहरिकोटा • 2 सितंबर 2023',
          desc: 'इसरो के भरोसेमंद रॉकेट PSLV-C57 (XL संस्करण) ने 6 स्ट्रैप-ऑन बूस्टर्स के साथ आदित्य-एल1 को श्रीहरिकोटा से अंतरिक्ष में प्रक्षेपित किया।',
          facts: [
            'यह पीएसएलवी की सबसे लंबी उड़ानों में से एक थी (63 मिनट)।',
            'आदित्य-एल1 को 235 x 19,500 किमी की सटीक पृथ्वी कक्षा में स्थापित किया।',
            'यह भारत का पहला समर्पित अंतरिक्ष-आधारित सौर मिशन है।'
          ]
        },
        {
          id: 2,
          name: 'पृथ्वी की कक्षा का विस्तार',
          sub: '4 थ्रस्ट बर्न्स • 3 - 15 सितंबर 2023',
          desc: 'आदित्य-एल1 ने अपने लिक्विड अपोजी मोटर से 4 बार इंजन फायर किया और अपनी कक्षा को बढ़ाकर 73,000 किमी तक पहुंचा दिया।',
          facts: [
            'पृथ्वी के गुरुत्वाकर्षण की सहायता से गति और ऊर्जा बढ़ाई गई।',
            'सभी वैज्ञानिक उपकरणों के स्वास्थ्य की प्रारंभिक जांच की गई।',
            'स्टेप्स (STEPS) सेंसर ने पृथ्वी के विकिरण क्षेत्रों में ऊर्जावान कणों को मापा।'
          ]
        },
        {
          id: 3,
          name: 'ट्रांस-लैग्रेंजियन पॉइंट 1 इंजेक्शन',
          sub: 'एल1 बिंदु की ओर प्रस्थान • 19 सितंबर 2023',
          desc: 'एक मुख्य थ्रस्टर बर्न ने आदित्य-एल1 को पृथ्वी की कक्षा से बाहर धकेल कर सूर्य-पृथ्वी एल1 बिंदु की 15 लाख किलोमीटर की यात्रा पर रवाना किया।',
          facts: [
            'अंतरिक्ष यान ने पृथ्वी के गुरुत्वाकर्षण प्रभुत्व को 30 सितंबर को पार किया।',
            'सूर्य की ओर 110 दिनों की लंबी और कठिन अंतरिक्ष यात्रा शुरू हुई।',
            'सूर्य और पृथ्वी के गुरुत्वाकर्षण संतुलन बिंदु (L1) को साधा गया।'
          ]
        },
        {
          id: 4,
          name: 'गहरे अंतरिक्ष की यात्रा (क्रूज़)',
          sub: '15 लाख किमी की यात्रा • अक्टूबर - दिसंबर 2023',
          desc: '4 महीने की यात्रा के दौरान पृथ्वी दूर होती गई और सूर्य और चमकदार होता गया। एस्पेक्स (ASPEX) और पापा (PAPA) ने सौर हवाओं के डेटा का अध्ययन शुरू कर दिया।',
          facts: [
            'L1 बिंदु सूर्य की कुल दूरी का केवल 1% हिस्सा है।',
            'अंतरिक्ष यान ने उच्च विकिरण और सौर तूफानों का सामना किया।',
            'सूट (SUIT) टेलीस्कोप ने पहली बार सूर्य की पराबैंगनी (UV) तस्वीरें लीं।'
          ]
        },
        {
          id: 5,
          name: 'एल1 हेलो ऑर्बिट में प्रवेश',
          sub: 'लैग्रेंज पॉइंट 1 पर सफल स्थापना • 6 जनवरी 2024',
          desc: '6 जनवरी 2024 को शाम 4 बजे, इसरो ने अंतिम बर्न किया और आदित्य-एल1 को सूर्य-पृथ्वी एल1 बिंदु के चारों ओर एक 3D हेलो ऑर्बिट में सफलतापूर्वक स्थापित कर दिया!',
          facts: [
            'हेलो ऑर्बिट में एक चक्कर पूरा करने में लगभग 177.86 दिन लगते हैं।',
            'L1 से सूर्य को 24 घंटे बिना किसी ग्रहण के लगातार देखा जा सकता है!',
            'प्रधानमंत्री मोदी ने इसे भारतीय विज्ञान का एक ऐतिहासिक कीर्तिमान बताया।'
          ]
        },
        {
          id: 6,
          name: '24/7 सौर विज्ञान एवं अंतरिक्ष मौसम निगरानी',
          sub: 'हेलो ऑर्बिट विज्ञान चरण • सौर तूफानों से सुरक्षा',
          desc: 'आदित्य-एल1 के सातों पेलोड सूर्य पर नजर बनाए हुए हैं। वेल्क (VELC) कोरोनल मास इजेक्शन की निगरानी करता है और पृथ्वी को सौर तूफानों की पूर्व चेतावनी भेजता है।',
          facts: [
            'वेल्क सूर्य के कोरोना की बहुत करीब से उच्च-रिज़ॉल्यूशन तस्वीरें लेता है।',
            'पूर्व चेतावनी से पृथ्वी के उपग्रहों और बिजली ग्रिड को 15 से 48 घंटे पहले बचाया जा सकता है।',
            'यह मिशन कम से कम 5 वर्षों तक सक्रिय रहकर खोजें करेगा।'
          ]
        }
      ]
    }
  };

  // ==========================================
  // 3. SCIENTIFIC INSTRUMENTS (7 PAYLOADS)
  // ==========================================
  const INSTRUMENTS = [
    {
      id: 'velc',
      name: 'VELC',
      fullName: 'Visible Emission Line Coronagraph',
      badge: 'Corona & CME Tracker',
      desc: 'Internally occulted reflective coronagraph designed by IIA Bangalore. Studies the solar corona and the physics of coronal mass ejections down to 1.05 solar radii.',
      targets: 'CME Events & Coronal Dynamics'
    },
    {
      id: 'suit',
      name: 'SUIT',
      fullName: 'Solar Ultraviolet Imaging Telescope',
      badge: 'UV Full-Disk Imager',
      desc: 'Developed by IUCAA Pune. Captures full-disk images of the Sun in 200-400 nm near-ultraviolet wavelength to inspect the photosphere and chromosphere.',
      targets: 'Solar Flares & Chromospheric Heating'
    },
    {
      id: 'solexs',
      name: 'SoLEXS',
      fullName: 'Solar Low Energy X-ray Spectrometer',
      badge: 'Soft X-ray Flare Monitor',
      desc: 'Developed by URSC Bengaluru. Measures soft X-ray flux from the Sun to understand coronal heating mechanisms during solar flares.',
      targets: 'Soft X-rays (1 to 22 keV)'
    },
    {
      id: 'hel1os',
      name: 'HEL1OS',
      fullName: 'High Energy L1 Orbiting X-ray Spectrometer',
      badge: 'Hard X-ray Explosive Flare Detector',
      desc: 'Monitors hard X-ray emissions during the impulsive phase of solar flares to understand explosive electron acceleration.',
      targets: 'Hard X-rays (10 to 150 keV)'
    },
    {
      id: 'aspex',
      name: 'ASPEX',
      fullName: 'Aditya Solar wind Particle EXperiment',
      badge: 'Solar Wind Ion Analyzer',
      desc: 'Developed by PRL Ahmedabad. Comprises SWIS and STEPS to measure solar wind ions, protons, and alpha particles along with their energy distributions.',
      targets: 'Solar Wind Ions & Protons'
    },
    {
      id: 'papa',
      name: 'PAPA',
      fullName: 'Plasma Analyser Package for Aditya',
      badge: 'Solar Wind Plasma Sensor',
      desc: 'Developed by SPL/VSSC Thiruvananthapuram. Analyzes solar wind electrons and protons to understand continuous solar mass loss.',
      targets: 'Solar Wind Electron Density & Temperature'
    },
    {
      id: 'mag',
      name: 'MAG',
      fullName: 'Advanced Tri-axial High Resolution Magnetometers',
      badge: 'Magnetic Field Sensor',
      desc: 'Dual fluxgate magnetometers mounted on a 6-meter deployable boom to measure low-intensity interplanetary magnetic fields at L1.',
      targets: 'Interplanetary Magnetic Field (IMF)'
    }
  ];

  // ==========================================
  // 4. MISSION QUIZ (5 QUESTIONS WITH BADGE)
  // ==========================================
  const QUIZ_QUESTIONS = [
    {
      q: 'Where is Aditya-L1 placed to observe the Sun continuously?',
      options: [
        'In a Halo Orbit around Sun-Earth Lagrange Point 1 (L1)',
        'In Low Earth Orbit like the ISS',
        'Directly orbiting the Sun at Mercury’s distance',
        'At the Moon’s South Pole'
      ],
      correct: 0,
      expl: 'Correct! Aditya-L1 is stationed in a halo orbit around the Sun-Earth L1 Lagrange point, about 1.5 million km from Earth, allowing uninterrupted 24/7 view of the Sun without eclipses.'
    },
    {
      q: 'What makes the L1 Lagrange point scientifically unique?',
      options: [
        'The gravitational pull of the Sun and Earth balance each other',
        'It has oxygen for astronauts',
        'It is inside the Sun’s core',
        'It is completely dark'
      ],
      correct: 0,
      expl: 'Correct! At L1, the gravitational attractions of the Sun and Earth balance the centrifugal force, allowing a spacecraft to hover stably relative to both bodies.'
    },
    {
      q: 'Which primary instrument on Aditya-L1 acts as a coronagraph to study CMEs?',
      options: ['VELC (Visible Emission Line Coronagraph)', 'SUIT', 'PAPA', 'MAG'],
      correct: 0,
      expl: 'Correct! VELC (Visible Emission Line Coronagraph), built by IIA Bangalore, blocks the Sun’s blinding disc to study the faint outer corona and CMEs.'
    },
    {
      q: 'How does an early warning from Aditya-L1 protect Earth from solar storms?',
      options: [
        'Allows power grids and satellites to enter safe mode before CMEs hit',
        'Destroys the solar flare with lasers',
        'Pushes Earth further from the Sun',
        'Turns off the Sun’s radiation'
      ],
      correct: 0,
      expl: 'Correct! An alert gives Earth operators 15 to 48 hours to orient satellites into safe mode, protect electrical transformers, and shield orbiting astronauts.'
    },
    {
      q: 'Which launch vehicle placed Aditya-L1 into space on September 2, 2023?',
      options: ['PSLV-C57 (XL)', 'GSLV Mk II', 'LVM3 M4', 'Falcon 9'],
      correct: 0,
      expl: 'Correct! ISRO’s reliable PSLV-C57 in its most powerful XL configuration launched Aditya-L1 from Sriharikota.'
    }
  ];

  // ==========================================
  // 5. WEB AUDIO SYNTHESIZER
  // ==========================================
  class SunAudio {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.solarHum = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
          this.startSolarAmbience();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    startSolarAmbience() {
      if (!this.ctx || this.solarHum) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low 55Hz solar hum
        gain.gain.setValueAtTime(this.isMuted ? 0 : 0.04, this.ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        this.solarHum = gain;
      } catch (e) {}
    }

    playBeep(freq = 950, duration = 0.08) {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    }

    playSolarFlareAlarm() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        // Dual-tone Space Weather Warning Siren
        [880, 1174.66].forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.15);
          gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.15 + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + i * 0.15);
          osc.stop(this.ctx.currentTime + i * 0.15 + 0.28);
        });
      } catch (e) {}
    }

    playAlertBroadcastSuccess() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        // Uplifting triumphal chime: F4 -> A4 -> C5 -> F5
        [349.23, 440.00, 523.25, 698.46].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.1);
          gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.1 + 0.45);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + i * 0.1);
          osc.stop(this.ctx.currentTime + i * 0.1 + 0.5);
        });
      } catch (e) {}
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.solarHum) {
        this.solarHum.gain.setValueAtTime(this.isMuted ? 0 : 0.04, this.ctx.currentTime);
      }
      return this.isMuted;
    }
  }

  // ==========================================
  // 6. MAIN ADITYA-L1 ENGINE CLASS
  // ==========================================
  class AdityaL1Engine {
    constructor() {
      this.audio = new SunAudio();
      this.lang = 'en';
      this.stage = 1;
      this.mode = 'story'; // 'story' | 'guardian'
      this.isVoiceEnabled = true;
      this.isInitialized = false;

      // Three.js References
      this.canvas = null;
      this.scene = null;
      this.camera = null;
      this.renderer = null;

      // 3D Visual Objects
      this.sunMesh = null;
      this.sunGlow = null;
      this.earthGroup = null;
      this.l1Marker = null;
      this.haloOrbitLine = null;
      this.adityaCraft = null;
      this.pslvRocket = null;
      this.cmeParticleGroup = null;
      this.solarWindParticles = null;
      this.magnetosphereLines = null;

      // Orbit & Simulation Variables
      this.simTime = 0;
      this.haloAngle = 0;

      // Space Weather Guardian Mini-Game State
      this.guardian = {
        active: false,
        activeInstrument: 'velc',
        threatLevel: 'NORMAL',
        currentEvent: null, // { type: 'CME' | 'FLARE' | 'WIND', progress: 0, requiredInst: 'velc' }
        timer: 0,
        score: 0,
        earthHealth: 100,
        alertsSent: 0
      };

      // Confetti canvas for halo insertion celebration
      this.confettiCanvas = null;
      this.confettiCtx = null;
      this.confettiPieces = [];
    }

    init() {
      if (this.isInitialized) return;
      this.canvas = document.getElementById('sunCanvas');
      if (!this.canvas) return;

      this.confettiCanvas = document.getElementById('sunConfettiCanvas');
      if (this.confettiCanvas) {
        this.confettiCtx = this.confettiCanvas.getContext('2d');
      }

      this.setupThreeScene();
      this.setupSun();
      this.setupEarthAndMagnetosphere();
      this.setupL1AndHaloOrbit();
      this.setupAdityaCraft();
      this.setupPslvRocket();
      this.setupParticleSystems();
      this.setupEventListeners();

      this.isInitialized = true;
      this.goToStage(1);
      this.animate();
    }

    // ------------------------------------------
    // 3D SCENE SETUP
    // ------------------------------------------
    setupThreeScene() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x02040a);

      this.camera = new THREE.PerspectiveCamera(50, w / h, 0.2, 2000);
      this.camera.position.set(0, 25, 75);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Ambient Deep Space Illumination
      const ambLight = new THREE.AmbientLight(0x223344, 0.6);
      this.scene.add(ambLight);

      // Starfield
      this.createStarfield();
    }

    createStarfield() {
      const count = 3500;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 600 + Math.random() * 500;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, transparent: true, opacity: 0.85 });
      this.scene.add(new THREE.Points(geo, mat));
    }

    // ------------------------------------------
    // ANIMATED 3D SUN WITH CORONA
    // ------------------------------------------
    setupSun() {
      const sunGroup = new THREE.Group();

      // Main Sun Sphere
      const sunGeo = new THREE.SphereGeometry(22, 64, 64);
      const sunMat = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        wireframe: false
      });
      this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
      sunGroup.add(this.sunMesh);

      // Outer Corona Plasma Glow Aura
      const glowGeo = new THREE.SphereGeometry(25.5, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.28,
        side: THREE.BackSide
      });
      this.sunGlow = new THREE.Mesh(glowGeo, glowMat);
      sunGroup.add(this.sunGlow);

      // Directional Light from the Sun
      const sunLight = new THREE.PointLight(0xfff7ed, 2.8, 600, 0.4);
      sunGroup.add(sunLight);

      sunGroup.position.set(0, 0, CONFIG.sunDistance);
      this.scene.add(sunGroup);
    }

    // ------------------------------------------
    // 3D EARTH & MAGNETOSPHERE SHIELD
    // ------------------------------------------
    setupEarthAndMagnetosphere() {
      this.earthGroup = new THREE.Group();

      // Earth Sphere
      const earthGeo = new THREE.SphereGeometry(8.5, 32, 32);
      const earthMat = new THREE.MeshPhongMaterial({
        color: 0x1d4ed8,
        specular: 0x60a5fa,
        shininess: 25
      });
      const earth = new THREE.Mesh(earthGeo, earthMat);
      this.earthGroup.add(earth);

      // Magnetosphere Shield Curve (Deflects solar wind)
      const magGeo = new THREE.TorusGeometry(12, 0.2, 16, 48, Math.PI * 1.2);
      const magMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.45
      });
      this.magnetosphereLines = new THREE.Mesh(magGeo, magMat);
      this.magnetosphereLines.rotation.y = Math.PI / 2;
      this.magnetosphereLines.rotation.z = Math.PI / 2.3;
      this.magnetosphereLines.position.set(0, 0, 4);
      this.earthGroup.add(this.magnetosphereLines);

      // Polar Aurora Glow Ring
      const auroraGeo = new THREE.RingGeometry(2.5, 4.5, 32);
      const auroraMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const aurora = new THREE.Mesh(auroraGeo, auroraMat);
      aurora.rotation.x = Math.PI / 2;
      aurora.position.y = 8.52;
      this.earthGroup.add(aurora);

      this.earthGroup.position.set(0, 0, CONFIG.earthDistance);
      this.scene.add(this.earthGroup);
    }

    // ------------------------------------------
    // L1 LAGRANGE POINT & HALO ORBIT
    // ------------------------------------------
    setupL1AndHaloOrbit() {
      // Sun-Earth Alignment Axis Line
      const axisGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, CONFIG.sunDistance),
        new THREE.Vector3(0, 0, CONFIG.earthDistance)
      ]);
      const axisMat = new THREE.LineDashedMaterial({
        color: 0xffffff,
        dashSize: 2,
        gapSize: 2,
        transparent: true,
        opacity: 0.25
      });
      const axisLine = new THREE.Line(axisGeo, axisMat);
      axisLine.computeLineDistances();
      this.scene.add(axisLine);

      // L1 Virtual Equilibrium Point Beacon
      const l1Geo = new THREE.RingGeometry(0.8, 1.2, 24);
      const l1Mat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide });
      this.l1Marker = new THREE.Mesh(l1Geo, l1Mat);
      this.l1Marker.rotation.x = Math.PI / 2;
      this.l1Marker.position.set(0, 0, 0); // L1 is at coordinate origin
      this.scene.add(this.l1Marker);

      // 3D Looping Halo Orbit Curve
      const haloPoints = [];
      const steps = 120;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const x = Math.cos(t) * CONFIG.haloRadiusX;
        const y = Math.sin(t) * CONFIG.haloRadiusY;
        const z = Math.sin(2 * t) * CONFIG.haloRadiusZ * 0.35; // 3D figure-8 tilt
        haloPoints.push(new THREE.Vector3(x, y, z));
      }
      const haloGeo = new THREE.BufferGeometry().setFromPoints(haloPoints);
      const haloMat = new THREE.LineBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.8
      });
      this.haloOrbitLine = new THREE.Line(haloGeo, haloMat);
      this.scene.add(this.haloOrbitLine);
    }

    // ------------------------------------------
    // ADITYA-L1 SPACECRAFT 3D MODEL
    // ------------------------------------------
    setupAdityaCraft() {
      this.adityaCraft = new THREE.Group();

      // Main Golden Cubical Bus (MLI Blanket)
      const busGeo = new THREE.BoxGeometry(2.6, 2.6, 2.8);
      const busMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37, // Gold foil
        metalness: 0.9,
        roughness: 0.2
      });
      const bus = new THREE.Mesh(busGeo, busMat);
      this.adityaCraft.add(bus);

      // Deployable Solar Panels (Twin Blue Wings)
      [-3.4, 3.4].forEach(x => {
        const wingGeo = new THREE.BoxGeometry(4.2, 0.1, 2.2);
        const wingMat = new THREE.MeshStandardMaterial({
          color: 0x1e3a8a, // Deep blue solar cells
          metalness: 0.85,
          roughness: 0.15
        });
        const wing = new THREE.Mesh(wingGeo, wingMat);
        wing.position.set(x, 0, 0);
        this.adityaCraft.add(wing);
      });

      // VELC Coronagraph Optical Tube (Pointed toward Sun)
      const velcGeo = new THREE.CylinderGeometry(0.5, 0.6, 2.4, 16);
      const velcMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 });
      const velc = new THREE.Mesh(velcGeo, velcMat);
      velc.rotation.x = Math.PI / 2;
      velc.position.set(0, 0.4, 2.2);
      this.adityaCraft.add(velc);

      // SUIT UV Telescope Aperture
      const suitGeo = new THREE.BoxGeometry(0.8, 0.8, 1.4);
      const suitMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
      const suit = new THREE.Mesh(suitGeo, suitMat);
      suit.position.set(0.8, -0.4, 1.8);
      this.adityaCraft.add(suit);

      // 6-Meter Magnetometer Boom (Extended laterally)
      const boomGeo = new THREE.CylinderGeometry(0.06, 0.06, 4.5, 8);
      const boomMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
      const boom = new THREE.Mesh(boomGeo, boomMat);
      boom.rotation.z = Math.PI / 2;
      boom.position.set(-4.5, 0, -1.2);
      this.adityaCraft.add(boom);

      this.scene.add(this.adityaCraft);
    }

    // ------------------------------------------
    // PSLV-C57 ROCKET MODEL (STAGE 1)
    // ------------------------------------------
    setupPslvRocket() {
      this.pslvRocket = new THREE.Group();

      // Main Core Rocket Cylinder
      const coreGeo = new THREE.CylinderGeometry(1.2, 1.2, 18, 24);
      const coreMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const core = new THREE.Mesh(coreGeo, coreMat);
      this.pslvRocket.add(core);

      // Ogive Payload Fairing
      const fairingGeo = new THREE.ConeGeometry(1.2, 4.5, 24);
      const fairingMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9 });
      const fairing = new THREE.Mesh(fairingGeo, fairingMat);
      fairing.position.y = 11.25;
      this.pslvRocket.add(fairing);

      // 6 Solid Strap-on Boosters
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2;
        const bGeo = new THREE.CylinderGeometry(0.5, 0.5, 10, 12);
        const bMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
        const b = new THREE.Mesh(bGeo, bMat);
        b.position.set(Math.cos(theta) * 1.9, -2.5, Math.sin(theta) * 1.9);
        this.pslvRocket.add(b);
      }

      this.pslvRocket.position.set(0, 0, CONFIG.earthDistance + 12);
      this.scene.add(this.pslvRocket);
    }

    // ------------------------------------------
    // SOLAR WIND & CME PARTICLE SYSTEMS
    // ------------------------------------------
    setupParticleSystems() {
      // Continuous Solar Wind streaming from Sun
      const wCount = 800;
      const wGeo = new THREE.BufferGeometry();
      const wPos = new Float32Array(wCount * 3);
      for (let i = 0; i < wCount; i++) {
        wPos[i * 3] = (Math.random() - 0.5) * 50;
        wPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        wPos[i * 3 + 2] = CONFIG.sunDistance - Math.random() * 200;
      }
      wGeo.setAttribute('position', new THREE.BufferAttribute(wPos, 3));
      const wMat = new THREE.PointsMaterial({
        color: 0xfbbf24,
        size: 1.2,
        transparent: true,
        opacity: 0.65
      });
      this.solarWindParticles = new THREE.Points(wGeo, wMat);
      this.scene.add(this.solarWindParticles);

      // CME Eruptive Blast Wave Mesh
      const cmeGeo = new THREE.SphereGeometry(14, 24, 24);
      const cmeMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.45,
        wireframe: true
      });
      this.cmeParticleGroup = new THREE.Mesh(cmeGeo, cmeMat);
      this.cmeParticleGroup.visible = false;
      this.scene.add(this.cmeParticleGroup);
    }

    // ------------------------------------------
    // STAGE NAVIGATION & CINEMATIC CHOREOGRAPHY
    // ------------------------------------------
    goToStage(stageNum) {
      if (stageNum < 1) stageNum = 1;
      if (stageNum > 6) stageNum = 6;
      this.stage = stageNum;

      if (this.mode === 'guardian') {
        this.exitGuardianMode();
      }

      this.updateStageUI();
      this.audio.playBeep(900 + stageNum * 50, 0.06);

      // Visibility toggles
      this.pslvRocket.visible = (stageNum === 1);
      this.adityaCraft.visible = (stageNum >= 2);
      this.l1Marker.visible = (stageNum >= 4);
      this.haloOrbitLine.visible = (stageNum >= 5);

      switch (stageNum) {
        case 1: // Liftoff
          this.camera.position.set(0, 10, CONFIG.earthDistance + 35);
          this.camera.lookAt(0, 5, CONFIG.earthDistance + 12);
          this.audio.playBeep(650, 0.15);
          break;

        case 2: // Earth Orbit Raising
          this.camera.position.set(-25, 20, CONFIG.earthDistance + 25);
          this.camera.lookAt(0, 0, CONFIG.earthDistance);
          this.adityaCraft.position.set(12, 0, CONFIG.earthDistance);
          break;

        case 3: // TL1I Slingshot Burn
          this.camera.position.set(20, 25, CONFIG.earthDistance + 45);
          this.camera.lookAt(0, 0, 0);
          this.adityaCraft.position.set(0, 0, CONFIG.earthDistance + 25);
          break;

        case 4: // Cruise Phase
          this.camera.position.set(15, 18, 30);
          this.camera.lookAt(0, 0, CONFIG.sunDistance * 0.5);
          this.adityaCraft.position.set(0, 0, -10);
          break;

        case 5: // Halo Orbit Insertion
          this.camera.position.set(28, 22, 28);
          this.camera.lookAt(0, 0, 0);
          this.triggerCelebration();
          break;

        case 6: // 24/7 Solar Science
          this.camera.position.set(0, 12, 18);
          this.camera.lookAt(0, 0, 0);
          break;
      }

      this.speakStageFact();
    }

    updateStageUI() {
      const langData = TRANSLATIONS[this.lang];
      const stageData = langData.stages[this.stage - 1];

      // Update Titles
      document.getElementById('sunMainTitle').textContent = langData.missionTitle;
      document.getElementById('sunSubTitle').textContent = langData.missionSubtitle;

      // Update Timeline Pills
      document.querySelectorAll('.sun-stage-pill').forEach(pill => {
        const s = parseInt(pill.getAttribute('data-stage'), 10);
        pill.classList.toggle('active', s === this.stage);
      });

      // Update Fact Card
      document.getElementById('sunCardBadge').textContent = `STAGE ${stageData.id} OF 6`;
      document.getElementById('sunCardTitle').textContent = stageData.name;
      document.getElementById('sunCardSub').textContent = stageData.sub;
      document.getElementById('sunCardBody').textContent = stageData.desc;

      const list = document.getElementById('sunFactsList');
      list.innerHTML = '';
      stageData.facts.forEach(f => {
        const item = document.createElement('div');
        item.className = 'sun-fact-item';
        item.innerHTML = `<span style="color: #fbbf24; font-weight: bold;">✦</span><span>${f}</span>`;
        list.appendChild(item);
      });

      // Update Progress Track
      const pct = (this.stage / 6) * 100;
      document.getElementById('sunProgressFill').style.width = `${pct}%`;
      document.getElementById('sunProgressText').textContent = `PHASE ${this.stage} / 6: ${stageData.name.toUpperCase()}`;

      // Update Telemetry Panel
      this.updateTelemetryHUD();
    }

    updateTelemetryHUD() {
      const distances = [
        '235 km (Earth Orbit)', '73,000 km Apogee', '180,000 km Interplanetary',
        '850,000 km Deep Space', '1.5 Million km (L1 Halo)', '1.5 Million km Continuous'
      ];
      const sunFlux = [
        '1,361 W/m²', '1,365 W/m²', '1,372 W/m²', '1,385 W/m²', '1,390 W/m² (L1 Peak)', 'Active Telemetry'
      ];

      document.getElementById('sunValDistance').textContent = distances[this.stage - 1];
      document.getElementById('sunValFlux').textContent = sunFlux[this.stage - 1];
      document.getElementById('sunValOrbit').textContent = this.stage >= 5 ? 'HALO ORBIT (L1)' : 'TRANSFER TRAJECTORY';
    }

    // ------------------------------------------
    // SPACE WEATHER GUARDIAN (PLAYABLE MINI-GAME)
    // ------------------------------------------
    startGuardianMode() {
      this.mode = 'guardian';
      document.getElementById('sunStage').classList.add('sun-guardian-active');

      this.guardian.active = true;
      this.guardian.score = 0;
      this.guardian.earthHealth = 100;
      this.guardian.alertsSent = 0;
      this.guardian.timer = 0;
      this.guardian.currentEvent = null;

      this.camera.position.set(0, 18, 38);
      this.camera.lookAt(0, 0, 0);

      this.audio.playSolarFlareAlarm();
      if (this.isVoiceEnabled) {
        this.speakIntel('Space Weather Guardian System Online. Monitoring Sun for Coronal Mass Ejections and Solar Flares.');
      }
    }

    exitGuardianMode() {
      this.mode = 'story';
      this.guardian.active = false;
      document.getElementById('sunStage').classList.remove('sun-guardian-active');
      this.cmeParticleGroup.visible = false;
      this.goToStage(this.stage);
    }

    spawnSolarEvent() {
      const types = [
        { type: 'CME', name: 'Coronal Mass Ejection', inst: 'velc', desc: 'Billion tons of magnetized plasma expelled!' },
        { type: 'FLARE', name: 'X-Class Solar Flare', inst: 'solexs', desc: 'Intense X-ray flux burst detected!' },
        { type: 'WIND', name: 'High-Speed Solar Wind Surge', inst: 'aspex', desc: 'Solar proton & ion storm incoming!' }
      ];

      const chosen = types[Math.floor(Math.random() * types.length)];
      this.guardian.currentEvent = {
        ...chosen,
        progress: 0.0,
        z: CONFIG.sunDistance,
        alerted: false
      };

      this.audio.playSolarFlareAlarm();
      document.getElementById('sunThreatBanner').textContent = `ALERT: ${chosen.name.toUpperCase()} ERUPTING FROM SUN!`;
      document.getElementById('sunThreatBanner').style.color = '#ef4444';
      document.getElementById('sunAlertBtn').style.display = 'inline-block';
    }

    sendSpaceWeatherAlert() {
      if (!this.guardian.currentEvent) return;
      const ev = this.guardian.currentEvent;

      if (this.guardian.activeInstrument === ev.inst) {
        // MATCHING INSTRUMENT DETECTED IT PROPERLY!
        ev.alerted = true;
        this.guardian.score += 250;
        this.guardian.alertsSent++;
        this.audio.playAlertBroadcastSuccess();

        document.getElementById('sunThreatBanner').textContent = `ALERT SENT TO EARTH! SATELLITES & GRIDS SAFE.`;
        document.getElementById('sunThreatBanner').style.color = '#10b981';
        document.getElementById('sunAlertBtn').style.display = 'none';

        if (this.isVoiceEnabled) {
          this.speakIntel('Alert broadcast verified! Earth defense shields and satellite safing activated.');
        }
      } else {
        // WRONG INSTRUMENT
        this.audio.playBeep(350, 0.15);
        alert(this.lang === 'en'
          ? `Incorrect Instrument! Use ${ev.inst.toUpperCase()} to detect this event.`
          : `गलत उपकरण! इस घटना को पकड़ने के लिए ${ev.inst.toUpperCase()} चुनें।`);
      }

      this.updateGuardianHUD();
    }

    updateGuardianHUD() {
      document.getElementById('sunScoreVal').textContent = `${this.guardian.score} PTS`;
      document.getElementById('sunEarthHealthVal').textContent = `${this.guardian.earthHealth}%`;
      document.getElementById('sunAlertsVal').textContent = `${this.guardian.alertsSent}`;
    }

    triggerCelebration() {
      this.audio.playAlertBroadcastSuccess();
      if (!this.confettiCanvas || !this.confettiCtx) return;

      this.confettiCanvas.style.display = 'block';
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;

      this.confettiPieces = [];
      const colors = ['#FBBF24', '#F59E0B', '#F97316', '#FFFFFF', '#10B981'];
      for (let i = 0; i < 150; i++) {
        this.confettiPieces.push({
          x: Math.random() * this.confettiCanvas.width,
          y: -20 - Math.random() * 200,
          size: 6 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 4,
          vy: 2 + Math.random() * 4,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.1
        });
      }

      const animateC = () => {
        if (!this.confettiCtx || this.stage !== 5) {
          if (this.confettiCanvas) this.confettiCanvas.style.display = 'none';
          return;
        }
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        let active = false;
        this.confettiPieces.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vrot;

          this.confettiCtx.save();
          this.confettiCtx.translate(p.x, p.y);
          this.confettiCtx.rotate(p.rot);
          this.confettiCtx.fillStyle = p.color;
          this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          this.confettiCtx.restore();

          if (p.y < this.confettiCanvas.height + 20) active = true;
        });

        if (active && this.stage === 5) {
          requestAnimationFrame(animateC);
        } else {
          this.confettiCanvas.style.display = 'none';
        }
      };

      animateC();
    }

    // ------------------------------------------
    // DIALOGS: INSTRUMENTS & QUIZ
    // ------------------------------------------
    openInstrumentsModal() {
      const modal = document.getElementById('sunInstrumentsModal');
      const grid = document.getElementById('sunInstrumentsGrid');
      grid.innerHTML = '';

      INSTRUMENTS.forEach(inst => {
        const item = document.createElement('div');
        item.className = 'sun-inst-item';
        item.innerHTML = `
          <div style="font-size:0.68rem; font-family:monospace; color:#fbbf24; font-weight:bold;">${inst.badge}</div>
          <div style="font-size:1.05rem; font-weight:bold; color:#fff; margin:4px 0 6px 0;">${inst.name} (${inst.fullName})</div>
          <div style="font-size:0.82rem; line-height:1.45; color:#cbd5e1; margin-bottom:8px;">${inst.desc}</div>
          <div style="font-size:0.75rem; font-family:monospace; color:#06b6d4;"><strong>Primary Target:</strong> ${inst.targets}</div>
        `;
        grid.appendChild(item);
      });

      modal.classList.add('is-open');
    }

    openQuizModal() {
      const modal = document.getElementById('sunQuizModal');
      this.renderQuizQuestion(0, 0);
      modal.classList.add('is-open');
    }

    renderQuizQuestion(qIdx, score) {
      const container = document.getElementById('sunQuizContent');
      if (qIdx >= QUIZ_QUESTIONS.length) {
        // Quiz Complete
        container.innerHTML = `
          <div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(249,115,22,0.15));border:2px solid #fbbf24;border-radius:12px;padding:24px;text-align:center;">
            <div style="font-size:1.8rem;font-weight:700;margin-bottom:8px;color:#f59e0b;">ADITYA-L1</div>
            <div style="font-size:1.3rem;font-weight:800;color:#fbbf24;text-transform:uppercase;">ISRO SOLAR SCIENTIST & SPACE WEATHER GUARDIAN</div>
            <div style="font-size:0.85rem;color:#e2e8f0;margin:6px 0 16px 0;">This certificate honors your mastery of Aditya-L1 solar physics and space weather alert protocols!</div>
            <div style="font-size:1.1rem;color:#10b981;font-weight:bold;margin-bottom:12px;">Final Score: ${score} / ${QUIZ_QUESTIONS.length} (${Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)</div>
            <button class="sun-btn gold" id="btnRestartSunQuiz">Retake Solar Quiz</button>
          </div>
        `;
        document.getElementById('btnRestartSunQuiz').addEventListener('click', () => {
          this.renderQuizQuestion(0, 0);
        });
        return;
      }

      const q = QUIZ_QUESTIONS[qIdx];
      container.innerHTML = `
        <div style="margin-top:12px;">
          <div style="font-size:0.75rem;color:#fbbf24;font-family:monospace;margin-bottom:6px;">QUESTION ${qIdx + 1} OF ${QUIZ_QUESTIONS.length}</div>
          <div style="font-size:1.05rem;font-weight:700;margin-bottom:14px;color:#fff;">${q.q}</div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px;" id="sunQuizOptions"></div>
          <div id="sunQuizExpl" style="display:none;padding:10px;border-radius:6px;font-size:0.85rem;margin-bottom:12px;"></div>
          <button class="sun-btn" id="btnNextSunQ" style="display:none;margin-left:auto;">Next Question →</button>
        </div>
      `;

      const optionsDiv = document.getElementById('sunQuizOptions');
      const explDiv = document.getElementById('sunQuizExpl');
      const nextBtn = document.getElementById('btnNextSunQ');

      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.style.padding = '10px 14px';
        btn.style.background = 'rgba(15,23,42,0.8)';
        btn.style.border = '1px solid rgba(251,191,36,0.2)';
        btn.style.borderRadius = '8px';
        btn.style.color = '#cbd5e1';
        btn.style.fontSize = '0.88rem';
        btn.style.cursor = 'pointer';
        btn.style.textAlign = 'left';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          const isCorrect = (idx === q.correct);
          btn.style.background = isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)';
          btn.style.borderColor = isCorrect ? '#10b981' : '#ef4444';
          btn.style.color = '#fff';
          this.audio.playBeep(isCorrect ? 880 : 320, 0.1);

          Array.from(optionsDiv.children).forEach(b => b.disabled = true);
          explDiv.style.display = 'block';
          explDiv.style.background = isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)';
          explDiv.style.border = isCorrect ? '1px solid #10b981' : '1px solid #ef4444';
          explDiv.textContent = q.expl;

          nextBtn.style.display = 'inline-flex';
          nextBtn.onclick = () => {
            this.renderQuizQuestion(qIdx + 1, score + (isCorrect ? 1 : 0));
          };
        });
        optionsDiv.appendChild(btn);
      });
    }

    openHaloScienceModal() {
      document.getElementById('sunHaloModal').classList.add('is-open');
    }

    speakStageFact() {
      if (!this.isVoiceEnabled || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const stageData = TRANSLATIONS[this.lang].stages[this.stage - 1];
      const text = `${stageData.name}. ${stageData.desc}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = (this.lang === 'hi') ? 'hi-IN' : 'en-IN';
      utterance.rate = 1.0;
      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }

    speakIntel(text) {
      if (!this.isVoiceEnabled || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = (this.lang === 'hi') ? 'hi-IN' : 'en-US';
      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }

    toggleVoice() {
      this.isVoiceEnabled = !this.isVoiceEnabled;
      const btn = document.getElementById('sunVoiceBtn');
      if (btn) btn.textContent = this.isVoiceEnabled ? 'Voice: ON' : 'Voice: OFF';
      if (this.isVoiceEnabled) this.speakStageFact();
      else if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    toggleLanguage() {
      this.lang = (this.lang === 'en' ? 'hi' : 'en');
      const btn = document.getElementById('sunLangBtn');
      if (btn) btn.textContent = (this.lang === 'en' ? 'हिन्दी' : 'EN');
      this.updateStageUI();
    }

    // ------------------------------------------
    // EVENT LISTENERS & INPUTS
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

      // Stage Navigation
      document.getElementById('sunBtnPrev').addEventListener('click', () => this.goToStage(this.stage - 1));
      document.getElementById('sunBtnNext').addEventListener('click', () => this.goToStage(this.stage + 1));

      // Stage Pills
      document.querySelectorAll('.sun-stage-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const s = parseInt(pill.getAttribute('data-stage'), 10);
          this.goToStage(s);
        });
      });

      // Scroll to Advance
      let lastScroll = 0;
      window.addEventListener('wheel', (e) => {
        const stage = document.getElementById('sunStage');
        if (!stage || stage.style.display === 'none' || this.mode === 'guardian') return;
        const now = Date.now();
        if (now - lastScroll < 700) return;
        lastScroll = now;
        if (e.deltaY > 20) this.goToStage(this.stage + 1);
        else if (e.deltaY < -20) this.goToStage(this.stage - 1);
      }, { passive: true });

      // Action Buttons
      document.getElementById('sunBtnGuardian').addEventListener('click', () => this.startGuardianMode());
      document.getElementById('sunBtnExitGuardian').addEventListener('click', () => this.exitGuardianMode());
      document.getElementById('sunBtnInstruments').addEventListener('click', () => this.openInstrumentsModal());
      document.getElementById('sunBtnQuiz').addEventListener('click', () => this.openQuizModal());
      document.getElementById('sunBtnHaloInfo').addEventListener('click', () => this.openHaloScienceModal());
      document.getElementById('sunVoiceBtn').addEventListener('click', () => this.toggleVoice());
      document.getElementById('sunLangBtn').addEventListener('click', () => this.toggleLanguage());
      document.getElementById('sunAudioBtn').addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        document.getElementById('sunAudioBtn').textContent = isMuted ? 'Audio: MUTED' : 'Audio: ON';
      });

      // Instrument Selection Tabs in Guardian Mode
      document.querySelectorAll('.sun-inst-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('.sun-inst-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.guardian.activeInstrument = tab.getAttribute('data-inst');
          this.audio.playBeep(850, 0.05);
        });
      });

      // Alert Button
      document.getElementById('sunAlertBtn').addEventListener('click', () => this.sendSpaceWeatherAlert());

      // Close Dialogs
      document.querySelectorAll('.sun-dialog-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.target.closest('.sun-dialog-overlay').classList.remove('is-open');
        });
      });
    }

    // ------------------------------------------
    // MAIN 60 FPS SIMULATION LOOP
    // ------------------------------------------
    animate() {
      requestAnimationFrame(() => this.animate());

      const dt = 0.016;
      this.simTime += dt;

      // 1. Animate Boiling Sun & Glow Aura
      if (this.sunMesh) {
        this.sunMesh.rotation.y += 0.002;
      }
      if (this.sunGlow) {
        const s = 1.0 + Math.sin(this.simTime * 3.0) * 0.02;
        this.sunGlow.scale.set(s, s, s);
      }

      // 2. Animate Aditya-L1 along 3D Halo Orbit
      if (this.stage >= 5 || this.mode === 'guardian') {
        this.haloAngle += 0.015;
        const hx = Math.cos(this.haloAngle) * CONFIG.haloRadiusX;
        const hy = Math.sin(this.haloAngle) * CONFIG.haloRadiusY;
        const hz = Math.sin(2 * this.haloAngle) * CONFIG.haloRadiusZ * 0.35;
        this.adityaCraft.position.set(hx, hy, hz);
        this.adityaCraft.lookAt(0, 0, CONFIG.sunDistance); // Solar panels face the Sun!
      }

      // 3. Animate Solar Wind Streaming toward Earth
      if (this.solarWindParticles) {
        const pArr = this.solarWindParticles.geometry.attributes.position.array;
        for (let i = 0; i < pArr.length / 3; i++) {
          pArr[i * 3 + 2] -= 45.0 * dt;
          if (pArr[i * 3 + 2] < CONFIG.earthDistance - 20) {
            pArr[i * 3 + 2] = CONFIG.sunDistance;
          }
        }
        this.solarWindParticles.geometry.attributes.position.needsUpdate = true;
      }

      // 4. Space Weather Guardian Event Simulation
      if (this.mode === 'guardian') {
        this.guardian.timer += dt;
        if (this.guardian.timer > CONFIG.eventInterval && !this.guardian.currentEvent) {
          this.guardian.timer = 0;
          this.spawnSolarEvent();
        }

        if (this.guardian.currentEvent) {
          const ev = this.guardian.currentEvent;
          ev.z -= CONFIG.cmeSpeed * dt;

          this.cmeParticleGroup.visible = true;
          this.cmeParticleGroup.position.set(0, 0, ev.z);
          const cmeScale = 1.0 + (CONFIG.sunDistance - ev.z) * 0.05;
          this.cmeParticleGroup.scale.set(cmeScale, cmeScale, cmeScale);

          // CME passes Earth
          if (ev.z <= CONFIG.earthDistance) {
            if (!ev.alerted) {
              // MISSED CME! Damage Earth
              this.guardian.earthHealth = Math.max(0, this.guardian.earthHealth - 25);
              this.audio.playSolarFlareAlarm();
              document.getElementById('sunThreatBanner').textContent = 'WARNING: CME IMPACTED EARTH! SATELLITE DISRUPTIONS OCCURRED.';
              document.getElementById('sunThreatBanner').style.color = '#ef4444';
            }
            this.guardian.currentEvent = null;
            this.cmeParticleGroup.visible = false;
            document.getElementById('sunAlertBtn').style.display = 'none';
            this.updateGuardianHUD();
          }
        }
      }

      // Render Scene
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }

  // Export engine to window
  window.AdityaL1Engine = new AdityaL1Engine();

})();
