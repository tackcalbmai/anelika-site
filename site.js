(() => {
  let domReadyFired = false;
  document.addEventListener('DOMContentLoaded', () => { domReadyFired = true; }, { once: true });

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = '/v6.css?v=6';
  document.head.appendChild(style);

  const script = document.createElement('script');
  script.src = '/v6.js?v=6';
  script.async = false;
  script.onload = () => {
    if (domReadyFired) document.dispatchEvent(new Event('DOMContentLoaded'));
  };
  document.head.appendChild(script);
})();
