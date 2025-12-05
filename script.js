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

function updateUI() {
    window.speechSynthesis.cancel();
    switch (currentMode) {
        case 'read-only':
            wordElement.textContent = '';
            speak(currentWord);
            break;
        case 'word-only':
            wordElement.textContent = currentWord;
            break;
        case 'read-and-word':
            wordElement.textContent = currentWord;
            speak(currentWord);
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
    }
});


// Initial setup
logoButton.disabled = true;
fetchWords();
