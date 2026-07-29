(() => {
  const supported = ['lv', 'ru', 'en'];
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang');
  try { if (!supported.includes(lang)) lang = localStorage.getItem('anelika_language_v1'); } catch (_) {}
  if (!supported.includes(lang)) lang = 'lv';
  try { localStorage.setItem('anelika_language_v1', lang); } catch (_) {}

  const pageKey = document.body.dataset.page || (
    location.pathname.includes('privatuma-politika') ? 'privacy' :
    location.pathname.includes('paldies') ? 'paldies' :
    'sakums'
  );
  const pageMeta = {
    ru: {
      sakums:['Уборка и хозяйственные работы | Anelika','Уборка помещений, уход за территорией и мелкий ремонт в Елгаве, Риге и по всей Латвии.'],
      uzkopsana:['Уборка помещений по всей Латвии | Anelika','Регулярная, генеральная и послеремонтная уборка домов, квартир, офисов и других объектов.'],
      teritorija:['Уход за территорией по всей Латвии | Anelika','Стрижка травы, уборка листьев и веток, сезонные работы и обслуживание территории.'],
      remonti:['Мелкий ремонт по всей Латвии | Anelika','Сборка мебели, небольшие отделочные исправления, силикон, уплотнения и простые сантехнические работы.'],
      kontakti:['Контакты | Anelika SIA','Свяжитесь с Anelika SIA по вопросам уборки, ухода за территорией и мелкого ремонта.'],
      privacy:['Политика конфиденциальности и cookies | Anelika','Информация об обработке персональных данных и cookies на сайте Anelika.'],
      paldies:['Заявка отправлена | Anelika','Спасибо! Anelika получила вашу заявку на услугу.'],
      notFound:['Страница не найдена | Anelika','Запрошенная страница Anelika не найдена.']
    },
    en: {
      sakums:['Cleaning and property maintenance | Anelika','Indoor cleaning, grounds maintenance and minor repairs in Jelgava, Riga and throughout Latvia.'],
      uzkopsana:['Indoor cleaning throughout Latvia | Anelika','Regular, deep and post-renovation cleaning for houses, apartments, offices and other properties.'],
      teritorija:['Grounds maintenance throughout Latvia | Anelika','Grass cutting, leaf and branch removal, seasonal work and ongoing grounds maintenance.'],
      remonti:['Minor repairs throughout Latvia | Anelika','Furniture assembly, minor finishing repairs, silicone and seal renewal, and basic plumbing work.'],
      kontakti:['Contact | Anelika SIA','Contact Anelika SIA about indoor cleaning, grounds maintenance and minor repairs.'],
      privacy:['Privacy and cookie policy | Anelika','Information about personal data processing and cookies on the Anelika website.'],
      paldies:['Request sent | Anelika','Thank you! Anelika has received your service request.'],
      notFound:['Page not found | Anelika','The requested Anelika page could not be found.']
    }
  };

  const supplementalTranslations = {
    ru: {
      '(ja attiecas)':'(если применимо)',
      '(m²)':'(м²)',
      '(nav obligāti)':'(необязательно)',
      'Aizpildīt formu':'Заполнить форму',
      'Aizpildīšana aizņem aptuveni 2 minūtes.':'Заполнение займёт около 2 минут.',
      'Aprakstiet objektu':'Опишите объект',
      'Aprakstiet remontdarbu':'Опишите ремонтные работы',
      'Aprakstiet teritoriju':'Опишите территорию',
      'Aptuvenais darbu apjoms':'Примерный объём работ',
      'Aptuvenā platība':'Примерная площадь',
      'Aptuvenā teritorijas platība':'Примерная площадь территории',
      'Atbildam darba laikā':'Отвечаем в рабочее время',
      'Atgriezties sākumlapā':'Вернуться на главную',
      'Atjaunināts: 2026. gada 29. jūlijā':'Обновлено: 29 июля 2026 г.',
      'Atvērt sākumlapu':'Открыть главную',
      'Biroja uzkopšana':'Уборка офиса',
      'Cits darbs':'Другая работа',
      'Cits sīks remontdarbs':'Другой мелкий ремонт',
      'Cits teritorijas darbs':'Другие работы по территории',
      'Cits uzkopšanas darbs':'Другая уборка',
      'Dati tiks nosūtīti SIA “Anelika”.':'Данные будут отправлены SIA «Anelika».',
      'Fotoattēls':'Фотография',
      'Iespējams, adrese ir ievadīta nepareizi vai lapa ir pārvietota. Atgriezieties sākumlapā vai sazinieties ar mums.':'Возможно, адрес введён неверно или страница была перемещена. Вернитесь на главную или свяжитесь с нами.',
      'Izvēlieties':'Выберите',
      'Izvēlēties failu':'Выбрать файл',
      'Fails nav izvēlēts':'Файл не выбран',
      'JPG, PNG vai WEBP, līdz 10 MB.':'JPG, PNG или WEBP, до 10 МБ.',
      'Jūsu pieprasījums ir nosūtīts. Sazināsimies darba laikā, lai precizētu apjomu, laiku un cenu.':'Ваша заявка отправлена. Мы свяжемся с вами в рабочее время, чтобы уточнить объём, сроки и стоимость.',
      'Kas jāpaveic un kāds ir objekta stāvoklis':'Что нужно сделать и в каком состоянии объект',
      'Kas jāuzstāda vai jālabo, izmēri un esošais stāvoklis':'Что нужно установить или отремонтировать, размеры и текущее состояние',
      'Kļūda 404':'Ошибка 404',
      'LAPA NAV ATRASTA':'СТРАНИЦА НЕ НАЙДЕНА',
      'Lapa nav atrasta':'Страница не найдена',
      'Logu mazgāšana':'Мытьё окон',
      'Nosūtiet pamatinformāciju. Izvērtēsim darba apjomu un sazināsimies, lai vienotos par nosacījumiem.':'Отправьте основную информацию. Мы оценим объём работ и свяжемся с вами, чтобы согласовать условия.',
      'Nosūtīt pieteikumu':'Отправить заявку',
      'Paldies!':'Спасибо!',
      'Piekrītu, ka mani dati tiek izmantoti, lai atbildētu uz pieprasījumu, saskaņā ar':'Я согласен(-на), чтобы мои данные использовались для ответа на заявку в соответствии с',
      'Piemēram, 1200':'Например, 1200',
      'Piemēram, 2 skapji un 3 plaukti':'Например, 2 шкафа и 3 полки',
      'Piemēram, 85':'Например, 85',
      'Piemēram, 85 m²':'Например, 85 м²',
      'Piemēram, nākamnedēļ':'Например, на следующей неделе',
      'Pieteikums saņemts':'Заявка получена',
      'Pilsēta vai adrese':'Город или адрес',
      'Plauktu, stangu vai stiprinājumu uzstādīšana':'Установка полок, карнизов или креплений',
      'Regulāra teritorijas kopšana':'Регулярный уход за территорией',
      'Remontdarba veids':'Вид ремонтных работ',
      'SIA “Anelika”. Visas tiesības aizsargātas.':'SIA «Anelika». Все права защищены.',
      'Sazinieties pa tālruni vai nosūtiet pieteikumu. Ātrākai izvērtēšanai norādiet pakalpojumu, adresi, vēlamo laiku un pievienojiet fotoattēlus.':'Свяжитесь по телефону или отправьте заявку. Чтобы мы быстрее оценили работу, укажите услугу, адрес, желаемое время и приложите фотографии.',
      'Sazinoties ar mums vai aizpildot vietnes pieteikuma formu, varam apstrādāt jūsu norādīto vārdu, tālruņa numuru, e-pasta adresi, objekta adresi, darba aprakstu, vēlamo izpildes laiku un brīvprātīgi nosūtītos fotoattēlus.':'При обращении к нам или заполнении формы заявки мы можем обрабатывать указанные вами имя, номер телефона, адрес электронной почты, адрес объекта, описание работ, желаемое время выполнения и добровольно отправленные фотографии.',
      'Saņemt cenas piedāvājumu':'Получить расчёт стоимости',
      'Saņemt piedāvājumu':'Получить предложение',
      'Skatīt uzkopšanas darbus':'Посмотреть услуги уборки',
      'Steidzami?':'Срочно?',
      'Sākumlapa':'Главная',
      'Telpu veids, stāvoklis un svarīgākie darbi':'Тип и состояние помещений, основные задачи',
      'Teritorijas kopšanas veids':'Вид работ по территории',
      'Teritorijas stāvoklis, piekļuve un nepieciešamie darbi':'Состояние территории, доступ и необходимые работы',
      'Uzkopšana pēc remonta':'Уборка после ремонта',
      'Uzkopšanas veids':'Вид уборки',
      'Vai ērtāk pārrunāt pa tālruni?':'Удобнее обсудить по телефону?',
      'Vairāki pakalpojumi':'Несколько услуг',
      'Vietnes pieteikuma formas nosūtīšanai tiek izmantots FormSubmit (Devro LABS) pakalpojums, kas pārsūta iesniegto informāciju uz Anelika e-pastu. FormSubmit norāda, ka iesniegumi tiek glabāti līdz 30 dienām; augšupielādētie faili netiek saglabāti iesniegumu arhīvā.':'Для отправки заявок с сайта используется сервис FormSubmit (Devro LABS), который пересылает предоставленную информацию на электронную почту Anelika. По информации FormSubmit, заявки хранятся до 30 дней; загруженные файлы не сохраняются в архиве заявок.',
      'Vārds':'Имя',
      'Vēlamais datums vai periods':'Желаемая дата или период',
      'Zvaniet darba laikā. Ja nepieciešams aprēķins pēc objekta informācijas, izmantojiet pieteikuma formu.':'Позвоните в рабочее время. Если нужен расчёт по информации об объекте, используйте форму заявки.',
      'Zvaniet darba laikā. Ja nepieciešams aprēķins pēc remontdarba informācijas, izmantojiet pieteikuma formu.':'Позвоните в рабочее время. Если нужен расчёт по описанию ремонта, используйте форму заявки.',
      'Zvaniet darba laikā. Ja nepieciešams aprēķins pēc teritorijas informācijas, izmantojiet pieteikuma formu.':'Позвоните в рабочее время. Если нужен расчёт по информации о территории, используйте форму заявки.',
      'Zvaniet uz':'Позвоните по номеру',
      'Zvanīt uz tālruni +371 29752319':'Позвонить по номеру +371 29752319',
      'privātuma politiku':'политикой конфиденциальности',
      'Īss darba apraksts':'Краткое описание работ'
    },
    en: {
      '(ja attiecas)':'(if applicable)',
      '(m²)':'(m²)',
      '(nav obligāti)':'(optional)',
      'Aizpildīt formu':'Fill in the form',
      'Aizpildīšana aizņem aptuveni 2 minūtes.':'It takes about 2 minutes to complete.',
      'Aprakstiet objektu':'Describe the property',
      'Aprakstiet remontdarbu':'Describe the repair',
      'Aprakstiet teritoriju':'Describe the grounds',
      'Aptuvenais darbu apjoms':'Approximate scope of work',
      'Aptuvenā platība':'Approximate area',
      'Aptuvenā teritorijas platība':'Approximate grounds area',
      'Atbildam darba laikā':'We reply during business hours',
      'Atgriezties sākumlapā':'Back to home',
      'Atjaunināts: 2026. gada 29. jūlijā':'Updated: 29 July 2026',
      'Atvērt sākumlapu':'Go to home page',
      'Biroja uzkopšana':'Office cleaning',
      'Cits darbs':'Other work',
      'Cits sīks remontdarbs':'Other minor repair',
      'Cits teritorijas darbs':'Other grounds work',
      'Cits uzkopšanas darbs':'Other cleaning service',
      'Dati tiks nosūtīti SIA “Anelika”.':'The data will be sent to SIA “Anelika”.',
      'Fotoattēls':'Photo',
      'Iespējams, adrese ir ievadīta nepareizi vai lapa ir pārvietota. Atgriezieties sākumlapā vai sazinieties ar mums.':'The address may be incorrect or the page may have moved. Return to the home page or contact us.',
      'Izvēlieties':'Select',
      'Izvēlēties failu':'Choose file',
      'Fails nav izvēlēts':'No file selected',
      'JPG, PNG vai WEBP, līdz 10 MB.':'JPG, PNG or WEBP, up to 10 MB.',
      'Jūsu pieprasījums ir nosūtīts. Sazināsimies darba laikā, lai precizētu apjomu, laiku un cenu.':'Your request has been sent. We will contact you during business hours to confirm the scope, timing and price.',
      'Kas jāpaveic un kāds ir objekta stāvoklis':'What needs to be done and the condition of the property',
      'Kas jāuzstāda vai jālabo, izmēri un esošais stāvoklis':'What needs to be installed or repaired, dimensions and current condition',
      'Kļūda 404':'Error 404',
      'LAPA NAV ATRASTA':'PAGE NOT FOUND',
      'Lapa nav atrasta':'Page not found',
      'Logu mazgāšana':'Window cleaning',
      'Nosūtiet pamatinformāciju. Izvērtēsim darba apjomu un sazināsimies, lai vienotos par nosacījumiem.':'Send the basic details. We will assess the scope and contact you to agree on the terms.',
      'Nosūtīt pieteikumu':'Send a request',
      'Paldies!':'Thank you!',
      'Piekrītu, ka mani dati tiek izmantoti, lai atbildētu uz pieprasījumu, saskaņā ar':'I agree that my data may be used to respond to my request in accordance with the',
      'Piemēram, 1200':'For example, 1200',
      'Piemēram, 2 skapji un 3 plaukti':'For example, 2 cabinets and 3 shelves',
      'Piemēram, 85':'For example, 85',
      'Piemēram, 85 m²':'For example, 85 m²',
      'Piemēram, nākamnedēļ':'For example, next week',
      'Pieteikums saņemts':'Request received',
      'Pilsēta vai adrese':'City or address',
      'Plauktu, stangu vai stiprinājumu uzstādīšana':'Installation of shelves, rails or fixtures',
      'Regulāra teritorijas kopšana':'Regular grounds maintenance',
      'Remontdarba veids':'Type of repair',
      'SIA “Anelika”. Visas tiesības aizsargātas.':'SIA “Anelika”. All rights reserved.',
      'Sazinieties pa tālruni vai nosūtiet pieteikumu. Ātrākai izvērtēšanai norādiet pakalpojumu, adresi, vēlamo laiku un pievienojiet fotoattēlus.':'Call us or send a request. For a faster assessment, include the service, address, preferred time and photos.',
      'Sazinoties ar mums vai aizpildot vietnes pieteikuma formu, varam apstrādāt jūsu norādīto vārdu, tālruņa numuru, e-pasta adresi, objekta adresi, darba aprakstu, vēlamo izpildes laiku un brīvprātīgi nosūtītos fotoattēlus.':'When you contact us or complete the website request form, we may process the name, telephone number, email address, property address, job description, preferred completion time and any photos you choose to provide.',
      'Saņemt cenas piedāvājumu':'Request a price quote',
      'Saņemt piedāvājumu':'Request a quote',
      'Skatīt uzkopšanas darbus':'View cleaning services',
      'Steidzami?':'Urgent?',
      'Sākumlapa':'Home',
      'Telpu veids, stāvoklis un svarīgākie darbi':'Type and condition of the premises, and the main tasks',
      'Teritorijas kopšanas veids':'Type of grounds maintenance',
      'Teritorijas stāvoklis, piekļuve un nepieciešamie darbi':'Condition of the grounds, access and required work',
      'Uzkopšana pēc remonta':'Post-renovation cleaning',
      'Uzkopšanas veids':'Type of cleaning',
      'Vai ērtāk pārrunāt pa tālruni?':'Prefer to discuss it by phone?',
      'Vairāki pakalpojumi':'Multiple services',
      'Vietnes pieteikuma formas nosūtīšanai tiek izmantots FormSubmit (Devro LABS) pakalpojums, kas pārsūta iesniegto informāciju uz Anelika e-pastu. FormSubmit norāda, ka iesniegumi tiek glabāti līdz 30 dienām; augšupielādētie faili netiek saglabāti iesniegumu arhīvā.':'The website uses FormSubmit (Devro LABS) to send request forms to Anelika by email. FormSubmit states that submissions are stored for up to 30 days; uploaded files are not retained in the submission archive.',
      'Vārds':'Name',
      'Vēlamais datums vai periods':'Preferred date or period',
      'Zvaniet darba laikā. Ja nepieciešams aprēķins pēc objekta informācijas, izmantojiet pieteikuma formu.':'Call during business hours. If you need a quote based on the property details, use the request form.',
      'Zvaniet darba laikā. Ja nepieciešams aprēķins pēc remontdarba informācijas, izmantojiet pieteikuma formu.':'Call during business hours. If you need a quote based on the repair details, use the request form.',
      'Zvaniet darba laikā. Ja nepieciešams aprēķins pēc teritorijas informācijas, izmantojiet pieteikuma formu.':'Call during business hours. If you need a quote based on the grounds details, use the request form.',
      'Zvaniet uz':'Call',
      'Zvanīt uz tālruni +371 29752319':'Call +371 29752319',
      'privātuma politiku':'privacy policy',
      'Īss darba apraksts':'Brief job description'
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
    document.querySelectorAll('[aria-label],[title],[placeholder]').forEach(el => {
      ['aria-label','title','placeholder'].forEach(attr => {
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

  const localizeLeadForm = map => {
    const form = document.querySelector('[data-lead-form]');
    if (!form) return;

    const subjects = {
      ru: {
        uzkopsana:'Новая заявка на уборку с anelika.lv',
        teritorija:'Новая заявка на уход за территорией с anelika.lv',
        remonti:'Новая заявка на мелкий ремонт с anelika.lv',
        kontakti:'Новая заявка с anelika.lv'
      },
      en: {
        uzkopsana:'New cleaning request from anelika.lv',
        teritorija:'New grounds maintenance request from anelika.lv',
        remonti:'New minor repair request from anelika.lv',
        kontakti:'New service request from anelika.lv'
      }
    };

    const subject = form.querySelector('input[name="_subject"]');
    if (subject) subject.value = subjects[lang]?.[pageKey] || subjects[lang]?.kontakti || subject.value;

    const next = form.querySelector('input[name="_next"]');
    if (next) next.value = `https://www.anelika.lv/paldies/?lang=${lang}`;

    const sourceUrl = form.querySelector('input[name="_url"]');
    if (sourceUrl) sourceUrl.value = `https://www.anelika.lv${languageUrl(lang)}`;

    let languageField = form.querySelector('input[data-form-language]');
    if (!languageField) {
      languageField = document.createElement('input');
      languageField.type = 'hidden';
      languageField.name = 'Pieteikuma valoda';
      languageField.dataset.formLanguage = '';
      form.prepend(languageField);
    }
    languageField.value = lang === 'ru' ? 'Русский' : 'English';

    form.querySelectorAll('option[value]').forEach(option => {
      if (map[option.value]) option.value = map[option.value];
    });
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
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (description) description.content = meta[1];
    if (ogTitle) ogTitle.content = meta[0];
    if (ogDescription) ogDescription.content = meta[1];
    if (ogLocale) ogLocale.content = lang === 'ru' ? 'ru_RU' : 'en_GB';

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const localized = new URL(canonical.href);
      localized.searchParams.set('lang', lang);
      canonical.href = localized.href;
      if (ogUrl) ogUrl.content = localized.href;

      const base = new URL(canonical.href);
      base.searchParams.delete('lang');
      [
        ['lv', base.href],
        ['ru', `${base.href}?lang=ru`],
        ['en', `${base.href}?lang=en`],
        ['x-default', base.href]
      ].forEach(([code, href]) => {
        let alternate = document.querySelector(`link[rel="alternate"][hreflang="${code}"]`);
        if (!alternate) {
          alternate = document.createElement('link');
          alternate.rel = 'alternate';
          alternate.hreflang = code;
          document.head.appendChild(alternate);
        }
        alternate.href = href;
      });
    }
  };

  injectSwitcher();
  addLanguageToInternalLinks();

  if (lang === 'lv') return;
  document.documentElement.lang = lang;
  fetch(`/i18n-${lang}.json?v=2`, { cache:'force-cache' })
    .then(response => {
      if (!response.ok) throw new Error(`Translation file ${response.status}`);
      return response.json();
    })
    .then(baseMap => {
      const map = { ...baseMap, ...supplementalTranslations[lang] };
      translateTextNodes(map);
      translateAttributes(map);
      localizeLeadForm(map);
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
