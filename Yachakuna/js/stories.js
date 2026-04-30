/* js/stories.js */
const STORIES = {
    data: [],
    
    async init() {
        const filename = 'data/Historia_Atoj_Alqo_5_partes.json';
        try {
            // Usamos un parámetro de versión único para asegurar que traiga el JSON más reciente
            const response = await fetch(`${filename}?v=${Date.now()}`);
            if (!response.ok) return;

            try {
                this.data = await response.json();
            } catch (err) {
                throw new Error(`Sintaxis inválida en "${filename}":\n${err.message}`);
            }

            window.STORIES_DATA = this.data;
            
            this.renderMenu();
            if (window.DICTIONARY && window.DICTIONARY.data.length > 0) {
                window.DICTIONARY.processStoryContext();
            }
        } catch (e) {
            console.error("Error loading stories data:", e);
            throw e; // Re-lanzamos para que la UI lo capture
        }
    },
    
    renderMenu() {
        const container = document.getElementById('stories-container');
        if (!container) return;
        
        const completed = window.STATE ? window.STATE.completedStories : {};
        
        container.innerHTML = this.data.map((story, i) => {
            const isCompleted = completed[story.id];
            const previousPart = this.data.find(candidate =>
                candidate.section === story.section &&
                candidate.part === story.part - 1
            );
            // Desbloqueado si es la primera parte de su sección o si la parte anterior de esa misma historia ya fue completada
            const isUnlocked = story.part === 1 || (previousPart && completed[previousPart.id]);
            
            const cardClass = `story-card ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`;
            const onclickStr = isUnlocked ? `STORIES.playStory(${i})` : '';
            const lockIcon = !isUnlocked ? '<div style="position:absolute; bottom:10px; right:10px; font-size:16px;">🔒</div>' : '';

            // Misterio: ocultar info si está bloqueado
            const displayTitle = isUnlocked ? story.title : '???';
            const displaySubtitle = isUnlocked ? story.subtitle : 'Completa la historia anterior';
            const displayIcon = isUnlocked ? story.icon : '❓';

            return `
                <div class="${cardClass}" onclick="${onclickStr}" style="position:relative;">
                    <div class="story-icon">${displayIcon}</div>
                    <div class="story-info">
                        <h3>${displayTitle}</h3>
                        <p>${displaySubtitle}</p>
                        <div class="story-level">${isUnlocked ? story.level : 'Bloqueado'}</div>
                    </div>
                    ${lockIcon}
                </div>
            `;
        }).join('');
    },

    // Reproductor
    currentStory: null,
    currentSceneIndex: 0,
    sessionLives: 5,
    overrideCount: 5,
    speakerSides: {},

    playStory(index) {
        this.currentStory = this.data[index];
        this.currentSceneIndex = 0;
        this.sessionLives = 5;
        this.overrideCount = 5;
        this.speakerSides = {};

        if (!document.getElementById('story-player')) {
            const player = document.createElement('div');
            player.id = 'story-player';
            player.className = 'story-player';
            document.body.appendChild(player);
        }

        const player = document.getElementById('story-player');
        player.innerHTML = `
            <div class="story-player-header">
                <button class="ex-close" onclick="STORIES.closePlayer()">✖</button>
                <div class="story-progress-bar">
                    <div class="story-progress-fill" id="story-progress"></div>
                </div>
                <div id="story-lives" style="font-size: 18px; font-weight: 800; color: var(--bolivia-red); margin-left: 12px;">❤️ 5</div>
            </div>
            <div class="story-content" id="story-content"></div>
            <div class="story-footer">
                <button class="btn-primary" id="story-next-btn" onclick="STORIES.nextScene()">CONTINUAR</button>
            </div>
        `;
        
        player.classList.add('active');
        this.renderCurrentScene();
    },

    renderCurrentScene() {
        const content = document.getElementById('story-content');
        const progress = document.getElementById('story-progress');
        const nextBtn = document.getElementById('story-next-btn');
        const livesEl = document.getElementById('story-lives');
        
        progress.style.width = `${(this.currentSceneIndex / this.currentStory.scenes.length) * 100}%`;
        if (livesEl) livesEl.textContent = `❤️ ${this.sessionLives}`;

        if (this.currentSceneIndex >= this.currentStory.scenes.length) {
            this.showAlert(`¡Historia Completada! 🏆`, false, () => {
                if(window.STATE) {
                    window.STATE.addStoryXP(this.currentStory.id);
                }
                this.closePlayer();
            });
            return;
        }

        const scene = this.currentStory.scenes[this.currentSceneIndex];
        
        if (scene.type === 'text') {
            nextBtn.style.display = 'block';
            
            let alignClass = 'speaker-narrator';
            if (scene.speaker && scene.speaker !== 'narrator') {
                if (!this.speakerSides[scene.speaker]) {
                    const usedSides = Object.values(this.speakerSides);
                    this.speakerSides[scene.speaker] = usedSides.includes('speaker-left') ? 'speaker-right' : 'speaker-left';
                }
                alignClass = this.speakerSides[scene.speaker];
            }

            content.innerHTML += `
                <div class="story-bubble ${alignClass}" onclick="this.classList.toggle('translated')">
                    <div class="story-speaker-label">${scene.speaker !== 'narrator' ? scene.speaker.toUpperCase() : ''}</div>
                    <div style="cursor:pointer;" onclick="if(window.DICTIONARY) window.DICTIONARY.speak('${scene.q.replace(/'/g, "\\'")}')">
                        ${scene.q}
                    </div>
                    <div class="story-translation">${scene.e}</div>
                </div>
            `;
        } else if (scene.type === 'question') {
            nextBtn.style.display = 'none';
            const optionsHtml = scene.options.map((opt, i) => `
                <div class="ex-option" id="story-opt-${i}" onclick="STORIES.checkAnswer(${i}, ${scene.correct})">${opt}</div>
            `).join('');
            
            content.innerHTML += `
                <div class="story-bubble question-bubble">
                    <div style="font-size:14px; color:var(--blue); font-weight:900; margin-bottom:8px;">${scene.title || '¿Pitaj yachan?'}</div>
                    <div style="margin-bottom:16px; font-weight:700;">${scene.text}</div>
                    <div class="ex-options" style="grid-template-columns: 1fr;">
                        ${optionsHtml}
                    </div>
                    <div id="story-feedback" style="display:none; margin-top:12px; padding:12px; border-radius:12px; font-size:14px; font-weight:700;"></div>
                </div>
            `;
        }
        
        content.scrollTop = content.scrollHeight;
    },

    checkAnswer(selected, correct) {
        const scene = this.currentStory.scenes[this.currentSceneIndex];
        const opts = document.querySelectorAll('.question-bubble:last-child .ex-option');
        opts.forEach(opt => opt.style.pointerEvents = 'none');
        
        if (selected === correct) {
            if (typeof AUDIO !== 'undefined') AUDIO.playSuccess();
            document.getElementById(`story-opt-${selected}`).style.background = 'var(--bolivia-green)';
            document.getElementById(`story-opt-${selected}`).style.color = 'white';
            setTimeout(() => this.nextScene(), 1000);
        } else {
            if (typeof AUDIO !== 'undefined') AUDIO.playError();
            document.getElementById(`story-opt-${selected}`).style.background = 'var(--bolivia-red)';
            document.getElementById(`story-opt-${selected}`).style.color = 'white';
            document.getElementById(`story-opt-${correct}`).style.background = 'var(--bolivia-green)';
            document.getElementById(`story-opt-${correct}`).style.color = 'white';
            
            this.sessionLives--;
            const livesEl = document.getElementById('story-lives');
            if (livesEl) livesEl.textContent = `❤️ ${this.sessionLives}`;

            if(this.sessionLives <= 0) {
                this.showAlert("💔 Has perdido todas tus vidas.\n\n¡Vuelve a intentarlo!", true, () => {
                    this.closePlayer();
                });
                return;
            }

            const exp = scene.explanation || `Recuerda: la respuesta correcta es "${scene.options[correct]}"`;
            let overrideCb = null;
            if (this.overrideCount > 0) {
                overrideCb = () => {
                    this.overrideCount--;
                    this.sessionLives++; 
                    this.nextScene();
                };
            }

            this.showAlert(`❌ Mana ajinachu.\n\n${exp}`, true, () => {
                // Permitir reintento si no se usó el override
                opts.forEach(opt => opt.style.pointerEvents = 'auto');
                document.getElementById(`story-opt-${selected}`).style.background = 'white';
                document.getElementById(`story-opt-${selected}`).style.color = 'var(--ink)';
                document.getElementById(`story-opt-${correct}`).style.background = 'white';
                document.getElementById(`story-opt-${correct}`).style.color = 'var(--ink)';
            }, overrideCb, this.overrideCount);
        }
    },

    showAlert(msg, isError, callback, overrideCallback = null, overridesLeft = 0) {
        const div = document.createElement('div');
        div.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6); z-index: 5000;
            display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
            padding-bottom: 24px;
        `;
        const box = document.createElement('div');
        box.style.cssText = `
            background: var(--paper); padding: 24px; border-radius: 20px; text-align: center; width: 90%; max-width: 400px;
            border: 4px solid ${isError ? 'var(--bolivia-red)' : 'var(--bolivia-green)'};
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            animation: popIn 0.3s ease-out forwards;
        `;
        
        let overrideBtnHtml = '';
        if (overrideCallback && overridesLeft > 0) {
            overrideBtnHtml = `<button class="btn-secondary" style="margin-top: 12px; width: 100%; background: transparent; border: 2px solid var(--border); color: var(--ink); padding: 12px; font-weight: bold; border-radius: 12px; cursor: pointer;" id="story-override-btn">🏳️ Mi respuesta es correcta (${overridesLeft})</button>`;
        }
        
        box.innerHTML = `
            <p style="font-size: 18px; font-weight: 800; color: var(--ink); white-space: pre-line;">${msg}</p>
            <button class="btn-primary" style="margin-top: 16px; width: 100%; background: ${isError ? 'var(--bolivia-red)' : 'var(--bolivia-green)'}; box-shadow: 0 4px 0 ${isError ? 'darkred' : 'darkgreen'};" id="story-ok-btn">CONTINUAR</button>
            ${overrideBtnHtml}
        `;
        div.appendChild(box);
        document.getElementById('story-player').appendChild(div);
        
        document.getElementById('story-ok-btn').onclick = () => {
            div.remove();
            if (callback) callback();
        };
        
        if (overrideCallback && overridesLeft > 0) {
            document.getElementById('story-override-btn').onclick = () => {
                div.remove();
                overrideCallback();
            };
        }
    },

    nextScene() {
        this.currentSceneIndex++;
        this.renderCurrentScene();
    },

    closePlayer() {
        const player = document.getElementById('story-player');
        if (player) player.classList.remove('active');
    }
};

document.addEventListener('DOMContentLoaded', () => STORIES.init());
