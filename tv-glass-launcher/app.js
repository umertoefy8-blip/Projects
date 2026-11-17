/* Glass Home — tiny launcher for Samsung Tizen TVs (ES5 only: 2016 engines are old). */
(function () {
  'use strict';
  var COLS = 6;
  var KEY = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, ENTER: 13, BACK: 10009 };
  var COLORS = ['#3a6bff', '#b03aff', '#00b3b8', '#ff5a7a', '#ffa23a', '#2bd46b'];
  var hasTizen = typeof window.tizen !== 'undefined';
  var apps = [], tiles = [], focus = 0;

  function $(id) { return document.getElementById(id); }

  // ---- Clock (updates once a minute, not every frame) ----
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var d = new Date();
    $('clock').textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
    $('date').textContent = d.toDateString();
    setTimeout(tick, (60 - d.getSeconds()) * 1000);
  }

  var toastT;
  function toast(msg) {
    var t = $('toast'); t.textContent = msg; t.className = 'glass toast show';
    clearTimeout(toastT); toastT = setTimeout(function () { t.className = 'glass toast'; }, 2500);
  }

  // ---- App list: read what's actually installed, so no hard-coded IDs to go stale ----
  function loadApps(done) {
    if (!hasTizen) { // browser preview
      done(['YouTube', 'Netflix', 'Prime Video', 'Disney+', 'Spotify', 'Plex', 'Internet', 'Gallery', 'Settings', 'Source', 'Apple TV', 'Twitch']
        .map(function (n, i) { return { id: 'demo' + i, name: n }; }));
      return;
    }
    tizen.application.getAppsInfo(function (list) {
      done(list.filter(function (a) { return a.show && a.id.indexOf('GlssLnchr') !== 0; })
        .map(function (a) { return { id: a.id, name: a.name, icon: a.iconPath }; })
        .sort(function (a, b) { return a.name.localeCompare(b.name); }));
    }, function (e) { toast('Could not list apps: ' + e.message); done([]); });
  }

  function render() {
    var grid = $('grid'), html = '';
    apps.forEach(function (a, i) {
      var ic = a.icon
        ? '<div class="ic" style="background-image:url(\'' + a.icon + '\')"></div>'
        : '<div class="ic" style="background:' + COLORS[i % COLORS.length] + '">' + a.name.charAt(0) + '</div>';
      html += '<div class="glass tile">' + ic + '<div class="nm">' + a.name.replace(/</g, '&lt;') + '</div></div>';
    });
    grid.innerHTML = html;
    tiles = grid.children;
    setFocus(0);
  }

  function setFocus(i) {
    if (!tiles.length) return;
    i = Math.max(0, Math.min(tiles.length - 1, i));
    tiles[focus].className = 'glass tile';
    focus = i;
    tiles[focus].className = 'glass tile focus';
    // keep focused row on screen: scroll grid by rows
    var row = Math.floor(focus / COLS);
    $('grid').style.marginTop = (row > 2 ? -(row - 2) * 248 : 0) + 'px';
  }

  function launch(a) {
    if (!hasTizen) { toast('Would launch ' + a.name); return; }
    tizen.application.launch(a.id, null, function (e) { toast('Launch failed: ' + e.message); });
  }

  document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case KEY.LEFT: setFocus(focus - 1); break;
      case KEY.RIGHT: setFocus(focus + 1); break;
      case KEY.UP: setFocus(focus - COLS); break;
      case KEY.DOWN: setFocus(focus + COLS); break;
      case KEY.ENTER: if (apps[focus]) launch(apps[focus]); break;
      case KEY.BACK: if (hasTizen) tizen.application.getCurrentApplication().hide(); break;
      default: return;
    }
    e.preventDefault();
  });

  tick();
  loadApps(function (list) { apps = list; render(); });
})();
