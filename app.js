const rulesBtn = document.querySelector(".rules-btn")
const closeBtn = document.querySelector(".close-btn")
const dialogRules = document.querySelector(".dialog")

const CHOICES = [
    {
        name:"rock",
        defeats:"scissors"
    },
    {
        name:"scissors",
        defeats:"paper"
    },
    {
        name:"paper",
        defeats:"rock"
    }
]

const pick__Btn = document.querySelectorAll(".choice-btn")
const game__Div = document.querySelector(".game")
const results__Div = document.querySelector(".results")
const mainResult__Div = document.querySelectorAll(".results__result")

const resultWinner = document.querySelector(".results__winner")
const resultText = document.querySelector(".results__text")
const resultText2 = document.querySelector(".results__text2")

const playAgianBtn = document.querySelector(".play-again")

const pcScore = document.getElementById("c-score")
const userScore = document.getElementById("y-score")

const mainContent = document.querySelector(".main")
const nextBtn = document.querySelector(".next-btn")
const winnerPage = document.querySelector(".winner-page")
const winBtn = document.querySelector(".win")

let uScore = parseInt(localStorage.getItem("userScore"));
let cScore = parseInt(localStorage.getItem("computerScore"));

userScore.innerText = uScore;
pcScore.innerText = cScore;

//logic
pick__Btn.forEach( button => {  
    button.addEventListener("click", () =>{
        const pickedName = button.dataset.choice;
        const youPick = CHOICES.find( youPick => youPick.name === pickedName)
        choose(youPick)
    })
})

function choose(youPick){
    const pcPick = PCchoose();
    display([youPick,pcPick]);
    displayWinner([youPick,pcPick]);
}

function PCchoose(){
    const randomIndex = Math.floor(Math.random() * CHOICES.length)
    return CHOICES[randomIndex]
}

function display(results){
    mainResult__Div.forEach((results__Div, index) => {
        setTimeout(() =>{
            results__Div.innerHTML = `
            <div class="pick ${results[index].name}" >
              <img src = "./${results[index].name}.png" alt = "${results[index].name}" />
            </div>
        `
        }, index*500)
    });

    game__Div.classList.toggle("hidden")
    game__Div.classList.remove("show-grid")
    results__Div.classList.toggle("hidden")
}

function displayWinner(results){
    setTimeout(() => {
        const userWin = isWinner(results)
        const pcWin = isWinner(results.reverse())

        if(userWin){
            resultText.innerText = "YOU WIN"
            resultText2.innerText = "AGAINST PC"
            mainResult__Div[0].classList.toggle("winner")
            nextBtn.style.display = "block"
            playAgianBtn.textContent = "PLAY AGAIN";
            userScoreRec(1)
        }
        else if(pcWin){
            resultText.innerText = "PC WINS"
            resultText2.innerText = "AGAINST PC"
            mainResult__Div[1].classList.toggle("winner")
            nextBtn.style.display = "none"
            playAgianBtn.textContent = "PLAY AGAIN";
            pcScoreRec(1)
        }
        else{
            resultText.innerText = "TIE UP"
            nextBtn.style.display = "none"
            playAgianBtn.textContent = "REPLAY";
        }
        resultWinner.classList.toggle("hidden")
        results__Div.classList.toggle("show-winner")

    }, 500)
   
}

function isWinner(results){
    return results[0].defeats === results[1].name;
}

playAgianBtn.addEventListener("click", () =>{
    game__Div.classList.toggle("hidden")
    results__Div.classList.toggle("hidden")
    mainResult__Div.forEach(resultDiv =>{
        resultDiv.innerHTML = ""
        resultDiv.classList.remove("winner")
    })

    resultText.innerText = ""
    resultText2.innerText = ""
    resultWinner.classList.toggle("hidden")
    results__Div.classList.toggle("show-winner")

})

winBtn.addEventListener("click", () => {
    // game__Div.classList.remove("hidden-grid");
    results__Div.classList.add("hidden");
    game__Div.classList.remove("show-grid")
    game__Div.classList.toggle("hidden")
    mainResult__Div.forEach(resultDiv => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    resultText2.innerText = "";
    resultWinner.classList.add("hidden");
    results__Div.classList.remove("show-winner");
})

function userScoreRec(point){
    uScore += point;
    userScore.innerText = uScore;
    localStorage.setItem("userScore", uScore);
}
function pcScoreRec(point){
    cScore += point;
    pcScore.innerText = cScore;
    localStorage.setItem("computerScore", cScore);
}

rulesBtn.addEventListener("click", () => {
    dialogRules.classList.toggle('show-dialog');
})

closeBtn.addEventListener("click", () => {
    dialogRules.classList.toggle('show-dialog');
})

nextBtn.addEventListener("click", () =>{
    mainContent.classList.toggle("hidden")
    // game__Div.style.display = 'none';
    // game__Div.classList.add("show-grid")
    winnerPage.classList.toggle("hidden")
    results__Div.classList.toggle("hidden")
    nextBtn.style.display = 'none'
})

const winnerPlayAgainBtn = document.querySelector(".winner-page .play-again");
winnerPlayAgainBtn.addEventListener("click", reset);

function reset() {
    // Ensure main and game divs are displayed
    mainContent.classList.remove("hidden");
    game__Div.classList.add("show-grid")

    // Hide the winner-page
    winnerPage.classList.add("hidden");


    // Reset results div
    mainResult__Div.forEach(resultDiv => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    resultText2.innerText = "";
    resultWinner.classList.add("hidden");
    results__Div.classList.remove("show-winner");
}
