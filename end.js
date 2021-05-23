var username = document.getElementById("username");
var saveScoreBtn = document.getElementById("saveScoreBtn");
var finalScore = document.getElementById("finalScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");


const highScores = JSON.parse(localStorage.getItem('highscores')) || [];

var MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();


const score = {
    score: mostRecentScore,
    name: username.value
};
highScores.push(score);
highScores.sort((a, b) => b.score - a.score);
highScores.splice(5);

localStorage.setItem('highScores', JSON.stringify(highScores));
window.location.assign("index.html")


};