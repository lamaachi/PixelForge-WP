import { GoogleGenerativeAI } from '@google/generative-ai';
import { Variation } from '../types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function generateImage(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image-preview' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // This is a placeholder for extracting the image URL from the response.
    // The actual implementation will depend on the response format of the image generation API.
    return `https://via.placeholder.com/150?text=Generated+Image`;
  } catch (error) {
    console.error('Error generating image:', error);
    return '';
  }
}

export async function generatePromptVariations(originalPrompt: string): Promise<Variation[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
Given this image generation prompt: "${originalPrompt}"

Create exactly 3 creative variations of this prompt that would generate similar but distinctly different images. Each variation should:
- Maintain the core concept and subject matter
- Add creative elements, different styles, or perspectives
- Be suitable for image generation AI
- Be concise but descriptive

Format your response as exactly 3 variations, one per line, without numbering or bullets:
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract the 3 variations
    const variations = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.match(/^\d+[\.\)]/)) // Remove numbered items
      .slice(0, 3); // Ensure we only get 3 variations

    // If we don't get exactly 3 variations, pad with modified versions
    while (variations.length < 3) {
      const baseVariation = variations[0] || originalPrompt;
      variations.push(`${baseVariation} with enhanced details and lighting`);
    }

    const finalVariations = variations.slice(0, 3);

    const imagePromises = finalVariations.map(p => generateImage(p));
    const imageUrls = await Promise.all(imagePromises);

    return finalVariations.map((p, i) => ({
      prompt: p,
      imageUrl: imageUrls[i]
    }));
  } catch (error) {
    console.error('Error generating variations:', error);
    throw new Error('Failed to generate prompt variations');
  }
}

export async function generateMultipleVariations(prompts: string[]): Promise<Map<string, Variation[]>> {
  const results = new Map<string, Variation[]>();

  // Process prompts in batches to avoid rate limiting
  const batchSize = 3;
  for (let i = 0; i < prompts.length; i += batchSize) {
    const batch = prompts.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async (prompt) => {
      try {
        const variations = await generatePromptVariations(prompt);
        return { prompt, variations };
      } catch (error) {
        console.error(`Error processing prompt "${prompt}":`, error);
        return { prompt, variations: [] };
      }
    });

    const batchResults = await Promise.all(batchPromises);
    
    batchResults.forEach(({ prompt, variations }) => {
      results.set(prompt, variations);
    });

    // Add delay between batches to respect rate limits
    if (i + batchSize < prompts.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}
