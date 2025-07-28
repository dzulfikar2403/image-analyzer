import { GoogleGenAI } from "@google/genai";
import { config } from "./config";

const ai = new GoogleGenAI({apiKey: config.env.geminiKey});

export default ai;