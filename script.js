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
    wordElement.textContent = words[randomIndex];
}

fetchWords();
