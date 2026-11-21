/**
 * MISSION CHANDRAYAAN-3 (VYOM) — rebuilt
 * Flow: rocket launch -> orbit/Moon journey -> landing decisions (terrain hazards)
 *       -> Pragyan rover -> pick destination, press Start -> US flag -> tap Armstrong's footprints.
 * Pure Canvas 2D. Public API kept: window.Chandrayaan3Engine.init() / goToStage(n) / speakStageFact()
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const sm = t => t * t * (3 - 2 * t);
  const outE = t => 1 - Math.pow(1 - t, 3);
  const rnd = (a, b) => a + Math.random() * (b - a);
  const SEG = 3.2, FOOT = 26, MPP = 0.08; // seconds per space segment, lander foot offset, metres per pixel

  const STAGES = [
    ['Launch', '14 Jul 2023', 'LVM3-M4 lifts off from Satish Dhawan Space Centre, Sriharikota, and places Chandrayaan-3 in an elliptical Earth orbit of about 170 × 36,500 km.'],
    ['Earth orbit raising', '15 Jul – 1 Aug', 'Five engine burns raise the orbit step by step. This builds up speed using Earth’s gravity, so the craft doesn’t need a huge amount of fuel at once.'],
    ['Trans-Lunar Injection', '1 Aug', 'A big burn pushes the spacecraft out of Earth orbit onto a path toward the Moon.'],
    ['Lunar Orbit Insertion', '5 – 16 Aug', 'The Moon’s gravity captures the craft. A series of burns lowers it to a circular orbit of about 100 × 100 km.'],
    ['Lander separation', '17 Aug', 'Vikram, carrying the Pragyan rover, separates from the propulsion module. The module stays in orbit and keeps doing science.'],
    ['Deboosting', '18 & 20 Aug', 'Two burns lower Vikram into a ~25 × 134 km orbit, so the landing site is closer.'],
    ['Powered descent', '23 Aug · ~6:04 PM IST', 'Rough braking, attitude hold, then fine braking: Vikram slows from ~1.68 km/s, turns upright, and looks for safe ground.'],
    ['Rover & experiments', 'Shiv Shakti Point', 'Pragyan rolls out and explores for about one lunar day (~14 Earth days), checking the surface and detecting sulphur and other elements.']
  ];
  const DESTS = [
    { id: 'rocks', icon: '🪨', name: 'Boulder field', x: 520, fact: 'LIBS laser fired at the soil here: sulphur and other elements detected!' },
    { id: 'crater', icon: '🕳️', name: 'Crater rim', x: 820, fact: 'Temperature probe: about +60 °C on the surface, but only about −10 °C just 8 cm below.' },
    { id: 'flag', icon: '🇺🇸', name: 'USA flag', x: 1150, fact: '' }

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
  const STARS = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random(), r: rnd(.4, 1.6), p: rnd(0, 6) }));

  let cv, ctx, W = 0, H = 0, raf = 0, last = 0, ac = null, S = {}, voice = true, ready = false;

  /* ---------- helpers: audio, speech, UI ---------- */
  function beep(f, d, type) {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = type || 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(.07, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + d);
      o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + d);
    } catch (e) {}
  }
  function say(t) {
    if (!voice || !t || !('speechSynthesis' in window)) return;
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-IN'; speechSynthesis.speak(u); } catch (e) {}
  }
  function toast(m, ms) {
    const t = $('c3Toast'); t.textContent = m; t.classList.add('is-on');
    clearTimeout(S.tt); S.tt = setTimeout(() => t.classList.remove('is-on'), ms || 3600);
  }
  function big(t, ms) { const b = $('c3Big'); b.textContent = t; b.classList.toggle('is-on', !!t); S.bigT = t ? (ms || 0) : 0; }
  const hint = t => { $('c3Hint').textContent = t; };
  const hud = on => $('c3Hud').classList.toggle('is-on', on);
  function setDesc(t) { $('c3StageDesc').textContent = t; say(t); }
  function setAct(label, fn) {
    const d = $('c3Dock');
    if (!label) { d.classList.remove('is-on'); return; }
    $('c3Act').textContent = label;
    $('c3Act').onclick = () => { d.classList.remove('is-on'); beep(700, .08); fn(); };
    d.classList.add('is-on');
  }
  function stageUI(n, h) {
    S.stage = n; const s = STAGES[n - 1];
    $('c3CardBadge').textContent = `STAGE ${n} OF 8`; $('c3StageName').textContent = s[0];
    $('c3StageSub').textContent = s[1]; $('c3StageDesc').textContent = s[2];
    document.querySelectorAll('.c3-stage-pill').forEach((p, i) => { p.classList.toggle('active', i + 1 === n); p.classList.toggle('done', i + 1 < n); });
    $('c3BottomProgressFill').style.width = (n / 8 * 100) + '%';
    $('c3BottomProgressText').textContent = `STAGE ${n} / 8: ${s[0].toUpperCase()}`;
    $('c3BtnSkip').disabled = n >= 7;
    if (h !== undefined) hint(h);
    say(s[0] + '. ' + s[2]);
  }
  function result(icon, title, desc, btn, fn, bad) {
    const r = $('c3Result');
    r.className = 'c3-result-modal is-open ' + (bad ? 'fail' : 'success');
    r.innerHTML = `<div class="c3-result-icon">${icon}</div><div class="c3-result-title">${title}</div><div class="c3-result-desc">${desc}</div><button class="c3-btn c3-btn-gold" id="c3ResBtn" type="button">${btn}</button>`;
    $('c3ResBtn').onclick = () => { r.classList.remove('is-open'); fn(); };
  }
  function decide(tag, text, opts) {
    const p = $('c3Decision'), box = $('c3DecOpts');
    $('c3DecTag').textContent = tag; $('c3DecText').textContent = text; box.innerHTML = '';
    opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'c3-opt'; b.type = 'button'; b.innerHTML = `<strong>${o.t}</strong><span>${o.s}</span>`;
      b.onclick = () => { p.classList.remove('is-open'); beep(660, .08); o.fn(); };
      box.appendChild(b);
    });
    p.classList.add('is-open'); beep(520, .12);
  }
  function clearUI() {
    ['c3Decision', 'c3Route', 'c3Result', 'c3Flash', 'c3Prints', 'c3Toast', 'c3Dock'].forEach(id => $(id).classList.remove('is-open', 'is-on'));
    hud(false); big('');
  }

  /* ---------- tweens ---------- */
  function go(o, to, d, cb, ease) {
    const f = {}; for (const k in to) f[k] = o[k];
    S.tw.push({ o, to, f, t: 0, d, cb, e: ease || sm });
  }
  function stepTw(dt) {
    for (const w of S.tw.slice()) {
      if (!S.tw.includes(w)) continue;
      w.t += dt; const p = clamp(w.t / w.d, 0, 1), e = w.e(p);
      for (const k in w.to) w.o[k] = lerp(w.f[k], w.to[k], e);
      if (p >= 1) { S.tw.splice(S.tw.indexOf(w), 1); if (w.cb) w.cb(); }
    }
  }

  /* ---------- drawing primitives ---------- */
  const circ = (x, y, r) => { ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, 6.2832); ctx.fill(); };
  function stars(k) {
    const t = performance.now() / 700; ctx.fillStyle = '#fff';
    for (const s of STARS) { ctx.globalAlpha = k * (.45 + .45 * Math.sin(t + s.p)); ctx.fillRect(s.x * W, s.y * H * .9, s.r, s.r); }
    ctx.globalAlpha = 1;
  }
  function tag(txt, x, y, col) {
    ctx.font = '600 12px monospace'; const w = ctx.measureText(txt).width + 14;
    ctx.fillStyle = 'rgba(3,7,18,.85)'; ctx.fillRect(x - w / 2, y - 12, w, 22);
    ctx.strokeStyle = col || '#38bdf8'; ctx.lineWidth = 1; ctx.strokeRect(x - w / 2, y - 12, w, 22);
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText(txt, x, y + 4); ctx.textAlign = 'left';
  }
  function earth(x, y, r) {
    const g = ctx.createRadialGradient(x - r * .35, y - r * .35, r * .1, x, y, r);
    g.addColorStop(0, '#6db6ff'); g.addColorStop(1, '#0a2a70'); ctx.fillStyle = g; circ(x, y, r);
    ctx.save(); ctx.clip(); ctx.fillStyle = '#34a05a'; const t = Math.sin(performance.now() / 9000) * r * .1;
    [[.2, -.2, .38, .22], [-.35, .25, .3, .2], [.45, .35, .2, .14], [-.1, -.55, .25, .12]].forEach(c => { ctx.beginPath(); ctx.ellipse(x + c[0] * r + t, y + c[1] * r, c[2] * r, c[3] * r, .5, 0, 6.3); ctx.fill(); });
    ctx.restore(); ctx.strokeStyle = 'rgba(120,190,255,.35)'; ctx.lineWidth = Math.max(2, r * .05); ctx.beginPath(); ctx.arc(x, y, r + 1, 0, 6.3); ctx.stroke();
  }
  function moon(x, y, r, pole) {
    const g = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r);
    g.addColorStop(0, '#e5e7eb'); g.addColorStop(1, '#6b7280'); ctx.fillStyle = g; circ(x, y, r);
    ctx.fillStyle = 'rgba(0,0,0,.13)';
    [[-.3, -.2, .18], [.25, .1, .22], [-.1, .4, .14], [.45, -.4, .12], [-.5, .2, .1]].forEach(c => circ(x + c[0] * r, y + c[1] * r, c[2] * r));
    if (pole) { ctx.strokeStyle = '#ff9933'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y + r * .86, Math.max(3, r * .06), 0, 6.3); ctx.stroke(); }
  }
  function sat(x, y, s, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(s, s);
    ctx.fillStyle = '#1e3a8a'; ctx.fillRect(-26, -3, 52, 6); ctx.fillStyle = '#d4af37'; ctx.fillRect(-8, -8, 16, 16);
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.strokeRect(-8, -8, 16, 16); ctx.restore();
  }
  function lander(x, y, tilt, fire, s) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(tilt * Math.PI / 180); ctx.scale(s, s);
    if (fire > 0) {
      const f = ctx.createLinearGradient(0, 16, 0, 75); f.addColorStop(0, '#fff'); f.addColorStop(.3, '#ffd34d'); f.addColorStop(1, 'rgba(255,80,0,0)');
      ctx.fillStyle = f; ctx.beginPath(); ctx.moveTo(-12, 16); ctx.lineTo(12, 16); ctx.lineTo(0, 16 + 55 * fire * (.8 + Math.random() * .4)); ctx.fill();
    }
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    [-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(d * 16, 10); ctx.lineTo(d * 30, 24); ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.fillRect(d * 30 - 7, 23, 14, 3); });
    ctx.fillStyle = '#d4af37'; ctx.fillRect(-18, -14, 36, 28); ctx.fillStyle = '#b8901f'; ctx.fillRect(-18, -14, 36, 5);
    ctx.fillStyle = '#1e3a8a'; ctx.fillRect(-18, -6, 8, 14); ctx.fillStyle = '#334155'; ctx.fillRect(-12, 14, 24, 5);
    ctx.restore();
  }
  function rover(x, y, dir, wheel) {
    ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
    ctx.fillStyle = '#d4af37'; ctx.fillRect(-18, -24, 36, 13);
    ctx.save(); ctx.rotate(-.12); ctx.fillStyle = '#1e3a8a'; ctx.fillRect(-20, -30, 40, 4); ctx.restore();
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(10, -36, 3, 12); ctx.fillRect(7, -38, 9, 3);
    [-18, 0, 18].forEach(dx => {
      ctx.save(); ctx.translate(dx, -7); ctx.fillStyle = '#111827'; circ(0, 0, 7);
      ctx.rotate(wheel); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(6, 0); ctx.moveTo(0, -6); ctx.lineTo(0, 6); ctx.stroke(); ctx.restore();
    });
    ctx.restore();
  }
  function flag(x, y) {
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(x, y + 2, 16, 4, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#e5e7eb'; ctx.fillRect(x - 1.5, y - 74, 3, 74); ctx.fillRect(x - 1.5, y - 72, 42, 2);
    for (let i = 0; i < 7; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#b22234'; ctx.fillRect(x + 1, y - 70 + i * 3.2, 38, 3.2); }
    ctx.fillStyle = '#3c3b6e'; ctx.fillRect(x + 1, y - 70, 16, 13);
  }
  function rocket(x, yb, fire, sep) {
    ctx.save(); ctx.translate(x, yb);
    if (fire > 0) {
      const h = 95 * fire * (.85 + Math.random() * .3), g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#fff'); g.addColorStop(.25, '#ffe066'); g.addColorStop(1, 'rgba(255,80,0,0)'); ctx.fillStyle = g;
      (sep ? [0] : [-22, 0, 22]).forEach(dx => { ctx.beginPath(); ctx.moveTo(dx - 8, 0); ctx.lineTo(dx + 8, 0); ctx.lineTo(dx, h); ctx.fill(); });
    }
    ctx.fillStyle = '#f1f5f9'; ctx.fillRect(-13, -150, 26, 150);
    ctx.beginPath(); ctx.moveTo(-13, -150); ctx.quadraticCurveTo(-13, -185, 0, -205); ctx.quadraticCurveTo(13, -185, 13, -150); ctx.fill();
    ['#ff9933', '#ffffff', '#138808'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(-13, -118 + i * 6, 26, 6); });
    ctx.fillStyle = '#475569'; ctx.fillRect(-9, 0, 18, 8);
    if (!sep) [-1, 1].forEach(d => {
      ctx.fillStyle = '#e2e8f0'; ctx.fillRect(d * 22 - 8, -100, 16, 100);
      ctx.beginPath(); ctx.moveTo(d * 22 - 8, -100); ctx.lineTo(d * 22 + 8, -100); ctx.lineTo(d * 22, -120); ctx.fill();
      ctx.fillStyle = '#475569'; ctx.fillRect(d * 22 - 6, 0, 12, 7);
    });
    ctx.restore();
  }

  /* ---------- particles / confetti ---------- */
  function fxStep(dt) {
    for (const p of S.fx) { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }
    S.fx = S.fx.filter(p => p.life > 0);
    for (const c of S.conf) { c.x += c.vx * dt; c.y += c.vy * dt; c.r += c.vr * dt; }
    S.conf = S.conf.filter(c => c.y < H + 30);
  }
  function confetti() {
    const cols = ['#FF9933', '#FFFFFF', '#138808', '#00F2FE', '#FBBF24'];
    for (let i = 0; i < 130; i++) S.conf.push({ x: rnd(0, W), y: rnd(-250, -10), vx: rnd(-60, 60), vy: rnd(120, 260), r: rnd(0, 6), vr: rnd(-6, 6), s: rnd(6, 12), c: cols[i % 5] });
  }
  function drawConf() {
    for (const c of S.conf) { ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.r); ctx.fillStyle = c.c; ctx.fillRect(-c.s / 2, -c.s / 3, c.s, c.s * .6); ctx.restore(); }
  }

  /* =========================================================
     SCENE 1: LAUNCH (stage 1)
     ========================================================= */
  function updLaunch(dt) {
    const l = S.l;
    if (l.ph === 'count') {
      l.cd -= dt; const n = Math.ceil(l.cd);
      if (n !== l.n && n > 0) { l.n = n; big('T-' + n); beep(440, .1); hint('Ignition sequence…'); }
      if (l.cd <= 0) { l.ph = 'fly'; S.clockOn = true; big('LIFTOFF!', 1.8); beep(110, .8, 'sawtooth'); hint('LVM3-M4 is climbing…'); }
    }
    if (l.ph === 'fly') {
      l.v += dt * 110; l.alt += l.v * dt;
      for (let i = 0; i < 3; i++) S.fx.push({ x: rnd(-8, 8), y: l.alt + 6, vx: rnd(-45, 45), vy: -rnd(140, 260), life: .35, max: .35, r: rnd(4, 8), c: '255,190,70' });
      if (l.alt < H * .9) for (let i = 0; i < 2; i++) S.fx.push({ x: rnd(-30, 30), y: rnd(0, 10), vx: rnd(-90, 90), vy: rnd(5, 40), life: 2.6, max: 2.6, r: rnd(14, 26), c: '215,215,222', smoke: true });
      if (!l.sep && l.alt > H * .85) {
        l.sep = true; toast('S200 boosters separate'); beep(300, .2, 'square');
        l.bs = [-1, 1].map(d => ({ x: d * 22, y: l.alt, vx: d * 55, vy: l.v * .7, rot: 0, vr: d * .9 }));
      }
      if (l.alt > H * 1.9 && !S.pend) S.pend = startSpace;
    }
    for (const b of l.bs) { b.x += b.vx * dt; b.y += b.vy * dt; b.vy -= 160 * dt; b.rot += b.vr * dt; }
  }
  function drawLaunch() {
    const l = S.l, base = H * .82, gY = base + Math.max(0, l.alt - H * .4), k = clamp(l.alt / (H * 1.5), 0, 1);
    const c = (a, b) => Math.round(lerp(a, b, k));
    const g = ctx.createLinearGradient(0, 0, 0, gY);
    g.addColorStop(0, `rgb(${c(24, 2)},${c(40, 4)},${c(96, 10)})`); g.addColorStop(1, `rgb(${c(255, 2)},${c(160, 4)},${c(90, 10)})`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); stars(k);
    ctx.fillStyle = '#1a2418'; ctx.fillRect(0, gY, W, H - gY + 2); ctx.fillStyle = '#2b3a28'; ctx.fillRect(0, gY, W, 4);
    const cx = W / 2, sy = h => gY - h;
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.strokeRect(cx + 46, sy(230), 22, 230);
    for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(cx + 46, sy(i * 29)); ctx.lineTo(cx + 68, sy((i + 1) * 29)); ctx.stroke(); }
    ctx.fillStyle = '#334155'; ctx.fillRect(cx - 60, sy(10), 120, 10);
    for (const p of S.fx) {
      const a = clamp(p.life / p.max, 0, 1); ctx.globalAlpha = a * (p.smoke ? .55 : .9); ctx.fillStyle = `rgb(${p.c})`;
      circ(cx + p.x, sy(p.y + 10), p.r * (p.smoke ? 1 + (1 - a) * 1.5 : 1));
    }
    ctx.globalAlpha = 1;
    for (const b of l.bs) {
      ctx.save(); ctx.translate(cx + b.x, sy(b.y + 10)); ctx.rotate(b.rot); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(-8, -100, 16, 100);
      ctx.beginPath(); ctx.moveTo(-8, -100); ctx.lineTo(8, -100); ctx.lineTo(0, -120); ctx.fill(); ctx.restore();
    }
    const sh = l.ph === 'fly' && l.alt < H * .3 ? rnd(-1.5, 1.5) : (l.ph === 'count' && l.cd < 2 ? rnd(-.8, .8) : 0);
    rocket(cx + sh, sy(l.alt + 10), l.ph === 'fly' ? 1 : (l.ph === 'count' && l.cd < 1.5 ? .4 : 0), l.sep);
    if (l.ph === 'pad') tag('LVM3-M4 · Satish Dhawan Space Centre, Sriharikota', cx, base + 40, '#ff9933');
  }

  /* =========================================================
     SCENE 2: SPACE JOURNEY (stages 2-6)
     ========================================================= */
  function startSpace(seg) {
    S.pend = null; S.sc = 'space'; S.sp = { seg: seg || 0, t: 0 }; S.fx = []; setAct(); big('');
    stageUI(S.sp.seg + 2, 'Sit back — the spacecraft is on its way to the Moon…');
  }
  function updSpace(dt) {
    const sp = S.sp; sp.t += dt;
    if (sp.t >= SEG) {
      if (sp.seg >= 4) { if (!S.pend) S.pend = startDescent; return; }
      sp.seg++; sp.t = 0; stageUI(sp.seg + 2); beep(500 + sp.seg * 60, .1);
    }
  }
  function drawSpace() {
    const sp = S.sp, p = clamp(sp.t / SEG, 0, 1), M = Math.min(W, H);
    ctx.fillStyle = '#02040a'; ctx.fillRect(0, 0, W, H); stars(1);
    if (sp.seg === 0) {
      const r = Math.min(H * .13, W / 7.2), ex = W / 2 - 2.1 * r, ey = H * .6, n = Math.min(5, 1 + Math.floor(p * 5));
      const cols = ['#38bdf8', '#00f2fe', '#34d399', '#fbbf24', '#ff9933'];
      const orb = i => { const pr = 1.2 * r, ar = (1.8 + i * .9) * r, a = (pr + ar) / 2, c = (ar - pr) / 2; return { a, b: Math.sqrt(pr * ar), c }; };
      earth(ex, ey, r); moon(W * .92, H * .2, M * .03);
      for (let i = 0; i < n; i++) { const o = orb(i); ctx.strokeStyle = cols[i]; ctx.globalAlpha = .8; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(ex + o.c, ey, o.a, o.b, 0, 0, 6.3); ctx.stroke(); }
      ctx.globalAlpha = 1; const o = orb(n - 1), th = sp.t * 3.2 + Math.PI;
      sat(ex + o.c + o.a * Math.cos(th), ey + o.b * Math.sin(th), .7, th + 1.57);
      tag(`Engine burn ${n} of 5 · orbit gets bigger`, W / 2, H * .9, cols[n - 1]);
    } else if (sp.seg === 1) {
      const er = M * .09, ex = W * .14, ey = H * .62, mr = M * .045, mx = W * .86, my = H * .32;
      earth(ex, ey, er); moon(mx, my, mr);
      const P0 = [ex + er * .8, ey - er * .6], C = [W * .45, H * .06], P1 = [mx - mr, my];
      const bz = t => [(1 - t) * (1 - t) * P0[0] + 2 * (1 - t) * t * C[0] + t * t * P1[0], (1 - t) * (1 - t) * P0[1] + 2 * (1 - t) * t * C[1] + t * t * P1[1]];
      ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(0,242,254,.3)'; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(P0[0], P0[1]); ctx.quadraticCurveTo(C[0], C[1], P1[0], P1[1]); ctx.stroke(); ctx.setLineDash([]);
      const e = sm(p); ctx.strokeStyle = '#00f2fe'; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const q = bz(e * i / 30); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.stroke();
      const q = bz(e), q2 = bz(Math.min(1, e + .02)); sat(q[0], q[1], .7, Math.atan2(q2[1] - q[1], q2[0] - q[0]));
      tag('Trans-Lunar Injection · ≈ 384,000 km to go', W / 2, H * .9, '#00f2fe');
    } else {
      const mr = M * .17, mx = W / 2, my = H * .56;
      moon(mx, my, mr, true); earth(W * .1, H * .2, M * .035);
      if (sp.seg === 2) {
        const R = lerp(3.4, 1.35, sm(p)) * mr, th = sp.t * 2.4;
        ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.setLineDash([5, 7]); ctx.beginPath(); ctx.arc(mx, my, 1.35 * mr, 0, 6.3); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(mx, my, R, 0, 6.3); ctx.stroke();
        sat(mx + R * Math.cos(th), my + R * Math.sin(th), .7, th + 1.57);
        tag(p > .8 ? 'Orbit lowered to ~100 × 100 km' : 'Retro burns · orbit shrinking', W / 2, H * .92, '#34d399');
      } else if (sp.seg === 3) {
        const R = 1.35 * mr, a = -2.2, bx = mx + R * Math.cos(a), by = my + R * Math.sin(a), d = sm(p) * 70;
        sat(bx, by, .8, a + 1.57); sat(bx + d * .5, by + d * .85, .55, a + 1.57);
        tag('Propulsion module', bx - 20, by - 30, '#ff9933'); tag('Vikram + Pragyan', bx + d * .5 + 70, by + d * .85 + 24, '#00f2fe');
        tag(p > .5 ? 'Separated! The module stays in orbit' : 'Separating…', W / 2, H * .92, '#fbbf24');
      } else {
        const a = 1.6 * mr, b = 1.18 * mr, cy = my - .12 * mr, th = sp.t * 1.9 + 1.6;
        ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(mx, cy, a, b, 0, 0, 6.3); ctx.stroke();
        sat(mx + a * Math.cos(th), cy + b * Math.sin(th), .6, th + 1.57);
        tag(`Deboost burn ${p < .5 ? 1 : 2} (${p < .5 ? '18' : '20'} Aug) · ~25 × 134 km orbit`, W / 2, H * .92, '#fbbf24');
      }
    }
  }

  /* =========================================================
     SCENE 3: LANDING WITH TERRAIN DECISIONS (stage 7)
     ========================================================= */
  const G0 = () => H * .8;
  const gy = x => {
    let y = 0; const T = S.T;
    for (const c of T.cr) { const d = (x - c.x) / c.r; if (d > -1 && d < 1) y += c.d * (1 - d * d); }
    if (T.bad) y -= 40 * sm(clamp((x - (T.bad.x - 100)) / 200, 0, 1));
    return y;
  };
  const gs = x => G0() + gy(x);
  function newTerrain() {
    const badI = Math.random() < .5 ? 0 : 1, x1 = 360 + W * .18, x2 = 360 + W * .48;
    const T = { cr: [{ x: 0, r: 120, d: 70 }, { x: -520, r: 100, d: 40 }, { x: -980, r: 140, d: 50 }, { x: 240, r: 55, d: 26 }, { x: x2 + 420, r: 150, d: 55 }], rocks: [], sites: [{ x: x1 }, { x: x2 }] };
    T.sites[badI].bad = true; T.bad = T.sites[badI];
    for (let i = 0; i < 7; i++) T.rocks.push({ x: T.bad.x + rnd(-95, 95), r: rnd(7, 16) });
    for (let i = 0; i < 16; i++) { const x = rnd(-1300, x2 + 700); if (Math.abs(x - x1) > 140 && Math.abs(x - x2) > 140) T.rocks.push({ x, r: rnd(3, 8) }); }
    return T;
  }
  function startDescent() {
    S.pend = null; S.sc = 'descent'; S.tw = []; S.fx = []; S.conf = []; clearUI(); hud(true);
    S.T = newTerrain(); S.d = { ph: 'brake', hz: 0 }; S.L = { x: -900, y: -80, tilt: -70, fire: 1 }; S.px = S.L.x; S.py = S.L.y; S.vx = S.vy = 0;
    stageUI(7, 'Watch: rough braking phase…'); setDesc('Rough braking phase: Vikram fires its engines to slow down from ~1.68 km/s.');
    go(S.L, { x: 0, y: H * .27 }, 5.5, () => {
      S.d.ph = 'hold'; setDesc('Attitude hold phase: Vikram tilts from horizontal to vertical.');
      go(S.L, { tilt: 0 }, 1.8, () => { S.d.ph = 'dec1'; S.L.fire = .35; decision1(); });
    }, outE);
  }
  function decision1() {
    S.d.hz = 1; hint('Hazard cameras spotted holes below — you decide!'); setDesc('Fine braking phase: hazard cameras scan the terrain. Landing needs flat, hole-free ground.');
    const o = [{ t: '⬇ Land right here', s: 'Descend straight down', fn: crash1 }, { t: '➡ Move forward, choose another spot', s: 'Hover, fly ahead and scan again', fn: divert }];
    if (Math.random() < .5) o.reverse();
    decide('DECISION 1 OF 2 · HAZARD SCAN', 'The camera shows holes (craters) right below Vikram. How do you land?', o);
  }
  function crash1() {
    S.d.hz = 0; S.d.ph = 'fall'; S.L.fire = .5; const nx = S.L.x + 40;
    go(S.L, { x: nx, y: gs(nx) - FOOT, tilt: 28 }, 3.4, () => { S.L.fire = 0; fail('LANDED IN A HOLE', 'Vikram touched down inside a crater and tipped over. Landing needs flat ground — with holes below, the safe move is to fly forward a bit and pick another site.'); });
  }
  function divert() {
    S.d.hz = 0; S.d.ph = 'divert'; hint('Moving forward to find a better site…'); S.L.fire = .7;
    go(S.L, { tilt: 14 }, .7, () => go(S.L, { x: 360, y: H * .3 }, 3.2, () => go(S.L, { tilt: 0 }, .8, () => { S.L.fire = .35; decision2(); })));
  }
  function decision2() {
    S.d.ph = 'dec2'; hint('Compare the two sites. Which is safer?'); setDesc('New terrain scanned. Compare the slope and boulders at each site.');
    decide('DECISION 2 OF 2 · CHOOSE THE SITE', 'Two sites ahead. Read the slope and boulder data on each marker, then pick one.', [
      { t: '📍 Land at Site 1', s: 'Left marker', fn: () => landAt(0) },
      { t: '📍 Land at Site 2', s: 'Right marker', fn: () => landAt(1) }
    ]);
  }
  function landAt(i) {
    const s = S.T.sites[i]; S.d.ph = 'land'; S.L.fire = .6; hint('Fine braking… descending to the site');
    go(S.L, { x: s.x, y: H * .45 }, 2.6, () => go(S.L, { y: gs(s.x) - FOOT, tilt: s.bad ? 16 : 0 }, 3.8, () => touch(s)));
  }
  function touch(s) {
    S.L.fire = 0; beep(180, .15, 'square');
    if (s.bad) { S.d.ph = 'fall'; go(S.L, { tilt: 42, x: S.L.x + 30 }, 1.1, () => fail('TIPPED OVER ON THE SLOPE', 'That site was steep and covered with boulders (slope above the ~12° limit). Choose the flatter, boulder-free site next time.')); return; }
    S.d.ph = 'touch'; confetti(); [0, 1, 2, 3].forEach(i => setTimeout(() => beep([262, 392, 523, 659][i], .35, 'triangle'), i * 150));
    for (let i = 0; i < 40; i++) S.fx.push({ x: s.x + rnd(-20, 20), y: gs(s.x) - 2, vx: rnd(-160, 160), vy: -rnd(5, 40), life: rnd(.8, 1.6), max: 1.6, r: rnd(3, 8), c: '200,200,205', smoke: true });
    big('TOUCHDOWN!', 4000); hint('Soft landing achieved near the south pole!'); toast('Landed near 69.4° S · Shiv Shakti Point · 23 Aug 2023, ~6:04 PM IST', 6000);
    setDesc('Soft landing! India is the first country to land near the Moon’s south pole.');
    setAct('🚜 Deploy Pragyan rover', startSurface);
  }
  function fail(title, text) { beep(140, .5, 'sawtooth'); hint('Landing failed — try again!'); result('💥', title, text, '🔁 Try the landing again', startDescent, true); }

  function updDescent(dt) {
    const L = S.L, d = S.d, M = 1500 / H;
    S.cam = L.x - W * .32;
    if (dt > 0) { S.vx = lerp(S.vx, (L.x - S.px) / dt * M, .15); S.vy = lerp(S.vy, (L.y - S.py) / dt * M, .15); }
    S.px = L.x; S.py = L.y;
    const alt = Math.max(0, (gs(L.x) - L.y - FOOT) * M);
    $('c3ValAlt').textContent = Math.round(alt) + ' m'; $('c3ValVy').textContent = Math.abs(S.vy).toFixed(1) + ' m/s';
    $('c3ValVx').textContent = Math.abs(S.vx).toFixed(1) + ' m/s';
    $('c3ValPhase').textContent = ({ brake: 'ROUGH BRAKING', hold: 'ATTITUDE HOLD', dec1: 'FINE BRAKING', divert: 'RETARGETING', dec2: 'SITE SELECTION', land: 'TERMINAL DESCENT', fall: 'DESCENT', touch: 'LANDED' })[d.ph] || '';
    if (L.fire > 0 && gs(L.x) - L.y - FOOT < 130) S.fx.push({ x: L.x + rnd(-25, 25), y: gs(L.x) - 2, vx: rnd(-130, 130), vy: -rnd(5, 30), life: rnd(.6, 1.2), max: 1.2, r: rnd(3, 7), c: '200,200,205', smoke: true });
  }
  function drawDescent() {
    const L = S.L, d = S.d, T = S.T, cx = S.cam, M = Math.min(W, H);
    ctx.fillStyle = '#02040a'; ctx.fillRect(0, 0, W, H); stars(1); earth(W * .86, H * .16, M * .05);
    const g = ctx.createLinearGradient(0, H * .6, 0, H); g.addColorStop(0, '#a3abb5'); g.addColorStop(1, '#343b48');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, H);
    for (let sx = 0; sx <= W + 8; sx += 8) ctx.lineTo(sx, gs(cx + sx));
    ctx.lineTo(W + 8, H); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 2; ctx.beginPath(); for (let sx = 0; sx <= W + 8; sx += 8) { const y = gs(cx + sx); sx ? ctx.lineTo(sx, y) : ctx.moveTo(sx, y); } ctx.stroke();
    for (const r of T.rocks) { const sx = r.x - cx; if (sx < -30 || sx > W + 30) continue; ctx.fillStyle = '#6b7280'; ctx.beginPath(); ctx.ellipse(sx, gs(r.x) - r.r * .4, r.r * 1.3, r.r, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(sx - r.r * .6, gs(r.x) - r.r * 1.1, r.r * .8, 2); }
    if (d.hz) {
      const sx = -cx; ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.ellipse(sx, G0() + 28, 135, 50, 0, 0, 6.3); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(239,68,68,.15)'; ctx.fill(); tag('⚠ HOLES · UNSAFE', sx, G0() - 30, '#ef4444');
    }
    if (['dec2', 'land', 'fall', 'touch'].includes(d.ph) && T.sites) T.sites.forEach((s, i) => {
      const sx = s.x - cx, y = gs(s.x), blink = Math.sin(performance.now() / 250) > 0;
      ctx.fillStyle = '#e5e7eb'; ctx.fillRect(sx - 1, y - 54, 2, 54); ctx.fillStyle = blink ? '#00f2fe' : '#0e7490'; circ(sx, y - 56, 5);
      tag(`SITE ${i + 1} · slope ${s.bad ? '≈15°' : '≈2°'} · boulders: ${s.bad ? 'many' : 'few'}`, sx, y - 84, '#00f2fe');
    });
    if (d.ph === 'dec1' || d.ph === 'dec2') {
      const lx = L.x - cx, gyy = gs(L.x); ctx.fillStyle = 'rgba(0,255,200,.07)'; ctx.beginPath(); ctx.moveTo(lx, L.y + 14); ctx.lineTo(lx - 130, gyy); ctx.lineTo(lx + 130, gyy); ctx.fill();
      tag('HAZARD CAMERA · SCANNING', lx, L.y - 40, '#34d399');
    }
    for (const p of S.fx) { const a = clamp(p.life / p.max, 0, 1); ctx.globalAlpha = a * .6; ctx.fillStyle = `rgb(${p.c})`; circ(p.x - cx, p.y, p.r * (1 + (1 - a) * 1.5)); } ctx.globalAlpha = 1;
    lander(L.x - cx, L.y, L.tilt, L.fire, 1);
  }

  /* =========================================================
     SCENE 4: SURFACE — rover, destination, flag, footprints (stage 8)
     ========================================================= */
  const dest = id => DESTS.find(d => d.id === id);
  function startSurface() {
    S.pend = null; S.sc = 'surface'; S.tw = []; S.fx = []; S.sel = null; S.pr = 0; S.maxX = 0; S.flash = false; S.conf = [];
    clearUI(); S.R = { x: -55, dir: 1, wheel: 0, ph: 'roll' }; S.cam = -W * .3;
    stageUI(8, 'Pragyan is rolling out…');
    go(S.R, { x: 120 }, 3, () => { S.R.ph = 'idle'; showRoute(); });
  }
  function showRoute() {
    document.querySelectorAll('.c3-chip').forEach(c => c.classList.remove('sel'));
    $('c3BtnStart').disabled = true; $('c3Route').classList.add('is-on'); S.sel = null;
    hint('Pick a destination for Pragyan, then press Start. Hint: look for the US flag 🇺🇸');
  }
  function arrive(d) {
    S.R.ph = 'idle'; S.sel = null; beep(880, .12);
    if (d.id === 'flag') {
      toast('You reached the US flag! Look at the ground near it…', 5000); hint('Footprints! Tap the glowing footprints 👇'); S.pr = .01;
    } else { toast(d.icon + ' ' + d.fact, 6000); showRoute(); }
  }
  function updSurface(dt) {
    const R = S.R; let tgt;
    if (R.ph === 'idle' && S.sel) { const d = dest(S.sel); tgt = Math.min((R.x + d.x) / 2 - W / 2, R.x - W * .15); } else tgt = R.x - W * .35;
    S.cam += (tgt - S.cam) * Math.min(1, dt * 2.5);
    if (R.ph === 'drive') {
      const d = dest(S.sel), dx = d.x - R.x, st = Math.min(75 * dt, Math.abs(dx));
      R.dir = dx >= 0 ? 1 : -1; R.x += R.dir * st; R.wheel += R.dir * st * .12; S.maxX = Math.max(S.maxX, R.x);
      if (Math.random() < .5) S.fx.push({ x: R.x - R.dir * 18, y: H * .74 - 2, vx: -R.dir * rnd(10, 40), vy: -rnd(5, 25), life: .8, max: .8, r: rnd(2, 4), c: '190,190,198', smoke: true });
      if (Math.abs(dx) < .5) arrive(d);
    }
    if (S.pr > 0) S.pr = Math.min(1, S.pr + dt * 1.2);
  }
  function drawSurface() {
    const R = S.R, hy = H * .58, by = H * .74, cam = S.cam, sx = x => x - cam, M = Math.min(W, H);
    ctx.fillStyle = '#02040a'; ctx.fillRect(0, 0, W, H); stars(1); earth(W * .82, H * .16, M * .055);
    ctx.fillStyle = '#1b2230'; ctx.beginPath(); ctx.moveTo(0, hy);
    for (let x = 0; x <= W + 20; x += 20) { const wx = x + cam * .25; ctx.lineTo(x, hy - (18 + 30 * Math.abs(Math.sin(wx * .011)) + 16 * Math.abs(Math.sin(wx * .031 + 1)))); }
    ctx.lineTo(W, hy); ctx.fill();
    const g = ctx.createLinearGradient(0, hy, 0, H); g.addColorStop(0, '#8b929c'); g.addColorStop(1, '#2d3340'); ctx.fillStyle = g; ctx.fillRect(0, hy, W, H - hy);
    for (let i = Math.floor(cam / 230) - 1; i < (cam + W) / 230 + 1; i++) {
      const h1 = Math.abs(Math.sin(i * 127.1)), h2 = Math.abs(Math.sin(i * 311.7)), x = sx(i * 230 + h1 * 120), y = by + 30 + h2 * (H - by - 50);
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(x, y, 30 + h1 * 50, 6 + h2 * 8, 0, 0, 6.3); ctx.fill();
    }
    ctx.fillStyle = 'rgba(0,0,0,.28)'; for (let x = 30; x < S.maxX; x += 14) { const px = sx(x); if (px > -10 && px < W + 10) { ctx.fillRect(px, by + 6, 6, 2); ctx.fillRect(px + 7, by + 12, 6, 2); } }
    // Vikram + ramp
    lander(sx(-70), by - FOOT, 0, 0, 1); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx(-60), by - 24); ctx.lineTo(sx(-5), by); ctx.stroke();
    tag('Vikram', sx(-70), by - 70, '#ff9933');
    // destinations
    DESTS.forEach(d => {
      const x = sx(d.x); if (x < -120 || x > W + 120) return;
      if (d.id === 'rocks') [[-30, 8], [-8, 12], [14, 7], [34, 10], [0, 5], [-18, 6]].forEach((r, i) => { ctx.fillStyle = '#6b7280'; ctx.beginPath(); ctx.ellipse(x + r[0], by + 4 + (i % 3) * 5, r[1] * 1.3, r[1], 0, 0, 6.3); ctx.fill(); });
      if (d.id === 'crater') { ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(x, by + 14, 72, 15, 0, 0, 6.3); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 2; ctx.stroke(); }
      if (d.id === 'flag') flag(x, by + 6);
      tag(d.icon + ' ' + d.name, x, by - 92, S.sel === d.id ? '#fbbf24' : '#38bdf8');
      if (S.sel === d.id) { const b = Math.sin(performance.now() / 200) * 4; ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.moveTo(x, by - 66 + b); ctx.lineTo(x - 7, by - 78 + b); ctx.lineTo(x + 7, by - 78 + b); ctx.fill(); }
    });
    // footprints
    if (S.pr > 0) {
      const fx0 = dest('flag').x + 90; ctx.globalAlpha = S.pr;
      for (let i = 0; i < 10; i++) {
        const x = sx(fx0 + i * 26), y = by + 14 + (i % 2) * 13;
        ctx.fillStyle = 'rgba(30,30,40,.6)'; ctx.beginPath(); ctx.ellipse(x, y, 9, 4.5, 0, 0, 6.3); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.25)'; for (let t = -1; t <= 1; t++) ctx.fillRect(x + t * 3 - 1, y - 2, 1.5, 4);
      }
      ctx.globalAlpha = 1;
      const pp = $('c3Prints'); pp.style.left = sx(fx0 + 130) + 'px'; pp.style.top = (by + 4) + 'px'; pp.classList.toggle('is-on', S.pr > .6);
    }
    // path preview
    if (R.ph === 'idle' && S.sel) {
      const d = dest(S.sel), x0 = sx(R.x), x1 = sx(d.x), yy = by + 24;
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(clamp(x1, -20, W + 20), yy); ctx.stroke(); ctx.setLineDash([]);
      const m = Math.round(Math.abs(d.x - R.x) * MPP) + ' m'; tag(x1 > W - 70 ? `${d.icon} ${m} →` : x1 < 70 ? `← ${d.icon} ${m}` : m, clamp(x1, 70, W - 70), yy + 26, '#fbbf24');
    }
    const ry = by - clamp((-5 - R.x) / 50, 0, 1) * 24;
    rover(sx(R.x), ry, R.dir, R.wheel);
    for (const p of S.fx) { const a = clamp(p.life / p.max, 0, 1); ctx.globalAlpha = a * .55; ctx.fillStyle = `rgb(${p.c})`; circ(sx(p.x), p.y, p.r * (1 + (1 - a) * 1.5)); } ctx.globalAlpha = 1;
  }
  function openFlash() {
    if (S.flash) return; S.flash = true; beep(740, .15); $('c3Prints').classList.remove('is-on');
    const f = $('c3Flash');
    f.innerHTML = `<div class="c3-flash-card"><div class="c3-flash-tag">FLASHCARD · APOLLO 11</div><div class="c3-flash-ico">👣</div><h3>Neil Armstrong’s footprints</h3>
      <p>These boot prints belong to <strong>Neil Armstrong</strong>, the first human to walk on the Moon (Apollo 11, 20 July 1969).</p>
      <ul><li>The Moon has no wind or rain, so footprints can last for a very long time.</li><li>Armstrong and Buzz Aldrin explored the Sea of Tranquility and planted the US flag.</li>
      <li class="note">Game note: the real Apollo 11 site is far from Chandrayaan-3’s south-pole landing. Here we imagine Pragyan visiting it.</li></ul>
      <button class="c3-btn c3-btn-gold" id="c3FlashOk" type="button">Continue ➜</button></div>`;
    f.classList.add('is-open'); say('These are the footprints of Neil Armstrong, the first human on the Moon.');
    $('c3FlashOk').onclick = () => { f.classList.remove('is-open'); finish(); };
  }
  function finish() {
    confetti(); result('🌕🇮🇳', 'MISSION COMPLETE', 'Pragyan explored for about one lunar day (~14 Earth days) and detected sulphur and other elements. Then Vikram and Pragyan went into sleep mode as the lunar night began in early September.', '🔄 Play again', () => E.restart(), false);
  }

  /* =========================================================
     MAIN LOOP
     ========================================================= */
  function fit() {
    const w = cv.clientWidth, h = cv.clientHeight, d = Math.min(2, window.devicePixelRatio || 1);
    if (w !== W || h !== H || cv.width !== Math.round(w * d)) { W = w; H = h; cv.width = Math.round(w * d); cv.height = Math.round(h * d); }
    ctx.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0);
  }
  function step(dt) {
    stepTw(dt); fxStep(dt);
    if (S.pend) { S.fade = Math.min(1, S.fade + dt * 2.2); if (S.fade >= 1) { const f = S.pend; S.pend = null; f(); } }
    else if (S.fade > 0) S.fade = Math.max(0, S.fade - dt * 2.2);
    if (S.bigT > 0) { S.bigT -= dt; if (S.bigT <= 0) big(''); }
    if (S.clockOn) { S.clock += dt; const c = Math.floor(S.clock), p = n => String(n).padStart(2, '0'); $('c3MissionClock').textContent = `T+ ${p(Math.floor(c / 3600))}:${p(Math.floor(c % 3600 / 60))}:${p(c % 60)}`; }
    if (S.pend) return;
    ({ launch: updLaunch, space: updSpace, descent: updDescent, surface: updSurface })[S.sc]?.(dt);
  }
  function draw() {
    ({ launch: drawLaunch, space: drawSpace, descent: drawDescent, surface: drawSurface })[S.sc]?.();
    drawConf();
    if (S.fade > 0) { ctx.fillStyle = `rgba(0,0,0,${S.fade})`; ctx.fillRect(0, 0, W, H); }
  }
  function loop(ts) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(.05, (ts - last) / 1000 || 0); last = ts;
    const st = $('chandrayaanStage');
    if (!st || !st.getClientRects().length) { if (!S.hidden) { S.hidden = true; try { speechSynthesis.cancel(); } catch (e) {} } return; }
    S.hidden = false; fit(); step(dt); draw();
  }

  /* =========================================================
     PUBLIC ENGINE
     ========================================================= */
  const E = {
    get stage() { return S.stage || 1; },
    init() {
      if (ready) { this.resume(); return; }
      cv = $('c3Canvas'); if (!cv) return; ctx = cv.getContext('2d'); ready = true;
      $('c3TimelineStrip').innerHTML = STAGES.map((s, i) => `<div class="c3-stage-pill" data-stage="${i + 1}"><span class="pill-num">STAGE 0${i + 1}</span><span class="pill-title">${s[0]}</span></div>`).join('');
      $('c3Dests').innerHTML = DESTS.map(d => `<button class="c3-chip" type="button" data-id="${d.id}">${d.icon} ${d.name}</button>`).join('');
      document.querySelectorAll('.c3-chip').forEach(b => b.onclick = () => {
        if (!S.R || S.R.ph !== 'idle') return;
        S.sel = b.dataset.id; document.querySelectorAll('.c3-chip').forEach(c => c.classList.toggle('sel', c === b)); $('c3BtnStart').disabled = false; beep(600, .06);
        const d = dest(S.sel); hint(`Path set to ${d.name} (≈ ${Math.round(Math.abs(d.x - S.R.x) * MPP)} m). Press Start!`);
      });
      $('c3BtnStart').onclick = () => {
        if (!S.sel || !S.R || S.R.ph !== 'idle') return;
        S.R.ph = 'drive'; $('c3Route').classList.remove('is-on'); beep(500, .1); hint('Pragyan is driving to ' + dest(S.sel).name + '…');
      };
      $('c3Prints').onclick = openFlash;
      $('c3BtnSkip').onclick = () => { if (['launch', 'space'].includes(S.sc) && !S.pend) { setAct(); S.pend = startDescent; } };
      $('c3BtnRestart').onclick = () => this.restart();
      $('c3VoiceToggle').onclick = () => { voice = !voice; $('c3VoiceToggle').textContent = voice ? '🎙️ Voice: ON' : '🎙️ Voice: OFF'; if (!voice) try { speechSynthesis.cancel(); } catch (e) {} };
      $('c3CardNarrateBtn').onclick = () => this.speakStageFact();
      this.restart(); this.resume();
    },
    restart() {
      try { speechSynthesis.cancel(); } catch (e) {}
      clearTimeout(S.tt); S = { tw: [], fx: [], fade: 0, pend: null, clock: 0, clockOn: false, conf: [], sc: 'launch', stage: 1 };
      clearUI(); $('c3MissionClock').textContent = 'T+ 00:00:00';
      S.l = { ph: 'pad', alt: 0, v: 0, cd: 0, n: 0, sep: false, bs: [] };
      stageUI(1, 'Press “Start Countdown” to launch LVM3-M4.');
      setAct('🚀 Start Countdown', () => { S.l.ph = 'count'; S.l.cd = 5.99; });
    },
    goToStage(n) {
      if (!ready) return; n = clamp(n | 0, 1, 8);
      if (n === 1) return this.restart();
      S.tw = []; S.fx = []; clearUI();
      if (n <= 6) startSpace(n - 2); else if (n === 7) startDescent(); else startSurface();
    },
    speakStageFact() { const s = STAGES[(S.stage || 1) - 1]; if (!('speechSynthesis' in window)) return; try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(s[0] + '. ' + s[2]); u.lang = 'en-IN'; speechSynthesis.speak(u); } catch (e) {} },
    resume() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } },
    pause() { if (raf) cancelAnimationFrame(raf); raf = 0; try { speechSynthesis.cancel(); } catch (e) {} },
    stop() { this.pause(); }
  };
  window.Chandrayaan3Engine = E;
})();
