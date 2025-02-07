let questionDiv = document.querySelector(".question");
let optionsArr = document.querySelectorAll(".option");
let nextQue = document.querySelector(".right");
let backQue = document.querySelector(".left");
let data = [];
let askedQuestions = [];
let questionNum = 0;
let answeredArray = [];
let answeredQuestions = [];

function fetchData() {
    return fetch('questions.json')
        .then(response => response.json())
        .then(JSONdata => {
            data = JSONdata;
            return JSONdata;
        })
        .catch(error => console.error('Error fetching JSON:', error));
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
    requestAnimationFrame(renderAnsweredQuestion);
}

const creatingQuestions = () => {
    if (data.length === 0) {
        return;
    }
    let question = data[Math.floor(Math.random() * data.length)];
    shuffleArrays(question.options);
    question.answered = false;
    data.splice(data.indexOf(question), 1);
    askedQuestions.push(question);
    return;
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
        if (answeredQuestions.includes(questionNum)) {
            return;
        }
        let question = askedQuestions[questionNum - 1];
        let target = e.target.closest(".option");
        question.answered = true;
        let obj = { question: question.question, options: question.options, answer: question.answer, answerGiven: target.querySelector('.txt').textContent };
        answeredArray.push(obj);
        answeredQuestions.push(questionNum);
        console.log(answeredQuestions);
        console.log(answeredArray)
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
    })
}

function shuffleArrays(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const app = async () => {
    await fetchingData();
    loggingQuestions();
    setTimeout(() => {
        this.document.querySelector('.loader').style.top = '-100%';
    }, 3000);
    nextQue.addEventListener('click', loggingQuestions);
    backQue.addEventListener('click', reverseQuestion);
    validatingAnswers();
    renderAnsweredQuestion();
}

app();