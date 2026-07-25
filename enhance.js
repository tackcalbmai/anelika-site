(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  if (hero) {
    ['one', 'two'].forEach(name => {
      const orb = document.createElement('span');
      orb.className = `ambient-orb ${name}`;
      orb.setAttribute('aria-hidden', 'true');
      hero.appendChild(orb);
    });
  }

  const progress = document.createElement('div');
  progress.className = 'page-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  const revealTargets = document.querySelectorAll(
    '.section-head, .service, .scope, .usp, .panel, details, .contact-main, .company, .quick-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if (reduceMotion) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  document.documentElement.classList.add('motion-ready');

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? window.scrollY / max : 0;
    progress.style.transform = `scaleX(${value})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
  revealTargets.forEach(el => observer.observe(el));

  document.querySelectorAll('.service').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });

  const tilt = document.querySelector('.quick-card');
  if (tilt && window.matchMedia('(pointer:fine)').matches) {
    tilt.addEventListener('pointermove', event => {
      const rect = tilt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.style.transform = `perspective(900px) rotateX(${y * -2.2}deg) rotateY(${x * 2.2}deg) translateY(-2px)`;
    });
    tilt.addEventListener('pointerleave', () => { tilt.style.transform = ''; });
  }
})();
