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
          era: 'Amazonian / Hesperian Volcanic Era',
          roverMission: 'NASA Curiosity & ISRO MOM (Mars Orbiter Mission)',
          color: 0x334155,
          confidence: '98.4%',
          facts: 'Dense volcanic rock formed by rapid cooling of basaltic lava from ancient Martian shield volcanoes like Olympus Mons and Tharsis Rise.',
          astrobiology: 'Low organic preservation potential due to high melting temperatures, but porous vesicles often harbor hydrothermal mineral deposits capable of sustaining endolithic microorganisms.',
          spectrometer: [
            { comp: 'SiO2 (Silica)', pct: 49 },
            { comp: 'FeO (Iron Oxide)', pct: 19 },
            { comp: 'Al2O3 (Alumina)', pct: 12 },
            { comp: 'CaO (Calcium)', pct: 11 },
            { comp: 'MgO (Magnesium)', pct: 9 }
          ],
          isru: 'Critical construction resource: can be crushed and melted into basalt continuous filament fibers and cast into radiation-shielded habitat bricks.',
          credits: 50
        },
        {
          id: 'hematite',
          name: 'Hematite Spherules ("Blueberries")',
          classification: 'Iron Oxide Mineral Concretion',
          era: 'Late Noachian / Early Hesperian Transition (~3.7 Ga)',
          roverMission: 'NASA Opportunity Rover (Meridiani Planum)',
          color: 0x64748b,
          confidence: '96.2%',
          facts: 'Discovered by NASA’s Opportunity rover. These spherical mineral nodules crystallized inside water-soaked porous sedimentary rock billions of years ago.',
          astrobiology: 'Strong biomarker environment. Ferric iron oxides on Earth precipitate with the assistance of iron-oxidizing bacteria, making hematite beds prime fossil search locations.',
          spectrometer: [
            { comp: 'Fe2O3 (Hematite)', pct: 74 },
            { comp: 'SiO2 (Quartz)', pct: 14 },
            { comp: 'SO4 (Sulfates)', pct: 7 },
            { comp: 'Ni / Co Trace', pct: 5 }
          ],
          isru: 'Primary feedstock for iron and steel extraction via carbothermal reduction, providing metal beams and magnetic shields for surface infrastructure.',
          credits: 90
        },
        {
          id: 'sandstone',
          name: 'Cross-Bedded Sandstone',
          classification: 'Fluvial-Deltaic Sedimentary Rock',
          era: 'Hesperian Era (Fluvial & Lacustrine Epoch)',
          roverMission: 'NASA Perseverance Rover (Jezero Crater Delta)',
          color: 0xd97706,
          confidence: '94.8%',
          facts: 'Fine-grained sedimentary rock exhibiting rhythmic cross-bedding formed by ancient river currents cascading into a long-lost crater lake.',
          astrobiology: 'Peak astrobiology interest: Fine clays (smectite) in sandstone trap and preserve organic carbon and cellular impressions for billions of years.',
          spectrometer: [
            { comp: 'SiO2 (Silicates)', pct: 62 },
            { comp: 'Fe-Smectite Clays', pct: 21 },
            { comp: 'CaSO4 (Gypsum)', pct: 11 },
            { comp: 'TiO2 (Titanium)', pct: 6 }
          ],
          isru: 'Readily pulverizable regolith aggregate for Martian concrete (sulfur or geopolymers) without needing high-temperature blast furnaces.',
          credits: 60
        },
        {
          id: 'ice',
          name: 'Subsurface Water Ice Soil',
          classification: 'Cryo-Regolith Matrix (Permafrost)',
          era: 'Amazonian Glacial Epoch (Persistent Polar & Mid-Latitude Ice)',
          roverMission: 'NASA Phoenix Lander & ESA Mars Express (MARSIS Radar)',
          color: 0xe0f2fe,
          confidence: '99.1%',
          facts: 'Subsurface slab ice and ice-cemented regolith lying mere centimeters beneath desiccated red dust, kept stable by low thermal conductivity.',
          astrobiology: 'Cryopreserved habitats: Liquid brines formed at ice-salt interfaces could sustain halophilic extremophile life today in subsurface micro-niches.',
          spectrometer: [
            { comp: 'H2O (Purity)', pct: 93 },
            { comp: 'ClO4 (Perchlorate Salts)', pct: 4 },
            { comp: 'Basaltic Dust Inclusions', pct: 3 }
          ],
          isru: 'Vital survival asset: Electrolysis yields Liquid Hydrogen (LH2) and Liquid Oxygen (LOX) rocket propellant, breathable air, and potable drinking water.',
          credits: 120
        },
        {
          id: 'fossil',
          name: 'Biogenic Stromatolite Spheroid',
          classification: 'Possible Micro-Fossil Bio-Signature',
          era: 'Early Noachian Era (> 3.8 Ga, Martian Warm & Wet Epoch)',
          roverMission: 'NASA Mars Sample Return (MSR Campaign Candidate)',
          color: 0x10b981,
          confidence: '91.7%',
          facts: 'Finely laminated calcified domal structure resembling Earth’s 3.5-billion-year-old Archean stromatolites created by ancient photosynthetic microbial mats.',
          astrobiology: 'Historic astrobiological priority! Contains organic carbon ring structures and carbon-12 isotopic depletion signatures indicative of ancient Martian life.',
          spectrometer: [
            { comp: 'CaCO3 (Carbonates)', pct: 44 },
            { comp: 'Organic Carbon / Kerogen', pct: 32 },
            { comp: 'PO4 (Phosphates)', pct: 14 },
            { comp: 'Microcrystalline Silica', pct: 10 }
          ],
          isru: 'Irreplaceable scientific value: Protected sample caching for high-value Mars Sample Return rockets back to Earth containment laboratories.',
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
          classification: 'आग्नेय मेफिक चट्टान',
          era: 'अमेज़ोनियन / हेस्परियन ज्वालामुखीय युग',
          roverMission: 'नासा क्यूरियोसिटी और इसरो मार्स ऑर्बिटर मिशन (MOM)',
          color: 0x334155,
          confidence: '98.4%',
          facts: 'ओलंपस मॉन्स जैसे प्राचीन ज्वालामुखियों के तेजी से ठंडे हुए बेसाल्ट लावा से बनी भारी और सघन चट्टान।',
          astrobiology: 'गर्म लावा में कार्बन नहीं बचता, लेकिन चट्टान के भीतर बने सूक्ष्म छिद्रों में रोगाणु जीवन पनप सकता है।',
          spectrometer: [
            { comp: 'SiO2 (सिलिका)', pct: 49 },
            { comp: 'FeO (आयरन ऑक्साइड)', pct: 19 },
            { comp: 'Al2O3 (एल्यूमिना)', pct: 12 },
            { comp: 'CaO (कैल्शियम)', pct: 11 },
            { comp: 'MgO (मैग्नीशियम)', pct: 9 }
          ],
          isru: 'भविष्य के मंगल बेस के लिए रेडिएशन-प्रूफ ईंटें और मजबूत फाइबर बनाने के काम आता है।',
          credits: 50
        },
        {
          id: 'hematite',
          name: 'हेमेटाइट कंकड़ ("ब्लूबेरी")',
          classification: 'आयरन ऑक्साइड खनिज पिंड',
          era: 'नोचियन / हेस्परियन संक्रमण काल (~3.7 अरब वर्ष)',
          roverMission: 'नासा अपॉर्चुनिटी रोवर (मेरिडियानी प्लेनम)',
          color: 0x64748b,
          confidence: '96.2%',
          facts: 'नासा के अपॉर्चुनिटी रोवर द्वारा खोजे गए ये गोल कंकड़ अरबों साल पहले खड़े भूजल में ही क्रिस्टलीकृत हुए थे।',
          astrobiology: 'पृथ्वी पर आयरन-ऑक्सीडाइजिंग बैक्टीरिया ऐसे खनिज बनाते हैं; यह मंगल पर जीवाश्मों की खोज का प्रमुख केंद्र है।',
          spectrometer: [
            { comp: 'Fe2O3 (हेमेटाइट)', pct: 74 },
            { comp: 'SiO2 (क्वार्ट्ज)', pct: 14 },
            { comp: 'SO4 (सल्फेट)', pct: 7 },
            { comp: 'Ni / Co धातु', pct: 5 }
          ],
          isru: 'मंगल पर स्टील और लोहे के निर्माण का मुख्य कच्चा माल, जो बेस के स्ट्रक्चर बनाने में काम आएगा।',
          credits: 90
        },
        {
          id: 'sandstone',
          name: 'तलछटी बलुआ पत्थर',
          classification: 'नदी डेल्टा अवसादी शैल',
          era: 'हेस्परियन युग (प्राचीन नदी व झील काल)',
          roverMission: 'नासा पर्सीवरेंस रोवर (जेज़ेरो क्रेटर)',
          color: 0xd97706,
          confidence: '94.8%',
          facts: 'मंगल की प्राचीन नदियों और झीलों के मुहाने पर बहे महीन कणों के जमने से बनी खूबसूरत परतदार चट्टान।',
          astrobiology: 'अत्यधिक महत्वपूर्ण: इसकी महीन क्ले मिट्टी कार्बनिक पदार्थों और प्राचीन सूक्ष्मजीवों को अरबों साल तक सुरक्षित रखती है।',
          spectrometer: [
            { comp: 'SiO2 (सिलिकेट्स)', pct: 62 },
            { comp: 'Fe-स्मेक्टाइट क्ले', pct: 21 },
            { comp: 'CaSO4 (जिप्सम)', pct: 11 },
            { comp: 'TiO2 (टाइटेनियम)', pct: 6 }
          ],
          isru: 'मंगल कंक्रीट और बेस निर्माण के लिए उपयुक्त एग्रीगेट, जिसे कम ऊर्जा में इस्तेमाल किया जा सकता है।',
          credits: 60
        },
        {
          id: 'ice',
          name: 'उप-सतही जल बर्फ रेगोलिथ',
          classification: 'क्रायो-रेगोलिथ मैट्रिक्स (पर्माफ्रॉस्ट)',
          era: 'अमेज़ोनियन हिमनद युग',
          roverMission: 'नासा फीनिक्स लैंडर और ईएसए मार्स एक्सप्रेस (MARSIS)',
          color: 0xe0f2fe,
          confidence: '99.1%',
          facts: 'लाल धूल के ठीक कुछ सेंटीमीटर नीचे जमी हुई शुद्ध जल बर्फ, जो मंगल की ठंडी जलवायु में सुरक्षित है।',
          astrobiology: 'नमक और बर्फ के संगम पर तरल ब्राइन सूक्ष्मजीवों (एक्सट्रीमोफाइल्स) को जीवित रखने में सक्षम हो सकता है।',
          spectrometer: [
            { comp: 'H2O (शुद्ध जल)', pct: 93 },
            { comp: 'ClO4 (परक्लोरेट लवण)', pct: 4 },
            { comp: 'बेसाल्ट धूल घटक', pct: 3 }
          ],
          isru: 'मानव जीवन के लिए वरदान: इससे रॉकेट ईंधन (लिक्विड हाइड्रोजन व ऑक्सीजन) और पीने का पानी बनाया जा सकता है।',
          credits: 120
        },
        {
          id: 'fossil',
          name: 'बायोजेनिक स्ट्रोमेटोलाइट जीवाश्म',
          classification: 'संभावित सूक्ष्मजीव जीवाश्म बायो-सिग्नेचर',
          era: 'प्रारंभिक नोचियन युग (> 3.8 अरब वर्ष)',
          roverMission: 'नासा मार्स सैंपल रिटर्न (MSR) मिशन',
          color: 0x10b981,
          confidence: '91.7%',
          facts: 'पृथ्वी के 3.5 अरब वर्ष पुराने स्ट्रोमेटोलाइट जीवाश्मों जैसी परतदार संरचना, जो मंगल पर प्राचीन सूक्ष्मजीवों की मौजूदगी दर्शाती है।',
          astrobiology: 'ऐतिहासिक खोज! इसमें ऑर्गेनिक कार्बन और आइसोटोप अनुपात पाए गए हैं जो प्राचीन जीवन के सबसे मजबूत संकेत हैं।',
          spectrometer: [
            { comp: 'CaCO3 (कार्बोनेट)', pct: 44 },
            { comp: 'ऑर्गेनिक कार्बन / केरोजन', pct: 32 },
            { comp: 'PO4 (फॉस्फेट)', pct: 14 },
            { comp: 'सिलिका मैट्रिक्स', pct: 10 }
          ],
          isru: 'पृथ्वी की आधुनिक प्रयोगशालाओं में उच्च-सटीक विश्लेषण के लिए सील-बंद कंटेनर में संरक्षित नमूना।',
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
        collectHematite: false,
        collectSandstone: false,
        findIce: false,
        collectFossil: false,
        depositBase: false
      };
      this.collectedSampleTypes = new Set();
      this.analyzedSampleTypes = new Set();
      this.activeDossierSample = 0;
      this.lastCollectedIndex = 0;
      this.toastTimeout = null;
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
        const sIndex = closest.userData.sampleIndex;
        const sData = TRANSLATIONS[this.lang].samples[sIndex];
        this.audio.playScanSound();

        this.analyzedSampleTypes.add(sData.id);

        // Update Mission Checkmarks
        if (sData.id === 'basalt') this.missions.scanBasalt = true;
        if (sData.id === 'hematite') this.missions.collectHematite = true;
        if (sData.id === 'sandstone') this.missions.collectSandstone = true;
        if (sData.id === 'ice') this.missions.findIce = true;
        if (sData.id === 'fossil') this.missions.collectFossil = true;

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

      const sIndex = this.targetedSample.userData.sampleIndex;
      const sData = TRANSLATIONS[this.lang].samples[sIndex];

      this.targetedSample.userData.collected = true;
      this.targetedSample.visible = false;
      this.player.backpack.push(sIndex);
      this.collectedSampleTypes.add(sData.id);
      this.lastCollectedIndex = sIndex;

      // Update corresponding mission
      if (sData.id === 'basalt') this.missions.scanBasalt = true;
      if (sData.id === 'hematite') this.missions.collectHematite = true;
      if (sData.id === 'sandstone') this.missions.collectSandstone = true;
      if (sData.id === 'ice') this.missions.findIce = true;
      if (sData.id === 'fossil') this.missions.collectFossil = true;

      this.audio.playCollectSound();

      document.getElementById('marsScannerCard').classList.remove('is-open');
      this.targetedSample = null;

      // Trigger Discovery Toast Notification
      this.showDiscoveryToast(sData);

      this.updateHUD();
    }

    showDiscoveryToast(sData) {
      const toast = document.getElementById('marsToastDiscovery');
      if (!toast) return;
      const titleEl = document.getElementById('marsToastTitle');
      const descEl = document.getElementById('marsToastDesc');
      if (titleEl) {
        titleEl.textContent = this.lang === 'en' ? `Sample Secured: ${sData.name}` : `नमूना सुरक्षित: ${sData.name}`;
      }
      if (descEl) {
        descEl.textContent = this.lang === 'en'
          ? `+${sData.credits} CR • Added to EVA backpack. Click to view scientific dossier.`
          : `+${sData.credits} CR • बैकपैक में जोड़ा गया। वैज्ञानिक विवरण देखें।`;
      }

      toast.style.display = 'flex';
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        toast.style.display = 'none';
      }, 5000);
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
    // SCIENTIFIC SAMPLE DOSSIERS & MISSIONS
    // ------------------------------------------
    openSampleDossier(sampleIndex = 0) {
      const samples = TRANSLATIONS[this.lang].samples;
      this.activeDossierSample = Math.max(0, Math.min(sampleIndex, samples.length - 1));
      const modal = document.getElementById('marsSampleDossierModal');
      if (!modal) return;
      modal.classList.add('is-open');
      this.renderSampleDossier();
    }

    closeSampleDossier() {
      const modal = document.getElementById('marsSampleDossierModal');
      if (modal) modal.classList.remove('is-open');
    }

    renderSampleDossier() {
      const tabsContainer = document.getElementById('marsDossierTabs');
      const contentContainer = document.getElementById('marsDossierContent');
      if (!tabsContainer || !contentContainer) return;

      const samples = TRANSLATIONS[this.lang].samples;
      const activeSample = samples[this.activeDossierSample];

      // Render Tabs
      tabsContainer.innerHTML = '';
      samples.forEach((s, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `mars-dossier-tab-btn ${idx === this.activeDossierSample ? 'active' : ''}`;

        let statusIcon = '🔒';
        if (this.collectedSampleTypes.has(s.id) || this.analyzedSampleTypes.has(s.id)) {
          statusIcon = '✓';
        }
        btn.innerHTML = `<span>${statusIcon}</span> <span>${s.name.split(' ')[0]}</span>`;
        btn.addEventListener('click', () => {
          this.activeDossierSample = idx;
          this.renderSampleDossier();
        });
        tabsContainer.appendChild(btn);
      });

      // Status Pill
      let statusClass = 'uncollected';
      let statusText = this.lang === 'en' ? 'UNDISCOVERED IN FIELD' : 'अभी तक नहीं मिला';
      if (this.player.backpack.includes(this.activeDossierSample)) {
        statusClass = 'in-pack';
        statusText = this.lang === 'en' ? 'IN BACKPACK (UNLOAD AT BASE)' : 'बैकपैक में मौजूद';
      } else if (this.collectedSampleTypes.has(activeSample.id)) {
        statusClass = 'analyzed';
        statusText = this.lang === 'en' ? 'ANALYZED & ARCHIVED' : 'लैब में विश्लेषित व सुरक्षित';
      } else if (this.analyzedSampleTypes.has(activeSample.id)) {
        statusClass = 'analyzed';
        statusText = this.lang === 'en' ? 'SCANNED IN SITU' : 'फील्ड में स्कैन किया गया';
      }

      // Spectrometer Bars HTML
      let spectroHTML = '';
      if (activeSample.spectrometer) {
        spectroHTML = activeSample.spectrometer.map(item => `
          <div class="mars-spectro-item">
            <div class="mars-spectro-label">
              <span>${item.comp}</span>
              <span style="color: #06b6d4; font-weight: bold;">${item.pct}%</span>
            </div>
            <div class="mars-spectro-track">
              <div class="mars-spectro-fill" style="width: ${item.pct}%;"></div>
            </div>
          </div>
        `).join('');
      }

      contentContainer.innerHTML = `
        <div class="mars-dossier-card">
          <div class="mars-dossier-header-row">
            <div>
              <div class="mars-dossier-title">
                <span>🔬</span>
                <span>${activeSample.name}</span>
              </div>
              <div class="mars-dossier-meta">
                ${activeSample.classification} • AI CONFIDENCE: ${activeSample.confidence} • +${activeSample.credits} CREDITS
              </div>
            </div>
            <div class="mars-dossier-status-pill ${statusClass}">${statusText}</div>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <div style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: rgba(249, 115, 22, 0.12); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.3); font-family: var(--mars-mono);">
              <strong>⏳ ERA:</strong> ${activeSample.era || 'Noachian-Hesperian'}
            </div>
            <div style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: rgba(6, 182, 212, 0.12); color: #67e8f9; border: 1px solid rgba(6, 182, 212, 0.3); font-family: var(--mars-mono);">
              <strong>🚀 REAL ROVER:</strong> ${activeSample.roverMission || 'NASA / ISRO Exploration'}
            </div>
          </div>

          <div class="mars-dossier-section">
            <div class="mars-dossier-sec-title">${this.lang === 'en' ? 'Geological Origin & Discovery' : 'भूवैज्ञानिक उत्पत्ति व खोज'}</div>
            <div class="mars-dossier-sec-text">${activeSample.facts}</div>
          </div>

          <div class="mars-dossier-section">
            <div class="mars-dossier-sec-title">${this.lang === 'en' ? 'Alpha Particle X-Ray Spectrometer (APXS) Analysis' : 'एक्स-रे स्पेक्ट्रोमीटर रासायनिक विश्लेषण'}</div>
            <div class="mars-spectro-grid">
              ${spectroHTML}
            </div>
          </div>

          <div class="mars-dossier-section">
            <div class="mars-dossier-sec-title">${this.lang === 'en' ? 'Astrobiology & Life Signatures' : 'खगोल जीवविज्ञान व जीवन के संकेत'}</div>
            <div class="mars-dossier-sec-text">${activeSample.astrobiology}</div>
          </div>

          <div class="mars-dossier-isru-box">
            <div class="mars-dossier-isru-title">
              <span>🏗️</span>
              <span>${this.lang === 'en' ? 'IN-SITU RESOURCE UTILIZATION (ISRU) FOR MARS COLONY' : 'मंगल कॉलोनी निर्माण के लिए उपयोगिता'}</span>
            </div>
            <div class="mars-dossier-isru-desc">${activeSample.isru}</div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px;">
            <button class="mars-btn" id="marsDossierSpeakBtn" type="button" style="font-size: 0.75rem; padding: 6px 12px;">
              🔊 ${this.lang === 'en' ? 'Listen to Intel' : 'ऑडियो सुनें'}
            </button>
          </div>
        </div>
      `;

      const speakBtn = document.getElementById('marsDossierSpeakBtn');
      if (speakBtn) {
        speakBtn.addEventListener('click', () => {
          this.speakIntel(`${activeSample.name}. ${activeSample.facts}. Astrobiology findings: ${activeSample.astrobiology}`);
        });
      }
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

      // Field Mission Objectives Checkmarks
      const mBasalt = document.getElementById('objScanBasalt');
      const mHematite = document.getElementById('objHematite');
      const mSandstone = document.getElementById('objSandstone');
      const mIce = document.getElementById('objFindIce');
      const mFossil = document.getElementById('objFossil');
      const mDeposit = document.getElementById('objDeposit');

      const setObjState = (el, isDone, doneText = '[✓]', pendingText = '[ ]') => {
        if (!el) return;
        el.className = `mars-obj-item ${isDone ? 'is-done' : ''}`;
        const check = el.querySelector('.mars-obj-check');
        if (check) check.textContent = isDone ? doneText : pendingText;
        const tag = el.querySelector('.mars-obj-tag');
        if (tag && isDone && !tag.textContent.includes('DONE')) {
          tag.textContent = 'DONE ✓';
        }
      };

      setObjState(mBasalt, this.missions.scanBasalt);
      setObjState(mHematite, this.missions.collectHematite);
      setObjState(mSandstone, this.missions.collectSandstone);
      setObjState(mIce, this.missions.findIce);
      setObjState(mFossil, this.missions.collectFossil);
      setObjState(mDeposit, this.missions.depositBase, '[✓]', '[ ]');
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
      if (document.getElementById('marsSampleDossierModal').classList.contains('is-open')) {
        this.renderSampleDossier();
      }
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

        // KeyM or KeyL to toggle Sample Dossiers
        if (e.code === 'KeyM' || e.code === 'KeyL') {
          const modal = document.getElementById('marsSampleDossierModal');
          if (modal && modal.classList.contains('is-open')) {
            this.closeSampleDossier();
          } else {
            this.openSampleDossier(this.activeDossierSample);
          }
        }
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

      // Sample Dossiers Modal Trigger & Close
      const btnSampleLog = document.getElementById('marsBtnSampleLog');
      if (btnSampleLog) {
        btnSampleLog.addEventListener('click', () => this.openSampleDossier(this.activeDossierSample));
      }

      const closeDossier = document.getElementById('marsCloseDossierBtn');
      if (closeDossier) {
        closeDossier.addEventListener('click', () => this.closeSampleDossier());
      }

      const btnInspectSample = document.getElementById('marsBtnInspectSample');
      if (btnInspectSample) {
        btnInspectSample.addEventListener('click', () => {
          const sIdx = this.targetedSample ? this.targetedSample.userData.sampleIndex : 0;
          this.openSampleDossier(sIdx);
        });
      }

      const toastBtnView = document.getElementById('marsToastBtnView');
      if (toastBtnView) {
        toastBtnView.addEventListener('click', () => {
          this.openSampleDossier(this.lastCollectedIndex || 0);
          const toast = document.getElementById('marsToastDiscovery');
          if (toast) toast.style.display = 'none';
        });
      }

      // Objective items click to view scientific dossier
      document.querySelectorAll('#marsObjList .mars-obj-item').forEach(item => {
        item.addEventListener('click', () => {
          const sampleIdx = item.getAttribute('data-sample');
          if (sampleIdx !== null && sampleIdx !== undefined) {
            this.openSampleDossier(parseInt(sampleIdx, 10));
          } else {
            this.openSampleDossier(0);
          }
        });
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
