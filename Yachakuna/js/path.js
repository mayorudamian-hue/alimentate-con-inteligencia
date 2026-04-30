/* js/path.js */
const PATH = {
    units: [],
    pathNodes: [],
    sectionsData: [[], [], [], []],
    sectionsConfig: [
        { title: "Sección 1: Primeros Pasos", bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" },
        { title: "Sección 2: Historias", bg: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)" },
        { title: "Sección 3: Viajes y Acción", bg: "linear-gradient(135deg, #2196F3 0%, #1565C0 100%)" },
        { title: "Sección 4: Avanzado", bg: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)" }
    ],

    // --- Audio Feedback ---
    playSuccessSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            
            const playNote = (freq, startTime, duration) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.1, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + duration);
            };

            // Sonido tipo Duolingo (dos notas ascendentes)
            playNote(523.25, ctx.currentTime, 0.4); // C5
            playNote(659.25, ctx.currentTime + 0.1, 0.5); // E5
        } catch(e) { console.error("Audio error", e); }
    },

    playFestiveSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            
            const playNote = (freq, startTime, duration) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.1, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + duration);
            };

            // Arpegio festivo (Do5 - Mi5 - Sol5 - Do6)
            playNote(523.25, ctx.currentTime, 0.4);       // C5
            playNote(659.25, ctx.currentTime + 0.1, 0.4); // E5
            playNote(783.99, ctx.currentTime + 0.2, 0.4); // G5
            playNote(1046.50, ctx.currentTime + 0.3, 0.6);// C6
        } catch(e) { console.error("Audio error", e); }
    },

    playErrorSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            
            const playNote = (freq, startTime, duration, type = 'sine') => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.1, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + duration);
            };

            // Sonido de error (dos notas bajas y un poco ásperas)
            playNote(220, ctx.currentTime, 0.3, 'triangle'); // A3
            playNote(164.81, ctx.currentTime + 0.1, 0.4, 'triangle'); // E3
        } catch(e) { console.error("Audio error", e); }
    },

    playPopSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch(e) {}
    },

    showCheckmark() {
        let check = document.getElementById('feedback-check');
        if (!check) {
            check = document.createElement('div');
            check.id = 'feedback-check';
            check.className = 'feedback-checkmark';
            check.textContent = '✔️';
            document.body.appendChild(check);
        }
        check.classList.add('active');
        setTimeout(() => check.classList.remove('active'), 800);
    },

    init() {
        const hasData = this.extractUnits();
        if (!hasData) return;
        this.render();
    },

    extractUnits() {
        if (typeof DICTIONARY_DATA === 'undefined' || DICTIONARY_DATA.length === 0) return false;
        const unitSet = new Set();
        DICTIONARY_DATA.forEach(item => {
            if(item.unit) unitSet.add(item.unit.trim());
        });
        
        this.units = Array.from(unitSet).sort((a, b) => {
            const matchA = a.match(/\d+/);
            const matchB = b.match(/\d+/);
            const numA = matchA ? parseInt(matchA[0]) : 0;
            const numB = matchB ? parseInt(matchB[0]) : 0;
            return numA - numB;
        });

        this.pathNodes = [];
        this.sectionsData = [[], [], [], []];
        
        // Distribución dinámica: divide el total de unidades equitativamente entre las 4 secciones
        this.units.forEach((unitName, index) => {
            const sectionIndex = Math.min(3, Math.floor((index / this.units.length) * 4));
            if(sectionIndex >= 0 && sectionIndex < 4) {
                this.sectionsData[sectionIndex].push({ type: 'unit', name: unitName });
            }
        });

        // Append review nodes
        this.sectionsData.forEach((secUnits, idx) => {
            if (secUnits.length > 0) {
                secUnits.push({ type: 'review', name: `Repaso de Sección ${idx + 1}`, sectionIndex: idx });
            }
        });

        // Flatten to calculate true global paths
        this.sectionsData.forEach((secUnits) => {
            secUnits.forEach(node => {
                node.globalIndex = this.pathNodes.length;
                this.pathNodes.push(node);
            });
        });
        return true;
    },

    render() {
        const container = document.getElementById('path-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        let highestUnlockedIndex = 0;
        this.pathNodes.forEach(node => {
            if (window.STATE && window.STATE.unitProgress[node.name]) {
                highestUnlockedIndex = node.globalIndex + 1;
            }
        });

        this.sectionsData.forEach((secUnits, secIdx) => {
            if (secUnits.length === 0) return;
            const config = this.sectionsConfig[secIdx];
            
            const isActiveSection = secUnits.some(u => u.globalIndex === highestUnlockedIndex);
            
            const secEl = document.createElement('div');
            secEl.className = `path-section ${isActiveSection ? 'expanded' : ''}`;
            
            const icons = ["👤", "👋", "🏔️", "🚌", "❓", "❤️", "👥", "📍", "📚", "🗣️"];
            
            secEl.innerHTML = `
                <div class="path-section-bg" style="background-image: ${config.bg}"></div>
                <div class="path-header" style="background: ${config.bg}; box-shadow: 0 8px 0 rgba(0,0,0,0.2)" onclick="this.parentElement.classList.toggle('expanded')">
                    <div>
                        <h3>${config.title}</h3>
                    </div>
                    <button class="path-grammar-btn" onclick="event.stopPropagation(); PATH.showGrammar(${secIdx})">📖 Gramática</button>
                </div>
                <div class="path-nodes">
                    ${secUnits.map((u) => {
                        const isCompleted = window.STATE && window.STATE.unitProgress[u.name];
                        const isLocked = u.globalIndex > highestUnlockedIndex;
                        const isCurrent = u.globalIndex === highestUnlockedIndex;
                        
                        let iconHtml = "";
                        let nodeStyle = "";
                        let onclickStr = "";

                        if (u.type === 'unit') {
                            const icon = icons[u.globalIndex % icons.length];
                            iconHtml = isLocked ? '🔒' : icon;
                            onclickStr = isLocked ? '' : `PATH.startExercise('${u.name.replace(/'/g, "\\'")}')`;
                        } else {
                            iconHtml = isLocked ? '🔒' : '⭐';
                            nodeStyle = 'background: var(--gold); box-shadow: 0 8px 0 var(--gold-dark);';
                            if (isCompleted) {
                                nodeStyle = 'background: var(--bolivia-green); box-shadow: 0 8px 0 var(--bolivia-green-dark);';
                            }
                            onclickStr = isLocked ? '' : `PATH.startReview(${u.sectionIndex}, '${u.name}')`;
                        }

                        return `
                            <div class="path-node-wrapper">
                                <div class="path-node ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}" 
                                     style="${nodeStyle}"
                                     id="node-${u.globalIndex}"
                                     onclick="${onclickStr}">
                                    ${isCurrent ? '<div class="llama-indicator" id="current-llama">🦙</div>' : ''}
                                    ${iconHtml}
                                </div>
                                <div class="path-node-title">${u.name}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
            container.appendChild(secEl);
        });

        // --- Editor / Unlock Section ---
        const editorDiv = document.createElement('div');
        editorDiv.className = 'editor-section';
        editorDiv.innerHTML = `
            <div class="editor-title">Editor</div>
            <div class="editor-controls">
                <input type="password" id="editor-pwd" class="editor-input" placeholder="Contraseña...">
                <button class="editor-btn" onclick="PATH.checkEditorPassword()">Entrar</button>
            </div>
        `;
        container.appendChild(editorDiv);

        setTimeout(() => {
            const llama = document.getElementById('current-llama');
            if (llama) {
                llama.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    },

    showGrammar(secIdx) {
        if (typeof sectionGrammar !== 'undefined' && sectionGrammar[secIdx]) {
            const g = sectionGrammar[secIdx];
            const modalHTML = `
                <div class="ex-overlay active" style="z-index: 4000; overflow-y: auto;">
                    <div style="padding: 16px; background: var(--ink); color: white; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0;">
                        <h2 style="margin:0; font-family:'Fraunces', serif;">${g.title}</h2>
                        <button onclick="this.parentElement.parentElement.remove()" style="background:transparent; border:none; color:white; font-size:24px; cursor:pointer;">✖</button>
                    </div>
                    <div class="grammar-hub-content" style="padding: 16px; background: var(--paper); color: var(--ink); min-height: 100vh;">
                        ${g.html}
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        } else {
            alert("No hay notas gramaticales para esta sección aún. ¡Pronto añadiremos más!");
        }
    },

    checkEditorPassword() {
        const input = document.getElementById('editor-pwd');
        if (!input) return;

        const configuredHash = window.YACHAKUNA_EDITOR_HASH || '';
        if (!configuredHash) {
            alert("Modo editor desactivado. Configura window.YACHAKUNA_EDITOR_HASH para habilitarlo.");
            return;
        }

        this.verifyEditorPassword(input.value, configuredHash).then(isValid => {
            if (isValid) {
                this.unlockAll();
                alert("¡Modo Editor Activado! Todas las unidades han sido desbloqueadas.");
            } else {
                alert("Contraseña incorrecta.");
            }
            input.value = '';
        }).catch(() => {
            alert("No se pudo validar la contraseña del editor.");
        });
    },

    async verifyEditorPassword(raw, expectedHash) {
        if (!raw || !expectedHash || !window.crypto || !window.crypto.subtle) return false;
        const data = new TextEncoder().encode(raw);
        const digest = await crypto.subtle.digest('SHA-256', data);
        const hashHex = Array.from(new Uint8Array(digest))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        return hashHex === expectedHash.toLowerCase();
    },

    unlockAll() {
        if (!window.STATE) return;
        
        // Desbloquear solo las unidades reales; los nodos de repaso se habilitan por progresión normal.
        this.pathNodes.forEach(node => {
            if (node.type === 'unit') {
                window.STATE.unitProgress[node.name] = true;
            }
        });
        
        window.STATE.save();
        this.render();
    },

    // --- EXERCISE ENGINE ---
    currentUnitName: "",
    currentVocab: [],
    sessionQuestions: [],
    currentExIndex: 0,
    sessionLives: 3,
    isReviewMode: false,
    comboCount: 0,

    // --- Timer for Pairs Mode ---
    pairsTimerInterval: null,
    pairsTimeLeft: 0,

    startExercise(unitName) {
        this.currentUnitName = unitName;
        this.isReviewMode = false;
        this.currentVocab = DICTIONARY_DATA.filter(i => i.unit === unitName);
        if (this.currentVocab.length === 0) return alert("Esta unidad no tiene vocabulario.");

        const selectedItems = this.selectSessionItems(this.currentVocab, 10);
        this.initSession(selectedItems);
    },

    startReview(sectionIndex, nodeName) {
        this.currentUnitName = nodeName;
        this.isReviewMode = true;
        
        const sectionUnitsNames = this.sectionsData[sectionIndex]
            .filter(n => n.type === 'unit')
            .map(n => n.name);
            
        this.currentVocab = DICTIONARY_DATA.filter(i => i.unit && sectionUnitsNames.includes(i.unit.trim()));
        if (this.currentVocab.length === 0) return alert("Esta sección no tiene vocabulario para repasar.");

        const selectedItems = this.selectSessionItems(this.currentVocab, 20);
        this.initSession(selectedItems);
    },

    selectSessionItems(vocab, count) {
        if (!window.STATE || !window.STATE.recentMistakes.length) {
            return [...vocab].sort(() => 0.5 - Math.random()).slice(0, count);
        }

        const mistakeVerbs = window.STATE.recentMistakes.map(m => m.verb);
        
        // Separar en fallados y no fallados
        const mistakes = vocab.filter(item => mistakeVerbs.includes(item.verb));
        const others = vocab.filter(item => !mistakeVerbs.includes(item.verb));

        // Priorizar: tomar hasta el 50% de fallados
        const maxMistakes = Math.ceil(count * 0.5);
        const selectedMistakes = mistakes
            .sort((a, b) => {
                // Ordenar por frecuencia/recencia en recentMistakes
                return mistakeVerbs.indexOf(a.verb) - mistakeVerbs.indexOf(b.verb);
            })
            .slice(0, maxMistakes);

        const remainingCount = count - selectedMistakes.length;
        const selectedOthers = others
            .sort(() => 0.5 - Math.random())
            .slice(0, remainingCount);

        return [...selectedMistakes.map(m => ({...m, isMistake: true})), ...selectedOthers].sort(() => 0.5 - Math.random());
    },

    initSession(selectedItems) {
        this.sessionQuestions = selectedItems.map(item => this.generateRandomQuestion(item, null, false, item.isMistake));
        this.currentExIndex = 0;
        this.sessionLives = 3;
        this.overrideCount = 5;
        this.comboCount = 0;
        
        if (!document.getElementById('ex-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'ex-overlay';
            overlay.className = 'ex-overlay';
            document.body.appendChild(overlay);
        }
        document.getElementById('ex-overlay').classList.add('active');
        this.updateStreakVisuals();
        
        this.renderExercise();
    },

    getSentenceExample(item) {
        if (!item || !item.sentences) return null;
        if (Array.isArray(item.sentences)) {
            return item.sentences.find(sentence => sentence && typeof sentence.text === 'string') || null;
        }
        if (typeof item.sentences === 'object' && typeof item.sentences.text === 'string') {
            return item.sentences;
        }
        return null;
    },

    generateRandomQuestion(item, avoidMode = null, withHint = false, isMistake = false) {
        const sentenceExample = this.getSentenceExample(item);
        // 30% mc (choice), 10% write (input), 20% fill (complete), 20% pairs
        const baseWeights = {
            "input": 10,
            "choice": 30,
            "complete": 20,
            "pairs": 20
        };
        
        let validModes = ["choice", "input", "pairs"];
        if (sentenceExample) {
            validModes.push("complete");
        }
        
        if (avoidMode && validModes.length > 1) {
            validModes = validModes.filter(m => m !== avoidMode);
        }
        
        let totalWeight = 0;
        validModes.forEach(m => totalWeight += baseWeights[m]);
        
        let rand = Math.random() * totalWeight;
        let mode = validModes[0];
        for (let m of validModes) {
            if (rand < baseWeights[m]) {
                mode = m;
                break;
            }
            rand -= baseWeights[m];
        }
        let hintHtml = withHint ? `<div style="font-size:12px; color:#8a7c64; margin-top:8px;">💡 Pista: Empieza con "${item.verb.substring(0,2)}..."</div>` : '';
        let mistakeHtml = isMistake ? `<div style="display:inline-block; background:rgba(200,16,46,0.1); color:var(--bolivia-red); font-size:11px; padding:4px 8px; border-radius:8px; font-weight:900; margin-bottom:8px; border:1px solid rgba(200,16,46,0.2);">🔄 REFUERZO</div>` : '';

        if (mode === "choice") {
            const wrongOpts = [];
            while(wrongOpts.length < 3) {
                const w = DICTIONARY_DATA[Math.floor(Math.random() * DICTIONARY_DATA.length)];
                if (w.verb !== item.verb && !wrongOpts.includes(w.verb)) wrongOpts.push(w.verb);
            }
            const opts = [...wrongOpts, item.verb].sort(() => 0.5 - Math.random());
            return { item, mode, type: 'choice', q: `${mistakeHtml}<br>¿Cómo se dice "${item.translation}"? ${hintHtml}`, options: opts, correct: opts.indexOf(item.verb) };
        } 
        else if (mode === "input") {
            return { item, mode, type: 'input', q: `${mistakeHtml}<br>Traduce: "${item.translation}" ${hintHtml}`, correct: item.verb };
        }
        else if (mode === "complete") {
            const sentenceQ = sentenceExample.text;
            let hiddenWord = item.verb;
            const words = sentenceQ.split(' ');
            if (!sentenceQ.includes(hiddenWord)) {
                hiddenWord = words[Math.floor(Math.random() * words.length)];
            }
            const blanked = sentenceQ.replace(hiddenWord, "[_____]");
            
            const wrongOpts = [];
            while(wrongOpts.length < 2) {
                const w = DICTIONARY_DATA[Math.floor(Math.random() * DICTIONARY_DATA.length)];
                if (w.verb !== hiddenWord) wrongOpts.push(w.verb);
            }
            const opts = [...wrongOpts, hiddenWord].sort(() => 0.5 - Math.random());
            return { item, mode, type: 'choice', q: `${mistakeHtml}<br>Completa: ${blanked} <br><small style="color:#666">(${sentenceExample.trans || ''})</small> ${hintHtml}`, options: opts, correct: opts.indexOf(hiddenWord) };
        }
        else if (mode === "order") {
            const tokens = sentenceExample.text.split(' ').filter(t => t.trim() !== '');
            const shuffled = [...tokens].sort(() => 0.5 - Math.random());
            return { item, mode, type: 'order', q: `${mistakeHtml}<br>Ordena: "${sentenceExample.trans || ''}" ${hintHtml}`, tokens: shuffled, correctStr: sentenceExample.text };
        }
        else if (mode === "pairs") {
            // Obtener 5 pares adicionales para un total de 6
            const others = [...DICTIONARY_DATA].filter(w => w.verb !== item.verb).sort(() => 0.5 - Math.random()).slice(0, 5);
            const pool = [item, ...others];
            const left = pool.map(p => ({id: p.verb, text: p.translation})).sort(() => 0.5 - Math.random());
            const right = pool.map(p => ({id: p.verb, text: p.verb})).sort(() => 0.5 - Math.random());
            return { item, mode, type: 'pairs', left, right, total: pool.length };
        }
    },

    renderExercise() {
        const overlay = document.getElementById('ex-overlay');
        const ex = this.sessionQuestions[this.currentExIndex];
        const progress = (this.currentExIndex / this.sessionQuestions.length) * 100;

        let contentHtml = '';
        if (ex.type === 'choice') {
            contentHtml = `
                <div class="ex-question">${ex.q}</div>
                <div class="ex-options">
                    ${ex.options.map((opt, i) => `
                        <div class="ex-option" id="opt-${i}" onclick="PATH.checkAnswer(${i}, ${ex.correct})">${opt}</div>
                    `).join('')}
                </div>
            `;
        } else if (ex.type === 'input') {
            contentHtml = `
                <div class="ex-question">${ex.q}</div>
                <input type="text" id="ex-input-field" class="ex-input" placeholder="Escribe aquí..." onkeydown="if(event.key==='Enter') PATH.checkInputAnswer('${ex.correct.replace(/'/g, "\\'")}')">
            `;
        } else if (ex.type === 'order') {
            contentHtml = `
                <div class="ex-question">Ordena la frase:</div>
                <div class="order-dropzone" id="order-dropzone"></div>
                <div class="order-pool" id="order-pool">
                    ${ex.tokens.map(t => `<div class="order-token" onclick="PATH.moveOrderToken(this)">${t}</div>`).join('')}
                </div>
            `;
        } else if (ex.type === 'pairs') {
            contentHtml = `
                <div class="pairs-timer-container" id="pairs-timer">
                    ⏱️ <span id="pairs-countdown">30</span>s
                </div>
                <div class="ex-question">Tupachiy: Une los pares correctos</div>
                <div class="pairs-grid">
                    <div class="pairs-column">
                        ${ex.left.map(p => `<div class="pair-card" data-side="left" data-id="${p.id}" onclick="PATH.selectPair(this)">${p.text}</div>`).join('')}
                    </div>
                    <div class="pairs-column">
                        ${ex.right.map(p => `<div class="pair-card" data-side="right" data-id="${p.id}" onclick="PATH.selectPair(this)">${p.text}</div>`).join('')}
                    </div>
                </div>
            `;
        }

        overlay.innerHTML = `
            <div class="ex-header">
                <button class="ex-close" onclick="PATH.closeExercise()">✖</button>
                <div class="ex-progress-bar">
                    <div class="ex-progress-fill" style="width: ${progress}%"></div>
                </div>
                <div style="font-size: 20px; font-weight: 800; color: var(--bolivia-red)">❤️ ${this.sessionLives}</div>
            </div>
            <div class="ex-content">
                ${contentHtml}
            </div>
            <div class="ex-footer">
                <button class="btn-primary" id="ex-check-btn" onclick="PATH.submitExercise()">COMPROBAR</button>
            </div>
        `;

        if (ex.type === 'pairs') {
            this.startPairsTimer();
        }
    },

    startPairsTimer() {
        clearInterval(this.pairsTimerInterval);
        this.pairsTimeLeft = 30;
        const display = document.getElementById('pairs-countdown');
        
        this.pairsTimerInterval = setInterval(() => {
            this.pairsTimeLeft--;
            if (display) display.textContent = this.pairsTimeLeft;
            
            if (this.pairsTimeLeft <= 0) {
                clearInterval(this.pairsTimerInterval);
                if (display) display.parentElement.style.color = 'var(--bolivia-red)';
            }
        }, 1000);
    },
    
    moveOrderToken(el) {
        this.playPopSound();
        const dropzone = document.getElementById('order-dropzone');
        const pool = document.getElementById('order-pool');
        if (el.parentElement === pool) dropzone.appendChild(el);
        else pool.appendChild(el);
    },

    // --- Lógica del Modo Pares ---
    currentPairSelection: null,
    matchedPairs: 0,

    selectPair(el) {
        const side = el.dataset.side;
        const id = el.dataset.id;

        if (this.currentPairSelection && this.currentPairSelection.side !== side) {
            // Comparar
            const first = this.currentPairSelection;
            if (first.id === id) {
                // ¡Correcto!
                if (typeof AUDIO !== 'undefined') AUDIO.playPop();
                first.el.classList.add('pairs-correct');
                el.classList.add('pairs-correct');
                this.matchedPairs++;
                this.currentPairSelection = null;

                if (this.matchedPairs >= this.sessionQuestions[this.currentExIndex].total) {
                    this.matchedPairs = 0;
                    setTimeout(() => this.handleCorrect(), 500);
                }
            } else {
                // Error
                if (typeof AUDIO !== 'undefined') AUDIO.playError();
                first.el.classList.add('pairs-wrong', 'shake');
                el.classList.add('pairs-wrong', 'shake');
                
                // Descontar vida
                this.sessionLives--;
                document.querySelectorAll('.ex-header div')[1].textContent = `❤️ ${this.sessionLives}`;
                
                setTimeout(() => {
                    first.el.classList.remove('selected', 'pairs-wrong', 'shake');
                    el.classList.remove('selected', 'pairs-wrong', 'shake');
                    if (this.sessionLives <= 0) this.handleWrong("Has perdido todas las vidas uniendo pares.");
                }, 400);
                this.currentPairSelection = null;
            }
        } else {
            // Primera selección o cambio de opinión en el mismo lado
            if (this.currentPairSelection) this.currentPairSelection.el.classList.remove('selected');
            el.classList.add('selected');
            this.currentPairSelection = { side, id, el };
            if (typeof AUDIO !== 'undefined') AUDIO.playFlip();
        }
    },

    submitExercise() {
        const ex = this.sessionQuestions[this.currentExIndex];
        if (ex.type === 'input') {
            this.checkInputAnswer(ex.correct);
        } else if (ex.type === 'order') {
            const dropzone = document.getElementById('order-dropzone');
            const userStr = Array.from(dropzone.children).map(c => c.textContent).join(' ').trim();
            if (userStr === ex.correctStr) this.handleCorrect();
            else this.handleWrong(ex.correctStr);
        } else {
            alert("Selecciona una opción.");
        }
    },

    checkAnswer(selected, correct) {
        const opts = document.querySelectorAll('.ex-option');
        opts.forEach(o => o.style.pointerEvents = 'none'); 
        
        if (selected === correct) {
            document.getElementById(`opt-${selected}`).style.background = 'var(--bolivia-green)';
            document.getElementById(`opt-${selected}`).style.color = 'white';
            setTimeout(() => this.handleCorrect(), 1000);
        } else {
            document.getElementById(`opt-${selected}`).style.background = 'var(--bolivia-red)';
            document.getElementById(`opt-${selected}`).style.color = 'white';
            document.getElementById(`opt-${correct}`).style.background = 'var(--bolivia-green)';
            document.getElementById(`opt-${correct}`).style.color = 'white';
            
            const correctStr = this.sessionQuestions[this.currentExIndex].options[correct];
            setTimeout(() => this.handleWrong(correctStr), 1500);
        }
    },

    checkInputAnswer(correct) {
        const input = document.getElementById('ex-input-field').value.toLowerCase().trim();
        const normalizedInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedCorrect = correct.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        if (normalizedInput === normalizedCorrect) {
            document.getElementById('ex-input-field').style.borderColor = 'var(--bolivia-green)';
            this.handleCorrect();
        } else {
            document.getElementById('ex-input-field').style.borderColor = 'var(--bolivia-red)';
            this.handleWrong(correct);
        }
    },

    handleCorrect() {
        this.comboCount++;

        if (this.comboCount > 0 && this.comboCount % 5 === 0) {
            this.playFestiveSound();
            this.showLlamaCombo();
            if (this.comboCount % 10 === 0) {
                this.showConfetti();
            }
        } else {
            this.playSuccessSound();
        }

        this.showCheckmark();

        if (window.STATE) {
            window.STATE.totalAttempts++;
            window.STATE.correctAttempts++;
        }

        // Otorgar Bonus de XP si es modo pairs y hay tiempo restante
        if (this.sessionQuestions[this.currentExIndex].type === 'pairs' && this.pairsTimeLeft > 0) {
            if (window.STATE) window.STATE.addXP(5);
        }
        clearInterval(this.pairsTimerInterval);

        setTimeout(() => {
            this.currentExIndex++;
            if (this.currentExIndex >= this.sessionQuestions.length) {
                this.completeUnit();
            } else {
                this.renderExercise();
            }
        }, 600);
    },

    showAlert(msg, isError, callback, overrideCallback = null, overridesLeft = 0) {
        const safeMsg = this.escapeHtml(msg).replace(/\n/g, '<br>');
        const div = document.createElement('div');
        div.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6); z-index: 5000;
            display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
            padding-bottom: 24px;
        `;
        const box = document.createElement('div');
        box.style.cssText = `
            background: white; padding: 24px; border-radius: 20px; text-align: center; width: 90%; max-width: 400px;
            border: 4px solid ${isError ? 'var(--bolivia-red)' : 'var(--bolivia-green)'};
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            animation: popIn 0.3s ease-out forwards;
        `;
        
        let overrideBtnHtml = '';
        if (overrideCallback && overridesLeft > 0) {
            overrideBtnHtml = `<button class="btn-secondary" style="margin-top: 12px; width: 100%; background: transparent; border: 2px solid var(--border); color: var(--ink); padding: 12px; font-weight: bold; border-radius: 12px; cursor: pointer;" id="alert-override-btn">🏳️ Mi respuesta es correcta (${overridesLeft})</button>`;
        }
        
        box.innerHTML = `
            <p style="font-size: 18px; font-weight: 800; color: var(--ink); white-space: pre-line;">${safeMsg}</p>
            <button class="btn-primary" style="margin-top: 16px; width: 100%; background: ${isError ? 'var(--bolivia-red)' : 'var(--bolivia-green)'}; box-shadow: 0 4px 0 ${isError ? 'darkred' : 'darkgreen'};" id="alert-ok-btn">CONTINUAR</button>
            ${overrideBtnHtml}
        `;
        div.appendChild(box);
        const overlay = document.getElementById('ex-overlay');
        if(overlay) overlay.appendChild(div);
        
        document.getElementById('alert-ok-btn').onclick = () => {
            div.remove();
            if (callback) callback();
        };
        
        if (overrideCallback && overridesLeft > 0) {
            document.getElementById('alert-override-btn').onclick = () => {
                div.remove();
                overrideCallback();
            };
        }
    },

    handleWrong(correctAnswerStr = null) {
        this.playErrorSound();
        clearInterval(this.pairsTimerInterval);
        this.comboCount = 0;
        this.updateStreakVisuals();
        let msg = correctAnswerStr ? `❌ Mana ajinachu.\n\nLa respuesta correcta era:\n"${correctAnswerStr}"` : "❌ Mana ajinachu.";
        
        this.sessionLives--;
        if (window.STATE) {
            window.STATE.totalAttempts++;
            // Guardar error reciente (limitado a 300)
            window.STATE.recentMistakes.unshift({ verb: this.sessionQuestions[this.currentExIndex].item.verb, ts: Date.now() });
            if (window.STATE.recentMistakes.length > 300) window.STATE.recentMistakes.pop();
        }

        if (this.sessionLives <= 0) {
            this.showAlert("💔 Has fallado 3 veces.\n\n¡Vuelve a intentarlo desde el principio!", true, () => {
                this.closeExercise();
                this.render(); 
            });
            return;
        }
        
        let overrideCb = null;
        if (this.overrideCount > 0) {
            overrideCb = () => {
                this.overrideCount--;
                this.sessionLives++; // Restaurar la vida
                this.handleCorrect(); // Tratar como correcto
            };
        }
        
        this.showAlert(msg, true, () => {
            const currentEx = this.sessionQuestions[this.currentExIndex];
            const newEx = this.generateRandomQuestion(currentEx.item, currentEx.mode, true);
            this.sessionQuestions.push(newEx);
            this.currentExIndex++;
            this.renderExercise(); 
        }, overrideCb, this.overrideCount);
    },

    showLlamaCombo() {
        const messages = [
            "5 seguidas, sumajta ruwanki!",
            "ñaupajmanpuni riy!",
            "Ajinata ruwakun!",
            "sumajta yachanki!",
            "ama saqepuychu"
        ];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        
        // Determinar el emoji de la llama según la racha
        const llamaEmoji = this.comboCount > 15 ? '🔥' : '🦙'; // Usa fuego para rachas altas
        
        const container = document.createElement('div');
        container.className = 'llama-combo-container';
        container.innerHTML = `
            <div class="llama-combo-bubble">${msg}</div>
            <img src="assets/iconos/llama.png" class="llama-combo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
            <div class="llama-combo-img" style="display:none; font-size:60px;">${llamaEmoji}</div>
        `;
        document.body.appendChild(container);
        
        // Auto-eliminar después de 3 segundos
        setTimeout(() => {
            container.classList.add('out');
            setTimeout(() => container.remove(), 500);
        }, 3000);
    },

    showConfetti() {
        const colors = ['#eb4d4b', '#f0932b', '#f9ca24', '#badc58', '#6ab04c', '#22a6b3', '#7ed6df', '#e056fd', '#686de0'];
        const container = document.createElement('div');
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);

        for (let i = 0; i < 80; i++) {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 6;
            c.style.width = size + 'px';
            c.style.height = size + 'px';
            c.style.animationDuration = Math.random() * 2 + 2 + 's';
            c.style.animationDelay = Math.random() * 1 + 's';
            container.appendChild(c);
        }
        setTimeout(() => container.remove(), 6000);
    },

    completeUnit() {
        const xpEarned = 10; // Según requerimiento: +10 XP por práctica
        this.showSummary(xpEarned);
    },

    showSummary(xp) {
        const phrases = [
            "Sumajta ruwanki!",
            "May sumajpuni!",
            "Ñaupajmanpuni riy!",
            "Sumajta yachanki!",
            "¡Walejlla!"
        ];
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        
        const overlay = document.getElementById('ex-overlay');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="summary-screen">
                <div class="summary-content">
                    <div class="summary-header">LECCIÓN COMPLETADA</div>
                    <div class="summary-congrats">${randomPhrase}</div>
                    
                    <div class="summary-stats">
                        <div class="summary-stat-card">
                            <div class="stat-icon">✨</div>
                            <div class="stat-value">+${xp}</div>
                            <div class="stat-label">PUNTOS XP</div>
                        </div>
                        ${this.sessionLives === 3 ? `
                        <div class="summary-stat-card perfect">
                            <div class="stat-icon">💎</div>
                            <div class="stat-value">PERFECTO</div>
                            <div class="stat-label">SIN ERRORES</div>
                        </div>` : ''}
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button class="btn-primary summary-btn" id="summary-continue-btn" style="width: 100%;">CONTINUAR</button>
                        <button class="summary-btn" id="summary-share-btn" style="width: 100%; padding: 14px; border-radius: 16px; font-weight: 800; font-size: 13px; border: 2px solid var(--border); border-bottom: 4px solid var(--border); background: white; cursor: pointer; color: var(--ink); text-transform: uppercase;">📤 Compartir logro</button>
                    </div>
                </div>
            </div>
        `;

        this.showConfetti();
        this.playFestiveSound();

        document.getElementById('summary-share-btn').onclick = () => {
            const shareText = `¡He completado una lección en Yachakuna! 🏔️\n"${randomPhrase}"\nGanando +${xp} XP aprendiendo Quechua. ✨\n#Yachakuna #Quechua #AprendeQuechua`;
            
            navigator.clipboard.writeText(shareText).then(() => {
                const btn = document.getElementById('summary-share-btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = "✅ ¡COPIADO!";
                btn.style.color = "var(--bolivia-green)";
                btn.style.borderColor = "var(--bolivia-green)";
                if (typeof AUDIO !== 'undefined') AUDIO.playPop();
                
                // Registrar share y verificar insignias
                if (window.STATE) {
                    window.STATE.sharesCount = (window.STATE.sharesCount || 0) + 1;
                    this.checkShareAchievements(window.STATE.sharesCount);
                    window.STATE.save();
                }

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.color = "var(--ink)";
                    btn.style.borderColor = "var(--border)";
                }, 2000);
            });
        };

        document.getElementById('summary-continue-btn').onclick = () => {
            if (window.STATE) {
                window.STATE.unitProgress[this.currentUnitName] = true;
                if (this.sessionLives === 3) {
                    window.STATE.perfectUnits[this.currentUnitName] = true;
                }
                window.STATE.addXP(xp);
                window.STATE.recordPractice();
            }
            this.closeExercise();
            this.render();
        };
    },

    checkShareAchievements(count) {
        const milestones = {
            1: { id: 'share_1', name: 'Primer Eco', icon: '📢', desc: '¡Compartiste tu primer logro!' },
            5: { id: 'share_5', name: 'Vocero de los Andes', icon: '🏔️', desc: 'Has compartido 5 veces tus progresos.' },
            15: { id: 'share_15', name: 'Gran Amauta Digital', icon: '👑', desc: '¡Eres un embajador oficial del Quechua!' }
        };

        if (milestones[count]) {
            const badge = milestones[count];
            if (window.STATE) {
                if (!window.STATE.badges) window.STATE.badges = {};
                if (!window.STATE.badges[badge.id]) {
                    window.STATE.badges[badge.id] = true;
                    this.showBadgeNotification(badge);
                }
            }
        }
    },

    showBadgeNotification(badge) {
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.innerHTML = `
            <div class="badge-icon-anim">${badge.icon}</div>
            <div class="badge-info">
                <h4>Insignia Desbloqueada</h4>
                <p>${badge.name}</p>
                <small style="color: var(--ink-light); font-weight: 700;">${badge.desc}</small>
            </div>
        `;
        document.body.appendChild(notification);
        
        if (typeof AUDIO !== 'undefined' && AUDIO.playSuccess) AUDIO.playSuccess();
        else this.playSuccessSound();

        setTimeout(() => notification.classList.add('active'), 100);
        
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => notification.remove(), 600);
        }, 5000);
    },

    closeExercise() {
        const overlay = document.getElementById('ex-overlay');
        clearInterval(this.pairsTimerInterval);
        if (overlay) overlay.classList.remove('active');
    },

    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => PATH.init(), 100);
});
