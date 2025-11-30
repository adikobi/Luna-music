const hebrewWords = [
  'אהבה', 'שלום', 'בית', 'שמש', 'ירח', 'כוכב', 'ים', 'נהר', 'הר', 'עץ',
  'פרח', 'ציפור', 'דג', 'חבר', 'משפחה', 'אוכל', 'מים', 'אש', 'אדמה', 'שמיים',
  'חלום', 'צחוק', 'דמעה', 'שיר', 'סיפור', 'ספר', 'מכתב', 'טלפון', 'מחשב', 'טלוויזיה',
  'כביש', 'מכונית', 'אופניים', 'רכבת', 'מטוס', 'בית ספר', 'אוניברסיטה', 'עבודה', 'כסף', 'זהב',
  'יהלום', 'אבן', 'סלע', 'חול', 'אבק', 'רוח', 'גשם', 'שלג', 'ברד', 'קשת',
  'ענן', 'ברק', 'רעם', 'בוקר', 'צהריים', 'ערב', 'לילה', 'יום', 'שבוע', 'חודש', 'שנה'
];

const splashScreen = document.getElementById('splash-screen');
const gameContainer = document.getElementById('game-container');
const wordElement = document.getElementById('word');
const newWordBtn = document.getElementById('new-word-btn');

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * hebrewWords.length);
  return hebrewWords[randomIndex];
}

function showNewWord() {
  wordElement.textContent = getRandomWord();
}

newWordBtn.addEventListener('click', showNewWord);

window.addEventListener('load', () => {
  setTimeout(() => {
    splashScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    showNewWord();
  }, 2000);
});
