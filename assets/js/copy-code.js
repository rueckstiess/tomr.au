// Wires up the "copy" button rendered into each code block's header strip.
(function () {
  var buttons = document.querySelectorAll('[data-copy-code]');
  if (!buttons.length || !navigator.clipboard) return;

  Array.prototype.forEach.call(buttons, function (button) {
    button.hidden = false;

    button.addEventListener('click', function () {
      var block = button.closest('.code-block');
      var code = block && block.querySelector('pre');
      if (!code) return;

      navigator.clipboard.writeText(code.innerText).then(
        function () {
          button.textContent = 'copied';
          window.setTimeout(function () {
            button.textContent = 'copy';
          }, 1600);
        },
        function () {
          button.textContent = 'failed';
          window.setTimeout(function () {
            button.textContent = 'copy';
          }, 1600);
        }
      );
    });
  });
})();
