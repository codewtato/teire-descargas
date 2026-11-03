// Lo que comparten las páginas: el botón de descarga que reconoce tu sistema, los links directos
// a cada instalador de la última versión (los pide a GitHub), las hojitas que salen al tocar
// Descargar, el scroll suave (Lenis), las preguntas que se abren con animación y la barra.
(() => {
  const REPO = "https://github.com/codewtato/teire-descargas/releases";
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Sistema del visitante ---
  const ua = navigator.userAgent;
  const so = /android/i.test(ua) ? "android"
    : /windows/i.test(ua) ? "windows"
    : /linux|x11|cros/i.test(ua) ? "linux"
    : "otro";
  const NOMBRES = { windows: "Windows", android: "Android", linux: "Linux" };
  const DIRECTO = { android: REPO + "/latest/download/Teire.apk" };
  document.documentElement.dataset.so = so;

  document.querySelectorAll("[data-descargar]").forEach((boton) => {
    const texto = boton.querySelector("[data-texto]") || boton;
    if (NOMBRES[so]) texto.textContent = `Descargar para ${NOMBRES[so]}`;
    boton.href = DIRECTO[so] || REPO + "/latest";
  });
  document.querySelectorAll("[data-so-nota]").forEach((nota) => {
    nota.textContent = so === "otro"
      ? "Teire está para Windows, Linux y Android. En iPhone y Mac todavía no."
      : "Gratis. Se actualiza sola.";
  });
  // Pestañas de sistema: arranca elegida la tuya.
  window.teireSistema = so === "otro" ? "windows" : so;

  // --- Última versión: en el sitio real el botón baja directo el archivo ---
  fetch("https://api.github.com/repos/codewtato/teire-descargas/releases/latest")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((v) => {
      const archivos = v.assets || [];
      const clave = { windows: "setup.exe", linux: ".appimage", android: ".apk" }[so];
      const buscar = (fin) => archivos.find((a) => a.name.toLowerCase().endsWith(fin));
      const archivo = clave && buscar(clave);
      if (archivo) document.querySelectorAll("[data-descargar]").forEach((b) => (b.href = archivo.browser_download_url));
      document.querySelectorAll("[data-buscar]").forEach((a) => {
        const encontrado = buscar(a.dataset.buscar.toLowerCase());
        if (encontrado) a.href = encontrado.browser_download_url;
      });
      document.querySelectorAll("[data-version]").forEach((el) => (el.textContent = v.tag_name));
    })
    .catch(() => { /* sin la API, el botón lleva a la página de la última versión */ });

  // --- Hojitas al tocar Descargar ---
  const hoja = window.confetti && confetti.shapeFromPath
    ? confetti.shapeFromPath({ path: "M10 0 C11 6 7 10 0 10 C0 4 4 0 10 0 Z" })
    : null;
  document.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-descargar], [data-buscar]");
    if (!boton || !window.confetti || quieto) return;
    const caja = boton.getBoundingClientRect();
    confetti({
      particleCount: 28, spread: 62, startVelocity: 26, gravity: 0.7, scalar: 1.25, ticks: 160,
      origin: { x: (caja.left + caja.width / 2) / innerWidth, y: (caja.top + caja.height / 2) / innerHeight },
      colors: ["#5FD4A0", "#1F9D6E", "#8FE3BC", "#FFC86B"],
      shapes: hoja ? [hoja] : ["circle"], disableForReducedMotion: true,
    });
  });

  // --- Scroll suave, conectado a ScrollTrigger si está ---
  if (window.Lenis && !quieto) {
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    window.teireLenis = lenis;
    if (window.gsap) {
      if (window.ScrollTrigger) lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const paso = (t) => { lenis.raf(t); requestAnimationFrame(paso); };
      requestAnimationFrame(paso);
    }
    document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
      const destino = a.getAttribute("href").length > 1 && document.querySelector(a.getAttribute("href"));
      if (destino) { e.preventDefault(); lenis.scrollTo(destino, { offset: -72 }); }
    }));
  }

  // --- Preguntas: abren y cierran con altura animada ---
  document.querySelectorAll("details.pregunta").forEach((d) => {
    const resumen = d.querySelector("summary");
    const cuerpo = d.querySelector(".respuesta");
    resumen.addEventListener("click", (e) => {
      if (quieto || !cuerpo.animate) return;
      e.preventDefault();
      if (d.open) {
        cuerpo.animate([{ height: cuerpo.offsetHeight + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 220, easing: "ease-in" })
          .onfinish = () => (d.open = false);
      } else {
        d.open = true;
        const alto = cuerpo.offsetHeight;
        cuerpo.animate([{ height: "0px", opacity: 0 }, { height: alto + "px", opacity: 1 }], { duration: 280, easing: "cubic-bezier(.2,.8,.2,1)" });
      }
    });
  });

  // La barra toma fondo cuando bajás
  const barra = document.getElementById("barra");
  if (barra) {
    const pintar = () => barra.classList.toggle("con-fondo", scrollY > 40);
    addEventListener("scroll", pintar, { passive: true }); pintar();
  }
  // El ticket de tu sistema queda marcado
  const tuyo = document.querySelector(`.ticket[data-so="${so}"]`);
  if (tuyo) tuyo.classList.add("es-tuyo");

  window.teireQuieto = quieto;
})();
