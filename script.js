// Lluvia de corazones
function createHearts() {
    const container = document.getElementById('hearts-container');
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.fontSize = (Math.random() * 30 + 10) + 'px';
        container.appendChild(heart);
    }
}

// ===== REPRODUCTOR DE MÚSICA =====
const audio = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const closePlayerBtn = document.getElementById('closePlayerBtn');
const openPlayerBtn = document.getElementById('openPlayerBtn');
const playIcon = document.getElementById('playIcon');
const muteIcon = document.getElementById('muteIcon');
const musicPlayer = document.getElementById('music-player');

let isPlaying = true;
let isMuted = false;

audio.loop = true;

function initMusic() {
    audio.play()
        .then(() => {
            console.log('Música iniciada automáticamente');
            isPlaying = true;
            if (playIcon) playIcon.textContent = '⏸';
        })
        .catch(error => {
            console.log('No se pudo iniciar automáticamente. Esperando interacción...');
            document.body.addEventListener('click', function startMusicOnClick() {
                audio.play()
                    .then(() => {
                        isPlaying = true;
                        if (playIcon) playIcon.textContent = '⏸';
                    })
                    .catch(e => console.log('Error al reproducir:', e));
                document.body.removeEventListener('click', startMusicOnClick);
            }, { once: true });
        });
}

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playIcon.textContent = '▶';
        } else {
            audio.play()
                .then(() => {
                    playIcon.textContent = '⏸';
                })
                .catch(e => console.log('Error al reproducir:', e));
        }
        isPlaying = !isPlaying;
    });
}

if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        audio.muted = !isMuted;
        muteIcon.textContent = isMuted ? '🔊' : '🔇';
        isMuted = !isMuted;
    });
}

if (closePlayerBtn) {
    closePlayerBtn.addEventListener('click', () => {
        musicPlayer.classList.add('hidden');
        openPlayerBtn.classList.remove('hidden');
    });
}

if (openPlayerBtn) {
    openPlayerBtn.addEventListener('click', () => {
        musicPlayer.classList.remove('hidden');
        openPlayerBtn.classList.add('hidden');
    });
}

// ===== CARRUSEL DE FOTOS =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.querySelector('.carousel-dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('span');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dotsContainer.appendChild(dot);
    }
}

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (!slides.length) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide--;
        showSlide(currentSlide);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        showSlide(currentSlide);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

if (slides.length > 0) {
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// Animaciones al hacer scroll
function checkFadeIn() {
    const elements = document.querySelectorAll('.fade-in, .message-card, .extra-message');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('load', () => {
    createHearts();
    checkFadeIn();
    initMusic();
});

window.addEventListener('scroll', checkFadeIn);