ScrollReveal().reveal('.section, .project-card, .setup-icon, .skill-pill', {
    delay: 200,
    distance: '20px',
    origin: 'bottom',
    interval: 100,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('nav');

function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const scrollPos = window.scrollY + header.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-pink-500', 'font-bold');
            link.classList.remove('text-white');
        } else {
            link.classList.remove('text-pink-500', 'font-bold');
            link.classList.add('text-white');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);


const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .project-card, .card-glass').forEach(el => {
    observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;

        if (sectionTop < window.innerHeight - sectionHeight * 0.2) {
            section.classList.add('visible');
        }
    });
});