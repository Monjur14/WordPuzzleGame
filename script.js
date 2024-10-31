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

const timerElement = document.getElementById("timer");

let countdown;

let apidata;

localStorage.setItem('correctScore', '0');
localStorage.setItem('incorrectScore', '0');

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
        const response = await fetch("https://wordstar.shabox.mobi/ai/getwords?length=3");
        const data = await response.json();
        apidata = data; 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
  
fetchData();



function timer(){
    let timeLeft = 15;
    countdown = setInterval(() => {
        setTimeout(() => {
            timeLeft--;
        }, 200)
        
        timerElement.textContent = timeLeft + "s";
    
        if (timeLeft === 0) {
            clearInterval(countdown);
            getRandomThreeWord()
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

// const threeLetterWords = ["CAT", "DOG", "SUN", "CAR", "HAT", "FOX", "BAT", "RED", "BOX", "PEN", "ACT"];
const threeLetterWords = ["CAT", "ACT"];
const fourLetterWords = ["LION", "FISH", "BIRD", "TREE", "FLOW", "SNOW", "WIND", "MOON", "STAR", "ROCK"];
const fiveLetterWords = ["EAGLE", "APPLE", "RIVER", "STONE", "PLANT", "WATER", "CLOUD", "MOUNT", "BRAVE", "GRASS"];
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
    const tempFilledWord = filledInputs.join('');
    filledWord = tempFilledWord.toLowerCase();
    
    if(filledInputs.length === 3){ 
        setTimeout(() => {
            if (apidata.includes(filledWord)) {
                clearInterval(countdown);
                fillInputDiv()
                incrementCorrectScore()
                win = localStorage.getItem('correctScore');
                myWinScore.innerText = win;
                winMSG.classList.remove("hidden")
                console.log(win)
                if(win == 2){
                    setTimeout(() => {
                        window.location.href = "./level2.html"
                    }, 700)
                }else{
                    fetchData()
                    setTimeout(() => {
                        timer()
                        getRandomThreeWord()
                        winMSG.classList.add("hidden")
                    }, 500)
                }                
            } else {
                console.log(apidata)
                console.log(filledWord)
                clearInterval(countdown);
                fillInputDiv()
                // lose = lose + 1;
                incrementIncorrectScore()
                lose = localStorage.getItem('incorrectScore');
                myLoseScore.innerText = lose;
                loseMSG.classList.remove("hidden")
                fetchData()
                setTimeout(() => {
                    timer()
                    getRandomThreeWord()
                    loseMSG.classList.add("hidden")

                }, 500)
            }
        }, 1000)
    }  else {
        return;
    }  
}




// function getRandomThreeWord() {
//     const randomTextBox1 = document.querySelector(".random_text_box1");
//     randomTextBox1.innerHTML = ""
//     const randomIndex = Math.floor(Math.random() * threeLetterWords.length);
//     originalWord = threeLetterWords[randomIndex];

//     console.log(originalWord)

//     let shuffledWord = shuffleWord(originalWord);

//     while (shuffledWord === originalWord) {
//         shuffledWord = shuffleWord(originalWord);
//     }

//     const transformations = [
//         "rotate(-12deg) translate(50px) rotate(-17deg)",
//         "rotate(130deg) translate(50px) rotate(-160deg)",
//         "rotate(240deg) translate(50px) rotate(-270deg)"
//     ];
    
//     // for (let i = 0; i < shuffledWord.length; i++) {
//     //     setTimeout(() => {
//     //         const input = document.createElement("input");
//     //         input.type = "text";
//     //         input.classList.add("letter", "randomInputBox");
//     //         input.value = shuffledWord[i];
//     //         input.maxLength = 1;
//     //         input.readOnly = true;
            
//     //         if (i < transformations.length) {
//     //             input.style.transform = transformations[i];
//     //         }
    
//     //         input.addEventListener("click", () => {
//     //             fillBlankInput(input.value);
//     //             input.style.display = 'none';
//     //         });
    
//     //         randomTextBox1.appendChild(input);
//     //     }, i * 100);
//     // }


//     for (let i = 0; i < shuffledWord.length; i++) {
//         setTimeout(() => {
//             const input = document.createElement("input");
//             input.type = "text";
//             input.classList.add("letter", "randomInputBox");
//             input.value = shuffledWord[i];
//             input.maxLength = 1;
//             input.readOnly = true;
            
//             if (i < transformations.length) {
//                 input.style.transform = transformations[i];
//             }
    
//             input.addEventListener("click", () => {
//                 fillBlankInput(input.value);
//                 input.style.display = 'none';
//             });
    
//             input.addEventListener("click", () => {
//                 autoCheckValue();
//             });
    
//             randomTextBox1.appendChild(input);
    
//         }, i * 100);
//     }

//     fillIndex = 0; 
//     filledInputs = []; 
//     fillInputDiv();
// }



function getRandomThreeWord() {
    console.log(apidata)
    const randomTextBox1 = document.querySelector(".random_text_box1");
    randomTextBox1.innerHTML = ""
    const randomIndex = Math.floor(Math.random() * apidata.length);
    tempOriginalWord = apidata[randomIndex];
    console.log(tempOriginalWord)
    originalWord = tempOriginalWord.toUpperCase();

    console.log(originalWord)

    let shuffledWord = shuffleWord(originalWord);

    while (shuffledWord === originalWord) {
        shuffledWord = shuffleWord(originalWord);
    }

    const transformations = [
        "rotate(-12deg) translate(50px) rotate(-17deg)",
        "rotate(130deg) translate(50px) rotate(-160deg)",
        "rotate(240deg) translate(50px) rotate(-270deg)"
    ];
    
    // for (let i = 0; i < shuffledWord.length; i++) {
    //     setTimeout(() => {
    //         const input = document.createElement("input");
    //         input.type = "text";
    //         input.classList.add("letter", "randomInputBox");
    //         input.value = shuffledWord[i];
    //         input.maxLength = 1;
    //         input.readOnly = true;
            
    //         if (i < transformations.length) {
    //             input.style.transform = transformations[i];
    //         }
    
    //         input.addEventListener("click", () => {
    //             fillBlankInput(input.value);
    //             input.style.display = 'none';
    //         });
    
    //         randomTextBox1.appendChild(input);
    //     }, i * 100);
    // }


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
                fillBlankInput(input.value);
                input.style.display = 'none';
            });
    
            input.addEventListener("click", () => {
                autoCheckValue();
            });
    
            randomTextBox1.appendChild(input);
    
        }, i * 100);
    }

    fillIndex = 0; 
    filledInputs = []; 
    fillInputDiv();
}





function fillInputDiv() {
    const giveInputs = document.querySelectorAll(".give_input");
    for (let i = 0; i < giveInputs.length; i++) {
        giveInputs[i].value = ''; 
    }
}

function fillBlankInput(letter) {
    const giveInputs = document.querySelectorAll(".give_input");
    if (fillIndex < giveInputs.length) { 
        giveInputs[fillIndex].value = letter;
        filledInputs[fillIndex] = letter;
        fillIndex++;
    }
}


function getRandomFourWord() {
    const randomIndex = Math.floor(Math.random() * fourLetterWords.length);
    originalWord = fourLetterWords[randomIndex];

    let shuffledWord = shuffleWord(originalWord);

    while (shuffledWord === originalWord) {
        shuffledWord = shuffleWord(originalWord);
    }

    const randomTextBox = document.querySelector(".random_text_box2");
    randomTextBox.innerHTML = ''; 

    for (let i = 0; i < shuffledWord.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("randomInputBox", "animate__animated", i % 2 !== 0 ? "animate__fadeInDown" : "animate__fadeInUp");
        input.value = shuffledWord[i];
        input.maxLength = 1;
        input.readOnly = true;

        input.addEventListener("click", () => {
            fillBlankInput2(input.value);
            input.style.display = 'none';
        });

        randomTextBox.appendChild(input);
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





function getRandomFiveWord() {
    const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
    originalWord = fiveLetterWords[randomIndex];

    let shuffledWord = shuffleWord(originalWord);

    while (shuffledWord === originalWord) {
        shuffledWord = shuffleWord(originalWord);
    }

    const randomTextBox = document.querySelector(".random_text_box3");
    randomTextBox.innerHTML = ''; 

    for (let i = 0; i < shuffledWord.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("randomInputBox", "animate__animated", i % 2 !== 0 ? "animate__fadeInDown" : "animate__fadeInUp");
        input.value = shuffledWord[i];
        input.maxLength = 1;
        input.readOnly = true;

        input.addEventListener("click", () => {
            fillBlankInput3(input.value);
            input.style.display = 'none';
        });

        randomTextBox.appendChild(input);
    }

    


    // for (let i = 0; i < shuffledWord.length; i++) {
    //     const input = document.createElement("span");
    //     span.classList.add("letter");
    //     if (i === 0) {
    //         span.classList.add("class-for-index-0");
    //         span.style.transform = "rotate(-12deg) translate(50px) rotate(-17deg)";
    //     } else if (i === 1) {
    //         span.classList.add("class-for-index-1");
    //         span.style.transform = "rotate(130deg) translate(50px) rotate(-160deg)";
    //     } else if (i === 2) {
    //         span.classList.add("class-for-index-2");
    //         span.style.transform = "rotate(240deg) translate(50px) rotate(-270deg)";
    //     }

    //     span.textContent = shuffledWord[i];

    //     input.addEventListener("click", () => {
    //         fillBlankInput3(shuffledWord[i]);
    //     });

    //     randomTextBox.appendChild(input);
    // }



    // for (let i = 0; i < shuffledWord.length; i++) {
    //     // Create a span element for each letter
    //     const span = document.createElement("span");
    //     span.classList.add("letter"); // Common class for all spans
    
    //     // Apply specific classes based on index
    //     if (i === 0) {
    //         span.classList.add("class-for-index-0");
    //         span.style.transform = "rotate(-12deg) translate(50px) rotate(-17deg)";
    //     } else if (i === 1) {
    //         span.classList.add("class-for-index-1");
    //         span.style.transform = "rotate(130deg) translate(50px) rotate(-160deg)";
    //     } else if (i === 2) {
    //         span.classList.add("class-for-index-2");
    //         span.style.transform = "rotate(240deg) translate(50px) rotate(-270deg)";
    //     }
    
    //     span.textContent = shuffledWord[i];
    
    //     setTimeout(() => {
    //         randomTextBox.appendChild(span);
    //     }, i * 500);
    // }

    fillIndex = 0; 
    filledInputs = []; 
    fillInputDiv3(); 
}

function fillInputDiv3() {
    const giveInputs = document.querySelectorAll(".give_input3");
    for (let i = 0; i < giveInputs.length; i++) {
        giveInputs[i].value = ''; 
    }
}

function fillBlankInput3(letter) {
    const giveInputs = document.querySelectorAll(".give_input3");
    if (fillIndex < giveInputs.length) { 
        giveInputs[fillIndex].value = letter; 
        filledInputs[fillIndex] = letter; 
        fillIndex++; 
    }
}


playButton.addEventListener("click", () => {
    screenOne.classList.remove("flex");
    screenOne.classList.add("hidden");
    screenTwo.classList.remove("hidden");
    getRandomThreeWord(); 
    setTimeout(() => {
        gameMainContainer.classList.remove("hidden");        
    }, 1200);
    setTimeout(() => {
        scoreBoard.classList.remove("hidden")
        timerElement.classList.remove("hidden")
        timerElement.classList.remove("flex")
        timer()
    }, 1700)
});

checkButton.addEventListener("click", () => {
    scoreBoard.classList.add("hidden")
    timerElement.classList.add("hidden")
    screenTwo.classList.add("hidden")
    resultScreenOne.classList.remove("hidden")
    gameMainContainer.classList.add("hidden")
    const resultContainer = document.querySelector(".result_container");
    const filledWord = filledInputs.join('');
    if (filledWord === originalWord) {
        loseContainer.classList.add("hidden")
        loseContainer.classList.remove("flex")
        winContainer.classList.remove("hidden")
        winContainer.classList.add("flex")
    } else {
        winContainer.classList.add("hidden")
        winContainer.classList.remove("flex")
        loseContainer.classList.remove("hidden")
        loseContainer.classList.add("flex")
    }
});

checkButton2.addEventListener("click", () => {
    screenThree.classList.add("hidden")
    resultContainer2.classList.remove("hidden")
    gameMainContainer2.classList.add("hidden")
    const filledWord = filledInputs.join('');
    console.log(filledWord)
    console.log(originalWord)
    if (filledWord === originalWord) {
        loseContainer2.classList.add("hidden")
        loseContainer2.classList.remove("flex")
        winContainer2.classList.remove("hidden")
        winContainer2.classList.add("flex")
    } else {
        winContainer2.classList.add("hidden")
        winContainer2.classList.remove("flex")
        loseContainer2.classList.remove("hidden")
        loseContainer2.classList.add("flex")
    }
})
checkButton3.addEventListener("click", () => {
    screenFour.classList.add("hidden")
    resultContainer3.classList.remove("hidden")
    gameMainContainer3.classList.add("hidden")
    const filledWord = filledInputs.join('');
    console.log(filledWord)
    console.log(originalWord)
    if (filledWord === originalWord) {
        loseContainer3.classList.add("hidden")
        loseContainer3.classList.remove("flex")
        winContainer3.classList.remove("hidden")
        winContainer3.classList.add("flex")
    } else {
        winContainer3.classList.add("hidden")
        winContainer3.classList.remove("flex")
        loseContainer3.classList.remove("hidden")
        loseContainer3.classList.add("flex")
    }
})


resetBtn.addEventListener("click", () => {
    fetchData()
    getRandomThreeWord();
    clearInterval(countdown);
    timer()
});
resetBtn2.addEventListener("click", () => {
    getRandomFourWord()
});
resetBtn3.addEventListener("click", () => {
    getRandomFiveWord()
});



tryAgainButton.addEventListener("click", () => {
    screenOne.classList.remove("hidden")
    screenOne.classList.add("flex")
    gameMainContainer.classList.add("hidden");
    resultScreenOne.classList.add("hidden")
})
tryAgainButton2.addEventListener("click", () => {
    screenOne.classList.remove("hidden")
    screenOne.classList.add("flex")
    gameMainContainer2.classList.add("hidden");
    resultContainer2.classList.add("hidden")
})

nextButton.addEventListener("click", () => {
    screenThree.classList.remove("hidden")
    resultScreenOne.classList.add("hidden")
    getRandomFourWord() 
    setTimeout(() => {
        gameMainContainer2.classList.remove("hidden");
    }, 1200);
});

nextButton2.addEventListener("click", () => {
    screenFour.classList.remove("hidden")
    resultContainer2.classList.add("hidden")
    getRandomFiveWord() 
    setTimeout(() => {
        gameMainContainer3.classList.remove("hidden");
    }, 1200);
})

playAgain.addEventListener("click", () => {
    screenOne.classList.remove("hidden")
    screenOne.classList.add("flex")
    gameMainContainer3.classList.add("hidden");
    resultContainer3.classList.add("hidden")
})
