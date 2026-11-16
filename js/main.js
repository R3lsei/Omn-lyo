/* OMNÉLYO — interactions du site
   ------------------------------------------------------------------
   À PERSONNALISER : tout ce qui dépend de votre activité est ici. */
const CONFIG = {
  email: "contact@omnelyo.fr",        // adresse qui reçoit les demandes de rendez-vous
  // Pour recevoir les demandes sans passer par la messagerie du visiteur,
  // collez ici l'adresse d'un service de formulaire (ex. Formspree) :
  formEndpoint: "",
  slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  daysAhead: 15,                       // nombre de jours ouvrés proposés
  duration: "30 minutes"
};

document.documentElement.classList.add("js");
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Visuels de livrables (construits en HTML, sans image externe) ---------- */
const LOGO = "assets/logo-omnelyo.webp";
const ART = {
  brand: `<div class="art__in ab">
    <div class="t ab-logo" style="--k:0"><img src="${LOGO}" alt=""></div>
    <div class="t ab-type" style="--k:1"><b>Aa</b><span>Syne Bold<br>Hanken Grotesk</span></div>
    <div class="t ab-pal" style="--k:2"><i style="--c:#A2185B"><em>A2185B</em></i><i style="--c:#312783"><em>312783</em></i><i style="--c:#1B1647"><em>1B1647</em></i><i style="--c:#F1EFF9;--f:#1B1647"><em>F1EFF9</em></i></div>
    <div class="t ab-card" style="--k:3"><img src="${LOGO}" alt=""><span>Communication · Digital · IA</span></div>
  </div>`,
  social: `<div class="art__in as">
    <div class="as-phone"><div class="as-bar"></div><div class="as-grid">${"<i></i>".repeat(9)}</div></div>
    <div class="as-edit">
      <div class="as-screen"><span class="as-play"></span></div>
      <div class="as-tracks"><i></i><i></i><i></i><b class="as-head"></b></div>
    </div>
  </div>`,
  ia: `<div class="art__in ai">
    <div class="ai-prompt"><span>Votre brief</span><p>Trois pistes de slogan pour une boulangerie artisanale<i class="caret"></i></p></div>
    <svg class="ai-wires" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true"><path d="M200 96C200 130 90 126 90 160"/><path d="M200 96V160"/><path d="M200 96C200 130 310 126 310 160"/><path d="M90 200C90 236 200 222 200 250"/><path d="M200 200V250"/><path d="M310 200C310 236 200 222 200 250"/></svg>
    <div class="ai-ideas"><i>Piste 1</i><i>Piste 2</i><i>Piste 3</i></div>
    <div class="ai-human">Relecture et choix humains</div>
  </div>`
};
document.querySelectorAll("[data-art]").forEach(el => (el.innerHTML = ART[el.dataset.art]));

/* ---------- Pages des trois pôles ---------- */
const POLES = [
  { slug: "communication", num: "01", title: "Communication", art: "brand", cta: "Un projet de communication ?",
    intro: "Avant de produire, on clarifie : à qui vous parlez, ce que vous avez à dire et ce qui vous distingue. Le reste en découle, du logo à la plaquette.",
    items: [
      ["Conseil et stratégie de communication", "Un état des lieux de votre communication, puis un plan clair : <b>cibles, messages, canaux et priorités</b>. Vous savez quoi faire, dans quel ordre et pourquoi."],
      ["Création d'identités visuelles", "<b>Logo, palette, typographies et règles d'usage</b>, réunis dans une charte graphique. Une image cohérente et reconnaissable sur tous vos supports."],
      ["Création de supports de communication", "Plaquettes, flyers, affiches, cartes de visite, présentations : des supports <b>imprimés ou numériques</b>, livrés prêts à diffuser."],
      ["Accompagnement des entreprises", "Un regard extérieur dans la durée : <b>points réguliers, conseils et ajustements</b> pour garder le cap quand votre activité évolue."]
    ] },
  { slug: "digital", num: "02", title: "Digital", art: "social", cta: "Un projet digital ?",
    intro: "Vos clients vous découvrent d'abord en ligne. Nous faisons en sorte que ce premier contact donne envie, sur vos réseaux comme sur votre site.",
    items: [
      ["Gestion et animation des réseaux sociaux", "<b>Ligne éditoriale, calendrier, création des publications et animation</b> de votre communauté, sur les réseaux utiles à votre activité."],
      ["Création de contenus visuels et audiovisuels", "Visuels, photos mises en forme, vidéos courtes : des contenus <b>pensés pour chaque format</b> et fidèles à votre identité."],
      ["Montage vidéo", "Vos images montées, rythmées, sous-titrées et <b>déclinées aux formats</b> des réseaux, de votre site ou de vos événements."],
      ["Création de sites internet", "Un site <b>clair, rapide et adapté au mobile</b>, que vous pouvez faire évoluer. De la maquette à la mise en ligne."]
    ] },
  { slug: "ia", num: "03", title: "Intelligence artificielle", art: "ia", cta: "Envie d'y voir clair sur l'IA ?", long: true,
    intro: "L'IA fait gagner du temps quand on sait quoi lui demander. Nous vous aidons à l'utiliser à bon escient, sans jargon et en gardant la main sur le résultat.",
    items: [
      ["Accompagnement à l'utilisation des outils IA", "Nous choisissons avec vous <b>les outils adaptés à vos tâches</b>, puis nous les prenons en main ensemble sur vos cas concrets."],
      ["Formation et conseil", "Des sessions <b>pratiques, adaptées au niveau de vos équipes</b> : bonnes pratiques, limites à connaître, confidentialité."],
      ["Optimisation des méthodes de travail", "Nous repérons les tâches répétitives et proposons <b>des façons de faire plus simples</b>, avec ou sans IA."],
      ["Intégration de l'IA dans vos processus de communication", "Idées, premières versions, déclinaisons : l'IA <b>accélère la production</b>, la relecture et les choix restent humains."]
    ] }
];
const ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';
document.getElementById("main").insertAdjacentHTML("beforeend", POLES.map(p => `
<div class="view" data-view="${p.slug}">
  <section class="page pole">
    <div class="wrap">
      <a class="back" href="#expertises">Toutes les expertises</a>
      <p class="eyebrow">Pôle ${p.num}</p>
      <h1 class="pole__title${p.long ? " is-long" : ""}">${p.title}</h1>
      <div class="pole__top">
        <div><p class="pole__intro">${p.intro}</p><a class="btn" href="#rendez-vous">Prendre rendez-vous ${ARROW}</a></div>
        <div class="pole__stage"><div class="art">${ART[p.art]}</div></div>
      </div>
      <div class="faq__grid pole__list">
        <div><p class="eyebrow">Prestations</p><h2 class="match__lead">Ce que nous faisons pour vous.</h2></div>
        <div class="xp faq" data-acc="any">${p.items.map(([t, d], i) => `
          <div class="xp__item${i === 0 ? " is-open" : ""}">
            <h3><button class="xp__head" type="button" aria-expanded="${i === 0}"><span class="xp__title">${t}</span><span class="xp__sign"></span></button></h3>
            <div class="xp__panel"><div><p class="faq__text">${d}</p></div></div>
          </div>`).join("")}
        </div>
      </div>
      <div class="pole__cta"><h2>${p.cta}</h2><a class="btn btn--light" href="#rendez-vous">Choisir un créneau ${ARROW}</a></div>
      <p class="eyebrow">Les autres pôles</p>
      <div class="pole__next">${POLES.filter(o => o !== p).map(o => `<a href="#${o.slug}"><small>${o.num}</small><span>${o.title}</span>${ARROW}</a>`).join("")}</div>
    </div>
  </section>
</div>`).join(""));

/* ---------- Valeurs de configuration dans la page ---------- */
$$("[data-cfg='email']").forEach(el => {
  el.textContent = CONFIG.email;
  if (el.tagName === "A") el.href = "mailto:" + CONFIG.email;
});
$$("[data-cfg='duration']").forEach(el => (el.textContent = CONFIG.duration));
$$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

/* ---------- Routage par ancre ---------- */
const views = $$(".view");
const viewNames = views.map(v => v.dataset.view);
function route(first) {
  const hash = decodeURIComponent(location.hash.slice(1));
  const name = viewNames.includes(hash) ? hash : "accueil";
  views.forEach(v => v.classList.toggle("is-current", v.dataset.view === name));
  $$("[data-nav]").forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + name));
  closeMenu();
  if (name !== "accueil" || !hash || hash === "accueil") {
    if (!first) window.scrollTo(0, 0);
  } else {
    const target = document.getElementById(hash);
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: first || reduced ? "auto" : "smooth" }));
  }
  onScroll();
}
addEventListener("hashchange", () => route(false));

/* ---------- Menu mobile ---------- */
const burger = $(".burger"), nav = $(".nav");
function closeMenu() { nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
});
nav.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });

/* ---------- Défilement : en-tête, progression, rail de la méthode ---------- */
const header = $(".header"), progress = $(".progress"), rail = $(".steps__rail i"), stepsEl = $(".steps");
let ticking = false;
function onScroll() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  header.classList.toggle("is-scrolled", y > 24);
  progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  if (rail && stepsEl.offsetParent) {
    const r = stepsEl.getBoundingClientRect();
    const p = (innerHeight * 0.62 - r.top) / r.height;
    rail.style.transform = `scaleY(${Math.max(0, Math.min(1, p))})`;
  }
  ticking = false;
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener("resize", onScroll);

/* ---------- Apparitions ---------- */
const io = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        if (e.target.dataset.count) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -6% 0px" })
  : null;
$$(".reveal, .step, [data-count]").forEach(el => (io ? io.observe(el) : el.classList.add("is-in")));

function countUp(el) {
  const target = +el.dataset.count;
  if (reduced) { el.textContent = target; return; }
  const t0 = performance.now(), dur = 2600;
  (function tick(now) {
    const p = Math.min(1, (now - t0) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

/* ---------- Citation : les mots s'allument au fil de la lecture ---------- */
const quote = $(".studio__quote");
if (quote) {
  quote.innerHTML = quote.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(" ");
  const words = $$(".w", quote);
  const light = () => {
    if (!quote.offsetParent) return;
    const r = quote.getBoundingClientRect();
    const p = (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35);
    const n = reduced ? words.length : Math.round(Math.max(0, Math.min(1, p)) * words.length);
    words.forEach((w, i) => w.classList.toggle("on", i < n));
  };
  addEventListener("scroll", light, { passive: true });
  addEventListener("hashchange", light);
  light();
}

/* ---------- Souris : boutons aimantés, halo des cartes ---------- */
if (finePointer && !reduced) {
  $$(".btn").forEach(b => {
    b.addEventListener("pointermove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });
  $$(".pillar").forEach(c => c.addEventListener("pointermove", e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px");
    c.style.setProperty("--my", e.clientY - r.top + "px");
  }));
}

/* ---------- Héros : rubans diagonaux inspirés du logo ---------- */
(function ribbons() {
  const canvas = $("#ribbons");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const defs = [
    { color: "rgba(162,24,91,.92)", off: 0.00, amp: 46, thick: 74, speed: 0.24, phase: 0.0 },
    { color: "rgba(49,39,131,.94)", off: 0.13, amp: 38, thick: 46, speed: 0.19, phase: 1.7 },
    { color: "rgba(162,24,91,.30)", off: -0.15, amp: 60, thick: 22, speed: 0.3, phase: 3.1 },
    { color: "rgba(49,39,131,.22)", off: 0.27, amp: 52, thick: 14, speed: 0.26, phase: 4.6 }
  ];
  let w = 0, h = 0, dpr = 1, mouse = { x: 0.7, y: 0.4, tx: 0.7, ty: 0.4 }, start = performance.now() + 900, running = false;

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(2, devicePixelRatio || 1);
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw(now) {
    const t = (now - start) / 1000;
    const intro = reduced ? 1 : 1 - Math.pow(1 - Math.max(0, Math.min(1, t / 3.6)), 4);
    mouse.x += (mouse.tx - mouse.x) * 0.022; mouse.y += (mouse.ty - mouse.y) * 0.022;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "multiply";
    const scale = Math.max(0.55, Math.min(1.25, w / 1300));
    const step = 22, x0 = w * (w > 820 ? 0.4 : 0.1), x1 = (w + 80) * intro + x0 * (1 - intro);
    for (const d of defs) {
      const top = [], bot = [];
      for (let x = x0; x <= x1; x += step) {
        const u = (x - x0) / (w - x0);                       // 0 → 1 de gauche à droite
        const base = h * (1.08 + d.off) - Math.pow(u, 1.25) * h * 1.12;
        const wave = Math.sin(u * 5.2 + t * d.speed + d.phase) * d.amp * scale
                   + Math.sin(u * 11 - t * d.speed * 0.7 + d.phase * 2) * d.amp * 0.22 * scale;
        const pull = (mouse.y - 0.5) * 70 * Math.exp(-Math.pow((u - mouse.x) * 3, 2));
        const th = d.thick * scale * (0.35 + 0.65 * Math.abs(Math.sin(u * 3.1 + t * d.speed * 0.6 + d.phase))) * Math.min(1, u * 5);
        const y = base + wave + pull;
        top.push([x, y - th / 2]); bot.push([x, y + th / 2]);
      }
      if (top.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(top[0][0], top[0][1]);
      for (const p of top) ctx.lineTo(p[0], p[1]);
      for (let i = bot.length - 1; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]);
      ctx.closePath();
      ctx.fillStyle = d.color;
      ctx.fill();
    }
    if (running && !reduced) requestAnimationFrame(draw);
  }
  function setRunning(on) {
    if (on && !running) { running = true; requestAnimationFrame(draw); }
    else if (!on) running = false;
  }
  resize();
  addEventListener("resize", () => { resize(); if (reduced) draw(performance.now()); });
  addEventListener("pointermove", e => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) / r.width; mouse.ty = (e.clientY - r.top) / r.height;
  }, { passive: true });
  if (reduced) { draw(performance.now() + 5000); return; }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(es => setRunning(es[0].isIntersecting)).observe(canvas);
  } else setRunning(true);
  addEventListener("hashchange", () => requestAnimationFrame(() => { resize(); }));
})();

/* ---------- Prise de rendez-vous ---------- */
(function booking() {
  const form = $("#rdv-form");
  if (!form) return;
  const steps = $$(".bstep", form), stepper = $$(".stepper li");
  const error = $("#rdv-error"), daysEl = $("#rdv-days"), slotsEl = $("#rdv-slots");
  const state = { step: 0, day: null, slot: null };
  const fmtLong = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const fmtDay = new Intl.DateTimeFormat("fr-FR", { weekday: "short" });
  const fmtMonth = new Intl.DateTimeFormat("fr-FR", { month: "short" });

  // Jours ouvrés à venir (à partir de demain)
  const d = new Date(); d.setHours(0, 0, 0, 0);
  let made = 0;
  while (made < CONFIG.daysAhead) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    const b = document.createElement("button");
    b.type = "button"; b.className = "day"; b.setAttribute("aria-pressed", "false");
    b.dataset.label = fmtLong.format(d);
    b.innerHTML = `<small>${fmtDay.format(d).replace(".", "")}</small><b>${d.getDate()}</b><small>${fmtMonth.format(d).replace(".", "")}</small>`;
    daysEl.appendChild(b); made++;
  }
  CONFIG.slots.forEach(s => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "slot"; b.setAttribute("aria-pressed", "false");
    b.textContent = s.replace(":", " h "); b.dataset.label = s.replace(":", " h ");
    slotsEl.appendChild(b);
  });
  function pick(container, key) {
    container.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", container).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      state[key] = b.dataset.label; recap(); error.textContent = "";
    });
  }
  pick(daysEl, "day"); pick(slotsEl, "slot");

  const val = name => (new FormData(form).get(name) || "").toString().trim();
  function recap() {
    $("#recap-besoin").textContent = val("besoin") || "À choisir";
    $("#recap-format").textContent = val("format") || "À choisir";
    $("#recap-date").textContent = state.day ? `${state.day}${state.slot ? " à " + state.slot : ""}` : "À choisir";
  }
  form.addEventListener("change", recap);

  function show(i) {
    state.step = i;
    steps.forEach((s, k) => s.classList.toggle("is-current", k === i));
    stepper.forEach((s, k) => { s.classList.toggle("is-on", k === i); s.classList.toggle("is-done", k < i); });
    error.textContent = "";
    const top = form.getBoundingClientRect().top + scrollY - 110;
    if (scrollY > top) window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }
  function check(i) {
    if (i === 0 && !val("besoin")) return "Choisissez le sujet du rendez-vous pour continuer.";
    if (i === 0 && !val("format")) return "Choisissez visio ou téléphone pour continuer.";
    if (i === 1 && !state.day) return "Choisissez une date.";
    if (i === 1 && !state.slot) return "Choisissez un horaire.";
    if (i === 2) {
      if (!val("nom")) return "Indiquez votre nom.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("email"))) return "Indiquez une adresse e-mail valide, par exemple prenom@entreprise.fr.";
      if (!$("#rdv-consent").checked) return "Cochez la case de consentement pour envoyer votre demande.";
    }
    return "";
  }
  form.addEventListener("click", e => {
    const next = e.target.closest("[data-next]"), prev = e.target.closest("[data-prev]");
    if (next) { const msg = check(state.step); if (msg) { error.textContent = msg; return; } show(state.step + 1); }
    if (prev) show(state.step - 1);
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const msg = check(2); if (msg) { error.textContent = msg; return; }
    const lines = [
      "Demande de rendez-vous — OMNÉLYO",
      "",
      "Sujet : " + val("besoin"),
      "Format : " + val("format"),
      "Créneau souhaité : " + state.day + " à " + state.slot,
      "",
      "Nom : " + val("nom"),
      "Entreprise : " + (val("entreprise") || "non précisée"),
      "E-mail : " + val("email"),
      "Téléphone : " + (val("telephone") || "non précisé"),
      "",
      "Projet : " + (val("message") || "à préciser lors de l'échange")
    ];
    const text = lines.join("\n");
    let sent = false;
    if (CONFIG.formEndpoint) {
      try {
        const r = await fetch(CONFIG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ message: text, email: val("email"), _subject: "Demande de rendez-vous — " + val("nom") }) });
        sent = r.ok;
      } catch (_) { sent = false; }
    }
    $("#done-title").textContent = sent ? "Votre demande est envoyée." : "Votre demande est prête.";
    $("#done-text").textContent = sent
      ? "Vous recevrez une confirmation du créneau par e-mail."
      : "Envoyez-la depuis votre messagerie pour la transmettre. Le créneau vous sera confirmé par e-mail.";
    $("#done-body").textContent = text;
    $("#done-mail").href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Demande de rendez-vous — " + val("nom"))}&body=${encodeURIComponent(text)}`;
    $("#done-mail").hidden = sent;
    stepper.forEach(s => { s.classList.remove("is-on"); s.classList.add("is-done"); });
    steps.forEach(s => s.classList.remove("is-current"));
    $("#rdv-done").classList.add("is-current");
  });

  $("#done-copy").addEventListener("click", async e => {
    try { await navigator.clipboard.writeText($("#done-body").textContent); e.currentTarget.firstChild.textContent = "Demande copiée "; }
    catch (_) { e.currentTarget.firstChild.textContent = "Copie impossible, sélectionnez le texte "; }
  });
  recap();
})();


/* ---------- Accordéons (expertises, questions) ---------- */
$$("[data-acc]").forEach(group => {
  const one = group.dataset.acc === "one";
  group.addEventListener("click", e => {
    const head = e.target.closest(".xp__head"); if (!head) return;
    const item = head.closest(".xp__item"), open = item.classList.contains("is-open");
    if (one && open) return;
    if (one) $$(".xp__item", group).forEach(i => { i.classList.remove("is-open"); $(".xp__head", i).setAttribute("aria-expanded", "false"); });
    item.classList.toggle("is-open", one ? true : !open);
    head.setAttribute("aria-expanded", String(one ? true : !open));
  });
});

/* ---------- « Votre besoin » : objectif → expertises ---------- */
(function matcher() {
  const goalsEl = $("#goals"), list = $("#match-list");
  if (!goalsEl) return;
  const C = "Communication", D = "Digital", IA = "Intelligence artificielle";
  const goals = [
    ["Me faire connaître", [[C, "Conseil et stratégie de communication"], [D, "Gestion et animation des réseaux sociaux"], [D, "Contenus visuels et audiovisuels"]]],
    ["Refaire mon image", [[C, "Création d'identités visuelles"], [C, "Création de supports de communication"], [D, "Création de sites internet"]]],
    ["Publier plus régulièrement", [[D, "Gestion et animation des réseaux sociaux"], [D, "Montage vidéo"], [IA, "Intégration de l'IA dans vos processus de communication"]]],
    ["Avoir un site qui me ressemble", [[D, "Création de sites internet"], [C, "Création d'identités visuelles"], [D, "Contenus visuels et audiovisuels"]]],
    ["Gagner du temps", [[IA, "Optimisation des méthodes de travail"], [IA, "Accompagnement à l'utilisation des outils IA"], [IA, "Intégration de l'IA dans vos processus de communication"]]],
    ["Former mon équipe à l'IA", [[IA, "Formation et conseil"], [IA, "Accompagnement à l'utilisation des outils IA"], [IA, "Optimisation des méthodes de travail"]]]
  ];
  function select(i) {
    $$("button", goalsEl).forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
    list.innerHTML = goals[i][1].map(([pole, name], k) => `<li style="--i:${k}"><small>${pole}</small><b>${name}</b></li>`).join("");
  }
  goals.forEach(([label], i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "goal"; b.textContent = label;
    b.addEventListener("click", () => select(i));
    goalsEl.appendChild(b);
  });
  select(0);
})();

/* ---------- Bandeau typographique : avance avec le défilement ---------- */
(function bigtype() {
  const rows = $$(".bigtype__row");
  if (!rows.length) return;
  let on = false, drift = 0, last = performance.now();
  function frame(now) {
    drift += Math.min(50, now - last) * 0.012; last = now;
    rows.forEach(r => {
      const half = r.scrollWidth / 2, dir = +r.dataset.dir;
      const pos = (scrollY * 0.22 + drift) % half;
      r.style.transform = `translate3d(${dir > 0 ? -pos : pos - half}px,0,0)`;
    });
    if (on && !reduced) requestAnimationFrame(frame);
  }
  if (reduced || !("IntersectionObserver" in window)) { frame(performance.now()); return; }
  new IntersectionObserver(es => {
    const was = on; on = es[0].isIntersecting;
    if (on && !was) { last = performance.now(); requestAnimationFrame(frame); }
  }, { rootMargin: "200px" }).observe(rows[0].parentElement);
})();


/* ---------- Visuels : légère inclinaison sous la souris ---------- */
if (finePointer && !reduced) {
  $$(".art").forEach(a => {
    const inner = a.firstElementChild;
    a.addEventListener("pointermove", e => {
      const r = a.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      inner.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.02)`;
    });
    a.addEventListener("pointerleave", () => (inner.style.transform = ""));
  });
}

route(true);
