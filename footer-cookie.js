(() => {
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
