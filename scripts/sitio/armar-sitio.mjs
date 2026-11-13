// Arma la portada de useteire.app en español (docs/index.html) y en inglés (docs/en/index.html).
// Uso, desde la raíz del repo:  node scripts/sitio/armar-sitio.mjs
//
// Qué se edita y dónde:
//   - plantilla.html : el diseño y los textos en español.
//   - en.json        : cada texto en español de la plantilla → su versión en inglés.
//   - este archivo   : las preguntas frecuentes (en los dos idiomas), el <head>, los datos para buscadores y el script.
// Lo que se cambia en un idioma se cambia en el otro: si falta una traducción, el script avisa al terminar.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const aca = dirname(fileURLToPath(import.meta.url));
const docs = join(aca, "..", "..", "docs");
const plantilla = readFileSync(join(aca, "plantilla.html"), "utf8");
const EN = JSON.parse(readFileSync(join(aca, "en.json"), "utf8"));
const HOY = new Date().toISOString().slice(0, 10);
const SITIO = "https://useteire.app";

// ---------------------------------------------------------------- textos que cambian por idioma
const TEXTOS = {
    es: {
        titulo: "Teire: app gratis para organizar tu día y compartirlo",
        descripcion: "Calendario, tareas, recordatorios y listas en vivo con tus amigos, más una isla en tu pantalla que guarda links y fotos. Gratis para Windows, Android e iPhone.",
        corta: "Tu día y el de tu gente, en un solo lugar. Tareas, recordatorios, calendario, listas en vivo y una isla en tu pantalla. Gratis.",
        imagenAlt: "Teire: tu día y el de tu gente, en un solo lugar",
        locale: "es_AR",
        imagen: `${SITIO}/img/compartir.png`,
        descargar: "Descargar para ",
        iphone: "Instalar en iPhone",
        iphoneUrl: "/iphone/",
        soNota: "",
        issues: "https://github.com/codewtato/teire-descargas/issues",
        saludo: "Hola, preguntá lo que quieras de Teire: cómo se instala, qué hace o algo que no anda. Las respuestas salen de este sitio.",
        nada: 'No encontré eso en el sitio. Escribinos desde Ayuda dentro de la app, o en <a href="https://github.com/codewtato/teire-descargas/issues" target="_blank" rel="noopener">GitHub</a>, y te respondemos.',
        campo: "Hacé una pregunta…", boton: "Preguntá", tituloPanel: "Preguntale a Teire", cerrar: "Cerrar", enviar: "Enviar",
        pie: "Las respuestas salen de useteire.app: lo que escribís queda en esta página.",
        appDesc: "Organizador gratis para tu día y el de tu gente: tareas, recordatorios, calendario, listas en vivo con amigos, Espacio para trabajar en grupo y una isla en la pantalla que guarda links y fotos, muestra tu música y tu día. Para Windows, Android, iPhone y Linux.",
        faqAbierta: true,
    },
    en: {
        titulo: "Teire: free app to organize your day and share it",
        descripcion: "Calendar, tasks, reminders and live shared lists with your friends, plus an island on your screen that saves links and photos. Free for Windows, Android and iPhone.",
        corta: "Your day and your people's, all in one place. Tasks, reminders, calendar, live lists and an island on your screen. Free.",
        imagenAlt: "Teire: your day and your people's, all in one place",
        locale: "en_US",
        imagen: `${SITIO}/img/compartir-en.png`,
        descargar: "Download for ",
        iphone: "Open on iPhone",
        iphoneUrl: "/app/",
        issues: "https://github.com/codewtato/teire-downloads/issues",
        saludo: "Hi, ask anything about Teire: how to install it, what it does, or something that isn't working. Answers come straight from this site.",
        nada: 'I couldn\'t find that on the site. Write to us from Help inside the app, or on <a href="https://github.com/codewtato/teire-downloads/issues" target="_blank" rel="noopener">GitHub</a>, and we\'ll reply.',
        campo: "Ask a question…", boton: "Ask", tituloPanel: "Ask Teire", cerrar: "Close", enviar: "Send",
        pie: "Answers come from useteire.app: what you type stays on this page.",
        appDesc: "Free organizer for your day and your people's: tasks, reminders, calendar, live lists with friends, a Space to work as a group and an island on your screen that saves links and photos and shows your music and your day. For Windows, Android, iPhone and Linux.",
    },
};

// ---------------------------------------------------------------- preguntas frecuentes (página, buscadores y botón Preguntá)
// k = palabras que el botón Preguntá busca en lo que escribe la persona (en los dos idiomas).
const FAQ = [
    { k: ["gratis", "cuesta", "precio", "pagar", "premium", "free", "cost", "price", "pay"],
      q: { es: "¿Teire es gratis?", en: "Is Teire free?" },
      a: { es: "Sí, y todo lo importante es gratis. Teire Premium es opcional: suma temas, colores y más pedidos a Teire IA.", en: "Yes, and everything important is free. Teire Premium is optional: it adds themes, colors and more Teire AI requests." } },
    { k: ["cuenta", "registr", "login", "entrar", "account", "sign", "register"],
      q: { es: "¿Necesito una cuenta?", en: "Do I need an account?" },
      a: { es: "No. Sin cuenta tus notas quedan solo en tu equipo. Con cuenta se sincronizan entre tus dispositivos y las podés compartir. Entrás con correo, Google, Discord o GitHub.", en: "No. Without an account your notes stay on your device only. With one they sync across your devices and you can share them. You sign in with email, Google, Discord or GitHub." } },
    { k: ["solo notas", "app de notas", "organizador", "just a notes", "notes app", "organizer"],
      q: { es: "¿Es solo una app de notas?", en: "Is it just a notes app?" },
      a: { es: "No: es un organizador. Tiene notas, pero también tareas, recordatorios, calendario, modo foco y todo lo que compartís con tu gente.", en: "No: it's an organizer. It has notes, but also tasks, reminders, a calendar, focus mode and everything you share with your people." } },
    { k: ["isla", "linux", "celular", "android", "island", "phone"],
      q: { es: "¿La isla anda en Linux y en el celular?", en: "Does the island work on Linux and on phones?" },
      a: { es: "La isla es de Windows. En Linux y Android tenés el resto de Teire; en Android, usá Compartir y elegí Teire desde cualquier app. Con la web podés usarla desde cualquier navegador.", en: "The island is Windows-only. On Linux and Android you get the rest of Teire; on Android, use Share and pick Teire from any app. With the web version you can use it from any browser." } },
    { k: ["datos", "privacidad", "publicidad", "analitic", "data", "privacy", "ads", "track"],
      q: { es: "¿Qué hacen con mis datos?", en: "What do you do with my data?" },
      a: { es: "No mostramos publicidad ni usamos analíticas, y las notas con PIN se cifran en tu equipo antes de subirse. Mirá la política de privacidad para el detalle.", en: "We don't show ads or use analytics, and PIN notes are encrypted on your device before they're uploaded. See the privacy policy for details." } },
    { k: ["iphone", "ios", "apple", "ipad", "sin instalar", "navegador", "browser"],
      q: { es: "¿Puedo usarla en el iPhone o sin instalar nada?", en: "Can I use it on iPhone, or without installing anything?" },
      a: { es: "Sí. Abrí useteire.app/app en Safari y agregala a la pantalla de inicio: queda con su ícono, como cualquier app, y no pasa por la App Store. En cualquier navegador también funciona, pero ahí no están la isla ni la voz de Teire IA.", en: "Yes. Open useteire.app/app in Safari and add it to your home screen: it gets its own icon like any app, and it doesn't go through the App Store. It also works in any browser, but the island and Teire AI voice aren't there." } },
    { k: ["advertencia", "windows protegi", "smartscreen", "virus", "warning", "protected your pc"],
      q: { es: "¿Por qué Windows me avisa al instalar?", en: "Why does Windows show a warning?" },
      a: { es: "Porque el instalador todavía no tiene una firma de código paga y Windows desconfía de las apps con pocas descargas. No significa que tenga un virus: tocá «Más información» y «Ejecutar de todas formas».", en: "Because the installer doesn't have a paid code signature yet, and Windows distrusts apps with few downloads. It doesn't mean it has a virus: click “More info” and then “Run anyway”." } },
    { k: ["espacio", "invitar", "link", "space", "invite"],
      q: { es: "¿Cómo invito a alguien a un Espacio?", en: "How do I invite someone to a Space?" },
      a: { es: "En tu Espacio tocá Compartir y creá un link. Quien lo abra entra sin cuenta y sin instalar nada. El link dura 24 horas y lo podés cerrar antes.", en: "In your Space tap Share and create a link. Whoever opens it joins without an account and without installing anything. The link lasts 24 hours and you can close it sooner." } },
    { k: ["ingles", "english", "idioma", "language", "voz", "voice", "oye teire", "teire ia", "teire ai"],
      q: { es: "¿Teire está en inglés? ¿Y Teire IA?", en: "Is Teire available in English? What about Teire AI?" },
      a: { es: "La app está en español y en inglés, y se elige según el idioma de tu dispositivo (se cambia en Ajustes). Teire IA, la voz y las órdenes, por ahora funciona solo en español.", en: "The app is in Spanish and English, picked from your device's language (you can change it in Settings). Teire AI, the voice and commands, works in Spanish only for now." } },
];
const SUGERIDAS = [0, 1, 3, 5];

// ---------------------------------------------------------------- utilidades
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonEnHtml = (o) => JSON.stringify(o).replace(/</g, "\\u003c");
const faltan = new Set();

// Deja solo el bloque del idioma pedido: <!--solo:es--> ... <!--/solo-->
const soloIdioma = (html, L) =>
    html.replace(/<!--solo:(es|en)-->\n?([\s\S]*?)<!--\/solo-->\n?/g, (_, l, cuerpo) => (l === L ? cuerpo : ""));

// Pasa al inglés cada texto de la plantilla (y sus atributos) con el diccionario.
const traducir = (html) => {
    const partes = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]+>)/g);
    let enIcono = false;
    let enBloqueEn = false;
    // Nombres propios, letras de canciones y marcadores: no se traducen.
    const igual = new Set(["teire", "Teire", "Windows", "Linux", "Android", "Lucía", "Mateo", "Sofi", "Los Brotes", "Soda Stereo · Spotify", "Ni pienso evitar un roce secreto", "De aquel amor", "De música ligera"]);
    for (let i = 0; i < partes.length; i++) {
        const p = partes[i];
        if (p.startsWith("<!--solo:en")) { enBloqueEn = true; continue; }
        if (p.startsWith("<!--/solo")) { enBloqueEn = false; continue; }
        if (p.startsWith("<script") || p.startsWith("<style") || p.startsWith("<!--")) continue;
        if (enBloqueEn) continue;
        if (p.startsWith("<")) {
            enIcono = /^<i class="mi[ "]/.test(p);
            partes[i] = p.replace(/\b(title|aria-label|placeholder|alt)="([^"]*)"/g, (m, a, v) => (EN[v] ? `${a}="${EN[v]}"` : m));
            continue;
        }
        const t = p.replace(/\s+/g, " ").trim();
        if (!t || enIcono || igual.has(t) || t.startsWith("{{")) continue;
        if (EN[t] !== undefined) partes[i] = p.replace(t, () => EN[t]);
        else if (/[A-Za-zÁÉÍÓÚáéíóúñÑ]{3,}/.test(t) && !/^[A-Z]{1,3}$/.test(t)) faltan.add(t);
    }
    let r = partes.join("");
    // Letras de los días de la semana (L M M J V S D → M T W T F S S)
    r = r.replace(/<div class="sm">[\s\S]*?<\/div>/, (bloque) => { let n = 0; return bloque.replace(/(<span[^>]*>)[A-Z](<b>)/g, (m, a, b) => a + "MTWTFSS"[n++] + b); });
    return r;
};

// ---------------------------------------------------------------- <head>
const head = (L) => {
    const T = TEXTOS[L];
    const url = L === "es" ? `${SITIO}/` : `${SITIO}/en/`;
    const faq = FAQ.map((f) => ({ "@type": "Question", name: f.q[L], acceptedAnswer: { "@type": "Answer", text: f.a[L] } }));
    const datos = {
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "WebSite", "@id": `${SITIO}/#sitio`, url: `${SITIO}/`, name: "Teire", alternateName: ["useteire.app"], inLanguage: ["es", "en"] },
            {
                "@type": "SoftwareApplication", "@id": `${url}#app`, name: "Teire", description: T.appDesc,
                applicationCategory: "ProductivityApplication", operatingSystem: "Windows 10, Windows 11, Android, iOS, Linux",
                url, downloadUrl: "https://github.com/codewtato/teire-descargas/releases/latest", image: `${SITIO}/img/icono-512.png`, screenshot: T.imagen,
                inLanguage: L, isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: L === "es" ? "ARS" : "USD" },
                author: { "@type": "Organization", name: "Teire", url: SITIO },
            },
            { "@type": "FAQPage", "@id": `${url}#preguntas`, inLanguage: L, mainEntity: faq },
        ],
    };
    // Primera visita desde un navegador que no está en español: va a /en/. Una elección hecha con ES · EN manda siempre.
    const ir = L === "es"
        ? `<script>try{if(!localStorage.getItem('idioma-sitio')&&!/bot|crawl|spider|lighthouse|preview/i.test(navigator.userAgent)&&!/^es/i.test(navigator.language||'es'))location.replace('/en/'+location.search+location.hash)}catch(e){}</script>`
        : "";
    return [
        `<title>${esc(T.titulo)}</title>`,
        `<meta name="description" content="${esc(T.descripcion)}">`,
        `<link rel="canonical" href="${url}">`,
        `<link rel="alternate" hreflang="es" href="${SITIO}/">`,
        `<link rel="alternate" hreflang="en" href="${SITIO}/en/">`,
        `<link rel="alternate" hreflang="x-default" href="${SITIO}/">`,
        `<meta name="robots" content="index, follow, max-image-preview:large">`,
        `<meta name="theme-color" content="#0B0B0C">`,
        `<meta name="author" content="Teire">`,
        `<meta property="og:type" content="website">`,
        `<meta property="og:locale" content="${T.locale}">`,
        `<meta property="og:locale:alternate" content="${L === "es" ? "en_US" : "es_AR"}">`,
        `<meta property="og:site_name" content="Teire">`,
        `<meta property="og:title" content="${esc(T.titulo)}">`,
        `<meta property="og:description" content="${esc(T.corta)}">`,
        `<meta property="og:url" content="${url}">`,
        `<meta property="og:image" content="${T.imagen}">`,
        `<meta property="og:image:width" content="1200">`,
        `<meta property="og:image:height" content="630">`,
        `<meta property="og:image:alt" content="${esc(T.imagenAlt)}">`,
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${esc(T.titulo)}">`,
        `<meta name="twitter:description" content="${esc(T.corta)}">`,
        `<meta name="twitter:image" content="${T.imagen}">`,
        `<link rel="icon" href="/icono.svg" type="image/svg+xml">`,
        `<link rel="icon" href="/img/icono-32.png" type="image/png" sizes="32x32">`,
        `<link rel="apple-touch-icon" href="/img/icono-180.png">`,
        `<link rel="preload" href="/assets/fuentes/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>`,
        `<link rel="preload" href="/assets/fuentes/playfair-display-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>`,
        `<link rel="preload" href="/assets/fuentes/material-symbols-rounded.woff2" as="font" type="font/woff2" crossorigin>`,
        `<script>try{if(localStorage.getItem('tema-sitio')==='oscuro')document.documentElement.dataset.tema='oscuro'}catch(e){}</script>`,
        ir,
        `<script type="application/ld+json">\n${JSON.stringify(datos, null, 2).replace(/</g, "\\u003c")}\n</script>`,
    ].filter(Boolean).join("\n");
};

// ---------------------------------------------------------------- script de la página
const script = (L) => {
    const T = TEXTOS[L];
    const qa = FAQ.map((f) => ({ k: f.k, q: f.q[L], a: f.a[L] }));
    const msg = { saludo: T.saludo, nada: T.nada, campo: T.campo, boton: T.boton, titulo: T.tituloPanel, cerrar: T.cerrar, enviar: T.enviar, pie: T.pie };
    return `<script>
(() => {
  const L = ${JSON.stringify(L)};
  const QA = ${jsonEnHtml(qa)};
  const SUGERIDAS = ${JSON.stringify(SUGERIDAS)};
  const MSG = ${jsonEnHtml(msg)};
  const DESCARGAR = ${JSON.stringify({ para: T.descargar, iphone: T.iphone, iphoneUrl: T.iphoneUrl })};
  const REPO = 'https://github.com/codewtato/teire-descargas/releases';

  // Tema claro / oscuro (se recuerda)
  const raiz = document.documentElement;
  const botonTema = document.getElementById('tema');
  const pintarTema = () => { botonTema.firstElementChild.textContent = raiz.dataset.tema === 'oscuro' ? 'light_mode' : 'dark_mode'; };
  botonTema.addEventListener('click', () => {
    raiz.dataset.tema = raiz.dataset.tema === 'oscuro' ? '' : 'oscuro';
    try { localStorage.setItem('tema-sitio', raiz.dataset.tema === 'oscuro' ? 'oscuro' : 'claro'); } catch (e) {}
    pintarTema();
  });
  pintarTema();

  // Idioma: quien elige con ES · EN no vuelve a ser redirigida
  document.querySelectorAll('.idioma a').forEach((a) => a.addEventListener('click', () => { try { localStorage.setItem('idioma-sitio', a.dataset.lang); } catch (e) {} }));

  // La isla: tocar una pestaña abre la pastilla; tocar la misma otra vez la cierra
  const isla = document.querySelector('.isla');
  let activa = null;
  const marcar = (t) => {
    document.querySelectorAll('.tabs button').forEach((b) => b.classList.toggle('on', b.dataset.t === t));
    document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('on', p.dataset.p === t));
    document.querySelectorAll('.cap').forEach((p) => p.classList.toggle('on', p.dataset.c === (t || 'reposo')));
    document.querySelectorAll('[data-i]').forEach((i) => i.classList.toggle('on', i.dataset.i === t));
  };
  const ir = (t) => {
    if (activa === t) { activa = null; isla.classList.add('reposo'); marcar(null); return; }
    activa = t; marcar(t); isla.classList.remove('reposo');
  };
  isla.addEventListener('click', () => { if (isla.classList.contains('reposo')) ir('musica'); });
  document.querySelectorAll('.tabs button').forEach((b) => b.addEventListener('click', () => ir(b.dataset.t)));
  marcar(null);

  // Descargas: el botón grande reconoce tu sistema y baja directo el instalador de la última versión
  const ua = navigator.userAgent;
  const esIphone = /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  const so = esIphone ? 'iphone' : /android/i.test(ua) ? 'android' : /windows/i.test(ua) ? 'windows' : /linux|x11|cros/i.test(ua) ? 'linux' : 'otro';
  const NOMBRES = { windows: 'Windows', android: 'Android', linux: 'Linux' };
  document.querySelectorAll('[data-descargar]').forEach((b) => {
    const texto = b.querySelector('[data-texto]') || b;
    if (so === 'iphone') { texto.textContent = DESCARGAR.iphone; b.href = DESCARGAR.iphoneUrl; }
    else if (NOMBRES[so]) { texto.textContent = DESCARGAR.para + NOMBRES[so]; b.href = so === 'android' ? REPO + '/latest/download/Teire.apk' : REPO + '/latest'; }
  });
  fetch('https://api.github.com/repos/codewtato/teire-descargas/releases/latest')
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((v) => {
      const archivos = v.assets || [];
      const buscar = (fin) => archivos.find((a) => a.name.toLowerCase().endsWith(fin));
      const clave = { windows: 'setup.exe', linux: '.appimage', android: '.apk' }[so];
      const propio = clave && buscar(clave);
      if (propio) document.querySelectorAll('[data-descargar]').forEach((b) => (b.href = propio.browser_download_url));
      document.querySelectorAll('[data-buscar]').forEach((a) => { const f = buscar(a.dataset.buscar.toLowerCase()); if (f) a.href = f.browser_download_url; });
    })
    .catch(() => {});

  // Preguntá: responde con lo que dice el sitio (sin servidor, sin IA)
  const sacarAcentos = (t) => t.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  const mensajes = document.getElementById('preg-msgs');
  const poner = (html, yo) => { const d = document.createElement('div'); d.className = 'preg-m' + (yo ? ' yo' : ''); d.innerHTML = html; mensajes.appendChild(d); mensajes.scrollTop = mensajes.scrollHeight; return d; };
  const escapar = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const responder = (texto) => {
    const limpio = sacarAcentos(texto);
    let mejor = null, puntaje = 0;
    for (const x of QA) { const p = x.k.reduce((a, k) => a + (limpio.includes(sacarAcentos(k)) ? 1 : 0), 0); if (p > puntaje) { puntaje = p; mejor = x; } }
    poner(mejor ? escapar(mejor.a) : MSG.nada);
  };
  const caja = document.createElement('div'); caja.className = 'preg-sug';
  SUGERIDAS.forEach((i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = QA[i].q; b.addEventListener('click', () => { poner(escapar(QA[i].q), true); poner(escapar(QA[i].a)); }); caja.appendChild(b); });
  const panel = document.getElementById('preg-panel');
  const btnPreg = document.getElementById('preg-abrir');
  const campo = document.getElementById('preg-campo');
  document.getElementById('preg-btn-txt').textContent = MSG.boton;
  document.getElementById('preg-tit').textContent = MSG.titulo;
  panel.setAttribute('aria-label', MSG.titulo);
  document.getElementById('preg-cerrar').setAttribute('aria-label', MSG.cerrar);
  campo.placeholder = MSG.campo;
  document.querySelector('#preg-form button').setAttribute('aria-label', MSG.enviar);
  document.getElementById('preg-pie').textContent = MSG.pie;
  poner(MSG.saludo); mensajes.appendChild(caja);
  const abrir = () => { panel.classList.add('abierto'); btnPreg.style.display = 'none'; campo.focus(); };
  btnPreg.addEventListener('click', abrir);
  document.getElementById('preg-cerrar').addEventListener('click', () => { panel.classList.remove('abierto'); btnPreg.style.display = ''; });
  document.getElementById('preg-form').addEventListener('submit', (e) => { e.preventDefault(); const t = campo.value.trim(); if (!t) return; poner(escapar(t), true); campo.value = ''; responder(t); });
  if (location.hash === '#preguntar') abrir();
})();
</script>`;
};

// ---------------------------------------------------------------- armado
const armar = (L) => {
    const T = TEXTOS[L];
    // En inglés: se saca el bloque en español, se traduce lo demás (sin tocar el bloque que ya está en inglés) y se quitan las marcas.
    let html = plantilla;
    if (L === "en") {
        html = html.replace(/<!--solo:es-->\n?[\s\S]*?<!--\/solo-->\n?/g, "");
        html = traducir(html).replace(/<!--\/?solo(:en)?-->\n?/g, "");
    } else {
        html = soloIdioma(html, L);
    }
    const faqHtml = FAQ.map((f, i) => `    <details${i === 0 ? " open" : ""}><summary>${esc(f.q[L])}</summary><p>${esc(f.a[L])}</p></details>`).join("\n");
    return html
        .replace("{{HEAD}}", () => head(L))
        .replace("{{LANG}}", L)
        .replaceAll("{{HOME}}", L === "es" ? "/" : "/en/")
        .replace("{{ES_ACTUAL}}", L === "es" ? 'aria-current="true"' : "")
        .replace("{{EN_ACTUAL}}", L === "en" ? 'aria-current="true"' : "")
        .replace("{{FAQ}}", () => faqHtml)
        .replace("{{SCRIPT}}", () => script(L));
};

writeFileSync(join(docs, "index.html"), armar("es"));
mkdirSync(join(docs, "en"), { recursive: true });
writeFileSync(join(docs, "en", "index.html"), armar("en"));

// Mapa del sitio: la portada en los dos idiomas, cada una apuntando a la otra.
const otras = [
    ["iphone/", "2026-11-04", "0.7"], ["notas-compartidas/", "2026-11-04", "0.8"], ["alternativa-google-keep/", "2026-11-04", "0.7"],
    ["privacidad/", "2026-11-04", "0.4"], ["terminos/", "2026-11-03", "0.4"], ["arrepentimiento/", "2026-11-03", "0.3"],
];
const par = (ruta, prioridad) => `  <url><loc>${SITIO}/${ruta}</loc><lastmod>${HOY}</lastmod><priority>${prioridad}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${SITIO}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITIO}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITIO}/"/>
  </url>`;
writeFileSync(join(docs, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${par("", "1.0")}
${par("en/", "1.0")}
${otras.map(([r, f, p]) => `  <url><loc>${SITIO}/${r}</loc><lastmod>${f}</lastmod><priority>${p}</priority></url>`).join("\n")}
</urlset>
`);

if (faltan.size) {
    console.log(`\nFalta traducir al inglés (agregalo a scripts/sitio/en.json):\n- ${[...faltan].join("\n- ")}`);
} else {
    console.log("Listo: docs/index.html y docs/en/index.html, sin textos sin traducir.");
}
