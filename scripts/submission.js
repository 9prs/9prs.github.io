import { aiGeneratingRemarks } from "./ai_responses.js";
import { maximumQuestionsLimit, testTime } from "./landing.js";
import { answeredArray, answeredQuestions, askedQuestions, time } from "./script.js";

export let correctAnswer = 0;
export let incorrectAnswer = 0;
export let result = {};
export let percentage = 0;
export let finalResult = {};

export function answerEvaluation() {
    answeredArray.forEach(val => {
        if (val.answer == val.answerGiven) {
            correctAnswer = correctAnswer + 1;
        }
        else {
            incorrectAnswer = incorrectAnswer + 1;
        }
    })
}

export async function logResults() {
    let ai_generated_remarks = "You tried well...";
    percentage = ((correctAnswer * 100) / maximumQuestionsLimit);
    ai_generated_remarks = await aiGeneratingRemarks();
    console.log('done 1')
    return result = { 
        "Asked Questions": maximumQuestionsLimit,
        "Questions Seen": askedQuestions.length,
        "Questions Attempted": answeredQuestions.length,
        "Answered Correct": correctAnswer,
        "Answered Incorrect": incorrectAnswer,
        "Time took": testTime - time,
        "Percentage": percentage + "%",
        "Remarks": ai_generated_remarks 
    }
}

export async function displayResults() {
    let finalResult = await logResults();
    document.querySelector('#submission .askedQuestions span').textContent = finalResult['Asked Questions'];
    document.querySelector('#submission .questionsViewed span').textContent = finalResult['Questions Seen'];
    document.querySelector('#submission .questionsAttempted span').textContent = finalResult['Questions Attempted'];
    document.querySelector('#submission .correctAnswer span').textContent = finalResult['Answered Correct'];
    document.querySelector('#submission .incorrectAnswer span').textContent = finalResult['Answered Incorrect'];
    document.querySelector('#submission .timeTaken span').textContent = finalResult['Time took'];
    document.querySelector('#submission .percentage span').textContent = finalResult['Percentage'];
    document.querySelector('#submission .remarks span').innerHTML = finalResult['Remarks'];
    console.log('done 2')
}