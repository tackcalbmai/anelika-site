(() => {
  const supported = ['lv', 'ru', 'en'];
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang');
  try { if (!supported.includes(lang)) lang = localStorage.getItem('anelika_language_v1'); } catch (_) {}
  if (!supported.includes(lang)) lang = 'lv';
  try { localStorage.setItem('anelika_language_v1', lang); } catch (_) {}

  const pageKey = document.body.dataset.page || (location.pathname.includes('privatuma-politika') ? 'privacy' : 'sakums');
  const pageMeta = {
    ru: {
      sakums:['Уборка и хозяйственные работы | Anelika','Уборка помещений, уход за территорией и мелкий ремонт в Елгаве, Риге и по всей Латвии.'],
      uzkopsana:['Уборка помещений по всей Латвии | Anelika','Регулярная, генеральная и послеремонтная уборка домов, квартир, офисов и других объектов.'],
      teritorija:['Уход за территорией по всей Латвии | Anelika','Стрижка травы, уборка листьев и веток, сезонные работы и обслуживание территории.'],
      remonti:['Мелкий ремонт по всей Латвии | Anelika','Сборка мебели, небольшие отделочные исправления, силикон, уплотнения и простые сантехнические работы.'],
      kontakti:['Контакты | Anelika SIA','Свяжитесь с Anelika SIA по вопросам уборки, ухода за территорией и мелкого ремонта.'],
      privacy:['Политика конфиденциальности и cookies | Anelika','Информация об обработке персональных данных и cookies на сайте Anelika.']
    },
    en: {
      sakums:['Cleaning and property maintenance | Anelika','Indoor cleaning, grounds maintenance and minor repairs in Jelgava, Riga and throughout Latvia.'],
      uzkopsana:['Indoor cleaning throughout Latvia | Anelika','Regular, deep and post-renovation cleaning for houses, apartments, offices and other properties.'],
      teritorija:['Grounds maintenance throughout Latvia | Anelika','Grass cutting, leaf and branch removal, seasonal work and ongoing grounds maintenance.'],
      remonti:['Minor repairs throughout Latvia | Anelika','Furniture assembly, minor finishing repairs, silicone and seal renewal, and basic plumbing work.'],
      kontakti:['Contact | Anelika SIA','Contact Anelika SIA about indoor cleaning, grounds maintenance and minor repairs.'],
      privacy:['Privacy and cookie policy | Anelika','Information about personal data processing and cookies on the Anelika website.']
    }
  };

  const templates = {
    ru: {
      sakums:['Заявка на услугу',['Здравствуйте!','','Услуга: ','Адрес: ','Желаемое время: ','Описание работ: ']],
      uzkopsana:['Уборка помещений',['Здравствуйте!','','Адрес: ','Желаемое время: ','Тип и площадь помещений: ','Описание работ: ']],
      teritorija:['Уход за территорией',['Здравствуйте!','','Адрес: ','Желаемое время: ','Примерная площадь территории: ','Описание работ: ']],
      remonti:['Мелкий ремонт',['Здравствуйте!','','Адрес: ','Желаемое время: ','Описание работ: ']],
      kontakti:['Заявка на услугу',['Здравствуйте!','','Услуга: ','Адрес: ','Желаемое время: ','Описание работ: ']],
      privacy:['Вопрос о конфиденциальности',['Здравствуйте!','','Мой вопрос: ']]
    },
    en: {
      sakums:['Service request',['Hello,','','Service: ','Address: ','Preferred time: ','Job description: ']],
      uzkopsana:['Indoor cleaning',['Hello,','','Address: ','Preferred time: ','Type and approximate size of premises: ','Job description: ']],
      teritorija:['Grounds maintenance',['Hello,','','Address: ','Preferred time: ','Approximate site size: ','Job description: ']],
      remonti:['Minor repairs',['Hello,','','Address: ','Preferred time: ','Job description: ']],
      kontakti:['Service request',['Hello,','','Service: ','Address: ','Preferred time: ','Job description: ']],
      privacy:['Privacy question',['Hello,','','My question: ']]
    }
  };

  const ensureCss = () => {
    if (document.querySelector('link[data-language-switcher]')) return;
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/language-switcher.css?v=1';
    css.dataset.languageSwitcher = '';
    document.head.appendChild(css);
  };

  const languageUrl = code => {
    const url = new URL(location.href);
    if (code === 'lv') url.searchParams.delete('lang'); else url.searchParams.set('lang', code);
    return `${url.pathname}${url.search}${url.hash}`;
  };

  const injectSwitcher = () => {
    if (document.querySelector('.language-switcher')) return;
    ensureCss();
    const labels = { lv:'Latviešu', ru:'Русский', en:'English' };
    const nav = document.createElement('nav');
    nav.className = 'language-switcher';
    nav.setAttribute('aria-label', lang === 'ru' ? 'Выбор языка' : lang === 'en' ? 'Language selection' : 'Valodas izvēle');
    supported.forEach(code => {
      const link = document.createElement('a');
      link.href = languageUrl(code);
      link.textContent = code.toUpperCase();
      link.title = labels[code];
      link.lang = code;
      if (code === lang) link.setAttribute('aria-current', 'true');
      link.addEventListener('click', () => { try { localStorage.setItem('anelika_language_v1', code); } catch (_) {} });
      nav.appendChild(link);
    });
    const siteNav = document.querySelector('.site-nav');
    if (siteNav) {
      const phone = siteNav.querySelector('.header-phone');
      const toggle = siteNav.querySelector('.menu-toggle');
      let actions = siteNav.querySelector('.header-actions');
      if (!actions) {
        actions = document.createElement('div');
        actions.className = 'header-actions';
        siteNav.appendChild(actions);
        if (phone) actions.appendChild(phone);
        if (toggle) actions.appendChild(toggle);
      }
      actions.insertBefore(nav, actions.firstChild);
    }
  };

  const addLanguageToInternalLinks = () => {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (link.closest('.language-switcher') || !href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) return;
      try {
        const url = new URL(href, location.origin);
        if (lang === 'lv') url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
        link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
      } catch (_) {}
    });
  };

  const translateTextNodes = map => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT','STYLE','CODE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (Object.prototype.hasOwnProperty.call(map, trimmed)) node.nodeValue = raw.replace(trimmed, map[trimmed]);
    });
  };

  const translateAttributes = map => {
    document.querySelectorAll('[aria-label],[title]').forEach(el => {
      ['aria-label','title'].forEach(attr => {
        const value = el.getAttribute(attr);
        if (value && map[value]) el.setAttribute(attr, map[value]);
      });
    });
    const toggle = document.querySelector('.menu-toggle');
    const syncToggle = () => {
      if (!toggle) return;
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-label', lang === 'ru' ? (open ? 'Закрыть меню' : 'Открыть меню') : lang === 'en' ? (open ? 'Close menu' : 'Open menu') : (open ? 'Aizvērt izvēlni' : 'Atvērt izvēlni'));
    };
    syncToggle();
    toggle?.addEventListener('click', () => setTimeout(syncToggle, 0));
  };

  const localizeMailto = () => {
    const pageTemplates = templates[lang];
    if (!pageTemplates) return;
    const [subject, lines] = pageTemplates[pageKey] || pageTemplates.sakums;
    const href = `mailto:anelikasia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    document.querySelectorAll('a[href^="mailto:anelikasia@gmail.com?"]').forEach(link => { link.href = href; });
  };

  const updateMeta = () => {
    const meta = pageMeta[lang]?.[pageKey];
    if (!meta) return;
    document.title = meta[0];
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (description) description.content = meta[1];
    if (ogTitle) ogTitle.content = meta[0];
    if (ogDescription) ogDescription.content = meta[1];
  };

  injectSwitcher();
  addLanguageToInternalLinks();

  if (lang === 'lv') return;
  document.documentElement.lang = lang;
  fetch(`/i18n-${lang}.json?v=1`, { cache:'force-cache' })
    .then(response => {
      if (!response.ok) throw new Error(`Translation file ${response.status}`);
      return response.json();
    })
    .then(map => {
      translateTextNodes(map);
      translateAttributes(map);
      localizeMailto();
      updateMeta();
      addLanguageToInternalLinks();
      document.documentElement.classList.add('i18n-ready');
    })
    .catch(error => console.error('Anelika translation error:', error));

  if (!params.has('lang')) {
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }
})();
