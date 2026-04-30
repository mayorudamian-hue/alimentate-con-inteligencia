/* js/app.js */
document.addEventListener('DOMContentLoaded', () => {
    // Timer Logic
    let isTabActive = true;
    document.addEventListener("visibilitychange", () => {
        isTabActive = !document.hidden;
    });

    setInterval(() => {
        if (isTabActive && typeof STATE !== 'undefined') {
            STATE.updateStudyTime(1);
        }
    }, 1000);

    // Auto-save time on exit
    window.addEventListener('beforeunload', () => {
        if (typeof STATE !== 'undefined') STATE.saveTimeOnly();
    });

    // Nav Logic
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.view-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            const currentSection = document.querySelector('.view-section.active');

            if (targetSection === currentSection) return;

            // Actualizar botones de navegación inmediatamente
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Efecto de desvanecimiento coordinado
            if (currentSection) {
                currentSection.classList.remove('active');
                // Pequeño retardo para asegurar que el navegador registre el cambio de clase antes de la animación de entrada
                requestAnimationFrame(() => {
                    sections.forEach(s => s.classList.remove('active'));
                    targetSection.classList.add('active');
                    
                    if (targetId === 'tab-profile') {
                        renderBadges();
                        handleRankUpSound();
                    }

                    targetSection.offsetHeight; // Forzar reflujo para disparar la animación de entrada
                });
            } else {
                targetSection.classList.add('active');
                if (targetId === 'tab-profile') {
                    renderBadges();
                    handleRankUpSound();
                }
            }
        });
    });

    function handleRankUpSound() {
        if (typeof STATE !== 'undefined' && typeof AUDIO !== 'undefined') {
            const currentRank = STATE.getRank().name;
            // Solo suena si ya teníamos un rango previo guardado y es distinto al actual
            if (STATE.lastRank !== null && STATE.lastRank !== currentRank) {
                AUDIO.playLevelUp();
            }
            STATE.lastRank = currentRank;
            STATE.save(); // Persistimos el nuevo rango visto
        }
    }

    // Lógica de Filtros del Diccionario
    const filterChips = document.querySelectorAll('#dict-filter-chips .chip');
    const searchInput = document.getElementById('dict-search');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const searchBtn = document.getElementById('search-btn');
    const randomRepasitoBtn = document.getElementById('random-repasito-btn');
    const toggleSoundsBtn = document.getElementById('toggle-sounds-btn');
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');
    const refreshDataBtn = document.getElementById('refresh-data-btn');
    const exportProgressBtn = document.getElementById('export-progress-btn');
    const importProgressBtn = document.getElementById('import-progress-btn');
    const importFileInput = document.getElementById('import-file-input');

    if (randomRepasitoBtn) {
        randomRepasitoBtn.addEventListener('click', () => {
            if (typeof DICTIONARY !== 'undefined') DICTIONARY.startRandomReview();
        });
    }

    if (toggleSoundsBtn) {
        toggleSoundsBtn.addEventListener('click', () => {
            if (typeof STATE !== 'undefined') STATE.toggleSounds();
        });
    }

    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', () => {
            if (typeof STATE !== 'undefined') STATE.toggleTheme();
        });
    }

    if (refreshDataBtn) {
        refreshDataBtn.addEventListener('click', () => refreshAllData());
    }

    if (exportProgressBtn) {
        exportProgressBtn.addEventListener('click', () => exportProgress());
    }

    if (importProgressBtn && importFileInput) {
        importProgressBtn.addEventListener('click', () => importFileInput.click());
        importFileInput.addEventListener('change', importProgress);
    }

    if (searchInput && clearSearchBtn) {
        // Mostrar/ocultar botón X según el texto escrito
        searchInput.addEventListener('input', () => {
            clearSearchBtn.style.display = searchInput.value.length > 0 ? 'block' : 'none';
        });

        // Acción de limpiar
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            searchInput.focus();
            // Disparar evento input para que el diccionario se actualice (render)
            searchInput.dispatchEvent(new Event('input'));
            
            // Resetear chips activos al limpiar
            filterChips.forEach(c => c.classList.remove('active'));
            const allChip = document.querySelector('#dict-filter-chips .chip[data-filter="all"]');
            if (allChip) allChip.classList.add('active');
        });
    }

    // Animación de sacudida si no hay resultados en la búsqueda
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const countEl = document.getElementById('dict-results-count');
            const resultsText = countEl ? countEl.textContent : "";
            // Extraer número del texto "(0)"
            const match = resultsText.match(/\d+/);
            const count = match ? parseInt(match[0]) : 0;

            if (searchInput.value.trim() !== "" && count === 0) {
                searchBtn.classList.add('shake');
                if (typeof AUDIO !== 'undefined') AUDIO.playError();
                setTimeout(() => searchBtn.classList.remove('shake'), 500);
            }
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            const filter = chip.getAttribute('data-filter');
            
            if (searchInput && searchBtn) {
                if (filter === 'all') {
                    searchInput.value = '';
                } else {
                    searchInput.value = filter;
                }
                if (clearSearchBtn) clearSearchBtn.style.display = searchInput.value.length > 0 ? 'block' : 'none';
                searchBtn.click(); // Simula el click en buscar con el nuevo término
                // Asegurar que el diccionario se renderice con el filtro del chip
                searchInput.dispatchEvent(new Event('input'));
            }
        });
    });

    // Stars Canvas Animation
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars = [];
    for(let i=0; i<50; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            star.y -= star.speed;
            if(star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animate);
    }
    animate();
});

/* Función global para sincronizar datos JSON sin recargar la página */
async function refreshAllData() {
    const btn = document.getElementById('refresh-data-btn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = '⌛...';
    }
    
    if (typeof AUDIO !== 'undefined') AUDIO.playPop();

    try {
        // Limpiar la caché de almacenamiento (Cache API) si existe para forzar descarga fresca
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            for (let name of cacheNames) {
                await caches.delete(name);
            }
        }

        // Recargar Diccionario (esto internamente reinicia el Mapa/PATH y los contextos)
        await DICTIONARY.init();
        // Recargar Historias
        await STORIES.init();
        
        alert("✅ ¡Contenido actualizado con éxito!");
    } catch (e) {
        console.error("Error al sincronizar:", e);
        // Mostramos el mensaje detallado del error atrapado
        alert(`❌ Error al actualizar el contenido:\n\n${e.message}\n\nVerifica que el archivo no tenga errores de formato (comas, llaves, etc).`);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = '🔄 Actualizar';
        }
    }
}

/* Función para exportar el progreso actual a un archivo JSON de respaldo */
function exportProgress() {
    // Sincronizar el estado de la RAM al localStorage antes de la copia
    if (window.STATE) window.STATE.save();
    
    if (typeof AUDIO !== 'undefined') AUDIO.playPop();

    const backup = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('rimay_')) {
            backup[key] = localStorage.getItem(key);
        }
    }

    if (Object.keys(backup).length === 0) {
        alert("No se encontró progreso guardado para exportar.");
        return;
    }

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().split('T')[0];

    const a = document.createElement('a');
    a.href = url;
    a.download = `yachakuna_progreso_${date}.json`;
    a.click();
    
    // Limpieza
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

/* Función para importar el progreso desde un archivo JSON */
function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (typeof AUDIO !== 'undefined') AUDIO.playPop();

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Validación mínima: ¿Tiene llaves de rimay_?
            const keys = Object.keys(data);
            const hasRimayKeys = keys.some(k => k.startsWith('rimay_'));

            if (!hasRimayKeys) {
                throw new Error("El archivo no parece ser un respaldo válido de Yachakuna.");
            }

            if (confirm("⚠️ Al importar se sobrescribirá tu progreso actual por el contenido del archivo. ¿Deseas continuar?")) {
                // Limpiar entradas previas de la app para evitar conflictos
                for (let i = localStorage.length - 1; i >= 0; i--) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('rimay_')) {
                        localStorage.removeItem(key);
                    }
                }

                // Insertar nuevos datos
                keys.forEach(key => {
                    if (key.startsWith('rimay_')) {
                        localStorage.setItem(key, data[key]);
                    }
                });

                alert("✅ Progreso restaurado con éxito. La aplicación se reiniciará.");
                window.location.reload();
            }
        } catch (err) {
            console.error("Error al importar:", err);
            alert("❌ Error al importar el archivo: " + err.message);
        }
        // Limpiar el input para permitir re-importar el mismo archivo si se desea
        event.target.value = '';
    };
    reader.readAsText(file);
}

/* Función para renderizar las insignias en el perfil */
function renderBadges() {
    const container = document.getElementById('badges-container');
    if (!container || !window.STATE || !window.STATE.badges) return;
    
    container.innerHTML = '';
    
    const shareBadges = {
        'share_1': { icon: '📢', name: 'Primer Eco' },
        'share_5': { icon: '🏔️', name: 'Vocero de los Andes' },
        'share_15': { icon: '👑', name: 'Gran Amauta Digital' }
    };
    
    Object.keys(window.STATE.badges).forEach(id => {
        const data = shareBadges[id];
        if (!data) return; 
        
        const badgeEl = document.createElement('div');
        badgeEl.className = 'badge-item';
        badgeEl.title = `${data.name}: Desbloqueada por compartir logros.`;
        badgeEl.innerHTML = `<span class="badge-icon">${data.icon}</span>`;
        container.appendChild(badgeEl);
    });
}
