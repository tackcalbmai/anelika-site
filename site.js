(() => {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '/premium.css?v=2';
  document.head.appendChild(css);

  const script = document.createElement('script');
  script.src = '/premium.js?v=2';
  script.defer = true;
  document.head.appendChild(script);
})();
