'use server'
import ai from "@/lib/geminiAi";
import { Type } from "@google/genai";

export const analyzeImage = async (formData:FormData) => {
    const imgFile = formData.get('imgFile') as File;
    const chatMessage = formData.get('chatMsg') as string;
    
    if(!imgFile || !chatMessage) {
        return {message: 'credentials required',data:null}
    }

    const fileSizeInMb = imgFile.size / (1024*1024);

    if(fileSizeInMb > 1 ){
        return {message: 'size file to large!',data:null}
    }
    
    try {
        const fileBuffer = await imgFile.arrayBuffer();
        const base64String = Buffer.from(fileBuffer).toString('base64');

        const schema = {
            type: Type.OBJECT,
            properties: {
                information: {type: Type.STRING},
                related_tag: {
                    type: Type.ARRAY,
                    items: {type: Type.STRING}
                },
                related_question: {
                    type: Type.ARRAY,
                    items: {type: Type.STRING}
                },
            },
            propertyOrdering: ['information','related_tag','related_question']
        };

        const contents = [
            {
                inlineData:{
                    mimeType: imgFile.type,
                    data: base64String
                },
            },
            {text: chatMessage} 
        ];

        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0
                },
                responseMimeType: 'application/json',
                responseSchema: schema
            }
        });

        return {message: 'sucessfully analyze',data: JSON.parse(result.text as string)};
        

    } catch (error) {
        console.log('error: ' + (error as Error).message);
        
        return {message: 'error analyze image : ' + (error as Error).message,data:null}
    }
} 