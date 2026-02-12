(function () {
  const DEFAULT_LANG = 'en';
  const stored = localStorage.getItem('lang');
  const browser = (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
  const initial = stored || browser || DEFAULT_LANG;
  const dict = window.I18N || {};

  function applyTranslations(lang) {
    document.documentElement.lang = lang;

    const textNodes = document.querySelectorAll('[data-i18n]');
    textNodes.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = dict?.[lang]?.[key];
      if (value) el.textContent = value;
    });

    const htmlNodes = document.querySelectorAll('[data-i18n-html]');
    htmlNodes.forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const value = dict?.[lang]?.[key];
      if (value) el.innerHTML = value;
    });

    const attrNodes = document.querySelectorAll('[data-i18n-attr]');
    attrNodes.forEach((el) => {
      const pairs = el.getAttribute('data-i18n-attr').split(',');
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(':').map((v) => v.trim());
        const value = dict?.[lang]?.[key];
        if (attr && value) el.setAttribute(attr, value);
      });
    });

    const toggleButtons = document.querySelectorAll('[data-lang-toggle]');
    toggleButtons.forEach((btn) => {
      const label = lang === 'es' ? 'EN' : 'ES';
      btn.textContent = label;
      btn.setAttribute('aria-label', lang === 'es' ? 'Cambiar a ingles' : 'Switch to Spanish');
    });
  }

  function setLang(lang) {
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
  }

  function toggleLang() {
    const current = document.documentElement.lang || DEFAULT_LANG;
    setLang(current === 'es' ? 'en' : 'es');
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-lang-toggle]');
    if (target) {
      event.preventDefault();
      toggleLang();
    }
  });

  applyTranslations(initial);
})();
