export interface Variation {
  prompt: string;
  imageUrl?: string;
}

export interface PromptVariation {
  id: string;
  originalPrompt: string;
  variations: Variation[];
  status: 'pending' | 'generating' | 'completed' | 'error';
  error?: string;
}

export interface GenerationRequest {
  prompts: string[];
}

export interface GenerationResponse {
  variations: PromptVariation[];
}
