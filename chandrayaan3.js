/**
 * ============================================================================
 * MISSION CHANDRAYAAN-3: 3D SIMULATION & LUNAR LANDING EXPERIENCE
 * Built for VYOM 1.0 - ISRO Space Exploration Protocol
 * Complete browser-based 3D simulation, interactive pilot mode & educational hub
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================
  // 1. CONFIGURATION & TUNABLE PARAMETERS
  // ==========================================
  const CONFIG = {
    lunarGravity: 1.62,           // m/s^2 (Moon gravity is ~1/6th of Earth)
    mainThrustPower: 3.8,         // Lander main engine acceleration (m/s^2)
    rcsTorque: 28.0,              // Attitude rotation rate (deg/s)
    maxSafeVerticalSpeed: 2.2,    // Max soft-touchdown vertical speed (m/s)
    maxSafeHorizontalSpeed: 1.2,  // Max soft-touchdown horizontal speed (m/s)
    maxSafeTiltAngle: 10.0,       // Max safe tilt angle (degrees)
    fuelBurnRate: 1.4,            // Fuel % consumed per second of full thrust
    startAltitude: 800,           // Initial landing simulator altitude (meters)
    initialFuel: 100,             // Starting fuel (%)
    targetCoordinates: '69.37° S, 32.35° E', // Shiv Shakti Point (Lunar South Pole)
  };

  // ==========================================
  // 2. BILINGUAL TRANSLATIONS (EN & HI)
  // ==========================================
  const TRANSLATIONS = {
    en: {
      missionTitle: 'Mission Chandrayaan-3',
      missionSubtitle: 'ISRO LUNAR EXPLORATION PROTOCOL',
      storyModeBtn: 'Cinematic Story',
      pilotModeBtn: '🎮 Pilot Vikram',
      instrumentsBtn: '🔬 Real Instruments',
      quizBtn: '🏆 Mission Quiz',
      c2c3Btn: '🚀 C-2 vs C-3 Story',
      prevBtn: '← Previous',
      nextBtn: 'Next Stage →',
      narratorOn: '🎙️ Voice: ON',
      narratorOff: '🎙️ Voice: OFF',
      soundOn: '🔊 Audio: ON',
      soundOff: '🔇 Audio: MUTED',
      stages: [
      {
              "id": 1,
              "name": "Liftoff at Sriharikota",
              "sub": "LVM3 M4 \"Bahubali\" Launch • July 14, 2023",
              "desc": "India’s heaviest and most powerful rocket, nicknamed \"Bahubali\", roars into the sky from Sriharikota with tremendous power! Twin giant white boosters fire together, blasting Chandrayaan-3 high above Earth’s clouds.",
              "facts": [
                      "LVM3 is as tall as a 14-story building (43.5 meters) and weighs as much as 130 elephants!",
                      "A protective nose cone guarded the spacecraft until it passed through Earth’s thick atmosphere.",
                      "The solid rocket boosters produce massive thrust to escape Earth’s gravity pull."
              ]
      },
      {
              "id": 2,
              "name": "Earth Orbit Slingshot",
              "sub": "5 Gravity Boosts • July 15 - 25, 2023",
              "desc": "Instead of burning huge amounts of expensive rocket fuel, ISRO used a genius cosmic trick: Earth’s own gravity! The engine fired 5 times, looping wider and wider like a cosmic slingshot out to 127,600 km.",
              "facts": [
                      "Using gravity like a slingshot saved millions of dollars in rocket fuel.",
                      "With each loop around Earth, the spaceship gained speed and flew higher.",
                      "At its closest zoom past Earth, the spacecraft travelled at an astonishing 37,000 km/h!"
              ]
      },
      {
              "id": 3,
              "name": "Trans-Lunar Injection",
              "sub": "Slingshot to the Moon • August 1, 2023",
              "desc": "On August 1, the spacecraft fired its engine for the big leap! This powerful push broke Chandrayaan-3 free from Earth’s orbit, aiming it directly on a 4-day cruise across deep space toward the Moon.",
              "facts": [
                      "The spacecraft travelled over 384,000 km across the dark void between Earth and the Moon.",
                      "It coasted in weightless zero gravity for four days.",
                      "Scientists calculated the flight path so accurately that they hit the target within seconds!"
              ]
      },
      {
              "id": 4,
              "name": "Lunar Orbit Capture",
              "sub": "Slowing Down at the Moon • August 5 - 16, 2023",
              "desc": "As Chandrayaan-3 reached the Moon, reverse rocket thrusters fired like high-tech space brakes. This slowed the craft just enough for the Moon’s gentle gravity to catch it into lunar orbit.",
              "facts": [
                      "Firing reverse thrusters acts just like stepping on the brakes of a car.",
                      "The orbit was gently lowered in 4 steps until it was orbiting just 100 km above the Moon.",
                      "The onboard cameras beamed back crystal-clear photos of lunar craters and mountains."
              ]
      },
      {
              "id": 5,
              "name": "Lander Separation",
              "sub": "Vikram Bids Farewell to PM • August 17, 2023",
              "desc": "The Vikram Lander (carrying the rover Pragyan inside its belly) unlocked and separated smoothly from the Propulsion Module in Moon orbit, ready to begin its descent to the surface.",
              "facts": [
                      "Vikram was named after Dr. Vikram Sarabhai, the father of India’s space program.",
                      "The mother ship remained safely in orbit to act as a space communication relay to Earth.",
                      "Special gentle springs pushed Vikram away without bumping."
              ]
      },
      {
              "id": 6,
              "name": "The Powered Descent",
              "sub": "Slowing Down from 30 km High • August 23, 2023",
              "desc": "The famous \"20 minutes of suspense\"! Vikram fired all 4 bottom engines downward to slow down from supersonic speed. Automatic laser sensors scanned the rocky lunar ground below to find a safe, flat spot.",
              "facts": [
                      "Vikram slowed down from 6,000 km/h all the way to a gentle walking speed!",
                      "Laser eyes and cameras took photos every millisecond to avoid large rocks and deep holes.",
                      "The lander’s onboard computer made all landing choices completely on its own!"
              ]
      },
      {
              "id": 7,
              "name": "Historic Touchdown!",
              "sub": "Shiv Shakti Point • August 23, 2023 at 18:04 IST",
              "desc": "History was made! India became the FIRST country in human history to land near the Moon’s mysterious South Pole! The landing site was officially named \"Shiv Shakti Point\".",
              "facts": [
                      "India is now celebrated worldwide as the 4th country to successfully land on the Moon!",
                      "Because the Moon has no air or wind, dust settled down within seconds of touchdown.",
                      "August 23 is now celebrated across India every year as National Space Day!"
              ]
      },
      {
              "id": 8,
              "name": "Pragyan Rover Rolls Out",
              "sub": "Leaving Tracks on the Moon • August 24, 2023",
              "desc": "A ramp lowered from Vikram’s side, and out rolled Pragyan—a 6-wheeled robotic space explorer! Its wheels were specially engraved to leave the Indian Ashoka Chakra and ISRO emblem in the moon dust.",
              "facts": [
                      "The rover wheels leave India’s National Emblem stamped permanently into the lunar soil.",
                      "With its rocker-bogie wheels, Pragyan can easily climb over rocks and bumpy ground.",
                      "Pragyan talks to Vikram, and Vikram beams the discoveries back to scientists on Earth!"
              ]
      },
      {
              "id": 9,
              "name": "Discoveries on the Moon",
              "sub": "Exploring the Lunar Soil • Shiv Shakti Point",
              "desc": "Pragyan explored the surface, firing laser beams at rocks to uncover what the Moon is made of! It made the incredible discovery of Sulfur (S) on the Moon’s South Pole.",
              "facts": [
                      "Pragyan proved the presence of Sulfur, Iron, Titanium, Calcium, and Aluminum in the soil.",
                      "A heat probe showed surface dust was warm (+60°C), but just 8 cm below the dirt it was freezing (-10°C)!",
                      "A moonquake detector heard a real lunar seismic rumble on August 26, 2023."
              ]
      }
]
    },
    hi: {
      missionTitle: 'मिशन चंद्रयान-3',
      missionSubtitle: 'इसरो चंद्र अन्वेषण प्रोटोकॉल',
      storyModeBtn: 'सिनेमैटिक कहानी',
      pilotModeBtn: '🎮 विक्रम लैंडर चलाएं',
      instrumentsBtn: '🔬 वैज्ञानिक उपकरण',
      quizBtn: '🏆 मिशन क्विज',
      c2c3Btn: '🚀 C-2 vs C-3 सीख',
      prevBtn: '← पिछला',
      nextBtn: 'अगला चरण →',
      narratorOn: '🎙️ आवाज़: चालू',
      narratorOff: '🎙️ आवाज़: बंद',
      soundOn: '🔊 ध्वनि: चालू',
      soundOff: '🔇 ध्वनि: म्यूट',
      stages: [
        {
          id: 1,
          name: 'श्रीहरिकोटा से भव्य प्रक्षेपण',
          sub: 'एलवीएम3 एम4 "बाहुबली" लॉन्च • 14 जुलाई 2023',
          desc: 'सतीश धवन अंतरिक्ष केंद्र, श्रीहरिकोटा से भारत का सबसे शक्तिशाली रॉकेट LVM3 M4 10,000 kN थ्रस्ट के साथ अंतरिक्ष में उड़ा। ट्विन S200 सॉलिड बूस्टर्स ने चंद्रयान-3 को वायुमंडल के पार पहुंचाया।',
          facts: [
            'LVM3 की ऊंचाई 43.5 मीटर और कुल वजन 640 टन है।',
            '115 किमी की ऊंचाई पर पेलोड फेयरिंग अलग हुई।',
            'S200 स्ट्रैप-ऑन सॉलिड मोटर्स दुनिया के तीसरे सबसे बड़े सॉलिड बूस्टर हैं।'
          ]
        },
        {
          id: 2,
          name: 'पृथ्वी की कक्षा का विस्तार',
          sub: '5 गुरुत्वाकर्षण थ्रस्ट बर्न्स • 15 - 25 जुलाई 2023',
          desc: 'सीधे चंद्रमा की ओर भागने के बजाय, इसरो ने भौतिकी और गुरुत्वाकर्षण का चतुराई से उपयोग किया। प्रोपल्शन मॉड्यूल ने 5 बार इंजन फायर कर कक्षा को 1,27,600 किमी तक बढ़ाया।',
          facts: [
            'पृथ्वी के गुरुत्वाकर्षण स्लिंगशॉट से करोड़ों रुपये का ईंधन बचा।',
            'ईबीएन-1 से लेकर ईबीएन-5 तक 5 चरणों में कक्षा बढ़ाई गई।',
            'पृथ्वी के सबसे नजदीकी बिंदु पर गति 37,000 किमी/घंटा तक पहुंची।'
          ]
        },
        {
          id: 3,
          name: 'ट्रांस-लूनर इंजेक्शन',
          sub: 'चंद्रमा की ओर स्लिंगशॉट • 1 अगस्त 2023',
          desc: '1 अगस्त की मध्यरात्रि में अंतिम ट्रांस-लूनर इंजेक्शन बर्न पूरा हुआ। इसने चंद्रयान-3 को पृथ्वी के गुरुत्वाकर्षण से मुक्त कर चंद्रमा की ओर सटीक पथ पर धकेल दिया।',
          facts: [
            'अंतरिक्ष यान ने चंद्रमा तक 3,84,000 किमी से अधिक की दूरी तय की।',
            'चार दिनों तक अंतरिक्ष यान शून्य-गुरुत्वाकर्षण में आगे बढ़ा।',
            'इस सटीक पथ गणना के लिए सेकंड के सौवें हिस्से की सटीकता आवश्यक थी।'
          ]
        },
        {
          id: 4,
          name: 'चंद्रमा की कक्षा में प्रवेश',
          sub: 'चंद्रमा की पकड़ और कक्षा घटाना • 5 - 16 अगस्त 2023',
          desc: 'चंद्रमा के निकट पहुंचते ही उल्टे थ्रस्टर्स चालू हुए, जिससे चंद्रमा के गुरुत्वाकर्षण ने यान को 164 x 18,074 किमी की कक्षा में पकड़ लिया। फिर इसे घटाकर 100 किमी की गोलाकार कक्षा बनाया गया।',
          facts: [
            'रेट्रो-बर्न ने एक उच्च-सटीक अंतरिक्ष ब्रेक की तरह काम किया।',
            'कक्षा को क्रमशः 170 किमी, 150 किमी और अंत में 100 किमी तक लाया गया।',
            'यान ने चंद्रमा के गड्ढों की आश्चर्यजनक तस्वीरें भेजीं।'
          ]
        },
        {
          id: 5,
          name: 'विक्रम लैंडर का पृथक्करण',
          sub: 'प्रोपल्शन मॉड्यूल से विदाई • 17 अगस्त 2023',
          desc: '100 किमी की चंद्र कक्षा में विक्रम लैंडर प्रोपल्शन मॉड्यूल से सुरक्षित अलग हो गया। प्रोपल्शन मॉड्यूल वहीं रहकर पृथ्वी के वायुमंडल का अध्ययन (SHAPE) करने लगा।',
          facts: [
            'पायरोटेक्निक लैच के जरिए कोमल पृथक्करण संपन्न हुआ।',
            'विक्रम ने डी-बूस्ट बर्न कर अपनी न्यूनतम ऊंचाई केवल 25 किमी तक कर ली।',
            'विक्रम का नाम भारतीय अंतरिक्ष कार्यक्रम के जनक डॉ. विक्रम साराभाई के नाम पर रखा गया है।'
          ]
        },
        {
          id: 6,
          name: 'पावर्ड डिसेंट (अंतिम लैंडिंग)',
          sub: 'खौफ के 20 मिनट • 23 अगस्त 2023',
          desc: 'विक्रम ने अपने चारों 800 N इंजनों को चालू कर 1.68 किमी/सेकंड की तेज गति को धीमा किया। लेज़र डॉपलर वेलोसीमीटर और कैमरों ने हर सेकंड सुरक्षित समतल जमीन की तलाश की।',
          facts: [
            'रफ ब्रेकिंग चरण में ऊंचाई 30 किमी से घटकर 800 मीटर रह गई।',
            'हजार्ड कैमरों ने चट्टानों से बचने के लिए वास्तविक समय में तस्वीरें लीं।',
            'लैंडर ने हवा के झोंकों और सेंसर त्रुटियों को अपने आप ठीक किया।'
          ]
        },
        {
          id: 7,
          name: 'ऐतिहासिक लैंडिंग (टचडाउन)',
          sub: 'शिव शक्ति बिंदु • 23 अगस्त 2023, शाम 18:04 IST',
          desc: 'भारत ने रचा इतिहास! चंद्रमा के दक्षिणी ध्रुव पर उतरने वाला भारत दुनिया का पहला देश और सॉफ्ट-लैंडिंग करने वाला चौथा देश बन गया। इस स्थान का नाम "शिव शक्ति पॉइंट" रखा गया।',
          facts: [
            'लैंडिंग निर्देशांक: 69.37° दक्षिण, 32.35° पूर्व।',
            'वातावरण न होने के कारण थ्रस्टर की धूल कुछ ही पलों में शांत हो गई।',
            'भारत में अब 23 अगस्त को प्रतिवर्ष "राष्ट्रीय अंतरिक्ष दिवस" मनाया जाता है।'
          ]
        },
        {
          id: 8,
          name: 'प्रज्ञान रोवर का बाहर निकलना',
          sub: 'अशोक चक्र की अमर छाप • 24 अगस्त 2023',
          desc: 'विक्रम का रैंप खुला। छह पहियों वाला 26 किलोग्राम का प्रज्ञान रोवर अपने सौर पैनल खोलकर चांद की मिट्टी पर उतरा। इसके पहियों पर इसरो का लोगो और राष्ट्रीय प्रतीक (अशोक चक्र) छपे हैं।',
          facts: [
            'पहियों के निशान चांद की मिट्टी पर सदियों तक अमिट रहेंगे।',
            'रॉकर-बोगी सस्पेंशन 50 मिमी ऊंची चट्टानों पर भी आसानी से चढ़ जाता है।',
            'प्रज्ञान सीधे विक्रम से और विक्रम चंद्रयान-2 ऑर्बिटर के जरिए पृथ्वी से जुड़ता है।'
          ]
        },
        {
          id: 9,
          name: 'चांद की सतह पर खोज',
          sub: 'सल्फर की ऐतिहासिक पुष्टि • शिव शक्ति पॉइंट',
          desc: 'प्रज्ञान रोवर ने लेजर स्पेक्ट्रोमीटर (LIBS) से चांद की मिट्टी का परीक्षण किया और पहली बार चंद्र दक्षिणी ध्रुव पर सल्फर (गंधक) की पुष्ट उपस्थिति की खोज कर विज्ञान जगत को चौंका दिया।',
          facts: [
            'सल्फर, लोहा, टाइटेनियम, कैल्शियम और एल्युमीनियम की पुष्टि की।',
            'चास्टे (ChaSTE) सेंसर ने सतह पर +60°C और सिर्फ 8 सेमी नीचे -10°C तापमान मापा!',
            'इल्सा (ILSA) सीस्मोमीटर ने चांद पर प्राकृतिक भूकंपीय तरंगें दर्ज कीं।'
          ]
        }
      ]
    }
  };

  // ==========================================
  // 3. SCIENTIFIC INSTRUMENTS DATA
  // ==========================================
  const INSTRUMENTS = [
    {
      craft: 'Vikram Lander',
      name: 'ChaSTE',
      fullName: "Chandra's Surface Thermophysical Experiment",
      badge: 'Thermal Probe',
      desc: 'Penetrated 10 cm into the lunar soil with 10 temperature sensors. Discovered a surprising temperature drop from +60°C at the top regolith to -10°C just 8 cm below!',
      finding: 'Surface: +60°C | Depth 8cm: -10°C (Incredible thermal insulation of lunar regolith)'
    },
    {
      craft: 'Vikram Lander',
      name: 'ILSA',
      fullName: 'Instrument for Lunar Seismic Activity',
      badge: 'Seismometer',
      desc: 'High-precision micro-electro-mechanical system (MEMS) seismometer that measured ground vibrations caused by Pragyan rover movements and natural lunar moonquakes.',
      finding: 'Recorded lunar seismic event on Aug 26, 2023 — proving active lunar geology'
    },
    {
      craft: 'Vikram Lander',
      name: 'RAMBHA-LP',
      fullName: 'Radio Anatomy of Moon Bound Hypersensitive ionosphere and Atmosphere',
      badge: 'Plasma Probe',
      desc: 'A Langmuir probe that measured near-surface lunar plasma density and how it changes under solar illumination at the polar latitudes.',
      finding: 'Measured sparse electron density: 5 to 30 million electrons/m³'
    },
    {
      craft: 'Pragyan Rover',
      name: 'LIBS',
      fullName: 'Laser-Induced Breakdown Spectroscope',
      badge: 'Laser Chemical Scanner',
      desc: 'Fired high-energy laser pulses at lunar soil, creating localized micro-plasma, and analyzed the spectral light emission to identify elements unambiguously.',
      finding: 'FIRST-EVER in-situ confirmation of Sulfur (S) on the Lunar South Pole!'
    },
    {
      craft: 'Pragyan Rover',
      name: 'APXS',
      fullName: 'Alpha Particle X-Ray Spectrometer',
      badge: 'Radiation Detector',
      desc: 'Emitted alpha particles and X-rays from radioactive Curium-244 to determine the elemental composition of regolith and rocks near the landing site.',
      finding: 'Identified major rock-forming elements: Al, Si, Ca, Fe, Ti, Cr, and Mn'
    },
    {
      craft: 'Propulsion Module',
      name: 'SHAPE',
      fullName: 'Spectro-polarimetry of Habitable Planet Earth',
      badge: 'Exoplanet Benchmark',
      desc: 'Observes Earth in reflected light and near-infrared from lunar orbit to establish a baseline signature for discovering habitable habitable exoplanets across deep space.',
      finding: 'Earth is being observed as a habitable benchmark for exoplanet searches'
    }
  ];

  // ==========================================
  // 4. MISSION QUIZ (5 QUESTIONS WITH BADGE)
  // ==========================================
  const QUIZ_QUESTIONS = [
    {
      q: 'Where did Chandrayaan-3 land on the Moon on August 23, 2023?',
      options: [
        'Near the Lunar South Pole (Shiv Shakti Point)',
        'Near the Lunar North Pole',
        'Sea of Tranquility',
        'Far side inside South Pole-Aitken basin'
      ],
      correct: 0,
      expl: 'Correct! Chandrayaan-3 made history by becoming the first spacecraft to soft-land near the Lunar South Pole (69.37° S, 32.35° E), officially named Shiv Shakti Point.'
    },
    {
      q: 'Which vital element did the Pragyan rover unequivocally confirm on the lunar south pole for the first time?',
      options: ['Helium-3', 'Sulfur (S)', 'Gold', 'Liquid Nitrogen'],
      correct: 1,
      expl: 'Correct! Pragyan’s LIBS instrument confirmed the presence of Sulfur (S), an essential element for future planetary research and life support.'
    },
    {
      q: 'What is the name of the heavy-lift ISRO launch vehicle that launched Chandrayaan-3?',
      options: ['PSLV-C57', 'LVM3 M4 ("Bahubali")', 'GSLV Mk II', 'SSLV-D2'],
      correct: 1,
      expl: 'Correct! The LVM3 M4 (Launch Vehicle Mark-3), affectionately nicknamed "Bahubali" for its heavy-lift capability, launched Chandrayaan-3.'
    },
    {
      q: 'Why did ISRO use multiple Earth orbit-raising burns instead of a single direct burn?',
      options: [
        'To test radio signals',
        'To save immense fuel using Earth’s gravity slingshot effect',
        'Because the Moon was too far to aim directly',
        'To wait for night time on Earth'
      ],
      correct: 1,
      expl: 'Correct! The gravity slingshot technique allowed Chandrayaan-3 to reach the Moon with a modest 440 N engine and minimal propellant cost.'
    },
    {
      q: 'What important improvements helped Chandrayaan-3 land safely where Chandrayaan-2 struggled?',
      options: [
        'Stronger shock-absorbing legs, a wider landing area, and smart laser cameras to spot rocks',
        'Parachutes and airbags',
        'Lighter rover and smaller battery',
        'Landing on water instead of rock'
      ],
      correct: 0,
      expl: 'Correct! ISRO followed a "failure-based design philosophy", expanding the landing area to 4x2.4 km, upgrading leg suspension, and adding Laser Doppler Velocimeters.'
    }
  ];

  // ==========================================
  // 5. AUDIO SYNTHESIZER (WEB AUDIO API)
  // ==========================================
  class AudioSynth {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    playBeep(freq = 880, duration = 0.08, type = 'sine') {
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

    playThrusterSound(duration = 0.2) {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.15;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(350, this.ctx.currentTime);
        filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
      } catch (e) {}
    }

    playLaunchRoar() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        // Deep sub-bass rumble + noise hiss
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(45, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(95, this.ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 1.5);
        this.playThrusterSound(0.8);
      } catch (e) {}
    }

    playTouchdownChime() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        // Grand celebratory arpeggio: C4 -> G4 -> C5 -> E5
        const notes = [261.63, 392.00, 523.25, 659.25];
        notes.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.15);
          gain.gain.setValueAtTime(0, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.15 + 0.6);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + i * 0.15);
          osc.stop(this.ctx.currentTime + i * 0.15 + 0.65);
        });
      } catch (e) {}
    }

    playCrashSound() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
      } catch (e) {}
    }
  }

  // ==========================================
  // 6. MAIN CHANDRAYAAN-3 ENGINE CLASS
  // ==========================================
  class Chandrayaan3Engine {
    constructor() {
      this.audio = new AudioSynth();
      this.lang = 'en';
      this.stage = 1;
      this.mode = 'story'; // 'story' | 'playable' | 'rover'
      this.isVoiceEnabled = true;
      this.isInitialized = false;

      // Three.js References
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.canvas = null;
      this.animFrameId = null;

      // 3D Objects in Scene
      this.earthGroup = null;
      this.moonGroup = null;
      this.rocketGroup = null;
      this.pmGroup = null;
      this.landerGroup = null;
      this.roverGroup = null;
      this.orbitLinesGroup = null;
      this.particleSystem = null;
      this.particles = [];
      this.dustParticles = [];
      this.sunLight = null;

      // Playable Landing Simulator State
      this.sim = {
        active: false,
        altitude: CONFIG.startAltitude,
        vy: 12.0,      // initial downward descent speed (m/s)
        vx: 0.0,
        x: 0.0,
        fuel: CONFIG.initialFuel,
        tilt: 0.0,     // degrees
        thrustOn: false,
        tiltLeft: false,
        tiltRight: false,
        landed: false,
        crashed: false,
        score: 0
      };

      // Pragyan Rover Driving State
      this.roverSim = {
        x: 0,
        z: 3,
        rotation: 0,
        speed: 0,
        keys: { w: false, s: false, a: false, d: false }
      };

      // Mission Clock
      this.missionClockSec = 0;
      this.clockTimer = null;

      // Confetti canvas
      this.confettiCanvas = null;
      this.confettiCtx = null;
      this.confettiPieces = [];
    }

    init() {
      if (this.isInitialized) return;
      this.canvas = document.getElementById('c3Canvas');
      if (!this.canvas) return;

      this.confettiCanvas = document.getElementById('c3ConfettiCanvas');
      if (this.confettiCanvas) {
        this.confettiCtx = this.confettiCanvas.getContext('2d');
      }

      this.setupThreeScene();
      this.setupSpacecraftModels();
      this.setupOrbitLines();
      this.setupEventListeners();
      this.startMissionClock();

      this.isInitialized = true;
      this.goToStage(1);
      this.animate();
    }

    // ------------------------------------------
    // 3D SCENE SETUP
    // ------------------------------------------
    setupThreeScene() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x02040a);

      this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
      this.camera.position.set(0, 15, 60);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x223355, 0.7);
      this.scene.add(ambientLight);

      this.sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
      this.sunLight.position.set(200, 100, 150);
      this.sunLight.castShadow = true;
      this.scene.add(this.sunLight);

      // Starfield
      this.createStarfield();

      // Earth & Moon
      this.createEarth();
      this.createMoon();
    }

    createStarfield() {
      const count = 3000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const radius = 600 + Math.random() * 600;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Tint stars subtle white, blue, yellow
        const tone = Math.random();
        if (tone > 0.8) {
          colors[i * 3] = 0.7; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 1.0;
        } else if (tone > 0.6) {
          colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 0.7;
        } else {
          colors[i * 3] = 0.95; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 0.95;
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 1.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
      });

      const stars = new THREE.Points(geometry, material);
      this.scene.add(stars);
    }

    createEarth() {
      this.earthGroup = new THREE.Group();

      // Earth sphere with procedural ocean and continent shaders
      const sphereGeo = new THREE.SphereGeometry(18, 64, 64);
      const earthMat = new THREE.MeshPhongMaterial({
        color: 0x1d4ed8,
        specular: 0x3b82f6,
        shininess: 25,
        wireframe: false
      });
      const earthMesh = new THREE.Mesh(sphereGeo, earthMat);
      this.earthGroup.add(earthMesh);

      // Continent landmass patches
      const continentGeo = new THREE.SphereGeometry(18.06, 32, 32);
      const continentMat = new THREE.MeshLambertMaterial({
        color: 0x15803d,
        transparent: true,
        opacity: 0.85
      });
      const continents = new THREE.Mesh(continentGeo, continentMat);
      this.earthGroup.add(continents);

      // Atmosphere Fresnel glow ring
      const atmoGeo = new THREE.SphereGeometry(19.2, 32, 32);
      const atmoMat = new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.18,
        side: THREE.BackSide
      });
      const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
      this.earthGroup.add(atmoMesh);

      this.earthGroup.position.set(-60, 0, -40);
      this.scene.add(this.earthGroup);
    }

    createMoon() {
      this.moonGroup = new THREE.Group();

      // Lunar sphere with crater texture material
      const moonGeo = new THREE.SphereGeometry(14, 64, 64);
      const moonMat = new THREE.MeshStandardMaterial({
        color: 0xcfd8dc,
        roughness: 0.92,
        metalness: 0.05
      });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      this.moonGroup.add(moonMesh);

      // South Pole Landing Marker (Shiv Shakti Point)
      const markerGeo = new THREE.RingGeometry(0.3, 0.7, 32);
      const markerMat = new THREE.MeshBasicMaterial({
        color: 0xff9933,
        side: THREE.DoubleSide
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.rotation.x = Math.PI / 2;
      marker.position.set(0, -13.95, 0); // South pole
      this.moonGroup.add(marker);

      // Ground plane grid for stage 6/7/8/9 surface
      const terrainGeo = new THREE.PlaneGeometry(160, 160, 48, 48);
      // Displace vertices to create authentic crater terrain
      const pos = terrainGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const dist = Math.sqrt(vx * vx + vy * vy);
        // Flatter in center for landing zone, cratered around
        const craterH = Math.sin(vx * 0.15) * Math.cos(vy * 0.15) * 1.5;
        pos.setZ(i, (dist > 15 ? craterH : 0));
      }
      terrainGeo.computeVertexNormals();

      const terrainMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.95,
        wireframe: false
      });
      const terrain = new THREE.Mesh(terrainGeo, terrainMat);
      terrain.rotation.x = -Math.PI / 2;
      terrain.position.set(0, -10, 0);
      terrain.receiveShadow = true;
      terrain.name = 'lunarTerrain';
      this.scene.add(terrain);

      this.moonGroup.position.set(60, 0, -50);
      this.scene.add(this.moonGroup);
    }

    // ------------------------------------------
    // SPACECRAFT MODELS (LVM3, PM, VIKRAM, PRAGYAN)
    // ------------------------------------------
    setupSpacecraftModels() {
      // 1. LVM3 M4 ROCKET MODEL
      this.rocketGroup = new THREE.Group();

      // Core L110 Liquid Stage (white cylinder)
      const coreGeo = new THREE.CylinderGeometry(1.4, 1.4, 16, 24);
      const coreMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
      const core = new THREE.Mesh(coreGeo, coreMat);
      this.rocketGroup.add(core);

      // Nose Fairing (Ogive cone)
      const fairingGeo = new THREE.ConeGeometry(1.4, 4.5, 24);
      const fairingMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 });
      const fairing = new THREE.Mesh(fairingGeo, fairingMat);
      fairing.position.y = 10.25;
      fairing.name = 'fairing';
      this.rocketGroup.add(fairing);

      // S200 Solid Strap-on Boosters (Twin Boosters)
      [-2.4, 2.4].forEach(xOffset => {
        const boosterGeo = new THREE.CylinderGeometry(0.85, 0.85, 13, 16);
        const boosterMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
        const booster = new THREE.Mesh(boosterGeo, boosterMat);
        booster.position.set(xOffset, -1.5, 0);

        // Booster nose cone
        const coneGeo = new THREE.ConeGeometry(0.85, 2.5, 16);
        const cone = new THREE.Mesh(coneGeo, boosterMat);
        cone.position.set(xOffset, 6.2, 0);

        // Booster engine nozzle
        const nozzleGeo = new THREE.CylinderGeometry(0.5, 0.9, 1.2, 16);
        const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
        const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
        nozzle.position.set(xOffset, -8.6, 0);

        this.rocketGroup.add(booster);
        this.rocketGroup.add(cone);
        this.rocketGroup.add(nozzle);
      });

      // Orange Tricolor Band on Core
      const bandGeo = new THREE.CylinderGeometry(1.42, 1.42, 1.2, 24);
      const bandMat = new THREE.MeshBasicMaterial({ color: 0xff9933 });
      const band = new THREE.Mesh(bandGeo, bandMat);
      band.position.y = 5;
      this.rocketGroup.add(band);

      this.scene.add(this.rocketGroup);

      // 2. PROPULSION MODULE (PM)
      this.pmGroup = new THREE.Group();
      const pmBodyGeo = new THREE.BoxGeometry(3.2, 2.8, 3.2);
      const pmBodyMat = new THREE.MeshStandardMaterial({
        color: 0xcca01d, // Gold MLI Foil
        metalness: 0.85,
        roughness: 0.25
      });
      const pmBody = new THREE.Mesh(pmBodyGeo, pmBodyMat);
      this.pmGroup.add(pmBody);

      // PM Solar Panel
      const pmSolarGeo = new THREE.BoxGeometry(6.5, 0.1, 2.5);
      const pmSolarMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.9, roughness: 0.2 });
      const pmSolar = new THREE.Mesh(pmSolarGeo, pmSolarMat);
      pmSolar.position.set(0, 0, 0);
      this.pmGroup.add(pmSolar);

      this.scene.add(this.pmGroup);

      // 3. VIKRAM LANDER
      this.landerGroup = new THREE.Group();

      // Main gold box hull
      const landerHullGeo = new THREE.BoxGeometry(2.6, 2.0, 2.6);
      const landerHullMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37, // Metallic gold
        metalness: 0.9,
        roughness: 0.2
      });
      const landerHull = new THREE.Mesh(landerHullGeo, landerHullMat);
      this.landerGroup.add(landerHull);

      // Side Solar Panels
      [-1.35, 1.35].forEach(x => {
        const sideSolarGeo = new THREE.PlaneGeometry(1.8, 1.8);
        const sideSolarMat = new THREE.MeshStandardMaterial({ color: 0x172554, side: THREE.DoubleSide });
        const sideSolar = new THREE.Mesh(sideSolarGeo, sideSolarMat);
        sideSolar.position.set(x, 0, 0);
        sideSolar.rotation.y = Math.PI / 2;
        this.landerGroup.add(sideSolar);
      });

      // 4 Landing Legs with circular footpads
      const legPositions = [
        [-1.6, -1.8, -1.6],
        [1.6, -1.8, -1.6],
        [-1.6, -1.8, 1.6],
        [1.6, -1.8, 1.6]
      ];
      legPositions.forEach(p => {
        const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 8);
        const legMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7 });
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(p[0], p[1], p[2]);
        leg.rotation.z = p[0] > 0 ? -0.35 : 0.35;
        leg.rotation.x = p[2] > 0 ? 0.35 : -0.35;

        // Circular footpad
        const padGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 16);
        const pad = new THREE.Mesh(padGeo, legMat);
        pad.position.set(p[0] * 1.3, -2.4, p[2] * 1.3);
        this.landerGroup.add(leg);
        this.landerGroup.add(pad);
      });

      // Thruster Nozzles (4 Throttleable Liquid Engines)
      [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].forEach(pos => {
        const nozzleGeo = new THREE.ConeGeometry(0.25, 0.5, 12);
        const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 });
        const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
        nozzle.position.set(pos[0], -1.1, pos[1]);
        nozzle.rotation.x = Math.PI;
        this.landerGroup.add(nozzle);
      });

      // Pragyan Deployment Ramp
      const rampGeo = new THREE.BoxGeometry(1.6, 0.05, 3.2);
      const rampMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
      const ramp = new THREE.Mesh(rampGeo, rampMat);
      ramp.position.set(0, -1.8, 2.2);
      ramp.rotation.x = 0.55;
      ramp.name = 'landerRamp';
      this.landerGroup.add(ramp);

      this.scene.add(this.landerGroup);

      // 4. PRAGYAN ROVER (6-WHEEL ROCKER-BOGIE)
      this.roverGroup = new THREE.Group();

      // Chassis
      const roverBodyGeo = new THREE.BoxGeometry(1.2, 0.5, 0.8);
      const roverBodyMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8 });
      const roverBody = new THREE.Mesh(roverBodyGeo, roverBodyMat);
      this.roverGroup.add(roverBody);

      // Solar Panel Mast
      const rSolarGeo = new THREE.BoxGeometry(1.3, 0.05, 0.9);
      const rSolarMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.9 });
      const rSolar = new THREE.Mesh(rSolarGeo, rSolarMat);
      rSolar.position.set(0, 0.35, 0);
      rSolar.rotation.x = 0.2;
      this.roverGroup.add(rSolar);

      // 6 Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
      const wheelCoords = [
        [-0.7, -0.3, -0.45], [0, -0.3, -0.45], [0.7, -0.3, -0.45],
        [-0.7, -0.3, 0.45], [0, -0.3, 0.45], [0.7, -0.3, 0.45]
      ];
      wheelCoords.forEach(c => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(c[0], c[1], c[2]);
        this.roverGroup.add(wheel);
      });

      this.scene.add(this.roverGroup);

      // Particle Systems (Launch Plume & Thruster Burns)
      this.setupParticleSystem();
    }

    setupParticleSystem() {
      const pCount = 200;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      const pColors = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 1.5;
        pPos[i * 3 + 1] = -Math.random() * 8;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

        // Orange to yellow flame gradient
        pColors[i * 3] = 1.0;
        pColors[i * 3 + 1] = 0.4 + Math.random() * 0.5;
        pColors[i * 3 + 2] = 0.05;

        this.particles.push({
          x: pPos[i * 3],
          y: pPos[i * 3 + 1],
          z: pPos[i * 3 + 2],
          vy: -0.3 - Math.random() * 0.4,
          life: Math.random()
        });
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

      const pMat = new THREE.PointsMaterial({
        size: 1.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
      });

      this.particleSystem = new THREE.Points(pGeo, pMat);
      this.scene.add(this.particleSystem);
    }

    setupOrbitLines() {
      this.orbitLinesGroup = new THREE.Group();

      // 5 Glowing Elliptical Orbits for Stage 2 (EBN 1-5)
      const orbitRadii = [
        { a: 22, b: 18, color: 0x38bdf8 },
        { a: 28, b: 21, color: 0x00f2fe },
        { a: 34, b: 24, color: 0x34d399 },
        { a: 42, b: 27, color: 0xfbbf24 },
        { a: 52, b: 30, color: 0xff9933 }
      ];

      orbitRadii.forEach(orb => {
        const curve = new THREE.EllipseCurve(
          -orb.a * 0.4, 0, // center
          orb.a, orb.b,    // xRadius, yRadius
          0, 2 * Math.PI,  // start, end angle
          false, 0
        );
        const points = curve.getPoints(100);
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({
          color: orb.color,
          transparent: true,
          opacity: 0.75
        });
        const ellipse = new THREE.Line(geo, mat);
        ellipse.rotation.x = Math.PI / 2.3;
        ellipse.position.set(-60, 0, -40);
        this.orbitLinesGroup.add(ellipse);
      });

      this.scene.add(this.orbitLinesGroup);
    }

    // ------------------------------------------
    // STAGE NAVIGATION & CINEMATIC CAMERA CHOREOGRAPHY
    // ------------------------------------------
    goToStage(stageNum) {
      if (stageNum < 1) stageNum = 1;
      if (stageNum > 9) stageNum = 9;
      this.stage = stageNum;

      // Reset Simulator overlay if open
      if (this.mode === 'playable') {
        this.exitPlayableMode();
      }

      // Update UI Pills and Cards
      this.updateStageUI();

      // Audio feedback
      this.audio.playBeep(800 + stageNum * 60, 0.06);

      // Hide/Show Spacecraft according to stage
      this.rocketGroup.visible = (stageNum === 1);
      this.orbitLinesGroup.visible = (stageNum === 2);
      this.pmGroup.visible = (stageNum >= 2 && stageNum <= 5);
      this.landerGroup.visible = (stageNum >= 5);
      this.roverGroup.visible = (stageNum >= 8);

      const terrain = this.scene.getObjectByName('lunarTerrain');
      if (terrain) terrain.visible = (stageNum >= 6);

      // Camera & Spacecraft Layout Per Stage
      switch (stageNum) {
        case 1: // Launch
          this.camera.position.set(0, 10, 42);
          this.camera.lookAt(0, 8, 0);
          this.rocketGroup.position.set(0, 0, 0);
          this.rocketGroup.rotation.set(0, 0, 0);
          this.particleSystem.position.set(0, -9.5, 0);
          this.particleSystem.visible = true;
          this.audio.playLaunchRoar();
          break;

        case 2: // Earth Orbit Raising
          this.camera.position.set(-60, 45, 25);
          this.camera.lookAt(-60, 0, -40);
          this.pmGroup.position.set(-42, 5, -28);
          this.particleSystem.visible = false;
          break;

        case 3: // Trans-Lunar Injection
          this.camera.position.set(0, 30, 60);
          this.camera.lookAt(0, 0, -45);
          this.pmGroup.position.set(-10, 8, -30);
          this.pmGroup.rotation.y = 0.8;
          this.particleSystem.position.set(-10, 8, -32);
          this.particleSystem.visible = true;
          this.audio.playThrusterSound(0.6);
          break;

        case 4: // Lunar Orbit Insertion
          this.camera.position.set(60, 25, -15);
          this.camera.lookAt(60, 0, -50);
          this.pmGroup.position.set(60, 16, -50);
          this.particleSystem.visible = false;
          break;

        case 5: // Separation
          this.camera.position.set(60, 14, -28);
          this.camera.lookAt(60, 8, -50);
          this.pmGroup.position.set(57, 10, -50);
          this.landerGroup.position.set(63, 10, -50);
          this.landerGroup.rotation.set(0, 0, 0);
          this.particleSystem.visible = false;
          break;

        case 6: // Powered Descent
          this.camera.position.set(0, 16, 28);
          this.camera.lookAt(0, 4, 0);
          this.landerGroup.position.set(0, 10, 0);
          this.landerGroup.rotation.set(0.1, 0, 0);
          this.particleSystem.position.set(0, 8.8, 0);
          this.particleSystem.visible = true;
          break;

        case 7: // Touchdown
          this.camera.position.set(0, 4, 18);
          this.camera.lookAt(0, -5, 0);
          this.landerGroup.position.set(0, -7.5, 0);
          this.landerGroup.rotation.set(0, 0, 0);
          this.particleSystem.visible = false;
          this.triggerCelebration();
          break;

        case 8: // Pragyan Rollout
          this.camera.position.set(0, 2, 14);
          this.camera.lookAt(0, -6, 2);
          this.landerGroup.position.set(0, -7.5, 0);
          this.roverGroup.position.set(0, -9.2, 4.5);
          this.roverGroup.rotation.set(0, 0, 0);
          this.particleSystem.visible = false;
          break;

        case 9: // Surface Exploration
          this.camera.position.set(0, 5, 18);
          this.camera.lookAt(0, -7, 5);
          this.landerGroup.position.set(0, -7.5, 0);
          this.roverGroup.position.set(0, -9.5, 6);
          this.particleSystem.visible = false;
          document.getElementById('c3RoverHint').style.display = 'flex';
          break;
      }

      if (stageNum !== 9) {
        const hint = document.getElementById('c3RoverHint');
        if (hint) hint.style.display = 'none';
      }

      // Voice Narration
      this.speakStageFact();
    }

    updateStageUI() {
      const langData = TRANSLATIONS[this.lang];
      const stageData = langData.stages[this.stage - 1];

      // Update Header Text
      document.getElementById('c3MainTitle').textContent = langData.missionTitle;
      document.getElementById('c3SubTitle').textContent = langData.missionSubtitle;

      // Update Stage Timeline Strip
      document.querySelectorAll('.c3-stage-pill').forEach(pill => {
        const pStage = parseInt(pill.getAttribute('data-stage'), 10);
        pill.classList.toggle('active', pStage === this.stage);
      });

      // Update Floating Fact Card
      document.getElementById('c3CardBadge').textContent = `STAGE ${stageData.id} OF 9`;
      document.getElementById('c3StageName').textContent = stageData.name;
      document.getElementById('c3StageSub').textContent = stageData.sub;
      document.getElementById('c3StageDesc').textContent = stageData.desc;

      const factsContainer = document.getElementById('c3FactsList');
      factsContainer.innerHTML = '';
      stageData.facts.forEach(fact => {
        const item = document.createElement('div');
        item.className = 'c3-fact-item';
        item.innerHTML = `<span class="c3-fact-item-icon">✦</span><span>${fact}</span>`;
        factsContainer.appendChild(item);
      });

      // Update Bottom Progress Fill
      const progressPercent = (this.stage / 9) * 100;
      document.getElementById('c3BottomProgressFill').style.width = `${progressPercent}%`;
      document.getElementById('c3BottomProgressText').textContent = `PHASE ${this.stage} / 9: ${stageData.name.toUpperCase()}`;

      // Update Telemetry Panel
      this.updateTelemetryHUD();
    }

    updateTelemetryHUD() {
      const altitudes = [
        '120 km', '41,762 km', '127,600 km', '100 km (Lunar)',
        '100 km Circular', '800 m Descent', '0 m (Shiv Shakti)',
        'Surface (Stationary)', 'Surface Exploration'
      ];
      const speeds = [
        '9,800 km/h', '37,200 km/h', '38,500 km/h', '6,000 km/h',
        '5,800 km/h', '140 m/s', '0.0 m/s', '0.0 m/s', '1 cm/s (Pragyan)'
      ];

      document.getElementById('c3ValAltitude').textContent = altitudes[this.stage - 1];
      document.getElementById('c3ValSpeed').textContent = speeds[this.stage - 1];
      document.getElementById('c3ValTarget').textContent = this.stage >= 4 ? 'LUNAR SOUTH POLE' : 'LUNAR TRAJECTORY';
    }

    // ------------------------------------------
    // CELEBRATION EFFECTS (STAGE 7 TOUCHDOWN)
    // ------------------------------------------
    triggerCelebration() {
      this.audio.playTouchdownChime();
      if (!this.confettiCanvas || !this.confettiCtx) return;

      this.confettiCanvas.style.display = 'block';
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;

      this.confettiPieces = [];
      const colors = ['#FF9933', '#FFFFFF', '#138808', '#00F2FE', '#FBBF24'];
      for (let i = 0; i < 160; i++) {
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

      const animateConfetti = () => {
        if (!this.confettiCtx || this.stage !== 7) {
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

        if (active && this.stage === 7) {
          requestAnimationFrame(animateConfetti);
        } else {
          this.confettiCanvas.style.display = 'none';
        }
      };

      animateConfetti();
    }

    // ------------------------------------------
    // PLAYABLE LANDING SIMULATOR
    // ------------------------------------------
    startPlayableMode() {
      this.mode = 'playable';
      document.getElementById('chandrayaanStage').classList.add('c3-playable-active');

      // Reset Simulator State
      this.sim.active = true;
      this.sim.altitude = CONFIG.startAltitude;
      this.sim.vy = 14.0;
      this.sim.vx = 0.0;
      this.sim.x = 0.0;
      this.sim.fuel = CONFIG.initialFuel;
      this.sim.tilt = 0.0;
      this.sim.thrustOn = false;
      this.sim.landed = false;
      this.sim.crashed = false;
      this.sim.score = 0;

      // Position 3D Lander for playable mode
      this.landerGroup.visible = true;
      this.rocketGroup.visible = false;
      this.pmGroup.visible = false;
      this.roverGroup.visible = false;

      const terrain = this.scene.getObjectByName('lunarTerrain');
      if (terrain) terrain.visible = true;

      this.camera.position.set(0, 10, 32);
      this.camera.lookAt(0, 0, 0);

      document.getElementById('c3ResultModal').classList.remove('is-open');
      this.audio.playBeep(900, 0.1);
    }

    exitPlayableMode() {
      this.mode = 'story';
      this.sim.active = false;
      document.getElementById('chandrayaanStage').classList.remove('c3-playable-active');
      document.getElementById('c3ResultModal').classList.remove('is-open');
      this.goToStage(this.stage);
    }

    updatePlayablePhysics(dt) {
      if (!this.sim.active || this.sim.landed || this.sim.crashed) return;

      // Altitude and Gravity
      let thrustAcc = 0;
      if (this.sim.thrustOn && this.sim.fuel > 0) {
        thrustAcc = CONFIG.mainThrustPower;
        this.sim.fuel = Math.max(0, this.sim.fuel - CONFIG.fuelBurnRate * dt);
        this.audio.playThrusterSound(0.05);

        // Particle flame under lander
        this.particleSystem.visible = true;
        this.particleSystem.position.set(this.landerGroup.position.x, this.landerGroup.position.y - 1.2, this.landerGroup.position.z);
      } else {
        this.particleSystem.visible = false;
      }

      // Tilt attitude
      if (this.sim.tiltLeft) this.sim.tilt -= CONFIG.rcsTorque * dt;
      if (this.sim.tiltRight) this.sim.tilt += CONFIG.rcsTorque * dt;
      this.sim.tilt = Math.max(-45, Math.min(45, this.sim.tilt));

      // Resolve 2D vectors
      const rad = (this.sim.tilt * Math.PI) / 180;
      const verticalThrust = thrustAcc * Math.cos(rad);
      const horizontalThrust = thrustAcc * Math.sin(rad);

      // Moon downward gravity vs vertical engine thrust
      const ay = verticalThrust - CONFIG.lunarGravity;
      this.sim.vy -= ay * dt; // downwards velocity increases with gravity
      this.sim.altitude -= this.sim.vy * dt;

      // Horizontal acceleration
      this.sim.vx += horizontalThrust * dt;
      this.sim.x += this.sim.vx * dt;

      // Sync 3D Lander model
      const mappedY = -7.5 + (this.sim.altitude / CONFIG.startAltitude) * 22;
      this.landerGroup.position.set(this.sim.x * 0.1, mappedY, 0);
      this.landerGroup.rotation.z = -rad;

      // Update Playable HUD
      document.getElementById('c3PilotAlt').textContent = `${Math.max(0, Math.round(this.sim.altitude))} m`;
      document.getElementById('c3PilotVSpd').textContent = `${this.sim.vy.toFixed(1)} m/s`;
      document.getElementById('c3PilotHSpd').textContent = `${Math.abs(this.sim.vx).toFixed(1)} m/s`;
      document.getElementById('c3PilotFuel').textContent = `${Math.round(this.sim.fuel)}%`;
      document.getElementById('c3PilotTilt').textContent = `${this.sim.tilt.toFixed(1)}°`;

      // Warning color coding
      const vElem = document.getElementById('c3PilotVSpd');
      if (this.sim.vy > CONFIG.maxSafeVerticalSpeed) {
        vElem.style.color = '#ef4444'; // Red danger
      } else {
        vElem.style.color = '#22c55e'; // Green safe
      }

      // Touchdown Detection
      if (this.sim.altitude <= 0) {
        this.evaluateLanding();
      }
    }

    evaluateLanding() {
      this.sim.altitude = 0;
      const isSoftVertical = (this.sim.vy <= CONFIG.maxSafeVerticalSpeed);
      const isSoftHorizontal = (Math.abs(this.sim.vx) <= CONFIG.maxSafeHorizontalSpeed);
      const isUpright = (Math.abs(this.sim.tilt) <= CONFIG.maxSafeTiltAngle);
      const inZone = (Math.abs(this.sim.x) <= 250);

      const modal = document.getElementById('c3ResultModal');
      const icon = document.getElementById('c3ResultIcon');
      const title = document.getElementById('c3ResultTitle');
      const desc = document.getElementById('c3ResultDesc');

      if (isSoftVertical && isSoftHorizontal && isUpright && inZone) {
        // SUCCESSFUL SOFT TOUCHDOWN
        this.sim.landed = true;
        this.sim.score = Math.round(1000 + this.sim.fuel * 20 - this.sim.vy * 50);
        this.audio.playTouchdownChime();
        this.triggerCelebration();

        modal.className = 'c3-result-modal is-open success';
        icon.textContent = '🌕🎉';
        title.textContent = this.lang === 'en' ? 'SOFT LANDING ACHIEVED!' : 'सफल सॉफ्ट लैंडिंग संपन्न!';
        desc.textContent = this.lang === 'en'
          ? `Incredible piloting! Vikram touched down softly at Shiv Shakti Point with a descent rate of ${this.sim.vy.toFixed(1)} m/s.`
          : `शानदार पायलटिंग! विक्रम ने ${this.sim.vy.toFixed(1)} m/s की सुरक्षित गति से शिव शक्ति पॉइंट पर सफल लैंडिंग की।`;
      } else {
        // HARD LANDING / CRASH
        this.sim.crashed = true;
        this.audio.playCrashSound();

        modal.className = 'c3-result-modal is-open fail';
        icon.textContent = '💥⚠️';
        title.textContent = this.lang === 'en' ? 'HARD IMPACT - TELEMETRY LOST' : 'हार्ड लैंडिंग - संपर्क टूटा';
        desc.textContent = this.lang === 'en'
          ? `Descent rate was ${this.sim.vy.toFixed(1)} m/s (Limit: 2.2 m/s). This was what happened in Chandrayaan-2. Learn from failure, adjust thrust, and try again!`
          : `उतरने की गति ${this.sim.vy.toFixed(1)} m/s थी (सुरक्षित सीमा: 2.2 m/s)। चंद्रयान-2 में भी यही हुआ था। सीखिए और पुनः प्रयास कीजिए!`;
      }

      document.getElementById('c3StatFinalSpd').textContent = `${this.sim.vy.toFixed(1)} m/s`;
      document.getElementById('c3StatFuelRem').textContent = `${Math.round(this.sim.fuel)}%`;
      document.getElementById('c3StatTilt').textContent = `${this.sim.tilt.toFixed(1)}°`;
      document.getElementById('c3StatScore').textContent = `${this.sim.score} PTS`;
    }

    // ------------------------------------------
    // PRAGYAN ROVER DRIVING LOOP (STAGE 9)
    // ------------------------------------------
    updateRoverControls(dt) {
      if (this.stage !== 9) return;
      const k = this.roverSim.keys;
      const moveSpeed = 3.5;
      const turnSpeed = 2.0;

      if (k.w) this.roverSim.speed = moveSpeed;
      else if (k.s) this.roverSim.speed = -moveSpeed * 0.6;
      else this.roverSim.speed *= 0.85;

      if (k.a) this.roverSim.rotation += turnSpeed * dt;
      if (k.d) this.roverSim.rotation -= turnSpeed * dt;

      this.roverSim.x += Math.sin(this.roverSim.rotation) * this.roverSim.speed * dt;
      this.roverSim.z += Math.cos(this.roverSim.rotation) * this.roverSim.speed * dt;

      this.roverGroup.position.set(this.roverSim.x, -9.5, this.roverSim.z);
      this.roverGroup.rotation.y = this.roverSim.rotation;
    }

    // ------------------------------------------
    // VOICE NARRATION (WEB SPEECH API)
    // ------------------------------------------
    speakStageFact() {
      if (!this.isVoiceEnabled || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      const stageData = TRANSLATIONS[this.lang].stages[this.stage - 1];
      const textToRead = `${stageData.name}. ${stageData.desc}`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      if (this.lang === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }

    toggleVoice() {
      this.isVoiceEnabled = !this.isVoiceEnabled;
      const btn = document.getElementById('c3VoiceToggle');
      if (this.isVoiceEnabled) {
        btn.textContent = TRANSLATIONS[this.lang].narratorOn;
        this.speakStageFact();
      } else {
        btn.textContent = TRANSLATIONS[this.lang].narratorOff;
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      }
    }

    toggleLanguage() {
      this.lang = (this.lang === 'en' ? 'hi' : 'en');
      const langBtn = document.getElementById('c3LangToggle');
      if (langBtn) langBtn.textContent = (this.lang === 'en' ? 'हिन्दी' : 'EN');

      // Update Voice toggle text
      const voiceBtn = document.getElementById('c3VoiceToggle');
      if (voiceBtn) {
        voiceBtn.textContent = this.isVoiceEnabled
          ? TRANSLATIONS[this.lang].narratorOn
          : TRANSLATIONS[this.lang].narratorOff;
      }

      this.updateStageUI();
    }

    // ------------------------------------------
    // DIALOGS: INSTRUMENTS & QUIZ
    // ------------------------------------------
    openInstrumentsModal() {
      const modal = document.getElementById('c3InstrumentsModal');
      const grid = document.getElementById('c3InstrumentsGrid');
      grid.innerHTML = '';

      INSTRUMENTS.forEach(inst => {
        const card = document.createElement('div');
        card.className = 'c3-instrument-card';
        card.innerHTML = `
          <div class="c3-inst-badge">${inst.craft} • ${inst.badge}</div>
          <div class="c3-inst-name">${inst.name} (${inst.fullName})</div>
          <div class="c3-inst-desc">${inst.desc}</div>
          <div style="margin-top: 8px; font-size: 0.78rem; color: #38bdf8; font-family: monospace;">
            <strong>Discovery:</strong> ${inst.finding}
          </div>
        `;
        grid.appendChild(card);
      });

      modal.classList.add('is-open');
    }

    openQuizModal() {
      const modal = document.getElementById('c3QuizModal');
      this.renderQuizQuestion(0, 0);
      modal.classList.add('is-open');
    }

    renderQuizQuestion(qIdx, score) {
      const container = document.getElementById('c3QuizContent');
      if (qIdx >= QUIZ_QUESTIONS.length) {
        // Quiz Complete - Award Certificate
        container.innerHTML = `
          <div class="c3-certificate">
            <div class="c3-cert-badge">🏅🇮🇳</div>
            <div class="c3-cert-title">ISRO JUNIOR LUNAR SCIENTIST</div>
            <div class="c3-cert-subtitle">This certificate is awarded for mastering the science and engineering of Mission Chandrayaan-3!</div>
            <div style="font-size: 1.1rem; color: #22c55e; font-weight: bold; margin-bottom: 12px;">
              Final Score: ${score} / ${QUIZ_QUESTIONS.length} (${Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
            </div>
            <button class="c3-btn c3-btn-gold" id="btnRestartQuiz">Retake Mission Quiz</button>
          </div>
        `;
        document.getElementById('btnRestartQuiz').addEventListener('click', () => {
          this.renderQuizQuestion(0, 0);
        });
        return;
      }

      const q = QUIZ_QUESTIONS[qIdx];
      container.innerHTML = `
        <div class="c3-quiz-card">
          <div style="font-size: 0.76rem; color: #ff9933; font-family: monospace; margin-bottom: 6px;">QUESTION ${qIdx + 1} OF ${QUIZ_QUESTIONS.length}</div>
          <div class="c3-quiz-question">${q.q}</div>
          <div class="c3-quiz-options" id="c3QuizOptions"></div>
          <div id="c3QuizExpl" style="display: none; padding: 10px; border-radius: 6px; font-size: 0.85rem; margin-bottom: 12px;"></div>
          <button class="c3-btn" id="btnNextQuizQ" style="display: none; margin-left: auto;">Next Question →</button>
        </div>
      `;

      const optionsDiv = document.getElementById('c3QuizOptions');
      const explDiv = document.getElementById('c3QuizExpl');
      const nextBtn = document.getElementById('btnNextQuizQ');

      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'c3-quiz-opt';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          const isCorrect = (idx === q.correct);
          btn.classList.add(isCorrect ? 'correct' : 'wrong');
          this.audio.playBeep(isCorrect ? 880 : 320, 0.1);

          // Disable other options
          Array.from(optionsDiv.children).forEach(b => b.disabled = true);

          // Show explanation
          explDiv.style.display = 'block';
          explDiv.style.background = isCorrect ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)';
          explDiv.style.border = isCorrect ? '1px solid #22c55e' : '1px solid #ef4444';
          explDiv.textContent = q.expl;

          nextBtn.style.display = 'inline-flex';
          nextBtn.onclick = () => {
            this.renderQuizQuestion(qIdx + 1, score + (isCorrect ? 1 : 0));
          };
        });
        optionsDiv.appendChild(btn);
      });
    }

    openStoryComparisonModal() {
      document.getElementById('c3StoryModal').classList.add('is-open');
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

      // Stage Navigation Buttons
      document.getElementById('c3BtnPrev').addEventListener('click', () => this.goToStage(this.stage - 1));
      document.getElementById('c3BtnNext').addEventListener('click', () => this.goToStage(this.stage + 1));

      // Stage Pills Click
      document.querySelectorAll('.c3-stage-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const s = parseInt(pill.getAttribute('data-stage'), 10);
          this.goToStage(s);
        });
      });

      // Wheel / Scroll to advance stages
      let lastScrollTime = 0;
      window.addEventListener('wheel', (e) => {
        const stageElem = document.getElementById('chandrayaanStage');
        if (!stageElem || stageElem.style.display === 'none' || this.mode === 'playable') return;

        const now = Date.now();
        if (now - lastScrollTime < 700) return; // Debounce scroll
        lastScrollTime = now;

        if (e.deltaY > 20) {
          this.goToStage(this.stage + 1);
        } else if (e.deltaY < -20) {
          this.goToStage(this.stage - 1);
        }
      }, { passive: true });

      // Action Buttons
      document.getElementById('c3BtnPlayable').addEventListener('click', () => this.startPlayableMode());
      document.getElementById('c3BtnExitPlayable').addEventListener('click', () => this.exitPlayableMode());
      document.getElementById('c3BtnRetryFlight').addEventListener('click', () => this.startPlayableMode());
      document.getElementById('c3BtnInstruments').addEventListener('click', () => this.openInstrumentsModal());
      document.getElementById('c3BtnQuiz').addEventListener('click', () => this.openQuizModal());
      document.getElementById('c3BtnStoryCompare').addEventListener('click', () => this.openStoryComparisonModal());
      document.getElementById('c3LangToggle').addEventListener('click', () => this.toggleLanguage());
      document.getElementById('c3VoiceToggle').addEventListener('click', () => this.toggleVoice());

      // Close Modals
      document.querySelectorAll('.c3-dialog-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.target.closest('.c3-dialog-overlay').classList.remove('is-open');
        });
      });

      // Keyboard Controls (Playable Simulator & Rover)
      window.addEventListener('keydown', (e) => {
        if (this.mode === 'playable') {
          if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
            this.sim.thrustOn = true;
          }
          if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
            this.sim.tiltLeft = true;
          }
          if (e.code === 'KeyD' || e.code === 'ArrowRight') {
            this.sim.tiltRight = true;
          }
        } else if (this.stage === 9) {
          if (e.code === 'KeyW' || e.code === 'ArrowUp') this.roverSim.keys.w = true;
          if (e.code === 'KeyS' || e.code === 'ArrowDown') this.roverSim.keys.s = true;
          if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.roverSim.keys.a = true;
          if (e.code === 'KeyD' || e.code === 'ArrowRight') this.roverSim.keys.d = true;
        }
      });

      window.addEventListener('keyup', (e) => {
        if (this.mode === 'playable') {
          if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
            this.sim.thrustOn = false;
          }
          if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
            this.sim.tiltLeft = false;
          }
          if (e.code === 'KeyD' || e.code === 'ArrowRight') {
            this.sim.tiltRight = false;
          }
        } else if (this.stage === 9) {
          if (e.code === 'KeyW' || e.code === 'ArrowUp') this.roverSim.keys.w = false;
          if (e.code === 'KeyS' || e.code === 'ArrowDown') this.roverSim.keys.s = false;
          if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.roverSim.keys.a = false;
          if (e.code === 'KeyD' || e.code === 'ArrowRight') this.roverSim.keys.d = false;
        }
      });

      // Touch / On-screen Buttons for Mobile/Tablet
      const thrustBtn = document.getElementById('c3TouchThrust');
      const leftBtn = document.getElementById('c3TouchLeft');
      const rightBtn = document.getElementById('c3TouchRight');

      if (thrustBtn) {
        thrustBtn.addEventListener('pointerdown', () => this.sim.thrustOn = true);
        window.addEventListener('pointerup', () => this.sim.thrustOn = false);
      }
      if (leftBtn) {
        leftBtn.addEventListener('pointerdown', () => this.sim.tiltLeft = true);
        window.addEventListener('pointerup', () => this.sim.tiltLeft = false);
      }
      if (rightBtn) {
        rightBtn.addEventListener('pointerdown', () => this.sim.tiltRight = true);
        window.addEventListener('pointerup', () => this.sim.tiltRight = false);
      }
    }

    startMissionClock() {
      if (this.clockTimer) clearInterval(this.clockTimer);
      this.clockTimer = setInterval(() => {
        this.missionClockSec++;
        const hrs = String(Math.floor(this.missionClockSec / 3600)).padStart(2, '0');
        const mins = String(Math.floor((this.missionClockSec % 3600) / 60)).padStart(2, '0');
        const secs = String(this.missionClockSec % 60).padStart(2, '0');
        const clockElem = document.getElementById('c3MissionClock');
        if (clockElem) clockElem.textContent = `T+ ${hrs}:${mins}:${secs}`;
      }, 1000);
    }

    // ------------------------------------------
    // MAIN 60 FPS ANIMATION LOOP
    // ------------------------------------------
    animate() {
      this.animFrameId = requestAnimationFrame(() => this.animate());

      const dt = 0.016; // ~60fps step

      // 1. Slow Earth and Moon rotation
      if (this.earthGroup) this.earthGroup.rotation.y += 0.001;
      if (this.moonGroup) this.moonGroup.rotation.y += 0.0006;

      // 2. Animate Rocket Launch / Separation in Stage 1
      if (this.stage === 1 && this.rocketGroup) {
        this.rocketGroup.position.y += 0.04;
        if (this.rocketGroup.position.y > 40) this.rocketGroup.position.y = 0;
        this.particleSystem.position.y = this.rocketGroup.position.y - 9.5;
      }

      // 3. Animate Particles
      if (this.particleSystem && this.particleSystem.visible) {
        const positions = this.particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < this.particles.length; i++) {
          const p = this.particles[i];
          p.y += p.vy;
          if (p.y < -12) {
            p.y = 0;
            p.x = (Math.random() - 0.5) * 1.5;
            p.z = (Math.random() - 0.5) * 1.5;
          }
          positions[i * 3] = p.x;
          positions[i * 3 + 1] = p.y;
          positions[i * 3 + 2] = p.z;
        }
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
      }

      // 4. Update Playable Physics if active
      if (this.mode === 'playable') {
        this.updatePlayablePhysics(dt);
      }

      // 5. Update Pragyan Rover in Stage 9
      if (this.stage === 9) {
        this.updateRoverControls(dt);
      }

      // Render Scene
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }

  // Export engine to window so script.js and HTML can invoke it
  window.Chandrayaan3Engine = new Chandrayaan3Engine();

})();
