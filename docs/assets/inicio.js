// La portada: el juego de la isla, la cinta de cosas guardadas, las notas que se mueven,
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

  // ---------- El juego: tirale cosas a la isla ----------
  // La isla es la misma pastilla que la de la app de Windows: quieta, se abre cuando le acercás algo
  // ("Soltá para guardar"), guarda y lo confirma ahí mismo.
  const juego = document.getElementById("juego");
  const isla = document.getElementById("isla");
  const islaTexto = document.getElementById("isla-texto");
  const contador = document.getElementById("contador");
  const pista = document.getElementById("pista");
  const cosas = [...document.querySelectorAll(".cosa")];
  let guardadas = 0, tocado = false, reloj = 0;

  const centro = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
  // Cerca: a menos de 90 px del borde de la isla.
  const cerca = (el) => {
    const i = isla.getBoundingClientRect(), c = centro(el);
    const dx = Math.max(i.left - c.x, 0, c.x - i.right), dy = Math.max(i.top - c.y, 0, c.y - i.bottom);
    return Math.hypot(dx, dy) < 90;
  };
  const poner = (estado) => { clearTimeout(reloj); isla.dataset.estado = estado; };
  // El mismo «pop» que hace la app al guardar. Solo suena si la tarjeta la tiraste vos (el navegador no deja
  // sonar nada antes de que toques la página, y la que se tira sola de muestra va en silencio).
  let audio = null;
  const pop = () => {
    try {
      audio ??= new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === "suspended") audio.resume();
      const t = audio.currentTime, osc = audio.createOscillator(), g = audio.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, t); osc.frequency.exponentialRampToValueAtTime(760, t + .07);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.16, t + .012); g.gain.exponentialRampToValueAtTime(.0001, t + .14);
      osc.connect(g).connect(audio.destination); osc.start(t); osc.stop(t + .2);
    } catch { /* sin audio: no pasa nada */ }
  };
  const confirmar = (nombre, conSonido) => {
    poner("guardando");
    reloj = setTimeout(() => {
      islaTexto.textContent = `«${nombre}» guardado`;
      poner("guardado");
      if (conSonido) pop();
      reloj = setTimeout(() => poner("reposo"), 1900);
    }, 550);
  };
  const volver = () => {
    cosas.forEach((el, i) => {
      delete el.dataset.comida; el.style.visibility = "";
      if (animar) gsap.fromTo(el, { x: 0, y: -30, opacity: 0, scale: .8, rotate: 0 }, { y: 0, opacity: 1, scale: 1, duration: .6, delay: i * .08, ease: "back.out(1.6)" });
    });
    guardadas = 0; contador.textContent = "Volvieron. Tirale de nuevo";
  };
  const guardar = (el, sola = false) => {
    if (el.dataset.comida) return;
    el.dataset.comida = "1";
    tocado = true; pista.style.opacity = 0;
    const nombre = el.querySelector("span:last-child").firstChild.textContent.trim();
    const fin = () => {
      el.style.visibility = "hidden";
      guardadas++;
      contador.innerHTML = `Guardaste <b>${guardadas}</b> ${guardadas === 1 ? "cosa" : "cosas"} en Guardados`;
      confirmar(nombre, !sola);
      if (guardadas === cosas.length) setTimeout(volver, 3200);
    };
    if (!animar) return fin();
    poner("encima");
    const o = centro(isla), c = centro(el);
    gsap.to(el, { x: `+=${o.x - c.x}`, y: `+=${o.y - c.y}`, scale: .15, opacity: 0, rotate: gsap.utils.random(-20, 20), duration: .45, ease: "power3.in", onComplete: fin });
  };
  cosas.forEach((el) => el.addEventListener("click", () => { if (!el.dataset.arrastrada) guardar(el); }));

  if (animar && window.Draggable) {
    cosas.forEach((el, i) => gsap.to(el, { y: "+=8", rotate: i % 2 ? 1.5 : -1.5, duration: 2 + i * .3, yoyo: true, repeat: -1, ease: "sine.inOut" }));
    Draggable.create(cosas, {
      bounds: juego, zIndexBoost: true,
      onPress() { gsap.killTweensOf(this.target, "y,rotate"); gsap.to(this.target, { scale: 1.06, rotate: 0, duration: .2 }); },
      onDrag() {
        this.target.dataset.arrastrada = "1";
        const esta = cerca(this.target);
        if (esta && isla.dataset.estado !== "encima") poner("encima");
        else if (!esta && isla.dataset.estado === "encima") poner("reposo");
      },
      onRelease() {
        gsap.to(this.target, { scale: 1, duration: .2 });
        if (cerca(this.target)) guardar(this.target); else if (isla.dataset.estado === "encima") poner("reposo");
        const t = this.target; setTimeout(() => delete t.dataset.arrastrada, 50);
      },
    });
    // Si no tocás nada, la primera se tira sola para mostrar cómo es
    if (window.ScrollTrigger) ScrollTrigger.create({ trigger: juego, start: "top 70%", once: true, onEnter: () => setTimeout(() => { if (!tocado) guardar(cosas[0], true); }, 2600) });
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

  // ---------- El Espacio: las cosas se mueven y dos amigos andan por la lona ----------
  const lona = document.getElementById("lona");
  if (hayGsap && window.Draggable) {
    Draggable.create(".cosa-e", {
      bounds: "#lona", zIndexBoost: true, dragClickables: false,
      onPress() { if (animar) gsap.to(this.target, { scale: 1.03, duration: .2 }); },
      onRelease() { if (animar) gsap.to(this.target, { scale: 1, duration: .3 }); },
    });
  }
  // Los mouses van hacia las cosas (aunque las hayas movido): ana pasea entre la nota y el kanban, y beto tilda y destilda los lentes.
  const andarPorLaLona = () => {
    const ana = document.getElementById("mouse-ana"), beto = document.getElementById("mouse-beto");
    const lentes = document.getElementById("e-lentes");
    const punto = (el, fx, fy) => {
      const l = lona.getBoundingClientRect(), r = el.getBoundingClientRect();
      return { x: r.left - l.left + r.width * fx, y: r.top - l.top + r.height * fy };
    };
    const ir = (mouse, destino, duracion) => new Promise((listo) => gsap.to(mouse, { x: destino.x, y: destino.y, duration: duracion, ease: "power2.inOut", onComplete: listo }));
    const pausa = (s) => new Promise((listo) => setTimeout(listo, s * 1000));
    const paseoAna = async () => {
      for (;;) {
        await ir(ana, punto(lona.querySelector(".e-nota"), .7, .6), 1.6); await pausa(1.2);
        await ir(ana, punto(lona.querySelector(".e-kanban"), .5, .7), 1.8); await pausa(1.4);
        await ir(ana, punto(lona.querySelector(".e-kanban"), .85, .45), 1.1); await pausa(1);
      }
    };
    const paseoBeto = async () => {
      for (;;) {
        await ir(beto, punto(lentes, .5, .5), 1.5); await pausa(.3);
        lentes.checked = !lentes.checked;
        await pausa(1.4);
        await ir(beto, punto(lona.querySelector(".e-lista"), .9, 1.25), 1.4); await pausa(2.2);
      }
    };
    gsap.set(ana, { x: 260, y: 230 }); gsap.set(beto, { x: 470, y: 420 });
    paseoAna(); paseoBeto();
  };
  if (animar && window.ScrollTrigger) ScrollTrigger.create({ trigger: lona, start: "top 85%", once: true, onEnter: andarPorLaLona });

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
