const phrases = [
    "Desenvolvedor Back End & Entusiasta de Tecnologia",
    "Streamer e Criador de Conteúdo",
    "Apaixonado por Código e Desafios",
    "Apaixonado por Jogos",
    "Sempre Aprendendo e Evoluindo"
];

const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenPhrases = 1500;

let phraseIndex = 0;
let charIndex = 0;

const textElement = document.querySelector(".console-text");

function type() {
    if (charIndex < phrases[phraseIndex].length) {
        const span = document.createElement("span");
        span.textContent = phrases[phraseIndex][charIndex];
        textElement.appendChild(span);
        span.offsetWidth;
        span.classList.add("visible");
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, delayBetweenPhrases);
    }
}

function erase() {
    if (charIndex > 0) {
        const spans = textElement.querySelectorAll("span");
        const spanToRemove = spans[charIndex - 1];
        spanToRemove.classList.remove("visible");
        setTimeout(() => {
            spanToRemove.remove();
            charIndex--;
            erase();
        }, 100);
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (phrases.length) {
        setTimeout(type, delayBetweenPhrases);
    }
});