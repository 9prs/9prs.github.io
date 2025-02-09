import { answeredArray, answeredQuestions } from "./script.js";
import { maximumQuestionsLimit } from "./landing.js";
import { answerEvaluation, result, finalResult } from "./submission.js";
import { displayResults, logResults } from "./submission.js";

const submit = document.querySelector('#questions-app .submit');
const hardSubmit = document.querySelector('.hard')
const mainApp = document.querySelector('#questions-app');
const warning = document.querySelector('.warning');
export let submitted = false;

export function submitTest(e) {
    if (e != "submitByTime") {
        if (!e.target.classList.contains("hard")) {
            if (answeredQuestions.length < maximumQuestionsLimit) {
                warning.style.display = 'flex';
                warning.innerHTML = `<div class="txts"><h3>All questions are not answered yet...</h3><br><h5>Are you sure you want to submit the test?</h5></div><div class='btns'><div class="close"><i class="ri-close-circle-fill"></i></div><div class="confirm"><i class="ri-checkbox-circle-fill"></i></div></div>`;
            }
            else {
                submitted = true;
                finalSubmission();
            }
        }
        else {
            submitted = true;
            finalSubmission();
        }
    }
    else {
        submitted = true;
        finalSubmission();
    }
}

document.querySelector('#submission .home').addEventListener('click', function () {
    location.reload(true)
})

submit.addEventListener('click', submitTest);
hardSubmit.addEventListener('click', submitTest);

async function finalSubmission() {
    answerEvaluation();
    document.querySelector('#submission').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#main').style.transform = "translateY(100vh)";
        document.querySelector('#submission').style.transform = "translateY(-200vh)";
    }, 500)
    await displayResults();
    setTimeout(() => {
        document.querySelector('#submission .home').style.display = 'flex'
    }, 1000);
}

warning.addEventListener('click', function (e) {
    if (e.target.classList.contains('ri-close-circle-fill') || e.target.classList.contains('close')) {
        warning.style.display = 'none';
    }
    if (e.target.classList.contains('ri-checkbox-circle-fill' || e.target.classList.contains('confirm'))) {
        if(getComputedStyle(warning).display == 'flex'){
            warning.style.display = 'none';
        }
        finalSubmission();
    }
})