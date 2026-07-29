(() => {
  /* Load the shared LV / RU / EN language layer on every page. */
  let i18nScript = document.querySelector('script[data-site-i18n]');
  if (!i18nScript) {
    i18nScript = document.createElement('script');
    i18nScript.src = '/site-i18n.js?v=2';
    i18nScript.async = false;
    i18nScript.dataset.siteI18n = '';
    document.head.appendChild(i18nScript);
  }

  const measurementId = 'G-HV8CKNLVBD';
  const storageKey = 'anelika_cookie_consent_v2';
  const supportedLanguages = ['lv', 'ru', 'en'];
  const params = new URLSearchParams(window.location.search);
  let language = params.get('lang');
  try {
    if (!supportedLanguages.includes(language)) language = window.localStorage.getItem('anelika_language_v1');
  } catch (_) {}
  if (!supportedLanguages.includes(language)) language = 'lv';

  const banner = document.querySelector('[data-cookie-banner]');
  const accept = document.querySelector('[data-cookie-accept]');
  const settings = document.querySelectorAll('[data-cookie-settings]');

  const readChoice = () => {
    try {
      const value = window.localStorage.getItem(storageKey);
      return value === 'granted' || value === 'denied' ? value : null;
    } catch (_) {
      return null;
    }
  };

  const saveChoice = value => {
    try { window.localStorage.setItem(storageKey, value); }
    catch (_) { /* The choice still applies for the current page view. */ }
  };

  /* Google Consent Mode v2: analytics is denied until the visitor accepts it. */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  window.gtag('set', 'ads_data_redaction', true);

  const applyConsent = choice => {
    window.gtag('consent', 'update', {
      analytics_storage: choice === 'granted' ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  };

  const savedChoice = readChoice();
  if (savedChoice) applyConsent(savedChoice);

  if (!document.querySelector(`script[src*="${measurementId}"]`)) {
    const googleTag = document.createElement('script');
    googleTag.async = true;
    googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    googleTag.dataset.googleTag = measurementId;
    document.head.appendChild(googleTag);
  }
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const copy = {
    lv: {
      title: 'Sīkdatņu izvēle',
      text: 'Ar jūsu piekrišanu izmantojam Google Analytics, lai saprastu, kuras vietnes sadaļas ir noderīgas. Reklāmas un personalizācijas sīkdatnes neizmantojam.',
      more: 'Uzzināt vairāk',
      accept: 'Atļaut analītiku',
      reject: 'Tikai nepieciešamās'
    },
    ru: {
      title: 'Настройки файлов cookie',
      text: 'С вашего согласия мы используем Google Analytics, чтобы понимать, какие разделы сайта полезны. Рекламные и персонализирующие cookie не используются.',
      more: 'Подробнее',
      accept: 'Разрешить аналитику',
      reject: 'Только необходимые'
    },
    en: {
      title: 'Cookie settings',
      text: 'With your consent, we use Google Analytics to understand which parts of the website are useful. We do not use advertising or personalisation cookies.',
      more: 'Learn more',
      accept: 'Allow analytics',
      reject: 'Necessary only'
    }
  }[language];

  let reject = null;
  if (banner && accept) {
    const bannerCopy = banner.querySelector('.cookie-copy');
    const heading = bannerCopy?.querySelector('strong');
    const paragraph = bannerCopy?.querySelector('p');
    const moreLink = bannerCopy?.querySelector('a');
    if (heading) heading.textContent = copy.title;
    if (paragraph) paragraph.textContent = copy.text;
    if (moreLink) moreLink.textContent = copy.more;
    accept.textContent = copy.accept;

    let actions = banner.querySelector('.cookie-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'cookie-actions';
      accept.parentNode.insertBefore(actions, accept);
      actions.appendChild(accept);
    }

    reject = banner.querySelector('[data-cookie-reject]');
    if (!reject) {
      reject = document.createElement('button');
      reject.type = 'button';
      reject.className = 'cookie-reject';
      reject.dataset.cookieReject = '';
      actions.insertBefore(reject, accept);
    }
    reject.textContent = copy.reject;
  }

  const show = (focusButton = false) => {
    if (!banner) return;
    banner.hidden = false;
    if (focusButton) window.setTimeout(() => accept?.focus({ preventScroll: true }), 50);
  };

  const hide = () => {
    if (banner) banner.hidden = true;
  };

  if (banner && !savedChoice) window.setTimeout(() => show(false), 650);

  accept?.addEventListener('click', () => {
    saveChoice('granted');
    applyConsent('granted');
    hide();
  });

  reject?.addEventListener('click', () => {
    saveChoice('denied');
    applyConsent('denied');
    hide();
  });

  settings.forEach(button => button.addEventListener('click', () => show(true)));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && banner && !banner.hidden) hide();
  });

  const privacyTranslations = {
    ru: `<h2>Файлы cookie и технические данные</h2><p>На сайте используется Google Analytics 4 с идентификатором измерения <code>${measurementId}</code>. Аналитические cookie устанавливаются только после вашего согласия. До получения согласия для аналитики действует статус <code>denied</code> в Google Consent Mode v2; при этом Google может получать ограниченные технические сигналы без аналитических cookie.</p><div class="legal-table-wrap"><table class="legal-table"><thead><tr><th>Технология</th><th>Назначение</th><th>Хранение</th></tr></thead><tbody><tr><td><code>${storageKey}</code><br><small>localStorage</small></td><td>Сохранить ваш выбор относительно аналитики.</td><td>До удаления данных браузера.</td></tr><tr><td><code>_ga</code>, <code>_ga_*</code><br><small>Google Analytics 4</small></td><td>Статистика посещений и использования сайта после согласия.</td><td>По умолчанию до 2 лет; срок может ограничиваться браузером или настройками Google Analytics.</td></tr></tbody></table></div><p>Аналитические данные могут включать сведения об устройстве и браузере, приблизительном регионе, просмотренных страницах и действиях на сайте. Они используются для улучшения сайта и оценки востребованности его разделов.</p><p>Сайт размещён на GitHub Pages. Хостинг-провайдер может регистрировать IP-адрес и другие технические данные запросов в целях безопасности. Изменить выбор cookie можно внизу страницы через кнопку «Информация о cookie».</p>`,
    en: `<h2>Cookies and technical data</h2><p>This website uses Google Analytics 4 with measurement ID <code>${measurementId}</code>. Analytics cookies are set only after you consent. Before consent, analytics is set to <code>denied</code> through Google Consent Mode v2; Google may still receive limited technical signals without Analytics cookies.</p><div class="legal-table-wrap"><table class="legal-table"><thead><tr><th>Technology</th><th>Purpose</th><th>Storage</th></tr></thead><tbody><tr><td><code>${storageKey}</code><br><small>localStorage</small></td><td>Stores your analytics preference.</td><td>Until browser data is deleted.</td></tr><tr><td><code>_ga</code>, <code>_ga_*</code><br><small>Google Analytics 4</small></td><td>Website usage statistics after consent.</td><td>Up to 2 years by default; browser limits or Google Analytics settings may shorten this period.</td></tr></tbody></table></div><p>Analytics data may include device and browser information, approximate region, pages viewed and actions on the website. It is used to improve the website and understand which sections are useful.</p><p>The website is hosted on GitHub Pages. The hosting provider may log IP addresses and other technical request data for security purposes. You can change your cookie choice at the bottom of the page using “Cookie information”.</p>`
  };

  const localizePrivacySection = () => {
    const section = document.querySelector('#sikdatnes');
    if (section && privacyTranslations[language]) section.innerHTML = privacyTranslations[language];
  };

  localizePrivacySection();
  i18nScript?.addEventListener('load', localizePrivacySection, { once: true });
  window.setTimeout(localizePrivacySection, 250);
})();
