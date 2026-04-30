/* js/audio.js */
const AUDIO = {
    playNote(freq, startTime, duration, type = 'sine', volume = 0.1) {
        if (window.STATE && !window.STATE.soundsEnabled) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
            gain.gain.setValueAtTime(volume, ctx.currentTime + startTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + startTime);
            osc.stop(ctx.currentTime + startTime + duration);
        } catch(e) { console.error("Audio error", e); }
    },

    playSuccess() {
        this.playNote(523.25, 0, 0.4); // C5
        this.playNote(659.25, 0.1, 0.5); // E5
    },

    playError() {
        this.playNote(220, 0, 0.3, 'triangle'); // A3
        this.playNote(164.81, 0.1, 0.4, 'triangle'); // E3
    },

    playPop() {
        if (window.STATE && !window.STATE.soundsEnabled) return;
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

    playFlip() {
        if (window.STATE && !window.STATE.soundsEnabled) return;
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

    playLevelUp() {
        // Secuencia triunfal: Do4, Sol4, Do5
        this.playNote(261.63, 0, 0.2, 'sine', 0.15); // C4
        this.playNote(392.00, 0.15, 0.2, 'sine', 0.15); // G4
        this.playNote(523.25, 0.3, 0.5, 'sine', 0.15); // C5
    },

    playBadge() {
        // Sonido de "brillo" para insignias: secuencia rápida de notas altas
        this.playNote(880.00, 0, 0.1, 'sine', 0.1); // A5
        this.playNote(1046.50, 0.05, 0.1, 'sine', 0.1); // C6
        this.playNote(1318.51, 0.1, 0.3, 'sine', 0.1); // E6
    },

    playFanfare() {
        // Arpegio festivo extendido (Do5 - Mi5 - Sol5 - Do6)
        this.playNote(523.25, 0, 0.15);   // C5
        this.playNote(659.25, 0.1, 0.15); // E5
        this.playNote(783.99, 0.2, 0.15); // G5
        this.playNote(1046.50, 0.3, 0.4); // C6
    },

    playTick() {
        // Sonido muy corto y seco para navegación
        if (window.STATE && !window.STATE.soundsEnabled) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(); osc.stop(ctx.currentTime + 0.05);
        } catch(e) {}
    }
};