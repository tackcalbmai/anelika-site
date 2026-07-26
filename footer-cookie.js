(() => {
  /* Keep the homepage service cards consistent and use dedicated image assets. */
  const serviceCards = document.querySelector('body[data-page="sakums"] .service-cards');
  if (serviceCards) {
    serviceCards.innerHTML = `
      <article class="service-card" data-spotlight>
        <div class="card-icon"><img src="/icons/cleaning.svg?v=2" alt="" aria-hidden="true"></div>
        <h3>Telpu uzkopšana</h3>
        <p>Regulāra, ģenerālā un pēc remonta uzkopšana, kā arī logu un atsevišķu zonu tīrīšana.</p>
        <a class="inline-link" href="/uzkopsana/">Skatīt pakalpojumu <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" fill="none"/></svg></a>
      </article>
      <article class="service-card" data-spotlight>
        <div class="card-icon"><img src="/icons/territory.svg?v=2" alt="" aria-hidden="true"></div>
        <h3>Teritoriju kopšana</h3>
        <p>Zāles pļaušana, lapu un zaru savākšana, sezonas darbi un teritorijas uzturēšana.</p>
        <a class="inline-link" href="/teritoriju-kopsana/">Skatīt pakalpojumu <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" fill="none"/></svg></a>
      </article>
      <article class="service-card" data-spotlight>
        <div class="card-icon"><img src="/icons/repair.svg?v=2" alt="" aria-hidden="true"></div>
        <h3>Sīki remontdarbi</h3>
        <p>Mēbeļu montāža, nelieli apdares labojumi, silikona un blīvējumu atjaunošana, kā arī vienkārši santehnikas darbi.</p>
        <a class="inline-link" href="/siki-remontdarbi/">Skatīt pakalpojumu <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" fill="none"/></svg></a>
      </article>`;

    serviceCards.querySelectorAll('[data-spotlight]').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      });
    });
  }

  const banner = document.querySelector('[data-cookie-banner]');
  const accept = document.querySelector('[data-cookie-accept]');
  const settings = document.querySelectorAll('[data-cookie-settings]');
  const storageKey = 'anelika_cookie_notice_v1';

  const readChoice = () => {
    try { return window.localStorage.getItem(storageKey); }
    catch (_) { return null; }
  };

  const saveChoice = () => {
    try { window.localStorage.setItem(storageKey, 'acknowledged'); }
    catch (_) { /* The notice can still be closed for this page view. */ }
  };

  const show = (focusButton = false) => {
    if (!banner) return;
    banner.hidden = false;
    if (focusButton) window.setTimeout(() => accept?.focus({ preventScroll: true }), 50);
  };

  const hide = () => {
    if (banner) banner.hidden = true;
  };

  if (banner && !readChoice()) window.setTimeout(() => show(false), 650);

  accept?.addEventListener('click', () => {
    saveChoice();
    hide();
  });

  settings.forEach(button => button.addEventListener('click', () => show(true)));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && banner && !banner.hidden) hide();
  });
})();
