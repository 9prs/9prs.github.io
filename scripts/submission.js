import { aiGeneratingRemarks } from "./ai_responses.js";
import { maximumQuestionsLimit, testTime } from "./landing.js";
import { answeredArray, answeredQuestions, askedQuestions, time } from "./script.js";

export let correctAnswer = 0;
export let incorrectAnswer = 0;
export let result = {};
export let percentage = 0;

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
    return result = { 
        "Asked Questions: ": maximumQuestionsLimit,
        "Questions Seen: ": askedQuestions.length,
        "Questions Attempted: ": answeredQuestions.length,
        "Answered Correct: ": correctAnswer,
        "Answered Incorrect": incorrectAnswer,
        "Time took: ": testTime - time,
        "Percentage: ": percentage + "%",
        "Remarks: ": ai_generated_remarks 
    }
}

export async function displayResults() {
    let finalResult = await logResults();
    console.log(finalResult);
}