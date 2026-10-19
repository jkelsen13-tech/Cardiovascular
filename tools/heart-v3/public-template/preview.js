/* Heart-only wrapper: no legacy app navigation or storage migration. */
(function () {
  'use strict';
  window.goHome = function () {
    window.HeartV3Study?.close();
    document.getElementById('heartV3Study')?.classList.add('hidden');
    document.getElementById('homeMenu').classList.remove('hidden');
    document.body.classList.remove('h3-active');
    window.scrollTo(0, 0);
  };
}());
