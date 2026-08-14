// Theme toggle. The initial value is set by an inline script in <head> before
// first paint; this only handles user-initiated changes and keeps the button
// label, aria-pressed state and stored preference in sync.
(function () {
  var KEY = 'tomrau-theme';
  var root = document.documentElement;
  var button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  var label = button.querySelector('[data-theme-label]');

  function render() {
    var theme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    if (label) label.textContent = theme;
    // Pressed means "light is active" — the toggle's off-state is the dark default.
    button.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }

  button.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(KEY, next);
    } catch (e) { /* private mode — the choice just will not persist */ }
    render();
  });

  // Follow the OS while the visitor has not made an explicit choice.
  if (window.matchMedia) {
    var media = window.matchMedia('(prefers-color-scheme: light)');
    var onChange = function (event) {
      var stored;
      try {
        stored = localStorage.getItem(KEY);
      } catch (e) { /* ignore */ }
      if (stored === 'light' || stored === 'dark') return;
      root.setAttribute('data-theme', event.matches ? 'light' : 'dark');
      render();
    };
    if (media.addEventListener) media.addEventListener('change', onChange);
    else if (media.addListener) media.addListener(onChange);
  }

  render();
})();
