// Service worker de la version web de Teire (la que se instala en el iPhone). Hace dos cosas:
//   1. Guarda la app en el equipo para que abra rapido y sin internet.
//   2. Recibe las notificaciones con la app cerrada y abre el chat o la nota al tocarlas.
// vite.config.ts lo arma al compilar: completa la version y la lista de archivos. Cada compilacion que cambia
// algo da una version nueva, asi que iOS instala este archivo de nuevo y se borra el cache anterior.

const CACHE = "teire-a5ee3c0a7d45";
const ARCHIVOS = ["./","icono.svg","icono-premium.svg","icono-192.png","assets/index-eBSYsNvP.js","assets/core-CnP0-wGC.js","assets/dist-js-BHx7dW2X.js","assets/dist-js-BJq7cRup.js","assets/dist-js-BomqaD1U.js","assets/dist-js-CyU1PQwG.js","assets/dist-js-DMl-v3WQ.js","assets/dist-js-DQ9liAge.js","assets/dist-js-DqCKPdqr.js","assets/dist-js-Su2LQvQ_.js","assets/docx-preview-CTB5-OVk.js","assets/dpi-6uluxhQ3.js","assets/escritorio-DlRz8bkZ.js","assets/event-y468jsb1.js","assets/image-DJ53pUsB.js","assets/marked.esm-Dq2XIPO6.js","assets/pdf-f1s3v7bW.js","assets/pdf.worker.min-JqhN33N4.js","assets/purify.es-Dqk5qvad.js","assets/rolldown-runtime-COiEfhsA.js","assets/webview-399fVLi_.js","assets/webviewWindow-juQML1m5.js","assets/window-D0FAL2_R.js","assets/caveat-latin-400-normal-BzhAQZkN.woff","assets/caveat-latin-400-normal-D6LQsQ_v.woff2","assets/caveat-latin-600-normal-DUjB8dgm.woff","assets/caveat-latin-600-normal-zlTlWIYU.woff2","assets/index-B94wNIAi.css","assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2","assets/inter-cyrillic-wght-normal-DqGufNeO.woff2","assets/inter-greek-ext-wght-normal-DlzME5K_.woff2","assets/inter-greek-wght-normal-CkhJZR-_.woff2","assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2","assets/inter-latin-wght-normal-Dx4kXJAl.woff2","assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2","assets/material-symbols-rounded-DcjYfb3H.woff2","assets/pdf.worker.min-B5Yc7dP4.mjs","assets/playfair-display-latin-400-normal-CFtfchNt.woff2","assets/playfair-display-latin-400-normal-DHYHbkg3.woff"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll(ARCHIVOS))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((nombres) => Promise.all(nombres.filter((n) => n.startsWith("teire-") && n !== CACHE).map((n) => caches.delete(n))))
            .then(() => self.clients.claim()),
    );
});

self.addEventListener("fetch", (event) => {
    const pedido = event.request;
    if (pedido.method !== "GET" || new URL(pedido.url).origin !== location.origin) return;
    // La pagina: primero internet (asi toma la version nueva) y, sin conexion, la guardada.
    if (pedido.mode === "navigate") {
        event.respondWith(fetch(pedido).catch(() => caches.match("./")));
        return;
    }
    // Lo demas lleva un hash en el nombre: lo guardado siempre sirve.
    event.respondWith(caches.match(pedido).then((guardado) => guardado ?? fetch(pedido)));
});

const armar = (d) => {
    if (d.tipo === "mensaje") return { titulo: d.grupo ? `${d.persona} · ${d.grupo}` : d.persona, etiqueta: `chat:${d.chat}`, accion: { tipo: "mensaje", id: d.chat } };
    if (d.tipo === "nota") return { titulo: d.persona, etiqueta: `nota:${d.nota_id}`, accion: { tipo: "nota", id: d.nota_id } };
    return { titulo: `⏰ ${d.persona}`, etiqueta: `recordatorio:${d.nota_id}`, accion: { tipo: "nota", id: d.nota_id } };
};

// iOS exige mostrar una notificacion por cada push: si no, le saca el permiso a la app. Por eso se
// muestra siempre, aunque el contenido venga mal o Teire este abierta.
self.addEventListener("push", (event) => {
    let datos = {};
    try {
        datos = event.data?.json() ?? {};
    } catch {
        // sin datos legibles: va el aviso generico de abajo
    }
    const { titulo, etiqueta, accion } = datos.tipo ? armar(datos) : { titulo: "Teire", etiqueta: "teire", accion: null };
    event.waitUntil(
        self.registration.showNotification(titulo, {
            body: datos.texto ?? "Tenés algo nuevo.",
            icon: "icono-192.png",
            tag: etiqueta,
            renotify: true,
            data: { accion },
        }),
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const accion = event.notification.data?.accion ?? null;
    event.waitUntil(
        (async () => {
            const ventanas = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
            const ventana = ventanas[0];
            if (ventana) {
                await ventana.focus();
                if (accion) ventana.postMessage({ teire: "accion", accion });
                return;
            }
            // Teire estaba cerrada: la accion viaja en la direccion y la lee pushWeb.ts al abrir.
            await self.clients.openWindow(accion ? `./?accion=${encodeURIComponent(JSON.stringify(accion))}` : "./");
        })(),
    );
});
