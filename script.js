let words = [];
let currentWord = '';

const logoButton = document.getElementById('logo-button');
const speechButton = document.getElementById('speech-button');
const wordElement = document.getElementById('word');

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

function generateNewWord() {
    if (words.length === 0) {
        wordElement.textContent = "טוען...";
        return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    wordElement.textContent = currentWord;
}

logoButton.addEventListener('click', generateNewWord);
speechButton.addEventListener('click', () => {
    if (currentWord) {
        speak(currentWord);
    }
});

// Initial setup
logoButton.disabled = true;
fetchWords();
