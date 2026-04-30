/* js/achievements.js */
const ACHIEVEMENTS = {
    init() {
        // En una app real, aquí inicializaríamos Chart.js
        this.render();
    },
    
    render() {
        const container = document.getElementById('profile-stats');
        if (!container) return;
        
        const xp = window.STATE ? window.STATE.xp : 0;
        const streak = window.STATE ? window.STATE.streak : 0;
        const completedUnits = window.STATE ? Object.keys(window.STATE.unitProgress) : [];
        const completedStories = window.STATE ? Object.keys(window.STATE.completedStories) : [];
        const dailyLog = window.STATE ? window.STATE.dailyLog : {};
        
        const rank = window.STATE ? window.STATE.getRank() : { name: "🌱 Qallarej", progress: 0, needed: 100, isMaxRank: false };
        
        // Calcular trofeos de rango
        const hasPurej = xp >= 100;
        const hasYachakoj = xp >= 200;
        const hasYachachej = xp >= 900;
        const hasYachayniyoj = xp >= 1200;
        
        container.innerHTML = `
            <div class="card" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; text-align: center; background: white; border-radius: 20px; padding: 20px; box-shadow: var(--duo-shadow-border); margin-bottom: 24px;">
                <div>
                    <div style="font-size: 32px;">🔥</div>
                    <div style="font-size: 24px; font-weight: 900; color: var(--bolivia-red);">${streak} Días</div>
                    <div style="font-size: 13px; font-weight: 700; color: #8a7c64;">Racha</div>
                </div>
                <div>
                    <div style="font-size: 32px;">⚡</div>
                    <div style="font-size: 24px; font-weight: 900; color: var(--bolivia-yellow-dark);">${xp}</div>
                    <div style="font-size: 13px; font-weight: 700; color: #8a7c64;">XP Total</div>
                </div>
            </div>

            ${this.renderActivityChart(dailyLog)}
            ${this.renderTimeChart(dailyLog)}

            <div class="card" style="background: var(--ink); color: white; border-radius: 20px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <div style="font-size: 14px; font-weight: 800; text-transform: uppercase; opacity: 0.8; margin-bottom: 8px;">Rango Actual</div>
                <div style="font-size: 28px; font-weight: 900; font-family: 'Fraunces', serif;">${rank.name}</div>
                
                <div style="margin: 16px 0 8px; background: rgba(255,255,255,0.1); height: 12px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05);">
                    <div style="background: var(--bolivia-yellow); height: 100%; width: ${rank.progress}%; transition: width 0.5s ease-out;"></div>
                </div>

                <div style="font-size: 12px; opacity: 0.7;">
                    ${rank.isMaxRank ? '¡Nivel máximo alcanzado! 👑' : `Faltan ${rank.needed} XP para el próximo rango`}
                </div>
            </div>
            
            <h3 style="margin: 32px 0 16px; font-family:'Fraunces', serif;">Trofeos de Rango</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;">
                ${this.renderTrophy("🌱", "Qallarej", true)}
                ${this.renderTrophy("🌿", "Purej", hasPurej)}
                ${this.renderTrophy("🔥", "Yachakoj", hasYachakoj)}
                ${this.renderTrophy("⭐", "Yachachej", hasYachachej)}
                ${this.renderTrophy("👑", "Yachayniyoj", hasYachayniyoj)}
            </div>

            <h3 style="margin: 32px 0 16px; font-family:'Fraunces', serif;">Historias y Desafíos</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                ${this.renderTrophy("🦊", "Atoj", completedStories.some(id => id.includes('atoj')))}
                ${this.renderTrophy("☀️", "Inti", completedStories.some(id => id.includes('inti')))}
                ${this.renderTrophy("🏛️", "Maestro", completedUnits.length >= 45)}
            </div>
        `;
    },

    renderActivityChart(log) {
        const days = [];
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            // Obtener inicial del día (L, M, M, J, V, S, D)
            const dayLabel = d.toLocaleDateString('es-ES', { weekday: 'short' }).charAt(0).toUpperCase();
            days.push({
                label: dayLabel,
                xp: (log[dateStr] && log[dateStr].xp) || 0
            });
        }

        const maxXP = Math.max(...days.map(d => d.xp), 1);

        return `
            <div class="card" style="background: var(--paper); border-radius: 20px; padding: 20px; box-shadow: var(--duo-shadow-border); margin-bottom: 24px;">
                <h3 style="margin-top: 0; font-family: 'Fraunces', serif; font-size: 18px; margin-bottom: 20px; color: var(--ink);">Actividad Semanal</h3>
                <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 100px; padding: 0 5px;">
                    ${days.map(day => {
                        const height = (day.xp / maxXP) * 70; // 70px de altura máxima
                        return `
                            <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                                <div style="width: 24px; background: ${day.xp > 0 ? 'var(--blue)' : 'var(--border)'}; height: ${Math.max(4, height)}px; border-radius: 6px; transition: height 0.5s ease-out; position: relative;">
                                    ${day.xp > 0 ? `<div style="position: absolute; top: -22px; left: 50%; transform: translateX(-50%); font-size: 10px; font-weight: 900; color: var(--blue);">${day.xp}</div>` : ''}
                                </div>
                                <div style="margin-top: 10px; font-size: 11px; font-weight: 800; color: var(--ink-light);">${day.label}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    renderTimeChart(log) {
        const days = [];
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayLabel = d.toLocaleDateString('es-ES', { weekday: 'short' }).charAt(0).toUpperCase();
            
            const timeMs = (log[dateStr] && log[dateStr].timeMs) || 0;
            const minutes = Math.floor(timeMs / 60000); // Convertir ms a minutos
            
            days.push({
                label: dayLabel,
                val: minutes
            });
        }

        const maxVal = Math.max(...days.map(d => d.val), 1);

        return `
            <div class="card" style="background: var(--paper); border-radius: 20px; padding: 20px; box-shadow: var(--duo-shadow-border); margin-bottom: 24px;">
                <h3 style="margin-top: 0; font-family: 'Fraunces', serif; font-size: 18px; margin-bottom: 20px; color: var(--ink);">Tiempo de Estudio (Minutos)</h3>
                <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 100px; padding: 0 5px;">
                    ${days.map(day => {
                        const height = (day.val / maxVal) * 70; // 70px altura máx
                        return `
                            <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                                <div style="width: 24px; background: ${day.val > 0 ? 'var(--bolivia-green)' : 'var(--border)'}; height: ${Math.max(4, height)}px; border-radius: 6px; transition: height 0.5s ease-out; position: relative;">
                                    ${day.val > 0 ? `<div style="position: absolute; top: -22px; left: 50%; transform: translateX(-50%); font-size: 10px; font-weight: 900; color: var(--bolivia-green);">${day.val}m</div>` : ''}
                                </div>
                                <div style="margin-top: 10px; font-size: 11px; font-weight: 800; color: var(--ink-light);">${day.label}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    renderTrophy(icon, title, unlocked) {
        return `
            <div style="background: ${unlocked ? 'white' : 'var(--paper)'}; border: 3px solid ${unlocked ? 'var(--bolivia-yellow)' : 'var(--border)'}; border-radius: 20px; padding: 16px 8px; text-align: center; transition: all 0.3s; ${unlocked ? 'box-shadow: 0 8px 0 var(--bolivia-yellow-dark);' : 'opacity: 0.5; filter: grayscale(1);'}">
                <div style="font-size: 36px; margin-bottom: 8px;">${icon}</div>
                <div style="font-size: 12px; font-weight: 800; color: var(--ink);">${title}</div>
                <div style="font-size: 10px; color: ${unlocked ? 'var(--bolivia-green)' : '#999'}; font-weight: 700; margin-top: 4px;">${unlocked ? 'LISTO' : 'BLOQUEADO'}</div>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => ACHIEVEMENTS.init());
