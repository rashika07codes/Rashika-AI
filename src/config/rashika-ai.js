
// ****const apiKey = "AIzaSyByT1IMf_TabPa1esJB2Mepqbaq1CJ-TGc"


// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenerativeAI, 
    HarmCategory,
    HarmBlockThreshold 
    } from "@google/generative-ai";

 const MODEL_NAME = "gemini-2.0-flash";
 const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

 async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME});

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings =[
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ]

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });
    const result = await chat.sendMessage(prompt.toString())
    const response = result.response;

    const text = response.text();

    console.log(response.text());
    response.text();

    return text;

}

export default runChat;