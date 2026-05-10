/* =========================================
   Mahmoud Helal Portfolio & Age Calculator
   Main Script File
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize third-party animation library.
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic'
  });

  // Cache DOM elements.
  const loader = document.getElementById('pageLoader');
  const navbar = document.getElementById('mainNavbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const todayDateEl = document.getElementById('todayDate');
  const liveClockEl = document.getElementById('liveClock');
  const currentYearEl = document.getElementById('currentYear');
  const typingTextEl = document.getElementById('typingText');
  const ageForm = document.getElementById('ageForm');
  const resetBtn = document.getElementById('resetBtn');
  const resultsGrid = document.getElementById('resultsGrid');
  const resultPlaceholder = document.getElementById('resultPlaceholder');
  const toastContainer = document.getElementById('toastContainer');
  const navLinks = document.querySelectorAll('.nav-link');

  const resultElements = {
    years: document.getElementById('yearsResult'),
    months: document.getElementById('monthsResult'),
    weeks: document.getElementById('weeksResult'),
    days: document.getElementById('daysResult'),
    hours: document.getElementById('hoursResult'),
    minutes: document.getElementById('minutesResult'),
    seconds: document.getElementById('secondsResult'),
    birthday: document.getElementById('birthdayResult'),
    zodiac: document.getElementById('zodiacResult'),
    birthDay: document.getElementById('birthDayResult'),
    exactAge: document.getElementById('exactAgeResult')
  };

  let liveAgeInterval = null;
  let currentBirthDate = null;

  /* ---------------------------
     Loading Animation
  --------------------------- */
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
    }, 900);
  });

  /* ---------------------------
     Navbar Effects & Active Links
  --------------------------- */
  const handleScrollState = () => {
    const scrollY = window.scrollY;

    if (scrollY > 30) {
      navbar.classList.add('scrolled');
      scrollTopBtn.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      scrollTopBtn.classList.remove('show');
    }

    updateActiveNavLink();
  };

  const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('header[id], section[id]');
    let currentSectionId = 'home';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
    });
  };

  window.addEventListener('scroll', handleScrollState);
  handleScrollState();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Close mobile navbar after clicking any link.
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse.show');
      if (navbarCollapse) {
        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
      }
    });
  });

  /* ---------------------------
     Typing Text Effect
  --------------------------- */
  const typingWords = [
    'Programming Enthusiast',
    'Technology Explorer',
    'Creative Thinker',
    'Future-Driven Innovator'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeEffect = () => {
    const currentWord = typingWords[wordIndex];
    const visibleText = currentWord.substring(0, charIndex);
    typingTextEl.textContent = visibleText;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeEffect, 90);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 45);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % typingWords.length;
      }
      setTimeout(typeEffect, isDeleting ? 1200 : 250);
    }
  };

  typeEffect();

  /* ---------------------------
     Counter Animation
  --------------------------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        let count = 0;
        const increment = Math.max(1, Math.ceil(target / 60));

        const updateCounter = () => {
          count += increment;
          if (count >= target) {
            counter.textContent = target;
          } else {
            counter.textContent = count;
            requestAnimationFrame(updateCounter);
          }
        };

        updateCounter();
        observer.unobserve(counter);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  /* ---------------------------
     Live Date & Clock
  --------------------------- */
  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const formatClock = (date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

  const updateDateTime = () => {
    const now = new Date();
    todayDateEl.textContent = formatDate(now);
    liveClockEl.textContent = formatClock(now);
  };

  updateDateTime();
  setInterval(updateDateTime, 1000);
  currentYearEl.textContent = new Date().getFullYear();

  /* ---------------------------
     Particles Background Animation
  --------------------------- */
  const particlesCanvas = document.getElementById('particlesCanvas');
  const ctx = particlesCanvas.getContext('2d');
  let particles = [];

  const setCanvasSize = () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
  };

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * particlesCanvas.width;
      this.y = Math.random() * particlesCanvas.height;
      this.size = Math.random() * 2.5 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.7 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (
        this.x < 0 ||
        this.x > particlesCanvas.width ||
        this.y < 0 ||
        this.y > particlesCanvas.height
      ) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
      ctx.fill();
    }
  }

  const initParticles = () => {
    const particleCount = Math.min(90, Math.floor(window.innerWidth / 18));
    particles = Array.from({ length: particleCount }, () => new Particle());
  };

  const connectParticles = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 - distance / 1100})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const animateParticles = () => {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
  };

  setCanvasSize();
  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    setCanvasSize();
    initParticles();
  });

  /* ---------------------------
     Toast Notifications
  --------------------------- */
  const showToast = (title, message, type = 'info') => {
    const iconMap = {
      success: 'fa-circle-check text-success',
      error: 'fa-triangle-exclamation text-danger',
      info: 'fa-circle-info text-info',
      warning: 'fa-bell text-warning'
    };

    const toastId = `toast-${Date.now()}`;
    const toastHTML = `
      <div id="${toastId}" class="toast custom-toast border-0 mb-3" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <i class="fa-solid ${iconMap[type] || iconMap.info} me-2"></i>
          <strong class="me-auto">${title}</strong>
          <small>Now</small>
          <button type="button" class="btn-close ms-2 mb-1" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${message}</div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3500 });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  };

  /* ---------------------------
     Advanced Age Calculator
  --------------------------- */
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getDaysInMonth = (year, monthIndex) => new Date(year, monthIndex + 1, 0).getDate();

  const getZodiacSign = (day, month) => {
    const zodiacSigns = [
      ['Capricorn', 19],
      ['Aquarius', 18],
      ['Pisces', 20],
      ['Aries', 19],
      ['Taurus', 20],
      ['Gemini', 20],
      ['Cancer', 22],
      ['Leo', 22],
      ['Virgo', 22],
      ['Libra', 22],
      ['Scorpio', 21],
      ['Sagittarius', 21],
      ['Capricorn', 31]
    ];

    return day <= zodiacSigns[month - 1][1]
      ? zodiacSigns[month - 1][0]
      : zodiacSigns[month][0];
  };

  const calculateCalendarAge = (birthDate, now) => {
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const previousMonthIndex = (now.getMonth() - 1 + 12) % 12;
      const previousMonthYear = previousMonthIndex === 11 ? now.getFullYear() - 1 : now.getFullYear();
      days += getDaysInMonth(previousMonthYear, previousMonthIndex);
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  };

  const getNextBirthdayDays = (birthDate, now) => {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    // Handle leap day birthdays in non-leap years by moving to Feb 28.
    if (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && nextBirthday.getMonth() !== 1) {
      nextBirthday = new Date(now.getFullYear(), 1, 28);
    }

    if (nextBirthday < today) {
      nextBirthday = new Date(now.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
      if (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && nextBirthday.getMonth() !== 1) {
        nextBirthday = new Date(now.getFullYear() + 1, 1, 28);
      }
    }

    const diffMs = nextBirthday - today;
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  };

  const totalMonthsLived = (birthDate, now, calendarAge) => {
    let total = calendarAge.years * 12 + calendarAge.months;
    if (now.getDate() < birthDate.getDate()) {
      total = Math.max(total, 0);
    }
    return total;
  };

  const formatNumber = (number) => Number(number).toLocaleString('en-US');

  const renderAgeResults = () => {
    if (!currentBirthDate) return;

    const now = new Date();
    const birthDate = currentBirthDate;
    const diffMs = now - birthDate;

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const calendarAge = calculateCalendarAge(birthDate, now);
    const months = totalMonthsLived(birthDate, now, calendarAge);
    const daysUntilBirthday = getNextBirthdayDays(birthDate, now);
    const zodiacSign = getZodiacSign(birthDate.getDate(), birthDate.getMonth() + 1);
    const birthDay = daysOfWeek[birthDate.getDay()];

    resultElements.years.textContent = formatNumber(calendarAge.years);
    resultElements.months.textContent = formatNumber(months);
    resultElements.weeks.textContent = formatNumber(totalWeeks);
    resultElements.days.textContent = formatNumber(totalDays);
    resultElements.hours.textContent = formatNumber(totalHours);
    resultElements.minutes.textContent = formatNumber(totalMinutes);
    resultElements.seconds.textContent = formatNumber(totalSeconds);
    resultElements.birthday.textContent = `${formatNumber(daysUntilBirthday)} Days`;
    resultElements.zodiac.textContent = zodiacSign;
    resultElements.birthDay.textContent = birthDay;
    resultElements.exactAge.textContent = `${calendarAge.years} Years, ${calendarAge.months} Months, ${calendarAge.days} Days`;
  };

  const validateBirthDate = (day, month, year) => {
    if (!day || !month || !year) {
      return { valid: false, message: 'Please fill in day, month, and year before calculating.' };
    }

    const parsedDay = Number(day);
    const parsedMonth = Number(month);
    const parsedYear = Number(year);

    if (
      Number.isNaN(parsedDay) ||
      Number.isNaN(parsedMonth) ||
      Number.isNaN(parsedYear) ||
      parsedDay < 1 ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      parsedYear < 1900
    ) {
      return { valid: false, message: 'Please enter a valid numeric date of birth.' };
    }

    const testDate = new Date(parsedYear, parsedMonth - 1, parsedDay);
    const isValidDate =
      testDate.getFullYear() === parsedYear &&
      testDate.getMonth() === parsedMonth - 1 &&
      testDate.getDate() === parsedDay;

    if (!isValidDate) {
      return { valid: false, message: 'The entered date is invalid. Please check the day, month, and year.' };
    }

    const today = new Date();
    if (testDate > today) {
      return { valid: false, message: 'Birth date cannot be in the future.' };
    }

    return { valid: true, birthDate: testDate };
  };

  ageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const day = document.getElementById('day').value.trim();
    const month = document.getElementById('month').value.trim();
    const year = document.getElementById('year').value.trim();
    const validation = validateBirthDate(day, month, year);

    if (!validation.valid) {
      showToast('Invalid Date', validation.message, 'error');
      return;
    }

    currentBirthDate = validation.birthDate;
    renderAgeResults();

    resultPlaceholder.classList.add('d-none');
    resultsGrid.classList.remove('d-none');

    resultsGrid.querySelectorAll('.result-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(14px)';
      setTimeout(() => {
        card.style.transition = 'all 0.45s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 60);
    });

    if (liveAgeInterval) {
      clearInterval(liveAgeInterval);
    }

    liveAgeInterval = setInterval(renderAgeResults, 1000);
    showToast('Success', 'Age calculated successfully with detailed live results.', 'success');
  });

  resetBtn.addEventListener('click', () => {
    ageForm.reset();
    currentBirthDate = null;

    if (liveAgeInterval) {
      clearInterval(liveAgeInterval);
      liveAgeInterval = null;
    }

    resultsGrid.classList.add('d-none');
    resultPlaceholder.classList.remove('d-none');
    showToast('Reset Complete', 'All birth date fields and results have been cleared.', 'info');
  });
});
