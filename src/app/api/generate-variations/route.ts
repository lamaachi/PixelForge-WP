import { NextRequest, NextResponse } from 'next/server';
import { generateMultipleVariations } from '../../libs/gemini';
import { PromptVariation } from '@/src/app/types';

export async function POST(request: NextRequest) {
  try {
    const { prompts }: { prompts: string[] } = await request.json();

    if (!prompts || !Array.isArray(prompts) || prompts.length === 0) {
      return NextResponse.json(
        { error: 'Invalid prompts array' },
        { status: 400 }
      );
    }

    // Validate prompts
    const validPrompts = prompts.filter(prompt => 
      typeof prompt === 'string' && prompt.trim().length > 0
    );

    if (validPrompts.length === 0) {
      return NextResponse.json(
        { error: 'No valid prompts provided' },
        { status: 400 }
      );
    }

    // Generate variations for all prompts
    const variationsMap = await generateMultipleVariations(validPrompts);

    // Format response
    const variations: PromptVariation[] = validPrompts.map((prompt, index) => {
      const variationResults = variationsMap.get(prompt) || [];
      return {
        id: `prompt-${index}`,
        originalPrompt: prompt,
        variations: variationResults,
        status: variationResults.length ? 'completed' : 'error',
        error: variationResults.length ? undefined : 'Failed to generate variations'
      };
    });

    return NextResponse.json({ variations });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
