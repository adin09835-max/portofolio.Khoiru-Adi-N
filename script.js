/* ============================================================
   Khoiru Adi Nugroho — Portfolio
   script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav on scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile hamburger menu ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Smooth scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    });
  });

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !prefersReducedMotion()) {
    revealEls.forEach(el => el.classList.add('reveal-init'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));

    /* Safety net: guarantee visibility even if the observer never fires
       (e.g. very old/headless browsers) */
    window.setTimeout(() => {
      revealEls.forEach(el => el.classList.add('is-visible'));
    }, 1500);
  }

  /* ============================================================
     PROJECT DATA
     ============================================================ */
  const PROJECTS = {
    pv: {
      title: "Dual-Axis PV Optimization",
      subtitle: "Optimasi Posisi Panel Surya Dual-Axis Menggunakan Pendekatan Machine Learning",
      year: "2026 · Final Project",
      role: "IoT & Embedded System Developer",
      overview: "A final-year project focused on optimizing photovoltaic (PV) power output using a dual-axis solar tracking mechanism combined with a machine learning approach to help guide panel positioning based on sensor data.",
      responsibilities: [
        "Designed a dual-axis solar tracking system driven by servo motors and controlled by an ESP32",
        "Integrated BH1750 (light intensity), INA219, DS18B20 (temperature), and RTC sensors for coordinated data acquisition",
        "Programmed the ESP32 and Arduino IDE logic for sensor reading, servo control, and data handling",
        "Applied XGBoost to predict light intensity and used a Decision Tree as a reference for panel positioning",
        "Powered the system with a 30 Wp solar panel, a 20A solar charge controller, and a 12V/9AH battery"
      ],
      hardware: ["ESP32", "BH1750", "INA219", "DS18B20", "RTC", "Servo Motor", "Solar Panel 30 Wp", "Solar Charge Controller 20A", "12V/9AH Battery"],
      software: ["Arduino IDE", "XGBoost", "Decision Tree"],
      result: "The dual-axis tracking and machine-learning-guided positioning increased the power-to-light-intensity ratio from 0.000593 W/lux to 0.000649 W/lux — an improvement of roughly 13.37% — while reducing panel temperature by about 3.15% compared to a static reference.",
      gallery: ["pv-01.jpg", "pv-02.jpg", "pv-03.jpg"],
      galleryDir: "assets/pv/"
    },
    spklu: {
      title: "SPKLU Monitoring System",
      subtitle: "EV Charging Station (SPKLU) IoT Monitoring System",
      year: "2026 · Collaboration with UMS & Politeknik Negeri Semarang (POLINES)",
      role: "IoT Programmer",
      overview: "An IoT-based monitoring system for a public EV charging station (SPKLU), built in collaboration between Universitas Muhammadiyah Surakarta and Politeknik Negeri Semarang.",
      responsibilities: [
        "Integrated four sensor types — DS18B20, BH1750, PZEM, and a Flow Sensor — into a single ESP32-based monitoring system",
        "Developed the ESP32 data acquisition program to keep sensor readings stable and synchronized across modules",
        "Built a Node.js backend to process and store monitoring data for ongoing visualization",
        "Worked with an application covering PV, charging station, motor, and environmental monitoring tabs"
      ],
      hardware: ["ESP32", "DS18B20", "BH1750", "PZEM (DC)", "PZEM (AC)", "Flow Sensor"],
      software: ["Node.js", "Visual Studio Code"],
      result: "Developed an IoT-based SPKLU monitoring system that integrates multiple sensors with a backend for real-time monitoring of electrical and environmental parameters.",
      gallery: ["spklu-01.jpg", "spklu-02.jpg", "app-dashboard.jpg"],
      galleryDir: "assets/spklu/"
    },
    irrigation: {
      title: "Automatic Irrigation System",
      subtitle: "Smart Sprayer — IoT-Based Ornamental Plant Watering Monitor & Controller",
      year: "2025 · Group Project",
      role: "IoT Programmer & Mechanical System Developer",
      overview: "An IoT-based automatic irrigation system (\u201cSmart Sprayer\u201d) built to monitor and control watering for ornamental plants, reducing manual watering and water waste.",
      responsibilities: [
        "Programmed soil moisture and temperature sensor readings for automated watering decisions",
        "Developed automatic control logic that triggers irrigation based on real-time soil conditions",
        "Designed and integrated the mechanical structure (frame, water tank, and pump placement) for the system",
        "Enabled remote monitoring and control through the Blynk application"
      ],
      hardware: ["Soil Moisture Sensor", "Temperature Sensor", "Relay", "Water Pump"],
      software: ["Blynk", "Arduino IDE"],
      result: "Delivered a working automatic irrigation system that monitors plant and soil conditions in real time and waters ornamental plants automatically, reducing manual watering and water usage.",
      gallery: ["irrigation-01.jpg", "irrigation-02.jpg", "mechanism.jpg"],
      galleryDir: "assets/irrigation/"
    },
    mep: {
      title: "MEP Engineering Internship",
      subtitle: "Pembangunan Gedung FEB UMS (FEB UMS Building Project)",
      year: "1 May — 30 June 2025 · Internship",
      role: "MEP Engineering Intern",
      overview: "A two-month internship under the UMS Project Supervision Directorate (Direksi Pengawasan UMS) on the FEB UMS building construction project, focused on MEP and electrical installation supervision.",
      responsibilities: [
        "Adjusted MEP and electrical installation drawings using AutoCAD to match on-site work requirements",
        "Cross-checked technical drawings against actual field conditions to support accurate project supervision",
        "Carried out regular field observation to verify MEP installation against technical drawings",
        "Supported the technical supervision team, coordinating with contractors and field teams"
      ],
      hardware: [],
      software: ["AutoCAD"],
      result: "Completed a two-month MEP internship on the FEB UMS building project, gaining hands-on experience in MEP drawings, electrical installation, AutoCAD, and field project supervision.",
      gallery: ["mep-01.jpg", "mep-02.jpg", "mep-03.jpg", "mep-04.jpg"],
      galleryDir: "assets/mep/"
    }
  };

  /* ============================================================
     MODAL
     ============================================================ */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  let lastFocused = null;

  function buildTagList(items) {
    if (!items || !items.length) return '';
    return `<div class="tag-row">${items.map(i => `<span class="tag">${i}</span>`).join('')}</div>`;
  }

  function buildModal(key) {
    const p = PROJECTS[key];
    if (!p) return '';
    const galleryHTML = p.gallery.map((file, i) => `
      <button class="gallery-thumb" data-gallery-index="${i}" data-gallery-key="${key}" aria-label="Open image ${i + 1}">
        <img src="${p.galleryDir}${file}" alt="${p.title} photo ${i + 1}" loading="lazy">
      </button>
    `).join('');

    return `
      <p class="modal-eyebrow">${p.year}</p>
      <h2 id="modal-title">${p.title}</h2>
      <p class="modal-subtitle">${p.subtitle}</p>

      <div class="modal-section">
        <h4>Project Overview</h4>
        <p>${p.overview}</p>
      </div>

      <div class="modal-section">
        <h4>My Role</h4>
        <p>${p.role}</p>
      </div>

      <div class="modal-section">
        <h4>Responsibilities</h4>
        <ul>${p.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
      </div>

      ${p.hardware.length ? `<div class="modal-section"><h4>Hardware</h4>${buildTagList(p.hardware)}</div>` : ''}
      ${p.software.length ? `<div class="modal-section"><h4>Software</h4>${buildTagList(p.software)}</div>` : ''}

      <div class="modal-section">
        <h4>Result</h4>
        <p>${p.result}</p>
      </div>

      <div class="modal-section">
        <h4>Project Gallery</h4>
        <div class="modal-gallery">${galleryHTML}</div>
      </div>
    `;
  }

  function openModal(key) {
    modalContent.innerHTML = buildModal(key);
    modalOverlay.classList.add('open');
    document.body.classList.add('no-scroll');
    lastFocused = document.activeElement;
    modalClose.focus();

    modalContent.querySelectorAll('.gallery-thumb').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.galleryIndex, 10);
        openLightbox(key, idx);
      });
    });
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.openModal));
  });
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('open')) closeLightbox();
      else if (modalOverlay.classList.contains('open')) closeModal();
    }
  });

  /* ============================================================
     LIGHTBOX
     ============================================================ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  let currentGalleryKey = null;
  let currentIndex = 0;

  function openLightbox(key, index) {
    currentGalleryKey = key;
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('open');
  }

  function updateLightboxImage() {
    const p = PROJECTS[currentGalleryKey];
    const file = p.gallery[currentIndex];
    lightboxImg.src = p.galleryDir + file;
    lightboxImg.alt = `${p.title} photo ${currentIndex + 1}`;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  function nextImage() {
    const p = PROJECTS[currentGalleryKey];
    currentIndex = (currentIndex + 1) % p.gallery.length;
    updateLightboxImage();
  }

  function prevImage() {
    const p = PROJECTS[currentGalleryKey];
    currentIndex = (currentIndex - 1 + p.gallery.length) % p.gallery.length;
    updateLightboxImage();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  /* ---------- Touch swipe for lightbox (mobile) ---------- */
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) nextImage(); else prevImage();
    }
  }, { passive: true });

});
