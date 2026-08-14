// Client-side tag filtering for /posts. The full list is rendered server-side,
// so this is purely a narrowing of what is already on the page — with no JS the
// list simply shows everything and the chips are hidden.
(function () {
  var root = document.querySelector('[data-post-filter]');
  if (!root) return;

  var chips = Array.prototype.slice.call(root.querySelectorAll('[data-filter-tag]'));
  var list = document.querySelector('[data-post-list]');
  if (!chips.length || !list) return;

  root.hidden = false;

  var rows = Array.prototype.slice.call(list.querySelectorAll('[data-tags]'));
  var empty = document.querySelector('[data-post-empty]');

  function apply(tag) {
    var anyVisible = false;

    rows.forEach(function (row) {
      var tags = (row.getAttribute('data-tags') || '').split('|');
      var show = tag === 'all' || tags.indexOf(tag) !== -1;
      row.hidden = !show;
      if (show) anyVisible = true;
    });

    if (empty) empty.hidden = anyVisible;

    chips.forEach(function (chip) {
      var active = chip.getAttribute('data-filter-tag') === tag;
      chip.setAttribute('aria-pressed', active ? 'true' : 'false');
      chip.classList.toggle('is-active', active);
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      apply(chip.getAttribute('data-filter-tag'));
    });
  });

  apply('all');
})();
