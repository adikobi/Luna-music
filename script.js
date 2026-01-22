let words = [];
let currentWord = '';
let currentMode = 'read-and-word'; // read-only, word-only, read-and-word

const logoButton = document.getElementById('logo-button');
const speechButton = document.getElementById('speech-button');
const wordElement = document.getElementById('word');
const speechMenu = document.getElementById('speech-menu');
const readOnlyButton = document.getElementById('read-only-button');
const wordOnlyButton = document.getElementById('word-only-button');
const readAndWordButton = document.getElementById('read-and-word-button');
const currentScoreElement = document.getElementById('current-score');
const highScoreElement = document.getElementById('high-score');
const successButton = document.getElementById('success-button');

let score = 0;
let highScore = localStorage.getItem('luna-high-score') || 0;

async function fetchWords() {
    try {
        const response = await fetch('words.json');
        words = await response.json();
        logoButton.disabled = false;
        generateNewWord(); // Generate the first word on load
    } catch (error) {
        console.error('Error fetching words:', error);
        wordElement.textContent = "שגיאה בטעינת מילים";
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`המילה היא: ${text}`);
        utterance.lang = 'he-IL';
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Speech synthesis not supported');
    }
}

function updateScoreUI() {
    currentScoreElement.textContent = score;
    highScoreElement.textContent = highScore;
}

function updateUI() {
    window.speechSynthesis.cancel();
    successButton.classList.add('hidden'); // Default hidden

    switch (currentMode) {
        case 'read-only':
            wordElement.textContent = '';
            speak(currentWord);
            break;
        case 'word-only':
            wordElement.textContent = currentWord;
            successButton.classList.remove('hidden');
            break;
        case 'read-and-word':
            wordElement.textContent = currentWord;
            speak(currentWord);
            successButton.classList.remove('hidden');
            break;
    }
}

function generateNewWord() {
    if (words.length === 0) {
        wordElement.textContent = "טוען...";
        return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    updateUI();
}

speechButton.addEventListener('click', () => {
    speechMenu.classList.toggle('hidden');
});

readOnlyButton.addEventListener('click', () => {
    currentMode = 'read-only';
    speechMenu.classList.add('hidden');
    updateUI();
});

wordOnlyButton.addEventListener('click', () => {
    currentMode = 'word-only';
    speechMenu.classList.add('hidden');
    updateUI();
});

readAndWordButton.addEventListener('click', () => {
    currentMode = 'read-and-word';
    speechMenu.classList.add('hidden');
    updateUI();
});

logoButton.addEventListener('click', generateNewWord);

document.getElementById('word-container').addEventListener('click', () => {
    if (currentMode === 'read-only') {
        wordElement.textContent = currentWord;
        successButton.classList.remove('hidden');
    }
});

successButton.addEventListener('click', (e) => {
    score++;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('luna-high-score', highScore);
    }
    updateScoreUI();
    createConfetti(e.clientX, e.clientY);

    // Delay slightly to let animation start before switching? No, immediate is snappier.
    generateNewWord();
});

// Reset score on skip
logoButton.addEventListener('click', () => {
    score = 0;
    updateScoreUI();
});

function createConfetti(x, y) {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        const colors = ['#ceff1a', '#1a8cff', '#ff0055', '#ffd700'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 10;
        const tx = Math.cos(angle) * velocity * 20;
        const ty = Math.sin(angle) * velocity * 20;

        confetti.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0, .9, .57, 1)',
        }).onfinish = () => confetti.remove();
    }
}


// Initial setup
logoButton.disabled = true;
updateScoreUI();
fetchWords();
