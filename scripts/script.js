import { selectedSubject, maximumQuestionsLimit, testTime } from "./landing.js";
import { submitTest } from "./submit.js";
import { submitted } from "./submit.js"

let questionDiv = document.querySelector(".question");
let optionsArr = document.querySelectorAll(".option");
let nextQue = document.querySelector(".right");
let backQue = document.querySelector(".left");
export let data = [];
export let askedQuestions = [];
let questionNum = 0;
export let answeredArray = [];
export let answeredQuestions = [];
export let time = 0;
let subjects = {
    'Physics': "phy.json",
    'Biology': "bio.json",
    'Chemistry': "chem.json",
    'History': "hist.json",
    'Economics': "econ.json",
    'Geography': "geo.json",
    'Civics': "civics.json",
    'Maths': "maths.json",
    'Literature': "lit.json",
    'Language': "lang.json"
}

function fetchData() {
    return fetch(`data/${subjects[selectedSubject]}`)
        .then(response => response.json())
        .then(JSONdata => {
            data = JSONdata;
            return JSONdata;
        })
        .catch(error => { alert('ERR_404 \n\nWe are having some trouble to find questions! Please refresh the site and then try...'); console.error('Error fetching JSON:', error) });
}
async function fetchingData() {
    await fetchData();
}

const loggingQuestions = async () => {
    if (questionNum == askedQuestions.length) {
        creatingQuestions();
    }
    if (questionNum < askedQuestions.length) {
        let question = askedQuestions[questionNum];
        questionDiv.textContent = `${questionNum + 1}. ${question.question}`;
        optionsArr.forEach((val, index) => {
            val.querySelector('.txt').textContent = question.options[index];
        });
        questionNum++;
    }
}

const renderAnsweredQuestion = () => {
    optionsArr.forEach(val => {
        val.classList = 'option';
        val.querySelector('i').classList = 'ri-circle-line';
    })
    if (answeredQuestions.includes(questionNum)) {
        optionsArr.forEach(val => {
            if (val.querySelector('.txt').textContent == answeredArray[answeredQuestions.indexOf(questionNum)].answer) {
                val.classList.add('correct');
                val.querySelector('i').classList = 'ri-checkbox-circle-fill';
            }
        })
        if (answeredArray[answeredQuestions.indexOf(questionNum)].answer != answeredArray[answeredQuestions.indexOf(questionNum)].answerGiven) {
            optionsArr.forEach(val => {
                if (val.querySelector('.txt').textContent == answeredArray[answeredQuestions.indexOf(questionNum)].answerGiven) {
                    val.classList.add('incorrect');
                    val.querySelector('i').classList = `ri-close-circle-fill`
                }
            })
        }
    }
}

const creatingQuestions = () => {
    if (data.length === 0) {
        return;
    }
    if (askedQuestions.length + 1 <= maximumQuestionsLimit) {
        let question = data[Math.floor(Math.random() * data.length)];
        shuffleArrays(question.options);
        question.answered = false;
        data.splice(data.indexOf(question), 1);
        askedQuestions.push(question);
    }
    else {
        return;
    }
}

function testTimer() {
    time = testTime;
    let minutes = document.querySelector('.minute');
    let seconds = document.querySelector('.seconds');
    let timer = setInterval(() => {
        if (submitted == true) {
            clearInterval(timer);
        }
        time--;
        minutes.textContent = String(Math.floor(time / 60)).padStart(2, "0");
        seconds.textContent = String(time % 60).padStart(2, "0");
        if (time == 0) {
            clearInterval(timer);
            submitTest("submitByTime");
        }

    }, 1000);
}

function reverseQuestion() {
    if (questionNum > 0) {
        if (questionNum == 1) {
            return;
        }
        questionNum--;
        let question = askedQuestions[questionNum - 1];
        questionDiv.textContent = `${questionNum}. ${question.question}`;
        optionsArr.forEach((val, index) => {
            val.querySelector('.txt').textContent = question.options[index];
        });
    }
}

function validatingAnswers() {
    document.querySelector(".options").addEventListener("click", function (e) {
        if (e.target.classList.contains('option') || e.target.classList.contains('txt') || e.target.classList.contains('ri-circle-line')) {
            let target = e.target;
            if (answeredQuestions.includes(questionNum)) {
                return;
            }
            let question = askedQuestions[questionNum - 1];
            if (e.target.classList.contains('txt') || e.target.classList.contains('ri-circle-line')) {
                target = e.target.parentElement;
            }

            question.answered = true;
            let obj = { question: question.question, options: question.options, answer: question.answer, answerGiven: target.querySelector('.txt').textContent };
            answeredArray.push(obj);
            answeredQuestions.push(questionNum);
            if (questionNum == 0) {
                question = askedQuestions[questionNum];
            }
            optionsArr.forEach((val, index) => {
                if (val.textContent == question.answer) {
                    val.querySelector('i').classList.remove('ri-circle-line');
                    val.querySelector('i').classList.add('ri-checkbox-circle-fill');
                    val.classList.add('correct');
                }
            })
            if (target.querySelector('.txt').textContent != question.answer) {
                target.querySelector('i').classList.remove('ri-circle-line');
                target.querySelector('i').classList.add('ri-close-circle-fill');
                target.classList.add('incorrect');
            }
        }
    })
}

function shuffleArrays(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export const app = async () => {
    await fetchingData();
    loggingQuestions();
    nextQue.addEventListener('click', loggingQuestions);
    backQue.addEventListener('click', reverseQuestion);
    validatingAnswers();
    document.addEventListener('click',renderAnsweredQuestion);
    setTimeout(() => { testTimer() }, 300)
}