
import { GoogleGenAI, Type } from "@google/genai";
import { ExtractionResult } from "../types";

export const analyzeWorkPlan = async (rawData: any[]): Promise<ExtractionResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const prompt = `
    Analyze this raw data extracted from a work plan Excel sheet.
    Current Date: ${today.toISOString().split('T')[0]}
    
    1. Identify relevant columns (Task Title, Due Date, Assignee, Status, Description, Priority).
    2. Filter tasks that are due within the next 7 days (until ${nextWeek.toISOString().split('T')[0]}).
    3. Group these tasks by Assignee.
    4. Provide a brief summary of the workload for next week.

    Raw Data:
    ${JSON.stringify(rawData.slice(0, 200))}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          assignees: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                email: { type: Type.STRING, nullable: true },
                tasks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      dueDate: { type: Type.STRING },
                      status: { type: Type.STRING },
                      assignee: { type: Type.STRING },
                      priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
                    },
                    required: ["title", "dueDate", "assignee"]
                  }
                }
              },
              required: ["name", "tasks"]
            }
          }
        },
        required: ["summary", "assignees"]
      }
    }
  });

  return JSON.parse(response.text);
};
