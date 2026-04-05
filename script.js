// Actualizar el contador cada segundo
function updateCountdown() {
  const eventDate = new Date('2026-05-23T21:30:00').getTime();
  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.getElementById('countdown-days').textContent = '0';
    document.getElementById('countdown-hours').textContent = '0';
    document.getElementById('countdown-minutes').textContent = '0';
    document.getElementById('countdown-seconds').textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('countdown-days').textContent = days;
  document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
}

// Prevenir reproducción paralela de canciones en Spotify
let spotifyIsPlaying = false;

// Detectar cambios de reproducción en Spotify
window.addEventListener('message', function(event) {
  // Spotify usa message events para comunicarse
  if (event.data && event.data.type === 'PLAYER_STATE_CHANGED') {
    spotifyIsPlaying = event.data.isPlaying;
  }
});

// Observador de cambios en DOM para iframes de Spotify
const spotifyObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    // Si hay múltiples iframes de Spotify, asegurar que solo uno está activo
    const spotifyIframes = document.querySelectorAll('iframe[src*="spotify.com"]');
    if (spotifyIframes.length > 1) {
      // Mantener solo el primer reproductor activo
      spotifyIframes.forEach((iframe, index) => {
        if (index > 0) {
          iframe.style.display = 'none';
        }
      });
    }
  });
});

// Configurar observador
spotifyObserver.observe(document.body, {
  childList: true,
  subtree: true
});

// Sugerir canción abre Spotify
function suggestMusic() {
  window.open('https://open.spotify.com/playlist/23H2zC2Snq8hGKEWyxKGzJ?si=WdoH7rt7RQeto15lMBVA2g', '_blank');
}

// Crear efecto de brillo al hacer scroll a la primera sección
const observerOptions = {
  threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.id === 'screen-invitation') {
      // Pantalla de invitación visible
    }
  });
}, observerOptions);

// Observar la pantalla de invitación
observer.observe(document.getElementById('screen-invitation'));

// Inicializar el contador
updateCountdown();
setInterval(updateCountdown, 1000);

// Intentar reproducir cuando el usuario hace clic en cualquier lugar
document.addEventListener('click', function() {
  // El reproductor de Spotify se manejará automáticamente
  // Spotify requiere interacción del usuario para autoplay
}, { once: true });

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
