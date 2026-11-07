/*
  LOCAL PREVIEW MEDIA SWITCH
  When the site is opened from your computer (file:// or localhost),
  Backblaze video/GIF links are swapped for the copies in /localmedia,
  so previewing never uses Backblaze bandwidth.
  On the live site (GitHub Pages) this does nothing.
  If a local copy is missing, it falls back to the Backblaze link.
*/
(function () {
  var h = location.hostname;
  var isLocal = location.protocol === 'file:' || h === 'localhost' || h === '127.0.0.1' || h === '';
  if (!isLocal) return;

  var REMOTE = 'https://f004.backblazeb2.com/file/Kattelyn-Portfolio-Files/';
  var here = document.currentScript && document.currentScript.src;
  var LOCAL = here ? here.replace(/localmedia\.js.*$/, 'localmedia/') : 'localmedia/';

  function swap(el) {
    var src = el.getAttribute && el.getAttribute('src');
    if (!src || src.indexOf(REMOTE) !== 0) return;
    if (el.getAttribute('data-remote-fallback') === src) return; /* local copy failed; keep Backblaze */
    var remote = src;
    el.setAttribute('src', LOCAL + src.slice(REMOTE.length));
    el.addEventListener('error', function onErr() {
      el.removeEventListener('error', onErr);
      el.setAttribute('data-remote-fallback', remote);
      el.setAttribute('src', remote);
    });
    if (el.tagName === 'SOURCE' && el.parentNode && el.parentNode.load) el.parentNode.load();
  }

  function scan(node) {
    if (node.nodeType !== 1) return;
    swap(node);
    if (node.querySelectorAll) node.querySelectorAll('[src]').forEach(swap);
  }

  new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      if (m.type === 'attributes') swap(m.target);
      else m.addedNodes.forEach(scan);
    });
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });

  if (document.body) scan(document.body);
})();
