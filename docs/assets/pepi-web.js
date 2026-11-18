var PepiTeire = (function(exports) {
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	// src/ui/pepi.ts
	var CARAS_PEPI = [
		"neutro",
		"atento",
		"contento",
		"sereno",
		"enamorado",
		"orgulloso",
		"guino",
		"mareado",
		"cansado",
		"concentrado",
		"molesto",
		"triste",
		"sorprendido",
		"pensando",
		"bostezo",
		"dormido",
		"ilusionado",
		"nervioso"
	];
	var GESTOS_PEPI = [
		"hola",
		"festejar",
		"aplaudir",
		"tapar",
		"asombro",
		"pensar",
		"tada",
		"no",
		"rendido",
		"chau"
	];
	var SONIDO_DE_CARA = {
		atento: "aviso",
		contento: "tilde",
		enamorado: "enamorado",
		orgulloso: "racha",
		guino: "guino",
		mareado: "mareado",
		cansado: "bostezo",
		concentrado: "focoini",
		molesto: "molesto",
		triste: "internet",
		sorprendido: "mensaje",
		pensando: "pensando",
		bostezo: "bostezo",
		dormido: "dormir",
		ilusionado: "cumple"
	};
	var SONIDO_DE_GESTO = {
		hola: "hola",
		festejar: "cumple",
		aplaudir: "racha",
		tapar: "guino",
		asombro: "mensaje",
		pensar: "pensando",
		tada: "tilde",
		no: "molesto",
		rendido: "bostezo",
		chau: "cerrar"
	};
	var TINTA = "#0B0B0C";
	var DATOS = {
		neutro: { color: "#5FD4A0" },
		atento: {
			color: "#FFC86B",
			signo: "!",
			animacion: "rebote"
		},
		contento: {
			color: "#6FE3AE",
			particula: "chispa",
			animacion: "salto"
		},
		sereno: {
			color: "#5FD4A0",
			animacion: "lento"
		},
		enamorado: {
			color: "#FF9FB5",
			particula: "corazon"
		},
		orgulloso: {
			color: "#8FE9C0",
			particula: "estrella",
			animacion: "salto"
		},
		guino: { color: "#5FD4A0" },
		mareado: {
			color: "#F29BC6",
			animacion: "mareo"
		},
		cansado: {
			color: "#F6A25C",
			particula: "sudor",
			animacion: "lento"
		},
		concentrado: { color: "#C79BFF" },
		molesto: {
			color: "#FF7A66",
			animacion: "aplastado"
		},
		triste: {
			color: "#8FB8FF",
			particula: "lagrima",
			animacion: "lento"
		},
		sorprendido: {
			color: "#FFC86B",
			signo: "!",
			animacion: "salto"
		},
		pensando: {
			color: "#C79BFF",
			signo: "…",
			mira: [.75, -.85]
		},
		bostezo: {
			color: "#86A89A",
			animacion: "lento"
		},
		dormido: {
			color: "#86A89A",
			particula: "z",
			animacion: "lento"
		},
		ilusionado: {
			color: "#6FE3AE",
			particula: "confeti",
			animacion: "salto"
		},
		nervioso: {
			color: "#F6A25C",
			particula: "sudor",
			animacion: "rebote"
		}
	};
	/** El color del cuerpo de cada cara. */
	var colorPepi = (cara) => DATOS[cara].color;
	var PARPADEAN = [
		"neutro",
		"atento",
		"sorprendido",
		"triste",
		"nervioso",
		"pensando"
	];
	var CUERPO = {
		hw: 62,
		hy: 156,
		y: 142,
		lx: 78,
		rx: 122,
		R: 9,
		signo: [156, 76],
		recorteChico: "8 18 184 184"
	};
	var FORMA = "<path class=\"bd\" d=\"M100 72 C150 72 172 112 168 150 C164 184 134 197 100 197 C66 197 36 184 32 150 C28 112 50 72 100 72 Z\"/><ellipse cx=\"68\" cy=\"108\" rx=\"12\" ry=\"14\" fill=\"#fff\" opacity=\".16\" transform=\"rotate(20 68 108)\"/>";
	var brote = (escala) => `<g transform="translate(100 74) scale(${escala})"><path d="M0 0 C0 -11 2 -17.6 2.4 -22" stroke="#1F9D6E" stroke-width="5" stroke-linecap="round" fill="none"/><path transform="translate(2 -21) scale(.8)" d="M0 2 C6 -14 24 -16 32 -10 C28 4 12 8 0 2Z" fill="#1F9D6E"/></g>`;
	var ESTRELLA = "M0 -1 L.29 -.4 .95 -.31 .47 .15 .59 .81 0 .5 -.59 .81 -.47 .15 -.95 -.31 -.29 -.4Z";
	var CHISPA = "M0 -1 L.28 -.28 1 0 .28 .28 0 1 -.28 .28 -1 0 -.28 -.28Z";
	var CORAZON = "M0 .9 C-1.3 -.1 -.9 -1.1 0 -.55 C.9 -1.1 1.3 -.1 0 .9Z";
	var ojos = (cara, R) => {
		const { lx, rx, y } = CUERPO;
		const trazo = `fill="none" stroke="${TINTA}" stroke-width="${(R * .4).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"`;
		const punto = (x, yy = y, a = .56, b = .8) => `<ellipse cx="${x}" cy="${yy}" rx="${R * a}" ry="${R * b}" fill="${TINTA}"/>`;
		const arriba = (x) => `<path d="M${x - R * .9} ${y + R * .4} Q${x} ${y - R} ${x + R * .9} ${y + R * .4}" ${trazo}/>`;
		const abajo = (x) => `<path d="M${x - R * .9} ${y - R * .15} Q${x} ${y + R * .95} ${x + R * .9} ${y - R * .15}" ${trazo}/>`;
		const figura = (x, d, escala, relleno) => `<g transform="translate(${x} ${y}) scale(${escala})" fill="${relleno}"><path d="${d}"/></g>`;
		const espiral = (x) => `<g transform="translate(${x} ${y}) scale(${R / 9})"><path d="M0 0 C3 -4 8 -1 6 4 C4 9 -4 9 -7 3 C-10 -4 -3 -11 6 -9" fill="none" stroke="${TINTA}" stroke-width="2.6" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur=".7s" repeatCount="indefinite"/></path></g>`;
		switch (cara) {
			case "neutro":
			case "pensando": return punto(lx) + punto(rx);
			case "atento": return [lx, rx].map((x) => `<ellipse cx="${x}" cy="${y}" rx="${R * .85}" ry="${R * 1.1}" fill="${TINTA}"/><circle cx="${x - R * .28}" cy="${y - R * .38}" r="${R * .3}" fill="#fff"/>`).join("");
			case "contento": return arriba(lx) + arriba(rx);
			case "sereno":
			case "dormido": return abajo(lx) + abajo(rx);
			case "enamorado": return figura(lx, CORAZON, R * 1.25, "#FF4F6E") + figura(rx, CORAZON, R * 1.25, "#FF4F6E");
			case "orgulloso": return figura(lx, ESTRELLA, R * 1.3, "#FFC86B") + figura(rx, ESTRELLA, R * 1.3, "#FFC86B");
			case "guino": return punto(lx) + arriba(rx);
			case "mareado": return espiral(lx) + espiral(rx);
			case "cansado": return [lx, rx].map((x) => `<path d="M${x - R * .9} ${y - R * .1} L${x + R * .9} ${y - R * .1} Q${x} ${y + R * 1.1} ${x - R * .9} ${y - R * .1}Z" fill="${TINTA}"/>`).join("");
			case "concentrado": return [lx, rx].map((x) => `<path d="M${x - R * .9} ${y} L${x + R * .9} ${y}" ${trazo}/>`).join("");
			case "molesto": return `<path d="M${lx - R * .9} ${y - R * .6} L${lx + R * .9} ${y + R * .25}" ${trazo}/><path d="M${rx + R * .9} ${y - R * .6} L${rx - R * .9} ${y + R * .25}" ${trazo}/>`;
			case "triste": return punto(lx, y + 2) + punto(rx, y + 2) + `<path d="M${lx - R * .9} ${y - R * .9} L${lx + R * .6} ${y - R * 1.6}" ${trazo}/><path d="M${rx + R * .9} ${y - R * .9} L${rx - R * .6} ${y - R * 1.6}" ${trazo}/>`;
			case "sorprendido": return punto(lx, y, .36, .5) + punto(rx, y, .36, .5);
			case "bostezo": return `<path d="M${lx - R * .8} ${y - R * .85} L${lx + R * .6} ${y} L${lx - R * .8} ${y + R * .85}" ${trazo}/><path d="M${rx + R * .8} ${y - R * .85} L${rx - R * .6} ${y} L${rx + R * .8} ${y + R * .85}" ${trazo}/>`;
			case "ilusionado": return figura(lx, CHISPA, R * 1.15, TINTA) + figura(rx, CHISPA, R * 1.15, TINTA);
			case "nervioso": return punto(lx, y, .5, .7) + punto(rx, y, .5, .7);
		}
	};
	var posicion = (p) => {
		const { hw, hy, y, lx, rx } = CUERPO;
		const cx = 100;
		switch (p) {
			case "saludar": return {
				L: [
					cx - hw,
					hy,
					0
				],
				R: [
					cx + hw + 12,
					hy - 66,
					-25,
					false,
					"wave"
				]
			};
			case "festejar": return {
				L: [
					cx - hw + 6,
					hy - 80,
					20,
					false,
					"cheer"
				],
				R: [
					cx + hw - 6,
					hy - 80,
					-20,
					false,
					"cheer"
				]
			};
			case "aplaudir": return {
				L: [
					91,
					y + 36,
					0,
					true,
					"clapl"
				],
				R: [
					109,
					y + 36,
					0,
					true,
					"clapr"
				]
			};
			case "tapar": return {
				L: [
					lx,
					y + 2,
					0,
					true
				],
				R: [
					rx,
					y + 2,
					0,
					true
				]
			};
			case "asombro": return {
				L: [
					lx - 28,
					y + 24,
					-15,
					true
				],
				R: [
					rx + 28,
					y + 24,
					15,
					true
				]
			};
			case "pensar": return {
				L: [
					cx - hw,
					hy,
					0
				],
				R: [
					114,
					y + 36,
					0,
					true
				]
			};
			case "tada": return {
				L: [
					cx - hw - 14,
					hy - 36,
					28,
					false,
					"cheer"
				],
				R: [
					cx + hw + 14,
					hy - 36,
					-28,
					false,
					"cheer"
				]
			};
			case "no": return {
				L: [
					86,
					y + 36,
					0,
					true,
					"shake"
				],
				R: [
					114,
					y + 36,
					0,
					true,
					"shake"
				]
			};
			case "caer": return {
				L: [
					cx - hw + 2,
					hy + 18,
					0
				],
				R: [
					cx + hw - 2,
					hy + 18,
					0
				]
			};
			default: return {
				L: [
					cx - hw,
					hy,
					0
				],
				R: [
					cx + hw,
					hy,
					0
				]
			};
		}
	};
	var GESTOS = {
		hola: {
			cara: "contento",
			pose: "saludar"
		},
		festejar: {
			cara: "ilusionado",
			pose: "festejar"
		},
		aplaudir: {
			cara: "orgulloso",
			pose: "aplaudir"
		},
		tapar: {
			cara: "sereno",
			pose: "tapar"
		},
		asombro: {
			cara: "sorprendido",
			pose: "asombro"
		},
		pensar: {
			cara: "pensando",
			pose: "pensar"
		},
		tada: {
			cara: "contento",
			pose: "tada"
		},
		no: {
			cara: "molesto",
			pose: "no"
		},
		rendido: {
			cara: "cansado",
			pose: "caer"
		},
		chau: {
			cara: "sereno",
			pose: "saludar"
		}
	};
	var mano = (k) => `<g class="hp ${k}" style="opacity:0"><g class="hw"><ellipse class="hand" rx="15" ry="12.5"/></g></g>`;
	var aleatorio = (a, b) => a + Math.random() * (b - a);
	var particula = (tipo, R) => {
		const { lx, rx, y } = CUERPO;
		let x = aleatorio(60, 140);
		let yy = aleatorio(40, 70);
		let dx = aleatorio(-20, 20);
		let dy = -aleatorio(40, 70);
		let duracion = 1.8;
		let giro = aleatorio(-40, 40);
		let dibujo = "";
		const e = (v) => v.toFixed(1);
		switch (tipo) {
			case "corazon":
				dibujo = `<path d="${CORAZON}" fill="#FF4F6E" transform="scale(${e(aleatorio(7, 12))})"/>`;
				break;
			case "estrella":
				dibujo = `<path d="${ESTRELLA}" fill="#FFC86B" transform="scale(${e(aleatorio(7, 12))})"/>`;
				x = aleatorio(40, 160);
				yy = aleatorio(30, 80);
				break;
			case "chispa":
				dibujo = `<path d="${CHISPA}" fill="#F4EFE6" transform="scale(${e(aleatorio(5, 9))})"/>`;
				x = aleatorio(40, 160);
				yy = aleatorio(40, 90);
				break;
			case "sudor":
				dibujo = "<path d=\"M0 -8 C6 0 7 4 0 8 C-7 4 -6 0 0 -8Z\" fill=\"#8FB8FF\"/>";
				x = rx + 28 + aleatorio(0, 14);
				yy = y - 24;
				dx = 8;
				dy = 26;
				duracion = 1.1;
				break;
			case "lagrima":
				dibujo = "<path d=\"M0 -7 C5 0 6 3 0 7 C-6 3 -5 0 0 -7Z\" fill=\"#CFE0FF\"/>";
				x = Math.random() < .5 ? lx : rx;
				yy = y + 8;
				dx = 0;
				dy = 34;
				duracion = 1.2;
				break;
			case "z":
				dibujo = `<text font-family="Caveat,cursive" font-weight="600" font-size="${Math.round(aleatorio(20, 30))}" fill="#9B9BA1">z</text>`;
				x = 142;
				yy = 60;
				dx = 16;
				dy = -26;
				duracion = 2.4;
				break;
			case "confeti": {
				const colores = [
					"#FFC86B",
					"#FF7A66",
					"#8FB8FF",
					"#F4EFE6",
					"#C79BFF"
				];
				dibujo = `<rect x="-4" y="-2.5" width="8" height="5" rx="1.5" fill="${colores[Math.floor(Math.random() * colores.length)]}"/>`;
				x = aleatorio(50, 150);
				yy = aleatorio(20, 50);
				dx = aleatorio(-26, 26);
				dy = aleatorio(30, 70);
				giro = aleatorio(-300, 300);
				break;
			}
		}
		return {
			x,
			y: yy,
			dx,
			dy,
			duracion,
			giro,
			dibujo
		};
	};
	var contadorBrillo = 0;
	var vivos = /* @__PURE__ */ new Set();
	/** Un gesto con manitos en todos los Pepi grandes que se estan viendo (el del Inicio, el de la isla abierta o el de un aviso). Los
	*  chicos no tienen manitos. El sonido lo pone quien llama (vozPepi.ts). */
	var gestoPepi = (gesto, ms) => {
		vivos.forEach((p) => {
			if (p.elemento.isConnected && p.tieneManos() && p.vivoAhora()) p.gesto(gesto, ms, false);
		});
	};
	var ultimoMovimiento = 0;
	var motorParpadeo = 0;
	var motorMirada = 0;
	var pendienteMouse = 0;
	var ultimaPosicion = null;
	var alMover = (e) => {
		ultimoMovimiento = Date.now();
		ultimaPosicion = {
			x: e.clientX,
			y: e.clientY
		};
		if (pendienteMouse) return;
		pendienteMouse = requestAnimationFrame(() => {
			pendienteMouse = 0;
			if (!ultimaPosicion) return;
			const { x, y } = ultimaPosicion;
			vivos.forEach((p) => p.seguir(x, y));
		});
	};
	var soltarSueltos = () => vivos.forEach((p) => p.elemento.isConnected || p.destruir());
	var parpadeo = () => {
		soltarSueltos();
		if (!vivos.size) return;
		if (!document.hidden) vivos.forEach((p) => p.parpadear());
		motorParpadeo = window.setTimeout(parpadeo, aleatorio(2600, 6e3));
	};
	var mirarAlrededor = () => {
		if (!motorMirada) return;
		if (!document.hidden && Date.now() - ultimoMovimiento > 3500) vivos.forEach((p) => p.mirarAlAzar());
		motorMirada = window.setTimeout(mirarAlrededor, 2600);
	};
	var arrancarMotor = () => {
		if (motorParpadeo) return;
		window.addEventListener("pointermove", alMover, { passive: true });
		motorParpadeo = window.setTimeout(parpadeo, 2500);
		motorMirada = window.setTimeout(mirarAlrededor, 2600);
	};
	var pararMotor = () => {
		if (!motorParpadeo || vivos.size) return;
		window.removeEventListener("pointermove", alMover);
		window.clearTimeout(motorParpadeo);
		window.clearTimeout(motorMirada);
		motorParpadeo = 0;
		motorMirada = 0;
	};
	var PepiVivo = class {
		opciones;
		svg;
		ojosEl;
		signoEl;
		particulasEl;
		inclinadoEl;
		actual = "neutro";
		base = "neutro";
		temporizador = 0;
		temporizadorParticulas = 0;
		golpes = [];
		miraFija = false;
		R;
		constructor(host, opciones) {
			this.opciones = opciones;
			const chico = !!opciones.chico;
			this.R = chico ? CUERPO.R * 1.45 : CUERPO.R;
			const sinManos = chico;
			host.innerHTML = `<svg class="pepi${chico ? " chico" : ""}" viewBox="${chico ? CUERPO.recorteChico : "0 0 200 200"}" ${opciones.etiqueta ? `role="img" aria-label="${opciones.etiqueta.replace(/"/g, "&quot;")}"` : "aria-hidden=\"true\""}>` + (opciones.brillo ? `<defs><radialGradient id="pg${++contadorBrillo}"><stop offset="0" style="stop-color:var(--c);stop-opacity:.5"/><stop offset=".55" style="stop-color:var(--c);stop-opacity:.2"/><stop offset="1" style="stop-color:var(--c);stop-opacity:0"/></radialGradient></defs><circle class="brillo" cx="100" cy="${CUERPO.y - 6}" r="112" fill="url(#pg${contadorBrillo})"/>` : "") + `<ellipse cx="100" cy="193" rx="46" ry="6" fill="#000" opacity=".35"/><g class="inclinado"><g class="cuerpo">${sinManos ? "" : mano("bl") + mano("br")}${brote(chico ? 1.35 : 1)}${FORMA}<g class="ojos" style="transform-origin:100px ${CUERPO.y}px"></g>${sinManos ? "" : mano("fl") + mano("fr")}</g></g><g class="signo"></g><g class="particulas"></g></svg>`;
			this.svg = host.firstElementChild;
			this.ojosEl = this.svg.querySelector(".ojos");
			this.signoEl = this.svg.querySelector(".signo");
			this.particulasEl = this.svg.querySelector(".particulas");
			this.inclinadoEl = this.svg.querySelector(".inclinado");
			this.pintar("neutro", true);
			this.poner("x");
			if (!opciones.estatico) {
				let esperando = 0;
				this.svg.addEventListener("pointerdown", () => {
					window.clearTimeout(esperando);
					this.tocar();
				});
				this.svg.addEventListener("pointerenter", () => {
					window.clearTimeout(esperando);
					esperando = window.setTimeout(() => {
						if (this.base === "neutro" && this.actual === "neutro") this.temp("enamorado", 2300);
					}, 2e3);
				});
				this.svg.addEventListener("pointerleave", () => window.clearTimeout(esperando));
				vivos.add(this);
				arrancarMotor();
			}
		}
		get cara() {
			return this.actual;
		}
		get elemento() {
			return this.svg;
		}
		destruir() {
			window.clearTimeout(this.temporizador);
			window.clearTimeout(this.temporizadorParticulas);
			window.clearTimeout(this.temporizadorBostezo);
			vivos.delete(this);
			pararMotor();
		}
		pintar(cara, sinMovimiento = false) {
			const d = DATOS[cara];
			this.actual = cara;
			this.svg.style.setProperty("--c", d.color);
			this.opciones.alCambiar?.(cara);
			this.ojosEl.innerHTML = ojos(cara, this.R);
			this.signoEl.innerHTML = d.signo ? `<text x="${CUERPO.signo[0]}" y="${CUERPO.signo[1]}" font-size="34" font-weight="800" fill="${d.color}" text-anchor="middle" font-family="Inter,sans-serif">${d.signo}</text>` : "";
			for (const clase of [
				"salto",
				"rebote",
				"mareo",
				"aplastado",
				"lento"
			]) this.svg.classList.remove(clase);
			this.svg.classList.toggle("dormido", cara === "dormido");
			if (d.animacion && !sinMovimiento && !this.opciones.estatico) {
				this.svg.getBoundingClientRect();
				this.svg.classList.add(d.animacion);
			}
			this.miraFija = !!d.mira;
			if (d.mira) this.mirar(d.mira[0], d.mira[1]);
			this.programarParticulas();
			this.programarBostezo();
		}
		temporizadorBostezo = 0;
		ultimoBostezo = 0;
		programarBostezo() {
			window.clearTimeout(this.temporizadorBostezo);
			if (!this.opciones.bosteza || this.actual !== "cansado") return;
			const hace = Date.now() - this.ultimoBostezo;
			const espera = this.ultimoBostezo && hace < 3e5 ? Math.max(5e3, aleatorio(18e4, 3e5) - hace) : 6e3;
			this.temporizadorBostezo = window.setTimeout(() => {
				if (this.actual !== "cansado") return;
				if (!document.hidden && this.vivoAhora()) {
					this.ultimoBostezo = Date.now();
					this.opciones.alBostezar?.();
					this.temp("bostezo", 1800);
				} else this.programarBostezo();
			}, espera);
		}
		programarParticulas() {
			window.clearTimeout(this.temporizadorParticulas);
			const tipo = DATOS[this.actual].particula;
			if (!tipo || this.opciones.estatico || this.opciones.chico || this.opciones.calmo) return;
			const soltar = () => {
				if (!document.hidden && this.vivoAhora()) this.soltarParticula(tipo);
				this.temporizadorParticulas = window.setTimeout(soltar, 420);
			};
			this.temporizadorParticulas = window.setTimeout(soltar, 200);
		}
		soltarParticula(tipo) {
			const p = particula(tipo, this.R);
			const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
			g.setAttribute("transform", `translate(${p.x.toFixed(0)} ${p.y.toFixed(0)})`);
			g.innerHTML = `<g class="pt" style="--dx:${p.dx.toFixed(0)}px;--dy:${p.dy.toFixed(0)}px;--r:${p.giro.toFixed(0)}deg;--d:${p.duracion}s">${p.dibujo}</g>`;
			this.particulasEl.appendChild(g);
			window.setTimeout(() => g.remove(), p.duracion * 1e3 + 100);
		}
		poner(pose) {
			if (this.opciones.chico) return;
			const o = posicion(pose);
			const reposo = posicion("x");
			["L", "R"].forEach((lado) => {
				const l = lado === "L" ? "l" : "r";
				const manoPose = o[lado];
				const delante = !!manoPose[3];
				[["b", !delante], ["f", delante]].forEach(([prefijo, activa]) => {
					const g = this.svg.querySelector(`.${prefijo}${l}`);
					if (!g) return;
					const m = activa ? manoPose : reposo[lado];
					g.style.transform = `translate(${m[0]}px,${m[1]}px) rotate(${m[2]}deg)`;
					g.style.opacity = activa && pose !== "x" ? "1" : "0";
					g.firstElementChild?.setAttribute("class", `hw${activa && manoPose[4] ? ` ${manoPose[4]}` : ""}`);
				});
			});
		}
		fijar(cara) {
			window.clearTimeout(this.temporizador);
			this.base = cara;
			this.pintar(cara);
			this.poner("x");
		}
		temp(cara, ms, pose, sonido) {
			window.clearTimeout(this.temporizador);
			const suena = sonido === void 0 ? SONIDO_DE_CARA[cara] : sonido;
			if (this.opciones.sonidos && suena);
			this.pintar(cara);
			this.poner(pose ?? "x");
			this.temporizador = window.setTimeout(() => {
				this.pintar(this.base);
				this.poner("x");
			}, ms);
		}
		gesto(gesto, ms = 2800, conSonido = true) {
			const g = GESTOS[gesto];
			this.temp(g.cara, ms, g.pose, conSonido ? SONIDO_DE_GESTO[gesto] : null);
		}
		bailar(si) {
			this.svg.classList.toggle("baila", si);
		}
		tocar() {
			if (this.actual === "mareado") return;
			const ahora = Date.now();
			this.golpes = this.golpes.filter((t) => ahora - t < 1700);
			this.golpes.push(ahora);
			this.svg.style.setProperty("--gx", `${Math.random() < .5 ? -7 : 7}px`);
			this.svg.classList.remove("golpe");
			this.svg.getBoundingClientRect();
			this.svg.classList.add("golpe");
			if (this.golpes.length >= 3) {
				this.golpes = [];
				this.temp("mareado", 3e3);
			} else this.temp("molesto", 800);
		}
		mirar(dx, dy) {
			this.ojosEl.style.transform = `translate(${dx * 4.5}px,${dy * 3.4}px) scale(${(1 - Math.abs(dx) * .16).toFixed(3)},${(1 - Math.abs(dy) * .1).toFixed(3)})`;
			this.inclinadoEl.style.transform = `translate(${dx * 3}px,${dy * 2}px)`;
		}
		seguir(px, py) {
			if (!this.vivoAhora() || this.miraFija || this.actual === "dormido" || this.actual === "mareado") return;
			const r = this.svg.getBoundingClientRect();
			if (!r.width) return;
			const dx = px - (r.left + r.width / 2);
			const dy = py - (r.top + r.height * .55);
			const d = Math.hypot(dx, dy) || 1;
			const k = Math.min(1, d / 180);
			this.mirar(dx / d * k, dy / d * k);
		}
		mirarAlAzar() {
			if (!this.vivoAhora() || this.opciones.calmo || this.opciones.chico || this.miraFija || this.actual === "dormido" || this.actual === "mareado") return;
			this.mirar(aleatorio(-1, 1), aleatorio(-.5, .9));
		}
		tieneManos() {
			return !this.opciones.chico;
		}
		vivoAhora() {
			return !this.opciones.activo || this.opciones.activo();
		}
		ultimoParpadeo = 0;
		parpadeoEnDosPasos(doble = Math.random() < .22) {
			const paso = (cerrado) => {
				this.ojosEl.classList.toggle("cerrado", cerrado);
				document.dispatchEvent(new CustomEvent("pepi:pulso"));
			};
			paso(true);
			window.setTimeout(() => {
				paso(false);
				if (doble) window.setTimeout(() => this.vivoAhora() && this.parpadeoEnDosPasos(false), 230);
			}, 110);
		}
		parpadear() {
			if (!this.vivoAhora() || !PARPADEAN.includes(this.actual)) return;
			if (this.opciones.calmo) {
				if (Date.now() - this.ultimoParpadeo < 7e3) return;
				this.ultimoParpadeo = Date.now();
				return this.parpadeoEnDosPasos();
			}
			this.ojosEl.classList.add("parpadeo");
			window.setTimeout(() => this.ojosEl.classList.remove("parpadeo"), 200);
		}
	};
	var crearPepi = (host, opciones = {}) => new PepiVivo(host, opciones);
	exports.CARAS_PEPI = CARAS_PEPI;
	exports.GESTOS_PEPI = GESTOS_PEPI;
	exports.colorPepi = colorPepi;
	exports.crearPepi = crearPepi;
	exports.gestoPepi = gestoPepi;
	return exports;
})({});
