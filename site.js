(() => {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '/premium.css?v=3';
  document.head.appendChild(css);

  const layering = document.createElement('style');
  layering.textContent = '.wrap{position:relative;z-index:5}';
  document.head.appendChild(layering);

  const script = document.createElement('script');
  script.src = '/premium.js?v=3';
  script.defer = true;
  document.head.appendChild(script);
})();
