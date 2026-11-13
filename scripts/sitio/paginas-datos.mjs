// Los textos de las páginas de abajo del sitio (privacidad, términos, arrepentimiento, iPhone, notas compartidas
// y Keep), en español y en inglés, lado a lado: cada texto es [español, inglés].
// Lo que se cambia en un idioma se cambia en el otro. Se arman con:  node scripts/sitio/armar-paginas.mjs
//
// Los links internos se escriben como {{pagina:privacidad}} y el armador los lleva a la dirección de cada idioma.
// Los textos legales son un borrador armado a partir del código: que los lea un abogado antes de darlos por buenos.

export const FECHA = ["13 de noviembre de 2026", "November 13, 2026"];
export const FECHA_ISO = "2026-11-13";
export const EDAD_MINIMA = "13";
const CORREO = '<a href="mailto:codewtato@gmail.com">codewtato@gmail.com</a>';
const CORREO_ARREPENTIMIENTO = ['<a href="mailto:codewtato@gmail.com?subject=Arrepentimiento">codewtato@gmail.com</a>', '<a href="mailto:codewtato@gmail.com?subject=Withdrawal">codewtato@gmail.com</a>'];
const FUNCION_GUARDAR = "https://zggniboficpdfqvbpexu.supabase.co/functions/v1/noty-guardar";

// Cada página: slug en cada idioma, tipo ("legal" lleva el aviso de traducción en inglés), SEO, resumen y secciones.
export const PAGINAS = [
    // ------------------------------------------------------------------ Privacidad
    {
        id: "privacidad", legal: true,
        slug: ["privacidad", "privacy"],
        nav: ["Privacidad", "Privacy"],
        titulo: ["Política de privacidad · Teire", "Privacy policy · Teire"],
        descripcion: [
            "Qué datos guarda Teire, para qué los usa y con quién se comparten. Sin publicidad, sin analíticas y sin venta de datos.",
            "What data Teire stores, what it uses it for and who it's shared with. No ads, no analytics and no selling of data.",
        ],
        h1: ["Política de privacidad", "Privacy policy"],
        resumen: [
            ["Sin cuenta, tus notas quedan solo en tu equipo.", "Without an account, your notes stay on your device only."],
            ["Con cuenta, guardamos lo necesario para sincronizar y compartir.", "With an account, we store what's needed to sync and share."],
            ["No hay publicidad, analíticas ni venta de datos.", "There are no ads, no analytics and no selling of data."],
            ["Las notas con PIN se cifran en tu equipo: no las podemos leer.", "PIN-protected notes are encrypted on your device: we can't read them."],
            ["Lo que le pedís a Teire IA lo procesa Google Gemini.", "What you ask Teire AI is processed by Google Gemini."],
        ],
        secciones: [
            ["quien", ["Quién cuida tus datos", "Who looks after your data"], [
                `<p>Teire es una app hecha por <strong>Matías D'Agostino</strong>, un creador independiente de Argentina. Él es el responsable de los datos que se guardan cuando usás Teire con una cuenta. Para cualquier consulta sobre tus datos, escribí a ${CORREO}.</p>
<p>Esta política vale para la app de Teire (Windows, Linux, Android e iPhone) y para este sitio.</p>`,
                `<p>Teire is an app made by <strong>Matías D'Agostino</strong>, an independent creator from Argentina. He is responsible for the data stored when you use Teire with an account. For any question about your data, write to ${CORREO}.</p>
<p>This policy applies to the Teire app (Windows, Linux, Android and iPhone) and to this website.</p>`]],
            ["sin-cuenta", ["Si usás Teire sin cuenta", "If you use Teire without an account"], [
                `<p>Podés usar Teire sin crear una cuenta. En ese caso <strong>tus notas quedan solo en tu equipo</strong> y no se mandan a ningún servidor nuestro. Si desinstalás la app o borrás sus datos, esas notas se pierden.</p>
<p>Algunas funciones necesitan una cuenta y no se usan sin ella: compartir, el Espacio, el chat, la Comunidad y Teire IA.</p>`,
                `<p>You can use Teire without creating an account. In that case <strong>your notes stay on your device only</strong> and aren't sent to any server of ours. If you uninstall the app or delete its data, those notes are lost.</p>
<p>Some features need an account and can't be used without one: sharing, the Space, chat, the Community and Teire AI.</p>`]],
            ["con-cuenta", ["Qué guardamos si tenés cuenta", "What we store if you have an account"], [
                `<p>Para que tus cosas estén en todos tus dispositivos y las puedas compartir, guardamos en nuestros servidores:</p>
<ul>
<li><strong>Tu cuenta:</strong> tu correo, tu nombre de usuario, tu nombre visible y tu foto de perfil. Si entrás con Google, Discord o GitHub, ellos nos pasan tu correo y tu nombre.</li>
<li><strong>Lo que creás:</strong> notas, listas, pizarrones, categorías, recordatorios, tareas del calendario, audios, imágenes y archivos adjuntos, y los lugares que agregás a una nota.</li>
<li><strong>Guardados:</strong> los links, textos e imágenes que guardás desde la isla, el portapapeles o el menú Compartir.</li>
<li><strong>Tu gente:</strong> tus amigos, tus grupos, los mensajes del chat con sus fotos y las invitaciones que creás.</li>
<li><strong>Tus Espacios:</strong> lo que ponés en la lona (notas, listas, pizarrones, archivos de hasta 25 MB, chat y calendario del Espacio), con quién lo compartís y un historial de 14 días para poder recuperar lo que se sacó.</li>
<li><strong>Tu actividad en Teire:</strong> si estás en línea y tu estado (En línea, Ausente, No molestar o Invisible), la última vez que entraste y tus insignias, como la racha de conexión. Para saber si las funciones se usan, anotamos por día si tuviste la isla prendida o entraste a un Espacio y cuántas veces, pero no qué hacés ahí.</li>
<li><strong>Premium:</strong> si tenés Premium, hasta cuándo, los regalos que mandaste o recibiste y el identificador del pago que nos da Mercado Pago o PayPal. <strong>Nunca vemos ni guardamos los datos de tu tarjeta.</strong></li>
<li><strong>Tus preferencias:</strong> tema, colores, idioma, ajustes de la isla y parecidos.</li>
</ul>`,
                `<p>So your things are on all your devices and you can share them, we store on our servers:</p>
<ul>
<li><strong>Your account:</strong> your email, your username, your display name and your profile photo. If you sign in with Google, Discord or GitHub, they give us your email and your name.</li>
<li><strong>What you create:</strong> notes, lists, whiteboards, categories, reminders, calendar tasks, audio, images and attached files, and the places you add to a note.</li>
<li><strong>Saved items:</strong> the links, texts and images you save from the island, the clipboard or the Share menu.</li>
<li><strong>Your people:</strong> your friends, your groups, chat messages with their photos, and the invitations you create.</li>
<li><strong>Your Spaces:</strong> what you put on the canvas (notes, lists, whiteboards, files up to 25 MB, chat and the Space's calendar), who you share it with, and a 14-day history so you can recover what was removed.</li>
<li><strong>Your activity in Teire:</strong> whether you're online and your status (Online, Away, Do not disturb or Invisible), the last time you signed in and your badges, like the connection streak. To know whether features are used, we note per day whether you had the island on or entered a Space and how many times, but not what you do there.</li>
<li><strong>Premium:</strong> if you have Premium, until when, the gifts you sent or received, and the payment identifier given to us by Mercado Pago or PayPal. <strong>We never see or store your card details.</strong></li>
<li><strong>Your preferences:</strong> theme, colors, language, island settings and similar.</li>
</ul>`]],
            ["invitados", ["Si entrás a un Espacio con un link", "If you join a Space with a link"], [
                `<p>Quien abre un link de invitado entra a ese Espacio <strong>sin cuenta</strong>. Para eso creamos una sesión anónima con un nombre al azar que podés cambiar. De esa persona guardamos ese nombre, lo que hace en el Espacio (su cursor, sus trazos y sus mensajes) y, del link, solo una huella (no el link). El link dura 24 horas o hasta que lo cierren, y las sesiones anónimas sin un link vivo se borran solas a los 2 días.</p>`,
                `<p>Anyone who opens a guest link joins that Space <strong>without an account</strong>. To do that we create an anonymous session with a random name you can change. We store that name, what the person does in the Space (their cursor, strokes and messages) and, for the link, only a fingerprint (not the link itself). The link lasts 24 hours or until it's closed, and anonymous sessions with no live link are deleted automatically after 2 days.</p>`]],
            ["tu-equipo", ["Lo que se queda en tu equipo", "What stays on your device"], [
                `<ul>
<li><strong>Notas con PIN:</strong> se cifran en tu equipo antes de subirse. Nosotros guardamos solo el texto cifrado y no lo podemos leer. Si te olvidás el PIN, no hay forma de recuperarlas.</li>
<li><strong>«Oye Teire»:</strong> la app reconoce esas palabras en tu compu, sin mandar audio a ningún lado. Solo cuando la escucha (o cuando apretás Ctrl K) graba lo que pedís y lo manda a Teire IA.</li>
<li><strong>La isla, el portapapeles y las capturas:</strong> Teire mira en tu compu si copiaste un link o sacaste una captura para ofrecerte guardarla. No se manda nada hasta que tocás Guardar.</li>
<li><strong>La música de la isla:</strong> la isla lee en tu compu qué está sonando (el tema, el artista y la portada) y no lo manda a nuestros servidores. Para mostrar la letra, la app le pide a LRCLIB (lrclib.net) la letra del tema con su título, su artista y su duración.</li>
<li><strong>Foco y notas pegadas al escritorio:</strong> lo que escribís en qué te enfocás y la posición de las notas pegadas quedan en tu equipo.</li>
<li><strong>Archivos que arrastrás a una nota:</strong> salvo las imágenes, no se suben. Queda solo el nombre del archivo.</li>
</ul>`,
                `<ul>
<li><strong>PIN-protected notes:</strong> they're encrypted on your device before being uploaded. We only store the encrypted text and can't read it. If you forget the PIN, there's no way to recover them.</li>
<li><strong>“Oye Teire”:</strong> the app recognizes those words on your computer, without sending audio anywhere. Only when it hears them (or when you press Ctrl K) does it record what you ask and send it to Teire AI.</li>
<li><strong>The island, the clipboard and screenshots:</strong> Teire checks on your computer whether you copied a link or took a screenshot, to offer to save it. Nothing is sent until you tap Save.</li>
<li><strong>The island's music:</strong> the island reads on your computer what's playing (the track, the artist and the cover) and doesn't send it to our servers. To show the lyrics, the app asks LRCLIB (lrclib.net) for the track's lyrics using its title, artist and duration.</li>
<li><strong>Focus and notes pinned to the desktop:</strong> what you write as your focus and the position of pinned notes stay on your device.</li>
<li><strong>Files you drag into a note:</strong> except for images, they aren't uploaded. Only the file name is kept.</li>
</ul>`]],
            ["para-que", ["Para qué usamos tus datos", "What we use your data for"], [
                `<ul>
<li>Para que la app funcione: guardar y sincronizar tus cosas, compartirlas con quien elijas y mandarte los avisos que pediste.</li>
<li>Para cobrar Premium y entregar los regalos.</li>
<li>Para cuidar Teire: evitar abusos y spam, y poner límites diarios de uso, por ejemplo a los pedidos a Teire IA.</li>
<li>Para contestarte cuando nos escribís desde Ayuda.</li>
</ul>
<p><strong>No mostramos publicidad, no vendemos tus datos y no usamos herramientas de analítica ni de seguimiento</strong>, ni en la app ni en este sitio.</p>`,
                `<ul>
<li>To make the app work: store and sync your things, share them with whoever you choose and send you the notifications you asked for.</li>
<li>To charge for Premium and deliver gifts.</li>
<li>To look after Teire: prevent abuse and spam, and set daily usage limits, for example on Teire AI requests.</li>
<li>To reply when you write to us from Help.</li>
</ul>
<p><strong>We don't show ads, we don't sell your data and we don't use analytics or tracking tools</strong>, neither in the app nor on this website.</p>`]],
            ["terceros", ["Con quién se comparten", "Who it's shared with"], [
                `<p>Para funcionar, Teire usa algunos servicios de otras empresas. Cada uno recibe solo lo que necesita:</p>
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
<tr><td>LRCLIB</td><td>La letra de la música que suena en la isla.</td><td>El título, el artista y la duración del tema.</td></tr>
<tr><td>GitHub</td><td>Las descargas, las actualizaciones y este sitio.</td><td>Tu dirección IP al bajar o actualizar la app.</td></tr>
</tbody></table></div>
<p><strong>Sobre Teire IA:</strong> hoy usamos el plan gratuito de Gemini. En ese plan, Google puede revisar y usar lo que se le manda para mejorar sus productos. No le pidas a Teire IA nada que no quieras que lea otra persona. Teire IA solo funciona en español.</p>
<p>Además, compartimos datos si una ley o una autoridad competente nos lo exige.</p>`,
                `<p>To work, Teire uses some services from other companies. Each one receives only what it needs:</p>
<div class="tabla-marco"><table>
<thead><tr><th>Service</th><th>What for</th><th>What it receives</th></tr></thead>
<tbody>
<tr><td>Supabase</td><td>The database, accounts and files.</td><td>Everything stored with your account. Its servers may be outside Argentina.</td></tr>
<tr><td>Google Gemini</td><td>Teire AI, the voice it answers with and the automatic titles of links you share.</td><td>What you ask it (the audio or the text) and, for titles, the public preview of the link. It goes through our server: Google doesn't receive your email.</td></tr>
<tr><td>Firebase (Google)</td><td>Notifications on Android.</td><td>An identifier of your phone and the notification.</td></tr>
<tr><td>Apple</td><td>Notifications on iPhone.</td><td>An identifier of your phone and the encrypted notification, which Apple can't read.</td></tr>
<tr><td>Mercado Pago and PayPal</td><td>Charging for Premium and gifts.</td><td>The payment details, which you enter directly on their pages.</td></tr>
<tr><td>Google, Discord and GitHub</td><td>Signing in with those accounts, if you choose to.</td><td>That you chose to sign in to Teire with that account.</td></tr>
<tr><td>Photon (komoot) and OpenStreetMap</td><td>Searching for places and showing the map in a note.</td><td>What you search for and the area of the map.</td></tr>
<tr><td>LRCLIB</td><td>The lyrics of the music playing on the island.</td><td>The track's title, artist and duration.</td></tr>
<tr><td>GitHub</td><td>Downloads, updates and this website.</td><td>Your IP address when you download or update the app.</td></tr>
</tbody></table></div>
<p><strong>About Teire AI:</strong> we currently use Gemini's free plan. On that plan, Google may review and use what is sent to it to improve its products. Don't ask Teire AI anything you wouldn't want someone else to read. Teire AI only works in Spanish.</p>
<p>We also share data if a law or a competent authority requires it.</p>`]],
            ["otros", ["Lo que ven otras personas", "What other people see"], [
                `<ul>
<li>Tu nombre de usuario, tu foto, tus insignias y tu estado los ven tus amigos y quienes comparten un Espacio o un grupo con vos.</li>
<li>Una nota compartida la ven y la editan las personas con las que la compartiste, y ven quién está escribiendo.</li>
<li><strong>La Comunidad es pública:</strong> lo que dibujás en el lienzo lo ve cualquiera con cuenta, y aparece que participaste.</li>
<li>Los mensajes del chat, de los grupos y de los Espacios los ven quienes están en esa conversación.</li>
</ul>`,
                `<ul>
<li>Your username, photo, badges and status are seen by your friends and by people who share a Space or a group with you.</li>
<li>A shared note is seen and edited by the people you shared it with, and they can see who is typing.</li>
<li><strong>The Community is public:</strong> what you draw on the canvas can be seen by anyone with an account, and it shows that you took part.</li>
<li>Chat, group and Space messages are seen by the people in that conversation.</li>
</ul>`]],
            ["tiempo", ["Cuánto tiempo los guardamos", "How long we keep it"], [
                `<p>Guardamos tus datos mientras tengas tu cuenta. Las notas que borrás van a la papelera hasta que las borrás del todo.</p>
<p>Si pedís que borremos tu cuenta, borramos tus datos en un plazo de 30 días. Solo guardamos lo que la ley nos obligue a conservar, como los comprobantes de pago. Mientras sumamos el botón para borrar la cuenta desde la app, lo podés pedir escribiendo a ${CORREO}.</p>`,
                `<p>We keep your data for as long as you have your account. Notes you delete go to the trash until you delete them for good.</p>
<p>If you ask us to delete your account, we delete your data within 30 days. We only keep what the law requires us to keep, such as payment receipts. Until we add a button to delete your account from the app, you can request it by writing to ${CORREO}.</p>`]],
            ["derechos", ["Tus derechos", "Your rights"], [
                `<p>Por la Ley 25.326 de Protección de los Datos Personales, podés pedirnos <strong>ver, corregir, actualizar o borrar</strong> tus datos, gratis. Escribinos a ${CORREO}. Si pedís verlos, te contestamos en un máximo de 10 días corridos; si pedís corregirlos o borrarlos, en un máximo de 5 días hábiles.</p>
<p>El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326. La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.</p>`,
                `<p>Under Argentina's Personal Data Protection Law No. 25,326, you can ask us to <strong>see, correct, update or delete</strong> your data, free of charge. Write to us at ${CORREO}. If you ask to see it, we'll answer within 10 calendar days at most; if you ask to correct or delete it, within 5 business days at most.</p>
<p>The holder of the personal data may exercise the right of access free of charge at intervals of no less than six months, unless a legitimate interest is shown, as established in article 14, paragraph 3 of Law No. 25,326. The Agency for Access to Public Information (<em>Agencia de Acceso a la Información Pública</em>), as the supervisory authority of Law No. 25,326, has the power to handle complaints and claims filed by those whose rights are affected by non-compliance with the personal data protection rules in force.</p>`]],
            ["seguridad", ["Cómo los cuidamos", "How we protect it"], [
                `<p>Las conexiones van cifradas, cada persona solo puede leer lo suyo y lo que le compartieron (las reglas de la base de datos lo controlan), y las claves de los servicios viven en el servidor, nunca en la app. Ningún sistema es perfecto: si pasa algo que afecte tus datos, te vamos a avisar.</p>`,
                `<p>Connections are encrypted, each person can only read their own things and what has been shared with them (the database rules enforce this), and the keys to the services live on the server, never in the app. No system is perfect: if something happens that affects your data, we'll let you know.</p>`]],
            ["menores", ["Menores de edad", "Minors"], [
                `<p>Teire no está pensada para menores de ${EDAD_MINIMA} años. Si sos menor de 18, usala con el permiso de tus padres o de un adulto responsable.</p>`,
                `<p>Teire isn't intended for children under ${EDAD_MINIMA}. If you're under 18, use it with the permission of your parents or a responsible adult.</p>`]],
            ["sitio", ["Este sitio", "This website"], [
                `<p>Este sitio no usa cookies ni analíticas. Las fuentes y las animaciones están alojadas acá mismo. Para mostrarte la última versión, la página le pregunta a GitHub cuál es. El tema (claro u oscuro) y el idioma que elegís se recuerdan en tu navegador, sin mandarse a ningún lado. GitHub, que aloja el sitio, puede registrar tu dirección IP.</p>`,
                `<p>This website doesn't use cookies or analytics. The fonts and animations are hosted right here. To show you the latest version, the page asks GitHub which one it is. The theme (light or dark) and the language you choose are remembered in your browser and aren't sent anywhere. GitHub, which hosts the site, may log your IP address.</p>`]],
            ["cambios", ["Si esta política cambia", "If this policy changes"], [
                `<p>Si cambiamos algo importante, te avisamos en la app antes de que empiece a valer, y actualizamos la fecha de arriba. Si tenés dudas, escribinos a ${CORREO}.</p>`,
                `<p>If we change something important, we'll tell you in the app before it takes effect, and we'll update the date above. If you have questions, write to us at ${CORREO}.</p>`]],
        ],
    },

    // ------------------------------------------------------------------ Términos
    {
        id: "terminos", legal: true,
        slug: ["terminos", "terms"],
        nav: ["Términos", "Terms"],
        titulo: ["Términos y condiciones · Teire", "Terms and conditions · Teire"],
        descripcion: [
            "Las reglas para usar Teire: tu cuenta, tu contenido, lo que no se puede hacer, Teire IA y cómo funciona Teire Premium.",
            "The rules for using Teire: your account, your content, what's not allowed, Teire AI and how Teire Premium works.",
        ],
        h1: ["Términos y condiciones", "Terms and conditions"],
        resumen: [
            ["Lo que escribís es tuyo.", "What you write is yours."],
            ["Nada ilegal, nada de acoso ni spam.", "Nothing illegal, no harassment and no spam."],
            ["Teire IA se puede equivocar: revisá lo que crea.", "Teire AI can make mistakes: check what it creates."],
            ["Premium se renueva cada mes y lo cancelás cuando quieras.", "Premium renews every month and you can cancel whenever you want."],
            ["Tenés 10 días para arrepentirte de un pago.", "You have 10 days to withdraw from a payment."],
        ],
        secciones: [
            ["acuerdo", ["El acuerdo", "The agreement"], [
                `<p>Estos términos son el acuerdo entre vos y <strong>Matías D'Agostino</strong>, el creador de Teire, para usar la app y este sitio. Al usar Teire los aceptás. Si no estás de acuerdo, no la uses.</p>
<p>Cómo tratamos tus datos está explicado en la <a href="{{pagina:privacidad}}">política de privacidad</a>, que es parte de este acuerdo.</p>`,
                `<p>These terms are the agreement between you and <strong>Matías D'Agostino</strong>, the creator of Teire, for using the app and this website. By using Teire you accept them. If you don't agree, don't use it.</p>
<p>How we handle your data is explained in the <a href="{{pagina:privacidad}}">privacy policy</a>, which is part of this agreement.</p>`]],
            ["cuenta", ["Tu cuenta", "Your account"], [
                `<ul>
<li>Para crear una cuenta tenés que tener al menos ${EDAD_MINIMA} años. Si sos menor de 18, necesitás el permiso de tus padres o de un adulto responsable.</li>
<li>Cuidá tu contraseña y tu acceso. Lo que se haga desde tu cuenta es tu responsabilidad.</li>
<li>Tu nombre de usuario no puede hacerse pasar por otra persona ni ser ofensivo.</li>
</ul>`,
                `<ul>
<li>To create an account you must be at least ${EDAD_MINIMA} years old. If you're under 18, you need the permission of your parents or a responsible adult.</li>
<li>Look after your password and your access. What is done from your account is your responsibility.</li>
<li>Your username can't impersonate another person or be offensive.</li>
</ul>`]],
            ["contenido", ["Lo que escribís es tuyo", "What you write is yours"], [
                `<p>Tus notas, dibujos, mensajes y todo lo que subís siguen siendo tuyos. Para que Teire funcione, nos das permiso para guardarlo, copiarlo entre tus dispositivos y mostrárselo a las personas con las que lo compartís. Ese permiso termina cuando lo borrás o borrás tu cuenta, salvo lo que otros ya hayan copiado.</p>
<p>Lo que dibujás en la Comunidad queda en un lienzo compartido: otras personas lo pueden tapar o dibujar encima, y puede seguir visible aunque borres tu cuenta.</p>`,
                `<p>Your notes, drawings, messages and everything you upload remain yours. For Teire to work, you give us permission to store it, copy it between your devices and show it to the people you share it with. That permission ends when you delete it or delete your account, except for what others have already copied.</p>
<p>What you draw in the Community goes on a shared canvas: other people can cover it or draw over it, and it may remain visible even if you delete your account.</p>`]],
            ["uso", ["Lo que no se puede hacer", "What you can't do"], [
                `<ul>
<li>Subir o compartir contenido ilegal, violento, sexual con menores, que incite al odio o que viole los derechos de otros.</li>
<li>Acosar, amenazar o mandar spam, en el chat, en un Espacio o en la Comunidad.</li>
<li>Intentar entrar a cuentas o datos ajenos, romper los límites de uso o atacar los servidores.</li>
<li>Usar Teire para algo que la ley prohíba.</li>
</ul>
<p>Si alguien no cumple estas reglas, podemos borrar ese contenido y suspender o cerrar su cuenta. Si ves algo así, avisanos desde Ayuda.</p>`,
                `<ul>
<li>Upload or share content that is illegal, violent, sexual involving minors, that incites hatred or that violates the rights of others.</li>
<li>Harass, threaten or spam, in chat, in a Space or in the Community.</li>
<li>Try to access other people's accounts or data, get around usage limits or attack the servers.</li>
<li>Use Teire for anything the law prohibits.</li>
</ul>
<p>If someone doesn't follow these rules, we may delete that content and suspend or close their account. If you see something like that, let us know from Help.</p>`]],
            ["ia", ["Teire IA", "Teire AI"], [
                `<p>Teire IA usa inteligencia artificial y <strong>se puede equivocar</strong>: revisá lo que crea, sobre todo fechas y recordatorios. Antes de compartir algo o mandar un mensaje por vos, siempre te pide confirmar. Tiene un límite de pedidos por día, más alto con Premium. Por ahora funciona solo en español.</p>`,
                `<p>Teire AI uses artificial intelligence and <strong>can make mistakes</strong>: check what it creates, especially dates and reminders. Before sharing something or sending a message for you, it always asks you to confirm. It has a daily limit on requests, higher with Premium. For now it only works in Spanish.</p>`]],
            ["premium", ["Teire Premium", "Teire Premium"], [
                `<ul>
<li><strong>Precio:</strong> el que ves en la app antes de pagar, en pesos con Mercado Pago o en dólares con PayPal.</li>
<li><strong>Renovación:</strong> Premium es una suscripción mensual que se renueva sola hasta que la canceles.</li>
<li><strong>Cancelar:</strong> lo podés hacer cuando quieras desde la sección Premium de la app. Seguís teniendo Premium hasta el final del período que ya pagaste.</li>
<li><strong>Regalos:</strong> regalar Premium por 1, 3, 6 o 12 meses es un pago único que no se renueva.</li>
<li><strong>Arrepentimiento:</strong> tenés 10 días corridos desde que pagás para arrepentirte, sin dar motivos, y te devolvemos todo. Se hace desde el <a href="{{pagina:arrepentimiento}}">Botón de arrepentimiento</a>.</li>
<li>Si cambia el precio, te avisamos antes de la próxima renovación.</li>
</ul>`,
                `<ul>
<li><strong>Price:</strong> the one you see in the app before paying, in pesos with Mercado Pago or in dollars with PayPal.</li>
<li><strong>Renewal:</strong> Premium is a monthly subscription that renews automatically until you cancel it.</li>
<li><strong>Canceling:</strong> you can do it whenever you want from the Premium section of the app. You keep Premium until the end of the period you already paid for.</li>
<li><strong>Gifts:</strong> gifting Premium for 1, 3, 6 or 12 months is a one-time payment that doesn't renew.</li>
<li><strong>Withdrawal:</strong> you have 10 calendar days from the moment you pay to withdraw, without giving a reason, and we refund everything. You do it from the <a href="{{pagina:arrepentimiento}}">Right of withdrawal</a> page.</li>
<li>If the price changes, we'll tell you before the next renewal.</li>
</ul>`]],
            ["servicio", ["Cómo funciona el servicio", "How the service works"], [
                `<p>Teire es gratis y la hace una sola persona. Hacemos lo posible para que ande siempre, pero puede haber cortes, errores o cambios. Podemos sumar, cambiar o sacar funciones. Si sacamos algo de Premium, te avisamos antes.</p>
<p>Teire se ofrece tal como está. Hasta donde la ley lo permite, no respondemos por daños indirectos ni por pérdidas de datos. Por eso, si algo es muy importante, guardá una copia aparte. Nada de esto limita los derechos que te da la Ley 24.240 de Defensa del Consumidor.</p>`,
                `<p>Teire is free and made by one person. We do our best to keep it working at all times, but there may be outages, errors or changes. We may add, change or remove features. If we remove something from Premium, we'll tell you first.</p>
<p>Teire is provided as is. To the extent the law allows, we aren't liable for indirect damages or data loss. So if something is very important, keep a separate copy. None of this limits the rights Argentina's Consumer Protection Law No. 24,240 gives you.</p>`]],
            ["baja", ["Dejar de usar Teire", "Stopping your use of Teire"], [
                `<p>Podés dejar de usar Teire cuando quieras. Para borrar tu cuenta y tus datos, escribinos a ${CORREO} (pronto lo vas a poder hacer desde la app). Si tenés Premium, cancelalo antes para que no se renueve.</p>`,
                `<p>You can stop using Teire whenever you want. To delete your account and your data, write to us at ${CORREO} (soon you'll be able to do it from the app). If you have Premium, cancel it first so it doesn't renew.</p>`]],
            ["ley", ["Ley y contacto", "Governing law and contact"], [
                `<p>Este acuerdo se rige por las leyes de la República Argentina. Si cambiamos algo importante, te avisamos en la app antes de que empiece a valer. Para cualquier consulta, escribinos a ${CORREO}.</p>`,
                `<p>This agreement is governed by the laws of the Argentine Republic. If we change something important, we'll tell you in the app before it takes effect. For any question, write to us at ${CORREO}.</p>`]],
        ],
    },

    // ------------------------------------------------------------------ Arrepentimiento
    {
        id: "arrepentimiento", legal: true,
        slug: ["arrepentimiento", "withdrawal"],
        nav: ["Arrepentimiento", "Withdrawal"],
        titulo: ["Botón de arrepentimiento · Teire", "Right of withdrawal · Teire"],
        descripcion: [
            "Cómo arrepentirte de un pago de Teire Premium dentro de los 10 días y recibir la devolución completa.",
            "How to withdraw from a Teire Premium payment within 10 days and get a full refund.",
        ],
        h1: ["Botón de arrepentimiento", "Right of withdrawal"],
        resumen: [
            ["Tenés 10 días corridos desde el pago.", "You have 10 calendar days from the payment."],
            ["No tenés que dar motivos.", "You don't have to give a reason."],
            ["Te devolvemos todo por el mismo medio de pago.", "We refund everything through the same payment method."],
        ],
        secciones: [
            ["que-es", ["Qué es", "What it is"], [
                `<p>Si pagaste Teire Premium o un regalo de Premium, tenés <strong>10 días corridos</strong> desde el pago para arrepentirte. No tenés que dar ningún motivo y no te cuesta nada: te devolvemos todo lo que pagaste. Es un derecho que te da la Ley 24.240 de Defensa del Consumidor, y este botón está acá por la Resolución 424/2020.</p>`,
                `<p>If you paid for Teire Premium or a Premium gift, you have <strong>10 calendar days</strong> from the payment to withdraw. You don't have to give any reason and it costs you nothing: we refund everything you paid. It's a right given to you by Argentina's Consumer Protection Law No. 24,240, and this page is here because of Resolution 424/2020.</p>`]],
            ["como", ["Cómo pedirlo", "How to request it"], [
                `<ol class="pasos">
<li><span><strong>Escribinos a ${CORREO_ARREPENTIMIENTO[0]}</strong> con el asunto «Arrepentimiento». Contanos tu nombre de usuario en Teire, la fecha del pago y si pagaste con Mercado Pago o con PayPal.</span></li>
<li><span><strong>En menos de 24 horas te mandamos un código de trámite</strong>, para que puedas seguir tu pedido.</span></li>
<li><span><strong>Te devolvemos el dinero por el mismo medio con el que pagaste</strong>, y cancelamos la suscripción para que no se vuelva a cobrar.</span></li>
</ol>`,
                `<ol class="pasos">
<li><span><strong>Write to us at ${CORREO_ARREPENTIMIENTO[1]}</strong> with the subject “Withdrawal”. Tell us your Teire username, the date of the payment and whether you paid with Mercado Pago or PayPal.</span></li>
<li><span><strong>Within 24 hours we send you a case code</strong>, so you can follow your request.</span></li>
<li><span><strong>We refund the money through the same method you paid with</strong>, and we cancel the subscription so it isn't charged again.</span></li>
</ol>`]],
            ["cancelar", ["Si solo querés que no se renueve", "If you just don't want it to renew"], [
                `<p>Si pasaron más de 10 días o solo querés que no se cobre el mes que viene, cancelá la suscripción desde la sección Premium de la app. Seguís teniendo Premium hasta el final del período que ya pagaste.</p>`,
                `<p>If more than 10 days have passed or you just don't want next month to be charged, cancel the subscription from the Premium section of the app. You keep Premium until the end of the period you already paid for.</p>`]],
        ],
    },

    // ------------------------------------------------------------------ iPhone
    {
        id: "iphone",
        slug: ["iphone", "iphone"],
        nav: ["iPhone", "iPhone"],
        titulo: ["Teire en iPhone: cómo instalarla · Teire", "Teire on iPhone: how to install it · Teire"],
        descripcion: [
            "Cómo instalar Teire en tu iPhone desde Safari, gratis y sin App Store: los pasos, las notificaciones y cómo guardar links.",
            "How to install Teire on your iPhone from Safari, free and without the App Store: the steps, notifications and how to save links.",
        ],
        h1: ["Teire en tu iPhone", "Teire on your iPhone"],
        resumen: [
            ["Se instala desde Safari y es gratis, sin App Store.", "It installs from Safari and it's free, with no App Store."],
            ["Iniciá sesión desde el ícono, no desde Safari.", "Sign in from the icon, not from Safari."],
            ["Las notificaciones se activan con un toque.", "Notifications turn on with one tap."],
            ["Funciona desde iOS 16.4.", "It works from iOS 16.4."],
        ],
        secciones: [
            ["instalar", ["Instalala en tres toques", "Install it in three taps"], [
                `<div class="botones"><a class="btn p" href="/app/">Abrir Teire en Safari</a></div>
<ol class="pasos">
<li><span><strong>Abrí Teire en Safari</strong> desde el botón de arriba. Si este link te abrió otro navegador, copialo y pegalo en Safari: <code>useteire.app/app</code></span></li>
<li><span>Tocá <strong>Compartir</strong> (el cuadradito con la flecha para arriba). En los iOS nuevos puede estar adentro del botón <strong>···</strong>.</span></li>
<li><span>Bajá y tocá <strong>Agregar a Inicio</strong>, y después <strong>Agregar</strong>.</span></li>
<li><span>Cerrá Safari y abrí <strong>Teire desde su ícono</strong>. Listo: ya funciona como cualquier app.</span></li>
</ol>`,
                `<div class="botones"><a class="btn p" href="/app/">Open Teire in Safari</a></div>
<ol class="pasos">
<li><span><strong>Open Teire in Safari</strong> with the button above. If this link opened another browser, copy it and paste it into Safari: <code>useteire.app/app</code></span></li>
<li><span>Tap <strong>Share</strong> (the little square with an arrow pointing up). On newer versions of iOS it may be inside the <strong>···</strong> button.</span></li>
<li><span>Scroll down and tap <strong>Add to Home Screen</strong>, then <strong>Add</strong>.</span></li>
<li><span>Close Safari and open <strong>Teire from its icon</strong>. That's it: it now works like any other app.</span></li>
</ol>`]],
            ["cuenta", ["Entrá a tu cuenta", "Sign in to your account"], [
                `<p><strong>Iniciá sesión desde el ícono, no desde Safari.</strong> iOS separa las dos cosas: si entrás en Safari, la app instalada no se entera.</p>
<p>Si ya tenés cuenta con correo, entrá como siempre. Tus notas, amigos y chats están ahí.</p>
<p><strong>¿Entrás con Google, Discord o GitHub?</strong> En iPhone esos botones no están, porque te sacarían de la app. Tocá <strong>«Entrá con un código por correo»</strong>, poné el correo de esa cuenta y elegí una contraseña. Es la misma cuenta y vas a seguir pudiendo entrar con Google en tus otros equipos.</p>`,
                `<p><strong>Sign in from the icon, not from Safari.</strong> iOS keeps the two separate: if you sign in on Safari, the installed app doesn't know about it.</p>
<p>If you already have an account with an email, sign in as usual. Your notes, friends and chats are there.</p>
<p><strong>Do you sign in with Google, Discord or GitHub?</strong> Those buttons aren't on iPhone, because they would take you out of the app. Tap <strong>“Sign in with an email code”</strong>, enter the email of that account and choose a password. It's the same account, and you'll still be able to sign in with Google on your other devices.</p>`]],
            ["notificaciones", ["Prendé las notificaciones", "Turn on notifications"], [
                `<p>La primera vez que entres, Teire te va a preguntar si querés activarlas. Tocá <strong>Activar</strong> y después <strong>Permitir</strong>. Te avisan de mensajes, notas que te comparten y recordatorios, aunque la app esté cerrada.</p>
<p>Si dijiste «Ahora no», las activás desde <strong>Perfil → Notificaciones</strong>. Necesitás iOS 16.4 o más nuevo.</p>`,
                `<p>The first time you open it, Teire will ask whether you want to turn them on. Tap <strong>Turn on</strong> and then <strong>Allow</strong>. They tell you about messages, notes shared with you and reminders, even when the app is closed.</p>
<p>If you said “Not now”, you can turn them on from <strong>Profile → Notifications</strong>. You need iOS 16.4 or newer.</p>`]],
            ["guardar", ["Guardá links", "Save links"], [
                `<p>En iPhone, Teire no puede mirar lo que copiaste por su cuenta. Lo más simple es esto:</p>
<ol class="pasos">
<li><span>Copiá el link desde Instagram, TikTok o donde sea.</span></li>
<li><span>Abrí Teire y andá a <strong>Guardados</strong>.</span></li>
<li><span>Tocá <strong>Pegar</strong> y confirmá en el globito que muestra el iPhone.</span></li>
</ol>`,
                `<p>On iPhone, Teire can't check what you copied on its own. The simplest way is this:</p>
<ol class="pasos">
<li><span>Copy the link from Instagram, TikTok or anywhere else.</span></li>
<li><span>Open Teire and go to <strong>Saved</strong>.</span></li>
<li><span>Tap <strong>Paste</strong> and confirm in the little bubble the iPhone shows.</span></li>
</ol>`]],
            ["atajo", ["Guardá desde Compartir, sin abrir Teire", "Save from Share, without opening Teire"], [
                `<p>Es opcional y se arma una sola vez. Después, desde cualquier app tocás <strong>Compartir → Guardar en Teire</strong> y queda guardado. Necesitás una cuenta y la app <strong>Atajos</strong>, que viene con el iPhone.</p>
<ol class="pasos">
<li><span>En Teire, andá a <strong>Perfil → Guardar desde otras apps</strong>, tocá <strong>Generar código</strong> y copialo. No se lo pases a nadie.</span></li>
<li><span>Abrí <strong>Atajos</strong>, tocá <strong>+</strong> y ponele de nombre <strong>Guardar en Teire</strong>.</span></li>
<li><span>Agregá la acción <strong>Obtener contenido de URL</strong> y pegá esta dirección:<br><code>${FUNCION_GUARDAR}</code></span></li>
<li><span>Tocá la flecha de esa acción y elegí método <strong>POST</strong> y cuerpo de la solicitud <strong>JSON</strong>.</span></li>
<li><span>Agregá un campo de texto con clave <code>codigo</code> y pegá tu código como valor.</span></li>
<li><span>Agregá otro campo de texto con clave <code>link</code> y, como valor, elegí la variable <strong>Entrada del atajo</strong>.</span></li>
<li><span>Agregá la acción <strong>Mostrar notificación</strong> y poné <strong>Contenido de la URL</strong> como texto. Así ves si se guardó.</span></li>
<li><span>Tocá el ícono de información del atajo y prendé <strong>Mostrar en la hoja para compartir</strong>. Guardalo.</span></li>
</ol>
<p>Los nombres pueden variar un poco según tu versión de iOS. Si cambiás de código en Teire, actualizalo también en el atajo.</p>`,
                `<p>It's optional and you set it up only once. After that, from any app you tap <strong>Share → Save to Teire</strong> and it's saved. You need an account and the <strong>Shortcuts</strong> app, which comes with the iPhone.</p>
<ol class="pasos">
<li><span>In Teire, go to <strong>Profile → Save from other apps</strong>, tap <strong>Generate code</strong> and copy it. Don't give it to anyone.</span></li>
<li><span>Open <strong>Shortcuts</strong>, tap <strong>+</strong> and name it <strong>Save to Teire</strong>.</span></li>
<li><span>Add the <strong>Get Contents of URL</strong> action and paste this address:<br><code>${FUNCION_GUARDAR}</code></span></li>
<li><span>Tap the arrow on that action and choose the <strong>POST</strong> method and <strong>JSON</strong> as the request body.</span></li>
<li><span>Add a text field with the key <code>codigo</code> and paste your code as the value.</span></li>
<li><span>Add another text field with the key <code>link</code> and, as the value, choose the <strong>Shortcut Input</strong> variable.</span></li>
<li><span>Add the <strong>Show Notification</strong> action and set <strong>Contents of URL</strong> as the text. That way you can see whether it was saved.</span></li>
<li><span>Tap the shortcut's info icon and turn on <strong>Show in Share Sheet</strong>. Save it.</span></li>
</ol>
<p>The names may vary a little depending on your version of iOS. If you change the code in Teire, update it in the shortcut too.</p>`]],
            ["diferencias", ["Qué cambia en iPhone", "What's different on iPhone"], [
                `<ul>
<li><strong>Todo lo importante está:</strong> notas, listas, pizarrones, recordatorios, Guardados, amigos, chat, Espacio y Premium.</li>
<li><strong>Se actualiza sola:</strong> cuando hay una versión nueva, la app la toma al abrirla con internet.</li>
<li><strong>No hay isla ni voz de Teire IA:</strong> la isla es de Windows y la voz, de escritorio.</li>
<li><strong>No aparece sola en Compartir:</strong> iOS no lo permite en las apps instaladas desde Safari. Por eso existe el atajo.</li>
<li><strong>No hay aviso al copiar:</strong> en Android Teire te ofrece guardar lo que copiaste. En iPhone tocás Pegar.</li>
</ul>`,
                `<ul>
<li><strong>Everything important is there:</strong> notes, lists, whiteboards, reminders, Saved, friends, chat, Space and Premium.</li>
<li><strong>It updates itself:</strong> when there's a new version, the app picks it up when you open it with internet.</li>
<li><strong>There's no island or Teire AI voice:</strong> the island is a Windows feature and the voice is desktop-only.</li>
<li><strong>It doesn't show up in Share on its own:</strong> iOS doesn't allow it for apps installed from Safari. That's why the shortcut exists.</li>
<li><strong>There's no notice when you copy:</strong> on Android, Teire offers to save what you copied. On iPhone you tap Paste.</li>
</ul>`]],
            ["problemas", ["Si algo no anda", "If something doesn't work"], [
                `<ul>
<li><strong>No veo «Agregar a Inicio».</strong> Asegurate de estar en Safari. En la lista de Compartir, bajá hasta el final o tocá «Editar acciones».</li>
<li><strong>Me pide iniciar sesión de nuevo.</strong> Entraste en Safari. Abrí Teire desde el ícono e iniciá sesión ahí.</li>
<li><strong>No me llegan las notificaciones.</strong> Fijate en Ajustes del iPhone → Notificaciones → Teire, y que el modo Concentración no las esté frenando.</li>
<li><strong>El atajo dice que el código no vale.</strong> Generá uno nuevo en Teire y pegalo en el atajo.</li>
<li><strong>Sigue sin andar.</strong> Escribinos desde Ayuda, adentro de la app, o a ${CORREO}.</li>
</ul>`,
                `<ul>
<li><strong>I don't see “Add to Home Screen”.</strong> Make sure you're in Safari. In the Share list, scroll to the bottom or tap “Edit Actions”.</li>
<li><strong>It asks me to sign in again.</strong> You signed in on Safari. Open Teire from the icon and sign in there.</li>
<li><strong>I'm not getting notifications.</strong> Check iPhone Settings → Notifications → Teire, and that Focus mode isn't blocking them.</li>
<li><strong>The shortcut says the code isn't valid.</strong> Generate a new one in Teire and paste it into the shortcut.</li>
<li><strong>It still doesn't work.</strong> Write to us from Help, inside the app, or at ${CORREO}.</li>
</ul>`]],
        ],
    },

    // ------------------------------------------------------------------ Notas compartidas
    {
        id: "notas-compartidas",
        slug: ["notas-compartidas", "shared-notes"],
        nav: ["Notas compartidas", "Shared notes"],
        titulo: ["App de notas compartidas gratis con tus amigos · Teire", "Free shared notes app to use with your friends · Teire"],
        descripcion: [
            "Compartí notas y listas con tus amigos y editenlas en vivo, letra por letra. Teire es gratis para Windows, Android, iPhone, Linux y el navegador.",
            "Share notes and lists with your friends and edit them live, letter by letter. Teire is free for Windows, Android, iPhone, Linux and the browser.",
        ],
        h1: ["Notas compartidas con tus amigos, en vivo", "Shared notes with your friends, live"],
        resumen: [
            ["Editan la misma nota al mismo tiempo.", "You edit the same note at the same time."],
            ["Listas y pizarrones que se actualizan solos.", "Lists and whiteboards that update on their own."],
            ["Gratis para Windows, Android, iPhone, Linux y navegador.", "Free for Windows, Android, iPhone, Linux and browser."],
            ["Sin publicidad.", "No ads."],
        ],
        secciones: [
            ["en-vivo", ["Escriban en la misma nota, al mismo tiempo", "Write in the same note, at the same time"], [
                `<p>Compartí una nota con un amigo por su <code>@usuario</code> y mirá cómo escribe, letra por letra. No hay que recargar nada ni mandarse versiones por WhatsApp: lo que cambia uno lo ven todos.</p>
<div class="botones"><a class="btn p" href="{{home}}#descargar">Bajá Teire gratis</a><a class="btn s" href="/app/">Usala en el navegador</a></div>`,
                `<p>Share a note with a friend by their <code>@username</code> and watch them type, letter by letter. There's nothing to reload and no versions to send over WhatsApp: what one person changes, everyone sees.</p>
<div class="botones"><a class="btn p" href="{{home}}#descargar">Get Teire for free</a><a class="btn s" href="/app/">Use it in your browser</a></div>`]],
            ["listas", ["Listas que se completan entre todos", "Lists everyone fills in together"], [
                `<p>La lista del súper, lo que hay que llevar al viaje, las tareas de la casa. Cada uno tilda lo suyo desde su celular o su compu, y cada tarjeta te muestra cuánto falta.</p>`,
                `<p>The grocery list, what to pack for the trip, the household chores. Each person ticks off their own from their phone or computer, and each card shows how much is left.</p>`]],
            ["pizarrones", ["Pizarrones para pensar juntos", "Whiteboards to think together"], [
                `<p>Un pizarrón es un lienzo a pantalla completa. Ves lo que dibujan los demás mientras lo dibujan: sirve para armar un plano, un esquema o explicar algo sin escribir tres párrafos.</p>`,
                `<p>A whiteboard is a full-screen canvas. You see what others draw as they draw it: it's good for sketching a plan, a diagram or explaining something without writing three paragraphs.</p>`]],
            ["espacio", ["Un lugar para tu grupo: el Espacio", "A place for your group: the Space"], [
                `<p>El Espacio es una lona compartida donde ponés notas, listas, pizarrones, archivos, un chat y un calendario, y trabajan juntos en vivo. Podés invitar a quien quieras con un link: entra sin cuenta y sin instalar nada. El link dura 24 horas y lo podés cerrar antes.</p>`,
                `<p>The Space is a shared canvas where you put notes, lists, whiteboards, files, a chat and a calendar, and work together live. You can invite anyone with a link: they join without an account and without installing anything. The link lasts 24 hours and you can close it sooner.</p>`]],
            ["como", ["Cómo compartir una nota", "How to share a note"], [
                `<ol class="pasos">
<li><span><strong>Instalá Teire o abrila en el navegador</strong> y creá tu cuenta gratis.</span></li>
<li><span><strong>Agregá a tu amigo</strong> por su <code>@usuario</code>.</span></li>
<li><span><strong>Abrí una nota y compartila.</strong> Desde ese momento la editan los dos.</span></li>
</ol>`,
                `<ol class="pasos">
<li><span><strong>Install Teire or open it in your browser</strong> and create your free account.</span></li>
<li><span><strong>Add your friend</strong> by their <code>@username</code>.</span></li>
<li><span><strong>Open a note and share it.</strong> From then on, you both edit it.</span></li>
</ol>`]],
            ["donde", ["Funciona donde estés", "It works wherever you are"], [
                `<p>Teire está para <strong>Windows, Android, iPhone y Linux</strong>, y también se usa desde el navegador sin instalar nada. Funciona sin internet y sube todo cuando vuelve la conexión. En iPhone se instala desde Safari: <a href="{{pagina:iphone}}">mirá la guía</a>.</p>`,
                `<p>Teire is available for <strong>Windows, Android, iPhone and Linux</strong>, and you can also use it from the browser without installing anything. It works offline and syncs everything when the connection comes back. On iPhone it installs from Safari: <a href="{{pagina:iphone}}">see the guide</a>.</p>`]],
            ["privado", ["Tus notas siguen siendo tuyas", "Your notes are still yours"], [
                `<p>Teire no tiene publicidad y no vende datos. Las notas con PIN se cifran en tu dispositivo antes de subirse: ni el servidor las puede leer. Lo que no compartís no lo ve nadie más. El detalle está en la <a href="{{pagina:privacidad}}">política de privacidad</a>.</p>`,
                `<p>Teire has no ads and doesn't sell data. PIN-protected notes are encrypted on your device before being uploaded: even the server can't read them. What you don't share, nobody else sees. The details are in the <a href="{{pagina:privacidad}}">privacy policy</a>.</p>`]],
        ],
    },

    // ------------------------------------------------------------------ Alternativa a Keep
    {
        id: "alternativa-google-keep",
        slug: ["alternativa-google-keep", "google-keep-alternative"],
        nav: ["Alternativa a Keep", "Keep alternative"],
        titulo: ["Alternativa a Google Keep gratis para notas · Teire", "Free Google Keep alternative for notes · Teire"],
        descripcion: [
            "Teire es una alternativa gratis a Google Keep: notas y listas en vivo con tus amigos, pizarrones, Espacio para tu grupo y notas con PIN cifradas.",
            "Teire is a free alternative to Google Keep: live notes and lists with your friends, whiteboards, a Space for your group and encrypted PIN notes.",
        ],
        h1: ["Una alternativa a Google Keep", "An alternative to Google Keep"],
        resumen: [
            ["Notas, listas y pizarrones que editan juntos en vivo.", "Notes, lists and whiteboards you edit together, live."],
            ["Gratis y sin publicidad.", "Free and without ads."],
            ["Todavía no importa tus notas de Keep: se pasan a mano.", "It doesn't import your Keep notes yet: you move them over by hand."],
        ],
        secciones: [
            ["que-suma", ["Lo que suma Teire", "What Teire adds"], [
                `<ul>
<li><strong>Notas y listas en vivo:</strong> ves cómo escriben tus amigos, letra por letra.</li>
<li><strong>Pizarrones a pantalla completa:</strong> dibujan entre varios y se ve mientras lo hacen.</li>
<li><strong>El Espacio:</strong> un lugar para tu grupo, con chat, pizarrón y lo que comparten.</li>
<li><strong>Guardados:</strong> reels, links, textos y capturas, agrupados por día y aparte de tus notas.</li>
<li><strong>La isla en Windows:</strong> le soltás un link o una foto desde cualquier programa y queda guardado.</li>
<li><strong>Notas con PIN:</strong> se cifran en tu dispositivo, y ni el servidor las puede leer.</li>
<li><strong>Sin publicidad:</strong> todo lo importante es gratis y Premium es opcional.</li>
</ul>
<div class="botones"><a class="btn p" href="{{home}}#descargar">Bajá Teire gratis</a><a class="btn s" href="/app/">Usala en el navegador</a></div>`,
                `<ul>
<li><strong>Live notes and lists:</strong> you see how your friends type, letter by letter.</li>
<li><strong>Full-screen whiteboards:</strong> several people draw together and you see it as it happens.</li>
<li><strong>The Space:</strong> a place for your group, with chat, a whiteboard and what you share.</li>
<li><strong>Saved:</strong> reels, links, texts and screenshots, grouped by day and separate from your notes.</li>
<li><strong>The island on Windows:</strong> drop a link or a photo on it from any program and it's saved.</li>
<li><strong>PIN notes:</strong> they're encrypted on your device, and even the server can't read them.</li>
<li><strong>No ads:</strong> everything important is free and Premium is optional.</li>
</ul>
<div class="botones"><a class="btn p" href="{{home}}#descargar">Get Teire for free</a><a class="btn s" href="/app/">Use it in your browser</a></div>`]],
            ["donde", ["Dónde la podés usar", "Where you can use it"], [
                `<p>Hay app para <strong>Windows, Android y Linux</strong>, se instala en <a href="{{pagina:iphone}}">iPhone desde Safari</a> y también funciona en el navegador. Con una cuenta gratis, tus notas se sincronizan entre todos tus dispositivos.</p>`,
                `<p>There are apps for <strong>Windows, Android and Linux</strong>, it installs on <a href="{{pagina:iphone}}">iPhone from Safari</a> and it also works in the browser. With a free account, your notes sync across all your devices.</p>`]],
            ["antes", ["Lo que tenés que saber antes de cambiarte", "What to know before you switch"], [
                `<ul>
<li><strong>Todavía no hay importador.</strong> Tus notas de Keep se pasan a mano, copiando y pegando. Si tenés cientos, arrancá con las que usás.</li>
<li><strong>En iPhone no pasa por la App Store.</strong> Se instala desde Safari en tres toques.</li>
<li><strong>La isla es solo para Windows</strong> y la voz de Teire IA, para la app de escritorio.</li>
<li><strong>Teire es un proyecto independiente</strong> hecho en Argentina, no una empresa grande.</li>
</ul>`,
                `<ul>
<li><strong>There's no importer yet.</strong> Your Keep notes are moved by hand, copying and pasting. If you have hundreds, start with the ones you use.</li>
<li><strong>On iPhone it doesn't go through the App Store.</strong> It installs from Safari in three taps.</li>
<li><strong>The island is Windows-only</strong> and Teire AI's voice is for the desktop app.</li>
<li><strong>Teire is an independent project</strong> made in Argentina, not a big company.</li>
</ul>`]],
            ["keep", ["Cuándo te conviene seguir con Keep", "When it makes sense to stay with Keep"], [
                `<p>Si vivís adentro de Google y pasás tus notas a Docs todo el tiempo, Keep ya está integrada con esos servicios. Si lo que buscás es compartir con tu gente, armar listas en vivo y tener un lugar para tu grupo, Teire está hecha para eso.</p>
<p>Google Keep es una marca de Google. Teire no tiene relación con Google.</p>`,
                `<p>If you live inside Google and move your notes to Docs all the time, Keep is already integrated with those services. If what you want is to share with your people, build live lists and have a place for your group, Teire is made for that.</p>
<p>Google Keep is a Google trademark. Teire has no relationship with Google.</p>`]],
        ],
    },
];
