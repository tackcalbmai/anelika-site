(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobilebar = document.querySelector('.mobilebar');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === body.dataset.page) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const setMenu = open => {
    if (!menu || !menuToggle) return;
    menu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  };

  menuToggle?.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });
  document.addEventListener('pointerdown', event => {
    if (menu?.classList.contains('is-open') && !menu.contains(event.target) && !menuToggle?.contains(event.target)) setMenu(false);
  });

  const updateScrollState = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 12);
    mobilebar?.classList.toggle('is-visible', y > Math.max(520, window.innerHeight * 0.8));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(100, (y / max) * 100) : 0;
    document.documentElement.style.setProperty('--progress', `${progress}%`);
  };
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  if (!reduceMotion && finePointer) {
    window.addEventListener('pointermove', event => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    }, { passive: true });

    document.querySelectorAll('[data-spotlight]').forEach(item => {
      item.addEventListener('pointermove', event => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
        item.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      });
    });

    document.querySelectorAll('[data-tilt]').forEach(item => {
      item.addEventListener('pointermove', event => {
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        item.style.setProperty('--tilt-y', `${x * 3.2}deg`);
        item.style.setProperty('--tilt-x', `${y * -3.2}deg`);
        item.style.setProperty('--sx', `${(x + 0.5) * 100}%`);
        item.style.setProperty('--sy', `${(y + 0.5) * 100}%`);
      });
      item.addEventListener('pointerleave', () => {
        item.style.setProperty('--tilt-y', '0deg');
        item.style.setProperty('--tilt-x', '0deg');
      });
    });
  }

  document.querySelectorAll('[data-tabs]').forEach(tabset => {
    const tabs = [...tabset.querySelectorAll('[role="tab"]')];
    const panels = [...tabset.querySelectorAll('[role="tabpanel"]')];
    const counter = tabset.querySelector('[data-counter]');

    const activate = (tab, focus = false) => {
      tabs.forEach((item, index) => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        if (active && counter) counter.textContent = `0${index + 1} / 03`;
      });
      panels.forEach(panel => {
        const active = panel.id === tab.getAttribute('aria-controls');
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
      if (focus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        let nextIndex = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex !== null) {
          event.preventDefault();
          activate(tabs[nextIndex], true);
        }
      });
    });

    const initial = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    if (initial) activate(initial);
  });
})();
