document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Active navigation and mobile menu
  const currentPage = body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === currentPage) link.classList.add('active');
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Header state
  const header = document.querySelector('header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Visible ambient bubbles on every page
  const bubbles = document.createElement('div');
  bubbles.className = 'ambient-bubbles';
  const isMobile = window.innerWidth < 681;
  const bubbleCount = isMobile ? 4 : 7;
  for (let i = 0; i < bubbleCount; i += 1) {
    const bubble = document.createElement('span');
    const size = isMobile ? 24 + Math.random() * 62 : 34 + Math.random() * 102;
    bubble.className = 'bubble';
    Object.assign(bubble.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${Math.random() * 96}%`,
      top: `${5 + Math.random() * 92}%`,
    });
    bubble.style.setProperty('--duration', `${25 + Math.random() * 21}s`);
    bubble.style.setProperty('--delay', `${-Math.random() * 30}s`);
    bubble.style.setProperty('--drift', `${-60 + Math.random() * 120}px`);
    bubble.style.setProperty('--opacity', `${isMobile ? 0.08 + Math.random() * 0.10 : 0.10 + Math.random() * 0.14}`);
    bubbles.appendChild(bubble);
  }
  body.prepend(bubbles);

  // High-resolution logo silhouettes in the page background
  const brandField = document.createElement('div');
  brandField.className = 'brand-field';
  [
    [300, 0.052, '-8deg'],
    [340, 0.046, '8deg'],
  ].forEach(([size, opacity, rotation], index) => {
    const logo = new Image();
    logo.src = '/logo-mark.svg';
    logo.alt = '';
    logo.setAttribute('aria-hidden', 'true');
    logo.style.setProperty('--size', `${size}px`);
    logo.style.setProperty('--opacity', opacity);
    logo.style.setProperty('--rotate', rotation);
    logo.style.setProperty('--duration', `${36 + index * 4}s`);
    logo.style.setProperty('--delay', `${-5 - index * 6}s`);
    brandField.appendChild(logo);
  });
  body.prepend(brandField);

  // Cursor light
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', event => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    }, { passive: true });
  }

  // Home service showcase
  const showcase = document.querySelector('[data-service-showcase]');
  if (showcase) {
    const tabs = [...showcase.querySelectorAll('[data-service-tab]')];
    const panels = [...showcase.querySelectorAll('[data-service-panel]')];
    const counter = showcase.querySelector('[data-showcase-counter]');

    const activate = key => {
      tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.serviceTab === key));
      panels.forEach(panel => panel.classList.toggle('active', panel.dataset.servicePanel === key));
      const activeIndex = tabs.findIndex(tab => tab.dataset.serviceTab === key);
      if (counter && activeIndex >= 0) counter.textContent = `0${activeIndex + 1} / 03`;
    };

    tabs.forEach(tab => tab.addEventListener('click', () => activate(tab.dataset.serviceTab)));
    activate('uzkopsana');
  }

  // Interactive light on cards
  document.querySelectorAll('.card,.detail').forEach(item => {
    item.addEventListener('pointermove', event => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      item.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    });
  });

  // Small 3D tilt on visual panels
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(item => {
      item.addEventListener('pointermove', event => {
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        item.style.setProperty('--tilt-y', `${x * 4.5}deg`);
        item.style.setProperty('--tilt-x', `${y * -4.5}deg`);
      });
      item.addEventListener('pointerleave', () => {
        item.style.setProperty('--tilt-y', '0deg');
        item.style.setProperty('--tilt-x', '0deg');
      });
    });
  }

  // Mobile contact bar appears only after the first screen
  const mobileBar = document.querySelector('.mobilebar');
  const updateMobileBar = () => mobileBar?.classList.toggle('show', window.scrollY > 280);
  updateMobileBar();
  window.addEventListener('scroll', updateMobileBar, { passive: true });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
});
