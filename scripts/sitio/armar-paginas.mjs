// Arma las páginas de abajo del sitio, en español y en inglés, con el diseño de la portada:
//   privacidad, términos, arrepentimiento, iPhone, notas compartidas y alternativa a Keep.
// También arma el mapa del sitio (docs/sitemap.xml) con todas las páginas y su par en el otro idioma.
// Uso, desde la raíz del repo:  node scripts/sitio/armar-paginas.mjs
//
// Los textos están en paginas-datos.mjs ([español, inglés] lado a lado). La portada se arma aparte (armar-sitio.mjs).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGINAS, FECHA, FECHA_ISO } from "./paginas-datos.mjs";

const docs = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "docs");
const SITIO = "https://useteire.app";
const LANGS = ["es", "en"];
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sinEtiquetas = (t) => t.replace(/<[^>]+>/g, "");

const ruta = (p, i) => (i === 0 ? `/${p.slug[0]}/` : `/en/${p.slug[1]}/`);
const home = (i) => (i === 0 ? "/" : "/en/");
const repo = ["teire-descargas", "teire-downloads"];

const T = [
    {
        locale: "es_AR", otro: "en_US", saltar: "Saltar al contenido", ultima: "Última actualización", enEstaPagina: "En esta página", lo: "Lo importante, en corto",
        descargar: "Descargar", idiomaEtiqueta: "Idioma / Language", tema: "Cambiar entre claro y oscuro", principal: "Páginas", inicio: "Inicio", lema: "Tu día y el de tu gente, en un solo lugar. Hecha en Argentina.",
        pie1: "Teire", pie2: "Comparar", pie3: "Legal", abrirNavegador: "Abrir en el navegador", anteriores: "Versiones anteriores", reportar: "Reportar un problema",
        aviso: "",
    },
    {
        locale: "en_US", otro: "es_AR", saltar: "Skip to content", ultima: "Last updated", enEstaPagina: "On this page", lo: "The short version",
        descargar: "Download", idiomaEtiqueta: "Idioma / Language", tema: "Switch between light and dark", principal: "Pages", inicio: "Home", lema: "Your day and your people's, all in one place. Made in Argentina.",
        pie1: "Teire", pie2: "Compare", pie3: "Legal", abrirNavegador: "Open in your browser", anteriores: "Previous versions", reportar: "Report a problem",
        aviso: "Courtesy translation. Teire is run from Argentina and these texts are governed by Argentine law: if the English and the Spanish versions differ, the Spanish version prevails.",
    },
];

const LOGO = `<svg viewBox="70 80 340 340" aria-hidden="true"><path d="M226 142 V338 a56 56 0 0 0 56 56 h24" fill="none" stroke="currentColor" stroke-width="56" stroke-linecap="round" stroke-linejoin="round"/><path d="M154 242 H312" fill="none" stroke="currentColor" stroke-width="56" stroke-linecap="round"/><path d="M368 104 C372 170 338 214 280 214 C276 148 312 108 368 104Z" fill="#5FD4A0"/></svg>`;

const enlaces = (html, i) =>
    html
        .replace(/\{\{pagina:([a-z-]+)\}\}/g, (_, id) => {
            const p = PAGINAS.find((x) => x.id === id);
            if (!p) throw new Error(`Link a una página que no existe: ${id}`);
            return ruta(p, i);
        })
        .replaceAll("{{home}}", home(i));

const armar = (p, i) => {
    const t = T[i];
    const url = SITIO + ruta(p, i);
    const par = SITIO + ruta(p, 1 - i);
    const titulo = p.titulo[i], descripcion = p.descripcion[i], h1 = p.h1[i];
    const secciones = p.secciones.map(([id, tit, cuerpo]) => ({ id, titulo: tit[i], html: enlaces(cuerpo[i], i) }));
    const indice = secciones.map((s) => `<li><a href="#${s.id}">${esc(sinEtiquetas(s.titulo))}</a></li>`).join("");
    const cuerpo = secciones.map((s) => `<section id="${s.id}" aria-labelledby="t-${s.id}"><h2 id="t-${s.id}">${s.titulo}</h2>${s.html}</section>`).join("\n");
    const resumen = p.resumen.map((r) => `<li>${r[i]}</li>`).join("");
    const migas = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Teire", item: SITIO + home(i) },
        { "@type": "ListItem", position: 2, name: h1, item: url },
    ] };
    const nav = PAGINAS.filter((x) => ["privacidad", "terminos", "arrepentimiento", "iphone"].includes(x.id))
        .map((x) => `<a href="${ruta(x, i)}"${x.id === p.id ? ' aria-current="page"' : ""}>${x.nav[i]}</a>`).join("");
    const pie = (id) => PAGINAS.find((x) => x.id === id);
    const link = (id) => `<a href="${ruta(pie(id), i)}">${pie(id).nav[i]}</a>`;
    return `<!doctype html>
<html lang="${LANGS[i]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${LANGS[i]}" href="${url}">
<link rel="alternate" hreflang="${LANGS[1 - i]}" href="${par}">
<link rel="alternate" hreflang="x-default" href="${SITIO + ruta(p, 0)}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0B0B0C">
<meta property="og:type" content="article">
<meta property="og:locale" content="${t.locale}">
<meta property="og:locale:alternate" content="${t.otro}">
<meta property="og:site_name" content="Teire">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITIO}/img/${i === 0 ? "compartir" : "compartir-en"}.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/icono.svg" type="image/svg+xml">
<link rel="icon" href="/img/icono-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/img/icono-180.png">
<link rel="preload" href="/assets/fuentes/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fuentes/material-symbols-rounded.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/paginas.css">
<script>try{if(localStorage.getItem('tema-sitio')==='oscuro')document.documentElement.dataset.tema='oscuro'}catch(e){}</script>
<script type="application/ld+json">${JSON.stringify(migas).replace(/</g, "\\u003c")}</script>
</head>
<body>
<a class="saltar" href="#contenido">${t.saltar}</a>
<header class="nav">
  <div class="ancho">
    <a class="logo" href="${home(i)}" aria-label="Teire, ${t.inicio.toLowerCase()}">${LOGO}teire</a>
    <nav aria-label="${t.principal}">${nav}</nav>
    <button class="tema" id="tema" aria-label="${t.tema}"><i class="mi">dark_mode</i></button>
    <div class="idioma" role="group" aria-label="${t.idiomaEtiqueta}"><a href="${ruta(p, 0)}" hreflang="es" lang="es" data-lang="es"${i === 0 ? ' aria-current="true"' : ""}>ES</a><a href="${ruta(p, 1)}" hreflang="en" lang="en" data-lang="en"${i === 1 ? ' aria-current="true"' : ""}>EN</a></div>
    <a class="btn p chico" href="${home(i)}#descargar">${t.descargar}</a>
  </div>
</header>
<main id="contenido" class="legal">
  <div class="ancho">
    <nav class="legal-indice" aria-label="${t.enEstaPagina}"><p>${t.enEstaPagina}</p><ol>${indice}</ol></nav>
    <article class="legal-texto">
      <h1>${h1}</h1>
      <p class="fecha">${t.ultima}: ${FECHA[i]}</p>${p.legal && t.aviso ? `\n      <p class="aviso-idioma"><span>${t.aviso} <a href="${ruta(p, 0)}" hreflang="es" lang="es">Read the Spanish version</a>.</span></p>` : ""}
      <div class="resumen"><h2>${t.lo}</h2><ul>${resumen}</ul></div>
${cuerpo}
    </article>
  </div>
</main>
<footer><div class="ancho">
  <div><a class="logo" href="${home(i)}">${LOGO}teire</a><p style="margin-top:10px;max-width:26ch">${t.lema}</p></div>
  <div><h4>${t.pie1}</h4><a href="${home(i)}#funciones">${i === 0 ? "Funciones" : "Features"}</a><a href="${home(i)}#espacio">${i === 0 ? "Espacio" : "Space"}</a><a href="${home(i)}#premium">Premium</a><a href="/app/">${t.abrirNavegador}</a></div>
  <div><h4>${t.pie2}</h4>${link("alternativa-google-keep")}${link("notas-compartidas")}${link("iphone")}</div>
  <div><h4>${t.pie3}</h4>${link("privacidad")}${link("terminos")}${link("arrepentimiento")}</div>
  <div class="ult">© 2026 Teire · useteire.app · <a href="https://github.com/codewtato/${repo[i]}/releases">${t.anteriores}</a> · <a href="https://github.com/codewtato/${repo[i]}/issues">${t.reportar}</a></div>
</div></footer>
<script>
(() => {
  const raiz = document.documentElement, boton = document.getElementById('tema');
  const pintar = () => { boton.firstElementChild.textContent = raiz.dataset.tema === 'oscuro' ? 'light_mode' : 'dark_mode'; };
  boton.addEventListener('click', () => {
    raiz.dataset.tema = raiz.dataset.tema === 'oscuro' ? '' : 'oscuro';
    try { localStorage.setItem('tema-sitio', raiz.dataset.tema === 'oscuro' ? 'oscuro' : 'claro'); } catch (e) {}
    pintar();
  });
  pintar();
  document.querySelectorAll('.idioma a').forEach((a) => a.addEventListener('click', () => { try { localStorage.setItem('idioma-sitio', a.dataset.lang); } catch (e) {} }));
})();
</script>
</body>
</html>
`;
};

for (const p of PAGINAS) {
    for (const i of [0, 1]) {
        const carpeta = join(docs, ...ruta(p, i).split("/").filter(Boolean));
        mkdirSync(carpeta, { recursive: true });
        writeFileSync(join(carpeta, "index.html"), armar(p, i));
    }
}

// Mapa del sitio: cada página con su par en el otro idioma.
const prioridad = { privacidad: "0.4", terminos: "0.4", arrepentimiento: "0.3", iphone: "0.7", "notas-compartidas": "0.8", "alternativa-google-keep": "0.7" };
const entrada = (es, en, prio) => [es, en].map((u, k) => `  <url><loc>${SITIO}${u}</loc><lastmod>${FECHA_ISO}</lastmod><priority>${prio}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${SITIO}${es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITIO}${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITIO}${es}"/>
  </url>`).join("\n");
writeFileSync(join(docs, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entrada("/", "/en/", "1.0")}
${PAGINAS.map((p) => entrada(ruta(p, 0), ruta(p, 1), prioridad[p.id] ?? "0.5")).join("\n")}
</urlset>
`);
console.log(`Listo: ${PAGINAS.length * 2} páginas y docs/sitemap.xml.`);
