document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            body.classList.toggle('no-scroll');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    const navLinksItems = document.querySelectorAll('.nav-link');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            body.classList.remove('no-scroll');

            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

function optimizeForMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        ScrollReveal().reveal('.section, .project-card, .setup-icon, .skill-pill', {
            delay: 100,
            distance: '10px',
            origin: 'bottom',
            interval: 50,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false,
            mobile: false 
        });

        const canvas = document.getElementById('ink-canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    optimizeForMobile();
});

tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                jetbrains: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                }
            }
        }
    }
}

function redirectToLivepix(amount) {
    window.location.href = `https://livepix.gg/vitor1227op?amount=${amount}`;
}

function redirectCustomAmount() {
    const customAmount = document.getElementById('customAmount').value;
    if (customAmount && customAmount > 0) {
        window.location.href = `https://livepix.gg/vitor1227op?amount=${customAmount}`;
    } else {
        alert('Por favor, insira um valor válido para doação.');
    }
}

function updateBrazilTime() {
    const options = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const now = new Date();
    const timeElement = document.getElementById('brasil-time');
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString('pt-BR', options);
    }
}

updateBrazilTime();
setInterval(updateBrazilTime, 1000);

document.querySelectorAll('.day-title').forEach(title => {
    setInterval(() => {
        const rect = title.getBoundingClientRect();
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.style.background = title.dataset.color;

        particle.style.left = (Math.random() * rect.width) + 'px';
        particle.style.top = (Math.random() * rect.height) + 'px';

        particle.style.setProperty('--x', (Math.random() - 0.5) * 50 + 'px');
        particle.style.setProperty('--y', - (Math.random() * 50 + 20) + 'px');

        title.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }, 150);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const alertBox = document.getElementById('mobile-alert');
if (alertBox) {
    document.getElementById('understand-btn').addEventListener('click', () => {
        alertBox.style.display = 'none';
    });
}