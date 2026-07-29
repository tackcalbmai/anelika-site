(() => {
  const storageKey = 'anelika_pending_lead_v1';
  const form = document.querySelector('[data-lead-form]');
  const thanksPage = document.body.dataset.page === 'paldies';
  const messages = {
    lv: {
      required:'Lūdzu, aizpildiet šo lauku.',
      email:'Lūdzu, ievadiet derīgu e-pasta adresi.',
      fileValidity:'Maksimālais faila izmērs ir 10 MB.',
      fileError:'Fotoattēls ir lielāks par 10 MB. Izvēlieties mazāku failu.',
      fileEmpty:'Fails nav izvēlēts',
      sending:'Nosūtām…',
      notSpecified:'Nav norādīts'
    },
    ru: {
      required:'Пожалуйста, заполните это поле.',
      email:'Введите корректный адрес электронной почты.',
      fileValidity:'Максимальный размер файла — 10 МБ.',
      fileError:'Фотография больше 10 МБ. Выберите файл меньшего размера.',
      fileEmpty:'Файл не выбран',
      sending:'Отправляем…',
      notSpecified:'Не указано'
    },
    en: {
      required:'Please complete this field.',
      email:'Please enter a valid email address.',
      fileValidity:'The maximum file size is 10 MB.',
      fileError:'The photo is larger than 10 MB. Please choose a smaller file.',
      fileEmpty:'No file selected',
      sending:'Sending…',
      notSpecified:'Not specified'
    }
  };
  const copy = () => messages[document.documentElement.lang] || messages.lv;

  const track = (name, parameters = {}) => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, parameters);
  };

  if (form) {
    const submit = form.querySelector('[type="submit"]');
    const error = form.querySelector('[data-lead-error]');
    const attachment = form.querySelector('input[type="file"]');
    const attachmentName = form.querySelector('[data-lead-file-name]');

    form.querySelectorAll('[required], input[type="email"]').forEach(field => {
      field.addEventListener('invalid', () => {
        if (field.validity.valueMissing) field.setCustomValidity(copy().required);
        else if (field.validity.typeMismatch) field.setCustomValidity(copy().email);
      });
      ['input','change'].forEach(eventName => {
        field.addEventListener(eventName, () => field.setCustomValidity(''));
      });
    });

    attachment?.addEventListener('change', () => {
      const file = attachment.files?.[0];
      if (attachmentName) attachmentName.textContent = file?.name || copy().fileEmpty;
      const tooLarge = file && file.size > 10 * 1024 * 1024;
      attachment.setCustomValidity(tooLarge ? copy().fileValidity : '');
      if (tooLarge) {
        if (error) {
          error.textContent = copy().fileError;
          error.classList.add('is-visible');
        }
      } else {
        error?.classList.remove('is-visible');
      }
    });

    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        return;
      }

      const service = form.querySelector('[name="Pakalpojums"]')?.value || copy().notSpecified;
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
        submit.textContent = copy().sending;
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
