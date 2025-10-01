import { GoogleGenerativeAI } from "@google/generative-ai";
import { percentage } from "./submission.js";
const API_KEY = "AIzaSyAibOrzjuEKc81ZRBtdSKlh1MbJmSzfdk8";
export let ai_remarks;

export async function aiGeneratingRemarks() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You're a judge in a mock exam fest. Based on ${percentage}%, generate a short (max 5 lines) motivational remark with emojis. here are some examples of what kind of remarks you have to write:  
✔ 95%+ – "Genius! 🏆 Shine like a star 🌟 and ace the real test! 🚀"  
✔ 80-90% – "On fire! 🔥 Great effort, keep pushing! 🎯 Good luck! 🍀"  
✔ 60-79% – "Solid! 💪 A bit more grind and you'll be unstoppable! 🏅"  
✔ <50% – "Nice try! 📈 Keep practicing, you'll hit 💯 soon! 🍀"  
Keep it interactive, positive, and concise. You have to make it very much exiting and humorous but keep it compact and minimal. If the percentage is 100%, then you have to write one and only remark and start it with 'Clean Swift!'. || You must have to use the emojis from these samples only but you could make your own remark. You must have to give one and only one remark based on the percentage and the language of remark should be hinglish. You must not write anything other than remark. Your response should only have remark and nothing other than it. Thanks in advance...`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return ai_remarks = await response.text();
}

let input = document.querySelector('.prompt input');
let prompt_field = document.querySelector('.prompt')
let send = document.querySelector('.prompt button');
let final_response = document.querySelector('.response');
let copy = document.querySelector('.copy')


prompt_field.addEventListener('click', function () {
    input.focus()
})

async function rudraAIResponse() {
    let request;
    if (input.value.trim() === "") {
        alert('Empty Prompt! Please fill it to get response.')
    } else {
        request = input.value;
        const genAI = new GoogleGenerativeAI(API_KEY);

        async function run() {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const prompt = 'Imagine you are an ai mentor developed by Piyush Mishra, the founder of PRS Initiative for the students of 9. Your name is RudraAI and this is the student"s prompt to you: ' + request + '? . If the prompt is a question then answer it and if it is a normal talk than talk to him like a friend. Keep it minimalistic and in high spirits...';
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            console.log('Result:', result);
            console.log('Text:', text);
            console.log('Copy Element:', copy);

            copy.style.display = 'flex';
            final_response.innerHTML = text;
        }
        run()
    }
}

send.addEventListener('click', rudraAIResponse);
input.addEventListener('keydown', function (e) {
    if (e.key == "Enter") {
        rudraAIResponse();
    }
})

copy.addEventListener('click', function () {
    let copied_text = final_response.innerText
    navigator.clipboard.writeText(copied_text)
    alert('Text Copied!')
})

document.querySelector('.ai .icon').addEventListener("click", function () {
    setTimeout(() => {
        document.querySelector('.ai-active').style.display = 'flex'
    }, 400);
    document.querySelector('.ai-wrapper').style.transform = 'translateX(-100vw)';
})

document.querySelector('.ai-active').addEventListener('click', function () {
    if (getComputedStyle(document.querySelector('.about')).transform == "matrix(1, 0, 0, 1, 0, 0)") {
        document.querySelector('.about').style.transform = 'translateX(100%)';
        document.querySelector('.wrapper').style.maxHeight = '100vh';
        document.querySelector('#home').style.maxHeight = '100vh';
    }
    setTimeout(() => {
        document.querySelector('.ai-wrapper').style.transform = 'translateX(0vw)';
    }, 200);
    setTimeout(() => {
        document.querySelector('.ai-active').style.display = 'none'
    }, 400);
})
