/* js/state.js */
const STATE = {
    // Variables en memoria y sincronizadas
    xp: 0,
    streak: 0,
    bestStreak: 0,
    lastPracticeDate: null,
    unitProgress: {},
    perfectUnits: {},
    completedStories: {},
    totalAttempts: 0,
    correctAttempts: 0,
    studyTimeMs: 0,
    recentMistakes: [],
    dailyLog: {},
    srsCount: 0,
    searchCount: 0,
    forumPosted: false,
    notifiedAchievements: [],
    completedRuwayChallenges: [],
    pinnedUnits: [],
    customEmojis: {},
    soundsEnabled: true,
    theme: 'light',
    lastRank: null,

    // Solo RAM (se restaura por sesión)
    lives: 3,

    init() {
        this.load();
        this.checkStreak();
        this.updateUI();
    },

    load() {
        const mappings = {
            'rimay_XP': 'xp',
            'rimay_StreakDays': 'streak',
            'rimay_BestStreak': 'bestStreak',
            'rimay_LastPractice': 'lastPracticeDate',
            'rimay_Progress': 'unitProgress',
            'rimay_Perfect': 'perfectUnits',
            'rimay_CompletedStories': 'completedStories',
            'rimay_Attempts': 'attemptsObj', // Objeto {total, correct}
            'rimay_Time': 'studyTimeMs',
            'rimay_RecentMistakes': 'recentMistakes',
            'rimay_DailyLog': 'dailyLog',
            'rimay_SRSCount': 'srsCount',
            'rimay_SearchCount': 'searchCount',
            'rimay_ForumPosted': 'forumPosted',
            'rimay_NotifiedAch': 'notifiedAchievements',
            'rimay_PinnedUnits': 'pinnedUnits',
            'rimay_RuwayChallenges': 'completedRuwayChallenges',
            'rimay_CustomEmojis': 'customEmojis',
            'rimay_SoundsEnabled': 'soundsEnabled',
            'rimay_Theme': 'theme',
            'rimay_LastRank': 'lastRank'
        };

        for (let key in mappings) {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                try {
                    const val = JSON.parse(saved);
                    if (key === 'rimay_Attempts') {
                        this.totalAttempts = val.total || 0;
                        this.correctAttempts = val.correct || 0;
                    } else {
                        this[mappings[key]] = val;
                    }
                } catch(e) {
                    // Fallback para valores no JSON (como strings simples o números)
                    this[mappings[key]] = saved;
                }
            }
        }
    },

    save() {
        localStorage.setItem('rimay_XP', JSON.stringify(this.xp));
        localStorage.setItem('rimay_StreakDays', JSON.stringify(this.streak));
        localStorage.setItem('rimay_BestStreak', JSON.stringify(this.bestStreak));
        localStorage.setItem('rimay_LastPractice', JSON.stringify(this.lastPracticeDate));
        localStorage.setItem('rimay_Progress', JSON.stringify(this.unitProgress));
        localStorage.setItem('rimay_Perfect', JSON.stringify(this.perfectUnits));
        localStorage.setItem('rimay_CompletedStories', JSON.stringify(this.completedStories));
        localStorage.setItem('rimay_Attempts', JSON.stringify({ total: this.totalAttempts, correct: this.correctAttempts }));
        localStorage.setItem('rimay_Time', JSON.stringify(this.studyTimeMs));
        localStorage.setItem('rimay_RecentMistakes', JSON.stringify(this.recentMistakes));
        localStorage.setItem('rimay_DailyLog', JSON.stringify(this.dailyLog));
        localStorage.setItem('rimay_SRSCount', JSON.stringify(this.srsCount));
        localStorage.setItem('rimay_SearchCount', JSON.stringify(this.searchCount));
        localStorage.setItem('rimay_ForumPosted', JSON.stringify(this.forumPosted));
        localStorage.setItem('rimay_NotifiedAch', JSON.stringify(this.notifiedAchievements));
        localStorage.setItem('rimay_PinnedUnits', JSON.stringify(this.pinnedUnits));
        localStorage.setItem('rimay_RuwayChallenges', JSON.stringify(this.completedRuwayChallenges));
        localStorage.setItem('rimay_CustomEmojis', JSON.stringify(this.customEmojis));
        localStorage.setItem('rimay_SoundsEnabled', JSON.stringify(this.soundsEnabled));
        localStorage.setItem('rimay_Theme', JSON.stringify(this.theme));
        localStorage.setItem('rimay_LastRank', JSON.stringify(this.lastRank));
        
        this.updateUI();
    },

    updateUI() {
        const streakEl = document.getElementById('streak-counter');
        if(streakEl) streakEl.textContent = this.streak;
        
        const soundBtn = document.getElementById('toggle-sounds-btn');
        if (soundBtn) {
            soundBtn.textContent = this.soundsEnabled ? '🔊 Activados' : '🔇 Desactivados';
            soundBtn.classList.toggle('active', this.soundsEnabled);
            soundBtn.classList.toggle('muted', !this.soundsEnabled);
        }

        const themeBtn = document.getElementById('toggle-theme-btn');
        if (themeBtn) {
            themeBtn.textContent = this.theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Luz';
        }

        document.body.className = this.theme + '-mode';

        if (typeof ACHIEVEMENTS !== 'undefined') ACHIEVEMENTS.render();
        if (typeof PATH !== 'undefined') PATH.render();
        if (typeof STORIES !== 'undefined') STORIES.renderMenu();
        if (typeof DICTIONARY !== 'undefined') DICTIONARY.render();
    },

    // --- Lógica de XP ---
    addXP(amount) {
        this.xp += amount;
        this.logDailyXP(amount);
        this.save();
    },

    toggleSounds() {
        this.soundsEnabled = !this.soundsEnabled;
        this.save();
    },

    setCustomEmoji(word, emoji) {
        if (!emoji || emoji.trim() === '') {
            delete this.customEmojis[word.toLowerCase()];
        } else {
            this.customEmojis[word.toLowerCase()] = emoji.trim();
        }
        this.save();
    },

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.save();
    },

    // --- Lógica de Tiempo ---
    updateStudyTime(seconds) {
        this.studyTimeMs += (seconds * 1000);
        this.logDailyTime(seconds);
        const totalSeconds = Math.floor(this.studyTimeMs / 1000);
        const min = Math.floor(totalSeconds / 60);
        const sec = Math.floor(totalSeconds % 60);
        
        const timerEl = document.getElementById('study-time');
        if (timerEl) {
            timerEl.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        }
        
        // Guardar automáticamente cada minuto de actividad real acumulada
        if (totalSeconds > 0 && totalSeconds % 60 === 0) this.save();
    },

    logDailyTime(seconds) {
        const today = new Date().toISOString().split('T')[0];
        if (!this.dailyLog[today]) {
            this.dailyLog[today] = { xp: 0, timeMs: 0 };
        }
        this.dailyLog[today].timeMs += (seconds * 1000);
    },

    saveTimeOnly() {
        this.save();
    },

    addRuwayXP(sentence) {
        if (this.completedRuwayChallenges.includes(sentence)) return false;
        this.completedRuwayChallenges.push(sentence);
        this.addXP(15);
        return true;
    },

    addStoryXP(storyId) {
        let amount = 15;
        if (this.completedStories[storyId]) {
            amount = 5;
        } else {
            this.completedStories[storyId] = true;
        }
        this.addXP(amount);
    },

    logDailyXP(amount) {
        const today = new Date().toISOString().split('T')[0];
        if (!this.dailyLog[today]) {
            this.dailyLog[today] = { xp: 0, timeMs: 0 };
        }
        // Bug fix: guardamos el XP GANADO el día, no el total
        this.dailyLog[today].xp += amount;
    },

    // --- Lógica de Racha ---
    checkStreak() {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (this.lastPracticeDate === null) {
            this.streak = 0;
        } else if (this.lastPracticeDate !== today && this.lastPracticeDate !== yesterday) {
            this.streak = 0;
        }
    },

    recordPractice() {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (this.lastPracticeDate === yesterday) {
            this.streak++;
        } else if (this.lastPracticeDate !== today) {
            this.streak = 1;
        }

        this.lastPracticeDate = today;
        if (this.streak > this.bestStreak) {
            this.bestStreak = this.streak;
        }
        this.save();
    },

    // --- Rangos Unificados ---
    getRank() {
        const xp = this.xp;
        const thresholds = [
            { name: "🌱 Qallarej", min: 0, max: 100 },
            { name: "🌿 Purej", min: 100, max: 200 },
            { name: "🔥 Yachakoj", min: 200, max: 900 },
            { name: "⭐ Yachachej", min: 900, max: 1200 },
            { name: "👑 Yachayniyoj", min: 1200, max: Infinity }
        ];

        let current = thresholds.find(t => xp < t.max) || thresholds[thresholds.length - 1];
        const isMaxRank = current.max === Infinity;
        const progress = isMaxRank ? 100 : ((xp - current.min) / (current.max - current.min)) * 100;
        const needed = isMaxRank ? 0 : current.max - xp;

        return {
            name: current.name,
            progress: progress,
            needed: needed,
            isMaxRank: isMaxRank
        };
    }
};

document.addEventListener('DOMContentLoaded', () => STATE.init());
window.STATE = STATE;
