import { PromptVariation } from '@/src/app/types';

interface VariationDisplayProps {
  variations: PromptVariation[];
}

export default function VariationDisplay({ variations }: VariationDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {variations.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Original Prompt:
            </h3>
            <p className="text-gray-600 bg-gray-50 p-3 rounded">
              {item.originalPrompt}
            </p>
          </div>

          {item.status === 'error' ? (
            <div className="text-red-600 bg-red-50 p-3 rounded">
              Error: {item.error}
            </div>
          ) : (
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-3">
                Generated Variations:
              </h4>
              <div className="space-y-3">
                {item.variations.map((variation, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded"
                  >
                    <span className="text-blue-800 font-medium">
                      Variation {index + 1}:
                    </span>
                    <p className="text-gray-700 mt-1">{variation.prompt}</p>
                    {variation.imageUrl && (
                      <div className="mt-2">
                        <img src={variation.imageUrl} alt={`Variation ${index + 1}`} className="rounded-md" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
