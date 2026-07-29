(() => {
  const storageKey = 'anelika_pending_lead_v1';
  const form = document.querySelector('[data-lead-form]');
  const thanksPage = document.body.dataset.page === 'paldies';

  const track = (name, parameters = {}) => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, parameters);
  };

  if (form) {
    const submit = form.querySelector('[type="submit"]');
    const error = form.querySelector('[data-lead-error]');
    const attachment = form.querySelector('input[type="file"]');

    attachment?.addEventListener('change', () => {
      const file = attachment.files?.[0];
      const tooLarge = file && file.size > 10 * 1024 * 1024;
      attachment.setCustomValidity(tooLarge ? 'Maksimālais faila izmērs ir 10 MB.' : '');
      if (tooLarge) {
        error.textContent = 'Fotoattēls ir lielāks par 10 MB. Izvēlieties mazāku failu.';
        error.classList.add('is-visible');
      } else {
        error.classList.remove('is-visible');
      }
    });

    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        return;
      }

      const service = form.querySelector('[name="Pakalpojums"]')?.value || 'Nav norādīts';
      const source = form.dataset.leadSource || 'website';

      try {
        window.localStorage.setItem(storageKey, JSON.stringify({
          createdAt: Date.now(),
          service,
          source,
          path: window.location.pathname
        }));
      } catch (_) {}

      track('form_submit_attempt', {
        form_name: 'anelika_lead_form',
        lead_source: source,
        service
      });

      if (submit) {
        submit.disabled = true;
        submit.dataset.originalText = submit.textContent;
        submit.textContent = 'Nosūtām…';
      }
    });

    window.addEventListener('pageshow', () => {
      if (!submit) return;
      submit.disabled = false;
      if (submit.dataset.originalText) submit.textContent = submit.dataset.originalText;
    });
  }

  if (thanksPage) {
    let pending = null;
    try {
      pending = JSON.parse(window.localStorage.getItem(storageKey) || 'null');
      window.localStorage.removeItem(storageKey);
    } catch (_) {}

    if (pending && Date.now() - Number(pending.createdAt || 0) < 60 * 60 * 1000) {
      track('generate_lead', {
        currency: 'EUR',
        value: 1,
        lead_source: pending.source || 'website',
        service: pending.service || 'Nav norādīts'
      });
    }
  }
})();
