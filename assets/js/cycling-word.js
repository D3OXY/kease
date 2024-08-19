const words = ["Speaks", "Matters", "Excites"];
const typingSpeed = 100; // Speed of typing each character in milliseconds
const eraseSpeed = 100; // Speed of erasing each character in milliseconds
const delayBetweenWords = 2000; // Delay before starting to erase
let wordIndex = 0;
let charIndex = 0;
let isErasing = false;

function typeWriter() {
    const element = document.getElementById("cycling-word");

    if (!isErasing && charIndex < words[wordIndex].length) {
        element.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else if (isErasing && charIndex > 0) {
        element.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, eraseSpeed);
    } else if (!isErasing && charIndex === words[wordIndex].length) {
        setTimeout(() => {
            isErasing = true;
            setTimeout(typeWriter, eraseSpeed);
        }, delayBetweenWords);
    } else if (isErasing && charIndex === 0) {
        isErasing = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWriter, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    typeWriter();
});
