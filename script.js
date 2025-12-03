let words = [];
let currentWord = '';

async function fetchWords() {
    try {
        const response = await fetch('words.json');
        words = await response.json();
        newWordButton.disabled = false;
        newWordButton.textContent = "מילה חדשה";
    } catch (error) {
        console.error('Error fetching words:', error);
        wordElement.textContent = "שגיאה בטעינת מילים";
    }
}

const newWordButton = document.getElementById('new-word-button');
const wordElement = document.getElementById('word');
newWordButton.disabled = true;
newWordButton.textContent = "טוען...";
const speechModeSelect = document.getElementById('speech-mode');
const wordContainer = document.getElementById('word-container');

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

wordContainer.addEventListener('click', () => {
    if (currentSpeechMode === 'speech-only' && wordElement.textContent !== currentWord) {
        wordElement.textContent = currentWord;
    }
});

newWordButton.addEventListener('click', generateNewWord);

function generateNewWord() {
    if (words.length === 0) {
        wordElement.textContent = "טוען מילים...";
        return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex]; // Assign to currentWord

    wordElement.textContent = ''; // Clear previous word

    if (currentSpeechMode === 'text-only') {
        wordElement.textContent = currentWord;
    } else if (currentSpeechMode === 'text-and-speech') {
        wordElement.textContent = currentWord;
        speakWord(currentWord);
    } else if (currentSpeechMode === 'speech-only') {
        // A single space is used as a placeholder. This ensures the container
        // has a height and is clickable, allowing the user to reveal the word.
        wordElement.textContent = ' ';
        speakWord(currentWord);
    }
}

fetchWords();
