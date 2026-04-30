/* js/guide.js */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('guide-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="card">
            <h3 style="color: var(--bolivia-green-dark); margin-bottom: 8px;">Cómo instalar la App</h3>
            <p style="font-size: 14px; line-height: 1.5; color: var(--ink);">
                <strong>Android / iOS:</strong> Toca los tres puntos del navegador y selecciona "Añadir a la pantalla de inicio". <br><br>
                <strong>PC:</strong> Haz clic en el ícono de instalación en la barra de direcciones de Chrome.
            </p>
        </div>
        
        <div class="card">
            <h3 style="color: var(--bolivia-green-dark); margin-bottom: 8px;">Voz en Quechua</h3>
            <p style="font-size: 14px; line-height: 1.5; color: var(--ink);">
                La aplicación utiliza la síntesis de voz de tu dispositivo. Para que suene mejor, asegúrate de tener instalada la voz <strong>Español (Perú)</strong> en los ajustes de Accesibilidad/Texto a voz de tu teléfono o computadora.
            </p>
        </div>
    `;
});
