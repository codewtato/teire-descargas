// La portada: el juego de la burbuja, la cinta de cosas guardadas, las notas que se mueven,
// las tarjetas que se apilan, los comandos de Teire IA y los temas de Premium.
(() => {
  const quieto = window.teireQuieto;
  const hayGsap = !!window.gsap;
  if (hayGsap) gsap.registerPlugin(...[window.ScrollTrigger, window.Draggable, window.SplitText].filter(Boolean));
  const animar = hayGsap && !quieto;

  // ---------- La cinta de cosas guardadas ----------
  const COSAS = [["Reel de Instagram", "#F4B9A8"], ["Receta de chipá", "#F7DC8A"], ["Video de YouTube", "#9FD9EC"], ["captura.png", "#B9E8CF"], ["Pasajes a Córdoba", "#FFC86B"], ["Playlist para el asado", "#5FD4A0"], ["Nota de voz de mamá", "#F4B9A8"], ["Artículo para leer después", "#9FD9EC"], ["TikTok de perros", "#F7DC8A"], ["Dirección del bar", "#B9E8CF"]];
  const fila = (lista) => lista.map(([t, c]) => `<span><i style="background:${c}"></i>${t}</span>`).join("");
  const c1 = fila(COSAS), c2 = fila([...COSAS].reverse());
  document.getElementById("cinta-1").innerHTML = c1 + c1;
  document.getElementById("cinta-2").innerHTML = c2 + c2;

  // ---------- El juego: tirale cosas a la burbuja ----------
  const juego = document.getElementById("juego");
  const orbe = document.getElementById("orbe");
  const contador = document.getElementById("contador");
  const toast = document.getElementById("toast");
  const toastTexto = document.getElementById("toast-texto");
  const pista = document.getElementById("pista");
  const cosas = [...document.querySelectorAll(".cosa")];
  let guardadas = 0, tocado = false;

  const centroOrbe = () => { const r = orbe.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, radio: r.width / 2 }; };
  const centro = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
  const cerca = (el) => { const o = centroOrbe(), c = centro(el); return Math.hypot(o.x - c.x, o.y - c.y) < o.radio + 70; };

  const avisar = (texto) => {
    toastTexto.textContent = texto;
    if (!animar) { toast.style.opacity = 1; return; }
    gsap.killTweensOf(toast);
    gsap.timeline().to(toast, { opacity: 1, y: 0, duration: .3, ease: "back.out(2)" }).to(toast, { opacity: 0, duration: .4 }, "+=1.6");
  };
  const volver = () => {
    cosas.forEach((el, i) => {
      delete el.dataset.comida; el.style.visibility = "";
      if (animar) gsap.fromTo(el, { x: 0, y: -30, opacity: 0, scale: .8, rotate: 0 }, { y: 0, opacity: 1, scale: 1, duration: .6, delay: i * .08, ease: "back.out(1.6)" });
    });
    guardadas = 0; contador.textContent = "Volvieron. Tirale de nuevo";
  };
  const comer = (el) => {
    if (el.dataset.comida) return;
    el.dataset.comida = "1";
    tocado = true; pista.style.opacity = 0;
    const nombre = el.querySelector("span:last-child").firstChild.textContent.trim();
    orbe.classList.remove("cerca");
    const fin = () => {
      guardadas++;
      contador.innerHTML = `Guardaste <b>${guardadas}</b> ${guardadas === 1 ? "cosa" : "cosas"} en Guardados`;
      avisar(`«${nombre}» guardado`);
      if (guardadas === cosas.length) setTimeout(volver, 2200);
    };
    if (!animar) { el.style.visibility = "hidden"; fin(); return; }
    const o = centroOrbe(), c = centro(el);
    gsap.timeline({ onComplete: fin })
      .to(el, { x: `+=${o.x - c.x}`, y: `+=${o.y - c.y}`, scale: .15, opacity: 0, rotate: gsap.utils.random(-30, 30), duration: .45, ease: "power3.in" })
      .to(orbe, { scale: 1.14, duration: .14, ease: "power2.out" }, "-=.1")
      .to(orbe, { scale: 1, duration: .6, ease: "elastic.out(1.2, .4)" });
  };
  cosas.forEach((el) => el.addEventListener("click", () => { if (!el.dataset.arrastrada) comer(el); }));

  if (animar && window.Draggable) {
    cosas.forEach((el, i) => gsap.to(el, { y: "+=8", rotate: i % 2 ? 1.5 : -1.5, duration: 2 + i * .3, yoyo: true, repeat: -1, ease: "sine.inOut" }));
    Draggable.create(cosas, {
      bounds: juego, zIndexBoost: true,
      onPress() { gsap.killTweensOf(this.target, "y,rotate"); gsap.to(this.target, { scale: 1.06, rotate: 0, duration: .2 }); },
      onDrag() { this.target.dataset.arrastrada = "1"; orbe.classList.toggle("cerca", cerca(this.target)); },
      onRelease() {
        gsap.to(this.target, { scale: 1, duration: .2 });
        if (cerca(this.target)) comer(this.target); else orbe.classList.remove("cerca");
        const t = this.target; setTimeout(() => delete t.dataset.arrastrada, 50);
      },
    });
    // Si no tocás nada, la primera se tira sola para mostrar cómo es
    if (window.ScrollTrigger) ScrollTrigger.create({ trigger: juego, start: "top 70%", once: true, onEnter: () => setTimeout(() => { if (!tocado) comer(cosas[0]); }, 2600) });

    // Los ojos siguen al mouse
    const ojos = orbe.querySelector(".ojos");
    const ox = gsap.quickTo(ojos, "x", { duration: .4 }), oy = gsap.quickTo(ojos, "y", { duration: .4 });
    addEventListener("pointermove", (e) => {
      const o = centroOrbe(), dx = e.clientX - o.x, dy = e.clientY - o.y, d = Math.hypot(dx, dy) || 1;
      ox(dx / d * Math.min(10, d / 30)); oy(dy / d * Math.min(8, d / 30));
    }, { passive: true });
  }

  // ---------- Notas que se mueven y se tildan ----------
  const lista = document.getElementById("lista-super");
  const avance = document.getElementById("avance-super");
  const contar = () => {
    const cajas = lista.querySelectorAll("input"), hechas = lista.querySelectorAll("input:checked").length;
    avance.style.width = (hechas / cajas.length) * 100 + "%";
  };
  lista.addEventListener("change", contar); contar();
  if (hayGsap && window.Draggable) {
    Draggable.create(".papel", {
      bounds: "#mesa", zIndexBoost: true, dragClickables: false,
      onPress() { if (animar) gsap.to(this.target, { scale: 1.04, boxShadow: "0 30px 44px -18px rgba(0,0,0,.85)", duration: .2 }); },
      onRelease() { if (animar) gsap.to(this.target, { scale: 1, boxShadow: "0 18px 30px -16px rgba(0,0,0,.75)", duration: .3 }); },
    });
  }

  // ---------- Premium: los temas pintan la caja ----------
  const TEMAS = {
    teire: { fondo: "#151D1A", texto: "#F4EFE6", acento: "#5FD4A0", tarjeta: "#1C2622" },
    jardin: { fondo: "#0E1C14", texto: "#E4F5EA", acento: "#8BD9A0", tarjeta: "#1D3A2A" },
    oro: { fondo: "#17130B", texto: "#FFF1D6", acento: "#FFC86B", tarjeta: "#2E2412" },
    papel: { fondo: "#F6F0E4", texto: "#2B2620", acento: "#8A6F4E", tarjeta: "#E8DDC8" },
    arcade: { fondo: "#1D1027", texto: "#FFE3F4", acento: "#FF7AC8", tarjeta: "#36204A" },
  };
  const caja = document.getElementById("caja-premium");
  const botonesTema = document.querySelectorAll("#elegir-tema button");
  botonesTema.forEach((b) => b.addEventListener("click", () => {
    const t = TEMAS[b.dataset.tema];
    botonesTema.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    caja.style.setProperty("--p-fondo", t.fondo); caja.style.setProperty("--p-texto", t.texto);
    caja.style.setProperty("--p-acento", t.acento); caja.style.setProperty("--p-tarjeta", t.tarjeta);
    if (animar) gsap.fromTo(".vista-app .tarjetita", { y: 8 }, { y: 0, duration: .5, stagger: .06, ease: "back.out(2)" });
  }));

  if (!animar) return;

  // ---------- Entrada: el título aparece de a palabra ----------
  if (window.SplitText) {
    const partes = SplitText.create("#titulo", { type: "words", mask: "words" });
    gsap.from(partes.words, { yPercent: 110, duration: .9, ease: "power4.out", stagger: .06, delay: .1 });
  }
  gsap.from(".portada .lema, .portada .bajada, .portada .acciones, .portada .nota-so", { y: 16, opacity: 0, duration: .7, stagger: .08, delay: .45, ease: "power3.out" });
  gsap.from(".orbe-caja", { scale: .3, opacity: 0, duration: 1.1, delay: .7, ease: "elastic.out(1, .55)" });
  gsap.from(".cosa", { opacity: 0, scale: .7, duration: .6, stagger: .07, delay: 1, ease: "back.out(1.7)" });

  if (!window.ScrollTrigger) return;

  // Los papeles caen sobre la mesa cuando la ves
  gsap.from(".papel", { y: -80, opacity: 0, rotate: () => gsap.utils.random(-22, 22), duration: .8, stagger: .08, ease: "back.out(1.3)", scrollTrigger: { trigger: "#mesa", start: "top 75%", once: true } });
  const trazo = document.getElementById("trazo"), largo = trazo.getTotalLength();
  gsap.fromTo(trazo, { strokeDasharray: largo, strokeDashoffset: largo }, { strokeDashoffset: 0, duration: 1.6, ease: "power1.inOut", scrollTrigger: { trigger: "#mesa", start: "top 60%", once: true } });

  // ---------- Tarjetas que se apilan: la de atrás se achica ----------
  const tarjetas = gsap.utils.toArray(".tarjeta");
  tarjetas.forEach((t, i) => {
    if (i === tarjetas.length - 1) return;
    gsap.to(t, { scale: .94, ease: "none", scrollTrigger: { trigger: tarjetas[i + 1], start: "top bottom", end: "top 30%", scrub: true } });
  });

  // «Fede está escribiendo» con puntitos
  const fede = document.getElementById("escribe-fede"); let p = 0;
  setInterval(() => { p = (p + 1) % 4; fede.textContent = "Fede está escribiendo" + ".".repeat(p); }, 500);

  // Comandos de Teire IA que se escriben solos
  const COMANDOS = ["«creá una lista de compras con pan y leche»", "«recordame mañana a las 9 llamar a la abuela»", "«mandale a Fede que llego tarde»", "«agregá yerba a la lista del súper»"];
  const comando = document.getElementById("comando"); let k = 0;
  const escribir = () => {
    const txt = COMANDOS[k++ % COMANDOS.length], o = { n: 0 };
    comando.classList.add("cursor-escribe");
    gsap.to(o, { n: txt.length, duration: txt.length * .045, ease: "none", onUpdate: () => (comando.textContent = txt.slice(0, Math.round(o.n))), onComplete: () => setTimeout(escribir, 1800) });
  };
  ScrollTrigger.create({ trigger: comando, start: "top 85%", once: true, onEnter: escribir });
})();
