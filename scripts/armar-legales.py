# Uso: python3 scripts/armar-legales.py
# Arma docs/privacidad, docs/terminos y docs/arrepentimiento con la misma barra, pie y SEO.
import json, pathlib, re

DOCS = pathlib.Path(__file__).resolve().parent.parent / "docs"
BASE = "https://useteire.app/"
FECHA = "4 de noviembre de 2026"
CORREO = '<a href="mailto:codewtato@gmail.com">codewtato@gmail.com</a>'
EDAD_MINIMA = '13'
CORREO_ARREPENTIMIENTO = '<a href="mailto:codewtato@gmail.com?subject=Arrepentimiento">codewtato@gmail.com</a>'

SIMBOLOS = """<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="logo" viewBox="0 0 512 512"><rect x="20" y="20" width="472" height="472" rx="118" fill="#151D1A" stroke="#28332E" stroke-width="10"/><path d="M226 142 V338 a56 56 0 0 0 56 56 h24" fill="none" stroke="#F4EFE6" stroke-width="56" stroke-linecap="round" stroke-linejoin="round"/><path d="M154 242 H312" fill="none" stroke="#F4EFE6" stroke-width="56" stroke-linecap="round"/><path d="M368 104 C372 170 338 214 280 214 C276 148 312 104 368 104 Z" fill="#5FD4A0"/></symbol>
</defs></svg>"""


def pagina(ruta, titulo, descripcion, h1, resumen, secciones, actual):
    url = BASE + ruta + "/"
    indice = "".join(f'<li><a href="#{sid}">{re.sub("<[^>]+>", "", t)}</a></li>' for sid, t, _ in secciones)
    cuerpo = "".join(f'<section id="{sid}" aria-labelledby="t-{sid}"><h2 id="t-{sid}">{t}</h2>{html}</section>' for sid, t, html in secciones)
    resumen_html = "".join(f"<li>{r}</li>" for r in resumen)
    migas = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Teire", "item": BASE},
        {"@type": "ListItem", "position": 2, "name": h1, "item": url}]}
    nav = lambda r, n: f'<a href="../{r}/"{" aria-current=\"page\"" if r == actual else ""}>{n}</a>'
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{titulo}</title>
<meta name="description" content="{descripcion}">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#0F1513">
<meta property="og:type" content="article">
<meta property="og:locale" content="es_AR">
<meta property="og:site_name" content="Teire">
<meta property="og:title" content="{titulo}">
<meta property="og:description" content="{descripcion}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{BASE}img/compartir.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="../icono.svg" type="image/svg+xml">
<link rel="icon" href="../img/icono-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="../img/icono-180.png">
<link rel="preload" href="../assets/fuentes/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="../assets/teire.css">
<link rel="stylesheet" href="../assets/legal.css">
<script type="application/ld+json">{json.dumps(migas, ensure_ascii=False)}</script>
</head>
<body>
<a class="saltar" href="#contenido">Saltar al contenido</a>
{SIMBOLOS}
<header class="barra siempre" id="barra">
  <div class="barra-fondo"></div>
  <div class="ancho">
    <a class="marca" href="../" aria-label="Teire, inicio"><svg aria-hidden="true"><use href="#logo"/></svg>teire</a>
    <nav aria-label="Páginas">{nav("privacidad", "Privacidad")}{nav("terminos", "Términos")}{nav("arrepentimiento", "Arrepentimiento")}{nav("iphone", "iPhone")}</nav>
    <a class="boton boton-chico" data-descargar href="https://github.com/codewtato/teire-descargas/releases/latest">Descargar</a>
  </div>
</header>
<main id="contenido" class="legal">
  <div class="ancho">
    <nav class="legal-indice" aria-label="En esta página"><p>En esta página</p><ol>{indice}</ol></nav>
    <article class="legal-texto">
      <h1>{h1}</h1>
      <p class="fecha">Última actualización: {FECHA}</p>
      <div class="resumen"><h2>Lo importante, en corto</h2><ul>{resumen_html}</ul></div>
      {cuerpo}
    </article>
  </div>
</main>
<footer class="pie">
  <div class="ancho">
    <a class="marca" href="../"><svg aria-hidden="true"><use href="#logo"/></svg>teire</a>
    <p class="lema">Cuidá lo tuyo.</p>
    <nav aria-label="Legales y ayuda">
      <a href="../notas-compartidas/">Notas compartidas</a>
      <a href="../alternativa-google-keep/">Alternativa a Google Keep</a>
      <a href="../privacidad/">Privacidad</a>
      <a href="../terminos/">Términos</a>
      <a href="https://github.com/codewtato/teire-descargas/releases">Versiones anteriores</a>
      <a href="https://github.com/codewtato/teire-descargas/issues">Reportar un problema</a>
      <a class="arrepentimiento" href="../arrepentimiento/">Botón de arrepentimiento</a>
    </nav>
    <p class="firma">© 2026 Teire. Argentina.</p>
  </div>
</footer>
<script src="../assets/vendor/lenis.min.js" defer></script>
<script src="../assets/comun.js" defer></script>
</body>
</html>
"""


# ---------------------------------------------------------------- Privacidad
privacidad = [
    ("quien", "Quién cuida tus datos", f"""
<p>Teire es una app hecha por <strong>Matías D'Agostino</strong>, un creador independiente de Argentina. Él es el responsable de los datos que se guardan cuando usás Teire con una cuenta. Para cualquier consulta sobre tus datos, escribí a {CORREO}.</p>
<p>Esta política vale para la app de Teire (Windows, Linux, Android e iPhone) y para este sitio.</p>"""),
    ("sin-cuenta", "Si usás Teire sin cuenta", """
<p>Podés usar Teire sin crear una cuenta. En ese caso <strong>tus notas quedan solo en tu equipo</strong> y no se mandan a ningún servidor nuestro. Si desinstalás la app o borrás sus datos, esas notas se pierden.</p>
<p>Algunas funciones necesitan una cuenta y no se usan sin ella: compartir, la Mesa, el chat, la Comunidad, Teire IA y la burbuja.</p>"""),
    ("con-cuenta", "Qué guardamos si tenés cuenta", """
<p>Para que tus cosas estén en todos tus dispositivos y las puedas compartir, guardamos en nuestros servidores:</p>
<ul>
<li><strong>Tu cuenta:</strong> tu correo, tu nombre de usuario, tu nombre visible y tu foto de perfil. Si entrás con Google, Discord o GitHub, ellos nos pasan tu correo y tu nombre.</li>
<li><strong>Lo que creás:</strong> notas, listas, pizarrones, categorías, recordatorios, audios, imágenes y archivos adjuntos, y los lugares que agregás a una nota.</li>
<li><strong>Guardados:</strong> los links, textos e imágenes que guardás desde la burbuja, el portapapeles o el menú Compartir.</li>
<li><strong>Tu gente:</strong> tus amigos, tus Mesas, los mensajes del chat con sus fotos, las cartas y las invitaciones que creás.</li>
<li><strong>Tu actividad en Teire:</strong> si estás en línea y tu estado (En línea, Ausente, No molestar o Invisible), la última vez que entraste y tus insignias, como la racha de conexión.</li>
<li><strong>Premium:</strong> si tenés Premium, hasta cuándo, los regalos que mandaste o recibiste y el identificador del pago que nos da Mercado Pago o PayPal. <strong>Nunca vemos ni guardamos los datos de tu tarjeta.</strong></li>
<li><strong>Tus preferencias:</strong> tema, colores, estilo de burbuja y ajustes parecidos.</li>
</ul>"""),
    ("tu-equipo", "Lo que se queda en tu equipo", """
<ul>
<li><strong>Notas con PIN:</strong> se cifran en tu equipo antes de subirse. Nosotros guardamos solo el texto cifrado y no lo podemos leer. Si te olvidás el PIN, no hay forma de recuperarlas.</li>
<li><strong>«Oye Teire»:</strong> la app reconoce esas palabras en tu compu, sin mandar audio a ningún lado. Solo cuando la escucha (o cuando apretás Ctrl K) graba lo que pedís y lo manda a Teire IA.</li>
<li><strong>Burbuja, portapapeles y capturas:</strong> Teire mira en tu compu si copiaste un link o sacaste una captura para ofrecerte guardarla. No se manda nada hasta que tocás Guardar.</li>
<li><strong>Archivos que arrastrás a una nota:</strong> salvo las imágenes, no se suben. Queda solo el nombre del archivo.</li>
</ul>"""),
    ("para-que", "Para qué usamos tus datos", """
<ul>
<li>Para que la app funcione: guardar y sincronizar tus cosas, compartirlas con quien elijas y mandarte los avisos que pediste.</li>
<li>Para cobrar Premium y entregar los regalos.</li>
<li>Para cuidar Teire: evitar abusos y spam, y poner límites diarios de uso, por ejemplo a los pedidos a Teire IA.</li>
<li>Para contestarte cuando nos escribís desde Ayuda.</li>
</ul>
<p><strong>No mostramos publicidad, no vendemos tus datos y no usamos herramientas de analítica ni de seguimiento</strong>, ni en la app ni en este sitio.</p>"""),
    ("terceros", "Con quién se comparten", """
<p>Para funcionar, Teire usa algunos servicios de otras empresas. Cada uno recibe solo lo que necesita:</p>
<div class="tabla-marco"><table>
<thead><tr><th>Servicio</th><th>Para qué</th><th>Qué recibe</th></tr></thead>
<tbody>
<tr><td>Supabase</td><td>La base de datos, las cuentas y los archivos.</td><td>Todo lo que se guarda con tu cuenta. Sus servidores pueden estar fuera de Argentina.</td></tr>
<tr><td>Google Gemini</td><td>Teire IA, la voz con la que te contesta y los títulos automáticos de los links que compartís.</td><td>Lo que le pedís (el audio o el texto) y, para los títulos, la vista previa pública del link. Pasa por nuestro servidor: Google no recibe tu correo.</td></tr>
<tr><td>Firebase (Google)</td><td>Los avisos en Android.</td><td>Un identificador de tu celular y el aviso.</td></tr>
<tr><td>Apple</td><td>Los avisos en iPhone.</td><td>Un identificador de tu celular y el aviso cifrado, que Apple no puede leer.</td></tr>
<tr><td>Mercado Pago y PayPal</td><td>Cobrar Premium y los regalos.</td><td>Los datos del pago, que cargás directamente en sus páginas.</td></tr>
<tr><td>Google, Discord y GitHub</td><td>Entrar con esas cuentas, si lo elegís.</td><td>Que elegiste entrar a Teire con esa cuenta.</td></tr>
<tr><td>Photon (komoot) y OpenStreetMap</td><td>Buscar lugares y mostrar el mapa en una nota.</td><td>Lo que buscás y la zona del mapa.</td></tr>
<tr><td>GitHub</td><td>Las descargas, las actualizaciones y este sitio.</td><td>Tu dirección IP al bajar o actualizar la app.</td></tr>
</tbody></table></div>
<p><strong>Sobre Teire IA:</strong> hoy usamos el plan gratuito de Gemini. En ese plan, Google puede revisar y usar lo que se le manda para mejorar sus productos. No le pidas a Teire IA nada que no quieras que lea otra persona.</p>
<p>Además, compartimos datos si una ley o una autoridad competente nos lo exige.</p>"""),
    ("otros", "Lo que ven otras personas", """
<ul>
<li>Tu nombre de usuario, tu foto, tus insignias y tu estado los ven tus amigos y quienes comparten una Mesa con vos.</li>
<li>Una nota compartida la ven y la editan las personas con las que la compartiste, y ven quién está escribiendo.</li>
<li><strong>La Comunidad es pública:</strong> lo que dibujás en el lienzo lo ve cualquiera con cuenta, y aparece que participaste.</li>
<li>Los mensajes del chat y de la Mesa los ven quienes están en esa conversación.</li>
</ul>"""),
    ("tiempo", "Cuánto tiempo los guardamos", f"""
<p>Guardamos tus datos mientras tengas tu cuenta. Las notas que borrás van a la papelera hasta que las borrás del todo.</p>
<p>Si pedís que borremos tu cuenta, borramos tus datos en un plazo de 30 días. Solo guardamos lo que la ley nos obligue a conservar, como los comprobantes de pago. Mientras sumamos el botón para borrar la cuenta desde la app, lo podés pedir escribiendo a {CORREO}.</p>"""),
    ("derechos", "Tus derechos", f"""
<p>Por la Ley 25.326 de Protección de los Datos Personales, podés pedirnos <strong>ver, corregir, actualizar o borrar</strong> tus datos, gratis. Escribinos a {CORREO}. Si pedís verlos, te contestamos en un máximo de 10 días corridos; si pedís corregirlos o borrarlos, en un máximo de 5 días hábiles.</p>
<p>El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326. La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.</p>"""),
    ("seguridad", "Cómo los cuidamos", """
<p>Las conexiones van cifradas, cada persona solo puede leer lo suyo y lo que le compartieron (las reglas de la base de datos lo controlan), y las claves de los servicios viven en el servidor, nunca en la app. Ningún sistema es perfecto: si pasa algo que afecte tus datos, te vamos a avisar.</p>"""),
    ("menores", "Menores de edad", f"""
<p>Teire no está pensada para menores de {EDAD_MINIMA} años. Si sos menor de 18, usala con el permiso de tus padres o de un adulto responsable.</p>"""),
    ("sitio", "Este sitio", """
<p>Este sitio no usa cookies ni analíticas. Las fuentes y las animaciones están alojadas acá mismo. Para mostrarte la última versión, la página le pregunta a GitHub cuál es, y la página para entrar a una Mesa consulta a Supabase qué Mesa es. GitHub, que aloja el sitio, puede registrar tu dirección IP.</p>"""),
    ("cambios", "Si esta política cambia", f"""
<p>Si cambiamos algo importante, te avisamos en la app antes de que empiece a valer, y actualizamos la fecha de arriba. Si tenés dudas, escribinos a {CORREO}.</p>"""),
]

terminos = [
    ("acuerdo", "El acuerdo", f"""
<p>Estos términos son el acuerdo entre vos y <strong>Matías D'Agostino</strong>, el creador de Teire, para usar la app y este sitio. Al usar Teire los aceptás. Si no estás de acuerdo, no la uses.</p>
<p>Cómo tratamos tus datos está explicado en la <a href="../privacidad/">política de privacidad</a>, que es parte de este acuerdo.</p>"""),
    ("cuenta", "Tu cuenta", f"""
<ul>
<li>Para crear una cuenta tenés que tener al menos {EDAD_MINIMA} años. Si sos menor de 18, necesitás el permiso de tus padres o de un adulto responsable.</li>
<li>Cuidá tu contraseña y tu acceso. Lo que se haga desde tu cuenta es tu responsabilidad.</li>
<li>Tu nombre de usuario no puede hacerse pasar por otra persona ni ser ofensivo.</li>
</ul>"""),
    ("contenido", "Lo que escribís es tuyo", """
<p>Tus notas, dibujos, mensajes y todo lo que subís siguen siendo tuyos. Para que Teire funcione, nos das permiso para guardarlo, copiarlo entre tus dispositivos y mostrárselo a las personas con las que lo compartís. Ese permiso termina cuando lo borrás o borrás tu cuenta, salvo lo que otros ya hayan copiado.</p>
<p>Lo que dibujás en la Comunidad queda en un lienzo compartido: otras personas lo pueden tapar o dibujar encima, y puede seguir visible aunque borres tu cuenta.</p>"""),
    ("uso", "Lo que no se puede hacer", """
<ul>
<li>Subir o compartir contenido ilegal, violento, sexual con menores, que incite al odio o que viole los derechos de otros.</li>
<li>Acosar, amenazar o mandar spam, en el chat, en la Mesa o en la Comunidad.</li>
<li>Intentar entrar a cuentas o datos ajenos, romper los límites de uso o atacar los servidores.</li>
<li>Usar Teire para algo que la ley prohíba.</li>
</ul>
<p>Si alguien no cumple estas reglas, podemos borrar ese contenido y suspender o cerrar su cuenta. Si ves algo así, avisanos desde Ayuda.</p>"""),
    ("ia", "Teire IA", """
<p>Teire IA usa inteligencia artificial y <strong>se puede equivocar</strong>: revisá lo que crea, sobre todo fechas y recordatorios. Antes de compartir algo o mandar un mensaje por vos, siempre te pide confirmar. Tiene un límite de pedidos por día, más alto con Premium.</p>"""),
    ("premium", "Teire Premium", """
<ul>
<li><strong>Precio:</strong> el que ves en la app antes de pagar, en pesos con Mercado Pago o en dólares con PayPal.</li>
<li><strong>Renovación:</strong> Premium es una suscripción mensual que se renueva sola hasta que la canceles.</li>
<li><strong>Cancelar:</strong> lo podés hacer cuando quieras desde la sección Premium de la app. Seguís teniendo Premium hasta el final del período que ya pagaste.</li>
<li><strong>Regalos:</strong> regalar Premium por 1, 3, 6 o 12 meses es un pago único que no se renueva.</li>
<li><strong>Arrepentimiento:</strong> tenés 10 días corridos desde que pagás para arrepentirte, sin dar motivos, y te devolvemos todo. Se hace desde el <a href="../arrepentimiento/">Botón de arrepentimiento</a>.</li>
<li>Si cambia el precio, te avisamos antes de la próxima renovación.</li>
</ul>"""),
    ("servicio", "Cómo funciona el servicio", """
<p>Teire es gratis y la hace una sola persona. Hacemos lo posible para que ande siempre, pero puede haber cortes, errores o cambios. Podemos sumar, cambiar o sacar funciones. Si sacamos algo de Premium, te avisamos antes.</p>
<p>Teire se ofrece tal como está. Hasta donde la ley lo permite, no respondemos por daños indirectos ni por pérdidas de datos. Por eso, si algo es muy importante, guardá una copia aparte. Nada de esto limita los derechos que te da la Ley 24.240 de Defensa del Consumidor.</p>"""),
    ("baja", "Dejar de usar Teire", f"""
<p>Podés dejar de usar Teire cuando quieras. Para borrar tu cuenta y tus datos, escribinos a {CORREO} (pronto lo vas a poder hacer desde la app). Si tenés Premium, cancelalo antes para que no se renueve.</p>"""),
    ("ley", "Ley y contacto", f"""
<p>Este acuerdo se rige por las leyes de la República Argentina. Si cambiamos algo importante, te avisamos en la app antes de que empiece a valer. Para cualquier consulta, escribinos a {CORREO}.</p>"""),
]

arrepentimiento = [
    ("que-es", "Qué es", """
<p>Si pagaste Teire Premium o un regalo de Premium, tenés <strong>10 días corridos</strong> desde el pago para arrepentirte. No tenés que dar ningún motivo y no te cuesta nada: te devolvemos todo lo que pagaste. Es un derecho que te da la Ley 24.240 de Defensa del Consumidor, y este botón está acá por la Resolución 424/2020.</p>"""),
    ("como", "Cómo pedirlo", f"""
<ol class="pasos-arrepentimiento">
<li><span><strong>Escribinos a {CORREO_ARREPENTIMIENTO}</strong> con el asunto «Arrepentimiento». Contanos tu nombre de usuario en Teire, la fecha del pago y si pagaste con Mercado Pago o con PayPal.</span></li>
<li><span><strong>En menos de 24 horas te mandamos un código de trámite</strong>, para que puedas seguir tu pedido.</span></li>
<li><span><strong>Te devolvemos el dinero por el mismo medio con el que pagaste</strong>, y cancelamos la suscripción para que no se vuelva a cobrar.</span></li>
</ol>"""),
    ("cancelar", "Si solo querés que no se renueve", """
<p>Si pasaron más de 10 días o solo querés que no se cobre el mes que viene, cancelá la suscripción desde la sección Premium de la app. Seguís teniendo Premium hasta el final del período que ya pagaste.</p>"""),
]

# --- Guía de iPhone ---
FUNCION_GUARDAR = "https://zggniboficpdfqvbpexu.supabase.co/functions/v1/noty-guardar"

iphone = [
    ("instalar", "Instalala en tres toques", """
<p class="copiar"><a class="boton" href="../app/">Abrir Teire en Safari</a></p>
<ol class="pasos-arrepentimiento">
<li><span><strong>Abrí Teire en Safari</strong> desde el botón de arriba. Si este link te abrió otro navegador, copialo y pegalo en Safari: <code>useteire.app/app</code></span></li>
<li><span>Tocá <strong>Compartir</strong> (el cuadradito con la flecha para arriba). En los iOS nuevos puede estar adentro del botón <strong>···</strong>.</span></li>
<li><span>Bajá y tocá <strong>Agregar a Inicio</strong>, y después <strong>Agregar</strong>.</span></li>
<li><span>Cerrá Safari y abrí <strong>Teire desde su ícono</strong>. Listo: ya funciona como cualquier app.</span></li>
</ol>"""),
    ("cuenta", "Entrá a tu cuenta", """
<p><strong>Iniciá sesión desde el ícono, no desde Safari.</strong> iOS separa las dos cosas: si entrás en Safari, la app instalada no se entera.</p>
<p>Si ya tenés cuenta con correo, entrá como siempre. Tus notas, amigos y chats están ahí.</p>
<p><strong>¿Entrás con Google, Discord o GitHub?</strong> En iPhone esos botones no están, porque te sacarían de la app. Tocá <strong>«Entrá con un código por correo»</strong>, poné el correo de esa cuenta y elegí una contraseña. Es la misma cuenta y vas a seguir pudiendo entrar con Google en tus otros equipos.</p>"""),
    ("notificaciones", "Prendé las notificaciones", """
<p>La primera vez que entres, Teire te va a preguntar si querés activarlas. Tocá <strong>Activar</strong> y después <strong>Permitir</strong>. Te avisan de mensajes, notas que te comparten y recordatorios, aunque la app esté cerrada.</p>
<p>Si dijiste «Ahora no», las activás desde <strong>Perfil → Notificaciones</strong>. Necesitás iOS 16.4 o más nuevo.</p>"""),
    ("guardar", "Guardá links", """
<p>En iPhone, Teire no puede mirar lo que copiaste por su cuenta. Lo más simple es esto:</p>
<ol class="pasos-arrepentimiento">
<li><span>Copiá el link desde Instagram, TikTok o donde sea.</span></li>
<li><span>Abrí Teire y andá a <strong>Guardados</strong>.</span></li>
<li><span>Tocá <strong>Pegar</strong> y confirmá en el globito que muestra el iPhone.</span></li>
</ol>"""),
    ("atajo", "Guardá desde Compartir, sin abrir Teire", """
<p>Es opcional y se arma una sola vez. Después, desde cualquier app tocás <strong>Compartir → Guardar en Teire</strong> y queda guardado. Necesitás una cuenta y la app <strong>Atajos</strong>, que viene con el iPhone.</p>
<ol class="pasos-arrepentimiento">
<li><span>En Teire, andá a <strong>Perfil → Guardar desde otras apps</strong>, tocá <strong>Generar código</strong> y copialo. No se lo pases a nadie.</span></li>
<li><span>Abrí <strong>Atajos</strong>, tocá <strong>+</strong> y ponele de nombre <strong>Guardar en Teire</strong>.</span></li>
<li><span>Agregá la acción <strong>Obtener contenido de URL</strong> y pegá esta dirección:<br><code>""" + FUNCION_GUARDAR + """</code></span></li>
<li><span>Tocá la flecha de esa acción y elegí método <strong>POST</strong> y cuerpo de la solicitud <strong>JSON</strong>.</span></li>
<li><span>Agregá un campo de texto con clave <code>codigo</code> y pegá tu código como valor.</span></li>
<li><span>Agregá otro campo de texto con clave <code>link</code> y, como valor, elegí la variable <strong>Entrada del atajo</strong>.</span></li>
<li><span>Agregá la acción <strong>Mostrar notificación</strong> y poné <strong>Contenido de la URL</strong> como texto. Así ves si se guardó.</span></li>
<li><span>Tocá el ícono de información del atajo y prendé <strong>Mostrar en la hoja para compartir</strong>. Guardalo.</span></li>
</ol>
<p>Los nombres pueden variar un poco según tu versión de iOS. Si cambiás de código en Teire, actualizalo también en el atajo.</p>"""),
    ("diferencias", "Qué cambia en iPhone", """
<ul>
<li><strong>Todo lo importante está:</strong> notas, listas, pizarrones, recordatorios, Guardados, amigos, chat, Mesa y Premium.</li>
<li><strong>Se actualiza sola:</strong> cuando hay una versión nueva, la app la toma al abrirla con internet.</li>
<li><strong>No hay burbuja ni voz de Teire IA:</strong> la burbuja es de Windows y la voz, de escritorio.</li>
<li><strong>No aparece sola en Compartir:</strong> iOS no lo permite en las apps instaladas desde Safari. Por eso existe el atajo.</li>
<li><strong>No hay aviso al copiar:</strong> en Android Teire te ofrece guardar lo que copiaste. En iPhone tocás Pegar.</li>
</ul>"""),
    ("problemas", "Si algo no anda", """
<ul>
<li><strong>No veo «Agregar a Inicio».</strong> Asegurate de estar en Safari. En la lista de Compartir, bajá hasta el final o tocá «Editar acciones».</li>
<li><strong>Me pide iniciar sesión de nuevo.</strong> Entraste en Safari. Abrí Teire desde el ícono e iniciá sesión ahí.</li>
<li><strong>No me llegan las notificaciones.</strong> Fijate en Ajustes del iPhone → Notificaciones → Teire, y que el modo Concentración no las esté frenando.</li>
<li><strong>El atajo dice que el código no vale.</strong> Generá uno nuevo en Teire y pegalo en el atajo.</li>
<li><strong>Sigue sin andar.</strong> Escribinos desde Ayuda, adentro de la app, o a {CORREO}.</li>
</ul>""".replace("{CORREO}", CORREO)),
]

# --- Páginas para buscadores ---
BOTONES = """<p class="copiar"><a class="boton" href="../#descargar">Bajá Teire gratis</a> <a class="boton" href="../app/">Usala en el navegador</a></p>"""

notas_compartidas = [
    ("en-vivo", "Escriban en la misma nota, al mismo tiempo", """
<p>Compartí una nota con un amigo por su <code>@usuario</code> y mirá cómo escribe, letra por letra. No hay que recargar nada ni mandarse versiones por WhatsApp: lo que cambia uno lo ven todos.</p>
""" + BOTONES),
    ("listas", "Listas que se completan entre todos", """
<p>La lista del súper, lo que hay que llevar al viaje, las tareas de la casa. Cada uno tilda lo suyo desde su celular o su compu, y cada tarjeta te muestra cuánto falta.</p>"""),
    ("pizarrones", "Pizarrones para pensar juntos", """
<p>Un pizarrón es un lienzo a pantalla completa. Ves lo que dibujan los demás mientras lo dibujan: sirve para armar un plano, un esquema o explicar algo sin escribir tres párrafos.</p>"""),
    ("mesa", "Un lugar para tu grupo: la Mesa", """
<p>La Mesa junta en un solo lugar a quién está en línea, un pizarrón en vivo, el chat y todo lo que comparten. Podés invitar a quien quieras con un link o un código, aunque todavía no sea tu amigo en Teire.</p>"""),
    ("como", "Cómo compartir una nota", """
<ol class="pasos-arrepentimiento">
<li><span><strong>Instalá Teire o abrila en el navegador</strong> y creá tu cuenta gratis.</span></li>
<li><span><strong>Agregá a tu amigo</strong> por su <code>@usuario</code>.</span></li>
<li><span><strong>Abrí una nota y compartila.</strong> Desde ese momento la editan los dos.</span></li>
</ol>"""),
    ("donde", "Funciona donde estés", """
<p>Teire está para <strong>Windows, Android, iPhone y Linux</strong>, y también se usa desde el navegador sin instalar nada. Funciona sin internet y sube todo cuando vuelve la conexión. En iPhone se instala desde Safari: <a href="../iphone/">mirá la guía</a>.</p>"""),
    ("privado", "Tus notas siguen siendo tuyas", """
<p>Teire no tiene publicidad y no vende datos. Las notas con PIN se cifran en tu dispositivo antes de subirse: ni el servidor las puede leer. Lo que no compartís no lo ve nadie más. El detalle está en la <a href="../privacidad/">política de privacidad</a>.</p>"""),
]

alternativa_keep = [
    ("que-suma", "Lo que suma Teire", """
<ul>
<li><strong>Notas y listas en vivo:</strong> ves cómo escriben tus amigos, letra por letra.</li>
<li><strong>Pizarrones a pantalla completa:</strong> dibujan entre varios y se ve mientras lo hacen.</li>
<li><strong>La Mesa:</strong> un lugar para tu grupo, con chat, pizarrón y lo que comparten.</li>
<li><strong>Guardados:</strong> reels, links, textos y capturas, agrupados por día y aparte de tus notas.</li>
<li><strong>La burbuja en Windows:</strong> le soltás un link o una foto desde cualquier programa y queda guardado.</li>
<li><strong>Notas con PIN:</strong> se cifran en tu dispositivo, y ni el servidor las puede leer.</li>
<li><strong>Sin publicidad:</strong> todo lo importante es gratis y Premium es opcional.</li>
</ul>
""" + BOTONES),
    ("donde", "Dónde la podés usar", """
<p>Hay app para <strong>Windows, Android y Linux</strong>, se instala en <a href="../iphone/">iPhone desde Safari</a> y también funciona en el navegador. Con una cuenta gratis, tus notas se sincronizan entre todos tus dispositivos.</p>"""),
    ("antes", "Lo que tenés que saber antes de cambiarte", """
<ul>
<li><strong>Todavía no hay importador.</strong> Tus notas de Keep se pasan a mano, copiando y pegando. Si tenés cientos, arrancá con las que usás.</li>
<li><strong>En iPhone no pasa por la App Store.</strong> Se instala desde Safari en tres toques.</li>
<li><strong>La burbuja es solo para Windows</strong> y la voz de Teire IA, para la app de escritorio.</li>
<li><strong>Teire es un proyecto independiente</strong> hecho en Argentina, no una empresa grande.</li>
</ul>"""),
    ("keep", "Cuándo te conviene seguir con Keep", """
<p>Si vivís adentro de Google y pasás tus notas a Docs todo el tiempo, Keep ya está integrada con esos servicios. Si lo que buscás es compartir con tu gente, armar listas en vivo y tener un lugar para tu grupo, Teire está hecha para eso.</p>
<p>Google Keep es una marca de Google. Teire no tiene relación con Google.</p>"""),
]

ARCHIVOS = {
    "privacidad": pagina("privacidad", "Política de privacidad · Teire",
        "Qué datos guarda Teire, para qué los usa y con quién se comparten. Sin publicidad, sin analíticas y sin venta de datos.",
        "Política de privacidad",
        ["Sin cuenta, tus notas quedan solo en tu equipo.",
         "Con cuenta, guardamos lo necesario para sincronizar y compartir.",
         "No hay publicidad, analíticas ni venta de datos.",
         "Las notas con PIN se cifran en tu equipo: no las podemos leer.",
         "Lo que le pedís a Teire IA lo procesa Google Gemini."],
        privacidad, "privacidad"),
    "terminos": pagina("terminos", "Términos y condiciones · Teire",
        "Las reglas para usar Teire: tu cuenta, tu contenido, lo que no se puede hacer, Teire IA y cómo funciona Teire Premium.",
        "Términos y condiciones",
        ["Lo que escribís es tuyo.",
         "Nada ilegal, nada de acoso ni spam.",
         "Teire IA se puede equivocar: revisá lo que crea.",
         "Premium se renueva cada mes y lo cancelás cuando quieras.",
         "Tenés 10 días para arrepentirte de un pago."],
        terminos, "terminos"),
    "arrepentimiento": pagina("arrepentimiento", "Botón de arrepentimiento · Teire",
        "Cómo arrepentirte de un pago de Teire Premium dentro de los 10 días y recibir la devolución completa.",
        "Botón de arrepentimiento",
        ["Tenés 10 días corridos desde el pago.",
         "No tenés que dar motivos.",
         "Te devolvemos todo por el mismo medio de pago."],
        arrepentimiento, "arrepentimiento"),
    "iphone": pagina("iphone", "Teire en iPhone: cómo instalarla · Teire",
        "Cómo instalar Teire en tu iPhone desde Safari, gratis y sin App Store: los pasos, las notificaciones y cómo guardar links.",
        "Teire en tu iPhone",
        ["Se instala desde Safari y es gratis, sin App Store.",
         "Iniciá sesión desde el ícono, no desde Safari.",
         "Las notificaciones se activan con un toque.",
         "Funciona desde iOS 16.4."],
        iphone, "iphone"),
    "notas-compartidas": pagina("notas-compartidas", "App de notas compartidas gratis con tus amigos · Teire",
        "Compartí notas y listas con tus amigos y editenlas en vivo, letra por letra. Teire es gratis para Windows, Android, iPhone, Linux y el navegador.",
        "Notas compartidas con tus amigos, en vivo",
        ["Editan la misma nota al mismo tiempo.",
         "Listas y pizarrones que se actualizan solos.",
         "Gratis para Windows, Android, iPhone, Linux y navegador.",
         "Sin publicidad."],
        notas_compartidas, "notas-compartidas"),
    "alternativa-google-keep": pagina("alternativa-google-keep", "Alternativa a Google Keep gratis para notas · Teire",
        "Teire es una alternativa gratis a Google Keep: notas y listas en vivo con tus amigos, pizarrones, Mesa para tu grupo y notas con PIN cifradas.",
        "Una alternativa a Google Keep",
        ["Notas, listas y pizarrones que editan juntos en vivo.",
         "Gratis y sin publicidad.",
         "Todavía no importa tus notas de Keep: se pasan a mano."],
        alternativa_keep, "alternativa-google-keep"),
}
for carpeta, html in ARCHIVOS.items():
    (DOCS / carpeta).mkdir(exist_ok=True)
    (DOCS / carpeta / "index.html").write_text(html, encoding="utf-8")
    print(carpeta, len(html))
