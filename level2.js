const screenOne = document.querySelector(".screen1");
const screenTwo = document.querySelector(".screen2");
const screenThree = document.querySelector(".screen3");
const screenFour = document.querySelector(".screen4");
const resultScreenOne = document.querySelector(".result_screen1")
const playButton = document.querySelector(".play_button");
const gameMainContainer = document.querySelector(".game_main_container");
const gameMainContainer2 = document.querySelector(".game_main_container2");
const gameMainContainer3 = document.querySelector(".game_main_container3");
const checkButton = document.querySelector(".check_btn");
const checkButton2 = document.querySelector(".check_btn2");
const checkButton3 = document.querySelector(".check_btn3");
const tryAgainButton = document.querySelector(".try_again_btn");
const tryAgainButton2 = document.querySelector(".try_again_btn2");
const loseContainer = document.querySelector(".lose_container");
const loseContainer2 = document.querySelector(".lose_container2");
const loseContainer3 = document.querySelector(".lose_container3");
const winContainer = document.querySelector(".win_container");
const winContainer2 = document.querySelector(".win_container2");
const winContainer3 = document.querySelector(".win_container3");
const nextButton = document.querySelector(".next_btn");
const nextButton2 = document.querySelector(".next_btn2");
const resultContainer = document.querySelector(".result_container");
const resultContainer2 = document.querySelector(".result_screen2");
const resultContainer3 = document.querySelector(".result_screen3");
const resetBtn = document.querySelector(".reset_btn");
const resetBtn2 = document.querySelector(".reset_btn2");
const resetBtn3 = document.querySelector(".reset_btn3");
const playAgain = document.querySelector(".play_again");
const scoreBoard = document.querySelector(".scoreBoard");
const myWinScore = document.querySelector(".my_win_score");
const myLoseScore = document.querySelector(".my_lose_score");
const winMSG = document.querySelector(".win_msg")
const loseMSG = document.querySelector(".lose_msg")
const winMSG2 = document.querySelector(".win_msg2")
const loseMSG2 = document.querySelector(".lose_msg2")
const randomTextBoxLevelTwo = document.querySelector(".random_text_box_level2")
const timerElement = document.getElementById("timer");

let countdown;

let apidata;

// Function to increment the correct score
function incrementCorrectScore() {
    let correctScore = parseInt(localStorage.getItem('correctScore')) || 0;
    correctScore += 1;
    localStorage.setItem('correctScore', correctScore.toString());
}
  
// Function to increment the incorrect score
function incrementIncorrectScore() {
    let incorrectScore = parseInt(localStorage.getItem('incorrectScore')) || 0;
    incorrectScore += 1;
    localStorage.setItem('incorrectScore', incorrectScore.toString());
}

myWinScore.innerText = localStorage.getItem('correctScore');
myLoseScore.innerText = localStorage.getItem('incorrectScore');


async function fetchData() {
try {
        const response = await fetch("https://wordstar.shabox.mobi/ai/getwords?length=4");
        const data = await response.json();
        apidata = data;
        console.log(apidata)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
  
fetchData();
timer()

setTimeout(() => {
    gameMainContainer2.classList.remove("hidden")
    getRandomFourWord()
}, 1000)


function timer(){
    let timeLeft = 20;
    countdown = setInterval(() => {
        setTimeout(() => {
            timeLeft--;
        }, 200)
        
        timerElement.textContent = timeLeft + "s";
    
        if (timeLeft === 0) {
            clearInterval(countdown);
            randomTextBoxLevelTwo.innerText= ""
            getRandomFourWord()
            timer()
        }
    }, 1000);
}



let randomThreeLetterWord = "";
let fillIndex = 0; 
let filledInputs = []; 
let level = 1;
win = null;
lose = 0;
let originalWord = "";

function shuffleWord(word) {
    const wordArray = word.split('');
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join('');
}


function autoCheckValue(){
    parseInt(localStorage.getItem('correctScore'), 10) || 0;
    const tempFilledWord = filledInputs.join('');
    filledWord = tempFilledWord.toLowerCase();
    console.log(filledWord)
    
    if(filledInputs.length === 4){ 
        setTimeout(() => {
            if (apidata.includes(filledWord)) {
                clearInterval(countdown);
                fillInputDiv2()
                incrementCorrectScore();
                console.log(typeof(win))
                myWinScore.innerText = localStorage.getItem('correctScore');
                console.log("win")
                console.log(win)
                winMSG2.classList.remove("hidden")
                if(localStorage.getItem('correctScore') == 4){
                    setTimeout(() => {
                        window.location.href = "./level3.html"
                    }, 700)
                }else{
                    fetchData()
                    setTimeout(() => {
                        timer()
                        getRandomFourWord()
                        winMSG2.classList.add("hidden")
                    }, 500)
                }
            } else {
                console.log(apidata)
                console.log(filledWord)
                clearInterval(countdown);
                fillInputDiv2()
                incrementIncorrectScore();
                myLoseScore.innerText = localStorage.getItem('incorrectScore');
                loseMSG2.classList.remove("hidden")
                fetchData()
                setTimeout(() => {
                    timer()
                    getRandomFourWord()
                    loseMSG2.classList.add("hidden")
                }, 500)
            }
        }, 1000)
    }  else {
        return;
    }  
}




function getRandomFourWord() {
    console.log(apidata)
    const randomIndex = Math.floor(Math.random() * apidata.length);
    tempOriginalWord = apidata[randomIndex];
    originalWord = tempOriginalWord.toUpperCase();
    console.log(originalWord)

    let shuffledWord = shuffleWord(originalWord);

    while (shuffledWord === originalWord) {
        shuffledWord = shuffleWord(originalWord);
    }
    
    const transformations = [
        "rotate(-33deg) translate(50px) rotate(5deg)",
        "rotate(150deg) translate(50px) rotate(-180deg)",
        "rotate(240deg) translate(50px) rotate(-270deg)",
        "rotate(60deg) translate(50px) rotate(-90deg)"
    ];

    for (let i = 0; i < shuffledWord.length; i++) {
        setTimeout(() => {
            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("letter", "randomInputBox");
            input.value = shuffledWord[i];
            input.maxLength = 1;
            input.readOnly = true;
            
            if (i < transformations.length) {
                input.style.transform = transformations[i];
            }
    
            input.addEventListener("click", () => {
                fillBlankInput2(input.value);
                input.style.display = 'none';
            });
    
            input.addEventListener("click", () => {
                autoCheckValue();
            });
    
            randomTextBoxLevelTwo.appendChild(input);
    
        }, i * 100);
    }

    fillIndex = 0; 
    filledInputs = []; 
    fillInputDiv2(); 
}

function fillInputDiv2() {
    const giveInputs = document.querySelectorAll(".give_input2");
    for (let i = 0; i < giveInputs.length; i++) {
        giveInputs[i].value = ''; 
    }
}

function fillBlankInput2(letter) {
    const giveInputs = document.querySelectorAll(".give_input2");
    if (fillIndex < giveInputs.length) { 
        giveInputs[fillIndex].value = letter; 
        filledInputs[fillIndex] = letter; 
        fillIndex++; 
    }
}

function reset_btn2() {
    clearInterval(countdown);
    randomTextBoxLevelTwo.innerText= ""
    fetch("https://wordstar.shabox.mobi/ai/getwords?length=4")
    .then((res) => res.json())
    .then((data) => {
        apidata = data
        getRandomFourWord()
        timer()
    })
}
