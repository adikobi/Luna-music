let words = [];
let currentWord = '';

async function fetchWords() {
    try {
        const response = await fetch('words.json');
        words = await response.json();
    } catch (error) {
        console.error('Error fetching words:', error);
        wordElement.textContent = "שגיאה בטעינת מילים";
    }
}

const logo = document.getElementById('logo');
const wordElement = document.getElementById('word');
const speechModeSelect = document.getElementById('speech-mode');
const wordContainer = document.getElementById('word-container');

// A palette of beautiful pastel gradients for the dynamic background
const pastelGradients = [
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
];

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

logo.addEventListener('click', generateNewWord);

function generateNewWord() {
    if (words.length === 0) {
        wordElement.textContent = "טוען מילים...";
        return;
    }

    // Select a random gradient from the palette
    const randomGradient = pastelGradients[Math.floor(Math.random() * pastelGradients.length)];
    // Apply the new gradient to the word container's background
    wordContainer.style.background = randomGradient;

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
