'use client';

import { useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompts: string[]) => void;
  loading: boolean;
}

export default function PromptInput({ onSubmit, loading }: PromptInputProps) {
  const [promptsText, setPromptsText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const prompts = promptsText
      .split('\n')
      .map(prompt => prompt.trim())
      .filter(prompt => prompt.length > 0);

    if (prompts.length === 0) {
      alert('Please enter at least one prompt');
      return;
    }

    onSubmit(prompts);
  };

  const examplePrompts = `A serene mountain lake at sunset
A cyberpunk cityscape with neon lights
A magical forest with glowing mushrooms`;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Image Prompt Generator
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompts" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your image prompts (one per line):
          </label>
          <textarea
            id="prompts"
            value={promptsText}
            onChange={(e) => setPromptsText(e.target.value)}
            placeholder={examplePrompts}
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !promptsText.trim()}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition duration-200"
        >
          {loading ? 'Generating...' : 'Generate Variations'}
        </button>
      </form>
    </div>
  );
}