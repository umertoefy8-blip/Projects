/* Generic glyph icons, used only when the TV doesn't give an app's own icon (and in browser preview).
   On the TV, real app icons come from tizen.application.getAppsInfo().iconPath. */
var GLYPHS = (function () {
  function svg(bg, body) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><defs>' +
      '<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
      '<rect width="96" height="96" rx="24" fill="' + bg + '"/>' + body +
      '<rect width="96" height="96" rx="24" fill="url(#g)"/></svg>');
  }
  var W = 'fill="#fff"', S = st(6);
  function st(w, c) { return 'fill="none" stroke="' + (c || '#fff') + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"'; }
  var play = '<path d="M38 30 L68 48 L38 66 Z" ' + W + '/>';
  return {
    youtube: svg('#ff2a2a', '<rect x="20" y="28" width="56" height="40" rx="12" ' + W + '/><path d="M42 38 L58 48 L42 58 Z" fill="#ff2a2a"/>'),
    netflix: svg('#141414', '<path d="M32 22 h10 l12 30 V22 h10 v52 h-10 L42 44 v30 H32 Z" fill="#e50914"/>'),
    prime: svg('#1a98ff', play + '<path d="M24 74 q24 10 48 0" ' + S + '/>'),
    disney: svg('#0b1a5c', '<path d="M48 30 v36 M30 48 h36" ' + st(9) + '/>'),
    spotify: svg('#1ed760', '<path d="M26 38 q22 -8 44 2 M30 50 q18 -6 36 2 M34 61 q14 -4 28 2" ' + st(6, '#0b0b0b') + '/>'),
    plex: svg('#1f1f1f', '<path d="M40 28 L56 48 L40 68" fill="none" stroke="#f9b81c" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>'),
    internet: svg('#2f6bff', '<circle cx="48" cy="48" r="24" ' + S + '/><path d="M24 48 h48 M48 24 q-14 24 0 48 q14 -24 0 -48" ' + st(4) + '/>'),
    gallery: svg('#ff7a3a', '<rect x="22" y="26" width="52" height="44" rx="8" ' + S + '/><path d="M26 64 L42 48 L54 58 L62 50 L72 60" ' + st(5) + '/><circle cx="60" cy="38" r="5" ' + W + '/>'),
    settings: svg('#5b6475', '<circle cx="48" cy="48" r="10" ' + S + '/><path d="M48 22v8M48 66v8M22 48h8M66 48h8M30 30l6 6M60 60l6 6M30 66l6-6M60 36l6-6" ' + S + '/>'),
    source: svg('#00a6a6', '<rect x="22" y="28" width="52" height="34" rx="6" ' + S + '/><path d="M38 72 h20 M48 36 v18 M40 46 l8 8 l8 -8" ' + st(5) + '/>'),
    appletv: svg('#111', '<text x="48" y="60" font-family="Arial" font-size="34" font-weight="700" text-anchor="middle" fill="#fff">tv</text>'),
    twitch: svg('#9146ff', '<path d="M28 24 h44 v32 l-12 12 h-10 l-8 8 v-8 h-14 Z" ' + W + '/><path d="M46 36 v12 M58 36 v12" stroke="#9146ff" stroke-width="5" stroke-linecap="round"/>'),
    match: function (name) {
      var n = name.toLowerCase().replace(/[^a-z]/g, '');
      if (n.indexOf('youtube') >= 0) return this.youtube;
      if (n.indexOf('netflix') >= 0) return this.netflix;
      if (n.indexOf('prime') >= 0) return this.prime;
      if (n.indexOf('disney') >= 0) return this.disney;
      if (n.indexOf('spotify') >= 0) return this.spotify;
      if (n.indexOf('plex') >= 0) return this.plex;
      if (n.indexOf('internet') >= 0 || n.indexOf('browser') >= 0) return this.internet;
      if (n.indexOf('gallery') >= 0 || n.indexOf('photo') >= 0) return this.gallery;
      if (n.indexOf('setting') >= 0) return this.settings;
      if (n.indexOf('source') >= 0) return this.source;
      if (n.indexOf('appletv') >= 0) return this.appletv;
      if (n.indexOf('twitch') >= 0) return this.twitch;
      return null;
    }
  };
})();
