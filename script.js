let words = [];

async function fetchWords() {
    try {
        const response = await fetch('words.json');
        words = await response.json();
        startButton.disabled = false;
        startButton.textContent = "התחל משחק";
    } catch (error) {
        console.error('Error fetching words:', error);
        wordElement.textContent = "שגיאה בטעינת מילים";
    }
}

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-button');
startButton.disabled = true;
startButton.textContent = "טוען...";
const newWordButton = document.getElementById('new-word-button');
const wordElement = document.getElementById('word');
const speechModeSelect = document.getElementById('speech-mode');

let currentSpeechMode = 'text-only';

speechModeSelect.addEventListener('change', (e) => {
    currentSpeechMode = e.target.value;
});

function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`המילה היא: ${word}`);
        utterance.lang = 'he-IL';
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Speech Synthesis not supported');
    }
}

startButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    generateNewWord();
});

newWordButton.addEventListener('click', generateNewWord);

function generateNewWord() {
    if (words.length === 0) {
        wordElement.textContent = "טוען מילים...";
        return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex];

    wordElement.textContent = '';

    if (currentSpeechMode === 'text-only' || currentSpeechMode === 'text-and-speech') {
        wordElement.textContent = newWord;
    }

    if (currentSpeechMode === 'speech-only' || currentSpeechMode === 'text-and-speech') {
        speakWord(newWord);
    }
}

fetchWords();
