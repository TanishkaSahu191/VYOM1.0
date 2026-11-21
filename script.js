/**
 * VYOM - Space Learning Website
 * ================================================================
 * Phase 1: Interactive Cursor-Tracked Astronaut & SVG Rocket Launch
 * Phase 2: Gamified NASA & ISRO Rocket Selection Hangar & Cryogenic Fueling
 * ================================================================
 */

(() => {
  // ==========================================
  // CONFIGURATION
  // ==========================================
  const CONFIG = {
    headVideoUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e1b48476-24ab-456a-bb12-13e63bc60973.mp4',
    enableAudio: true,
    redirectUrl: null
  };

  // ==========================================
  // DOM REFERENCES - PHASE 1
  // ==========================================
  const stage = document.getElementById('stage');
  const scene = document.getElementById('scene');
  const clip = document.getElementById('headClip');
  const headClipShell = document.querySelector('.head-clip');
  const helmetShell = document.getElementById('helmetShell');
  const pushButton = document.getElementById('pushButton');
  const transition = document.getElementById('rocketTransition');
  const flash = document.getElementById('hyperdriveFlash');
  const destinationPage = document.getElementById('destinationPage');
  const btnReturn = document.getElementById('btnReturnToLaunch');

  // DOM REFERENCES - PHASE 2 (HANGAR & FUELING)
  const rocketGrid = document.getElementById('rocketGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const fleetCount = document.getElementById('fleetCount');
  const userXpDisplay = document.getElementById('userXpDisplay');
  const activeVehicleBanner = document.getElementById('activeVehicleBanner');
  const activeVehicleName = document.getElementById('activeVehicleName');
  const btnResumeCockpit = document.getElementById('btnResumeCockpit');

  const fuelingModal = document.getElementById('fuelingModal');
  const fuelingOverlay = document.getElementById('fuelingOverlay');
  const fuelingTitle = document.getElementById('fuelingTitle');
  const fuelingVehicleName = document.getElementById('fuelingVehicleName');
  const fuelingAgencyBadge = document.getElementById('fuelingAgencyBadge');
  const schematicContainer = document.getElementById('schematicContainer');
  const propellantLabel = document.getElementById('propellantLabel');
  const loxBar = document.getElementById('loxBar');
  const loxPercent = document.getElementById('loxPercent');
  const fuelBar = document.getElementById('fuelBar');
  const fuelPercent = document.getElementById('fuelPercent');
  const countdownDigits = document.getElementById('countdownDigits');
  const btnAbortFueling = document.getElementById('btnAbortFueling');
  const btnProceedCockpit = document.getElementById('btnProceedCockpit');

  const checkAvionics = document.getElementById('checkAvionics');
  const checkTelemetry = document.getElementById('checkTelemetry');
  const checkPressure = document.getElementById('checkPressure');
  const checkTrajectory = document.getElementById('checkTrajectory');

  const cockpitModal = document.getElementById('cockpitModal');
  const cockpitActiveVehicle = document.getElementById('cockpitActiveVehicle');
  const btnBackToHangar = document.getElementById('btnBackToHangar');
  const btnStartPhase3 = document.getElementById('btnStartPhase3');

  // DOM REFERENCES - GLOBAL PHASE NAVIGATOR
  const tabPhase1 = document.getElementById('tabPhase1');
  const tabPhase2 = document.getElementById('tabPhase2');
  const tabPhase3 = document.getElementById('tabPhase3');

  // DOM REFERENCES - PHASE 3 (COCKPIT & SCROLL ENGINE)
  const cockpitStage = document.getElementById('cockpitStage');
  const spaceCanvas = document.getElementById('spaceCanvas');
  const btnStartJourney = document.getElementById('btnStartJourney');
  const btnReturnToHangar = document.getElementById('btnReturnToHangar');
  const btnVoiceToggle = document.getElementById('btnVoiceToggle');
  const voiceToggleLabel = document.getElementById('voiceToggleLabel');
  const btnMuteToggle = document.getElementById('btnMuteToggle');
  const muteIcon = document.getElementById('muteIcon');
  const muteLabel = document.getElementById('muteLabel');
  const btnCcToggle = document.getElementById('btnCcToggle');
  const accessibilityCcBar = document.getElementById('accessibilityCcBar');
  const ccText = document.getElementById('ccText');

  const cockpitSpeed = document.getElementById('cockpitSpeed');
  const cockpitDistance = document.getElementById('cockpitDistance');
  const cockpitObject = document.getElementById('cockpitObject');
  const cockpitTimer = document.getElementById('cockpitTimer');
  const cockpitVehicleBadge = document.getElementById('cockpitVehicleBadge');
  const cockpitPageProgress = document.getElementById('cockpitPageProgress');
  const bottomPhaseProgress = document.getElementById('bottomPhaseProgress');
  const flightModeStatus = document.getElementById('flightModeStatus');
  const mfdTrajectory = document.getElementById('mfdTrajectory');
  const cockpitDashboardOverlay = document.getElementById('cockpitDashboardOverlay');

  // Checkpoint holographic HUD elements removed per user request

  // Phase 4: Satellite Modal Elements
  const satelliteModal = document.getElementById('satelliteModal');
  const satelliteBackdrop = document.getElementById('satelliteBackdrop');
  const btnCloseSatModal = document.getElementById('btnCloseSatModal');
  const satAgencyBadge = document.getElementById('satAgencyBadge');
  const satName = document.getElementById('satName');
  const satOperator = document.getElementById('satOperator');
  const satRocket = document.getElementById('satRocket');
  const satOrbit = document.getElementById('satOrbit');
  const satAltitude = document.getElementById('satAltitude');
  const satRole = document.getElementById('satRole');
  const satDyk = document.getElementById('satDyk');
  const satSourceLink = document.getElementById('satSourceLink');
  const satSourceText = document.getElementById('satSourceText');
  const cockpitLevelRibbon = document.getElementById('cockpitLevelRibbon');

  // Phase 5: Gamification & Quiz DOM Elements
  const hudStreakCount = document.getElementById('hudStreakCount');
  const hudXpCount = document.getElementById('hudXpCount');
  const btnOpenAcademy = document.getElementById('btnOpenAcademy');
  const btnOpenLeaderboard = document.getElementById('btnOpenLeaderboard');
  const btnOpenCertificate = document.getElementById('btnOpenCertificate');
  const btnMfdQuiz = document.getElementById('btnMfdQuiz');
  const mfdQuizLvlBadge = document.getElementById('mfdQuizLvlBadge');

  // Level Complete Prompt
  const levelCompletePrompt = document.getElementById('levelCompletePrompt');
  const lvlCompleteTitle = document.getElementById('lvlCompleteTitle');
  const lvlCompleteDesc = document.getElementById('lvlCompleteDesc');
  const btnPromptStartQuiz = document.getElementById('btnPromptStartQuiz');
  const btnPromptDismiss = document.getElementById('btnPromptDismiss');

  // Quiz Modal Elements
  const quizModal = document.getElementById('quizModal');
  const quizBackdrop = document.getElementById('quizBackdrop');
  const btnCloseQuizModal = document.getElementById('btnCloseQuizModal');
  const quizLevelKicker = document.getElementById('quizLevelKicker');
  const quizScorePill = document.getElementById('quizScorePill');
  const quizXpTag = document.getElementById('quizXpTag');
  const quizQuestionStage = document.getElementById('quizQuestionStage');
  const quizResultsStage = document.getElementById('quizResultsStage');
  const quizProgressFill = document.getElementById('quizProgressFill');
  const quizQNum = document.getElementById('quizQNum');
  const quizQTypeBadge = document.getElementById('quizQTypeBadge');
  const quizQText = document.getElementById('quizQText');
  const quizInteractiveArea = document.getElementById('quizInteractiveArea');
  const quizFeedbackBanner = document.getElementById('quizFeedbackBanner');
  const feedbackStatus = document.getElementById('feedbackStatus');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackIntel = document.getElementById('feedbackIntel');
  const btnNextQuestion = document.getElementById('btnNextQuestion');

  // Quiz Results Elements
  const resultsStars = document.getElementById('resultsStars');
  const resultsTitle = document.getElementById('resultsTitle');
  const resultsSub = document.getElementById('resultsSub');
  const resFinalScore = document.getElementById('resFinalScore');
  const resFinalXp = document.getElementById('resFinalXp');
  const resFinalAccuracy = document.getElementById('resFinalAccuracy');
  const resultsBadgeCard = document.getElementById('resultsBadgeCard');
  const resBadgeIcon = document.getElementById('resBadgeIcon');
  const resBadgeTitle = document.getElementById('resBadgeTitle');
  const resBadgeDesc = document.getElementById('resBadgeDesc');
  const btnResultsNextLevel = document.getElementById('btnResultsNextLevel');
  const btnResultsRetry = document.getElementById('btnResultsRetry');
  const btnResultsLeaderboard = document.getElementById('btnResultsLeaderboard');
  const btnResultsCertificate = document.getElementById('btnResultsCertificate');

  // Leaderboard Elements
  const leaderboardModal = document.getElementById('leaderboardModal');
  const leaderboardBackdrop = document.getElementById('leaderboardBackdrop');
  const btnCloseLeaderboard = document.getElementById('btnCloseLeaderboard');
  const leaderboardTbody = document.getElementById('leaderboardTbody');

  // Certificate Elements
  const certificateModal = document.getElementById('certificateModal');
  const certificateBackdrop = document.getElementById('certificateBackdrop');
  const btnCloseCertificate = document.getElementById('btnCloseCertificate');
  const btnPrintCertificate = document.getElementById('btnPrintCertificate');
  const certCadetInput = document.getElementById('certCadetInput');
  const certRocketName = document.getElementById('certRocketName');
  const certXpVal = document.getElementById('certXpVal');
  const certStarsVal = document.getElementById('certStarsVal');
  const certRankVal = document.getElementById('certRankVal');
  const certBadgesList = document.getElementById('certBadgesList');
  const certIssueDate = document.getElementById('certIssueDate');

  // Phase 6: Today's Transmission & NASA Feed DOM Elements
  const btnOpenTransmission = document.getElementById('btnOpenTransmission');
  const btnOpenTransmissionMfd = document.getElementById('btnOpenTransmissionMfd');
  const mfdTransSnippet = document.getElementById('mfdTransSnippet');
  const transmissionModal = document.getElementById('transmissionModal');
  const transmissionBackdrop = document.getElementById('transmissionBackdrop');
  const btnCloseTransmission = document.getElementById('btnCloseTransmission');
  const panelApod = document.getElementById('panelApod');
  const panelLibrary = document.getElementById('panelLibrary');
  const panelIsro = document.getElementById('panelIsro');
  const apodLoading = document.getElementById('apodLoading');
  const apodContent = document.getElementById('apodContent');
  const apodImage = document.getElementById('apodImage');
  const apodVideo = document.getElementById('apodVideo');
  const apodDate = document.getElementById('apodDate');
  const apodCopyright = document.getElementById('apodCopyright');
  const apodTitle = document.getElementById('apodTitle');
  const apodExplanation = document.getElementById('apodExplanation');
  const btnListenApod = document.getElementById('btnListenApod');
  const btnApodSource = document.getElementById('btnApodSource');
  const librarySearchInput = document.getElementById('librarySearchInput');
  const btnSearchLibrary = document.getElementById('btnSearchLibrary');
  const libraryGrid = document.getElementById('libraryGrid');
  const isroGrid = document.getElementById('isroGrid');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  let objectUrl = '';
  let duration = 5.04;
  let targetTime = duration * 0.5;
  let shownTime = targetTime;
  let lastPointerX = window.innerWidth * 0.5;
  let pointerY = window.innerHeight * 0.5;
  let lastMove = performance.now();
  let clipReady = false;
  let hasShownClip = false;
  let firstSeekDone = false;
  let seeking = false;

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  // ==========================================
  // PURE WEB AUDIO SYNTHESIZER (ZERO ASSETS)
  // ==========================================
  class AudioEngine {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx && CONFIG.enableAudio) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    // Phase 7: Generative Spaceship Reactor & Cabin Ambient Hum (Binaural Drone)
    startAmbientSpaceHum() {
      if (this.ambientHum || !CONFIG.enableAudio || isMuted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      try {
        this.ambientOsc1 = this.ctx.createOscillator();
        this.ambientOsc2 = this.ctx.createOscillator();
        this.ambientLfo = this.ctx.createOscillator();
        this.ambientFilter = this.ctx.createBiquadFilter();
        this.ambientGain = this.ctx.createGain();

        this.ambientOsc1.type = 'sawtooth';
        this.ambientOsc1.frequency.setValueAtTime(55, now); // 55Hz Sub-bass reactor hum

        this.ambientOsc2.type = 'sine';
        this.ambientOsc2.frequency.setValueAtTime(110, now); // 110Hz harmonic

        this.ambientFilter.type = 'lowpass';
        this.ambientFilter.frequency.setValueAtTime(140, now);

        this.ambientLfo.type = 'sine';
        this.ambientLfo.frequency.setValueAtTime(0.12, now); // Slow 0.12Hz binaural drift

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(25, now);
        this.ambientLfo.connect(lfoGain);
        lfoGain.connect(this.ambientFilter.frequency);

        this.ambientGain.gain.setValueAtTime(0.001, now);
        this.ambientGain.gain.linearRampToValueAtTime(0.12, now + 1.8);

        this.ambientOsc1.connect(this.ambientFilter);
        this.ambientOsc2.connect(this.ambientFilter);
        this.ambientFilter.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);

        this.ambientOsc1.start(now);
        this.ambientOsc2.start(now);
        this.ambientLfo.start(now);
        this.ambientHum = true;
      } catch (e) {
        console.warn('Ambient hum error', e);
      }
    }

    stopAmbientSpaceHum() {
      if (!this.ambientHum || !this.ambientGain || !this.ctx) return;
      const now = this.ctx.currentTime;
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        setTimeout(() => {
          try {
            if (this.ambientOsc1) this.ambientOsc1.stop();
            if (this.ambientOsc2) this.ambientOsc2.stop();
            if (this.ambientLfo) this.ambientLfo.stop();
          } catch(e) {}
          this.ambientHum = false;
        }, 600);
      } catch(e) {}
    }

    // Visor Pneumatic Lock & Click
    playVisorLock() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);

      const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.4;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.22);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.26);
    }

    // Rocket Thrust Roar & Deep Bass Rumble
    playRocketLaunch() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sawtooth';
      sub.frequency.setValueAtTime(45, now);
      sub.frequency.exponentialRampToValueAtTime(140, now + 2.2);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 2.0);

      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.45, now + 0.8);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      sub.connect(filter);
      filter.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + 2.6);

      const bufferSize = Math.floor(this.ctx.sampleRate * 2.5);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.8;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(250, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(1600, now + 2.0);
      noiseFilter.Q.value = 1.8;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.02, now);
      noiseGain.gain.linearRampToValueAtTime(0.35, now + 1.0);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 2.6);
    }

    // Warp Hyperdrive Sound
    playWarpSound() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 1.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.7);
    }

    // UI Feedback Beep
    playBeep(freq = 880, duration = 0.08) {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    }

    // Card Selection Electronic Chime
    playCardSelect() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [587.33, 880].forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + idx * 0.07);
        gain.gain.setValueAtTime(0.15, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.2);
      });
    }

    // Cryogenic Fueling Flow Hiss
    playCryoFueling() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const dur = 2.4;
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.value = 3.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.4);
      gain.gain.setValueAtTime(0.18, now + dur - 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + dur + 0.05);
    }

    // Phase 5: Correct Answer Ascending Arpeggio
    playSuccess() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    }

    // Phase 5: Incorrect Answer Downward Buzzer
    playError() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }

    // Phase 5: Badge Fanfare Chime
    playBadgeFanfare() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [392.00, 523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.5);
      });
    }

    // Phase 5: Gold Star Ring
    playStarChime() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [880, 1318.51].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.18, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.35);
      });
    }
  }

  const audio = new AudioEngine();

  // ==========================================
  // PHASE 2: ROCKET FLEET DATA (NASA & ISRO)
  // ==========================================
  const ROCKETS = [
    {
      id: 'lvm3',
      name: 'LVM3 (Launch Vehicle Mark-3)',
      nickname: '"Bahubali" Heavy-Lift',
      agency: 'isro',
      agencyDisplay: 'ISRO // INDIA',
      role: 'Heavy-Lift Planetary Explorer',
      height: '43.5 m',
      diameter: '4.0 m',
      mass: '640 tonnes',
      payloadLEO: '8,000 kg',
      payloadGTO: '4,000 kg',
      stages: '3 Stages (Solid, Liquid, Cryo)',
      propellant: 'Twin S200 Boosters + L110 Liquid Core + C25 Cryogenic Stage',
      fuelType: 'LOX & Liquid Hydrogen (Cryogenic C25)',
      description: 'ISRO’s flagship heavy-lifter. Powered the historic Chandrayaan-3 Moon landing, Chandrayaan-2 lunar orbiter, and is the chosen vehicle for India’s Gaganyaan human spaceflight mission.',
      notableMissions: ['Chandrayaan-3 (Moon South Pole)', 'Chandrayaan-2', 'Gaganyaan TV-D1', 'OneWeb 36-Sat'],
      svg: `
        <svg viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Twin S200 Boosters -->
          <rect x="18" y="90" width="16" height="150" rx="4" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5" />
          <polygon points="18,90 26,65 34,90" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5" />
          <rect x="22" y="240" width="8" height="12" fill="#334155" />
          
          <rect x="66" y="90" width="16" height="150" rx="4" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5" />
          <polygon points="66,90 74,65 82,90" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5" />
          <rect x="70" y="240" width="8" height="12" fill="#334155" />

          <!-- Center Core L110 + C25 -->
          <rect x="36" y="55" width="28" height="190" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
          <path d="M 36 55 Q 50 18 64 55 Z" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
          
          <!-- Livery & Stripes -->
          <rect x="36" y="105" width="28" height="6" fill="#ff9933" />
          <rect x="36" y="115" width="28" height="6" fill="#138808" />
          <text x="50" y="145" font-size="7" font-weight="900" fill="#0f172a" text-anchor="middle" font-family="sans-serif">ISRO</text>
          <text x="50" y="170" font-size="6" font-weight="700" fill="#64748b" text-anchor="middle" font-family="sans-serif">LVM3</text>

          <!-- Core Engines -->
          <polygon points="40,245 46,262 42,262" fill="#1e293b" />
          <polygon points="54,245 60,262 56,262" fill="#1e293b" />
          
          <!-- Thruster Glow -->
          <circle cx="50" cy="265" r="9" fill="#38bdf8" opacity="0.6" filter="blur(4px)" />
        </svg>
      `
    },
    {
      id: 'pslv',
      name: 'PSLV (Polar Satellite Launch Vehicle)',
      nickname: '"The Workhorse of ISRO"',
      agency: 'isro',
      agencyDisplay: 'ISRO // INDIA',
      role: 'Precision Orbit Launcher',
      height: '44.0 m',
      diameter: '2.8 m',
      mass: '320 tonnes',
      payloadLEO: '3,800 kg',
      payloadGTO: '1,425 kg (Sub-GTO)',
      stages: '4 Stages (Solid-Liquid-Solid-Liquid)',
      propellant: 'HTPB Solid + UDMH/N2O4 Liquid Vikas + Solid Core + MMH/MON-3 Liquid',
      fuelType: 'Solid Propellant & Vikas Liquid Engine',
      description: 'ISRO’s legendary reliable workhorse with over 55+ successful launches. Spearheaded India’s first interplanetary voyage to Mars (Mangalyaan) and the Chandrayaan-1 lunar water discovery.',
      notableMissions: ['Mangalyaan (Mars Orbiter)', 'Chandrayaan-1', 'Aditya-L1 (Sun Mission)', '104 Satellites World Record'],
      svg: `
        <svg viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- PSLV Slender Fuselage -->
          <rect x="41" y="42" width="18" height="205" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8" />
          <!-- Nose Cone -->
          <polygon points="41,42 50,15 59,42" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8" />
          
          <!-- 6 Strap-on Boosters (PSLV-XL) -->
          <rect x="33" y="150" width="6" height="85" rx="2" fill="#e2e8f0" stroke="#0f172a" stroke-width="1" />
          <polygon points="33,150 36,138 39,150" fill="#cbd5e1" stroke="#0f172a" stroke-width="1" />
          <rect x="61" y="150" width="6" height="85" rx="2" fill="#e2e8f0" stroke="#0f172a" stroke-width="1" />
          <polygon points="61,150 64,138 67,150" fill="#cbd5e1" stroke="#0f172a" stroke-width="1" />
          
          <!-- Stage Separation Rings -->
          <line x1="41" y1="85" x2="59" y2="85" stroke="#ff9933" stroke-width="2.5" />
          <line x1="41" y1="125" x2="59" y2="125" stroke="#334155" stroke-width="2" />
          <line x1="41" y1="175" x2="59" y2="175" stroke="#138808" stroke-width="2.5" />
          
          <text x="50" y="105" font-size="5" font-weight="900" fill="#0f172a" text-anchor="middle" font-family="sans-serif">INDIA</text>
          <text x="50" y="148" font-size="4.5" font-weight="700" fill="#475569" text-anchor="middle" font-family="sans-serif">PSLV</text>
          
          <!-- Nozzle -->
          <polygon points="44,247 56,247 54,260 46,260" fill="#1e293b" />
          <circle cx="50" cy="264" r="7" fill="#fb923c" opacity="0.6" filter="blur(3px)" />
        </svg>
      `
    },
    {
      id: 'gslv',
      name: 'GSLV Mk II',
      nickname: '"Cryogenic Pioneer"',
      agency: 'isro',
      agencyDisplay: 'ISRO // INDIA',
      role: 'Geosynchronous Satellite Launcher',
      height: '51.7 m',
      diameter: '2.8 m',
      mass: '420 tonnes',
      payloadLEO: '5,000 kg',
      payloadGTO: '2,500 kg',
      stages: '3 Stages (Solid Core + Liquid Strap-ons + Cryo)',
      propellant: '4 Vikas Liquid Strap-ons + Solid Core + Indigenous Cryogenic Stage (CUS)',
      fuelType: 'LOX & Liquid Hydrogen (-250°C CUS Engine)',
      description: 'Features India’s indigenously developed Cryogenic Upper Stage engine, mastering temperatures colder than deep space to deliver heavy satellites directly into geostationary transfer orbits.',
      notableMissions: ['NVS-01 (NavIC Navigation)', 'GSAT-7A Military Comm', 'GISAT-1 EOS', 'GSAT-6A'],
      svg: `
        <svg viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 4 Large Vikas Liquid Strap-ons -->
          <rect x="26" y="115" width="11" height="125" rx="3" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.5" />
          <polygon points="26,115 31.5,95 37,115" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5" />
          <polygon points="28,240 35,240 33,252 30,252" fill="#334155" />
          
          <rect x="63" y="115" width="11" height="125" rx="3" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.5" />
          <polygon points="63,115 68.5,95 74,115" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5" />
          <polygon points="65,240 72,240 70,252 67,252" fill="#334155" />

          <!-- Core Stage -->
          <rect x="39" y="55" width="22" height="188" fill="#ffffff" stroke="#0f172a" stroke-width="1.8" />
          <!-- Bulbous 3.4m Fairing -->
          <path d="M 39 55 Q 35 40 50 16 Q 65 40 61 55 Z" fill="#ffffff" stroke="#0f172a" stroke-width="1.8" />
          
          <rect x="39" y="85" width="22" height="5" fill="#ff9933" />
          <rect x="39" y="94" width="22" height="5" fill="#138808" />
          <text x="50" y="125" font-size="6" font-weight="900" fill="#0f172a" text-anchor="middle" font-family="sans-serif">ISRO</text>
          <text x="50" y="145" font-size="5" font-weight="700" fill="#475569" text-anchor="middle" font-family="sans-serif">GSLV</text>

          <!-- Core Engine -->
          <polygon points="44,243 56,243 53,258 47,258" fill="#1e293b" />
          <circle cx="50" cy="262" r="8" fill="#38bdf8" opacity="0.6" filter="blur(4px)" />
        </svg>
      `
    },
    {
      id: 'saturn5',
      name: 'Saturn V',
      nickname: '"The Apollo Moon Rocket"',
      agency: 'nasa',
      agencyDisplay: 'NASA // USA',
      role: 'Super Heavy Lunar Giant',
      height: '110.6 m',
      diameter: '10.1 m',
      mass: '2,970 tonnes',
      payloadLEO: '140,000 kg',
      payloadGTO: '48,600 kg (Trans-Lunar Injection)',
      stages: '3 Stages (S-IC + S-II + S-IVB)',
      propellant: '5x F-1 (RP-1/LOX) + 5x J-2 (LH2/LOX) + 1x J-2',
      fuelType: 'Rocket Kerosene RP-1 & Liquid Hydrogen',
      description: 'The monumental launch vehicle that propelled humanity to the Moon in July 1969. Generates 7.5 million pounds of thrust from 5 mammoth F-1 engines with a 100% mission success record.',
      notableMissions: ['Apollo 11 (First Moon Landing)', 'Apollo 8 (Lunar Orbit)', 'Apollo 13', 'Skylab Space Station'],
      svg: `
        <svg viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Launch Escape Tower (LET) Needle -->
          <line x1="50" y1="6" x2="50" y2="28" stroke="#ef4444" stroke-width="1.8" />
          <polygon points="48,28 52,28 50,22" fill="#ef4444" />
          <!-- Apollo Command Module -->
          <polygon points="45,36 55,36 50,28" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.2" />

          <!-- Massive S-IVB / S-II / S-IC Fuselage -->
          <rect x="42" y="36" width="16" height="42" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
          <rect x="40" y="78" width="20" height="70" fill="#ffffff" stroke="#0f172a" stroke-width="1.8" />
          <rect x="38" y="148" width="24" height="98" fill="#ffffff" stroke="#0f172a" stroke-width="2" />

          <!-- Famous Black & White Roll Patterns -->
          <rect x="40" y="86" width="10" height="24" fill="#0f172a" />
          <rect x="50" y="110" width="10" height="22" fill="#0f172a" />
          <rect x="38" y="156" width="12" height="34" fill="#0f172a" />
          <rect x="50" y="190" width="12" height="34" fill="#0f172a" />

          <text x="50" y="142" font-size="5" font-weight="900" fill="#ef4444" text-anchor="middle" font-family="sans-serif">USA</text>

          <!-- 4 Aerodynamic Tail Fins -->
          <polygon points="38,230 26,248 38,246" fill="#f8fafc" stroke="#0f172a" stroke-width="1.2" />
          <polygon points="62,230 74,248 62,246" fill="#f8fafc" stroke="#0f172a" stroke-width="1.2" />

          <!-- Mammoth F-1 Engine Bells -->
          <polygon points="40,246 44,246 42,260" fill="#334155" />
          <polygon points="48,246 52,246 50,262" fill="#334155" />
          <polygon points="56,246 60,246 58,260" fill="#334155" />
          <circle cx="50" cy="265" r="10" fill="#f97316" opacity="0.7" filter="blur(4px)" />
        </svg>
      `
    },
    {
      id: 'falcon9',
      name: 'Falcon 9 (Block 5)',
      nickname: '"The Reusable Booster"',
      agency: 'nasa',
      agencyDisplay: 'NASA & SPACEX // USA',
      role: 'Commercial Orbital Workhorse',
      height: '70.0 m',
      diameter: '3.7 m',
      mass: '549 tonnes',
      payloadLEO: '22,800 kg',
      payloadGTO: '8,300 kg',
      stages: '2 Stages (Autonomous Booster + Vacuum Engine)',
      propellant: '9x Merlin 1D (RP-1/LOX) + 1x Merlin Vacuum',
      fuelType: 'Sub-cooled Liquid Oxygen & Densified RP-1 Kerosene',
      description: 'The world’s first orbital class reusable rocket. Capable of re-entering Earth’s atmosphere, deploying titanium grid fins, and executing precision vertical propulsive landings on drone ships.',
      notableMissions: ['Crew Dragon Demo-2', 'NASA DART Asteroid Impact', 'NASA IXPE', '250+ Booster Landings'],
      svg: `
        <svg viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Falcon 9 Slender Booster Body -->
          <rect x="43" y="38" width="14" height="210" rx="1" fill="#f8fafc" stroke="#0f172a" stroke-width="1.6" />
          <!-- Dragon Capsule / Fairing -->
          <polygon points="43,38 50,14 57,38" fill="#f8fafc" stroke="#0f172a" stroke-width="1.6" />
          
          <!-- Black Carbon-Composite Interstage -->
          <rect x="43" y="74" width="14" height="12" fill="#0f172a" />
          
          <!-- Titanium Grid Fins -->
          <rect x="38" y="70" width="5" height="4" fill="#1e293b" />
          <rect x="57" y="70" width="5" height="4" fill="#1e293b" />

          <!-- Falcon 9 Markings & Dragon Logo -->
          <text x="50" y="115" font-size="5" font-weight="900" fill="#0f172a" text-anchor="middle" font-family="sans-serif">SPACEX</text>
          <line x1="47" y1="125" x2="53" y2="125" stroke="#3b82f6" stroke-width="1.5" />
          
          <!-- Landing Legs Outlines -->
          <line x1="43" y1="215" x2="40" y2="246" stroke="#0f172a" stroke-width="1.8" />
          <line x1="57" y1="215" x2="60" y2="246" stroke="#0f172a" stroke-width="1.8" />

          <!-- Octaweb 9 Merlin Engines -->
          <polygon points="45,248 55,248 53,260 47,260" fill="#1e293b" />
          <circle cx="50" cy="264" r="8" fill="#38bdf8" opacity="0.65" filter="blur(3px)" />
        </svg>
      `
    },
    {
      id: 'shuttle',
      name: 'Space Shuttle (STS)',
      nickname: '"The Orbital Glider"',
      agency: 'nasa',
      agencyDisplay: 'NASA // USA',
      role: 'Reusable Crewed Spaceplane',
      height: '56.1 m',
      diameter: '8.4 m (External Tank)',
      mass: '2,030 tonnes',
      payloadLEO: '27,500 kg',
      payloadGTO: 'N/A (LEO Cargo Bay)',
      stages: 'Solid Rocket Boosters + External Tank + Orbiter',
      propellant: '2x Solid Rocket Boosters + 3x RS-25 Main Engines (LH2/LOX)',
      fuelType: 'Solid APCP & Cryogenic Liquid Hydrogen/Oxygen',
      description: 'Humanity’s iconic winged spacecraft that flew 135 missions. Deployed and serviced the Hubble Space Telescope across five daring spacewalk repair missions and built the International Space Station.',
      notableMissions: ['STS-31 (Hubble Deployment)', 'Hubble Servicing Missions 1-5', '37 ISS Assembly Flights', 'STS-95 John Glenn'],
      svg: `
        <svg viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Giant Rust-Orange External Tank (ET) -->
          <rect x="42" y="50" width="16" height="185" rx="3" fill="#c2410c" stroke="#0f172a" stroke-width="1.6" />
          <path d="M 42 50 Q 50 20 58 50 Z" fill="#c2410c" stroke="#0f172a" stroke-width="1.6" />

          <!-- Left Solid Rocket Booster (SRB) -->
          <rect x="25" y="65" width="12" height="175" rx="3" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4" />
          <polygon points="25,65 31,45 37,65" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4" />
          <polygon points="27,240 35,240 33,254 29,254" fill="#334155" />

          <!-- Right Solid Rocket Booster (SRB) -->
          <rect x="63" y="65" width="12" height="175" rx="3" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4" />
          <polygon points="63,65 69,45 75,65" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4" />
          <polygon points="65,240 73,240 71,254 67,254" fill="#334155" />

          <!-- Space Shuttle Orbiter Mounted in Front -->
          <!-- Delta Wings -->
          <polygon points="50,115 30,225 70,225" fill="#0f172a" />
          <!-- Fuselage -->
          <rect x="46" y="115" width="8" height="110" rx="3" fill="#f8fafc" />
          <!-- Cockpit Windows -->
          <path d="M 47 122 Q 50 119 53 122" stroke="#0f172a" stroke-width="1.8" />
          <!-- Tail Fin -->
          <polygon points="49,185 51,185 50,225" fill="#0f172a" />

          <!-- 3 RS-25 Engine Nozzles -->
          <polygon points="47,225 53,225 51,236 49,236" fill="#475569" />
          <circle cx="50" cy="254" r="9" fill="#f97316" opacity="0.6" filter="blur(4px)" />
        </svg>
      `
    },
    {
      id: 'sls',
      name: 'SLS (Space Launch System)',
      nickname: '"The Artemis Megarocket"',
      agency: 'nasa',
      agencyDisplay: 'NASA // USA',
      role: 'Deep Space Super Heavy Launcher',
      height: '98.2 m',
      diameter: '8.4 m',
      mass: '2,600 tonnes',
      payloadLEO: '95,000 kg',
      payloadGTO: '27,000 kg (Trans-Lunar Injection)',
      stages: 'Core Stage + 2x 5-Segment SRBs + ICPS',
      propellant: '2x 5-Segment Solid Boosters + 4x RS-25 Cryogenic Engines',
      fuelType: 'Liquid Hydrogen & Liquid Oxygen (Orange Core)',
      description: 'NASA’s premier exploration megarocket engineered to return humans to the Moon under the Artemis program. Generates 8.8 million pounds of thrust—15% more thrust than the historic Saturn V.',
      notableMissions: ['Artemis I (Orion Lunar Flight)', 'Artemis II (Crewed Flyby)', 'Artemis III (Lunar South Pole)'],
      svg: `
        <svg viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Orion Launch Abort System (LAS) -->
          <line x1="50" y1="8" x2="50" y2="30" stroke="#f8fafc" stroke-width="1.5" />
          <polygon points="47,30 53,30 50,22" fill="#f8fafc" />
          <!-- Orion Capsule -->
          <polygon points="44,42 56,42 50,30" fill="#ffffff" stroke="#0f172a" stroke-width="1.2" />

          <!-- Twin 5-Segment Solid Boosters (White with Red Striping) -->
          <rect x="24" y="65" width="13" height="175" rx="3" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4" />
          <polygon points="24,65 30.5,42 37,65" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4" />
          <line x1="24" y1="46" x2="37" y2="46" stroke="#ef4444" stroke-width="2" />

          <rect x="63" y="65" width="13" height="175" rx="3" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4" />
          <polygon points="63,65 69.5,42 76,65" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4" />
          <line x1="63" y1="46" x2="76" y2="46" stroke="#ef4444" stroke-width="2" />

          <!-- Rust-Orange Cryogenic Core Stage -->
          <rect x="39" y="42" width="22" height="198" fill="#ea580c" stroke="#0f172a" stroke-width="1.8" />
          <text x="50" y="110" font-size="5" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">NASA</text>
          <text x="50" y="135" font-size="4.5" font-weight="700" fill="#ffedd5" text-anchor="middle" font-family="sans-serif">ARTEMIS</text>

          <!-- 4 RS-25 Engine Bells -->
          <polygon points="42,240 46,240 44,255" fill="#1e293b" />
          <polygon points="48,240 52,240 50,257" fill="#1e293b" />
          <polygon points="54,240 58,240 56,255" fill="#1e293b" />
          <circle cx="50" cy="262" r="10" fill="#38bdf8" opacity="0.65" filter="blur(4px)" />
        </svg>
      `
    }
  ];

  // ==========================================
  // STATE MANAGEMENT (PERSISTENCE) - PHASE 2 & 5
  // ==========================================
  const STORAGE_KEY = 'vyom_mission_data';
  let missionState = {
    selectedRocket: null,
    xp: 150,
    currentLevel: 1,
    cadetRank: 'CADET PILOT',
    cadetName: 'Astronaut Cadet',
    levelScores: { 1: 0, 2: 0, 3: 0, 4: 0, bonus: 0 },
    levelStars: { 1: 0, 2: 0, 3: 0, 4: 0, bonus: 0 },
    badges: [],
    streak: 1,
    lastActiveDate: null
  };

  function getCadetRank(xp) {
    if (xp >= 1800) return 'ADMIRAL OF THE COSMOS';
    if (xp >= 1200) return 'FLIGHT COMMANDER';
    if (xp >= 700) return 'DEEP SPACE SPECIALIST';
    if (xp >= 300) return 'ORBITAL NAVIGATOR';
    return 'CADET PILOT';
  }

  function checkDailyStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (!missionState.lastActiveDate) {
      missionState.streak = 1;
      missionState.lastActiveDate = today;
    } else if (missionState.lastActiveDate !== today) {
      const last = new Date(missionState.lastActiveDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        missionState.streak = (missionState.streak || 1) + 1;
      } else if (diffDays > 1) {
        missionState.streak = 1;
      }
      missionState.lastActiveDate = today;
    }
  }

  function loadMissionState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        missionState = {
          ...missionState,
          ...parsed,
          levelScores: { ...missionState.levelScores, ...(parsed.levelScores || {}) },
          levelStars: { ...missionState.levelStars, ...(parsed.levelStars || {}) },
          badges: Array.isArray(parsed.badges) ? parsed.badges : []
        };
      }
    } catch (e) {
      console.warn('Could not load mission state from localStorage', e);
    }
    checkDailyStreak();
    saveMissionState();
    updateStateHUD();
  }

  function saveMissionState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(missionState));
    } catch (e) {
      console.warn('Could not save mission state', e);
    }
    updateStateHUD();
  }

  function updateStateHUD() {
    if (userXpDisplay) {
      userXpDisplay.textContent = `${missionState.xp} XP`;
    }
    if (hudXpCount) {
      hudXpCount.textContent = missionState.xp;
    }
    if (hudStreakCount) {
      hudStreakCount.textContent = missionState.streak || 1;
    }

    missionState.cadetRank = getCadetRank(missionState.xp);

    // Update Ribbon Star Badges
    if (missionState.levelStars) {
      ['1', '2', '3', '4', 'bonus'].forEach(lvl => {
        const starEl = document.getElementById(lvl === 'bonus' ? 'starsLvlBonus' : `starsLvl${lvl}`);
        if (starEl) {
          const count = missionState.levelStars[lvl] || 0;
          starEl.textContent = '★'.repeat(count) + '☆'.repeat(3 - count);
        }
      });
    }

    if (missionState.selectedRocket) {
      if (activeVehicleBanner && activeVehicleName) {
        activeVehicleBanner.style.display = 'flex';
        activeVehicleName.textContent = `${missionState.selectedRocket.name} (${missionState.selectedRocket.agency.toUpperCase()})`;
      }
      if (cockpitActiveVehicle) {
        cockpitActiveVehicle.textContent = `VEHICLE: ${missionState.selectedRocket.name}`;
      }
      if (cockpitVehicleBadge) {
        cockpitVehicleBadge.textContent = `${missionState.selectedRocket.name} (${missionState.selectedRocket.agency.toUpperCase()})`;
      }
    }
  }

  // ==========================================
  // PHASE 2: HANGAR RENDERING & INTERACTION
  // ==========================================
  let currentFilter = 'all';

  function renderRocketGrid() {
    if (!rocketGrid) return;
    rocketGrid.innerHTML = '';

    const filtered = ROCKETS.filter(r => currentFilter === 'all' || r.agency === currentFilter);
    if (fleetCount) fleetCount.textContent = filtered.length;

    filtered.forEach(rocket => {
      const isSelected = missionState.selectedRocket && missionState.selectedRocket.id === rocket.id;
      const card = document.createElement('article');
      card.className = `rocket-card ${rocket.agency}-card ${isSelected ? 'is-selected' : ''}`;
      card.setAttribute('data-id', rocket.id);

      card.innerHTML = `
        <div class="rocket-card-header">
          <span class="agency-badge ${rocket.agency}">
            ${rocket.agency === 'isro' ? '🇮🇳 ISRO' : '🇺🇸 NASA'}
          </span>
          <span class="role-badge">${rocket.role}</span>
        </div>

        <div class="rocket-visual" aria-hidden="true">
          ${rocket.svg}
        </div>

        <div class="rocket-names">
          <h3 class="rocket-title">${rocket.name}</h3>
          <div class="rocket-nickname">${rocket.nickname}</div>
        </div>

        <div class="specs-grid">
          <div class="spec-cell">
            <span class="spec-label">HEIGHT</span>
            <span class="spec-value">${rocket.height}</span>
          </div>
          <div class="spec-cell">
            <span class="spec-label">PAYLOAD (LEO)</span>
            <span class="spec-value">${rocket.payloadLEO}</span>
          </div>
          <div class="spec-cell">
            <span class="spec-label">PROPULSION</span>
            <span class="spec-value">${rocket.stages}</span>
          </div>
          <div class="spec-cell">
            <span class="spec-label">PAYLOAD (GTO / TLI)</span>
            <span class="spec-value">${rocket.payloadGTO}</span>
          </div>
        </div>

        <div class="missions-section">
          <span class="missions-label">NOTABLE MISSIONS</span>
          <div class="missions-chips">
            ${rocket.notableMissions.map(m => `<span class="mission-chip">${m}</span>`).join('')}
          </div>
        </div>

        <button class="btn-select-rocket" type="button">
          <span>${isSelected ? '✓ Assigned to Mission' : 'Select for Mission ➔'}</span>
        </button>
      `;

      // Card Click Handler
      const selectBtn = card.querySelector('.btn-select-rocket');
      selectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        initiateFuelingSequence(rocket);
      });

      card.addEventListener('mouseenter', () => {
        audio.playBeep(1200, 0.02);
      });

      rocketGrid.appendChild(card);
    });
  }

  // Filter Buttons Handling
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      audio.playBeep(900, 0.04);
      renderRocketGrid();
    });
  });

  // ==========================================
  // PRE-FLIGHT FUELING & COUNTDOWN SEQUENCE
  // ==========================================
  let fuelingTimer = null;
  let countdownTimer = null;
  let candidateRocket = null;

  function initiateFuelingSequence(rocket) {
    candidateRocket = rocket;
    audio.playCardSelect();

    // Populate modal data
    if (fuelingVehicleName) fuelingVehicleName.textContent = `${rocket.name} (${rocket.nickname})`;
    if (fuelingAgencyBadge) fuelingAgencyBadge.textContent = `${rocket.agencyDisplay} // PRE-FLIGHT PAD`;
    if (schematicContainer) schematicContainer.innerHTML = rocket.svg;
    if (propellantLabel) propellantLabel.textContent = `${rocket.fuelType.toUpperCase()}`;

    // Reset meters & checks
    loxBar.style.width = '0%';
    loxPercent.textContent = '0%';
    fuelBar.style.width = '0%';
    fuelPercent.textContent = '0%';
    countdownDigits.textContent = 'STANDBY';
    btnProceedCockpit.disabled = true;

    [checkAvionics, checkTelemetry, checkPressure, checkTrajectory].forEach(item => {
      if (item) {
        item.classList.remove('is-done');
        const icon = item.querySelector('.check-icon');
        if (icon) icon.textContent = '⏳';
      }
    });

    fuelingModal.classList.add('is-open');

    // Start Audio Hiss
    audio.playCryoFueling();

    // Progress Simulation over 2.4s
    const startTime = performance.now();
    const duration = 2400;

    function animateFueling(now) {
      const elapsed = now - startTime;
      const progress = clamp(elapsed / duration, 0, 1);
      const percent = Math.floor(progress * 100);

      loxBar.style.width = `${percent}%`;
      loxPercent.textContent = `${percent}%`;
      fuelBar.style.width = `${percent}%`;
      fuelPercent.textContent = `${percent}%`;

      // Diagnostic Milestones
      if (progress >= 0.25 && !checkAvionics.classList.contains('is-done')) {
        checkAvionics.classList.add('is-done');
        checkAvionics.querySelector('.check-icon').textContent = '✓';
        audio.playBeep(650, 0.04);
      }
      if (progress >= 0.50 && !checkTelemetry.classList.contains('is-done')) {
        checkTelemetry.classList.add('is-done');
        checkTelemetry.querySelector('.check-icon').textContent = '✓';
        audio.playBeep(750, 0.04);
      }
      if (progress >= 0.75 && !checkPressure.classList.contains('is-done')) {
        checkPressure.classList.add('is-done');
        checkPressure.querySelector('.check-icon').textContent = '✓';
        audio.playBeep(850, 0.04);
      }

      if (progress < 1) {
        fuelingTimer = requestAnimationFrame(animateFueling);
      } else {
        checkTrajectory.classList.add('is-done');
        checkTrajectory.querySelector('.check-icon').textContent = '✓';
        audio.playBeep(1000, 0.06);
        startCountdown();
      }
    }

    fuelingTimer = requestAnimationFrame(animateFueling);
  }

  function startCountdown() {
    let count = 3;
    countdownDigits.textContent = `T - 0${count}`;
    audio.playBeep(520, 0.09);

    countdownTimer = setInterval(() => {
      count--;
      if (count > 0) {
        countdownDigits.textContent = `T - 0${count}`;
        audio.playBeep(520, 0.09);
      } else {
        clearInterval(countdownTimer);
        countdownDigits.textContent = 'PRESSURIZED // GO FOR LAUNCH';
        audio.playBeep(1040, 0.18);
        btnProceedCockpit.disabled = false;

        // Commit selection to state & reward XP
        missionState.selectedRocket = candidateRocket;
        missionState.xp += 100;
        saveMissionState();
        renderRocketGrid();
      }
    }, 600);
  }

  function abortFueling() {
    if (fuelingTimer) cancelAnimationFrame(fuelingTimer);
    if (countdownTimer) clearInterval(countdownTimer);
    fuelingModal.classList.remove('is-open');
    audio.playBeep(400, 0.08);
  }

  if (btnAbortFueling) btnAbortFueling.addEventListener('click', abortFueling);
  if (fuelingOverlay) fuelingOverlay.addEventListener('click', abortFueling);

  // ==========================================
  // PHASE 3: COCKPIT & CORE SCROLL ENGINE STATE
  // ==========================================
  let voiceNarrationEnabled = true;
  let isMuted = false;
  let ccEnabled = true;
  let flightEngaged = false;
  let isScrollLocked = false;
  let targetZ = 0;
  let currentZ = 0;
  const maxZ = 3500;
  let missionTimerSeconds = 872; // Starts at 00:14:32
  // Checkpoint state variables removed

  // Phase 4: Scientifically Verified Solar System Checkpoints (NASA, ISRO, ESA)
  const CHECKPOINTS = [
    // --- LEVEL 1: LEAVING EARTH & THE MOON ---
    {
      id: 'leo-satellites',
      level: 1,
      z: 70,
      name: 'LEO SATELLITE NETWORK',
      title: 'LOW EARTH ORBIT // SATELLITES & ISS',
      distDisplay: '420 KM ALTITUDE',
      agency: 'NASA • ISRO • ESA',
      agencyBadge: 'NASA/ISRO',
      color: '#38bdf8',
      fact: "Exiting Earth's atmosphere, we enter Low Earth Orbit (LEO) where the International Space Station travels at 27,600 km/h, completing an orbit every 90 minutes. Surrounding it are key navigation and weather constellations including India's NavIC, INSAT-3DR, and the US GPS network.",
      dyk: "GPS satellites experience Einsteinian time dilation! Their atomic clocks run 38 microseconds faster per day than clocks on Earth due to general and special relativity, requiring automated daily corrections.",
      checkpointsList: ['International Space Station (ISS)', 'ISRO NavIC Regional Nav Constellation', 'ISRO INSAT-3DR Weather Sounder', 'US Space Force GPS III Array'],
      sourceName: 'NASA Space Operations & ISRO Earth Observation',
      sourceUrl: 'https://www.nasa.gov/international-space-station/'
    },
    {
      id: 'moon',
      level: 1,
      z: 220,
      name: 'THE MOON',
      title: 'THE MOON // SHIV SHAKTI & TRANQUILITY',
      distDisplay: '384,400 KM FROM EARTH',
      agency: 'ISRO • NASA VERIFIED INTEL',
      agencyBadge: 'ISRO',
      color: '#94a3b8',
      fact: "On August 23, 2023, ISRO's Chandrayaan-3 made history as humanity's first spacecraft to land at the lunar South Pole (Shiv Shakti Point). Its ChaSTE probe recorded that lunar surface temperatures plummeted from +60°C to -10°C just 8 cm under the regolith.",
      dyk: "Apollo 11's bootprints in the lunar dust will endure for over 100 million years because the Moon has no atmosphere, liquid water, or wind erosion to wash them away!",
      checkpointsList: ['Chandrayaan-3 Shiv Shakti Point (69.37°S)', 'Apollo 11 Sea of Tranquility Base', 'Permanently Shadowed Water-Ice Craters'],
      sourceName: 'ISRO Official Chandrayaan-3 Mission Portal',
      sourceUrl: 'https://www.isro.gov.in/Chandrayaan3.html'
    },

    // --- LEVEL 2: INNER PLANETS ---
    {
      id: 'mercury',
      level: 2,
      z: 460,
      name: 'MERCURY',
      title: 'MERCURY // THE METALLIC SWIFT PLANET',
      distDisplay: '91,700,000 KM FROM EARTH',
      agency: 'NASA • ESA BEPICOLOMBO',
      agencyBadge: 'ESA',
      color: '#64748b',
      fact: "Mercury is the smallest planet in the solar system, only slightly larger than Earth's Moon. It has a massive iron-rich metallic core occupying 85% of its entire planetary radius, mapped by NASA's MESSENGER and ESA/JAXA's BepiColombo.",
      dyk: "Mercury endures the most violent temperature swings in the solar system: soaring to a scorching +430°C in direct sunlight, and plunging to a frigid -180°C in shadowed craters!",
      checkpointsList: ['Caloris Impact Basin (1,550 km)', '85% Iron Core Geodynamics', 'ESA BepiColombo Gravitational Assist'],
      sourceName: 'ESA Science & Technology BepiColombo',
      sourceUrl: 'https://www.esa.int/Science_Exploration/Space_Science/BepiColombo_overview'
    },
    {
      id: 'venus',
      level: 2,
      z: 640,
      name: 'VENUS',
      title: 'VENUS // RETROGRADE GREENHOUSE INFERNO',
      distDisplay: '41,400,000 KM FROM EARTH',
      agency: 'NASA • ESA PLANETARY SCIENCE',
      agencyBadge: 'NASA',
      color: '#fbbf24',
      fact: "Venus is Earth's 'evil twin', enveloped in suffocating clouds of concentrated sulfuric acid. A runaway greenhouse effect driven by a 96% CO2 atmosphere traps heat, generating crushing surface pressures of 92 bar and temperatures of 465°C—hot enough to melt lead.",
      dyk: "Venus rotates in retrograde (backwards East-to-West)! A single sidereal day on Venus (243 Earth days) lasts longer than an entire Venusian year (225 Earth days)!",
      checkpointsList: ['Clockwise Retrograde Rotation', 'Lead-Melting 465°C Surface Heat', '92 Atmospheres Crushing Pressure'],
      sourceName: 'NASA Solar System Exploration: Venus',
      sourceUrl: 'https://science.nasa.gov/venus/'
    },
    {
      id: 'mars',
      level: 2,
      z: 840,
      name: 'MARS',
      title: 'MARS // MANGALYAAN & ROVER EXPEDITIONS',
      distDisplay: '54,600,000 KM FROM EARTH',
      agency: 'ISRO • NASA VERIFIED INTEL',
      agencyBadge: 'ISRO',
      color: '#ef4444',
      fact: "Mars hosts Olympus Mons, a titanic shield volcano towering 21.9 km high—nearly 2.5 times the elevation of Mount Everest! India's Mars Orbiter Mission (Mangalyaan) triumphed on its maiden attempt at an unprecedented low cost of $74M, observing methane and coronal escape.",
      dyk: "NASA's Perseverance rover deployed the 1.8-kg Ingenuity helicopter, which completed 72 powered aerodynamic flights through the ultra-thin (1% Earth density) Martian atmosphere, flying for over 2 hours total!",
      checkpointsList: ['Olympus Mons (21.9 km Shield Volcano)', 'ISRO Mangalyaan Maiden Orbital Success', 'NASA Perseverance & Ingenuity 72 Flights'],
      sourceName: 'ISRO Mars Orbiter Mission & NASA Perseverance',
      sourceUrl: 'https://www.isro.gov.in/MarsOrbiterMission_Details.html'
    },

    // --- LEVEL 3: ASTEROID BELT & JUPITER ---
    {
      id: 'asteroids',
      level: 3,
      z: 1120,
      name: 'ASTEROID BELT',
      title: 'ASTEROID BELT // CERES & 16 PSYCHE',
      distDisplay: '320,000,000 KM FROM EARTH',
      agency: 'NASA • ISRO DEEP SPACE',
      agencyBadge: 'NASA',
      color: '#a1a1aa',
      fact: "The Asteroid Belt contains millions of ancient primordial rocks, yet it is over 99.999% empty space. The average separation between major asteroids is about 1 million kilometers, allowing spacecraft to cross safely without evasive maneuvers.",
      dyk: "NASA's Psyche spacecraft is en route to 16 Psyche, an asteroid made almost entirely of metallic iron and nickel—valued at $10,000 quadrillion, more than the entire global economy of Earth!",
      checkpointsList: ['Dwarf Planet Ceres & Ice Mantle', '16 Psyche Metal Core Asteroid', 'Average 1,000,000 km Void Spacing'],
      sourceName: 'NASA Psyche Mission to a Metal World',
      sourceUrl: 'https://science.nasa.gov/mission/psyche/'
    },
    {
      id: 'jupiter',
      level: 3,
      z: 1480,
      name: 'JUPITER',
      title: 'JUPITER // THE GAS GIANT & GREAT RED SPOT',
      distDisplay: '628,000,000 KM FROM EARTH',
      agency: 'NASA JUNO • ESA JUICE',
      agencyBadge: 'NASA',
      color: '#f59e0b',
      fact: "Jupiter is 2.5 times more massive than all other planets in our solar system combined. Its iconic Great Red Spot is an anticyclonic storm wider than Earth that has raged for over 350 years, with roots plunging 500 km deep into the atmosphere as measured by NASA's Juno.",
      dyk: "Jupiter's icy moon Europa contains a global subsurface saltwater ocean with twice the liquid water of all of Earth's oceans combined, shielded beneath an icy crust 15 to 25 km thick!",
      checkpointsList: ['The Great Red Spot (500 km Deep Vortex)', 'Europa Subsurface Liquid Ocean', 'Ganymede Intrinsic Magnetic Field'],
      sourceName: 'NASA Solar System Exploration: Jupiter',
      sourceUrl: 'https://science.nasa.gov/jupiter/'
    },

    // --- LEVEL 4: OUTER PLANETS & BEYOND ---
    {
      id: 'saturn',
      level: 4,
      z: 1880,
      name: 'SATURN',
      title: 'SATURN // CONCENTRIC RINGS & LOW DENSITY',
      distDisplay: '1,280,000,000 KM FROM EARTH',
      agency: 'NASA CASSINI • ESA COLLAB',
      agencyBadge: 'NASA',
      color: '#eab308',
      fact: "Saturn's magnificent ring system spans 282,000 km across, yet averages only 10 to 30 meters in thickness. The ring particles are 99% pure water ice, ranging from tiny dust grains to house-sized boulders orbiting in intricate resonance.",
      dyk: "Saturn is the only planet in the solar system less dense than liquid water! With an average density of just 0.687 g/cm³, Saturn would float if placed in a colossal ocean bathtub!",
      checkpointsList: ['282,000 km Rings / 20m Thickness', 'Density 0.687 g/cm³ (Floats in Water)', 'Cassini 13-Year Exploration Archive'],
      sourceName: 'NASA Cassini Solstice Mission Archive',
      sourceUrl: 'https://science.nasa.gov/mission/cassini/'
    },
    {
      id: 'uranus',
      level: 4,
      z: 2240,
      name: 'URANUS',
      title: 'URANUS // THE SIDEWAYS ICE GIANT',
      distDisplay: '2,720,000,000 KM FROM EARTH',
      agency: 'NASA VOYAGER 2 • ESA HUBBLE',
      agencyBadge: 'NASA',
      color: '#22d3ee',
      fact: "Uranus is an ice giant comprised of water, ammonia, and methane fluids over a rocky core. Its pale aquamarine color comes from atmospheric methane absorbing red photons from the faint distant sunlight.",
      dyk: "Uranus has an extreme axial tilt of 97.77 degrees—it literally rolls around the Sun on its side! Because of this, each pole endures 42 years of continuous sunlight followed by 42 years of freezing polar darkness!",
      checkpointsList: ['97.77° Extreme Sideways Axial Tilt', '42-Year Midnight & Daylight Cycles', '13 Faint Vertical Ring Bands'],
      sourceName: 'NASA Solar System Exploration: Uranus',
      sourceUrl: 'https://science.nasa.gov/uranus/'
    },
    {
      id: 'neptune',
      level: 4,
      z: 2600,
      name: 'NEPTUNE',
      title: 'NEPTUNE // SUPERSONIC ICE GIANT WINDS',
      distDisplay: '4,350,000,000 KM FROM EARTH',
      agency: 'NASA VOYAGER 2 • JAMES WEBB',
      agencyBadge: 'NASA',
      color: '#3b82f6',
      fact: "Neptune is the most distant major planet in the solar system, taking 165 Earth years to complete a single orbit around the Sun. First visited by Voyager 2 in 1989 and now imaged in infrared by NASA's James Webb Space Telescope.",
      dyk: "Neptune harbors the fastest planetary winds in the solar system, roaring at supersonic speeds over 2,160 km/h (>600 m/s)—faster than the speed of sound on Earth!",
      checkpointsList: ['Supersonic Winds Clocking >2,160 km/h', 'Great Dark Spot Storm Systems', 'Cryovolcanic Moon Triton Orbiting Backward'],
      sourceName: 'NASA Solar System Exploration: Neptune',
      sourceUrl: 'https://science.nasa.gov/neptune/'
    },
    {
      id: 'voyager',
      level: 4,
      z: 2950,
      name: 'VOYAGER 1',
      title: 'VOYAGER 1 // INTERSTELLAR SPACE AMBASSADOR',
      distDisplay: '24,300,000,000 KM FROM EARTH',
      agency: 'NASA JET PROPULSION LAB',
      agencyBadge: 'NASA',
      color: '#e2e8f0',
      fact: "Launched in 1977, NASA's Voyager 1 crossed the heliopause into interstellar space in August 2012. It is currently the most distant human-made object in history, speeding at 61,000 km/h through the galactic void outside the Sun's bubble.",
      dyk: "Voyager 1 carries the famous 12-inch gold-plated copper 'Golden Record', containing 115 images of Earth, sounds of nature, musical selections from Bach to Chuck Berry, and spoken greetings in 55 human languages!",
      checkpointsList: ['Crossed Heliopause into Interstellar Space', 'Golden Record Cultural Time Capsule', '22.5 Hour One-Way Radio Transmission'],
      sourceName: 'NASA Voyager Interstellar Mission Portal',
      sourceUrl: 'https://science.nasa.gov/mission/voyager/'
    },

    // --- BONUS LEVEL: BLACK HOLES ---
    {
      id: 'blackhole',
      level: 'bonus',
      z: 3400,
      name: 'SAGITTARIUS A*',
      title: 'SAGITTARIUS A* // SUPERMASSIVE BLACK HOLE',
      distDisplay: '26,000 LIGHT-YEARS (WARP DISTANCE)',
      agency: 'NASA GODDARD • EVENT HORIZON TELESCOPE',
      agencyBadge: 'NASA/EHT',
      color: '#a855f7',
      fact: "Sagittarius A* sits at the gravitational core of our Milky Way galaxy, containing 4.15 million times the mass of our Sun crushed into a region smaller than Mercury's orbit. Nothing—not even light—can escape its event horizon.",
      dyk: "Einstein's General Relativity dictates that extreme gravity acts as a cosmic magnifying glass! Spacetime warping around Sagittarius A* bends light from behind it into a dual-lobed gravitational lensing halo and relativistic photon ring!",
      checkpointsList: ['4.15 Million Solar Mass Singularity', 'Relativistic Accretion Disk & Photon Ring', 'Gravitational Lensing Light Deflection'],
      sourceName: 'NASA Astrophysics: Black Holes & EHT Collaboration',
      sourceUrl: 'https://science.nasa.gov/astrophysics/focus-areas/black-holes/'
    }
  ];

  // Phase 4: Verified LEO & Geostationary Satellites Catalog
  const SATELLITE_CATALOG = {
    iss: {
      id: 'iss',
      name: 'International Space Station (ISS)',
      operator: 'NASA • ESA • JAXA • CSA • Roscosmos',
      agencyBadge: 'NASA/ESA',
      rocket: 'Proton-K / Space Shuttle Assembly Flights',
      orbit: 'Low Earth Orbit (LEO) - 51.6° Inclination',
      altitude: '418 km',
      speed: '27,600 km/h (7.66 km/s)',
      role: 'World-class microgravity research laboratory conducting human physiology, biology, physics, astronomy, and material science experiments in orbit for over 25 continuous years.',
      dyk: 'The ISS is as large as an American football field and its solar arrays cover over 1 acre! Astronauts aboard witness 16 sunrises and sunsets every 24 hours.',
      sourceName: 'NASA Official International Space Station Portal',
      sourceUrl: 'https://www.nasa.gov/international-space-station/'
    },
    navic: {
      id: 'navic',
      name: 'NavIC (IRNSS-1I Constellation)',
      operator: 'ISRO (Indian Space Research Organisation)',
      agencyBadge: 'ISRO',
      rocket: 'PSLV-C41 (XL Configuration)',
      orbit: 'Geosynchronous (GEO) - 29° Inclination',
      altitude: '36,000 km',
      speed: '11,050 km/h (3.07 km/s)',
      role: 'Provides sovereign regional positioning, navigation and precise timing (PNT) services for civilian tracking, disaster response, and mobile integration across India and 1,500 km surrounding borders.',
      dyk: 'NavIC utilizes dual-frequency L5 and S-band civilian signals, which are far less susceptible to equatorial ionospheric delays than standard single-band GPS signals!',
      sourceName: 'ISRO Official NavIC Portal',
      sourceUrl: 'https://www.isro.gov.in/NavIC.html'
    },
    insat: {
      id: 'insat',
      name: 'INSAT-3DR Weather & SAR Satellite',
      operator: 'ISRO (Indian Space Research Organisation)',
      agencyBadge: 'ISRO',
      rocket: 'GSLV-F05 (Indigenous Cryogenic Upper Stage)',
      orbit: 'Geostationary (74° East Longitude)',
      altitude: '35,786 km',
      speed: '11,070 km/h (3.08 km/s)',
      role: 'Advanced meteorological satellite equipped with a 6-channel multispectral optical imager and 19-channel infrared sounder for vertical atmospheric profiles, plus Satellite Aided Search & Rescue (SAS&R).',
      dyk: 'INSAT-3DR can detect cyclone formations hours before coastal radar, and its distress beacon transponder has helped rescue over 2,000 fishermen in distress in the Indian Ocean.',
      sourceName: 'ISRO Official INSAT-3DR Portal',
      sourceUrl: 'https://www.isro.gov.in/INSAT_3DR.html'
    },
    gps: {
      id: 'gps',
      name: 'GPS III Space Vehicle (SV05)',
      operator: 'United States Space Force / NASA',
      agencyBadge: 'NASA',
      rocket: 'Falcon 9 Block 5 (Cape Canaveral)',
      orbit: 'Medium Earth Orbit (MEO) - 55° Inclination',
      altitude: '20,200 km',
      speed: '13,900 km/h (3.87 km/s)',
      role: 'Provides global 24/7 Positioning, Navigation, and Timing (PNT) broadcasting civil and military signals for worldwide commercial aviation, maritime shipping, and consumer smartphones.',
      dyk: 'GPS III satellites feature 3x better accuracy and up to 8x improved anti-jamming capabilities, powered by atomic clocks accurate to within 1 second every 100 million years!',
      sourceName: 'NASA & USSF Global Positioning System Portal',
      sourceUrl: 'https://www.gps.gov/systems/gps/space/'
    },
    hubble: {
      id: 'hubble',
      name: 'Hubble Space Telescope (HST)',
      operator: 'NASA • ESA (European Space Agency)',
      agencyBadge: 'NASA/ESA',
      rocket: 'Space Shuttle Discovery (STS-31)',
      orbit: 'Low Earth Orbit (LEO) - 28.5° Inclination',
      altitude: '540 km',
      speed: '27,300 km/h (7.59 km/s)',
      role: 'Legendary space optical observatory operating above Earth’s atmospheric distortion, capturing groundbreaking ultraviolet, visible, and near-infrared views of deep galaxies and nebulae.',
      dyk: 'Hubble’s primary mirror is so exquisitely polished that if it were scaled to the width of the Atlantic Ocean, the largest imperfection would be less than 6 inches high!',
      sourceName: 'NASA Hubble Space Telescope Mission Portal',
      sourceUrl: 'https://science.nasa.gov/mission/hubble/'
    }
  };

  // Helper to create procedural Canvas textures for planets
  // Phase 7: Atmospheric Rayleigh Scattering Glow Shader (Custom Three.js GLSL)
  function createAtmosphereGlowShader(glowColorHex, radius, power = 2.4, coefficient = 0.72) {
    if (!window.THREE) return new THREE.Group();
    const color = new THREE.Color(glowColorHex);
    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const fragmentShader = `
      uniform vec3 color;
      uniform float power;
      uniform float coefficient;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vec3 viewDir = normalize(-vPosition);
        float intensity = pow(coefficient - dot(vNormal, viewDir), power);
        intensity = clamp(intensity, 0.0, 1.0);
        gl_FragColor = vec4(color, intensity * 0.88);
      }
    `;
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        color: { value: color },
        power: { value: power },
        coefficient: { value: coefficient }
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const geometry = new THREE.SphereGeometry(radius * 1.16, 48, 48);
    return new THREE.Mesh(geometry, material);
  }

  // Phase 7: Procedural 2K Earth Cloud Weather Sphere
  function createEarthCloudsTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Weather bands & cyclonic swirls
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    for (let i = 0; i < 90; i++) {
      ctx.beginPath();
      const cx = Math.random() * canvas.width;
      const cy = 150 + Math.random() * (canvas.height - 300);
      const rx = 80 + Math.random() * 220;
      const ry = 18 + Math.random() * 45;
      const angle = (Math.random() - 0.5) * 0.4;
      ctx.ellipse(cx, cy, rx, ry, angle, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cyclone vortexes
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      const cx = 300 + Math.random() * (canvas.width - 600);
      const cy = 250 + Math.random() * 500;
      ctx.arc(cx, cy, 55 + Math.random() * 60, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  // Phase 7: NASA 2K High-Fidelity Cartographic Textures
  function createPlanetTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (type === 'earth') {
      // 1. Deep Ocean Bathymetry (NASA Blue Marble Gradient)
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      oceanGrad.addColorStop(0, '#0c2340');
      oceanGrad.addColorStop(0.3, '#0b3d91');
      oceanGrad.addColorStop(0.5, '#0284c7');
      oceanGrad.addColorStop(0.7, '#0b3d91');
      oceanGrad.addColorStop(1, '#0c2340');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Continental Landmasses & Forest Biosphere
      ctx.fillStyle = '#15803d'; // Lush green continents
      const continents = [
        { x: 350, y: 350, rx: 220, ry: 160 }, // North America
        { x: 520, y: 680, rx: 160, ry: 240 }, // South America
        { x: 1050, y: 340, rx: 260, ry: 170 }, // Eurasia
        { x: 1040, y: 580, rx: 180, ry: 210 }, // Africa
        { x: 1540, y: 720, rx: 140, ry: 120 }  // Australia
      ];
      continents.forEach(c => {
        ctx.beginPath();
        ctx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        for (let j = 0; j < 8; j++) {
          ctx.beginPath();
          ctx.arc(c.x + (Math.random() - 0.5) * c.rx, c.y + (Math.random() - 0.5) * c.ry, c.rx * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Arid Deserts (Sahara, Gobi, Australian Outback)
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.ellipse(1060, 480, 160, 60, 0, 0, Math.PI * 2); // Sahara
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(1350, 360, 110, 45, 0, 0, Math.PI * 2); // Gobi
      ctx.fill();

      // 4. Polar Ice Caps (Arctic & Antarctica)
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, 90); // North Pole Ice
      ctx.fillRect(0, canvas.height - 110, canvas.width, 110); // South Pole Ice

      // 5. City Lights Emissive Clustered Glow (Night Side)
      ctx.fillStyle = '#fef08a';
      for (let i = 0; i < 400; i++) {
        ctx.fillRect(250 + Math.random() * 1400, 200 + Math.random() * 600, 1.5, 1.5);
      }

    } else if (type === 'moon') {
      // Lunar Regolith & Basaltic Maria
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dark Lunar Maria (Sea of Tranquility, Oceanus Procellarum)
      ctx.fillStyle = '#334155';
      const maria = [
        { x: 750, y: 440, r: 160 },
        { x: 1050, y: 400, r: 190 },
        { x: 1250, y: 480, r: 140 },
        { x: 550, y: 520, r: 130 }
      ];
      maria.forEach(m => {
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Tycho Crater Ray Streaks & Pits
      ctx.fillStyle = '#f1f5f9';
      for (let i = 0; i < 180; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2 + Math.random() * 12, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (type === 'mercury') {
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1e293b';
      for (let i = 0; i < 120; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 15 + Math.random() * 60, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#cbd5e1';
      for (let i = 0; i < 150; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2 + Math.random() * 7, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (type === 'venus') {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.3, '#f59e0b');
      grad.addColorStop(0.7, '#d97706');
      grad.addColorStop(1, '#78350f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(254, 243, 199, 0.4)';
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.ellipse(Math.random() * canvas.width, Math.random() * canvas.height, 160 + Math.random() * 280, 20 + Math.random() * 40, (Math.random() - 0.5) * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (type === 'mars') {
      // Iron Oxide Rust Terrain
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#7c2d12');
      grad.addColorStop(0.3, '#c2410c');
      grad.addColorStop(0.6, '#ea580c');
      grad.addColorStop(1, '#9a3412');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dark Basalt Lowlands (Syrtis Major, Acidalia Planitia)
      ctx.fillStyle = '#431407';
      for (let i = 0; i < 35; i++) {
        ctx.beginPath();
        ctx.ellipse(Math.random() * canvas.width, Math.random() * canvas.height, 90 + Math.random() * 180, 40 + Math.random() * 80, 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Olympus Mons Volcano Caldera
      ctx.fillStyle = '#7c2d12';
      ctx.beginPath();
      ctx.arc(880, 480, 75, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(880, 480, 28, 0, Math.PI * 2);
      ctx.fill();

      // Valles Marineris Canyon Chasm
      ctx.strokeStyle = '#270c04';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(960, 560);
      ctx.bezierCurveTo(1100, 580, 1280, 540, 1420, 580);
      ctx.stroke();

      // White Carbon Dioxide Polar Ice Caps
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, 50);
      ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

    } else if (type === 'jupiter') {
      // Banded Atmospheric Cloud Layers
      const bands = [
        '#78350f', '#fef3c7', '#d97706', '#fed7aa', '#9a3412',
        '#fef3c7', '#c2410c', '#ffedd5', '#b45309', '#fed7aa',
        '#7c2d12', '#fef3c7', '#9a3412', '#ffedd5'
      ];
      const sliceH = canvas.height / bands.length;
      bands.forEach((color, idx) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, idx * sliceH, canvas.width, sliceH + 1);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.ellipse(Math.random() * canvas.width, idx * sliceH + sliceH * 0.5, 90 + Math.random() * 140, sliceH * 0.45, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // The Great Red Spot Giant Oval Storm
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.ellipse(1320, 640, 140, 75, 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.ellipse(1320, 640, 95, 48, 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(1320, 640, 45, 22, 0.08, 0, Math.PI * 2);
      ctx.fill();

    } else if (type === 'saturn') {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#78350f');
      grad.addColorStop(0.3, '#fef08a');
      grad.addColorStop(0.5, '#fde047');
      grad.addColorStop(0.7, '#ca8a04');
      grad.addColorStop(1, '#854d0e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

    } else if (type === 'uranus') {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#06b6d4');
      grad.addColorStop(0.5, '#67e8f9');
      grad.addColorStop(1, '#0891b2');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

    } else if (type === 'neptune') {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#1e3a8a');
      grad.addColorStop(0.4, '#2563eb');
      grad.addColorStop(0.7, '#1d4ed8');
      grad.addColorStop(1, '#172554');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Supersonic storm streaks
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.ellipse(Math.random() * canvas.width, Math.random() * canvas.height, 120 + Math.random() * 220, 10 + Math.random() * 25, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  // Three.js Scene Variables
  let scene3D, camera3D, renderer3D;
  let earthGroup, moonMesh, mercuryMesh, venusGroup, marsGroup, mangalyaanMesh, asteroidGroup;
  let jupiterGroup, jupiterMesh, europaMesh, saturnGroup, uranusGroup, neptuneMesh, voyagerGroup, blackHoleGroup;
  let starsMesh;
  let earthCloudMesh;
  let cosmicDustMesh;
  let isLowQualityMode = localStorage.getItem('vyom_perf_mode') === 'eco';
  let issGroup, navicGroup, insatGroup, gpsGroup, hubbleGroup;
  let clickableObjects3D = [];
  let isThreeInitialized = false;

  function initThreeEngine() {
    if (isThreeInitialized || !window.THREE || !spaceCanvas) return;
    isThreeInitialized = true;

    // 1. Scene & Camera (Facing -Z into the depths of the Solar System)
    scene3D = new THREE.Scene();
    scene3D.fog = new THREE.FogExp2(0x000208, 0.0003);

    camera3D = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera3D.position.set(0, 0, 0);

    // 2. WebGL Renderer
    renderer3D = new THREE.WebGLRenderer({
      canvas: spaceCanvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer3D.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer3D.setSize(window.innerWidth, window.innerHeight);
    renderer3D.toneMapping = THREE.ACESFilmicToneMapping;
    renderer3D.toneMappingExposure = 1.2;

    // 3. Realistic Solar System Lighting
    const deepSpaceAmbient = new THREE.AmbientLight(0x1e293b, 1.4);
    scene3D.add(deepSpaceAmbient);

    const solarSunLight = new THREE.DirectionalLight(0xfffaed, 3.2);
    solarSunLight.position.set(-600, 350, 200);
    scene3D.add(solarSunLight);

    // 4. Procedural 3D Starfield (4,000 Multi-spectral Stars)
    const starGeo = new THREE.BufferGeometry();
    const starCount = 4000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 4000;
      const y = (Math.random() - 0.5) * 3000;
      const z = -(Math.random() * 3200);

      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;

      const r = 0.82 + Math.random() * 0.18;
      const g = 0.85 + Math.random() * 0.15;
      const b = 0.92 + Math.random() * 0.08;
      starColors[i * 3] = r;
      starColors[i * 3 + 1] = g;
      starColors[i * 3 + 2] = b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.9
    });
    starsMesh = new THREE.Points(starGeo, starMat);
    scene3D.add(starsMesh);

    clickableObjects3D = [];

    // Helper to create high-detail 3D satellite models
    function createISSSatellite() {
      const g = new THREE.Group();
      const truss = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.25, 0.25), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 }));
      g.add(truss);
      const mod = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 2.2, 16), new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.4, roughness: 0.3 }));
      mod.rotation.x = Math.PI / 2;
      g.add(mod);
      for (let i = -1; i <= 1; i += 2) {
        const wing = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.05, 0.9), new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x0369a1, emissiveIntensity: 0.3 }));
        wing.position.set(i * 2.2, 0, 0);
        g.add(wing);
      }
      return g;
    }

    function createProbeSatellite(bodyColor, solarColor) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 1.2), new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.85, roughness: 0.25 }));
      g.add(body);
      const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.1, 0.3, 16), new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.8 }));
      dish.position.set(0, 0, 0.7);
      dish.rotation.x = Math.PI / 2;
      g.add(dish);
      for (let i = -1; i <= 1; i += 2) {
        const wing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 0.7), new THREE.MeshStandardMaterial({ color: solarColor, emissive: solarColor, emissiveIntensity: 0.2 }));
        wing.position.set(i * 1.4, 0, 0);
        g.add(wing);
      }
      return g;
    }

    // 5. Level 1: Earth, Moon & Orbiting Satellites (Z = -160)
    earthGroup = new THREE.Group();
    earthGroup.position.set(18, -4, -160);

    const earthGeo = new THREE.SphereGeometry(25, 48, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      map: createPlanetTexture('earth'),
      roughness: 0.55,
      metalness: 0.1
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.userData = { checkpointId: 'leo-satellites' };
    clickableObjects3D.push(earthMesh);
    earthGroup.add(earthMesh);

    // Phase 7: Atmospheric Rayleigh Scattering Glow Shader (Custom Three.js GLSL)
    const earthAtmoGlow = createAtmosphereGlowShader(0x38bdf8, 25, 2.5, 0.72);
    earthGroup.add(earthAtmoGlow);

    // Phase 7: Dynamic Weather Cloud Sphere Layer
    const earthCloudGeo = new THREE.SphereGeometry(25.4, 48, 48);
    const earthCloudMat = new THREE.MeshStandardMaterial({
      map: createEarthCloudsTexture(),
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    earthCloudMesh = new THREE.Mesh(earthCloudGeo, earthCloudMat);
    earthGroup.add(earthCloudMesh);

    // Orbiting Satellites around Earth (Clickable in 3D!)
    issGroup = new THREE.Group();
    const issModel = createISSSatellite();
    issModel.position.set(33, 2, 0);
    issModel.userData = { satId: 'iss' };
    issModel.children.forEach(c => c.userData = { satId: 'iss' });
    clickableObjects3D.push(issModel);
    issGroup.add(issModel);
    earthGroup.add(issGroup);

    navicGroup = new THREE.Group();
    const navicModel = createProbeSatellite(0xd97706, 0x38bdf8); // ISRO Saffron & Cyan
    navicModel.position.set(0, 44, 0);
    navicModel.rotation.x = 0.5;
    navicModel.userData = { satId: 'navic' };
    navicModel.children.forEach(c => c.userData = { satId: 'navic' });
    clickableObjects3D.push(navicModel);
    navicGroup.add(navicModel);
    earthGroup.add(navicGroup);

    insatGroup = new THREE.Group();
    const insatModel = createProbeSatellite(0x15803d, 0x0284c7); // ISRO Green & Blue
    insatModel.position.set(-48, -4, 0);
    insatModel.userData = { satId: 'insat' };
    insatModel.children.forEach(c => c.userData = { satId: 'insat' });
    clickableObjects3D.push(insatModel);
    insatGroup.add(insatModel);
    earthGroup.add(insatGroup);

    gpsGroup = new THREE.Group();
    const gpsModel = createProbeSatellite(0x2563eb, 0x38bdf8);
    gpsModel.position.set(28, -26, 0);
    gpsModel.rotation.z = 0.6;
    gpsModel.userData = { satId: 'gps' };
    gpsModel.children.forEach(c => c.userData = { satId: 'gps' });
    clickableObjects3D.push(gpsModel);
    gpsGroup.add(gpsModel);
    earthGroup.add(gpsGroup);

    hubbleGroup = new THREE.Group();
    const hubbleModel = createProbeSatellite(0x94a3b8, 0x0ea5e9);
    hubbleModel.position.set(-24, 22, 0);
    hubbleModel.userData = { satId: 'hubble' };
    hubbleModel.children.forEach(c => c.userData = { satId: 'hubble' });
    clickableObjects3D.push(hubbleModel);
    hubbleGroup.add(hubbleModel);
    earthGroup.add(hubbleGroup);

    // The Moon with Chandrayaan-3 Shiv Shakti Beacon
    const moonGeo = new THREE.SphereGeometry(7.2, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      map: createPlanetTexture('moon'),
      roughness: 0.85
    });
    moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(45, 10, -50);
    moonMesh.userData = { checkpointId: 'moon' };
    clickableObjects3D.push(moonMesh);

    const shivShaktiPin = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x22c55e })
    );
    shivShaktiPin.position.set(0, -6.8, 1.2);
    moonMesh.add(shivShaktiPin);

    earthGroup.add(moonMesh);
    scene3D.add(earthGroup);

    // 6. Level 2: Inner Planets (Mercury, Venus, Mars)
    // Mercury (Z = -460)
    const mercuryGeo = new THREE.SphereGeometry(10, 32, 32);
    const mercuryMat = new THREE.MeshStandardMaterial({
      map: createPlanetTexture('mercury'),
      roughness: 0.88,
      metalness: 0.2
    });
    mercuryMesh = new THREE.Mesh(mercuryGeo, mercuryMat);
    mercuryMesh.position.set(-16, 5, -460);
    mercuryMesh.userData = { checkpointId: 'mercury' };
    clickableObjects3D.push(mercuryMesh);
    scene3D.add(mercuryMesh);

    // Venus (Z = -640)
    venusGroup = new THREE.Group();
    venusGroup.position.set(18, -4, -640);
    const venusGeo = new THREE.SphereGeometry(20, 48, 48);
    const venusMat = new THREE.MeshStandardMaterial({
      map: createPlanetTexture('venus'),
      roughness: 0.45,
      metalness: 0.1
    });
    const venusBody = new THREE.Mesh(venusGeo, venusMat);
    venusBody.userData = { checkpointId: 'venus' };
    clickableObjects3D.push(venusBody);
    venusGroup.add(venusBody);

    // Phase 7: Venus Sulfuric Atmospheric Glow Shader
    const venusAtmoGlow = createAtmosphereGlowShader(0xf59e0b, 20, 2.2, 0.70);
    venusGroup.add(venusAtmoGlow);
    scene3D.add(venusGroup);

    // Mars (Z = -840) with Olympus Mons & Mangalyaan
    marsGroup = new THREE.Group();
    marsGroup.position.set(-16, 5, -840);

    const marsGeo = new THREE.SphereGeometry(17, 48, 48);
    const marsMat = new THREE.MeshStandardMaterial({
      map: createPlanetTexture('mars'),
      roughness: 0.72,
      metalness: 0.15
    });
    const marsBody = new THREE.Mesh(marsGeo, marsMat);
    marsBody.userData = { checkpointId: 'mars' };
    clickableObjects3D.push(marsBody);
    marsGroup.add(marsBody);

    // Olympus Mons Caldera Volcano Pin
    const olympusMonsPin = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 1.8, 16),
      new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.9 })
    );
    olympusMonsPin.position.set(4, 3, 16);
    olympusMonsPin.rotation.x = Math.PI / 2;
    marsBody.add(olympusMonsPin);

    // Orbiting Mangalyaan Probe
    mangalyaanMesh = createProbeSatellite(0xd97706, 0x22c55e);
    mangalyaanMesh.position.set(24, 0, 0);
    mangalyaanMesh.userData = { checkpointId: 'mars' };
    marsGroup.add(mangalyaanMesh);
    scene3D.add(marsGroup);

    // 7. Level 3: Asteroid Belt & Jupiter
    // Asteroid Belt (Z = -1120) with 16 Psyche
    asteroidGroup = new THREE.Group();
    asteroidGroup.position.set(0, 0, -1120);

    const rockGeo = new THREE.DodecahedronGeometry(2.4, 1);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x71717a,
      roughness: 0.95,
      flatShading: true
    });

    for (let i = 0; i < 200; i++) {
      const rock = new THREE.Mesh(rockGeo, rockMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = 80 + Math.random() * 140;
      rock.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 60, Math.sin(angle) * radius);
      const scale = 0.5 + Math.random() * 2.4;
      rock.scale.set(scale, scale * (0.8 + Math.random() * 0.4), scale);
      rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      asteroidGroup.add(rock);
    }

    // 16 Psyche Metallic Asteroid
    const psycheGeo = new THREE.DodecahedronGeometry(5.5, 2);
    const psycheMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.95,
      roughness: 0.25,
      flatShading: true
    });
    const psycheMesh = new THREE.Mesh(psycheGeo, psycheMat);
    psycheMesh.position.set(35, 6, 0);
    psycheMesh.userData = { checkpointId: 'asteroids' };
    clickableObjects3D.push(psycheMesh);
    asteroidGroup.add(psycheMesh);
    scene3D.add(asteroidGroup);

    // Jupiter & Great Red Spot (Z = -1480) with Europa
    jupiterGroup = new THREE.Group();
    jupiterGroup.position.set(28, -8, -1480);

    const jupiterGeo = new THREE.SphereGeometry(46, 48, 48);
    const jupiterMat = new THREE.MeshStandardMaterial({
      map: createPlanetTexture('jupiter'),
      roughness: 0.65
    });
    jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiterMesh.userData = { checkpointId: 'jupiter' };
    clickableObjects3D.push(jupiterMesh);
    jupiterGroup.add(jupiterMesh);

    const europaGeo = new THREE.SphereGeometry(4.2, 24, 24);
    const europaMat = new THREE.MeshStandardMaterial({ color: 0xe0f2fe, roughness: 0.3 });
    europaMesh = new THREE.Mesh(europaGeo, europaMat);
    europaMesh.position.set(70, 6, 0);
    jupiterGroup.add(europaMesh);

    scene3D.add(jupiterGroup);

    // 8. Level 4: Outer Planets & Beyond (Saturn, Uranus, Neptune, Voyager 1)
    // Saturn (Z = -1880)
    saturnGroup = new THREE.Group();
    saturnGroup.position.set(-24, 7, -1880);
    saturnGroup.rotation.z = 0.38;

    const saturnGeo = new THREE.SphereGeometry(36, 48, 48);
    const saturnMat = new THREE.MeshStandardMaterial({
      map: createPlanetTexture('saturn'),
      roughness: 0.6
    });
    const saturnBody = new THREE.Mesh(saturnGeo, saturnMat);
    saturnBody.userData = { checkpointId: 'saturn' };
    clickableObjects3D.push(saturnBody);
    saturnGroup.add(saturnBody);

    const ringGeo = new THREE.RingGeometry(46, 84, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      map: createPlanetTexture('saturn-ring'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    saturnGroup.add(ringMesh);
    scene3D.add(saturnGroup);

    // Uranus (Z = -2240) - Extreme 97.77° Sideways Roll
    uranusGroup = new THREE.Group();
    uranusGroup.position.set(22, -6, -2240);
    uranusGroup.rotation.z = (97.77 * Math.PI) / 180;

    const uranusGeo = new THREE.SphereGeometry(28, 48, 48);
    const uranusMat = new THREE.MeshStandardMaterial({
      map: createPlanetTexture('uranus'),
      roughness: 0.5
    });
    const uranusBody = new THREE.Mesh(uranusGeo, uranusMat);
    uranusBody.userData = { checkpointId: 'uranus' };
    clickableObjects3D.push(uranusBody);
    uranusGroup.add(uranusBody);

    const uranusRingGeo = new THREE.RingGeometry(35, 48, 64);
    const uranusRingMat = new THREE.MeshBasicMaterial({
      color: 0xa5f3fc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const uranusRing = new THREE.Mesh(uranusRingGeo, uranusRingMat);
    uranusRing.rotation.x = Math.PI / 2;
    uranusGroup.add(uranusRing);
    scene3D.add(uranusGroup);

    // Neptune (Z = -2600) - Supersonic Winds
    const neptuneGeo = new THREE.SphereGeometry(27, 48, 48);
    const neptuneMat = new THREE.MeshStandardMaterial({
      map: createPlanetTexture('neptune'),
      roughness: 0.48
    });
    neptuneMesh = new THREE.Mesh(neptuneGeo, neptuneMat);
    neptuneMesh.position.set(-20, 6, -2600);
    neptuneMesh.userData = { checkpointId: 'neptune' };
    clickableObjects3D.push(neptuneMesh);
    scene3D.add(neptuneMesh);

    // Phase 7: Neptune Deep Azure Atmosphere Glow Shader
    const neptuneAtmoGlow = createAtmosphereGlowShader(0x0284c7, 26, 2.5, 0.72);
    neptuneAtmoGlow.position.set(-20, 6, -2600);
    scene3D.add(neptuneAtmoGlow);

    // Voyager 1 Spacecraft (Z = -2950)
    voyagerGroup = new THREE.Group();
    voyagerGroup.position.set(0, 4, -2950);

    const voyagerDish = new THREE.Mesh(
      new THREE.CylinderGeometry(4.2, 0.4, 1.2, 32),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.3, roughness: 0.4 })
    );
    voyagerDish.rotation.x = Math.PI / 2;
    voyagerGroup.add(voyagerDish);

    const voyagerBus = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 1.6, 2.0),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.3 })
    );
    voyagerBus.position.set(0, 0, -1.2);
    voyagerGroup.add(voyagerBus);

    // Golden Record
    const goldenRecord = new THREE.Mesh(
      new THREE.CircleGeometry(1.2, 32),
      new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.98, roughness: 0.15 })
    );
    goldenRecord.position.set(1.1, 0, -1.2);
    goldenRecord.rotation.y = Math.PI / 2;
    voyagerGroup.add(goldenRecord);

    // Radio Beacon Pulse
    const signalBeam = new THREE.Mesh(
      new THREE.RingGeometry(0.8, 1.2, 24),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })
    );
    signalBeam.position.set(0, 0, 1.2);
    voyagerGroup.add(signalBeam);

    voyagerGroup.userData = { checkpointId: 'voyager' };
    clickableObjects3D.push(voyagerDish);
    clickableObjects3D.push(voyagerBus);
    scene3D.add(voyagerGroup);

    // 9. BONUS LEVEL: Sagittarius A* Supermassive Black Hole (Z = -3400)
    blackHoleGroup = new THREE.Group();
    blackHoleGroup.position.set(0, 0, -3400);

    // Event Horizon (Pure Black Sphere)
    const horizonGeo = new THREE.SphereGeometry(18, 48, 48);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eventHorizon = new THREE.Mesh(horizonGeo, horizonMat);
    eventHorizon.userData = { checkpointId: 'blackhole' };
    clickableObjects3D.push(eventHorizon);
    blackHoleGroup.add(eventHorizon);

    // Relativistic Swirling Accretion Disk
    const diskGeo = new THREE.RingGeometry(22, 65, 64);
    const diskMat = new THREE.MeshBasicMaterial({
      map: createPlanetTexture('accretion-disk'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92
    });
    const accretionDisk = new THREE.Mesh(diskGeo, diskMat);
    accretionDisk.rotation.x = Math.PI / 2.3;
    blackHoleGroup.add(accretionDisk);

    // Gravitational Lensing Photon Ring Halo
    const lensingHaloGeo = new THREE.RingGeometry(18.2, 24.5, 64);
    const lensingHaloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const lensingHalo = new THREE.Mesh(lensingHaloGeo, lensingHaloMat);
    blackHoleGroup.add(lensingHalo);

    scene3D.add(blackHoleGroup);

    // Phase 7: Interstellar Cosmic Dust Particles Field
    const dustCount = isLowQualityMode ? 120 : 360;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 80;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      dustPositions[i * 3 + 2] = -(Math.random() * 3200);
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 1.5,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    cosmicDustMesh = new THREE.Points(dustGeo, dustMat);
    scene3D.add(cosmicDustMesh);

    // Raycasting for interactive 3D clicks on satellites & planets
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    spaceCanvas.addEventListener('click', (e) => {
      if (!camera3D || !scene3D || !clickableObjects3D.length) return;
      const rect = spaceCanvas.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseCoord, camera3D);
      const hits = raycaster.intersectObjects(clickableObjects3D, true);

      if (hits.length > 0) {
        let obj = hits[0].object;
        while (obj && !obj.userData.satId && !obj.userData.checkpointId && obj.parent) {
          obj = obj.parent;
        }
        if (obj && obj.userData.satId) {
          openSatelliteModal(obj.userData.satId);
        } else if (obj && obj.userData.checkpointId) {
          // Checkpoints removed per user request
        }
      }
    });

    scene3D.add(camera3D);

    // Resize listener
    window.addEventListener('resize', () => {
      if (!camera3D || !renderer3D) return;
      camera3D.aspect = window.innerWidth / window.innerHeight;
      camera3D.updateProjectionMatrix();
      renderer3D.setSize(window.innerWidth, window.innerHeight);
    });

    animateThree();
  }

  function animateThree() {
    requestAnimationFrame(animateThree);

    if (cockpitStage && cockpitStage.style.display !== 'none') {
      currentZ += (targetZ - currentZ) * 0.08;

      // Realistic 3D mouse look & parallax
      const normMouseX = (lastPointerX / window.innerWidth - 0.5) * 2;
      const normMouseY = (pointerY / window.innerHeight - 0.5) * 2;

      camera3D.rotation.y = -normMouseX * 0.16;
      camera3D.rotation.x = -normMouseY * 0.12;
      camera3D.rotation.z = normMouseX * 0.02;

      // Physical camera lateral shift for true depth parallax
      camera3D.position.x = normMouseX * 0.65;
      camera3D.position.y = normMouseY * 0.42;
      camera3D.position.z = -currentZ;



      // Phase 7: Multi-Plane 3D Parallax on Cockpit Interior Structure
      if (seatPilotLeft && seatCopilotRight) {
        const sTransform = `translate3d(${normMouseX * 24}px, ${normMouseY * 14}px, 0)`;
        seatPilotLeft.style.transform = sTransform;
        seatCopilotRight.style.transform = sTransform;
      }
      if (cockpitDashboardOverlay) {
        const tiltX = -normMouseY * 6;
        const tiltY = normMouseX * 7;
        const shiftX = normMouseX * 10;
        cockpitDashboardOverlay.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateX(${shiftX}px)`;
      }
      if (cockpitYokeWrapper) {
        cockpitYokeWrapper.style.transform = `rotate(${normMouseX * 16}deg) translateY(${normMouseY * 4}px)`;
      }
      if (cockpitCanopyLayer) {
        cockpitCanopyLayer.style.transform = `translate3d(${normMouseX * 5}px, ${normMouseY * 3}px, 0)`;
      }
      if (canopyGlassGlare) {
        canopyGlassGlare.style.transform = `translate3d(${-normMouseX * 25}px, ${-normMouseY * 15}px, 0)`;
      }

      // Phase 7: Dynamic Sun Lens Flare Projection
      updateSunLensFlare();

      if (earthGroup) {
        earthGroup.rotation.y += 0.003;
        if (earthCloudMesh) earthCloudMesh.rotation.y += 0.005;
        if (issGroup) issGroup.rotation.y += 0.012;
        if (navicGroup) navicGroup.rotation.z += 0.007;
        if (insatGroup) insatGroup.rotation.y -= 0.006;
        if (gpsGroup) gpsGroup.rotation.x += 0.009;
        if (hubbleGroup) hubbleGroup.rotation.y += 0.010;
      }
      if (moonMesh) moonMesh.rotation.y += 0.005;
      if (mercuryMesh) mercuryMesh.rotation.y += 0.004;
      if (venusGroup) venusGroup.rotation.y -= 0.003; // Venus retrograde!
      if (marsGroup) {
        marsGroup.rotation.y += 0.004;
        if (mangalyaanMesh) mangalyaanMesh.rotation.y += 0.015;
      }
      if (jupiterGroup) {
        if (jupiterMesh) jupiterMesh.rotation.y += 0.008;
        if (europaMesh) europaMesh.rotation.y += 0.012;
      }
      if (saturnGroup && saturnGroup.children.length > 0) saturnGroup.children[0].rotation.y += 0.005;
      if (uranusGroup) uranusGroup.rotation.x += 0.004; // Uranus sideways roll
      if (neptuneMesh) neptuneMesh.rotation.y += 0.009; // supersonic winds spin
      if (voyagerGroup) voyagerGroup.rotation.z += 0.002;
      if (blackHoleGroup && blackHoleGroup.children.length >= 3) {
        blackHoleGroup.children[1].rotation.z += 0.018; // Swirling accretion disk
        blackHoleGroup.children[2].rotation.z -= 0.008; // Lensing ring
      }

      if (asteroidGroup) {
        asteroidGroup.rotation.z += 0.001;
        asteroidGroup.children.forEach((rock, idx) => {
          rock.rotation.x += 0.008 * (idx % 2 === 0 ? 1 : -1);
          rock.rotation.y += 0.006;
        });
      }

      updateLevelRibbon(currentZ);
      updateCockpitTelemetry();
      // Checkpoints removed per user request
      // checkLevelCompletions disabled for uninterrupted cruising

      renderer3D.render(scene3D, camera3D);
    }
  }

  function updateLevelRibbon(z) {
    if (!cockpitLevelRibbon) return;
    const btns = cockpitLevelRibbon.querySelectorAll('.lvl-ribbon-btn');
    let currentLvl = '1';
    if (z >= 3200) currentLvl = 'bonus';
    else if (z >= 1750) currentLvl = '4';
    else if (z >= 1150) currentLvl = '3';
    else if (z >= 350) currentLvl = '2';
    else currentLvl = '1';

    btns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.level === currentLvl);
    });
  }

  function updateCockpitTelemetry() {
    const velocity = Math.abs(targetZ - currentZ);
    const speedKmh = Math.floor(28400 + velocity * 1450);
    if (cockpitSpeed) cockpitSpeed.textContent = `${speedKmh.toLocaleString()} km/h`;

    const progress01 = clamp(currentZ / maxZ, 0, 1);
    let distStr = '0 km';
    if (currentZ < 100) {
      const dist = Math.floor(400 + (currentZ / 100) * 35600);
      distStr = `${dist.toLocaleString()} km`;
    } else if (currentZ < 280) {
      const dist = Math.floor(36000 + ((currentZ - 100) / 180) * 348400);
      distStr = `${dist.toLocaleString()} km`;
    } else if (currentZ < 550) {
      const dist = Math.floor(384400 + ((currentZ - 280) / 270) * 76615600);
      distStr = `${dist.toLocaleString()} km`;
    } else if (currentZ < 780) {
      const dist = Math.floor(77000000 + ((currentZ - 550) / 230) * 31000000);
      distStr = `${dist.toLocaleString()} km`;
    } else if (currentZ < 1120) {
      const dist = Math.floor(108000000 + ((currentZ - 780) / 340) * 117000000);
      distStr = `${dist.toLocaleString()} km`;
    } else if (currentZ < 1450) {
      const dist = Math.floor(225000000 + ((currentZ - 1120) / 330) * 104000000);
      distStr = `${dist.toLocaleString()} km`;
    } else if (currentZ < 1750) {
      const dist = Math.floor(329000000 + ((currentZ - 1450) / 300) * 449000000);
      distStr = `${dist.toLocaleString()} km`;
    } else if (currentZ < 2120) {
      const dist = (0.778 + ((currentZ - 1750) / 370) * 0.652).toFixed(2);
      distStr = `${dist} Billion km`;
    } else if (currentZ < 2480) {
      const dist = (1.43 + ((currentZ - 2120) / 360) * 1.44).toFixed(2);
      distStr = `${dist} Billion km`;
    } else if (currentZ < 2820) {
      const dist = (2.87 + ((currentZ - 2480) / 340) * 1.63).toFixed(2);
      distStr = `${dist} Billion km`;
    } else if (currentZ < 3200) {
      const dist = (4.50 + ((currentZ - 2820) / 380) * 19.8).toFixed(1);
      distStr = `${dist} Billion km`;
    } else {
      distStr = '26,000 Light-Years';
    }
    if (cockpitDistance) cockpitDistance.textContent = distStr;

    let nearest = 'EARTH';
    if (currentZ >= 3200) nearest = 'SAGITTARIUS A*';
    else if (currentZ >= 2820) nearest = 'VOYAGER 1';
    else if (currentZ >= 2480) nearest = 'NEPTUNE';
    else if (currentZ >= 2120) nearest = 'URANUS';
    else if (currentZ >= 1750) nearest = 'SATURN';
    else if (currentZ >= 1450) nearest = 'JUPITER';
    else if (currentZ >= 1120) nearest = 'ASTEROID BELT';
    else if (currentZ >= 780) nearest = 'MARS';
    else if (currentZ >= 550) nearest = 'VENUS';
    else if (currentZ >= 280) nearest = 'MERCURY';
    else if (currentZ >= 120) nearest = 'THE MOON';
    else nearest = 'LOW EARTH ORBIT';

    if (cockpitObject) cockpitObject.textContent = nearest;
    if (mfdQuizLvlBadge) mfdQuizLvlBadge.textContent = "LVL " + getActiveLevelKey().toUpperCase();

    const pct = Math.floor(progress01 * 100);
    if (cockpitPageProgress) cockpitPageProgress.style.width = `${Math.max(pct, 15)}%`;
    if (bottomPhaseProgress) bottomPhaseProgress.style.width = `${Math.max(pct, 20)}%`;
  }

  // Checkpoint popups removed per user request
  function openSatelliteModal(satId) {
    const sat = SATELLITE_CATALOG[satId];
    if (!sat || !satelliteModal) return;

    if (satName) satName.textContent = sat.name;
    if (satOperator) satOperator.textContent = sat.operator;
    if (satRocket) satRocket.textContent = sat.rocket;
    if (satOrbit) satOrbit.textContent = sat.orbit;
    if (satAltitude) satAltitude.textContent = sat.altitude;
    if (satRole) satRole.textContent = sat.role;
    if (satDyk) satDyk.textContent = sat.dyk;

    if (satSourceLink && satSourceText) {
      satSourceLink.href = sat.sourceUrl;
      satSourceText.textContent = sat.sourceName;
    }

    if (satAgencyBadge) {
      satAgencyBadge.textContent = sat.agencyBadge;
      satAgencyBadge.className = 'agency-badge';
      if (sat.agencyBadge.includes('ISRO')) satAgencyBadge.classList.add('badge-isro');
      else if (sat.agencyBadge.includes('ESA')) satAgencyBadge.classList.add('badge-esa');
      else satAgencyBadge.classList.add('badge-nasa');
    }

    satelliteModal.classList.add('is-open');
    satelliteModal.setAttribute('aria-hidden', 'false');
    audio.playCardSelect();
    speakScientificFact(`${sat.name}. Operated by ${sat.operator}. ${sat.role}`);
  }

  function closeSatelliteModal() {
    if (!satelliteModal) return;
    satelliteModal.classList.remove('is-open');
    satelliteModal.setAttribute('aria-hidden', 'true');
    audio.playBeep(880, 0.04);
  }

  function speakScientificFact(text) {
    if (ccText) {
      ccText.textContent = text;
    }

    if (!voiceNarrationEnabled || isMuted || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David')));
      if (preferred) utterance.voice = preferred;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  }

  // Mission Timer
  setInterval(() => {
    missionTimerSeconds++;
    const hrs = String(Math.floor(missionTimerSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((missionTimerSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(missionTimerSeconds % 60).padStart(2, '0');
    if (cockpitTimer) cockpitTimer.textContent = `${hrs}:${mins}:${secs}`;
  }, 1000);

  // Wheel, Touch, and Drag Navigation for Core Scroll Engine
  window.addEventListener('wheel', (e) => {
    if (cockpitStage && cockpitStage.style.display !== 'none') {
      e.preventDefault();
      targetZ = clamp(targetZ + e.deltaY * 0.45, 0, maxZ);
    }
  }, { passive: false });

  let isCockpitDragging = false;
  let dragStartY = 0;
  window.addEventListener('mousedown', (e) => {
    if (cockpitStage && cockpitStage.style.display !== 'none') {
      if (e.target.closest('button') || e.target.closest('.mfd-screen') || e.target.closest('.cockpit-top-bar')) return;
      isCockpitDragging = true;
      dragStartY = e.clientY;
    }
  });

  window.addEventListener('mousemove', (e) => {
    lastPointerX = e.clientX;
    pointerY = e.clientY;
    if (isCockpitDragging && cockpitStage && cockpitStage.style.display !== 'none') {
      const deltaY = dragStartY - e.clientY;
      dragStartY = e.clientY;
      targetZ = clamp(targetZ + deltaY * 1.6, 0, maxZ);
    }
  });

  window.addEventListener('mouseup', () => {
    isCockpitDragging = false;
  });

  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (cockpitStage && cockpitStage.style.display !== 'none' && e.touches.length > 0) {
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      targetZ = clamp(targetZ + deltaY * 1.4, 0, maxZ);
    }
  }, { passive: true });

  // "LET'S START THE JOURNEY" Button Click
  if (btnStartJourney) {
    btnStartJourney.addEventListener('click', () => {
      flightEngaged = true;
      audio.playRocketLaunch();
      if (flightModeStatus) {
        flightModeStatus.textContent = 'PROPULSION ENGAGED // SCROLL TO CRUISE';
        flightModeStatus.style.color = '#4ade80';
      }
      if (mfdTrajectory) {
        mfdTrajectory.textContent = 'BURNING';
      }
      targetZ += 90;
      speakScientificFact("Sublight propulsion engaged! Welcome aboard the cockpit. Scroll your mouse wheel or swipe to accelerate through Earth orbit towards the Moon and Mars.");
    });
  }

  // Audio & Accessibility Toggles
  if (btnVoiceToggle) {
    btnVoiceToggle.addEventListener('click', () => {
      voiceNarrationEnabled = !voiceNarrationEnabled;
      if (voiceToggleLabel) {
        voiceToggleLabel.textContent = voiceNarrationEnabled ? 'VOICE / TEXT' : 'TEXT ONLY';
      }
      btnVoiceToggle.classList.toggle('cc-active', voiceNarrationEnabled);
      if (!voiceNarrationEnabled && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      audio.playBeep(900, 0.05);
    });
  }

  if (btnMuteToggle) {
    btnMuteToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      if (muteLabel) muteLabel.textContent = isMuted ? 'MUTED' : 'MUTE';
      if (muteIcon) muteIcon.textContent = isMuted ? '🔇' : '🔊';
      btnMuteToggle.classList.toggle('cc-active', isMuted);
      if (isMuted && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      audio.playBeep(isMuted ? 350 : 800, 0.05);
    });
  }

  if (btnCcToggle) {
    btnCcToggle.addEventListener('click', () => {
      ccEnabled = !ccEnabled;
      btnCcToggle.classList.toggle('cc-active', ccEnabled);
      if (accessibilityCcBar) {
        accessibilityCcBar.classList.toggle('is-hidden', !ccEnabled);
      }
      audio.playBeep(700, 0.05);
    });
  }

// Checkpoint buttons removed per user request

  // Phase 4: Satellite Modal Triggers & Controls
  if (btnCloseSatModal) btnCloseSatModal.addEventListener('click', closeSatelliteModal);
  if (satelliteBackdrop) satelliteBackdrop.addEventListener('click', closeSatelliteModal);

  // Satellite Scanner HUD Chips (Left MFD)
  const satChips = document.querySelectorAll('.sat-chip-btn');
  satChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const satId = chip.dataset.sat;
      if (satId) openSatelliteModal(satId);
    });
  });

  // Cockpit Level Ribbon Navigation
  if (cockpitLevelRibbon) {
    cockpitLevelRibbon.addEventListener('click', (e) => {
      const btn = e.target.closest('.lvl-ribbon-btn');
      if (!btn) return;
      const lvl = btn.dataset.level;
      let destZ = 0;
      if (lvl === '1') destZ = 70;
      else if (lvl === '2') destZ = 440;
      else if (lvl === '3') destZ = 1350;
      else if (lvl === '4') destZ = 1950;
      else if (lvl === 'bonus') destZ = 3380;
      targetZ = destZ;
      audio.playBeep(920, 0.05);
    });
  }


  // ==========================================
  // PHASE 5: QUIZZES, LEADERBOARD & CERTIFICATE ENGINE
  // ==========================================

  function getActiveLevelKey() {
    if (currentZ >= 3200) return 'bonus';
    if (currentZ >= 1750) return '4';
    if (currentZ >= 1150) return '3';
    if (currentZ >= 350) return '2';
    return '1';
  }

  const BADGES = {
    lvl1: { id: 'lvl1', name: 'Orbital Pioneer', icon: '🥉', desc: 'Mastered Low Earth Orbit, ISS, NavIC, and the Lunar South Pole.' },
    lvl2: { id: 'lvl2', name: 'Terrestrial Explorer', icon: '🥈', desc: 'Navigated Mercury, Venus retrograde spin, and Mars rover missions.' },
    lvl3: { id: 'lvl3', name: 'Jovian Voyager', icon: '🥇', desc: 'Conquered the Asteroid Belt, 16 Psyche, and Jupiter’s Great Red Spot.' },
    lvl4: { id: 'lvl4', name: 'Deep Space Pioneer', icon: '💎', desc: 'Explored Saturn’s rings, sideways Uranus, supersonic Neptune, and Voyager 1.' },
    bonus: { id: 'bonus', name: 'Singularity Master', icon: '🌌', desc: 'Braved the gravitational lensing and event horizon of Sagittarius A*.' },
    perfect: { id: 'perfect', name: 'Quiz Perfectionist', icon: '⚡', desc: 'Achieved a flawless 100% score on a space academy knowledge quiz.' }
  };

  const QUIZ_DATA = {
    '1': [
      {
        type: 'mcq',
        question: 'At what velocity does the International Space Station cruise around Earth in Low Earth Orbit?',
        options: [
          '11,200 km/h (3.11 km/s)',
          '27,600 km/h (7.66 km/s)',
          '40,320 km/h (11.2 km/s)',
          '8,500 km/h (2.36 km/s)'
        ],
        correct: 1,
        intel: 'The ISS cruises at ~27,600 km/h at an altitude of ~418 km, completing an entire orbit around Earth every 90 minutes (witnessing 16 sunrises and sunsets every 24 hours).'
      },
      {
        type: 'match',
        question: 'Match each orbital asset to its primary mission role & space agency:',
        pairs: [
          { id: 'p1', left: 'NavIC IRNSS', right: 'ISRO Sovereign Regional Navigation' },
          { id: 'p2', left: 'Hubble Telescope', right: 'NASA / ESA Deep Optical Observatory' },
          { id: 'p3', left: 'INSAT-3DR', right: 'ISRO Meteorological & Search/Rescue' },
          { id: 'p4', left: 'GPS III SV05', right: 'US Space Force / NASA PNT Constellation' }
        ],
        intel: 'NavIC and INSAT-3DR provide sovereign Indian navigation and weather intelligence; Hubble is an international deep space observatory; GPS III broadcasts global positioning signals.'
      },
      {
        type: 'mcq',
        question: 'On August 23, 2023, what historic milestone was achieved by ISRO\'s Chandrayaan-3 lander?',
        options: [
          'First spacecraft in history to land near the Lunar South Pole (Shiv Shakti Point)',
          'First probe to discover subsurface ice on Saturn\'s rings',
          'First human to set foot on the lunar far side',
          'First rover to collect samples from the Martian core'
        ],
        correct: 0,
        intel: 'Chandrayaan-3 landed at 69.37°S near the Moon’s South Pole at Shiv Shakti Point, making India the first nation in history to touch down in the lunar south polar region.'
      },
      {
        type: 'order',
        question: 'Order these Earth orbit assets by their operational altitude (lowest to highest):',
        items: [
          { id: 'iss', text: 'ISS Space Station (418 km)', rank: 1 },
          { id: 'hubble', text: 'Hubble Space Telescope (540 km)', rank: 2 },
          { id: 'gps', text: 'GPS III Space Vehicle (20,200 km)', rank: 3 },
          { id: 'insat', text: 'INSAT-3DR Weather Satellite (35,786 km)', rank: 4 }
        ],
        intel: 'Low Earth Orbit (LEO) houses the ISS at 418 km and Hubble at 540 km; Medium Earth Orbit (MEO) holds GPS at 20,200 km; Geostationary Orbit (GEO) holds INSAT-3DR at 35,786 km.'
      },
      {
        type: 'mcq',
        question: 'Why must the atomic clocks on GPS III satellites be adjusted for Einsteinian relativity?',
        options: [
          'They lose battery voltage in the cold shadow of Earth',
          'Relativistic time dilation makes orbital clocks tick 38 microseconds faster per day',
          'Solar flares slow the mechanical vibrations of quartz crystals',
          'Earth\'s magnetic field creates electrostatic rotational drag'
        ],
        correct: 1,
        intel: 'General Relativity causes time to pass faster in weaker orbital gravity (+45 μs/day), while Special Relativity slows fast-moving orbital clocks (-7 μs/day), creating a net +38 μs/day relativistic dilation.'
      }
    ],

    '2': [
      {
        type: 'mcq',
        question: 'Why does a single sidereal day on Venus last longer than an entire Venusian year?',
        options: [
          'Venus has no molten core to sustain rotational inertia',
          'Venus rotates clockwise in retrograde extremely slowly (243 Earth days vs 225-day year)',
          'Atmospheric friction from sulfuric acid stops the planet each morning',
          'Tidal friction from Mercury magnetically locks its rotation'
        ],
        correct: 1,
        intel: 'Venus rotates backward (East to West) so sluggishly that it takes 243 Earth days to make one rotation, whereas it orbits the Sun in only 225 Earth days!'
      },
      {
        type: 'mcq',
        question: 'What makes Olympus Mons on Mars extraordinary in our Solar System?',
        options: [
          'It is an active supervolcano erupting liquid nitrogen',
          'It is the largest volcano and highest planetary peak in the solar system (21.9 km high)',
          'It is the crash site of the Soviet Mars 3 probe',
          'It contains the deepest ocean canyon on Mars'
        ],
        correct: 1,
        intel: 'Olympus Mons is a gargantuan shield volcano towering 21.9 km above the Martian surface—nearly 2.5 times the elevation of Mount Everest!'
      },
      {
        type: 'match',
        question: 'Match each Mars exploration mission to its groundbreaking feat:',
        pairs: [
          { id: 'p1', left: 'Mangalyaan (MOM)', right: 'First Asian nation to enter Mars orbit on maiden attempt' },
          { id: 'p2', left: 'NASA Ingenuity', right: '72 powered aerodynamic flights in thin Martian air' },
          { id: 'p3', left: 'Perseverance Rover', right: 'Extracted breathable O2 with MOXIE & cached rock cores' },
          { id: 'p4', left: 'Curiosity Rover', right: 'Discovered evidence of an ancient habitable freshwater lake' }
        ],
        intel: 'ISRO’s Mangalyaan achieved orbital capture on its maiden attempt for just $74M; Ingenuity proved aerial flight on another planet; Perseverance and Curiosity unlocked Martian habitability.'
      },
      {
        type: 'order',
        question: 'Order the 4 terrestrial inner planets by their orbital distance from the Sun (closest to farthest):',
        items: [
          { id: 'mercury', text: 'Mercury (57.9 Million km)', rank: 1 },
          { id: 'venus', text: 'Venus (108.2 Million km)', rank: 2 },
          { id: 'earth', text: 'Earth (149.6 Million km)', rank: 3 },
          { id: 'mars', text: 'Mars (227.9 Million km)', rank: 4 }
        ],
        intel: 'The terrestrial rocky inner planets strictly order outward as Mercury, Venus, Earth, and Mars.'
      },
      {
        type: 'mcq',
        question: 'What remarkable fact did NASA MESSENGER and ESA BepiColombo confirm regarding Mercury\'s internal core?',
        options: [
          'Mercury is hollow inside',
          'Its metallic iron core occupies roughly 85% of its entire planetary radius',
          'It has a liquid water mantle beneath its basalt crust',
          'It is composed entirely of compressed solid diamond'
        ],
        correct: 1,
        intel: 'Mercury possesses an extraordinarily large metallic iron core that makes up 85% of its planetary radius and over 70% of its total planetary mass.'
      }
    ],

    '3': [
      {
        type: 'mcq',
        question: 'How does the real Asteroid Belt differ from Hollywood movie asteroid fields?',
        options: [
          'Asteroids collide with each other every few seconds',
          'It is mostly empty space with average distances of ~1 million km between objects',
          'It is so dense that probes must dodge incoming rocks with thrusters',
          'It contains more mass than all solar system planets combined'
        ],
        correct: 1,
        intel: 'Unlike sci-fi movies, the asteroid belt is predominantly empty vacuum. Space probes fly through it without having to dodge a single boulder.'
      },
      {
        type: 'mcq',
        question: 'What is the Great Red Spot on Jupiter?',
        options: [
          'A massive impact crater from a dead comet',
          'An anticyclonic storm larger than Earth with winds roaring over 430 km/h',
          'A volcanic lava lake boiling on Jupiter\'s solid surface',
          'A concentration of red iron dust blown from Mars'
        ],
        correct: 1,
        intel: 'Jupiter’s Great Red Spot is a persistent high-pressure anticyclonic vortex wider than Earth that has been swirling for over 300 continuous years.'
      },
      {
        type: 'match',
        question: 'Match the Jovian or Asteroid target to its scientific marvel:',
        pairs: [
          { id: 'p1', left: 'Europa', right: 'Subsurface ocean with twice the water of all Earth oceans' },
          { id: 'p2', left: '16 Psyche', right: '$10 quintillion metallic nickel-iron asteroid building block' },
          { id: 'p3', left: 'Io', right: 'Most volcanically active world in the solar system' },
          { id: 'p4', left: 'Jupiter', right: 'Fastest spinning planet completing a day in 9.9 hours' }
        ],
        intel: 'Europa holds a global ocean beneath ice; Psyche is a metallic asteroid; Io has 400+ active volcanoes; Jupiter spins in under 10 hours.'
      },
      {
        type: 'order',
        question: 'Order these celestial bodies by physical equatorial diameter (smallest to largest):',
        items: [
          { id: 'psyche', text: '16 Psyche (226 km)', rank: 1 },
          { id: 'moon', text: 'The Moon (3,474 km)', rank: 2 },
          { id: 'mars', text: 'Mars (6,779 km)', rank: 3 },
          { id: 'jupiter', text: 'Jupiter (139,820 km)', rank: 4 }
        ],
        intel: '16 Psyche is a 226 km asteroid; the Moon is 3,474 km; Mars is 6,779 km; Jupiter is the gas giant colossus at 139,820 km.'
      },
      {
        type: 'mcq',
        question: 'What makes NASA\'s Psyche spacecraft mission to asteroid 16 Psyche scientifically unique?',
        options: [
          'It is the first spacecraft to land on a comet nucleus',
          'It is studying an asteroid made almost entirely of exposed core metal (iron & nickel)',
          'It will tow the asteroid into lunar orbit',
          'It is testing nuclear fusion propulsion'
        ],
        correct: 1,
        intel: '16 Psyche offers a unique window into the violent collisions that created terrestrial planets by exposing an ancient metal core.'
      }
    ],

    '4': [
      {
        type: 'mcq',
        question: 'What would happen if Saturn were placed in an enormous cosmic pool of water?',
        options: [
          'It would sink to the bottom like lead',
          'It would float because its bulk density (0.687 g/cm³) is lower than water',
          'Its hydrogen gas would catch fire immediately',
          'Its rings would solidify into diamond'
        ],
        correct: 1,
        intel: 'Saturn’s average density is only 0.687 g/cm³—less than water (1.0 g/cm³)—making it the only planet in our solar system that would float!'
      },
      {
        type: 'mcq',
        question: 'Why does Uranus appear to rotate on its side like a rolling bowling ball?',
        options: [
          'Its magnetic field is dragging it sideways',
          'Its rotational axis is tilted by 97.77°, likely from a giant protoplanet collision',
          'Its rings exert unequal gravitational torque',
          'Solar wind blows its upper atmosphere horizontally'
        ],
        correct: 1,
        intel: 'Uranus has an extreme axial tilt of 97.77°, causing it to rotate on its side and creating extreme 21-year-long polar seasons.'
      },
      {
        type: 'mcq',
        question: 'What planetary weather record does the ice giant Neptune hold?',
        options: [
          'The highest surface temperature in the solar system',
          'The fastest supersonic winds recorded on any planet (>2,160 km/h)',
          'The most continuous lightning bolts per second',
          'The deepest liquid ammonia ocean'
        ],
        correct: 1,
        intel: 'Neptune harbors supersonic atmospheric winds screaming westward at speeds exceeding 2,160 km/h (>600 m/s), faster than the speed of sound on Earth.'
      },
      {
        type: 'match',
        question: 'Match each Voyager 1 asset or milestone to its scientific role:',
        pairs: [
          { id: 'p1', left: 'Golden Record', right: 'Gold-plated copper phonograph with sounds and music of Earth' },
          { id: 'p2', left: 'Heliopause', right: 'Boundary where solar wind gives way to interstellar space' },
          { id: 'p3', left: 'Pale Blue Dot', right: 'Iconic photo of Earth taken from 6 billion km away in 1990' },
          { id: 'p4', left: 'Deep Space Network', right: 'Giant radio dishes receiving signals across 24.3 billion km' }
        ],
        intel: 'Voyager 1 entered interstellar space at the heliopause in 2012, carrying the Golden Record and communicating via NASA\'s DSN.'
      },
      {
        type: 'order',
        question: 'Order these outer solar system milestones by distance from the Sun (closest to farthest):',
        items: [
          { id: 'saturn', text: 'Saturn (1.43 Billion km)', rank: 1 },
          { id: 'uranus', text: 'Uranus (2.87 Billion km)', rank: 2 },
          { id: 'neptune', text: 'Neptune (4.50 Billion km)', rank: 3 },
          { id: 'voyager', text: 'Voyager 1 (24.3 Billion km)', rank: 4 }
        ],
        intel: 'Saturn is at ~9.5 AU; Uranus is at ~19.2 AU; Neptune is at ~30 AU; Voyager 1 is over 162 AU out in interstellar space.'
      }
    ],

    'bonus': [
      {
        type: 'mcq',
        question: 'What is Sagittarius A* located at the gravitational core of our Milky Way galaxy?',
        options: [
          'A newly forming protostar nebula',
          'A supermassive black hole containing 4.15 million times the mass of the Sun',
          'A cluster of extinct white dwarf stars',
          'A primordial dark energy fountain'
        ],
        correct: 1,
        intel: 'Sagittarius A* is the 4.15 million solar-mass supermassive black hole anchoring the center of our galaxy, imaged by the Event Horizon Telescope.'
      },
      {
        type: 'mcq',
        question: 'What defines the Event Horizon of a black hole?',
        options: [
          'The solid metallic surface of the singularity',
          'The boundary inside of which the escape velocity exceeds the speed of light',
          'The outer edge of the swirling dust clouds',
          'The shockwave where stars collide'
        ],
        correct: 1,
        intel: 'The event horizon is the ultimate cosmic boundary: within it, spacetime curves so steeply that nothing—not even light—can ever escape.'
      },
      {
        type: 'mcq',
        question: 'What produces the bright ring of light seen in visualizations of Sagittarius A*?',
        options: [
          'Direct reflection of starlight from neighboring galaxies',
          'A relativistic accretion disk of gas and plasma heated by friction to millions of degrees',
          'Laser radiation emitted by the singularity',
          'Fluorescent radioactive regolith'
        ],
        correct: 1,
        intel: 'Infalling matter accelerates near the speed of light in the accretion disk, generating intense friction and gravitational radiation visible across radio and X-ray wavelengths.'
      },
      {
        type: 'match',
        question: 'Match each black hole / relativity concept to its physical definition:',
        pairs: [
          { id: 'p1', left: 'Gravitational Lensing', right: 'Curvature of spacetime bending light around the black hole' },
          { id: 'p2', left: 'Spaghettification', right: 'Extreme differential tidal forces stretching an infalling object' },
          { id: 'p3', left: 'Photon Sphere', right: 'Orbital boundary where light photons can travel in circular orbits' },
          { id: 'p4', left: 'Singularity', right: 'Zero-volume, infinitely dense core where current physics breaks down' }
        ],
        intel: 'These four pillars describe the extreme physics of Einstein’s general relativity around supermassive black holes.'
      },
      {
        type: 'order',
        question: 'Order these cosmic bodies by their gravitational mass (smallest to largest):',
        items: [
          { id: 'moon', text: 'The Moon (7.35 × 10²² kg)', rank: 1 },
          { id: 'earth', text: 'Earth (5.97 × 10²⁴ kg)', rank: 2 },
          { id: 'sun', text: 'Our Sun (1.989 × 10³⁰ kg)', rank: 3 },
          { id: 'sgra', text: 'Sagittarius A* (4.15 Million Solar Masses)', rank: 4 }
        ],
        intel: 'The mass hierarchy scales from Moon -> Earth -> Sun -> Sagittarius A* (4.15 million Suns combined into a tiny space).'
      }
    ]
  };

  // Quiz Runtime State
  let activeQuizLevel = '1';
  let currentQIndex = 0;
  let quizScore = 0;
  let activeQuestionAnswered = false;
  let selectedMatchLeft = null;
  let matchedPairsCount = 0;
  let currentOrderItems = [];
  let shownLevelPrompts = {};

  function startQuiz(levelKey) {
    activeQuizLevel = levelKey || '1';
    currentQIndex = 0;
    quizScore = 0;
    activeQuestionAnswered = false;

    if (quizLevelKicker) {
      const titles = {
        '1': 'LEVEL 1 // LEAVING EARTH & MOON',
        '2': 'LEVEL 2 // INNER PLANETS & MARS',
        '3': 'LEVEL 3 // ASTEROID BELT & JUPITER',
        '4': 'LEVEL 4 // OUTER DEEP SPACE & VOYAGER',
        'bonus': '★ BONUS LEVEL // SAGITTARIUS A*'
      };
      quizLevelKicker.textContent = titles[activeQuizLevel] || 'CADET ACADEMY QUIZ';
    }

    if (quizScorePill) quizScorePill.textContent = 'SCORE: 0 / 5';
    if (quizQuestionStage) quizQuestionStage.classList.remove('is-hidden');
    if (quizResultsStage) quizResultsStage.classList.add('is-hidden');

    if (quizModal) {
      quizModal.classList.add('is-open');
      quizModal.setAttribute('aria-hidden', 'false');
    }

    renderCurrentQuestion();
    audio.playBeep(880, 0.05);
  }

  function closeQuizModal() {
    if (quizModal) {
      quizModal.classList.remove('is-open');
      quizModal.setAttribute('aria-hidden', 'true');
    }
    audio.playBeep(700, 0.05);
  }

  function renderCurrentQuestion() {
    activeQuestionAnswered = false;
    selectedMatchLeft = null;
    matchedPairsCount = 0;

    const questions = QUIZ_DATA[activeQuizLevel];
    if (!questions || !questions[currentQIndex]) return;
    const q = questions[currentQIndex];

    if (quizProgressFill) {
      quizProgressFill.style.width = `${((currentQIndex + 1) / questions.length) * 100}%`;
    }
    if (quizQNum) quizQNum.textContent = `QUESTION 0${currentQIndex + 1} OF 0${questions.length}`;
    if (quizQTypeBadge) {
      const typeNames = { mcq: 'MULTIPLE CHOICE', match: 'MATCH THE PAIRS', order: 'ORDER SEQUENCE' };
      quizQTypeBadge.textContent = typeNames[q.type] || 'QUESTION';
    }
    if (quizQText) quizQText.textContent = q.question;
    if (quizFeedbackBanner) quizFeedbackBanner.classList.add('is-hidden');

    if (!quizInteractiveArea) return;
    quizInteractiveArea.innerHTML = '';

    // Render by question type
    if (q.type === 'mcq') {
      const grid = document.createElement('div');
      grid.className = 'quiz-options-grid';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.type = 'button';
        btn.innerHTML = `<span class="opt-key">${letters[idx]}</span><span>${optText}</span>`;
        btn.addEventListener('click', () => checkMCQ(idx, q));
        grid.appendChild(btn);
      });
      quizInteractiveArea.appendChild(grid);
    }
    else if (q.type === 'match') {
      const matchWrap = document.createElement('div');
      matchWrap.className = 'match-grid-container';

      const leftCol = document.createElement('div');
      leftCol.className = 'match-col';
      const rightCol = document.createElement('div');
      rightCol.className = 'match-col';

      // Left items
      q.pairs.forEach(p => {
        const cardL = document.createElement('div');
        cardL.className = 'match-card match-left';
        cardL.setAttribute('data-id', p.id);
        cardL.textContent = p.left;
        cardL.addEventListener('click', () => handleMatchCardClick('left', p.id, cardL, q));
        leftCol.appendChild(cardL);
      });

      // Right items (shuffled)
      const shuffledRight = [...q.pairs].sort(() => Math.random() - 0.5);
      shuffledRight.forEach(p => {
        const cardR = document.createElement('div');
        cardR.className = 'match-card match-right';
        cardR.setAttribute('data-id', p.id);
        cardR.textContent = p.right;
        cardR.addEventListener('click', () => handleMatchCardClick('right', p.id, cardR, q));
        rightCol.appendChild(cardR);
      });

      matchWrap.appendChild(leftCol);
      matchWrap.appendChild(rightCol);
      quizInteractiveArea.appendChild(matchWrap);
    }
    else if (q.type === 'order') {
      const orderWrap = document.createElement('div');
      orderWrap.className = 'order-list-container';

      // Shuffle initial items
      currentOrderItems = [...q.items].sort(() => Math.random() - 0.5);

      function renderOrderCards() {
        orderWrap.innerHTML = '';
        currentOrderItems.forEach((item, idx) => {
          const card = document.createElement('div');
          card.className = 'order-item-card';
          card.innerHTML = `
            <div class="order-left-group">
              <span class="order-rank-chip">${idx + 1}</span>
              <span>${item.text}</span>
            </div>
            <div class="order-btn-group">
              <button type="button" class="btn-order-move btn-move-up" ${idx === 0 ? 'disabled style="opacity:0.3"' : ''}>▲</button>
              <button type="button" class="btn-order-move btn-move-down" ${idx === currentOrderItems.length - 1 ? 'disabled style="opacity:0.3"' : ''}>▼</button>
            </div>
          `;
          card.querySelector('.btn-move-up')?.addEventListener('click', () => moveOrderItem(idx, -1));
          card.querySelector('.btn-move-down')?.addEventListener('click', () => moveOrderItem(idx, 1));
          orderWrap.appendChild(card);
        });

        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'btn-submit-order';
        submitBtn.textContent = 'CONFIRM SEQUENCE ORDER ➔';
        submitBtn.addEventListener('click', () => submitOrderQuestion(q));
        orderWrap.appendChild(submitBtn);
      }

      function moveOrderItem(idx, dir) {
        if (activeQuestionAnswered) return;
        const target = idx + dir;
        if (target < 0 || target >= currentOrderItems.length) return;
        const temp = currentOrderItems[idx];
        currentOrderItems[idx] = currentOrderItems[target];
        currentOrderItems[target] = temp;
        audio.playBeep(900, 0.04);
        renderOrderCards();
      }

      renderOrderCards();
      quizInteractiveArea.appendChild(orderWrap);
    }
  }

  function checkMCQ(selectedIdx, q) {
    if (activeQuestionAnswered) return;
    activeQuestionAnswered = true;

    const buttons = quizInteractiveArea.querySelectorAll('.quiz-option-btn');
    const isCorrect = selectedIdx === q.correct;

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add('is-correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('is-wrong');
      }
    });

    if (isCorrect) {
      quizScore++;
      audio.playSuccess();
    } else {
      audio.playError();
    }

    if (quizScorePill) quizScorePill.textContent = `SCORE: ${quizScore} / 5`;
    showQuestionFeedback(isCorrect, q.intel);
  }

  function handleMatchCardClick(side, id, cardEl, q) {
    if (activeQuestionAnswered || cardEl.classList.contains('is-matched')) return;

    if (side === 'left') {
      quizInteractiveArea.querySelectorAll('.match-left').forEach(c => c.classList.remove('is-selected'));
      selectedMatchLeft = { id, el: cardEl };
      cardEl.classList.add('is-selected');
      audio.playBeep(840, 0.04);
    } else if (side === 'right' && selectedMatchLeft) {
      if (selectedMatchLeft.id === id) {
        // Correct pair match
        selectedMatchLeft.el.classList.remove('is-selected');
        selectedMatchLeft.el.classList.add('is-matched');
        cardEl.classList.add('is-matched');
        audio.playBeep(1200, 0.06);
        matchedPairsCount++;
        selectedMatchLeft = null;

        if (matchedPairsCount === q.pairs.length) {
          activeQuestionAnswered = true;
          quizScore++;
          audio.playSuccess();
          if (quizScorePill) quizScorePill.textContent = `SCORE: ${quizScore} / 5`;
          showQuestionFeedback(true, q.intel);
        }
      } else {
        // Wrong pair
        cardEl.classList.add('is-wrong-flash');
        selectedMatchLeft.el.classList.add('is-wrong-flash');
        audio.playError();
        setTimeout(() => {
          cardEl.classList.remove('is-wrong-flash');
          if (selectedMatchLeft && selectedMatchLeft.el) {
            selectedMatchLeft.el.classList.remove('is-wrong-flash', 'is-selected');
          }
          selectedMatchLeft = null;
        }, 500);
      }
    }
  }

  function submitOrderQuestion(q) {
    if (activeQuestionAnswered) return;
    activeQuestionAnswered = true;

    let isCorrect = true;
    currentOrderItems.forEach((item, idx) => {
      if (item.rank !== idx + 1) isCorrect = false;
    });

    const submitBtn = quizInteractiveArea.querySelector('.btn-submit-order');
    if (submitBtn) submitBtn.disabled = true;

    if (isCorrect) {
      quizScore++;
      audio.playSuccess();
    } else {
      audio.playError();
    }

    if (quizScorePill) quizScorePill.textContent = `SCORE: ${quizScore} / 5`;
    showQuestionFeedback(isCorrect, q.intel);
  }

  function showQuestionFeedback(isCorrect, intel) {
    if (!quizFeedbackBanner) return;
    if (feedbackStatus) {
      feedbackStatus.className = `feedback-status ${isCorrect ? 'is-correct' : 'is-wrong'}`;
    }
    if (feedbackIcon) feedbackIcon.textContent = isCorrect ? '✓' : '✕';
    if (feedbackTitle) feedbackTitle.textContent = isCorrect ? 'CORRECT! SCIENTIFIC VERIFICATION CONFIRMED' : 'INCORRECT // MISSION INTEL RECORD:';
    if (feedbackIntel) feedbackIntel.textContent = intel;

    quizFeedbackBanner.classList.remove('is-hidden');
  }

  function nextQuestion() {
    const questions = QUIZ_DATA[activeQuizLevel];
    if (currentQIndex < questions.length - 1) {
      currentQIndex++;
      renderCurrentQuestion();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    if (quizQuestionStage) quizQuestionStage.classList.add('is-hidden');
    if (quizResultsStage) quizResultsStage.classList.remove('is-hidden');

    const totalQuestions = 5;
    const pct = Math.round((quizScore / totalQuestions) * 100);
    let stars = 0;
    if (quizScore === 5) stars = 3;
    else if (quizScore >= 4) stars = 2;
    else if (quizScore >= 3) stars = 1;

    let xpGained = quizScore * 50;
    if (quizScore === 5) xpGained += 150; // Flawless bonus!

    // Update persistent state
    missionState.xp = (missionState.xp || 0) + xpGained;
    missionState.levelScores[activeQuizLevel] = Math.max(missionState.levelScores[activeQuizLevel] || 0, quizScore);
    missionState.levelStars[activeQuizLevel] = Math.max(missionState.levelStars[activeQuizLevel] || 0, stars);

    // Badge Unlocks
    const badgeMap = {
      '1': BADGES.lvl1,
      '2': BADGES.lvl2,
      '3': BADGES.lvl3,
      '4': BADGES.lvl4,
      'bonus': BADGES.bonus
    };
    const unlockedBadge = badgeMap[activeQuizLevel];
    if (unlockedBadge && !missionState.badges.includes(unlockedBadge.id)) {
      missionState.badges.push(unlockedBadge.id);
    }
    if (quizScore === 5 && !missionState.badges.includes('perfect')) {
      missionState.badges.push('perfect');
    }

    saveMissionState();

    // Sound and voice feedback
    if (stars >= 2) {
      audio.playBadgeFanfare();
      setTimeout(() => audio.playStarChime(), 600);
    } else {
      audio.playSuccess();
    }

    // Render results view
    if (resultsStars) {
      resultsStars.innerHTML = '';
      for (let s = 0; s < 3; s++) {
        const starSpan = document.createElement('span');
        starSpan.className = s < stars ? 'star-item star-anim' : 'star-item';
        starSpan.textContent = s < stars ? '★' : '☆';
        starSpan.style.opacity = s < stars ? '1' : '0.3';
        resultsStars.appendChild(starSpan);
      }
    }

    if (resultsTitle) {
      resultsTitle.textContent = stars === 3 ? 'FLAWLESS MISSION EVALUATION!' : (stars >= 1 ? 'CADET EVALUATION CLEARED!' : 'MISSION REVIEW REQUIRED');
    }
    if (resultsSub) {
      resultsSub.textContent = `Completed Level ${activeQuizLevel} Knowledge Assessment with ${pct}% Accuracy.`;
    }
    if (resFinalScore) resFinalScore.textContent = `${quizScore} / ${totalQuestions}`;
    if (resFinalXp) resFinalXp.textContent = `+${xpGained} XP`;
    if (resFinalAccuracy) resFinalAccuracy.textContent = `${pct}%`;

    if (resultsBadgeCard && unlockedBadge) {
      resultsBadgeCard.style.display = 'flex';
      if (resBadgeIcon) resBadgeIcon.textContent = unlockedBadge.icon;
      if (resBadgeTitle) resBadgeTitle.textContent = unlockedBadge.name;
      if (resBadgeDesc) resBadgeDesc.textContent = unlockedBadge.desc;
    }

    speakScientificFact(`Cadet evaluation complete. You earned ${quizScore} out of 5, awarded ${xpGained} space knowledge experience points, and unlocked ${stars} stars.`);
  }

  // ==========================================
  // LEADERBOARD ENGINE
  // ==========================================
  const SAMPLE_CADETS = [
    { name: 'Cmdr. Rakesh Sharma', agency: 'ISRO', vehicle: 'PSLV-C41', stars: 15, xp: 1850, rank: 'ADMIRAL OF THE COSMOS' },
    { name: 'Dr. Sunita Williams', agency: 'NASA', vehicle: 'Space Shuttle', stars: 14, xp: 1680, rank: 'FLIGHT COMMANDER' },
    { name: 'Dr. Vikram Sarabhai', agency: 'ISRO', vehicle: 'LVM3 Bahubali', stars: 13, xp: 1520, rank: 'FLIGHT COMMANDER' },
    { name: 'Elena Rostova', agency: 'ESA', vehicle: 'Ariane 6', stars: 11, xp: 1240, rank: 'SENIOR NAVIGATOR' },
    { name: 'Rajesh K. Gaganyaan', agency: 'ISRO', vehicle: 'GSLV Mk II', stars: 9, xp: 950, rank: 'DEEP SPACE SPECIALIST' },
    { name: 'Chloe Vance', agency: 'NASA', vehicle: 'Falcon 9', stars: 7, xp: 780, rank: 'ORBITAL NAVIGATOR' }
  ];

  function openLeaderboard(filterAgency = 'all') {
    if (!leaderboardModal || !leaderboardTbody) return;

    // Build combined leaderboard with current user
    const userVehicleName = missionState.selectedRocket ? missionState.selectedRocket.name : 'LVM3 Bahubali';
    const userAgency = missionState.selectedRocket ? missionState.selectedRocket.agency.toUpperCase() : 'ISRO';
    const totalStars = Object.values(missionState.levelStars || {}).reduce((a, b) => a + b, 0);

    const currentUser = {
      name: missionState.cadetName || 'Astronaut Cadet (You)',
      agency: userAgency,
      vehicle: userVehicleName,
      stars: totalStars,
      xp: missionState.xp || 150,
      rank: missionState.cadetRank || 'CADET PILOT',
      isCurrent: true
    };

    let allEntries = [...SAMPLE_CADETS, currentUser];
    if (filterAgency !== 'all') {
      allEntries = allEntries.filter(c => c.agency.toLowerCase().includes(filterAgency));
    }
    allEntries.sort((a, b) => b.xp - a.xp);

    leaderboardTbody.innerHTML = '';
    allEntries.forEach((c, idx) => {
      const tr = document.createElement('tr');
      if (c.isCurrent) tr.className = 'is-current-cadet';

      let rankMedal = `#${idx + 1}`;
      if (idx === 0) rankMedal = '🥇 1';
      else if (idx === 1) rankMedal = '🥈 2';
      else if (idx === 2) rankMedal = '🥉 3';

      tr.innerHTML = `
        <td><strong>${rankMedal}</strong></td>
        <td><strong>${c.name}</strong> ${c.isCurrent ? '<span style="color:#facc15">(YOU)</span>' : ''}</td>
        <td><span class="agency-badge ${c.agency === 'ISRO' ? 'badge-isro' : (c.agency === 'ESA' ? 'badge-esa' : 'badge-nasa')}">${c.agency}</span></td>
        <td>${c.vehicle}</td>
        <td style="color:#eab308">${c.stars} ★</td>
        <td style="font-weight:900; color:#38bdf8">${c.xp.toLocaleString()} XP</td>
        <td><small style="color:#94a3b8">${c.rank}</small></td>
      `;
      leaderboardTbody.appendChild(tr);
    });

    leaderboardModal.classList.add('is-open');
    leaderboardModal.setAttribute('aria-hidden', 'false');
    audio.playBeep(880, 0.05);
  }

  function closeLeaderboard() {
    if (leaderboardModal) {
      leaderboardModal.classList.remove('is-open');
      leaderboardModal.setAttribute('aria-hidden', 'true');
    }
    audio.playBeep(700, 0.05);
  }

  // ==========================================
  // CERTIFICATE OF SPACE MASTERY
  // ==========================================
  function openCertificate() {
    if (!certificateModal) return;

    const craft = missionState.selectedRocket;
    if (certRocketName) {
      certRocketName.textContent = craft ? `${craft.name} (${craft.agency.toUpperCase()})` : 'LVM3 Bahubali (ISRO)';
    }
    if (certCadetInput) {
      certCadetInput.value = missionState.cadetName || 'Astronaut Cadet';
    }
    if (certXpVal) {
      certXpVal.textContent = `${(missionState.xp || 150).toLocaleString()} XP`;
    }
    if (certStarsVal) {
      const totalStars = Object.values(missionState.levelStars || {}).reduce((a, b) => a + b, 0);
      certStarsVal.textContent = `${totalStars} ★`;
    }
    if (certRankVal) {
      certRankVal.textContent = missionState.cadetRank || 'CADET PILOT';
    }
    if (certIssueDate) {
      const now = new Date();
      const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
      certIssueDate.textContent = `ISSUED: ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    }

    if (certBadgesList) {
      certBadgesList.innerHTML = '';
      const userBadges = missionState.badges || [];
      const badgeList = Object.values(BADGES).filter(b => userBadges.includes(b.id));

      if (badgeList.length > 0) {
        badgeList.forEach(b => {
          const pill = document.createElement('div');
          pill.className = 'cert-badge-pill';
          pill.innerHTML = `<span>${b.icon}</span><strong>${b.name}</strong>`;
          certBadgesList.appendChild(pill);
        });
      } else {
        const placeholder = document.createElement('span');
        placeholder.style.fontSize = '11px';
        placeholder.style.color = '#94a3b8';
        placeholder.textContent = 'Complete level quizzes to earn official mission badges on your certificate!';
        certBadgesList.appendChild(placeholder);
      }
    }

    certificateModal.classList.add('is-open');
    certificateModal.setAttribute('aria-hidden', 'false');
    audio.playBadgeFanfare();
  }

  function closeCertificate() {
    if (certificateModal) {
      certificateModal.classList.remove('is-open');
      certificateModal.setAttribute('aria-hidden', 'true');
    }
    audio.playBeep(700, 0.05);
  }

  // ==========================================
  // LEVEL COMPLETION PROMPT
  // ==========================================
  let promptLevelTarget = '1';

  function showLevelCompletePrompt(levelNum) {
    if (!levelCompletePrompt) return;
    promptLevelTarget = String(levelNum);

    const levelDetails = {
      '1': { title: 'LEVEL 1: LEAVING EARTH & MOON', desc: 'You have explored Low Earth Orbit satellites and the Lunar South Pole! Test your knowledge in the Cadet Academy to unlock stars and badges.' },
      '2': { title: 'LEVEL 2: INNER PLANETS & MARS', desc: 'You navigated Mercury, Venus retrograde atmosphere, and Mars rovers! Prove your planetary science mastery to earn rewards.' },
      '3': { title: 'LEVEL 3: ASTEROID BELT & JUPITER', desc: 'You conquered the Asteroid Belt and Jupiter’s Great Red Spot! Launch the knowledge quiz to collect your Jovian Voyager badge.' },
      '4': { title: 'LEVEL 4: OUTER REACHES & VOYAGER 1', desc: 'You surveyed Saturn’s rings, sideways Uranus, supersonic Neptune, and Voyager 1 at the interstellar border! Evaluate your deep space expertise.' },
      'bonus': { title: '★ BONUS LEVEL: SAGITTARIUS A*', desc: 'You warped to the Milky Way singularity! Answer advanced general relativity astrophysics questions to earn the Singularity Master badge.' }
    };

    const details = levelDetails[promptLevelTarget] || levelDetails['1'];
    if (lvlCompleteTitle) lvlCompleteTitle.textContent = details.title;
    if (lvlCompleteDesc) lvlCompleteDesc.textContent = details.desc;

    levelCompletePrompt.classList.add('is-visible');
    levelCompletePrompt.setAttribute('aria-hidden', 'false');
    audio.playBadgeFanfare();
  }

  function dismissLevelCompletePrompt() {
    if (levelCompletePrompt) {
      levelCompletePrompt.classList.remove('is-visible');
      levelCompletePrompt.setAttribute('aria-hidden', 'true');
    }
  }

  function checkLevelCompletions(z) {
    // Automatic sector popups disabled per user request - uninterrupted cruising
  }


  // ==========================================
  // PHASE 5: EVENT LISTENERS & WIRING
  // ==========================================
  if (btnOpenAcademy) {
    btnOpenAcademy.addEventListener('click', () => {
      startQuiz(getActiveLevelKey());
    });
  }

  if (btnMfdQuiz) {
    btnMfdQuiz.addEventListener('click', () => {
      startQuiz(getActiveLevelKey());
    });
  }

  if (btnOpenLeaderboard) {
    btnOpenLeaderboard.addEventListener('click', () => {
      openLeaderboard('all');
    });
  }

  if (btnOpenCertificate) {
    btnOpenCertificate.addEventListener('click', () => {
      openCertificate();
    });
  }

  // Quiz Modal Actions
  if (btnCloseQuizModal) btnCloseQuizModal.addEventListener('click', closeQuizModal);
  if (quizBackdrop) quizBackdrop.addEventListener('click', closeQuizModal);
  if (btnNextQuestion) btnNextQuestion.addEventListener('click', nextQuestion);

  // Quiz Results Actions
  if (btnResultsRetry) {
    btnResultsRetry.addEventListener('click', () => {
      startQuiz(activeQuizLevel);
    });
  }

  if (btnResultsNextLevel) {
    btnResultsNextLevel.addEventListener('click', () => {
      closeQuizModal();
      const nextMap = { '1': 440, '2': 1350, '3': 1950, '4': 3380, 'bonus': 3380 };
      targetZ = nextMap[activeQuizLevel] || 70;
      audio.playWarpSound();
    });
  }

  if (btnResultsLeaderboard) {
    btnResultsLeaderboard.addEventListener('click', () => {
      closeQuizModal();
      openLeaderboard('all');
    });
  }

  if (btnResultsCertificate) {
    btnResultsCertificate.addEventListener('click', () => {
      closeQuizModal();
      openCertificate();
    });
  }

  // Leaderboard Modal Actions
  if (btnCloseLeaderboard) btnCloseLeaderboard.addEventListener('click', closeLeaderboard);
  if (leaderboardBackdrop) leaderboardBackdrop.addEventListener('click', closeLeaderboard);

  const lbTabs = document.querySelectorAll('.lb-tab');
  lbTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      lbTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      openLeaderboard(tab.dataset.filter || 'all');
    });
  });

  // Certificate Modal Actions
  if (btnCloseCertificate) btnCloseCertificate.addEventListener('click', closeCertificate);
  if (certificateBackdrop) certificateBackdrop.addEventListener('click', closeCertificate);

  if (btnPrintCertificate) {
    btnPrintCertificate.addEventListener('click', () => {
      window.print();
    });
  }

  if (certCadetInput) {
    certCadetInput.addEventListener('input', (e) => {
      missionState.cadetName = e.target.value.trim() || 'Astronaut Cadet';
      saveMissionState();
    });
  }

  // Level Complete Prompt Actions
  if (btnPromptStartQuiz) {
    btnPromptStartQuiz.addEventListener('click', () => {
      dismissLevelCompletePrompt();
      startQuiz(promptLevelTarget);
    });
  }

  if (btnPromptDismiss) {
    btnPromptDismiss.addEventListener('click', dismissLevelCompletePrompt);
  }

  // ==========================================
  // PHASE 6: TODAY'S TRANSMISSION (LIVE NASA APOD & ISRO ARCHIVES)
  // ==========================================

  const APOD_FALLBACK = {
    date: new Date().toISOString().slice(0, 10),
    title: "Cosmic Cliffs of the Carina Nebula",
    copyright: "NASA, ESA, CSA, and STScI",
    url: "https://images-assets.nasa.gov/image/PIA25424/PIA25424~orig.jpg",
    media_type: "image",
    explanation: "This landscape of 'mountains' and 'valleys' speckled with glittering stars is actually the edge of a nearby, young, star-forming region called NGC 3324 in the Carina Nebula. Captured in infrared light by NASA's James Webb Space Telescope, this image reveals for the first time previously invisible areas of star birth. The blistering, ultraviolet radiation from the young stars is sculpting the nebula's wall by slowly eroding it away."
  };

  const ISRO_ARCHIVES = [
    {
      title: "Chandrayaan-3: Pragyan Rover on the Lunar Regolith",
      vehicle: "LVM3-M4 Heavy Lift",
      date: "August 2023",
      img: "https://images-assets.nasa.gov/image/PIA24924/PIA24924~thumb.jpg",
      desc: "Historic telemetry captured by Vikram Lander's Imager Camera showing the Pragyan rover rolling out onto the lunar south polar surface at Shiv Shakti Point (69.37°S).",
      sourceUrl: "https://www.isro.gov.in/Chandrayaan3.html"
    },
    {
      title: "Aditya-L1: Solar Corona & Chromosphere Imaging",
      vehicle: "PSLV-C57",
      date: "December 2023",
      img: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000790/GSFC_20171208_Archive_e000790~thumb.jpg",
      desc: "First full-disk images of the Sun in near ultraviolet (200-400 nm) captured by the Solar Ultraviolet Imaging Telescope (SUIT) payload aboard India's first solar observatory Aditya-L1 at Lagrange Point 1.",
      sourceUrl: "https://www.isro.gov.in/Aditya_L1.html"
    },
    {
      title: "Mars Orbiter Mission: Full-Disk Martian Mosaic",
      vehicle: "PSLV-C25",
      date: "September 2014",
      img: "https://images-assets.nasa.gov/image/PIA00171/PIA00171~thumb.jpg",
      desc: "Global mosaic of Mars captured by Mangalyaan's Mars Colour Camera (MCC) from an altitude of over 70,000 km, displaying the massive Valles Marineris canyon network and polar ice cap.",
      sourceUrl: "https://www.isro.gov.in/MarsOrbiterMission_Details.html"
    },
    {
      title: "Gaganyaan TV-D1: Crew Module Recovery Operations",
      vehicle: "Test Vehicle D1",
      date: "October 2023",
      img: "https://images-assets.nasa.gov/image/NHQ202206290001/NHQ202206290001~thumb.jpg",
      desc: "Successful splashdown and Indian Navy recovery of the uncrewed Gaganyaan Crew Module in the Bay of Bengal following supersonic in-flight abort demonstration at Mach 1.2.",
      sourceUrl: "https://www.isro.gov.in/Gaganyaan.html"
    },
    {
      title: "AstroSat: Deep Ultraviolet Starbursts in Galaxy NGC 6946",
      vehicle: "PSLV-C30",
      date: "October 2015",
      img: "https://images-assets.nasa.gov/image/PIA15416/PIA15416~thumb.jpg",
      desc: "Ultra Violet Imaging Telescope (UVIT) observations mapping intense star formation zones and young massive blue stars, operating India's first dedicated multi-wavelength space observatory.",
      sourceUrl: "https://www.isro.gov.in/AstroSat.html"
    },
    {
      title: "LVM3 M4: Maiden Lunar Trajectory Liftoff",
      vehicle: "LVM3 Heavy Lift",
      date: "July 14, 2023",
      img: "https://images-assets.nasa.gov/image/KSC-20221115-PH-KLS01_0047/KSC-20221115-PH-KLS01_0047~thumb.jpg",
      desc: "The monumental liftoff of LVM3 M4 from the Second Launch Pad at SDSC SHAR Sriharikota, propelling Chandrayaan-3 into a precision 170 x 36,500 km elliptical orbit.",
      sourceUrl: "https://www.isro.gov.in/Chandrayaan3_Details.html"
    }
  ];

  let currentApodData = null;

  async function fetchNasaApod() {
    const today = new Date().toISOString().slice(0, 10);
    const cachedStr = localStorage.getItem('vyom_apod_cache');

    if (cachedStr) {
      try {
        const cached = JSON.parse(cachedStr);
        if (cached && cached.data) {
          currentApodData = cached.data;
          renderApod(cached.data);
          // If cached today, skip network fetch to conserve rate limits
          if (cached.date === today) return;
        }
      } catch (e) {
        console.warn('Failed parsing APOD cache', e);
      }
    }

    try {
      // Free public NASA APOD API endpoint with fallback
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      currentApodData = data;
      localStorage.setItem('vyom_apod_cache', JSON.stringify({ date: today, data }));
      renderApod(data);
    } catch (err) {
      console.warn('NASA APOD live fetch failed; using cached/offline fallback:', err);
      if (!currentApodData) {
        currentApodData = APOD_FALLBACK;
        renderApod(APOD_FALLBACK);
      }
    }
  }

  function renderApod(data) {
    if (!data) return;
    if (apodLoading) apodLoading.classList.add('is-hidden');
    if (apodContent) apodContent.classList.remove('is-hidden');

    if (apodTitle) apodTitle.textContent = data.title || 'Astronomy Picture of the Day';
    if (apodDate) apodDate.textContent = data.date || new Date().toISOString().slice(0, 10);
    if (apodCopyright) apodCopyright.textContent = data.copyright ? `© ${data.copyright}` : 'Public Domain (NASA)';
    if (apodExplanation) apodExplanation.textContent = data.explanation || 'No explanation telemetry available.';

    if (mfdTransSnippet) {
      mfdTransSnippet.textContent = data.title ? `TODAY: ${data.title}` : 'Live NASA Optical Telemetry';
    }

    if (data.media_type === 'video' && apodVideo) {
      if (apodImage) apodImage.classList.add('is-hidden');
      apodVideo.classList.remove('is-hidden');
      apodVideo.src = data.url;
    } else if (apodImage) {
      if (apodVideo) apodVideo.classList.add('is-hidden');
      apodImage.classList.remove('is-hidden');
      apodImage.src = data.url || data.hdurl || APOD_FALLBACK.url;
      apodImage.onerror = () => {
        apodImage.src = APOD_FALLBACK.url;
      };
    }
  }

  async function searchNasaLibrary(query = 'Artemis') {
    if (!libraryGrid) return;
    libraryGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #38bdf8; font-family: 'Space Grotesk', monospace;">
        <div class="trans-spinner" style="margin: 0 auto 12px;"></div>
        SCANNING NASA IMAGE & VIDEO ARCHIVES FOR "${query.toUpperCase()}"...
      </div>
    `;

    try {
      const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      const items = (data.collection && data.collection.items) ? data.collection.items.slice(0, 12) : [];

      if (items.length === 0) {
        libraryGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
            No media found for "${query}". Try searching "Mars", "Webb", "Apollo", or "Jupiter".
          </div>
        `;
        return;
      }

      libraryGrid.innerHTML = '';
      items.forEach(item => {
        const itemData = (item.data && item.data[0]) ? item.data[0] : {};
        const links = item.links || [];
        const thumb = links.find(l => l.rel === 'preview') || links[0];
        const imgSrc = thumb ? thumb.href : APOD_FALLBACK.url;

        const card = document.createElement('div');
        card.className = 'lib-card';
        card.innerHTML = `
          <img class="lib-card-img" src="${imgSrc}" alt="${itemData.title || 'NASA Media'}" loading="lazy" />
          <div class="lib-card-body">
            <h4 class="lib-card-title">${itemData.title || 'NASA Mission Imagery'}</h4>
            <div class="lib-card-meta">
              <span>${itemData.center || 'NASA'}</span>
              <span>${itemData.date_created ? itemData.date_created.slice(0, 10) : ''}</span>
            </div>
          </div>
        `;
        card.addEventListener('click', () => {
          if (apodImage) {
            switchTransmissionTab('apod');
            renderApod({
              title: itemData.title,
              date: itemData.date_created ? itemData.date_created.slice(0, 10) : '',
              copyright: itemData.photographer || itemData.center || 'NASA',
              explanation: itemData.description || 'NASA Image and Video Library asset.',
              url: imgSrc
            });
          }
        });
        libraryGrid.appendChild(card);
      });
    } catch (err) {
      console.warn('NASA library search error', err);
      libraryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #f87171;">
          Unable to connect to NASA Image & Video Library. Please verify network connection or select ISRO Archive.
        </div>
      `;
    }
  }

  function renderIsroArchives() {
    if (!isroGrid) return;
    isroGrid.innerHTML = '';

    ISRO_ARCHIVES.forEach(item => {
      const card = document.createElement('div');
      card.className = 'isro-card';
      card.innerHTML = `
        <div class="isro-card-img-wrap">
          <img class="isro-card-img" src="${item.img}" alt="${item.title}" loading="lazy" />
          <span class="agency-badge badge-isro isro-card-badge">ISRO</span>
        </div>
        <div class="isro-card-body">
          <h4 class="isro-card-title">${item.title}</h4>
          <div class="isro-card-meta">
            <span>VEHICLE: ${item.vehicle}</span>
            <span>${item.date}</span>
          </div>
          <p class="isro-card-desc">${item.desc}</p>
          <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="isro-card-link">
            <span>ISRO MISSION PORTAL</span>
            <span>↗</span>
          </a>
        </div>
      `;
      isroGrid.appendChild(card);
    });
  }

  function openTransmissionModal() {
    if (!transmissionModal) return;
    transmissionModal.classList.add('is-open');
    transmissionModal.setAttribute('aria-hidden', 'false');
    audio.playBeep(920, 0.05);

    if (!currentApodData) {
      fetchNasaApod();
    }
  }

  function closeTransmissionModal() {
    if (transmissionModal) {
      transmissionModal.classList.remove('is-open');
      transmissionModal.setAttribute('aria-hidden', 'true');
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    audio.playBeep(700, 0.05);
  }

  function switchTransmissionTab(tabName) {
    const tabs = document.querySelectorAll('.trans-tab');
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));

    if (panelApod) panelApod.classList.toggle('is-hidden', tabName !== 'apod');
    if (panelLibrary) panelLibrary.classList.toggle('is-hidden', tabName !== 'library');
    if (panelIsro) panelIsro.classList.toggle('is-hidden', tabName !== 'isro');

    if (tabName === 'library' && (!libraryGrid || libraryGrid.children.length === 0)) {
      searchNasaLibrary('Artemis');
    }
    if (tabName === 'isro' && (!isroGrid || isroGrid.children.length === 0)) {
      renderIsroArchives();
    }
    audio.playBeep(840, 0.04);
  }

  // Phase 6 Event Listeners
  if (btnOpenTransmission) btnOpenTransmission.addEventListener('click', openTransmissionModal);
  if (btnOpenTransmissionMfd) btnOpenTransmissionMfd.addEventListener('click', openTransmissionModal);
  if (btnCloseTransmission) btnCloseTransmission.addEventListener('click', closeTransmissionModal);
  if (transmissionBackdrop) transmissionBackdrop.addEventListener('click', closeTransmissionModal);

  const transTabButtons = document.querySelectorAll('.trans-tab');
  transTabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTransmissionTab(btn.dataset.tab));
  });

  if (btnSearchLibrary && librarySearchInput) {
    btnSearchLibrary.addEventListener('click', () => {
      const q = librarySearchInput.value.trim();
      if (q) searchNasaLibrary(q);
    });
    librarySearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = librarySearchInput.value.trim();
        if (q) searchNasaLibrary(q);
      }
    });
  }

  const libTagButtons = document.querySelectorAll('.lib-tag-btn');
  libTagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      if (librarySearchInput) librarySearchInput.value = tag;
      searchNasaLibrary(tag);
    });
  });

  if (btnListenApod) {
    btnListenApod.addEventListener('click', () => {
      if (currentApodData) {
        speakScientificFact(`${currentApodData.title}. ${currentApodData.explanation}`);
      }
    });
  }


  // ==========================================
  // UNIFIED PHASE SWITCHING ENGINE
  // ==========================================
  
  function switchToCockpit() {
    switchToPhase(3);
  }

  function switchToHangar() {
    switchToPhase(2);
  }

  function switchToPhase(phaseNum) {
    // 1. Update Tabs
    [tabPhase1, tabPhase2, tabPhase3].forEach((tab, idx) => {
      if (tab) {
        const isActive = (idx + 1) === phaseNum;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      }
    });

    if (window.speechSynthesis) window.speechSynthesis.cancel();

    // Phase 1: Launchpad
    if (phaseNum === 1) {
      document.body.classList.remove('in-cockpit');
      if (cockpitStage) cockpitStage.style.display = 'none';
      if (destinationPage) {
        destinationPage.style.display = 'flex';
      }
      document.body.classList.remove('destination-active');
      document.body.classList.remove('in-launch');
      if (clip) {
        try { clip.play().catch(() => {}); } catch (e) {}
      }
      audio.playBeep(700, 0.04);
    }
    // Phase 2: Rocket Selection Hangar
    else if (phaseNum === 2) {
      document.body.classList.remove('in-cockpit');
      if (cockpitStage) cockpitStage.style.display = 'none';
      if (destinationPage) {
        destinationPage.style.display = 'flex';
      }
      document.body.classList.add('destination-active');
      document.body.classList.remove('in-launch');
      renderRocketGrid();
      audio.playBeep(800, 0.04);
    }
    // Phase 3: Cockpit & Scroll Engine
    else if (phaseNum === 3) {
      document.body.classList.add('in-cockpit');
      if (fuelingModal) fuelingModal.classList.remove('is-open');
      if (cockpitModal) cockpitModal.classList.remove('is-open');

      document.body.classList.remove('destination-active');
      document.body.classList.remove('in-launch');
      if (destinationPage) destinationPage.style.display = 'none';

      if (cockpitStage) {
        cockpitStage.style.display = 'flex';
      }

      if (cockpitVehicleBadge) {
        const craft = missionState.selectedRocket;
        cockpitVehicleBadge.textContent = craft ? `${craft.name} (${craft.agency.toUpperCase()})` : 'LVM3 (ISRO)';
      }

      initThreeEngine();
      audio.playWarpSound();
      speakScientificFact("Cockpit systems online. All telemetry synchronized with ISRO ISTRAC and NASA Deep Space Network. Press Let's Start The Journey to initiate departure.");
    }
  }

  // Connect Global Phase Tabs
  if (tabPhase1) tabPhase1.addEventListener('click', () => switchToPhase(1));
  if (tabPhase2) tabPhase2.addEventListener('click', () => switchToPhase(2));
  if (tabPhase3) tabPhase3.addEventListener('click', () => switchToPhase(3));

  // Connect Direct Phase 2 -> Phase 3 Transition Triggers
  if (btnProceedCockpit) {
    btnProceedCockpit.addEventListener('click', () => {
      fuelingModal.classList.remove('is-open');
      audio.playCardSelect();
      switchToPhase(3);
    });
  }

  if (btnStartPhase3) {
    btnStartPhase3.addEventListener('click', () => {
      if (cockpitModal) cockpitModal.classList.remove('is-open');
      switchToPhase(3);
    });
  }

  if (btnResumeCockpit) {
    btnResumeCockpit.addEventListener('click', () => {
      switchToPhase(3);
    });
  }

  if (btnReturnToHangar) {
    btnReturnToHangar.addEventListener('click', () => {
      switchToPhase(2);
    });
  }

  if (btnBackToHangar) {
    btnBackToHangar.addEventListener('click', () => {
      if (cockpitModal) cockpitModal.classList.remove('is-open');
      switchToPhase(2);
    });
  }

  // ==========================================
  // CURSOR & VIDEO TRACKING ENGINE - PHASE 1
  // ==========================================
  function setLoaded() {
    requestAnimationFrame(() => document.body.classList.add('is-loaded'));
  }

  function updatePointer(clientX, clientY) {
    lastPointerX = clientX;
    pointerY = clientY;
    lastMove = performance.now();
    if (!clipReady || reducedMotion) return;

    const rect = scene.getBoundingClientRect();
    const unit = rect.width / 1440;
    const frameX = (clientX - rect.left) / unit;
    const mapped = clamp((frameX - 1440 * 0.14) / (1440 * 0.72), 0, 1);
    targetTime = mapped * Math.max(duration - 0.06, 0);
  }

  function showClip() {
    if (!hasShownClip) {
      hasShownClip = true;
      headClipShell.classList.add('is-visible');
    }
  }

  function attachClip(src) {
    clip.src = src;
    clip.muted = true;
    clip.volume = 0;
    clip.addEventListener('loadedmetadata', () => {
      duration = Number.isFinite(clip.duration) && clip.duration > 0 ? clip.duration : duration;
      targetTime = duration * 0.5;
      shownTime = targetTime;
      clipReady = true;
      clip.currentTime = shownTime;
    }, { once: true });

    clip.addEventListener('seeking', () => { seeking = true; });
    clip.addEventListener('seeked', () => {
      seeking = false;
      if (!firstSeekDone) {
        firstSeekDone = true;
        showClip();
      }
    });
    clip.load();
  }

  async function preloadClip() {
    if (reducedMotion) return;
    try {
      const response = await fetch(CONFIG.headVideoUrl, { mode: 'cors', cache: 'force-cache' });
      if (!response.ok) throw new Error(`head clip request failed: ${response.status}`);
      const blob = await response.blob();
      objectUrl = URL.createObjectURL(blob);
      attachClip(objectUrl);
    } catch (error) {
      attachClip(CONFIG.headVideoUrl);
    }
  }

  function tick(now) {
    const isDestinationActive = document.body.classList.contains('destination-active') || document.body.classList.contains('in-launch');

    if (!isDestinationActive && !reducedMotion && clipReady && Number.isFinite(duration)) {
      const idleFor = now - lastMove;
      const idleAmount = idleFor > 3500 ? Math.sin((idleFor - 3500) / 1600) * duration * 0.32 : 0;
      const desired = idleFor > 3500 ? duration * 0.5 + idleAmount : targetTime;

      targetTime += (desired - targetTime) * 0.06;
      shownTime += (targetTime - shownTime) * 0.14;

      if (!seeking && Math.abs(clip.currentTime - shownTime) > 0.012) {
        clip.currentTime = clamp(shownTime, 0, Math.max(duration - 0.03, 0));
      }
    }

    requestAnimationFrame(tick);
  }

  // ==========================================
  // LAUNCH TO HANGAR TRANSITION
  // ==========================================
  function launchRocket() {
    helmetShell.classList.add('is-on');
    pushButton.setAttribute('aria-pressed', 'true');
    pushButton.classList.add('is-pressing');
    setTimeout(() => pushButton.classList.remove('is-pressing'), 350);

    audio.playVisorLock();

    document.body.classList.add('in-launch');
    if (transition) {
      transition.classList.add('is-active');
    }

    audio.playRocketLaunch();

    setTimeout(() => {
      audio.playWarpSound();
    }, 1400);

    setTimeout(() => {
      if (flash) {
        flash.classList.add('is-flashing');
      }

      setTimeout(() => {
        if (CONFIG.redirectUrl) {
          window.location.href = CONFIG.redirectUrl;
          return;
        }

        document.body.classList.remove('in-launch');
        document.body.classList.add('destination-active');
        if (tabPhase1 && tabPhase2) {
          tabPhase1.classList.remove('active');
          tabPhase2.classList.add('active');
        }

        if (clip) {
          try { clip.pause(); } catch (e) {}
        }
        if (transition) {
          transition.classList.remove('is-active');
        }

        // Render rocket fleet cards
        renderRocketGrid();

        setTimeout(() => {
          if (flash) flash.classList.remove('is-flashing');
        }, 250);
      }, 400);
    }, 2000);
  }

  function returnToHero() {
    if (flash) flash.classList.add('is-flashing');
    audio.playWarpSound();

    setTimeout(() => {
      document.body.classList.remove('destination-active');
      helmetShell.classList.remove('is-on');
      pushButton.setAttribute('aria-pressed', 'false');
      if (tabPhase1 && tabPhase2) {
        tabPhase2.classList.remove('active');
        tabPhase1.classList.add('active');
      }

      if (clip) {
        try { clip.play().catch(() => {}); } catch (e) {}
      }

      setTimeout(() => {
        if (flash) flash.classList.remove('is-flashing');
      }, 250);
    }, 400);
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  if (finePointer && !reducedMotion) {
    window.addEventListener('pointermove', (event) => updatePointer(event.clientX, event.clientY), { passive: true });
  }

  if (pushButton) {
    pushButton.addEventListener('click', launchRocket);
  }

  if (btnReturn) {
    btnReturn.addEventListener('click', returnToHero);
  }

  window.addEventListener('pagehide', () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  });

  // Phase 7: Dynamic Sun Lens Flare Calculation
  function updateSunLensFlare() {
    if (!sunLensFlareOverlay || !camera3D) return;
    const sunPos = new THREE.Vector3(-600, 350, 200);
    const proj = sunPos.clone().project(camera3D);
    const isFacing = proj.z < 1;
    const xPx = (proj.x * 0.5 + 0.5) * window.innerWidth;
    const yPx = (-proj.y * 0.5 + 0.5) * window.innerHeight;
    const inView = isFacing && xPx >= -120 && xPx <= window.innerWidth + 120 && yPx >= -120 && yPx <= window.innerHeight + 120;

    if (inView) {
      sunLensFlareOverlay.style.opacity = '1';
      sunLensFlareOverlay.style.transform = `translate3d(${xPx}px, ${yPx}px, 0)`;
    } else {
      sunLensFlareOverlay.style.opacity = '0';
    }
  }

  // Phase 7: Performance Switcher (High 60FPS vs Eco Mode for Mid-Range & Mobile)
  function applyPerformanceMode(isEco) {
    isLowQualityMode = isEco;
    localStorage.setItem('vyom_perf_mode', isEco ? 'eco' : 'high');
    if (perfLabel) perfLabel.textContent = isEco ? 'ECO MODE' : 'HIGH 60FPS';
    if (btnTogglePerf) {
      btnTogglePerf.classList.toggle('perf-eco', isEco);
    }
    if (renderer3D) {
      const dpr = isEco ? 1.0 : Math.min(window.devicePixelRatio, 1.75);
      renderer3D.setPixelRatio(dpr);
      renderer3D.setSize(window.innerWidth, window.innerHeight);
    }
  }

  // Phase 7: Scientific Credits & Mission Acknowledgments Modal Handlers
  function openCreditsModal() {
    if (!creditsModal) return;
    creditsModal.classList.add('is-open');
    creditsModal.setAttribute('aria-hidden', 'false');
    audio.playCardSelect();
  }

  function closeCreditsModal() {
    if (!creditsModal) return;
    creditsModal.classList.remove('is-open');
    creditsModal.setAttribute('aria-hidden', 'true');
    audio.playBeep(700, 0.05);
  }

  if (btnOpenCredits) {
    btnOpenCredits.addEventListener('click', openCreditsModal);
  }
  if (btnCockpitMenu) {
    btnCockpitMenu.addEventListener('click', openCreditsModal);
  }
  if (btnCloseCredits) {
    btnCloseCredits.addEventListener('click', closeCreditsModal);
  }
  if (creditsBackdrop) {
    creditsBackdrop.addEventListener('click', closeCreditsModal);
  }

  if (btnTogglePerf) {
    btnTogglePerf.addEventListener('click', () => {
      applyPerformanceMode(!isLowQualityMode);
      audio.playBeep(isLowQualityMode ? 660 : 880, 0.05);
    });
    // Initialize performance mode state
    applyPerformanceMode(isLowQualityMode);
  }


  // ==========================================
  // PHASE 8: HACKATHON PITCH & GUIDED DEMO TOUR
  // ==========================================
  const tabPitchDeck = document.getElementById('tabPitchDeck');
  const btnOpenPitch = document.getElementById('btnOpenPitch');
  const pitchModal = document.getElementById('pitchModal');
  const pitchBackdrop = document.getElementById('pitchBackdrop');
  const btnClosePitch = document.getElementById('btnClosePitch');
  const btnRunFullDemo = document.getElementById('btnRunFullDemo');

  function openPitchModal(defaultTab = 'pitch') {
    if (!pitchModal) return;
    pitchModal.classList.add('is-open');
    pitchModal.setAttribute('aria-hidden', 'false');
    switchPitchTab(defaultTab);
    audio.playCardSelect();
  }

  function closePitchModal() {
    if (!pitchModal) return;
    pitchModal.classList.remove('is-open');
    pitchModal.setAttribute('aria-hidden', 'true');
    audio.playBeep(700, 0.05);
  }

  function switchPitchTab(tabName) {
    if (!pitchModal) return;
    const tabs = pitchModal.querySelectorAll('.pitch-tab');
    const panels = pitchModal.querySelectorAll('.pitch-panel');

    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    panels.forEach(p => {
      const match = p.id.toLowerCase().includes(tabName.toLowerCase());
      p.classList.toggle('is-hidden', !match);
    });
  }

  if (tabPitchDeck) {
    tabPitchDeck.addEventListener('click', () => openPitchModal('pitch'));
  }
  if (btnOpenPitch) {
    btnOpenPitch.addEventListener('click', () => openPitchModal('pitch'));
  }
  if (btnClosePitch) {
    btnClosePitch.addEventListener('click', closePitchModal);
  }
  if (pitchBackdrop) {
    pitchBackdrop.addEventListener('click', closePitchModal);
  }

  if (pitchModal) {
    pitchModal.querySelectorAll('.pitch-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        switchPitchTab(tab.dataset.tab);
        audio.playBeep(880, 0.04);
      });
    });

    // Step-by-Step Interactive Demo Jump Triggers
    pitchModal.querySelectorAll('.btn-step-jump').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        closePitchModal();

        if (target === 'phase1') {
          returnToHero();
        } else if (target === 'phase2') {
          switchToHangar();
        } else if (target === 'phase3') {
          switchToCockpit();
        } else if (target === 'asteroid') {
          switchToCockpit();
          setTimeout(() => {
            targetZ = 1200; // Asteroid Belt checkpoint coordinates
            isScrollLocked = false;
            audio.playRocketLaunch();
            speakScientificFact("Warping to Sector 3: The Asteroid Belt. Navigating past 16 Psyche.");
          }, 350);
        } else if (target === 'transmission') {
          switchToCockpit();
          setTimeout(() => {
            openTransmissionModal();
          }, 350);
        } else if (target === 'quiz') {
          switchToCockpit();
          setTimeout(() => {
            openQuizModal('1');
          }, 350);
        } else if (target === 'certificate') {
          switchToCockpit();
          setTimeout(() => {
            openCertificateModal();
          }, 350);
        }
      });
    });
  }

  // Automated 1-Minute Walkthrough Demo Flow
  if (btnRunFullDemo) {
    btnRunFullDemo.addEventListener('click', () => {
      closePitchModal();
      speakScientificFact("Initiating automated hackathon demonstration walkthrough. Stage 1: Launchpad.");
      returnToHero();

      // Flow step 1: PUSH launch
      setTimeout(() => {
        launchRocket();
        speakScientificFact("Stage 2: Rocket Selection Hangar. Analyzing real NASA and ISRO launch vehicles.");
      }, 2500);

      // Flow step 2: Transition to Cockpit
      setTimeout(() => {
        switchToCockpit();
        speakScientificFact("Stage 3: Spaceship Cockpit Viewport. Multi-plane 3D parallax depth with real-time solar system telemetry.");
      }, 7000);

      // Flow step 3: Warp to Asteroid Belt
      setTimeout(() => {
        targetZ = 1200;
      }, 12000);

      // Flow step 4: Open Today's Transmission
      setTimeout(() => {
        openTransmissionModal();
        speakScientificFact("Stage 4: Live Deep Space Transmission. Connecting to NASA daily APOD and ISRO archives.");
      }, 19000);

      // Flow step 5: Open Quiz
      setTimeout(() => {
        closeTransmissionModal();
        openQuizModal('1');
        speakScientificFact("Stage 5: Space Academy Interactive Knowledge Quiz. Duolingo-style gamification and XP.");
      }, 26000);

      // Flow step 6: Open Certificate
      setTimeout(() => {
        closeQuizModal();
        openCertificateModal();
        speakScientificFact("Stage 6: Official Certificate of Celestial Mastery. Accredited graduation.");
      }, 33000);
    });
  }


    // Load persistent state and start engine
  loadMissionState();
  renderRocketGrid();
  fetchNasaApod();
  renderIsroArchives();
  setLoaded();
  preloadClip();
  requestAnimationFrame(tick);
})();
