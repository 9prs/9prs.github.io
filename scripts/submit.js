import { answeredArray, answeredQuestions } from "./script.js";
import { maximumQuestionsLimit } from "./landing.js";
import { answerEvaluation, logResults, result } from "./submission.js";
import { displayResults } from "./submission.js";

const submit = document.querySelector('#questions-app .submit');
const hardSubmit = document.querySelector('.hard')
const mainApp = document.querySelector('#questions-app');
const warning = document.querySelector('.warning');
export let submitted = false;

export function submitTest(e) {
    submitted = true;
    if (e != "submitByTime") {
        if (!e.target.classList.contains("hard")) {
            if (answeredQuestions.length < maximumQuestionsLimit) {
                warning.style.display = 'flex';
                warning.innerHTML = `<div class="txts"><h3>All questions are not answered yet...</h3><br><h5>Are you sure you want to submit the test?</h5></div><div class='btns'><div class="close"><i class="ri-close-circle-fill"></i></div><div class="confirm"><i class="ri-checkbox-circle-fill"></i></div></div>`;
            }
            else {
                alert("Test Submitted");
                answerEvaluation();
                displayResults();
            }
        }
        else {
            alert("Test Submitted");
            answerEvaluation();
            displayResults();
        }
    }
    else {
        alert('Test Submitted by time...');
        answerEvaluation();
        displayResults();
    }
}

submit.addEventListener('click', submitTest);
hardSubmit.addEventListener('click', submitTest);

warning.addEventListener('click', function (e) {
    if (e.target.classList.contains('ri-close-circle-fill') || e.target.classList.contains('close')) {
        warning.style.display = 'none';
    }
    if (e.target.classList.contains('ri-checkbox-circle-fill' || e.target.classList.contains('confirm'))) {
        alert("Test Submitted");
        answerEvaluation();
        displayResults();
    }
})