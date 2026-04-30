/* Lógica importada de Ruway.html */
// ——— CONFIGURACIÓN DE OBJETIVOS ———
const RUWAY_TARGETS = {
  gb1: [
    { q: "kayqa uj wallpa.", es: "Esta es una gallina." },
    { q: "chayqa uj sach'a.", es: "Ese es un árbol." },
    { q: "jaqayqa uj anka.", es: "Aquel es un águila." },
    { q: "kaykunaqa wallpas.", es: "Estas son gallinas." },
    { q: "¿kayqa uj runachu?", es: "¿Esta es una persona?" },
    { q: "chaykunaqa mana sach'aschu.", es: "Esos no son árboles." }
  ],
  gb2: [
    { q: "noqaqa phiñasqa kashani.", es: "Yo estoy enojado/a." },
    { q: "qanqa kusisqa kashanki.", es: "Tú estás contento/a." },
    { q: "payqa llakisqa.", es: "Él/ella está triste." },
    { q: "paykunaqa kusisqa kashanku.", es: "Ellos/as están contentos/as." },
    { q: "noqaykoqa sayk'usqa kashayku.", es: "Nosotros (excl.) estamos cansados." },
    { q: "¿payqa phiñasqachu?", es: "¿Él/ella está enojado/a?" }
  ],
  vb: [
    { q: "Yachani.", es: "Yo sé." },
    { q: "Yacharqa.", es: "Él supo." },
    { q: "Risun.", es: "Nosotros iremos (inclusivo)." },
    { q: "Parlanki.", es: "Tú hablas." },
    { q: "Purinku.", es: "Ellos caminan." },
    { q: "Llank'asaj.", es: "Yo trabajaré." },
    { q: "mana yachanichu.", es: "No sé." },
    { q: "¿yachankichu?", es: "¿Sabes?" },
    { q: "mana rerqanichu.", es: "No fui." },
    { q: "¿kutimunqachu?", es: "¿Volverá?" },
    { q: "mana llank'asajchu.", es: "No trabajaré." }
  ]
};

// ——— TABS ———
// ——— TABS ———
function switchTab(tab) {
  const target = document.getElementById('tab-' + tab);
  if (!target) return;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  target.classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => {
    const txt = b.textContent.toLowerCase();
    if (tab === 'constructores' && txt.includes('constructor')) b.classList.add('active');
  });
}

function renderTargetSentences(builderId) {
    const container = document.getElementById(`${builderId}-targets`);
    if (!container) return;
    
    const targets = RUWAY_TARGETS[builderId] || [];
    const completed = STATE.completedRuwayChallenges || [];

    container.innerHTML = `
        <div class="target-header">🎯 Oraciones Objetivo</div>
        <div class="target-grid">
            ${targets.map(target => {
                const isDone = completed.includes(target.q.toLowerCase());
                return `
                    <div class="target-item ${isDone ? 'done' : ''}">
                        <span class="target-check">${isDone ? '✅' : '⭕'}</span>
                        <div class="target-texts">
                            <div class="target-q">${target.q}</div>
                            <div class="target-es">${target.es}</div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function validateRuway(builderId) {
    let current = "";
    if (builderId === 'gb1') current = buildGrammarSentences(grammarBuilderState).qSentence;
    if (builderId === 'gb2') current = buildGrammarBuilder2Sentence(grammarBuilder2State).qSentence;
    if (builderId === 'vb') {
        const verbo = vbVerbos[vbVerbActivo];
        current = vbBuildSentence(verbo, vbPersonaActiva, vbTiempoActivo, vbNegative, vbQuestion).qSentence;
    }

    const targets = RUWAY_TARGETS[builderId] || [];
    const isCorrect = targets.some(t => t.q.toLowerCase() === current.toLowerCase());

    if (isCorrect) {
        if (typeof AUDIO !== 'undefined') AUDIO.playSuccess();
        const isNew = STATE.addRuwayXP(current);
        if (isNew) {
            showRuwayFeedback(builderId, "¡Excelente! Has construido una oración objetivo. +15 XP", "correct");
            renderTargetSentences(builderId);
        } else {
            showRuwayFeedback(builderId, "Oración correcta, pero ya ganaste XP por ella.", "info");
        }
    } else {
        if (typeof AUDIO !== 'undefined') AUDIO.playError();
        showRuwayFeedback(builderId, "Oración válida, pero intenta construir uno de los objetivos.", "wrong");
    }
}

// ——— GRAMMAR HUB DATA ———
// sectionGrammar ya está definido en data/grammar_data.js

// ═══════════════════════════════════════════════
// BUILDER 2 — Pronombres + Estado de ánimo
// ═══════════════════════════════════════════════
const grammarBuilder2State = {
  pron: { q: 'noqaqa', esSubj: 'yo', esCop: 'estoy', ka: 'kashani', isPlural: false },
  adj:  { q: 'phiñasqa', esSing: 'enojado/a', esPl: 'enojados/as' },
  negative: false, question: false
};

function gb2Toggle(key) {
  if (key === 'neg')      grammarBuilder2State.negative = !grammarBuilder2State.negative;
  if (key === 'pregunta') grammarBuilder2State.question  = !grammarBuilder2State.question;
  document.getElementById('gb2-tog-neg')     .classList.toggle('active', grammarBuilder2State.negative);
  document.getElementById('gb2-tog-pregunta').classList.toggle('active', grammarBuilder2State.question);
  updateGrammarBuilder2Preview();
}

function buildGrammarBuilder2Sentence(s) {
  const ka = s.pron.ka || '';
  const isPlural = !!s.pron.isPlural;
  const adjEs = isPlural ? (s.adj.esPl || s.adj.esSing) : (s.adj.esSing || s.adj.esPl);
  let qBody = '';
  if (s.negative) qBody = `${s.pron.q} mana ${s.adj.q}chu${ka ? ' ' + ka : ''}`;
  else if (s.question) qBody = `${s.pron.q} ${s.adj.q}chu${ka ? ' ' + ka : ''}`;
  else qBody = `${s.pron.q} ${s.adj.q}${ka ? ' ' + ka : ''}`;
  const qSentence = s.question ? `¿${qBody}?` : `${qBody}.`;
  const esBody = `${s.pron.esSubj} ${s.negative ? 'no ' : ''}${s.pron.esCop} ${adjEs}`.replace(/\s+/g, ' ').trim();
  const esSentence = s.question ? `¿${esBody}?` : `${esBody}.`;
  return { qSentence, esSentence: esSentence.charAt(0).toUpperCase() + esSentence.slice(1) };
}

function updateGrammarBuilder2Preview() {
  const built = buildGrammarBuilder2Sentence(grammarBuilder2State);
  const qEl = document.getElementById('gb2-output-q');
  const esEl = document.getElementById('gb2-output-es');
  if (qEl) qEl.textContent = built.qSentence;
  if (esEl) esEl.textContent = built.esSentence;
}

function setGrammarBuilder2Slot(slot, payload) {
  if (!payload || !slot) return;
  if (slot === 'pron') grammarBuilder2State.pron = { q: payload.value || 'noqaqa', esSubj: payload.esSubj || 'yo', esCop: payload.esCop || 'estoy', ka: payload.ka || '', isPlural: payload.isPlural === true || payload.isPlural === 'true' };
  else if (slot === 'adj') grammarBuilder2State.adj = { q: payload.value || 'phiñasqa', esSing: payload.esSing || 'enojado/a', esPl: payload.esPl || 'enojados/as' };
  updateGrammarBuilder2Preview();
}

function resetGrammarBuilder2() {
  grammarBuilder2State.pron = { q: 'noqaqa', esSubj: 'yo', esCop: 'estoy', ka: 'kashani', isPlural: false };
  grammarBuilder2State.adj  = { q: 'phiñasqa', esSing: 'enojado/a', esPl: 'enojados/as' };
  grammarBuilder2State.negative = false; grammarBuilder2State.question = false;
  document.getElementById('gb2-tog-neg')     .classList.remove('active');
  document.getElementById('gb2-tog-pregunta').classList.remove('active');
  updateGrammarBuilder2Preview();
}

function newExample2() {
  const prons = [];
  document.querySelectorAll('.gb2-chip[data-gb2-type="pron"]').forEach(c => {
    prons.push({ q: c.dataset.value, esSubj: c.dataset.esSubj, esCop: c.dataset.esCop, ka: c.dataset.ka, isPlural: c.dataset.isPlural === 'true' });
  });
  const adjs = [];
  document.querySelectorAll('.gb2-chip[data-gb2-type="adj"]').forEach(c => {
    adjs.push({ q: c.dataset.value, esSing: c.dataset.esSing, esPl: c.dataset.esPl });
  });
  const snap = {
    pron: prons[Math.floor(Math.random() * prons.length)],
    adj:  adjs[Math.floor(Math.random() * adjs.length)],
    negative: Math.random() < 0.4,
    question: Math.random() < 0.4
  };
  const built = buildGrammarBuilder2Sentence(snap);
  const el = document.getElementById('gb2-example-text'); 
  if (el) el.innerHTML = `<span style="color:var(--blue);font-size:18px;">${built.qSentence}</span><br><span style="color:var(--ink-light);font-size:14px;font-weight:500;">${built.esSentence}</span>`;

  // Asegurar que los chips seleccionados aleatoriamente sean visibles
  document.querySelectorAll('.gb2-chip.active').forEach(chip => ensureActiveVisible(chip.parentElement));
}

function initGrammarBuilder2() {
  document.querySelectorAll('.gb2-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const type = chip.dataset.gb2Type;
      // Remover activo de otros del mismo tipo
      document.querySelectorAll(`.gb2-chip[data-gb2-type="${type}"]`).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const p = { type: type || '', value: chip.dataset.value || '', esSubj: chip.dataset.esSubj || '', esCop: chip.dataset.esCop || '', ka: chip.dataset.ka || '', isPlural: chip.dataset.isPlural || '', esSing: chip.dataset.esSing || '', esPl: chip.dataset.esPl || '' };
      if (p.type === 'pron') setGrammarBuilder2Slot('pron', p);
      if (p.type === 'adj')  setGrammarBuilder2Slot('adj', p);
      
      if (typeof AUDIO !== 'undefined') AUDIO.playTick();
      ensureActiveVisible(chip.parentElement);
    });
  });
  updateGrammarBuilder2Preview();
  renderTargetSentences('gb2');
}

// ═══════════════════════════════════════════════
// BUILDER 1 — Demostrativos + Sustantivos
// ═══════════════════════════════════════════════
const grammarBuilderState = {
  demo: { q: 'chayqa', esSing: 'ese', esPl: 'esos' },
  noun: { q: "sach'a", es: 'árbol', artSing: 'un' },
  plural: false, negative: false, question: false
};

function gb1Toggle(key) {
  if (key === 'plural')   grammarBuilderState.plural   = !grammarBuilderState.plural;
  if (key === 'neg')      grammarBuilderState.negative = !grammarBuilderState.negative;
  if (key === 'pregunta') grammarBuilderState.question  = !grammarBuilderState.question;
  document.getElementById('gb1-tog-plural')  .classList.toggle('active', grammarBuilderState.plural);
  document.getElementById('gb1-tog-neg')     .classList.toggle('active', grammarBuilderState.negative);
  document.getElementById('gb1-tog-pregunta').classList.toggle('active', grammarBuilderState.question);
  updateGrammarBuilderPreview();
}

function pluralizeSpanish(noun) { return /[aeiouáéíóúü]$/i.test(noun) ? noun + 's' : noun + 'es'; }
function pluralizeQuechua(noun) { return /[aeiouáéíóúü]$/i.test(noun) ? noun + 's' : noun + 'kuna'; }
function toDemoPlural(q) {
  if (q === 'kayqa') return 'kaykunaqa'; if (q === 'chayqa') return 'chaykunaqa';
  if (q === 'jaqayqa') return 'jaqaykunaqa'; return q;
}
function toDemoSingular(q) {
  if (q === 'kaykunaqa') return 'kayqa'; if (q === 'chaykunaqa') return 'chayqa';
  if (q === 'jaqaykunaqa') return 'jaqayqa'; return q;
}

function buildGrammarSentences(s) {
  const demoQ  = s.plural ? toDemoPlural(s.demo.q) : toDemoSingular(s.demo.q);
  const nounQ  = s.plural ? pluralizeQuechua(s.noun.q) : s.noun.q;
  const demoEs = s.plural ? s.demo.esPl : s.demo.esSing;
  const nounEs = s.plural ? pluralizeSpanish(s.noun.es) : s.noun.es;
  const nounPart    = s.plural ? nounQ : `uj ${nounQ}`;
  const artSing     = s.noun.artSing || 'un';
  const esPredicate = s.plural ? `son ${nounEs}` : `es ${artSing} ${nounEs}`;
  let qSentence = `${demoQ} ${nounPart}`;
  let esSentence = `${demoEs} ${esPredicate}`;
  if (s.negative) { qSentence = `${demoQ} mana ${nounPart}chu`; esSentence = `${demoEs} no ${esPredicate}`; }
  if (s.question) { qSentence = s.negative ? `¿manachu ${demoQ} ${nounPart}?` : `¿${demoQ} ${nounPart}chu?`; esSentence = `¿${esSentence}?`; }
  else { qSentence += '.'; esSentence += '.'; }
  return { qSentence, esSentence: esSentence.charAt(0).toUpperCase() + esSentence.slice(1) };
}

function normalizeSentence(t) {
  return String(t || '').toLowerCase().replace(/[.,!?¿¡]/g, '').replace(/\s+/g, ' ').trim();
}

function updateGrammarBuilderPreview() {
  const built = buildGrammarSentences(grammarBuilderState);
  const qEl = document.getElementById('gb-output-q');
  const esEl = document.getElementById('gb-output-es');
  if (qEl) qEl.textContent = built.qSentence;
  if (esEl) esEl.textContent = built.esSentence;
}

function setGrammarBuilderSlot(slot, payload) {
  if (!payload || !slot) return;
  if (slot === 'demo') grammarBuilderState.demo = { q: payload.value || 'chayqa', esSing: payload.esSing || 'ese', esPl: payload.esPl || 'esos' };
  else if (slot === 'noun') grammarBuilderState.noun = { q: payload.value || "sach'a", es: payload.es || 'árbol', artSing: payload.artSing || 'un' };
  updateGrammarBuilderPreview();
}

function resetGrammarBuilder() {
  grammarBuilderState.demo = { q: 'chayqa', esSing: 'ese', esPl: 'esos' };
  grammarBuilderState.noun = { q: "sach'a", es: 'árbol', artSing: 'un' };
  grammarBuilderState.plural = false; grammarBuilderState.negative = false; grammarBuilderState.question = false;
  document.getElementById('gb1-tog-plural')  .classList.remove('active');
  document.getElementById('gb1-tog-neg')     .classList.remove('active');
  document.getElementById('gb1-tog-pregunta').classList.remove('active');
  updateGrammarBuilderPreview();
}

function newExample1() {
  const demos = [];
  document.querySelectorAll('.gb-chip[data-type="demo"]').forEach(c => {
    const sq = toDemoSingular(c.dataset.value);
    if (!demos.find(d => d.q === sq))
      demos.push({ q: sq, esSing: c.dataset.esSing, esPl: c.dataset.esPl });
  });
  const nouns = [];
  document.querySelectorAll('.gb-chip[data-type="noun"]').forEach(c => {
    nouns.push({ q: c.dataset.value, es: c.dataset.es, artSing: c.dataset.artSing });
  });
  const snap = {
    demo: demos[Math.floor(Math.random() * demos.length)],
    noun: nouns[Math.floor(Math.random() * nouns.length)],
    plural: Math.random() < 0.4, negative: Math.random() < 0.4, question: Math.random() < 0.4
  };
  const built = buildGrammarSentences(snap);
  const el = document.getElementById('gb1-example-text'); 
  if (el) el.innerHTML = `<span style="color:var(--gold-dark);font-size:18px;">${built.qSentence}</span><br><span style="color:var(--ink-light);font-size:14px;font-weight:500;">${built.esSentence}</span>`;

  // Asegurar que los chips seleccionados aleatoriamente sean visibles
  document.querySelectorAll('.gb-chip.active').forEach(chip => ensureActiveVisible(chip.parentElement));
}

function initGrammarBuilder() {
  document.querySelectorAll('.gb-chip[data-type]').forEach(chip => {
    chip.addEventListener('click', () => {
      const type = chip.dataset.type;
      // Remover activo de otros del mismo tipo
      document.querySelectorAll(`.gb-chip[data-type="${type}"]`).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const p = { type: type || '', value: chip.dataset.value || '', es: chip.dataset.es || '', artSing: chip.dataset.artSing || '', esSing: chip.dataset.esSing || '', esPl: chip.dataset.esPl || '' };
      if (p.type === 'demo') setGrammarBuilderSlot('demo', p);
      if (p.type === 'noun') setGrammarBuilderSlot('noun', p);

      if (typeof AUDIO !== 'undefined') AUDIO.playTick();
      ensureActiveVisible(chip.parentElement);
    });
  });
  updateGrammarBuilderPreview();
  renderTargetSentences('gb1');
}

// ═══════════════════════════════════════════════
// BUILDER 3 — Sufijos de lugar
// ═══════════════════════════════════════════════
const sfAdverbios = [
  { q: 'Qayna wata', es: 'El año pasado' },
  { q: 'Kay wata',   es: 'Este año' },
  { q: 'Qhepan wata',es: 'El próximo año' }
];

let sfActiveAdverb = 0;
const sfState = {};
let sfFocusedSlot = null;

function sfSetAdverb(idx) {
  sfActiveAdverb = idx;
  [0,1,2].forEach(i => {
    document.getElementById('sf-adv-' + i).classList.toggle('active', i === idx);
  });
  renderSufijoSentences();
}

function renderSufijoSentences() {
  const container = document.getElementById('sufijo-sentences');
  if (!container) return;
  const adv = sfAdverbios[sfActiveAdverb];

  const oraciones = [
    {
      id: 'sf1', correct: '-man',
      hint: `${adv.q} — ¿a dónde?`,
      lineEs: (city) => `${adv.es} ${sfActiveAdverb === 0 ? 'fui' : sfActiveAdverb === 1 ? 'voy' : 'iré'} a ${city}.`,
      verbQ: sfActiveAdverb === 0 ? 'rerqani.' : sfActiveAdverb === 1 ? 'risaj.' : 'risaj.'
    },
    {
      id: 'sf2', correct: '-pi',
      hint: `${adv.q} — ¿dónde?`,
      lineEs: (city) => `${adv.es} vivo en ${city}.`,
      verbQ: 'tiyakuni.'
    }
  ];
  if (sfActiveAdverb === 2) {
    oraciones.push({
      id: 'sf3', correct: '-manta',
      hint: `${adv.q} — ¿de dónde?`,
      lineEs: (city) => `${adv.es}, cada semana salgo de ${city}.`,
      verbQ: 'risaj.'
    });
  }

  container.innerHTML = oraciones.map(or => {
    const st = sfState[or.id] || { city: '', suffix: '' };
    const filled = st.suffix || '?';
    const isFocused = sfFocusedSlot === or.id;
    return `
      <div class="sufijo-sentence">
        <div class="sufijo-adverb">${or.hint}</div>
        <div class="sufijo-line">
          <span class="sufijo-slot${isFocused ? ' sf-focused' : ''}" id="slot-wrap-${or.id}"
            ondragover="event.preventDefault()"
            ondrop="sfDrop(event,'${or.id}')"
            onclick="sfFocus('${or.id}')">
            <input class="sufijo-input" id="city-${or.id}" type="text" placeholder="ciudad…"
              value="${st.city}"
              oninput="sfState['${or.id}'] = sfState['${or.id}'] || {}; sfState['${or.id}'].city = this.value; clearSufijoFeedback();"
              onclick="event.stopPropagation(); sfFocus('${or.id}')">
            <span class="sufijo-suffix-display" id="suffix-display-${or.id}">${filled}</span>
          </span>
          <span style="font-weight:700;color:var(--ink);margin-left:4px;">${or.verbQ}</span>
        </div>
        <div class="sufijo-translation" style="font-size:13px;color:#7a6a50;font-style:italic;margin-top:4px;">
          ${st.city ? or.lineEs(st.city + (st.suffix || '')) : '…'}
        </div>
      </div>
    `;
  }).join('');
}

function sfFocus(id) {
  sfFocusedSlot = id;
  document.querySelectorAll('.sufijo-slot').forEach(el => {
    el.classList.toggle('sf-focused', el.id === 'slot-wrap-' + id);
  });
}

function sfChipClick(sufijo) {
  if (!sfFocusedSlot) {
    // Auto-seleccionar primer slot sin sufijo
    for (const id of ['sf1','sf2','sf3']) {
      if (document.getElementById('slot-wrap-' + id)) { sfFocusedSlot = id; break; }
    }
  }
  if (!sfFocusedSlot) return;
  if (!sfState[sfFocusedSlot]) sfState[sfFocusedSlot] = { city: '', suffix: '' };
  sfState[sfFocusedSlot].suffix = sufijo;
  ensureActiveVisible(document.querySelector('.sufijo-draggable[data-sufijo="'+sufijo+'"]')?.parentElement);
  if (typeof AUDIO !== 'undefined') AUDIO.playTick();
  const cityInput = document.getElementById('city-' + sfFocusedSlot);
  if (cityInput) sfState[sfFocusedSlot].city = cityInput.value;
  const display = document.getElementById('suffix-display-' + sfFocusedSlot);
  if (display) display.textContent = sufijo;
  const wrap = document.getElementById('slot-wrap-' + sfFocusedSlot);
  if (wrap) wrap.classList.remove('correct','wrong');
  clearSufijoFeedback();
}

function sfDrop(event, id) {
  event.preventDefault();
  let sufijo = null;
  try { sufijo = JSON.parse(event.dataTransfer.getData('text/plain')).sufijo; } catch(e) {}
  if (!sufijo) sufijo = event.dataTransfer.getData('text/plain');
  if (!sufijo) return;
  sfFocusedSlot = id;
  sfChipClick(sufijo);
}

function checkSufijos() {
  const allIds = ['sf1','sf2'];
  if (sfActiveAdverb === 2) allIds.push('sf3');
  const correctMap = { sf1: '-man', sf2: '-pi', sf3: '-manta' };
  let allCorrect = true;
  const results = [];
  allIds.forEach(id => {
    const st = sfState[id] || {};
    const cityInput = document.getElementById('city-' + id);
    if (cityInput) st.city = cityInput.value;
    const wrap = document.getElementById('slot-wrap-' + id);
    const cityOk   = st.city && st.city.trim().length > 0;
    const suffixOk = st.suffix === correctMap[id];
    if (!cityOk || !suffixOk) allCorrect = false;
    if (wrap) { wrap.classList.remove('correct','wrong'); if (cityOk) wrap.classList.add(suffixOk ? 'correct' : 'wrong'); }
    if (!suffixOk) results.push(`"${st.city || '?'}" necesita <strong>${correctMap[id]}</strong>`);
  });
  const fb = document.getElementById('sufijo-feedback');
  if (allCorrect) { fb.innerHTML = '✅ ¡Perfecto! Todos los sufijos son correctos.'; fb.style.color = '#1f8f3a'; }
  else { fb.innerHTML = '❌ Revisá: ' + results.join(' · '); fb.style.color = '#b5332f'; }
}

function clearSufijoFeedback() {
  const fb = document.getElementById('sufijo-feedback');
  if (fb) fb.textContent = '';
  document.querySelectorAll('.sufijo-slot').forEach(el => el.classList.remove('correct','wrong'));
}

function resetSufijos() {
  ['sf1','sf2','sf3'].forEach(id => { sfState[id] = { city: '', suffix: '' }; });
  sfFocusedSlot = null;
  const fb = document.getElementById('sufijo-feedback');
  if (fb) { fb.textContent = ''; fb.style.color = '#7a7a7a'; }
  renderSufijoSentences();
}

function initSufijos() {
  document.querySelectorAll('.sufijo-draggable').forEach(chip => {
    chip.addEventListener('dragstart', ev => {
      ev.dataTransfer.setData('text/plain', JSON.stringify({ sufijo: chip.dataset.sufijo }));
    });
  });
  renderSufijoSentences();
}


// ═══════════════════════════════════════════════
// BUILDER 4 — Yanapay
// ═══════════════════════════════════════════════
const yanapaTargets = [
  {
    id: 'me',
    label: 'a mí',
    actorHint: 'Elegí quién me ayuda.',
    actors: [
      { id: 'thirdSing', label: 'esto / él / ella', q: 'Yanapawan', es: 'Él/ella me ayuda.' },
      { id: 'youSing', label: 'tú / vos', q: 'Yanapawanki', es: 'Vos me ayudás.' },
      { id: 'youPl', label: 'ustedes', q: 'Yanapawankichej', es: 'Ustedes me ayudan.' },
      { id: 'thirdPl', label: 'ellos / ellas', q: 'Yanapawanku', es: 'Ellos/ellas me ayudan.' }
    ],
    note: 'Para “a mí”, la forma cambia según si ayuda él/ella, vos, ustedes o ellos/ellas.'
  },
  {
    id: 'usInclusive',
    label: 'a nosotros/as (incl.)',
    actorHint: 'Serie con -wanchej.',
    actors: [
      { id: 'thirdGroupIncl', label: 'él / ella / ellos / ellas', q: 'Yanapawanchej', es: 'Él/ella/ellos/ellas nos ayudan.' }
    ],
    note: 'Esta variante sigue la serie que compartiste con <strong>yanapawanchej</strong>.'
  },
  {
    id: 'usExclusive',
    label: 'a nosotros/as (excl.)',
    actorHint: 'Serie con -wayku.',
    actors: [
      { id: 'mixExcl', label: 'tú / él / ustedes / ellos', q: 'Yanapawayku', es: 'Tú/él/ustedes/ellos nos ayudan.' }
    ],
    note: 'Esta variante sigue la serie que compartiste con <strong>yanapawayku</strong>.'
  },
  {
    id: 'youSing',
    label: 'a vos / tú',
    actorHint: 'Elegí quién te ayuda.',
    actors: [
      { id: 'i', label: 'yo', q: 'Yanapayki', es: 'Yo te ayudo.' },
      { id: 'thirdSing', label: 'esto / él / ella', q: 'Yanapasunki', es: 'Él/ella te ayuda.' },
      { id: 'we', label: 'nosotros/as', q: 'Yanapayku / yanapasuyku', es: 'Nosotros/as te ayudamos.' },
      { id: 'thirdPl', label: 'ellos / ellas', q: 'Yanapasunku', es: 'Ellos/ellas te ayudan.' }
    ],
    note: 'Con algunos verbos aparece la variante <strong>-suyku</strong>, como en tu nota para <em>jatunchay, yupaychay, mask’ay, niy, ruwapuy, wajyariy</em>.'
  },
  {
    id: 'youPl',
    label: 'a ustedes',
    actorHint: 'Elegí quién ayuda a ustedes.',
    actors: [
      { id: 'i', label: 'yo', q: 'Yanapaykichej', es: 'Yo los ayudo.' },
      { id: 'thirdSing', label: 'esto / él / ella', q: 'Yanapasunkichej', es: 'Él/ella los ayuda.' },
      { id: 'we', label: 'nosotros/as', q: 'Yanapaykichej', es: 'Nosotros/as los ayudamos.' },
      { id: 'thirdPl', label: 'ellos / ellas', q: 'Yanapasunkichej', es: 'Ellos/ellas los ayudan.' }
    ],
    note: 'Para “a ustedes”, varias combinaciones terminan en <strong>-kichej</strong>.'
  },
  {
    id: 'third',
    label: 'a él / ella / ellos / ellas',
    actorHint: 'Elegí quién ayuda y luego si recibe pay o paykuna.',
    actors: [
      { id: 'i-pay', label: 'yo → él / ella', q: 'Payta yanapani', es: 'Yo lo/la ayudo.' },
      { id: 'i-paykuna', label: 'yo → ellos / ellas', q: 'Paykunata yanapani', es: 'Yo los/las ayudo.' },
      { id: 'youSing-pay', label: 'tú / vos → él / ella', q: 'Payta yanapanki', es: 'Vos lo/la ayudás.' },
      { id: 'youSing-paykuna', label: 'tú / vos → ellos / ellas', q: 'Paykunata yanapanki', es: 'Vos los/las ayudás.' },
      { id: 'thirdSing-pay', label: 'él / ella → él / ella', q: 'Payta yanapan', es: 'Él/ella lo/la ayuda.' },
      { id: 'thirdSing-paykuna', label: 'él / ella → ellos / ellas', q: 'Paykunata yanapan', es: 'Él/ella los/las ayuda.' },
      { id: 'weIncl-pay', label: 'nosotros/as (incl.) → él / ella', q: 'Payta yanapanchej', es: 'Nosotros/as lo/la ayudamos.' },
      { id: 'weIncl-paykuna', label: 'nosotros/as (incl.) → ellos / ellas', q: 'Paykunata yanapanchej', es: 'Nosotros/as los/las ayudamos.' },
      { id: 'weExcl-pay', label: 'nosotros/as (excl.) → él / ella', q: 'Payta yanapayku', es: 'Nosotros/as lo/la ayudamos.' },
      { id: 'weExcl-paykuna', label: 'nosotros/as (excl.) → ellos / ellas', q: 'Paykunata yanapayku', es: 'Nosotros/as los/las ayudamos.' },
      { id: 'youPl-pay', label: 'ustedes → él / ella', q: 'Payta yanapankichej', es: 'Ustedes lo/la ayudan.' },
      { id: 'youPl-paykuna', label: 'ustedes → ellos / ellas', q: 'Paykunata yanapankichej', es: 'Ustedes los/las ayudan.' },
      { id: 'thirdPl-pay', label: 'ellos / ellas → él / ella', q: 'Payta yanapanku', es: 'Ellos/ellas lo/la ayudan.' },
      { id: 'thirdPl-paykuna', label: 'ellos / ellas → ellos / ellas', q: 'Paykunata yanapanku', es: 'Ellos/ellas los/las ayudan.' }
    ],
    note: 'Cuando la acción recae sobre una tercera persona, se usa <strong>pay/paykuna + -ta</strong> y luego el verbo con sufijos del presente.'
  }
];

const yanapaState = {
  targetId: 'me',
  actorId: 'thirdSing'
};

function getYanapaTarget(targetId) {
  return yanapaTargets.find(t => t.id === targetId) || yanapaTargets[0];
}

function getYanapaActor(target, actorId) {
  return target.actors.find(a => a.id === actorId) || target.actors[0];
}

function renderYanapaActors() {
  const lane = document.getElementById('yanapa-actor-lane');
  const hint = document.getElementById('yanapa-actor-hint');
  const note = document.getElementById('yanapa-note');
  const target = getYanapaTarget(yanapaState.targetId);
  if (!lane || !hint || !note) return;

  if (!target.actors.find(actor => actor.id === yanapaState.actorId)) {
    yanapaState.actorId = target.actors[0].id;
  }

  lane.innerHTML = target.actors.map(actor => `
    <span class="gb-chip yanapa-actor-chip${actor.id === yanapaState.actorId ? ' active' : ''}"
      data-yanapa-actor="${actor.id}">
      ${actor.label}
    </span>
  `).join('');
  hint.textContent = target.actorHint;
  note.innerHTML = `<strong>Nota:</strong> ${target.note}`;

  lane.querySelectorAll('.yanapa-actor-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      yanapaState.actorId = chip.dataset.yanapaActor;
      renderYanapaActors();
      updateYanapaPreview();
    });
  });
  ensureActiveVisible(lane);
  setupRuwayScrollHints();
}

function updateYanapaPreview() {
  const qEl = document.getElementById('yanapa-output-q');
  const esEl = document.getElementById('yanapa-output-es');
  const target = getYanapaTarget(yanapaState.targetId);
  const actor = getYanapaActor(target, yanapaState.actorId);
  if (qEl) qEl.textContent = actor.q + '.';
  if (esEl) esEl.textContent = actor.es;

  document.querySelectorAll('.yanapa-target-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.yanapaTarget === yanapaState.targetId);
    if (chip.classList.contains('active')) ensureActiveVisible(chip.parentElement);
  });
}

function setYanapaTarget(targetId) {
  yanapaState.targetId = targetId;
  renderYanapaActors();
  updateYanapaPreview();
}

function resetYanapaBuilder() {
  yanapaState.targetId = 'me';
  yanapaState.actorId = 'thirdSing';
  renderYanapaActors();
  updateYanapaPreview();
}

function newYanapaExample() {
  const target = yanapaTargets[Math.floor(Math.random() * yanapaTargets.length)];
  const actor = target.actors[Math.floor(Math.random() * target.actors.length)];
  yanapaState.targetId = target.id;
  yanapaState.actorId = actor.id;
  renderYanapaActors();
  updateYanapaPreview();
}

function initYanapaBuilder() {
  document.querySelectorAll('.yanapa-target-chip').forEach(chip => {
    chip.addEventListener('click', () => setYanapaTarget(chip.dataset.yanapaTarget));
  });
  renderYanapaActors();
  updateYanapaPreview();
}



// ═══════════════════════════════════════════════
// PRÁCTICA — Modo estudiante + Modo docente
// -----------------------------------------------
// La contraseña NO está guardada aquí.
// Solo se guarda su huella SHA-256 (irreversible).
// Para cambiar la contraseña:
//   1. Calculá el nuevo hash en: https://emn178.github.io/online-tools/sha256.html
//   2. Reemplazá el valor de PR_TEACHER_HASH abajo.
const PR_TEACHER_HASH = window.RUWAY_TEACHER_HASH || '';
// Pegá aquí la configuración de tu proyecto Firebase.
// Si lo preferís, también podés cargarla antes de este script en window.RUWAY_FIREBASE_CONFIG.
const RUWAY_FIREBASE_CONFIG = window.RUWAY_FIREBASE_CONFIG || {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};
const PR_FIREBASE_IMPORTS = {
  app: 'https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js',
  firestore: 'https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js'
};
const PR_COLLECTION_NAME = 'ruway_practica_entries';
// ═══════════════════════════════════════════════

async function prHashInput(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const PR_STORAGE_KEY = 'ruway_practica_v1';
const PR_SECTIONS = 8;

let prActiveSection = 1;
let prEntries = [];
let prTeacherMode = false; // true cuando el docente está logueado
let prStorageMode = 'local';
let prSyncLevel = 'warn';
let prSyncMessage = 'Firebase todavía no está configurado. La práctica funciona solo en este navegador.';
let prFirebase = null;
let prDb = null;
let prInitPromise = null;
let prRealtimeStarted = false;

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function hasFirebaseConfig(config) {
  return !!(config &&
    config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.appId);
}

function setPracticaSyncStatus(level, message) {
  prSyncLevel = level;
  prSyncMessage = message;
  renderPracticaSyncBanner();
}

function renderPracticaSyncBanner() {
  const el = document.getElementById('pr-sync-banner');
  if (!el) return;
  el.className = `pr-sync-banner ${prSyncLevel}`;
  el.textContent = prSyncMessage;
}

// ——— Persistencia ———
function prLoadData() {
  try {
    const raw = localStorage.getItem(PR_STORAGE_KEY);
    if (raw) prEntries = JSON.parse(raw);
  } catch(e) { prEntries = []; }
}
function prSaveData() {
  try { localStorage.setItem(PR_STORAGE_KEY, JSON.stringify(prEntries)); } catch(e) {}
}
function prNextId() {
  return Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

function prSortEntries(list) {
  return [...list].sort((a, b) => {
    const aTime = a.clientCreatedAt || a.createdAt?.seconds || 0;
    const bTime = b.clientCreatedAt || b.createdAt?.seconds || 0;
    return aTime - bTime;
  });
}

async function initPracticaStorage() {
  if (prInitPromise) return prInitPromise;

  prInitPromise = (async () => {
    if (!hasFirebaseConfig(RUWAY_FIREBASE_CONFIG)) {
      prStorageMode = 'local';
      prLoadData();
      setPracticaSyncStatus('warn', 'Firebase todavía no está configurado. La práctica funciona solo en este navegador.');
      renderPractica();
      return;
    }

    try {
      const [{ initializeApp }, firestoreMod] = await Promise.all([
        import(PR_FIREBASE_IMPORTS.app),
        import(PR_FIREBASE_IMPORTS.firestore)
      ]);

      const {
        getFirestore,
        collection,
        addDoc,
        updateDoc,
        deleteDoc,
        doc,
        onSnapshot,
        serverTimestamp
      } = firestoreMod;

      const app = initializeApp(RUWAY_FIREBASE_CONFIG);
      prDb = getFirestore(app);
      prFirebase = { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp };
      prStorageMode = 'firebase';
      setPracticaSyncStatus('ok', 'Práctica conectada a Firebase. Los envíos y correcciones se sincronizan en tiempo real.');

      if (!prRealtimeStarted) {
        prRealtimeStarted = true;
        const colRef = collection(prDb, PR_COLLECTION_NAME);
        onSnapshot(colRef, snapshot => {
          prEntries = prSortEntries(snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data()
          })));
          renderPractica();
        }, err => {
          console.error(err);
          setPracticaSyncStatus('err', 'No se pudo leer Firebase. Revisá la configuración y las reglas de Firestore.');
        });
      }
    } catch (err) {
      console.error(err);
      prStorageMode = 'local';
      prLoadData();
      setPracticaSyncStatus('err', 'Falló la conexión con Firebase. La práctica quedó en modo local en este navegador.');
      renderPractica();
    }
  })();

  return prInitPromise;
}

async function prCreateEntry(data) {
  if (prStorageMode === 'firebase' && prDb && prFirebase) {
    await prFirebase.addDoc(prFirebase.collection(prDb, PR_COLLECTION_NAME), {
      ...data,
      createdAt: prFirebase.serverTimestamp(),
      updatedAt: prFirebase.serverTimestamp(),
      clientCreatedAt: Date.now()
    });
    return;
  }

  prEntries.push({ id: prNextId(), ...data });
  prSaveData();
}

async function prUpdateEntry(id, patch) {
  if (prStorageMode === 'firebase' && prDb && prFirebase) {
    await prFirebase.updateDoc(prFirebase.doc(prDb, PR_COLLECTION_NAME, id), {
      ...patch,
      updatedAt: prFirebase.serverTimestamp()
    });
    return;
  }

  const entry = prEntries.find(x => x.id === id);
  if (entry) {
    Object.assign(entry, patch);
    prSaveData();
  }
}

async function prDeleteEntry(id) {
  if (prStorageMode === 'firebase' && prDb && prFirebase) {
    await prFirebase.deleteDoc(prFirebase.doc(prDb, PR_COLLECTION_NAME, id));
    return;
  }

  prEntries = prEntries.filter(x => x.id !== id);
  prSaveData();
}

// ——— Login / Logout ———
function prOpenLogin() {
  // Crear modal
  const overlay = document.createElement('div');
  overlay.className = 'pr-modal-overlay';
  overlay.id = 'pr-login-overlay';
  overlay.innerHTML = `
    <div class="pr-modal">
      <h2>🔒 Modo Docente</h2>
      <p>Ingresá la contraseña para acceder al panel de corrección.</p>
      <div class="pr-modal-error" id="pr-login-error"></div>
      <input type="password" id="pr-login-pwd" placeholder="Contraseña"
        onkeydown="if(event.key==='Enter') prSubmitLogin()">
      <div class="pr-modal-btns">
        <button type="button" class="pr-modal-ok" onclick="prSubmitLogin()">Entrar</button>
        <button type="button" class="pr-modal-cancel" onclick="prCloseLogin()">Cancelar</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => document.getElementById('pr-login-pwd').focus(), 50);
}

function prCloseLogin() {
  const overlay = document.getElementById('pr-login-overlay');
  if (overlay) overlay.remove();
}

async function prSubmitLogin() {
  if (!PR_TEACHER_HASH) {
    const err = document.getElementById('pr-login-error');
    if (err) err.textContent = '⚠️ Modo docente desactivado. Configurá window.RUWAY_TEACHER_HASH para habilitarlo.';
    return;
  }
  const pwd = document.getElementById('pr-login-pwd').value;
  const err = document.getElementById('pr-login-error');
  const hash = await prHashInput(pwd);
  if (hash === PR_TEACHER_HASH) {
    prTeacherMode = true;
    prCloseLogin();
    renderPractica();
  } else {
    err.textContent = '❌ Contraseña incorrecta. Intentá de nuevo.';
    document.getElementById('pr-login-pwd').value = '';
    document.getElementById('pr-login-pwd').focus();
  }
}

function prLogout() {
  prTeacherMode = false;
  renderPractica();
}

// ——— Barra superior de modo ———
function renderTeacherBar() {
  const bar = document.getElementById('pr-teacher-bar');
  if (!bar) return;
  const addCard = document.getElementById('pr-add-card');
  const desc = document.getElementById('pr-main-desc');

  if (prTeacherMode) {
    bar.innerHTML = `
      <div class="pr-teacher-bar-active">
        <span class="pr-teacher-badge">👩‍🏫 DOCENTE</span>
        <span>Modo corrección activo. Los paneles de corrección están visibles.</span>
        <button type="button" class="pr-btn-logout" onclick="prLogout()">Salir del modo docente</button>
      </div>
    `;
    if (addCard) addCard.style.display = 'none';
    if (desc) desc.textContent = 'Revisá las oraciones de tus estudiantes. Marcá cada una como correcta o indicá los errores.';
  } else {
    bar.innerHTML = `
      <div class="pr-teacher-bar-student">
        <span style="font-size:13px; color:#9a8870;">¿Sos el docente?</span>
        <button type="button" class="pr-login-btn" onclick="prOpenLogin()">🔒 Ingresar como docente</button>
      </div>
    `;
    if (addCard) addCard.style.display = '';
    if (desc) desc.textContent = 'Elegí tu sección, escribí una oración en quechua y enviala. Tu docente la revisará y te dejará su corrección.';
  }
}

// ——— Agregar oración (estudiante) ———
async function addPracticaEntry() {
  const input = document.getElementById('pr-input');
  const fb = document.getElementById('pr-add-feedback');
  if (!input) return;
  const text = input.value.trim();
  if (!text) { fb.textContent = '⚠️ Escribí una oración antes de enviar.'; fb.style.color = '#b5332f'; return; }
  try {
    await initPracticaStorage();
    await prCreateEntry({ section: prActiveSection, text, status: 'pending', correction: '' });
    input.value = '';
    fb.textContent = prStorageMode === 'firebase'
      ? '✅ ¡Oración enviada! Ya quedó guardada en Firebase.'
      : '✅ ¡Oración enviada! Quedó guardada en este navegador.';
    fb.style.color = '#1f8f3a';
    setTimeout(() => { if(fb) fb.textContent = ''; }, 2500);
    if (prStorageMode !== 'firebase') renderPracticaList();
  } catch (err) {
    console.error(err);
    fb.textContent = '❌ No se pudo guardar la oración.';
    fb.style.color = '#b5332f';
  }
}

// ——— Acciones del docente ———
async function prMarkOk(id) {
  await prUpdateEntry(id, { status: 'ok', correction: '' });
  if (prStorageMode !== 'firebase') renderPracticaList();
}

async function prMarkError(id) {
  const input = document.getElementById('pr-corr-' + id);
  const correction = input ? input.value.trim() : '';
  await prUpdateEntry(id, { status: 'error', correction: correction || '(sin nota)' });
  if (prStorageMode !== 'firebase') renderPracticaList();
}

async function prDelete(id) {
  if (!confirm('¿Borrar esta oración?')) return;
  await prDeleteEntry(id);
  if (prStorageMode !== 'firebase') renderPracticaList();
}

async function prResetStatus(id) {
  await prUpdateEntry(id, { status: 'pending', correction: '' });
  if (prStorageMode !== 'firebase') renderPracticaList();
}

// ——— Selector de sección ———
function renderPracticaSectionSelector() {
  const c = document.getElementById('pr-section-selector');
  if (!c) return;
  let html = '';
  for (let i = 1; i <= PR_SECTIONS; i++) {
    const count = prEntries.filter(x => x.section === i).length;
    const countBadge = count > 0 ? ` <span style="opacity:.6;font-weight:400;">(${count})</span>` : '';
    html += `<button type="button" class="pr-sec-btn${prActiveSection === i ? ' active' : ''}"
      onclick="prSetSection(${i})">Sección ${i}${countBadge}</button>`;
  }
  c.innerHTML = html;
  const label = document.getElementById('pr-active-section-label');
  if (label) label.textContent = 'Sección ' + prActiveSection;
}

function prSetSection(n) {
  prActiveSection = n;
  renderPracticaSectionSelector();
}

// ——— Lista de oraciones ———
function renderPracticaList() {
  const c = document.getElementById('pr-list-container');
  if (!c) return;
  renderPracticaSyncBanner();
  renderTeacherBar();
  renderPracticaSectionSelector();

  // Agrupar por sección
  const sections = {};
  prEntries.forEach(e => {
    if (!sections[e.section]) sections[e.section] = [];
    sections[e.section].push(e);
  });
  const sectionNums = Object.keys(sections).map(Number).sort((a,b) => a-b);

  if (sectionNums.length === 0) {
    c.innerHTML = '<div class="pr-empty">Todavía no hay oraciones enviadas.<br>Seleccioná una sección y empezá a escribir.</div>';
    return;
  }

  let html = '';
  sectionNums.forEach(sec => {
    const entries = sections[sec];
    html += `<div class="pr-section-group-title">📂 Sección ${sec}</div>`;

    entries.forEach(e => {
      const isOk  = e.status === 'ok';
      const isErr = e.status === 'error';

      const statusIcon = isOk
        ? '<span class="pr-status-ok">✅</span>'
        : isErr
        ? '<span class="pr-status-err">❌</span>'
        : '<span style="color:#b0a088;font-size:18px;">⏳</span>';

      const correctionHtml = isOk
        ? `<div class="pr-correction" style="background:#eafff0;border-color:#a0e0b0;color:#1b5529;">✔ ¡Correcto! Sin errores.</div>`
        : isErr && e.correction
        ? `<div class="pr-correction">📝 <strong>Corrección:</strong> ${escapeHtml(e.correction)}</div>`
        : '';

      // Panel docente: solo si está en modo docente
      const teacherPanel = prTeacherMode ? `
        <div class="pr-teacher-panel">
          <div class="pr-teacher-label">👩‍🏫 Corrección del docente</div>
          <div class="pr-teacher-row">
            <input id="pr-corr-${e.id}" type="text" class="pr-teacher-input"
              placeholder="Escribí el error y cómo debería corregirse..."
              value="${escapeHtml((e.correction && e.correction !== '(sin nota)') ? e.correction : '')}">
            <button type="button" class="pr-btn-ok" onclick="prMarkOk('${e.id}')">✅ Correcto</button>
            <button type="button" class="pr-btn-err" onclick="prMarkError('${e.id}')">❌ Con errores</button>
            <button type="button" class="pr-btn-del" title="Borrar oración" onclick="prDelete('${e.id}')">🗑</button>
          </div>
        </div>
      ` : '';

      html += `
        <div class="pr-entry">
          <div class="pr-entry-header">
            <span class="pr-entry-badge">Sec. ${e.section}</span>
            <span class="pr-entry-text">${escapeHtml(e.text)}</span>
            ${statusIcon}
          </div>
          ${correctionHtml}
          ${teacherPanel}
        </div>
      `;
    });
  });

  c.innerHTML = html;
}

// ——— Entry point ———
function renderPractica() {
  renderPracticaSyncBanner();
  renderTeacherBar();
  renderPracticaSectionSelector();
  renderPracticaList();
}

// ═══════════════════════════════════════════════
// BLOQUE POSESIVOS — ¿Mayman risun?
// ═══════════════════════════════════════════════

// Sufijos posesivos por persona (raíz + sufijo + man)
const posSufijos = [
  { id:'noqa',      sufijo:'-y',       ql:'Noqa',      es:'a la mía',          label:'noqa',      labelEs:'yo',              ejemplo: r => r+'yman' },
  { id:'qan',       sufijo:'-yki',     ql:'Qan',       es:'a la tuya',         label:'qan',       labelEs:'tú',              ejemplo: r => r+'ykiman' },
  { id:'pay',       sufijo:'-n',       ql:'Pay',       es:'a la de él/ella',   label:'pay',       labelEs:'él/ella',         ejemplo: r => r+'nman' },
  { id:'noqanchej', sufijo:'-nchej',   ql:'Noqanchej', es:'a la de todos nos.',label:'noqanchej', labelEs:'nosotros (inc.)', ejemplo: r => r+'nchejman' },
  { id:'noqayku',   sufijo:'-yku',     ql:'Noqayku',   es:'a la nuestra',      label:'noqayku',   labelEs:'nosotros (exc.)', ejemplo: r => r+'ykuman' },
  { id:'qankuna',   sufijo:'-ykichej', ql:'Qankuna',   es:'a la de ustedes',   label:'qankuna',   labelEs:'ustedes',         ejemplo: r => r+'ykichejman' },
  { id:'paykuna',   sufijo:'-nku',     ql:'Paykuna',   es:'a la de ellos',     label:'paykuna',   labelEs:'ellos/as',        ejemplo: r => r+'nkuman' },
];

// Lógica de formación: wasi + -y + man = wasiyman
// Para raíces terminadas en vocal: raíz + sufijo + man (sin cambios especiales para -man)
// Excepciones manejadas caso por caso:
function posFormar(raiz, sufijo) {
  // sufijo viene como '-y', '-yki', '-n', etc. — sacamos el guión
  return raiz + sufijo.replace('-', '') + 'man';
}

let posNounActivo = { raiz: 'wasi', es: 'casa' };
let posPersonaActiva = 'noqa';

function posSetNoun(raiz, es) {
  posNounActivo = { raiz, es };
  document.querySelectorAll('.pos-noun-btn').forEach(b =>
    b.classList.toggle('active', b.getAttribute('onclick').includes(`'${raiz}'`))
  );
  posRender();
}

function posSetPersona(id) {
  posPersonaActiva = id;
  posRender();
}

function posRender() {
  const persona = posSufijos.find(p => p.id === posPersonaActiva) || posSufijos[0];
  const { raiz, es } = posNounActivo;
  const formed = posFormar(raiz, persona.sufijo);

  // Resultado principal
  const qEl = document.getElementById('pos-output-q');
  const esEl = document.getElementById('pos-output-es');
  if (qEl) qEl.textContent = `${formed.charAt(0).toUpperCase() + formed.slice(1)} risun.`;
  if (esEl) esEl.textContent = `Iremos ${persona.es} (${es}).`;

  // Grid de personas
  const grid = document.getElementById('pos-grid');
  if (!grid) return;
  grid.innerHTML = posSufijos.map(p => {
    const f = posFormar(raiz, p.sufijo);
    const isActive = p.id === posPersonaActiva;
    return `
      <button type="button" class="pos-person-btn${isActive ? ' active' : ''}"
        onclick="posSetPersona('${p.id}')">
        <span class="pos-q">${f}</span>
        <span class="pos-es">${p.es} · <em>${p.labelEs}</em></span>
      </button>
    `;
  }).join('');
  ensureActiveVisible(grid);
  setupRuwayScrollHints();
}

function initPosesivos() {
  posRender();
}

// ═══════════════════════════════════════════════
// BLOQUE VERBOS — Presente, Pasado, Futuro
// ═══════════════════════════════════════════════

// Conjugación según tabla de la clase 7:
// Raíz del verbo (sin -y del infinitivo)
// Presente:          raíz + sufijo_pres
// Pres. continuo:    raíz + sha + sufijo_cont
// Pasado:            raíz_pas + rqa + sufijo_pas  (pay: solo raíz+rqa sin sufijo extra)
// Futuro:            raíz_fut + sufijo_fut

const vbPersonas = [
  { id:'noqa',      es:'yo',              suf: { pres:'ni',       cont:'ni',       pas:'ni',       fut:'saj'      } },
  { id:'qan',       es:'tú',              suf: { pres:'nki',      cont:'nki',      pas:'nki',      fut:'nki'      } },
  { id:'pay',       es:'él/ella',         suf: { pres:'n',        cont:'n',        pas:'',         fut:'nqa'      } },
  { id:'noqanchej', es:'nosotros (inc.)', suf: { pres:'nchej',    cont:'nchej',    pas:'nchej',    fut:'sun'      } },
  { id:'noqayku',   es:'nosotros (exc.)', suf: { pres:'yku',      cont:'yku',      pas:'yku',      fut:'sajku'    } },
  { id:'qankuna',   es:'ustedes',         suf: { pres:'nkichej',  cont:'nkichej',  pas:'nkichej',  fut:'nkichej'  } },
  { id:'paykuna',   es:'ellos/as',        suf: { pres:'nku',      cont:'nku',      pas:'nku',      fut:'nqanku'   } },
];

// Traducciones por persona y tiempo
const vbTradEs = {
  noqa:      { pres:'Yo',              cont:'Yo',         pas:'Yo',           fut:'Yo'           },
  qan:       { pres:'Tú',             cont:'Tú',         pas:'Tú',           fut:'Tú'           },
  pay:       { pres:'Él/ella',        cont:'Él/ella',    pas:'Él/ella',      fut:'Él/ella'      },
  noqanchej: { pres:'Nosotros',       cont:'Nosotros',   pas:'Nosotros',     fut:'Nosotros'     },
  noqayku:   { pres:'Nosotros',       cont:'Nosotros',   pas:'Nosotros',     fut:'Nosotros'     },
  qankuna:   { pres:'Ustedes',        cont:'Ustedes',    pas:'Ustedes',      fut:'Ustedes'      },
  paykuna:   { pres:'Ellos/as',       cont:'Ellos/as',   pas:'Ellos/as',     fut:'Ellos/as'     },
};

const vbVerbos = [
  // raiz = raíz base del verbo. Las transformaciones fonológicas se aplican automáticamente:
  //   u → o  antes de -rqa  (pasado)
  //   i → e  antes de -nqa  (futuro 3ª persona) y -nqanku (futuro ellos)
  { inf:'yachay',   raiz:'yacha',   es:'saber',
    esConj: { pres:'sabe',       cont:'está sabiendo',    pas:'supo',      fut:'sabrá'      },
    esYo:   { pres:'sé',         cont:'estoy sabiendo',   pas:'supe',      fut:'sabré'      } },
  { inf:'yachakuy', raiz:'yachaku', es:'aprender',
    esConj: { pres:'aprende',    cont:'está aprendiendo', pas:'aprendió',  fut:'aprenderá'  },
    esYo:   { pres:'aprendo',    cont:'estoy aprendiendo',pas:'aprendí',   fut:'aprenderé'  } },
  { inf:'riy',      raiz:'ri',      es:'ir',
    esConj: { pres:'va',         cont:'está yendo',       pas:'fue',       fut:'irá'        },
    esYo:   { pres:'voy',        cont:'estoy yendo',      pas:'fui',       fut:'iré'        } },
  { inf:'kutimuy',  raiz:'kutirimu',es:'volver',
    esConj: { pres:'vuelve',     cont:'está volviendo',   pas:'volvió',    fut:'volverá'    },
    esYo:   { pres:'vuelvo',     cont:'estoy volviendo',  pas:'volví',     fut:'volveré'    } },
  { inf:"jap'iy",   raiz:"jap'i",   es:'agarrar',
    esConj: { pres:'agarra',     cont:'está agarrando',   pas:'agarró',    fut:'agarrará'   },
    esYo:   { pres:'agarro',     cont:'estoy agarrando',  pas:'agarré',    fut:'agarraré'   } },
  { inf:"llank'ay", raiz:"llank'a", es:'trabajar',
    esConj: { pres:'trabaja',    cont:'está trabajando',  pas:'trabajó',   fut:'trabajará'  },
    esYo:   { pres:'trabajo',    cont:'estoy trabajando', pas:'trabajé',   fut:'trabajaré'  } },
  { inf:'yanapay',  raiz:'yanapa',  es:'ayudar',
    esConj: { pres:'ayuda',      cont:'está ayudando',    pas:'ayudó',     fut:'ayudará'    },
    esYo:   { pres:'ayudo',      cont:'estoy ayudando',   pas:'ayudé',     fut:'ayudaré'    } },
  { inf:'ruway',    raiz:'ruwa',    es:'hacer',
    esConj: { pres:'hace',       cont:'está haciendo',    pas:'hizo',      fut:'hará'       },
    esYo:   { pres:'hago',       cont:'estoy haciendo',   pas:'hice',      fut:'haré'       } },
  { inf:'qoy',      raiz:'qo',      es:'dar',
    esConj: { pres:'da',         cont:'está dando',       pas:'dio',       fut:'dará'       },
    esYo:   { pres:'doy',        cont:'estoy dando',      pas:'di',        fut:'daré'       } },
  { inf:'yuyay',    raiz:'yuya',    es:'pensar',
    esConj: { pres:'piensa',     cont:'está pensando',    pas:'pensó',     fut:'pensará'    },
    esYo:   { pres:'pienso',     cont:'estoy pensando',   pas:'pensé',     fut:'pensaré'    } },
  { inf:'leey',     raiz:'lee',     es:'leer',
    esConj: { pres:'lee',        cont:'está leyendo',     pas:'leyó',      fut:'leerá'      },
    esYo:   { pres:'leo',        cont:'estoy leyendo',    pas:'leí',       fut:'leeré'      } },
  { inf:'tantakuy', raiz:'tantaku', es:'reunirse',
    esConj: { pres:'se reúne',   cont:'está reuniéndose', pas:'se reunió', fut:'se reunirá' },
    esYo:   { pres:'me reúno',   cont:'estoy reuniéndome',pas:'me reuní',  fut:'me reuniré' },
    esPorPersona: {
      noqa:      { pres:'me reúno',        cont:'estoy reuniéndome',      pas:'me reuní',        fut:'me reuniré'        },
      qan:       { pres:'te reúnes',       cont:'estás reuniéndote',      pas:'te reuniste',     fut:'te reunirás'       },
      pay:       { pres:'se reúne',        cont:'está reuniéndose',       pas:'se reunió',       fut:'se reunirá'        },
      noqanchej: { pres:'nos reunimos',    cont:'estamos reuniéndonos',   pas:'nos reunimos',    fut:'nos reuniremos'    },
      noqayku:   { pres:'nos reunimos',    cont:'estamos reuniéndonos',   pas:'nos reunimos',    fut:'nos reuniremos'    },
      qankuna:   { pres:'se reúnen',       cont:'están reuniéndose',      pas:'se reunieron',    fut:'se reunirán'       },
      paykuna:   { pres:'se reúnen',       cont:'están reuniéndose',      pas:'se reunieron',    fut:'se reunirán'       },
    }
  },
  { inf:'predicay', raiz:'predica', es:'predicar',
    esConj: { pres:'predica',    cont:'está predicando',  pas:'predicó',   fut:'predicará'  },
    esYo:   { pres:'predico',    cont:'estoy predicando', pas:'prediqué',  fut:'predicaré'  } },
  { inf:'parlay',   raiz:'parla',   es:'hablar',
    esConj: { pres:'habla',      cont:'está hablando',    pas:'habló',     fut:'hablará'    },
    esYo:   { pres:'hablo',      cont:'estoy hablando',   pas:'hablé',     fut:'hablaré'    } },
  { inf:'qhaway',   raiz:'qhawa',   es:'ver',
    esConj: { pres:'ve',         cont:'está viendo',      pas:'vio',       fut:'verá'       },
    esYo:   { pres:'veo',        cont:'estoy viendo',     pas:'vi',        fut:'veré'       } },
  { inf:'puriy',    raiz:'puri',    es:'caminar',
    esConj: { pres:'camina',     cont:'está caminando',   pas:'caminó',    fut:'caminará'   },
    esYo:   { pres:'camino',     cont:'estoy caminando',  pas:'caminé',    fut:'caminaré'   } },
];

// Devuelve la traducción correcta según persona y tiempo.
// Si el verbo tiene esPorPersona, lo usa; si no, usa la lógica general.
function vbGetTrad(v, pid, tiempo) {
  if (v.esPorPersona) return v.esPorPersona[pid][tiempo];
  if (pid === 'noqa') return v.esYo[tiempo];
  return v.esConj[tiempo];
}

const vbTiempos = [
  { id:'pres', label:'Presente',
    labelEs: (pron,v,pid) => `${pron} ${vbGetTrad(v,pid,'pres')}.` },
  { id:'cont', label:'Pres. continuo',
    labelEs: (pron,v,pid) => `${pron} ${vbGetTrad(v,pid,'cont')}.` },
  { id:'pas',  label:'Pasado',
    labelEs: (pron,v,pid) => `${pron} ${vbGetTrad(v,pid,'pas')}.`  },
  { id:'fut',  label:'Futuro',
    labelEs: (pron,v,pid) => {
      if (v.esPorPersona) return `${pron} ${v.esPorPersona[pid].fut}.`;
      if (pid === 'noqa') return `${pron} ${v.esYo.fut}.`;
      if (pid === 'qan') return `${pron} ${v.esConj.fut.replace(/á$/, 'ás')}.`;
      if (pid === 'pay') return `${pron} ${v.esConj.fut}.`;
      if (pid === 'noqanchej' || pid === 'noqayku') return `${pron} ${v.esYo.fut.replace(/é$/, 'emos').replace(/ré$/, 'remos')}.`;
      if (pid === 'qankuna' || pid === 'paykuna') return `${pron} ${v.esConj.fut.replace(/á$/, 'án')}.`;
      return `${pron} ${v.esConj.fut}.`;
    }
  },
];

let vbVerbActivo  = 0;   // índice en vbVerbos
let vbTiempoActivo = 0;  // índice en vbTiempos (0=pres,1=cont,2=pas,3=fut)
let vbPersonaActiva = 'noqa';
let vbNegative = false;
let vbQuestion = false;

function vbToggle(key) {
  if (key === 'neg') vbNegative = !vbNegative;
  if (key === 'pregunta') vbQuestion = !vbQuestion;
  const negBtn = document.getElementById('vb-tog-neg');
  const qBtn = document.getElementById('vb-tog-pregunta');
  if (negBtn) negBtn.classList.toggle('active', vbNegative);
  if (qBtn) qBtn.classList.toggle('active', vbQuestion);
  vbRender();
}

function vbBuildSentence(verbo, personaId, tiempoIdx, neg, q) {
  const forma = vbConjugar(verbo, personaId, tiempoIdx);
  let qBody = forma;
  if (neg && q) qBody = `manachu ${forma}`;
  else if (neg) qBody = `mana ${forma}chu`;
  else if (q) qBody = `${forma}chu`;

  const qSentence = q ? `¿${qBody}?` : `${qBody}.`;

  const tiempo = vbTiempos[tiempoIdx];
  const pronEs = vbTradEs[personaId];
  const pronLabel = pronEs[tiempo.id];
  const tradVerboRaw = vbGetTrad(verbo, personaId, tiempo.id);
  const esBody = `${pronLabel} ${neg ? 'no ' : ''}${tradVerboRaw}`;
  const esSentence = q ? `¿${esBody}?` : `${esBody}.`;

  return { qSentence, esSentence: esSentence.charAt(0).toUpperCase() + esSentence.slice(1) };
}

// Aplica reglas fonológicas sobre la vocal final de la raíz:
//   u → o  cuando el sufijo empieza con 'rqa' o 'nqa'
//   i → e  cuando el sufijo empieza con 'rqa' o 'nqa'
function vbAdaptarRaiz(raiz, sufijo) {
  const ultimaVocal = raiz.slice(-1);
  const sufijoCambia = sufijo.startsWith('rqa') || sufijo.startsWith('nqa');
  if (!sufijoCambia) return raiz;
  if (ultimaVocal === 'u') return raiz.slice(0,-1) + 'o';
  if (ultimaVocal === 'i') return raiz.slice(0,-1) + 'e';
  return raiz;
}

function vbConjugar(verbo, personaId, tiempoIdx) {
  const p = vbPersonas.find(x => x.id === personaId);
  const r = verbo.raiz;
  switch(tiempoIdx) {
    case 0: return r + p.suf.pres;                               // Presente
    case 1: return r + 'sha' + p.suf.cont;                      // Pres. continuo
    case 2: return vbAdaptarRaiz(r, 'rqa') + 'rqa' + p.suf.pas; // Pasado: u→o
    case 3: {                                                     // Futuro: i→e ante nqa
      const sufFut = p.suf.fut;
      return vbAdaptarRaiz(r, sufFut) + sufFut;
    }
  }
}

function vbSetVerb(idx) {
  vbVerbActivo = idx;
  document.querySelectorAll('.vb-verb-btn').forEach((b, i) =>
    b.classList.toggle('active', i === idx)
  );
  ensureActiveVisible(document.querySelector('.vb-verb-btn.active')?.parentElement);
  vbRender();
}

function vbSetTiempo(idx) {
  vbTiempoActivo = idx;
  [0,1,2,3].forEach(i =>
    document.getElementById('vb-t-' + i).classList.toggle('active', i === idx)
  );
  ensureActiveVisible(document.getElementById('vb-t-' + idx)?.parentElement);
  vbRender();
}

function vbSetPersona(id) {
  vbPersonaActiva = id;
  vbRender();
}

function vbRender() {
  const verbo   = vbVerbos[vbVerbActivo];
  const tiempo  = vbTiempos[vbTiempoActivo];
  const persona = vbPersonas.find(p => p.id === vbPersonaActiva);

  // Oración construida
  const built = vbBuildSentence(verbo, vbPersonaActiva, vbTiempoActivo, vbNegative, vbQuestion);

  document.getElementById('vb-output-q').textContent    = built.qSentence;
  document.getElementById('vb-output-es').textContent   = built.esSentence;
  document.getElementById('vb-tiempo-label').textContent = tiempo.label + ' — ' + verbo.inf + ' (' + verbo.es + ')';

  renderTargetSentences('vb');

  // Grid: todas las personas
  const grid = document.getElementById('vb-grid');
  if (!grid) return;
  grid.innerHTML = vbPersonas.map(p => {
    const f = vbConjugar(verbo, p.id, vbTiempoActivo);
    const fCap = f.charAt(0).toUpperCase() + f.slice(1);
    const isActive = p.id === vbPersonaActiva;
    const tradPron = vbTradEs[p.id][tiempo.id];
    const tradVerbo = tiempo.labelEs(tradPron, verbo, p.id).replace(tradPron + ' ', '');
    return `
      <button type="button" class="vb-person-btn${isActive ? ' active' : ''}"
        onclick="vbSetPersona('${p.id}')">
        <span class="vb-q">${fCap}</span>
        <span class="vb-es">${tradPron} ${tradVerbo} · <em>${p.es}</em></span>
      </button>
    `;
  }).join('');
  ensureActiveVisible(grid);
  setupRuwayScrollHints();
}

function vbReset() {
    vbSetVerb(0);
    vbSetTiempo(0);
    vbSetPersona('noqa');
    vbNegative = false;
    vbQuestion = false;
    document.getElementById('vb-tog-neg')?.classList.remove('active');
    document.getElementById('vb-tog-pregunta')?.classList.remove('active');
    if (typeof AUDIO !== 'undefined') AUDIO.playPop();
}

function initVerbos() {
  vbRender();
}

document.addEventListener('DOMContentLoaded', () => {
  initGrammarBuilder();
  initGrammarBuilder2();
  initSufijos();
  initYanapaBuilder();
  initPosesivos();
  initVerbos();
  setupRuwayScrollHints();
  // CSS para hueco activo en sufijos
  const style = document.createElement('style');
  style.textContent = `.sufijo-slot.sf-focused { border-color: var(--blue) !important; background: var(--blue-light) !important; }`;
  document.head.appendChild(style);
});

function showRuwayFeedback(id, message, type) {
  const el = document.getElementById(id + '-feedback');
  if (!el) return;
  el.textContent = message;
  el.className = 'ruway-feedback ' + type;
  el.style.display = 'block';
  el.style.opacity = '1';
  
  setTimeout(() => { 
    el.style.opacity = '0';
    setTimeout(() => { el.style.display = 'none'; }, 500);
  }, 3500);
}

/* Función para asegurar que el elemento activo esté visible en su carril */
function ensureActiveVisible(container) {
    if (!container) return;
    const active = container.querySelector('.active') || container.querySelector('.selected');
    if (active) {
        active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

/* Función para añadir indicadores visuales (flechas) a los carriles de scroll */
function setupRuwayScrollHints() {
    const scrollTargets = [
        '.gb-scroll-lane', 
        '.gb-chip-wrap', 
        '.grid-controls', 
        '.gb-toggles'
    ];
    
    document.querySelectorAll(scrollTargets.join(', ')).forEach(el => {
        // Si ya tiene el contenedor o no es scrollable, saltar
        if (el.parentNode.classList.contains('scroll-hint-container')) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'scroll-hint-container';
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        
        // Flecha Derecha
        const arrowRight = document.createElement('div');
        arrowRight.className = 'scroll-hint-arrow scroll-hint-arrow-right';
        arrowRight.innerHTML = '›';

        arrowRight.addEventListener('click', () => {
            el.scrollBy({ left: 200, behavior: 'smooth' });
            if (typeof AUDIO !== 'undefined') AUDIO.playTick();
        });

        // Flecha Izquierda
        const arrowLeft = document.createElement('div');
        arrowLeft.className = 'scroll-hint-arrow scroll-hint-arrow-left';
        arrowLeft.innerHTML = '‹';

        arrowLeft.addEventListener('click', () => {
            el.scrollBy({ left: -200, behavior: 'smooth' });
            if (typeof AUDIO !== 'undefined') AUDIO.playTick();
        });

        wrapper.appendChild(arrowRight);
        wrapper.appendChild(arrowLeft);
        
        const updateArrows = () => {
            // Mostrar flecha derecha si hay contenido adelante
            const hasMoreRight = el.scrollWidth > (el.clientWidth + el.scrollLeft + 15);
            arrowRight.style.opacity = hasMoreRight ? '1' : '0';

            // Mostrar flecha izquierda si se ha desplazado más de 15px a la derecha
            const hasMoreLeft = el.scrollLeft > 15;
            arrowLeft.style.opacity = hasMoreLeft ? '1' : '0';
        };
        
        el.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);
        // Observer para cambios en el contenido interno (dinámico)
        new MutationObserver(updateArrows).observe(el, { childList: true, subtree: true });
        setTimeout(updateArrows, 300);
    });
}
