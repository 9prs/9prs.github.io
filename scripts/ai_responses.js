import { GoogleGenerativeAI } from "@google/generative-ai";
import { percentage } from "./submission.js";
const API_KEY = "AIzaSyDJt7xTCqcTBtnhDyhDIQluSbh31jGj_6c";
export let ai_remarks;

export async function aiGeneratingRemarks() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You're a judge in a mock exam fest. Based on ${percentage}%, generate a short (max 3 lines) motivational remark with emojis. here are some examples of what kind of remarks you have to write:  
✔ 95%+ – "Genius! 🏆 Shine like a star 🌟 and ace the real test! 🚀"  
✔ 80-90% – "On fire! 🔥 Great effort, keep pushing! 🎯 Good luck! 🍀"  
✔ 60-79% – "Solid! 💪 A bit more grind and you'll be unstoppable! 🏅"  
✔ <50% – "Nice try! 📈 Keep practicing, you'll hit 💯 soon! 🍀"  
Keep it interactive, positive, and concise. You have to make it very much exiting and humorous but keep it compact and minimal. You must have to use the emojis from these samples only but you could make your own remarks`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return ai_remarks = await response.text();
}