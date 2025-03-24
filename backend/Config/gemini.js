import { GoogleGenerativeAI } from "@google/generative-ai";


const API_KEY = "AIzaSyCQuwWKQQu8sRTASfDpMwPsnoTuTX5-R8I";
console.log(API_KEY);
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = "Write a function to delete an element from a binary search tree";

const result = await model.generateContent(prompt);
console.log(result.response.text());
