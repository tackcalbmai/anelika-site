(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobilebar = document.querySelector('.mobilebar');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* Load the dedicated visual-motion layer on every page. */
  if (!document.querySelector('link[data-site-motion]')) {
    const motionStyles = document.createElement('link');
    motionStyles.rel = 'stylesheet';
    motionStyles.href = '/site-motion.css?v=1';
    motionStyles.dataset.siteMotion = '';
    document.head.appendChild(motionStyles);
  }
  document.documentElement.classList.add('motion-enabled');

  /* Guarantee that the ambient layer exists on every page. */
  let ambient = document.querySelector('.ambient');
  if (!ambient) {
    ambient = document.createElement('div');
    ambient.className = 'ambient';
    ambient.setAttribute('aria-hidden', 'true');
    body.prepend(ambient);
  }
  while (ambient.querySelectorAll('.bubble').length < 7) {
    const bubble = document.createElement('span');
    bubble.className = 'bubble';
    ambient.appendChild(bubble);
  }

  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === body.dataset.page) link.setAttribute('aria-current', 'page');
  });

  const setMenu = (open, moveFocus = false) => {
    if (!menu || !menuToggle) return;
    menu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Aizvērt izvēlni' : 'Atvērt izvēlni');
    if (open && moveFocus) menu.querySelector('a')?.focus();
  };

  menuToggle?.addEventListener('click', () => {
    const willOpen = !menu?.classList.contains('is-open');
    setMenu(willOpen, willOpen);
  });

  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.classList.contains('is-open')) {
      setMenu(false);
      menuToggle?.focus();
    }
  });

  document.addEventListener('pointerdown', event => {
    if (menu?.classList.contains('is-open') && !menu.contains(event.target) && !menuToggle?.contains(event.target)) setMenu(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1120) setMenu(false);
  }, { passive: true });

  let scrollFrame = 0;
  const updateScrollState = () => {
    scrollFrame = 0;
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 12);
    mobilebar?.classList.toggle('is-visible', y > Math.max(420, window.innerHeight * 0.65));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(100, (y / max) * 100) : 0;
    document.documentElement.style.setProperty('--progress', `${progress}%`);
    document.documentElement.style.setProperty('--parallax-y', `${Math.min(34, y * 0.035)}px`);
  };

  const requestScrollUpdate = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollState);
  };

  updateScrollState();
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* Final copy and illustration cleanup */
  document.querySelectorAll('.eyebrow').forEach(label => {
    if (label.textContent.includes('visā Latvijā')) {
      label.textContent = label.textContent.replace('visā Latvijā', 'Visa Latvija');
    }
  });

  document.querySelectorAll('.footer-line > span:last-child').forEach(line => {
    if (line.textContent.includes('visā Latvijā')) {
      line.textContent = line.textContent.replace('visā Latvijā', '— visa Latvija');
    }
  });

  document.querySelectorAll('.fact strong').forEach(title => {
    if (title.textContent.trim() === 'Izbraukumi visā Latvijā') title.textContent = 'Izbraukumi pa visu Latviju';
  });

  if (body.dataset.page === 'teritorija') {
    const territoryCta = document.querySelector('.cta h2');
    if (territoryCta) territoryCta.textContent = 'Aprakstiet nepieciešamos darbus';
  }

  const serviceIcons = document.querySelectorAll('.service-cards .card-icon svg');
  if (serviceIcons[0]) {
    serviceIcons[0].innerHTML = '<path d="M15 13h12l3 21H11l3-16zM18 8h8v5M25 8l6-2M16 22h9M33 14v6M30 17h6"/>';
  }
  if (serviceIcons[1]) {
    serviceIcons[1].innerHTML = '<path d="M8 27h24l-4-12H15l-5 12M28 15l4-8h5M9 27h24"/><circle cx="13" cy="31" r="4"/><circle cx="29" cy="31" r="4"/>';
  }
  if (serviceIcons[2]) {
    serviceIcons[2].innerHTML = '<path d="M10 31l18-18M24 8l8-2-2 8-5 2-3-3zM8 9l7 7-4 4-7-7zM23 24l9 9"/>';
  }

  document.querySelectorAll('.clean-squeegee').forEach(squeegee => {
    const svg = squeegee.closest('svg');
    if (svg?.classList.contains('showcase-art')) {
      squeegee.innerHTML = '<path class="scene-line" d="M221 47v55M181 103h80M190 112h62"/>';
    } else {
      squeegee.innerHTML = '<path class="scene-line" d="M233 67v68M187 136h92M198 146h70"/>';
    }
  });

  if (!reduceMotion && finePointer) {
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    window.addEventListener('pointermove', event => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) {
        pointerFrame = requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mx', `${pointerX}px`);
          document.documentElement.style.setProperty('--my', `${pointerY}px`);
          document.documentElement.style.setProperty('--motion-x', `${pointerX}px`);
          document.documentElement.style.setProperty('--motion-y', `${pointerY}px`);
          pointerFrame = 0;
        });
      }
    }, { passive: true });

    document.querySelectorAll('[data-spotlight]').forEach(item => {
      item.addEventListener('pointermove', event => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
        item.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      }, { passive: true });
    });

    document.querySelectorAll('[data-tilt]').forEach(item => {
      item.addEventListener('pointermove', event => {
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        item.style.setProperty('--tilt-y', `${x * 2.6}deg`);
        item.style.setProperty('--tilt-x', `${y * -2.6}deg`);
        item.style.setProperty('--sx', `${(x + 0.5) * 100}%`);
        item.style.setProperty('--sy', `${(y + 0.5) * 100}%`);
      }, { passive: true });
      item.addEventListener('pointerleave', () => {
        item.style.setProperty('--tilt-y', '0deg');
        item.style.setProperty('--tilt-x', '0deg');
      });
    });
  }

  /* Reveal important content progressively as it enters the viewport. */
  const revealSelector = [
    '.hero-grid > *',
    '.page-hero-grid > *',
    '.section-head',
    '.service-card',
    '.detail-card',
    '.process-step',
    '.fact',
    '.brand-band-grid > *',
    '.cta > *',
    '.contact-primary',
    '.company-card',
    '.request-item',
    '.footer-main > *'
  ].join(',');

  const revealItems = [...document.querySelectorAll(revealSelector)];
  revealItems.forEach((item, index) => {
    item.classList.add('reveal-item');
    item.style.setProperty('--reveal-delay', `${Math.min((index % 4) * 85, 255)}ms`);
  });

  requestAnimationFrame(() => body.classList.add('motion-ready'));

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-tabs]').forEach(tabset => {
    const tabs = [...tabset.querySelectorAll('[role="tab"]')];
    const panels = [...tabset.querySelectorAll('[role="tabpanel"]')];
    const counter = tabset.querySelector('[data-counter]');
    let activeIndex = 0;
    let autoTimer = 0;

    const activate = (tab, focus = false) => {
      tabs.forEach((item, index) => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        if (active) activeIndex = index;
        if (active && counter) counter.textContent = `0${index + 1} / 03`;
      });

      panels.forEach(panel => {
        const active = panel.id === tab.getAttribute('aria-controls');
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });

      if (focus) tab.focus();
    };

    const stopAuto = () => {
      if (autoTimer) window.clearInterval(autoTimer);
      autoTimer = 0;
    };

    const startAuto = () => {
      if (reduceMotion || tabs.length < 2 || !tabset.closest('.hero') || autoTimer) return;
      autoTimer = window.setInterval(() => {
        const next = tabs[(activeIndex + 1) % tabs.length];
        if (next) activate(next);
      }, 5600);
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        activate(tab);
        stopAuto();
        startAuto();
      });
      tab.addEventListener('keydown', event => {
        let nextIndex = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex !== null) {
          event.preventDefault();
          activate(tabs[nextIndex], true);
          stopAuto();
        }
      });
    });

    tabset.addEventListener('pointerenter', stopAuto);
    tabset.addEventListener('pointerleave', startAuto);
    tabset.addEventListener('focusin', stopAuto);
    tabset.addEventListener('focusout', event => {
      if (!tabset.contains(event.relatedTarget)) startAuto();
    });

    const initial = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    if (initial) activate(initial);
    startAuto();
  });
})();
