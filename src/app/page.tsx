'use client';

import { useState } from 'react';
import PromptInput from '@/src/app/components/PromptInput';
import VariationDisplay from '@/src/app/components/VariationDisplay';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';
import { PromptVariation } from '@/src/app/types';

export default function Home() {
  const [variations, setVariations] = useState<PromptVariation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateVariations = async (prompts: string[]) => {
    setLoading(true);
    setVariations([]);

    try {
      const response = await fetch('/api/generate-variations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompts }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate variations');
      }

      const data = await response.json();
      setVariations(data.variations);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate variations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Image Prompt Variation Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your image generation prompts and get 3 creative variations for each one using Gemini Pro AI.
          </p>
        </div>

        <div className="space-y-8">
          <PromptInput onSubmit={handleGenerateVariations} loading={loading} />
          
          {loading && <LoadingSpinner />}
          
          {variations.length > 0 && !loading && (
            <VariationDisplay variations={variations} />
          )}
        </div>
      </div>
    </main>
  );
}