// Pepi (Pip en inglés) en el sitio: el mismo de la app, empaquetado en pepi-web.js (se regenera desde la app con scripts/pepi-web del repo
// tu-noty-app). Aquí solo se lo coloca: héroe (con gestos de manitos), pastilla e Inicio de la maqueta de la compu, el que se puede
// probar, el cierre y el pie. Las pestañas de «Un vistazo» las maneja el script de la página (armar-sitio.mjs).
(function () {
  if (!window.PepiTeire) return;
  var P = window.PepiTeire;
  var crear = P.crearPepi, color = P.colorPepi;
  var nombre = /^en/i.test(document.documentElement.lang || '') ? 'Pip' : 'Pepi';
  function $(s) { return document.querySelector(s); }
  function slot(clase) { var s = document.createElement('span'); s.className = 'pw ' + clase; return s; }
  // Pepi suena (su voz «Gotita», la misma de la app) solo por lo que hacés vos: pegarle, marearlo, dejarle el mouse encima. Lo que hace solo
  // (los saludos y gestos) sigue en silencio, y el navegador no deja sonar nada hasta que tocás la página.
  // Al hacer clic (doble o triple, que es lo que pasa cuando le pegás) no se selecciona el texto de alrededor.
  function sinSeleccion(host) { host.addEventListener('mousedown', function (e) { e.preventDefault(); }); host.style.userSelect = 'none'; host.style.webkitUserSelect = 'none'; }
  function chico(host) { host.classList.add('pw'); return crear(host, { chico: true, estatico: true }); }
  var reducir = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Héroe: los ojos siguen al mouse, parpadea, se queja si le pegás (tres golpes seguidos y se marea) y se enamora si lo dejás con el
  // mouse encima. Cada tanto hace un gesto con las manitos, como en la app.
  var hero = $('#pepiHero');
  if (hero) {
    hero.classList.add('pw');
    sinSeleccion(hero);
    var ph = crear(hero, { sonidos: true, etiqueta: nombre, alCambiar: function (c) { hero.style.setProperty('--pc', color(c)); } });
    if (!reducir) {
      var gestos = ['hola', 'festejar', 'aplaudir', 'tada', 'pensar', 'hola'], gi = 0, encima = false;
      hero.addEventListener('pointerenter', function () { encima = true; });
      hero.addEventListener('pointerleave', function () { encima = false; });
      setTimeout(function () { ph.gesto('hola', 2600, false); }, 900);
      setInterval(function () { if (!encima && !document.hidden) ph.gesto(gestos[gi++ % gestos.length], 2400, false); }, 6500);
    }
  }

  // Dentro de la maqueta de la compu
  var tit = $('.ventana .tit svg');
  if (tit) { var s1 = slot('pm'); tit.replaceWith(s1); chico(s1); }
  var cu = $('div.cuerpo');
  if (cu) { var d = document.createElement('div'); d.className = 'pepi-inicio pw'; cu.appendChild(d); crear(d, {}).fijar('contento'); }

  // «Conocé a Pepi»: uno para jugar (sin mostrarle todas las caras: que las descubran)
  var juego = $('#pepiEscena');
  if (juego) {
    juego.classList.add('pw');
    sinSeleccion(juego);
    var pe = crear(juego, { sonidos: true, etiqueta: nombre, alCambiar: function (c) { var j = $('.pepi-juego'); if (j) j.style.setProperty('--pc', color(c)); } });
    if ('IntersectionObserver' in window && !reducir) {
      new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { pe.gesto('hola', 2600, false); o.disconnect(); } }, { threshold: 0.6 }).observe(juego);
    }
  }

  // Cierre: saluda al llegar
  var ci = $('#pepiCierre');
  if (ci) {
    ci.classList.add('pw');
    sinSeleccion(ci);
    var pc = crear(ci, { sonidos: true }); pc.fijar('contento');
    if ('IntersectionObserver' in window && !reducir) {
      new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { pc.gesto('hola', 2600, false); o.disconnect(); } }, { threshold: 0.6 }).observe(ci);
    }
  }

  // Pie
  var logo = document.querySelector('footer .logo');
  if (logo) { var sp = slot('pepi-pie'); logo.after(sp); chico(sp); }

  // El video de la isla: solo corre mientras se ve (y no corre con «reducir movimiento»)
  var v = $('#islaVideo');
  if (v) {
    if (reducir) { v.removeAttribute('autoplay'); v.pause(); }
    else if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        if (v.hidden) return;
        if (e[0].isIntersecting) v.play().catch(function () {}); else v.pause();
      }, { threshold: 0.2 }).observe(v);
    }
  }
})();
