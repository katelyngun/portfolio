/* Touch screens have no hover: gleam the card sitting in the middle of the screen,
   and gleam the name pill once when the page opens. */
(function () {
  if (!matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var cards = document.querySelectorAll('.project-card, .video-card, .section-card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('gleam-on', e.isIntersecting); });
    }, { rootMargin: '-40% 0px -40% 0px' });
    cards.forEach(function (c) { io.observe(c); });
  }
  var logo = document.querySelector('.nav-logo');
  if (logo) { logo.classList.add('gleam-on'); setTimeout(function () { logo.classList.remove('gleam-on'); }, 2600); }
})();
