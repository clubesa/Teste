
import { GoogleGenAI } from "@google/genai";
import type { AspectRatio } from '../types';

export async function generateImages(prompt: string, aspectRatio: AspectRatio): Promise<string[]> {
  if (!process.env.API_KEY) {
    throw new Error("A chave da API não está configurada nas variáveis de ambiente.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `Arte digital vibrante e inspiradora, com estilo lúdico e educativo, para uma EdTech: ${prompt}`,
      config: {
        numberOfImages: 2,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages.map(img => {
        const base64ImageBytes: string = img.image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao gerar imagens:", error);
    if (error instanceof Error) {
        return Promise.reject(new Error(`Falha ao gerar imagens: ${error.message}`));
    }
    return Promise.reject(new Error("Ocorreu um erro desconhecido ao gerar as imagens."));
  }
}
