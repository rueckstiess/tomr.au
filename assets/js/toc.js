// Highlights the table-of-contents entry for the section currently in view.
(function () {
  var toc = document.querySelector('[data-toc]');
  if (!toc || !('IntersectionObserver' in window)) return;

  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;

  var byId = {};
  var headings = [];

  links.forEach(function (link) {
    var id = decodeURIComponent(link.getAttribute('href').slice(1));
    var heading = document.getElementById(id);
    if (!heading) return;
    byId[id] = link;
    headings.push(heading);
  });

  if (!headings.length) return;

  var current = null;

  function activate(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (link) {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');
    });
    var link = byId[id];
    if (link) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'true');
    }
  }

  // Track which headings are above the reading line, then treat the last one
  // as current. This behaves correctly for short sections that never occupy
  // the viewport on their own and when scrolling back upwards.
  var visible = {};

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });

      var active = null;
      for (var i = 0; i < headings.length; i++) {
        if (visible[headings[i].id]) {
          active = headings[i].id;
          break;
        }
      }

      if (!active) {
        // Nothing in the band — fall back to the last heading scrolled past.
        for (var j = 0; j < headings.length; j++) {
          if (headings[j].getBoundingClientRect().top <= 100) active = headings[j].id;
        }
      }

      if (active) activate(active);
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
  );

  headings.forEach(function (heading) {
    observer.observe(heading);
  });

  activate(headings[0].id);
})();
