document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const ambient = document.createElement('div');
  ambient.className = 'ambient';
  const count = window.matchMedia('(max-width: 680px)').matches ? 7 : 12;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('span');
    b.className = 'bubble';
    const size = 36 + Math.random() * 190;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${Math.random() * 96}%`;
    b.style.top = `${8 + Math.random() * 88}%`;
    b.style.setProperty('--duration', `${22 + Math.random() * 22}s`);
    b.style.setProperty('--delay', `${-Math.random() * 28}s`);
    b.style.setProperty('--drift', `${-45 + Math.random() * 90}px`);
    b.style.setProperty('--opacity', `${0.16 + Math.random() * 0.24}`);
    b.style.setProperty('--blur', `${Math.random() > .68 ? 1.5 : 0}px`);
    ambient.appendChild(b);
  }
  body.prepend(ambient);

  const current = body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === current) link.classList.add('active');
  });

  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const revealItems = document.querySelectorAll('.section, .page-hero');
  revealItems.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});
  revealItems.forEach(el => observer.observe(el));

  const data = {
    uzkopsana: {
      title: 'Telpu uzkopšana',
      text: 'Vienreizēja vai regulāra uzkopšana mājām, dzīvokļiem, birojiem un citām telpām.',
      items: ['Ikdienas un ģenerālā uzkopšana','Virtuves un sanitāro telpu tīrīšana','Logu un virsmu tīrīšana','Uzkopšana pēc remonta vai izvākšanās'],
      href: '/uzkopsana/'
    },
    teritorija: {
      title: 'Teritoriju kopšana',
      text: 'Sezonāli un regulāri darbi pagalmos, uzņēmumu teritorijās un citos āra objektos.',
      items: ['Zāles pļaušana un malas','Lapu, zaru un teritorijas sakopšana','Nelielu krūmu un aizauguma novākšana','Sniega darbi pēc vienošanās'],
      href: '/teritoriju-kopsana/'
    },
    remonti: {
      title: 'Sīki remontdarbi',
      text: 'Nelieli montāžas, apdares un vienkārši santehnikas darbi vienā pakalpojumu grupā.',
      items: ['Mēbeļu un plauktu montāža','Silikona šuvju un blīvējumu atjaunošana','Nelieli apdares labojumi','Sifoni, maisītāji un citi vienkārši santehnikas darbi'],
      href: '/siki-remontdarbi/'
    }
  };
  const tabs = document.querySelectorAll('.console-tab');
  const panel = document.querySelector('.console-panel');
  if (tabs.length && panel) {
    const render = key => {
      const item = data[key];
      if (!item) return;
      panel.classList.remove('fade');
      void panel.offsetWidth;
      panel.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p><ul>${item.items.map(v=>`<li>${v}</li>`).join('')}</ul><a class="console-link" href="${item.href}">Skatīt pakalpojumu →</a>`;
      panel.classList.add('fade');
      tabs.forEach(t => t.classList.toggle('active', t.dataset.service === key));
    };
    tabs.forEach(tab => tab.addEventListener('click', () => render(tab.dataset.service)));
    render('uzkopsana');
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
