const words = [
    "אהבה", "בית", "דרך", "לב", "שמש", "ירח", "כוכב", "ים", "קיץ", "חורף",
    "אור", "חושך", "חלום", "תקווה", "שיר", "מנגינה", "ריקוד", "צחוק", "דמעה",
    "שמיים", "אדמה", "רוח", "גשם", "פרח", "עץ", "ילד", "ילדה", "איש", "אישה",
    "חבר", "משפחה", "זיכרון", "געגוע", "נשיקה", "חיבוק", "פרידה", "מחר", "אתמול",
    "היום", "תמיד", "לפעמים", "אף פעם", "סוד", "אמת", "שקר", "כאב", "שמחה",
    "אושר", "עצב", "חיים", "מוות", "תפילה", "אמונה", "מלחמה", "שלום"
];

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-button');
const newWordButton = document.getElementById('new-word-button');
const wordElement = document.getElementById('word');

startButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    generateNewWord();
});

newWordButton.addEventListener('click', generateNewWord);

function generateNewWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    wordElement.textContent = words[randomIndex];
}
