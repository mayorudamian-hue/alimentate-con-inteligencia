/* js/dictionary.js */
const DICTIONARY = {
    data: [],
    DATA_VERSION: window.APP_DATA_VERSION || '1.0.0',
    
    // Mapeo manual de imágenes para palabras clave (Verbos y Adjetivos)
    IMAGE_MAPPING: {
        'kusisqa': 'assets/images/vocab/kusisqa.png',
        'llakisqa': 'assets/images/vocab/llakisqa.png',
        'mikhuy': 'assets/images/vocab/mikhuy.png',
        'puriy': 'assets/images/vocab/puriy.png',
        'saykusqa': 'assets/images/vocab/saykusqa.png',
        'phinasqa': 'assets/images/vocab/phinasqa.png',
        'onqosqa': 'assets/images/vocab/onqosqa.png',
        'yarqhasqa': 'assets/images/vocab/yarqhasqa.png',
        // Se pueden añadir más aquí
    },

    SENTENCE_KEYWORDS: {
        'inti': '☀️',
        'wasi': '🏠',
        'alqo': '🐶',
        'mishi': '🐱',
        't\'anta': '🍞',
        'mikhuy': '🍎',
        'puriy': '🚶',
        'orqo': '🏔️',
        'mayu': '🌊',
        'runas': '👥',
        'warmi': '👩',
        'wayna': '👨',
        'libro': '📚',
        'qolqe': '💰',
        'para': '🌧️',
        'chiri': '❄️',
        'p\'unchay': '📅',
        'llajta': '🏘️',
        // Saludos
        'imaynalla': '👋',
        'tinkunakama': '👋',
        'allin p\'unchay': '☀️',
        'allin ch\'isi': '🌙',
        'allin sukha': '⛅',
        'walejlla': '👍',
        // Pronombres
        'noqa': '👤',
        'qan': '👤',
        'pay': '👤',
        'noqanchej': '👥',
        'noqayku': '👥',
        'qankuna': '👥',
        'paykuna': '👥',
        // Objetos y Animales (Plurales)
        'maki': '✋',
        'chakra': '🌽',
        'punku': '🚪',
        'rumi': '🪨',
        'atoj': '🦊',
        'yachachej': '👨‍🏫'
    },

    EMOJI_PICKER_OPTIONS: [
        '😊','😢','😠','😴','🤢','🤔','😎','❤️','👍','✨',
        '🏠','🏫','🏢','🐶','🐱','🦊','🐦','🐴','🐑','🐮',
        '☀️','🌧️','❄️','🔥','🏔️','🌊','🍎','🌽','🍞','🥔',
        '🚶','🏃','🗣️','✍️','📖','👤','👥','👨','👩','👵',
        '🚗','🚲','🚌','📚','💰','👕','⌚','🔑','🎨','🛠️'
    ],

    getSentenceEmojis(text) {
        if (!text) return '';
        let emojis = '';
        const lowerText = text.toLowerCase();
        for (const [key, emoji] of Object.entries(this.SENTENCE_KEYWORDS)) {
            if (lowerText.includes(key)) {
                emojis += emoji;
            }
        }
        return emojis;
    },

    playFlipSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
        } catch(e) {}
    },

    async init() {
        try {
            const files = [
                'data/Unidades_1_a_11.json',
                'data/Unidades_12_a_22.json',
                'data/unidades_23_a_33_1.json',
                'data/unidades_34_a_45_v3.json'
            ];
            
            const fetchPromises = files.map(file => 
                // Versión estable por release para aprovechar caché del navegador
                fetch(`${file}?v=${this.DATA_VERSION}`).then(res => res.ok ? res.json() : []).catch(() => [])
            );

            const allResults = await Promise.all(fetchPromises);
            this.data = allResults.flat();
            
            // Publicamos en global para que PATH.js pueda acceder
            window.DICTIONARY_DATA = this.data;
            
            this.render();
            this.setupSearch();
            
            if (typeof PATH !== 'undefined') PATH.init();
            if (typeof STORIES_DATA !== 'undefined') this.processStoryContext();
        } catch (e) {
            console.error("Error loading dictionary data:", e);
            throw e; // Re-lanzamos para que la UI (refreshAllData) lo capture
        }
    },

    normalizeText(value) {
        if (typeof value !== 'string') return '';
        return value
            .normalize("NFD") // Descompone caracteres con tildes (ej: 'á' -> 'a' + '´')
            .replace(/[\u0300-\u036f]/g, "") // Elimina los signos diacríticos
            .toLowerCase();
    },

    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    highlightMatch(text, filter) {
        if (typeof text !== 'string' || !filter || filter.trim() === '') return text;

        const normalizedText = this.normalizeText(text);
        const normalizedFilter = this.normalizeText(filter);
        const filterLen = normalizedFilter.length;

        if (filterLen === 0) return text;

        let result = "";
        let startIndex = 0;
        let matchIndex = normalizedText.indexOf(normalizedFilter);

        while (matchIndex !== -1) {
            result += text.substring(startIndex, matchIndex);
            result += `<mark>${text.substring(matchIndex, matchIndex + filterLen)}</mark>`;
            startIndex = matchIndex + filterLen;
            matchIndex = normalizedText.indexOf(normalizedFilter, startIndex);
        }
        return result + text.substring(startIndex);
    },

    getSentenceExample(entry) {
        if (!entry || !entry.sentences) return null;
        if (Array.isArray(entry.sentences)) {
            return entry.sentences.find(item => item && typeof item.text === 'string') || null;
        }
        if (typeof entry.sentences === 'object' && typeof entry.sentences.text === 'string') {
            return entry.sentences;
        }
        return null;
    },

    getEntryImage(entry) {
        if (!entry || typeof entry !== 'object') return '';
        const candidates = [
            entry.image,
            entry.img,
            entry.imageUrl,
            entry.imageURL,
            entry.image_url,
            entry.imagen
        ];
        const image = candidates.find(v => typeof v === 'string' && v.trim() !== '');
        return image ? image.trim() : '';
    },
    
    getFallbackIcon(word, tags) {
        if (window.STATE && window.STATE.customEmojis && word) {
            const custom = window.STATE.customEmojis[word.toLowerCase()];
            if (custom) return custom;
        }

        const tagsArr = Array.isArray(tags) ? tags : (tags ? [tags] : []);
        const isVerb = tagsArr.includes('Verbo');
        const isAdj = tagsArr.includes('Adjetivo');
        const isNat = tagsArr.includes('Naturaleza');
        const isCli = tagsArr.includes('Clima');
        const isFood = tagsArr.includes('Comida');
        const isNum = tagsArr.includes('Número');
        
        let icon = '📖';
        if (isVerb) icon = '⚡';
        else if (isAdj) icon = '🎨';
        else if (isNat) icon = '🏔️';
        else if (isCli) icon = '☁️';
        else if (isFood) icon = '🍎';
        else if (isNum) icon = '🔢';

        const quechuaText = (word || "").toLowerCase();
        
        if (quechuaText.includes('inti')) icon = '☀️';
        else if (quechuaText.includes('para')) icon = '🌧️';
        else if (quechuaText.includes('chiri')) icon = '❄️';
        else if (quechuaText.includes('rupha')) icon = '🔥';
        else if (quechuaText.includes('mayu')) icon = '🌊';
        else if (quechuaText.includes('orqo')) icon = '🏔️';
        else if (quechuaText.includes('phuyu')) icon = '☁️';
        else if (quechuaText.includes('alqo')) icon = '🐶';
        else if (quechuaText.includes('mishi')) icon = '🐱';
        else if (quechuaText.includes('wasi')) icon = '🏠';
        else if (quechuaText.includes('maki')) icon = '✋';
        else if (quechuaText.includes('chakra')) icon = '🌽';
        else if (quechuaText.includes('punku')) icon = '🚪';
        else if (quechuaText.includes('rumi')) icon = '🪨';
        else if (quechuaText.includes('atoj')) icon = '🦊';
        else if (quechuaText.includes('yachachej')) icon = '👨‍🏫';
        else if (quechuaText.includes('onqosqa')) icon = '🤒';
        else if (quechuaText.includes('yarqhasqa')) icon = '🥣';

        return icon;
    },

    render(filter = '') {
        const container = document.getElementById('dict-container');
        if (!container) return;
        
        const progress = window.STATE ? window.STATE.unitProgress : {};
        const normalizedFilter = this.normalizeText(filter);
        container.innerHTML = '';
        

        let totalResults = 0;

        // --- DASHBOARD SRS (ESTILO ANKI) ---
        const unlockedWordsCount = this.data.filter(item => item.unit && progress[item.unit.trim()]).length;
        
        if (filter === '') {
            const dashboard = document.createElement('div');
            if (unlockedWordsCount > 0) {
                dashboard.className = 'srs-dashboard';
                dashboard.onclick = () => this.startSRS();
                dashboard.innerHTML = `
                    <div class="srs-badge">REPASO DISPONIBLE</div>
                    <h2>Tienes tarjetas a repasar</h2>
                    <p>Toca para empezar el repaso (${unlockedWordsCount} palabras)</p>
                `;
            } else {
                dashboard.className = 'srs-dashboard empty';
                dashboard.innerHTML = `
                    <div class="srs-badge">AL DÍA</div>
                    <h2>May sumaj, No hay nada por aquí</h2>
                    <p>Sigue avanzando en el camino para desbloquear más palabras.</p>
                `;
            }
            container.appendChild(dashboard);
        }

        // Agrupar por unidades
        const units = {};
        this.data.forEach((item, index) => {
            if (!item.unit) return;
            const unitName = item.unit.trim();
            const tagsStr = Array.isArray(item.tags) ? item.tags.join(' ') : (item.tags || '');

            const match = filter === '' || 
                          this.normalizeText(item.verb).includes(normalizedFilter) || 
                          this.normalizeText(item.translation).includes(normalizedFilter) ||
                          this.normalizeText(item.definition || '').includes(normalizedFilter) ||
                          this.normalizeText(unitName).includes(normalizedFilter) ||
                          this.normalizeText(tagsStr).includes(normalizedFilter) ||
                          this.normalizeText(item.storyContext).includes(normalizedFilter);
            
            if (match) {
                if (!units[unitName]) units[unitName] = [];
                item._id = index;
                units[unitName].push(item);
                totalResults++;
            }
        });

        const countEl = document.getElementById('dict-results-count');
        if (countEl) {
            countEl.textContent = `(${totalResults})`;
        }

        // Ordenar las unidades numéricamente (1, 2, 3...)
        const sortedUnitNames = Object.keys(units).sort((a, b) => {
            const matchA = a.match(/\d+/);
            const matchB = b.match(/\d+/);
            const numA = matchA ? parseInt(matchA[0]) : 0;
            const numB = matchB ? parseInt(matchB[0]) : 0;
            
            if (numA !== numB) return numA - numB;
            return a.localeCompare(b);
        });

        // Renderizar grupos
        sortedUnitNames.forEach(unitName => {
            const words = units[unitName];
            const isUnlocked = progress[unitName];
            
            const group = document.createElement('div');
            group.className = `unit-group ${!isUnlocked ? 'locked' : ''}`;
            if (filter !== '' && isUnlocked) group.classList.add('expanded');
            
            group.innerHTML = `
                <div class="unit-header" onclick="${isUnlocked ? "this.parentElement.classList.toggle('expanded')" : ""}">
                    <span>${isUnlocked ? '📁' : '🔒'} ${isUnlocked ? this.highlightMatch(unitName, filter) : 'Unidad Bloqueada'}</span>
                    <span>${isUnlocked ? '▼' : ''}</span>
                </div>
                <div class="unit-content">
                    ${isUnlocked ? words.map(w => {
                        const sentenceExample = this.getSentenceExample(w);
                        // Búsqueda insensible a mayúsculas y tildes en el mapeo
                        const imgUrl = this.IMAGE_MAPPING[this.normalizeText(w.verb)] || w.image;
                        const fallbackIcon = this.getFallbackIcon(w.verb, w.tags);
                        const escapedVerb = this.escapeHtml(w.verb);
                        const escapedSentence = sentenceExample ? this.escapeHtml(sentenceExample.text) : '';
                        const escapedSentenceTrans = sentenceExample ? this.escapeHtml(sentenceExample.trans || '') : '';

                        return `
                        <div class="word-item">
                            <div class="word-thumb" onclick="DICTIONARY.promptCustomEmoji(${w._id})" title="Cambiar emoji" style="cursor:pointer;">
                                ${imgUrl ? `<img src="${imgUrl}" alt="${escapedVerb}" onerror="this.parentElement.innerHTML='${fallbackIcon}'">` : fallbackIcon}
                            </div>
                            <div class="word-text">
                                <div class="word-q">${this.highlightMatch(w.verb, filter)}</div>
                                 <div class="word-es">${this.highlightMatch(w.translation, filter)}</div>
                                ${w.definition ? `
                                    <div class="word-definition" style="font-size: 0.85em; color: var(--ink-light); margin-top: 4px; font-style: italic; line-height: 1.3;">${this.highlightMatch(w.definition, filter)}</div>
                                ` : ''}
                                ${sentenceExample ? `
                                    <div class="word-example">
                                        ${escapedSentence} ${this.getSentenceEmojis(sentenceExample.text)} - <em>${escapedSentenceTrans}</em>
                                    </div>
                                ` : ''}
                            </div>
                            <div class="word-actions">
                                <button class="word-btn" onclick="DICTIONARY.speak('${w.verb.replace(/'/g, "\\'")}')" title="Escuchar">🔊</button>
                                <button class="word-btn ${w.pinned ? 'pinned' : ''}" onclick="DICTIONARY.togglePin(${w._id})" title="Fijar">⭐</button>
                            </div>
                        </div>
                    `}).join('') : `<p style="padding:15px; text-align:center; color:#999; font-size:13px;">Completa esta lección en el mapa para ver sus palabras.</p>`}
                </div>
            `;
            container.appendChild(group);
        });
    },
    
    setupSearch() {
        const input = document.getElementById('dict-search');
        if (!input || input.dataset.listener) return;
        
        let debounceTimer;
        input.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.render(e.target.value);
            }, 250);
        });
        input.dataset.listener = "true";
    },
    
    speak(text) {
        if (!window.speechSynthesis) return alert('Tu navegador no soporta síntesis de voz.');
        
        const utterance = new SpeechSynthesisUtterance(text);
        // Intentar usar voz de Perú o español genérico
        const voices = speechSynthesis.getVoices();
        let esVoice = voices.find(v => v.lang === 'es-PE') || 
                      voices.find(v => v.lang.startsWith('es-')) ||
                      voices.find(v => v.lang.startsWith('es'));
                      
        if (esVoice) utterance.voice = esVoice;
        
        // Ajustes para que suene más como quechua
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        
        speechSynthesis.speak(utterance);
    },
    
    togglePin(id) {
        this.data[id].pinned = !this.data[id].pinned;
        // Re-render pero manteniendo el estado de búsqueda
        const searchInput = document.getElementById('dict-search');
        this.render(searchInput ? searchInput.value : '');
    },

    promptCustomEmoji(id) {
        const item = this.data[id];
        if (!item) return;
        
        // Eliminar selector previo si existe
        const existing = document.getElementById('emoji-picker-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'emoji-picker-overlay';
        overlay.className = 'emoji-picker-overlay';
        
        overlay.innerHTML = `
            <div class="emoji-picker-window">
                <div class="emoji-picker-header">
                    <h3 style="margin:0; font-size:16px;">Emoji para "${item.verb}"</h3>
                    <button onclick="this.closest('.emoji-picker-overlay').remove()" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--ink-light); line-height:1;">&times;</button>
                </div>
                <div class="emoji-grid">
                    ${this.EMOJI_PICKER_OPTIONS.map(e => `<div class="emoji-grid-item" onclick="DICTIONARY.selectEmoji(${id}, '${e}')">${e}</div>`).join('')}
                </div>
                <div style="margin-top: 15px; display: flex;">
                    <button class="btn-secondary" style="width:100%; padding:10px; border-radius:12px;" onclick="DICTIONARY.selectEmoji(${id}, null)">Restaurar Original</button>
                </div>
            </div>
        `;

        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        document.body.appendChild(overlay);
    },

    selectEmoji(id, emoji) {
        if (typeof AUDIO !== 'undefined') AUDIO.playPop();
        
        const item = this.data[id];
        if (item && window.STATE) {
            window.STATE.setCustomEmoji(item.verb, emoji);
            this.render(document.getElementById('dict-search')?.value || '');
        }
        const overlay = document.getElementById('emoji-picker-overlay');
        if (overlay) overlay.remove();
    },

    startRandomReview() {
        this.isRandomReview = true;
        const btn = document.getElementById('random-repasito-btn');
        if (btn) {
            btn.classList.add('spin');
            setTimeout(() => btn.classList.remove('spin'), 600);
        }

        const progress = window.STATE ? window.STATE.unitProgress : {};
        const unlockedWords = this.data.filter(item => item.unit && progress[item.unit.trim()]);
        
        if (unlockedWords.length === 0) {
            return alert("Sigue aprendiendo en el mapa para desbloquear palabras para tu Repasito.");
        }
        
        const randomWord = unlockedWords[Math.floor(Math.random() * unlockedWords.length)];
        this.srsQueue = [randomWord];
        
        this.renderSRSUI();
        this.nextCard();
        this.speak(randomWord.verb);
    },
    
    // --- Lógica para buscar palabras en cuentos ---
    processStoryContext() {
        if (!this.data || this.data.length === 0 || !STORIES_DATA || STORIES_DATA.length === 0) {
            return;
        }

        this.data.forEach(dictItem => {
            let contextStrings = new Set();
            const dictVerb = this.normalizeText(dictItem.verb);
            const dictTranslation = this.normalizeText(dictItem.translation);
            if (!dictVerb && !dictTranslation) return;

            // Regex para evitar falsos positivos en español con palabras cortas (ej: "yo" no debe matchear "leyó")
            const esRegex = dictTranslation.length > 0 && dictTranslation.length < 4 
                ? new RegExp(`\\b${dictTranslation}\\b`, 'i') 
                : null;

            STORIES_DATA.forEach(story => {
                let wordFoundInStory = false;
                story.scenes.forEach(scene => {
                    if (scene.type === 'text' && !wordFoundInStory) {
                        const qText = this.normalizeText(scene.q || "");
                        const eText = this.normalizeText(scene.e || "");
                        
                        const matchQ = dictVerb && qText.includes(dictVerb);
                        const matchE = esRegex ? esRegex.test(eText) : (dictTranslation && eText.includes(dictTranslation));

                        if (matchQ || matchE) {
                            wordFoundInStory = true;
                            contextStrings.add(story.title);
                            contextStrings.add(story.subtitle);
                        }
                    }
                });
            });
            dictItem.storyContext = Array.from(contextStrings).join(' ');
        });
    },

    // --- LÓGICA SRS (Flashcards Anki) ---
    srsQueue: [],
    isRandomReview: false,
    currentCard: null,

    startSRS() {
        this.isRandomReview = false;
        const progress = window.STATE ? window.STATE.unitProgress : {};
        const unlockedWords = this.data.filter(item => item.unit && progress[item.unit.trim()]);
        
        if (unlockedWords.length === 0) return alert("Completa lecciones en el mapa para desbloquear palabras para repasar.");
        
        this.srsQueue = [...unlockedWords].sort(() => 0.5 - Math.random()).slice(0, 10);
        
        this.renderSRSUI();
        this.nextCard();
    },

    renderSRSUI() {
        if (document.getElementById('srs-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'srs-overlay';
        overlay.className = 'srs-overlay active';
        overlay.innerHTML = `
            <button class="close-srs" onclick="DICTIONARY.closeSRS()">×</button>
            <div class="flashcard-container">
                <div class="flashcard" id="srs-card" onclick="this.classList.toggle('flipped'); DICTIONARY.playFlipSound();">
                    <!-- Frente (Pregunta) -->
                    <div class="card-face card-front">
                        <div class="fc-tag" id="srs-tag"></div>
                        <div class="fc-ask" id="srs-ask"></div>
                        <div class="fc-hint">Toca para voltear</div>
                    </div>
                    <!-- Reverso (Respuesta) -->
                    <div class="card-face card-back">
                        <div id="srs-img-container" style="margin-bottom: 10px;"></div>
                        <div class="fc-answer" id="srs-answer"></div>
                        <div id="srs-definition" style="font-size: 14px; color: var(--ink-light); margin: 8px 0; font-style: italic; max-width: 85%; line-height: 1.4;"></div>
                        <button class="word-btn" style="font-size:24px; margin-bottom: 10px" id="srs-speak" title="Escuchar">🔊</button>
                    </div>
                </div>
                
                <div class="fc-actions">
                    <button class="srs-btn btn-again" onclick="DICTIONARY.answerSRS(1)">Otra vez<small>< 1m</small></button>
                    <button class="srs-btn btn-hard" onclick="DICTIONARY.answerSRS(2)">Difícil<small>1d</small></button>
                    <button class="srs-btn btn-good" onclick="DICTIONARY.answerSRS(3)">Bien<small>3d</small></button>
                    <button class="srs-btn btn-easy" onclick="DICTIONARY.answerSRS(4)">Fácil<small>7d</small></button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    nextCard() {
        if (this.srsQueue.length === 0) {
            if (!this.isRandomReview) {
                alert("¡Repaso terminado! Ganaste 10 XP.");
                if(window.STATE) {
                    window.STATE.addXP(10);
                }
            } else {
                alert("¡Repasito terminado!");
            }
            this.closeSRS();
            return;
        }

        this.currentCard = this.srsQueue.shift();
        const cardEl = document.getElementById('srs-card');
        cardEl.classList.remove('flipped');
        
        // Actualizar UI
        document.getElementById('srs-tag').textContent = Array.isArray(this.currentCard.tags) ? this.currentCard.tags[0] : this.currentCard.tags;
        document.getElementById('srs-ask').textContent = this.currentCard.ask || this.currentCard.translation;
        document.getElementById('srs-answer').textContent = this.currentCard.answer || this.currentCard.verb;
        
        const defEl = document.getElementById('srs-definition');
        if (defEl) defEl.textContent = this.currentCard.definition || '';
        
        // Imagen en el reverso con la misma lógica que el Diccionario
        const imgContainer = document.getElementById('srs-img-container');
        const imgUrl = this.IMAGE_MAPPING[this.normalizeText(this.currentCard.verb)] || this.getEntryImage(this.currentCard);
        const fallbackIcon = this.getFallbackIcon(this.currentCard.verb, this.currentCard.tags);

        if (!imgContainer) return;
        imgContainer.innerHTML = '';

        if (imgUrl) {
            const imgEl = document.createElement('img');
            imgEl.src = imgUrl;
            imgEl.style.maxWidth = '120px';
            imgEl.style.maxHeight = '120px';
            imgEl.style.borderRadius = '12px';
            imgEl.style.border = '2px solid var(--border)';
            imgEl.style.boxShadow = 'var(--duo-shadow-border)';
            imgEl.alt = this.currentCard.verb || 'Ilustracion de vocabulario';
            imgEl.addEventListener('error', () => {
                imgContainer.innerHTML = `<div style="font-size: 60px;">${fallbackIcon}</div>`;
            });
            imgContainer.appendChild(imgEl);
        } else {
            imgContainer.innerHTML = `<div style="font-size: 60px;">${fallbackIcon}</div>`;
        }
        
        document.getElementById('srs-speak').onclick = (e) => {
            e.stopPropagation();
            this.speak(this.currentCard.answer || this.currentCard.verb);
        };
    },

    answerSRS(quality) {
        // En una app real, actualizaríamos el interval y el ease factor (algoritmo SM-2).
        // Si quality == 1 (Otra vez), lo volvemos a meter en la cola.
        if (quality === 1) {
            this.srsQueue.push(this.currentCard);
        }
        
        this.nextCard();
    },

    closeSRS() {
        const overlay = document.getElementById('srs-overlay');
        if (overlay) overlay.remove();
    }
};

document.addEventListener('DOMContentLoaded', () => DICTIONARY.init());
