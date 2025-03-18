import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { MODELS } from "@src/lib/contstants";
import { APIOutputType } from "@src/lib/types";

// const googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const openai = new OpenAI({ apiKey: process.env.DALLE_API_KEY });

interface ImagePrompt {
  prompt: string;
  selectedModels: {
    DALLE: boolean;
    GEMINI: boolean;
  };
  size?: string;
}

export async function POST(request: Request) {
  try {
    const body: ImagePrompt = await request.json();
    const images: APIOutputType[] = [];

    if (body.selectedModels.DALLE) {
      const dalleImage = await getDALLEImage(body.prompt);
      images.push({ image: dalleImage, model: MODELS.DALLE });
    }

    if (body.selectedModels.GEMINI) {
      const geminiImage = await getGeminiImage(body.prompt);
      images.push({ image: geminiImage, model: MODELS.GEMINI });
    }

    return NextResponse.json({ status: "success", images });
  } catch (error) {
    console.error("Error generating images:", error);
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 }
    );
  }
}

async function getGeminiImage(prompt: string): Promise<string> {
  // const model = googleAI.getGenerativeModel({
  //   model: "gemini-2.0-flash-exp-image-generation",
  //   generationConfig: {
  //     responseModalities: ["Text", "Image"],
  //   },
  // });
  // const result = await model.generateContent(prompt);\
  const response = await ai.models.generateImages({
    model: "imagen-3.0-generate-002",
    prompt,
    config: {
      numberOfImages: 1,
      includeRaiReason: true,
    },
  });

  // const imageData = result.response.candidates
  //   ? result.response.candidates[0].content.parts
  //   : [];
  // let image = "";
  // console.log(imageData);
  // for (const part of imageData) {
  //   if (part.inlineData) {
  //     image = part.inlineData.data;
  //   }
  // }
  return response?.generatedImages?.[0]?.image?.imageBytes || "";
}

async function getDALLEImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt,
    size: "1024x1024",
    quality: "standard",
    n: 1,
    response_format: "b64_json",
  });

  return response.data[0].b64_json || "";
}
