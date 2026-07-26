(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobilebar = document.querySelector('.mobilebar');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

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
    if (window.innerWidth > 860) setMenu(false);
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
  };

  const requestScrollUpdate = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollState);
  };

  updateScrollState();
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

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
