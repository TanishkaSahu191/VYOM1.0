# 🌌 VYOM: Gamified 3D Space Learning Platform

A scroll-driven, gamified space education platform for students and space enthusiasts, built with scientifically verified mission facts and spacecraft engineering from **ISRO** and **NASA**.

Students launch from Earth, step into a realistic spaceship cockpit, and journey through the solar system level-by-level, uncovering lesser-known cosmic discoveries and completing interactive mission quizzes.

---

## 🚀 Implemented Phases

### Phase 1: Landing Experience
* **Interactive Astronaut Cursor Follower**: Astronaut head smoothly tracks the user's mouse horizontally via video frame scrubbing with an autonomous idle look-around behavior.
* **Tactile 3D "PUSH ME" Button**: Realistic beveling, lighting physics, and press feedback.
* **Visor Drop & Lock**: Pneumatic visor drop animation using `helmet-cutout.png`.
* **Pure Web Audio Synthesizer**: Zero external audio dependencies—synthesizes mechanical pneumatic locks, sub-bass rocket roar, and warp frequency glide via the browser's native Web Audio API.
* **High-Tech SVG Rocket Launch**: Vector spacecraft with dynamic plasma thrusters, particle sparks, cockpit rumble screen shake, and warp speed tunnel.
* **Hyperdrive White Flash**: Seamless warp transition directly into Phase 2.

### Phase 2: Rocket Selection (Gamified Learning Hangar)
* **NASA & ISRO Spacecraft Roster**:
  * 🇮🇳 **ISRO LVM3 (Launch Vehicle Mark-3)** — *"Bahubali" Heavy-Lift* (Chandrayaan-3, Gaganyaan TV-D1, C25 Cryogenic Stage).
  * 🇮🇳 **ISRO PSLV (Polar Satellite Launch Vehicle)** — *"The Workhorse"* (Mars Orbiter Mission / Mangalyaan, Chandrayaan-1, Aditya-L1, 104 Satellites single flight).
  * 🇮🇳 **ISRO GSLV Mk II** — *Cryogenic Pioneer* (Indigenously engineered cryogenic upper stage, NavIC navigation, GSAT comms).
  * 🇺🇸 **NASA Saturn V** — *The Apollo Moon Rocket* (Human lunar landings, Skylab, 5x mammoth F-1 engines, 100% mission success).
  * 🇺🇸 **NASA / SpaceX Falcon 9 (Block 5)** — *The Reusable Booster* (Autonomous drone ship landings, Commercial Crew Demo-2, DART asteroid deflection).
  * 🇺🇸 **NASA Space Shuttle (STS)** — *The Orbital Glider* (Hubble Space Telescope deployment & 5 spacewalk servicing missions, 37 ISS assembly flights).
  * 🇺🇸 **NASA SLS (Space Launch System)** — *The Artemis Megarocket* (Human lunar return megarocket, 8.8 million lbs thrust).
* **Fleet Filter System**: Switch seamlessly between **All Vehicles**, **ISRO Fleet**, and **NASA Fleet**.
* **Pre-Flight Cryogenic Fueling Simulation**: Live LOX and Cryo fuel gauges, automated diagnostic checklists, and Web Audio countdown beeps.
* **State Persistence (`localStorage`)**: Persists chosen rocket, cadet rank, and awards +100 XP (`vyom_mission_data`).

### Phase 3: Panoramic Space Flight Viewport and Core Scroll Engine
* **Panoramic 3D Space Flight Viewport**:
  * Unobstructed full-screen panoramic viewport directly into deep space, eliminating visual clutter from bulky interior struts or seats to deliver maximum immersion.
  * Real-time 3D mouse look and dynamic camera parallax tracking user pointer movements.
  * Sleek lower avionics flight console HUD and top telemetry bar designed for high visibility and responsiveness.
* **Global Top Phase Switcher**:
  * Direct one-click navigation between `[ 01 Launchpad ]`, `[ 02 Rocket Hangar ]`, and `[ 03 Cockpit & Journey ]` at the top of the screen anytime.
* **Three.js 3D Celestial Space Engine**:
  * 4,000+ procedural glittering multi-spectral stars with color temperature variation.
  * Directional Sunlight with realistic specular and atmospheric highlights.
  * **Earth & Moon**: Rotating cloud layers, atmospheric Fresnel glow, and Chandrayaan-3 Shiv Shakti point & Apollo 11 lunar landing pins.
  * **Mars**: Iron oxide terrain, Olympus Mons volcanic peak, and ISRO Mangalyaan orbital track.
  * **Asteroid Belt**: 180+ tumbling procedural 3D rock meshes orbiting between Mars and Jupiter.
  * **Jupiter**: Massive banded gas giant featuring the swirling Great Red Spot storm.
  * **Saturn**: Concentric ring system with Cassini division and realistic transparency.
* **Live Cockpit Telemetry Dashboard**:
  * **`SPEED`**: Real-time velocity calculated from scroll momentum (cruising at 28,400 km/h, surging dynamically up to 105,000+ km/h during burns).
  * **`DISTANCE FROM EARTH`**: Live increasing mileage from 0 km up to 1.28 billion km.
  * **`CURRENT OBJECT`**: Dynamically detects and targets the nearest celestial body.
  * **`MISSION TIMER`**: Live mission clock ticking in real-time.
  * **Radar MFD & Waveforms**: Sweeping radar line, target lock blip, and audio spectrum waveform bars.
  * **`LET'S START THE JOURNEY` Button**: Glowing interactive control on the right console that ignites thrusters and unlocks the scroll engine.
  * **Interactive Perspective HUD**: Dashboard displays tilt with realistic CSS 3D perspective to match the physical console angle.
* **Core Scroll Engine & Holographic Checkpoints**:
  * Mouse wheel / touch swipe / click-drag translates the 3D camera along the flight corridor.
  * Planets approach and recede realistically with scale and perspective.
  * Checkpoints (The Moon, Mars, Asteroid Belt, Jupiter, Saturn) activate soft scroll lock and open a floating glass holographic info card.
* **Web Speech API Narration & Accessibility**:
  * Spoken scientific intel from NASA and ISRO using `window.speechSynthesis`.
  * Controls: `🎙 VOICE / TEXT` toggle, `🔊 MUTE` toggle, and `[CC]` Closed Captions toggle.
  * Real-time **Accessibility Closed-Caption Subtitle Bar** at bottom center.
  * **Phase Progress Track**: `PHASE 1 | PHASE 2 | PHASE 3 | PHASE 4` tracking flight depth.

### Phase 4: Mission Chandrayaan-3: Journey to the Moon (3D Simulation & Playable Lander)
* **Full 3D Mission Simulation (9 Stages)**:
  1. **Launch**: LVM3 M4 "Bahubali" liftoff from SDSC SHAR, Sriharikota, twin S200 booster plume, and payload fairing separation.
  2. **Earth Orbit Raising**: 5 widening glowing elliptical orbits (EBN 1-5) powered by liquid engine burns at perigee.
  3. **Trans-Lunar Injection (TLI)**: Midnight slingshot burn sending the craft toward the Moon.
  4. **Lunar Orbit Insertion (LOI)**: Retro-thrusters braking craft into lunar capture, followed by orbit circularization to 100 km.
  5. **Propulsion Module Separation**: Separation pyrotechnics releasing Vikram Lander.
  6. **Powered Descent & Braking**: Rough braking, attitude hold, and fine braking down to 800 m with Laser Doppler Velocimeter scanning.
  7. **Historic Touchdown**: Touchdown at Shiv Shakti Point (69.37°S, 32.35°E), lunar dust plume, landing leg compression, silence, and celebratory fanfare with tricolor confetti!
  8. **Pragyan Rover Rollout**: Two-segment deployable ramp drops; 6-wheeled rover rolls out embossing the ISRO logo and Ashoka Chakra into the lunar dust.
  9. **Surface Exploration & Science**: Pragyan driving mode with real soil scans (LIBS/APXS confirming Sulfur, Iron, Titanium).
* **Playable Landing Mode (Vikram Lunar Pilot Mini-Game)**:
  * Lunar gravity ($1.62\text{ m/s}^2$), throttleable thrusters, attitude tilt, fuel budget, and touchdown velocity evaluation ($V_y \le 2.2\text{ m/s}$).
  * "Chandrayaan-2 vs Chandrayaan-3" story explaining ISRO's failure-based design philosophy.
* **Bilingual Support (English & हिन्दी)**:
  * Full real-time UI, telemetry, and speech synthesis narration in English and Hindi.
* **Educational Layer**:
  * Real instruments interactive guide (ChaSTE, ILSA, RAMBHA, LIBS, APXS, SHAPE).
  * 5-question mission quiz with unlockable **ISRO Junior Lunar Scientist Certificate**.

---

## 📁 Repository Structure

```
VYOM/
├── assets/
│   ├── helmet-cutout.png      # High-res astronaut visor cutout asset
│   └── three.min.js           # Local offline Three.js 3D library (WebGL)
├── index.html                 # Hero stage, Mission Hangar, Cockpit & Chandrayaan-3
├── styles.css                 # Cosmic design system, responsive grid & cockpit HUD
├── script.js                  # Pure Three.js 3D cockpit, scroll engine, audio synth & narration
├── chandrayaan3.css           # Mission Chandrayaan-3 HUD, dialogs, quiz & pilot overlays
├── chandrayaan3.js            # Chandrayaan-3 3D engine, playable lander physics & quiz
├── .gitignore                 # Clean Git tracking configuration
└── README.md                  # Comprehensive documentation & phase roadmap
```

---

## ⚡ Quick Start (Run Locally)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TanishkaSahu191/Vyom.git
   cd Vyom
   ```

2. **Serve locally**:
   ```bash
   # Using Python:
   python -m http.server 3000

   # Or using Node.js:
   npx serve .
   ```

3. Open your browser at **`http://localhost:3000`**.

---

## 🗺️ Implementation Roadmap

* [x] **Phase 1**: Interactive Landing Experience & Hyperdrive Launch
* [x] **Phase 2**: Rocket Selection Hangar (ISRO & NASA), Cryo Fueling & State Storage
* [x] **Phase 3**: Cockpit 3D Viewport, Core Scroll Engine & Web Speech Narration
### Phase 4: Levels & Celestial Intel (NASA, ISRO & ESA Verified)
* **Scientifically Verified Content & Direct Source Links**:
  * Every celestial body, spacecraft, and satellite fact is verified against official **NASA, ISRO, or ESA** missions.
  * Every floating holographic card and satellite dossier features an official **Agency Badge** (`ISRO`, `NASA`, or `ESA`) and an external clickable link directly to the official mission portal.
  * Every card includes a dedicated **"💡 Did You Know?"** section revealing surprising, lesser-known astrophysical facts.
* **Level 1: Leaving Earth & The Moon**:
  * **Atmosphere Exit & Low Earth Orbit (LEO)**: Earth atmospheric gradient, Fresnel glow, and high-speed orbital flight.
  * **Interactive 3D Satellites & Space Stations**:
    * 🛰️ **International Space Station (ISS)** — *NASA / ESA / JAXA / CSA / Roscosmos*: Microgravity laboratory orbiting at 27,600 km/h.
    * 🛰️ **NavIC (IRNSS-1I)** — *ISRO*: India's sovereign regional satellite navigation constellation.
    * 🛰️ **INSAT-3DR** — *ISRO*: Advanced meteorological sounder & Search-and-Rescue beacon.
    * 🛰️ **GPS III (SV05)** — *US Space Force / NASA*: Next-generation atomic clock positioning network with relativistic time correction.
    * 🛰️ **Hubble Space Telescope (HST)** — *NASA / ESA*: Deep-space optical telescope orbiting above atmospheric blur.
  * **Interactive Satellite Dossier Modal**: Click any satellite directly in 3D space or via the **Left MFD Satellite Scanner HUD** to examine its operator, launch vehicle, orbital regime, altitude, operational role, and official source link.
  * **The Moon**: Detailed lunar cratering, Apollo 11 Sea of Tranquility landing site, and ISRO Chandrayaan-3 South Pole landing site (**Shiv Shakti Point** at 69.37°S).
* **Level 2: Inner Planets & Mars Exploration**:
  * **Mercury**: Heavily cratered surface, 85% metallic iron core geodynamics, and ESA/JAXA BepiColombo gravitational assist.
  * **Venus**: Dense CO2 runaway greenhouse atmosphere, crushing 92-bar pressure, lead-melting 465°C surface heat, and clockwise **retrograde rotation** where a day is longer than a year.
  * **Mars**: Iron oxide dusty crust, **Olympus Mons** (21.9 km shield volcano, 2.5x Mount Everest), NASA Perseverance & Ingenuity (72 powered aerodynamic flights), and **ISRO Mangalyaan (Mars Orbiter Mission)** in 3D orbit around Mars.
* **Level 3: Asteroid Belt & Jupiter System**:
  * **The Asteroid Belt**: 200+ tumbling 3D rock meshes spanning deep space, highlighting the scientific reality that the belt is predominantly empty space (unlike Hollywood movie depictions), featuring **16 Psyche** (the $10 quintillion heavy-metal asteroid).
  * **Jupiter**: Largest planet in the solar system, rotating in just 9.9 hours, featuring the massive counter-clockwise **Great Red Spot** anticyclonic storm and orbiting icy ocean moon **Europa**.
* **Level 4: Outer Planets & The Interstellar Edge**:
  * **Saturn**: Realistic concentric ring system with Cassini division, low bulk density (0.687 g/cm³—the planet would float in water), and hex-pole weather patterns.
  * **Uranus**: Cyan-green ice giant rolling completely sideways on a **97.77° tilted axis** with vertical rings.
  * **Neptune**: Deep azure atmosphere harboring supersonic planetary winds clocking over 2,160 km/h (>600 m/s).
  * **Voyager 1**: Humanity's most distant ambassador in interstellar space (162 AU / 24.3 billion km from Earth), modeled with high-gain radio dish, instrument boom, and the gold-plated copper **Golden Record** cultural time capsule.
* **Bonus Level: Sagittarius A\* Supermassive Black Hole**:
  * 4.15 million solar mass singularity at the gravitational heart of the Milky Way galaxy.
  * Pure black event horizon sphere.
  * Relativistic glowing accretion disk with Doppler radiation gradient.
  * Gravitational lensing photon ring halo warping deep starlight around spacetime.
* **Cockpit Level Ribbon Navigation**:
  * Instant access ribbon at the top of the cockpit windshield (`LVL 1`, `LVL 2`, `LVL 3`, `LVL 4`, `★ BONUS`) allowing seamless warp jumping to any stage of the solar system journey while maintaining real-time telemetry synchronization.

### Phase 5: Quizzes, Gamification & Certificate of Completion
* **End-of-Level Knowledge Quizzes**:
  * Comprehensive interactive quizzes for **Level 1**, **Level 2**, **Level 3**, **Level 4**, and **★ Bonus Level**.
  * **Diverse Question Mechanics**:
    * 🔘 **Multiple Choice Questions (MCQ)**: Instant tactile feedback with green/red states and verified scientific explanations.
    * 🧩 **Match the Pairs**: Interactive dual-column pairing (e.g. matching spacecraft and planets to their defining discoveries or agencies).
    * 🔢 **Sequence Ordering**: Interactive sequence sorters with rank chips and Up/Down movement (e.g. ordering planets by distance or satellites by altitude).
  * **Instant Scientific Feedback**: Every answered question reveals verified NASA/ISRO/ESA mission intel explaining the underlying physics and history.
* **Cadet Gamification & Rewards**:
  * **Experience Points (XP)**: +50 XP per correct question, with a +150 XP bonus for flawless 100% quiz scores.
  * **Academy Star Rating**: 1 to 3 animated gold stars awarded per level based on quiz mastery.
  * **Official Mission Badges**:
    * 🥉 **Orbital Pioneer**: Mastered Low Earth Orbit, ISS, NavIC, and the Lunar South Pole.
    * 🥈 **Terrestrial Explorer**: Navigated Mercury, Venus retrograde spin, and Mars rover missions.
    * 🥇 **Jovian Voyager**: Conquered the Asteroid Belt, 16 Psyche, and Jupiter’s Great Red Spot.
    * 💎 **Deep Space Pioneer**: Explored Saturn’s rings, sideways Uranus, supersonic Neptune, and Voyager 1.
    * 🌌 **Singularity Master**: Braved the event horizon and gravitational lensing of Sagittarius A*.
    * ⚡ **Quiz Perfectionist**: Achieved a flawless 100% score on a space academy knowledge quiz.
  * **Cadet Rank Progression**: Automated rank upgrades from `CADET PILOT` ➔ `ORBITAL NAVIGATOR` ➔ `DEEP SPACE SPECIALIST` ➔ `FLIGHT COMMANDER` ➔ `ADMIRAL OF THE COSMOS`.
  * **Daily Training Streak**: Tracks continuous days of space training (`🔥 1d Streak`).
* **Space Academy Global Leaderboard**:
  * Interactive ranking table showcasing top cadets from ISRO, NASA, and ESA academies.
  * Dynamically integrates the current cadet into the leaderboard at their exact ranking position based on accumulated XP.
  * Squad filters for `All Cadets`, `ISRO Squadron`, and `NASA Squadron`.
* **Official Certificate of Celestial Mastery**:
  * High-acuity formal accreditation certificate presented by VYOM Space Learning Lab in cooperation with ISRO & NASA Educational Outreach.
  * Interactive cadet name input, selected spacecraft badge, XP count, stars earned, badges grid, and official seal stamps.
  * Built-in **Print / Save as PDF** support (`@media print`) for high-resolution A4 landscape certificates.
* **Persistent State Storage (`localStorage`)**:
  * All XP, daily streak, cadet name, rank, level scores, stars, and earned badges persist across browser sessions under `vyom_mission_data`.

### Phase 6: Today's Transmission (Live NASA Feed & Curated ISRO Archives)
* **Live NASA Astronomy Picture of the Day (APOD)**:
  * Connects directly to NASA's public Open API (`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`).
  * Displays high-resolution astronomical imagery, date, copyright, title, and detailed astrophysical explanation.
  * Supports both image and video embeds (e.g. YouTube NASA videos).
  * Web Speech API integration: **"🎙 LISTEN TO INTEL"** reads aloud the telemetry explanation.
* **NASA Image & Video Library Search Engine**:
  * Live integration with `https://images-api.nasa.gov/search` allowing cadets to search the full NASA catalog beyond the daily APOD.
  * Quick mission tags: `Artemis`, `James Webb Telescope`, `Mars Rover`, `Jupiter Juno`, and `Black Hole`.
  * Click any gallery item to immediately expand and inspect full scientific details.
* **Curated ISRO Mission Archives**:
  * High-acuity curated gallery of India's landmark missions:
    * 🇮🇳 **Chandrayaan-3**: Pragyan rover roll-out on lunar regolith at Shiv Shakti point.
    * 🇮🇳 **Aditya-L1**: Solar chromosphere and corona ultraviolet imaging (SUIT payload at L1).
    * 🇮🇳 **Mars Orbiter Mission (Mangalyaan)**: Global mosaic of Mars and Valles Marineris canyon.
    * 🇮🇳 **Gaganyaan TV-D1**: Crew module supersonic in-flight abort and Bay of Bengal recovery.
    * 🇮🇳 **AstroSat**: Multi-wavelength deep ultraviolet starbursts in NGC 6946.
    * 🇮🇳 **LVM3 M4 Liftoff**: Historic Sriharikota launch trajectory into lunar transfer orbit.
* **Cockpit Integration**:
  * Docked directly into the cockpit as **"📡 TODAY'S TRANSMISSION"** via the top HUD bar and Left MFD telemetry console with live status pulse.
* **Offline Resilience & LocalStorage Caching**:
  * Caches daily APOD data in `localStorage` (`vyom_apod_cache`) to minimize API requests and ensure zero latency.
  * Gracefully catches network timeouts or API rate limits with scientific fallback imagery (James Webb Space Telescope Carina Nebula Deep Field).

---

### Phase 7: Realism, Performance and Polish
* **2K NASA-Grade Cartography & Multi-Layer Shaders**:
  * **2K Earth Multi-Layer**: High-definition continental geometry, bathymetric ocean gradients, Sahara/Gobi arid deserts, polar ice sheets, clustered city night lights on the dark hemisphere, and a dynamic rotating weather cloud sphere (`r=25.4`).
  * **2K Lunar Surface**: Basaltic lunar maria (Mare Tranquillitatis, Oceanus Procellarum), Tycho & Copernicus impact crater rays, and Apollo 11 / Chandrayaan-3 landing coordinates.
  * **2K Martian Crust**: Iron oxide rust terrain, the colossal Olympus Mons volcano caldera, Valles Marineris canyon rift, and frozen carbon-dioxide polar ice caps.
  * **2K Jovian Cloud Belts**: High-density atmospheric banding with turbulent vortices and the swirling Great Red Spot storm oval.
  * **2K Saturn & Outer Planets**: Saturnian concentric rings with Cassini division, sideways tilted Uranus, and supersonic storm-streaked Neptune.
* **Atmospheric Rayleigh Scattering Glow Shaders (Custom Three.js GLSL)**:
  * Custom `ShaderMaterial` implementing Fresnel dot-product rim glow with additive backface blending.
  * Cyan atmospheric halo for Earth (`0x38bdf8`), golden sulfuric haze for Venus (`0xf59e0b`), and radiant azure glow for Neptune (`0x0284c7`).
* **Directional Sunlight, Multi-Element Lens Flare & Cosmic Dust**:
  * Solar illuminant positioned at `(-600, 350, 200)` casting specular highlights and realistic planetary shadows.
  * Dynamic **Sun Lens Flare**: Screen-space projection calculating camera-to-Sun occlusion, projecting an anamorphic cyan light streak, core halo, and aperture ghost rings across the cockpit canopy glass.
  * **Interstellar Cosmic Particle Dust**: 350+ micrometeoroids and cosmic dust motes drifting through deep space along the flight corridor.
* **Mid-Range / Mobile Performance Optimization & Eco Mode**:
  * Dedicated **Performance Switcher** in the cockpit top bar (`⚡ HIGH 60FPS` / `🌱 ECO MODE`).
  * Clamps device pixel ratio to `1.0` in Eco mode, cutting GPU fill-rate requirements by 50–75% for mid-range laptops and mobile devices.
  * Persisted across sessions in `localStorage ('vyom_perf_mode')`.
* **Sound Design & Generative Ambient Space Hum**:
  * Web Audio API generative spaceship reactor hum: 55 Hz sub-bass drone + 110 Hz harmonic with slow 0.12 Hz LFO binaural modulation.
  * Integrated with `🔊 MUTE` toggle and cockpit entry triggers.
  * High-acuity UI clicks, propulsion ignition roar, and quiz feedback audio.
* **Mission Acknowledgments & Scientific Credits**:
  * Dedicated Scientific Credits modal accessible via the cockpit top bar (`ℹ️ CREDITS`) and menu button (`☰`).
  * Comprehensive formal citations and direct links for **ISRO** (Chandrayaan-3, Mangalyaan, Aditya-L1, NavIC, launch vehicles), **NASA** (Blue Marble, APOD, JPL Deep Space Network, Curiosity, Perseverance, Voyager), and **ESA** (SOHO, Gaia, Cassini-Huygens).

### Phase 8: Hackathon Pitch Deck, 1-Click Guided Demo & Future Scope
* **Official Hackathon Pitch Deck Modal**:
  * Seamlessly accessible via the cockpit top bar (`🏆 PITCH DECK`), the global navigation bar (`★ Pitch & Demo`), and the bottom phase track.
  * **Interactive 5-Tab Architecture**:
    * 🎯 **The Pitch**: Core vision, problem analysis (existing astronomy websites are passive encyclopedias; VYOM makes space active and intuitive), and the primary value proposition: *"Existing sites mostly let you view space, VYOM teaches it through a gamified 3D journey with real NASA & ISRO missions."*
    * 🎬 **Guided Demo Tour**: Complete 6-step guided walkthrough with instant 1-click step-jump shortcuts (`Phase 1: Astronaut Launchpad`, `Phase 2: Rocket Selection Hangar`, `Phase 3: Cockpit Flight Console`, `Sector 3: Asteroid Belt Checkpoint`, `Phase 6: Live Deep Space Transmission`, `Phase 5: Cadet Knowledge Quiz`, `Phase 5: Accredited Certificate`). Includes an automated **"▶ RUN 1-MINUTE DEMO WALKTHROUGH"** engine.
    * ⚔️ **Differentiation Matrix**: Comprehensive comparison matrix benchmarking VYOM against NASA Eyes, Stellarium, Solar System Scope, and Google Sky across Active Gamification, Dual ISRO+NASA Mission Focus, Responsive WebGL (No App Install Required), Spacecraft Engineering Schematics, and Offline Resilience.
    * 🔭 **Future Scope & Product Roadmap**:
      * 🦉 **Duolingo-Style Gamification**: Daily streaks, XP multiplier leagues, and weekly orbital challenges.
      * 🎓 **Teacher & Classroom Dashboard**: School LMS integrations, assignment trackers, student comprehension analytics, and custom space quiz builders.
      * 📰 **Live Space News Feed**: Real-time webhook ingestion for ISRO launches, NASA Artemis updates, and astronomical events.
      * 🗣️ **Multilingual Regional Narration**: Indian regional languages (Hindi, Tamil, Telugu, Marathi, Bengali) and global languages.
      * 📱 **WebXR / AR Mode**: Projecting real-scale 3D satellites and Martian rovers onto living room and classroom desks.
      * 🌌 **Deep Space & Interstellar Expansion**: Exoplanet transit modeling (TRAPPIST-1, Kepler-452b), JWST deep fields, and spiral galaxy kinematics.
    * ⚡ **Tech Stack & System Architecture**: Complete technical breakdown of Three.js WebGL, custom GLSL atmospheric shaders, browser-native Web Audio API synthesizer, Web Speech API speech synthesis, NASA Open APIs, and offline fallback caching.
* **Auto-Dismiss Checkpoint Engine**:
  * Holographic checkpoint cards automatically dismiss and fade away the moment the spaceship cruises past any planet or celestial body.
  * Eliminates intrusive scroll freezes; provides fluid, uninterrupted cruising across the entire solar system.
  * Interactive 3D raycasting allows cadets to re-inspect any planet or satellite at will by simply clicking it directly in the viewport.

---

## 🗺️ Implementation Roadmap

* [x] **Phase 1**: Interactive Landing Experience & Hyperdrive Launch
* [x] **Phase 2**: Rocket Selection Hangar (ISRO & NASA), Cryo Fueling & State Storage
* [x] **Phase 3**: Cockpit 3D Viewport, Core Scroll Engine & Web Speech Narration
* [x] **Phase 4**: Levels 1–4 Celestial Journey, Interactive LEO Satellites, Verified NASA/ISRO/ESA Intel & Bonus Black Hole
* [x] **Phase 5**: Interactive Quizzes & Gamification (MCQs, Drag-and-Drop, Badges, Leaderboard & Certificate)
* [x] **Phase 6**: "Today's Transmission" Live NASA APOD & ISRO Feeds
* [x] **Phase 7**: Atmospheric Glow Shaders, Sound FX Polish, Mid-Range Optimization & Credits
* [x] **Phase 8**: Hackathon Pitch Deck, 1-Click Guided Demo Flow, Future Scope & Auto-Dismiss Checkpoints
