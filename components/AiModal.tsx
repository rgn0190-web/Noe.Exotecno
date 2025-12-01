import React from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  content: string;
}

export const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose, loading, content }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-black/20 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="bg-white w-full h-[85%] sm:h-[80%] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-300" />
            <h2 className="font-bold text-lg">AI Math Tutor</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
              <Loader2 size={40} className="animate-spin text-blue-500" />
              <p className="text-sm font-medium animate-pulse">Thinking...</p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-gray-800">
              <div className="whitespace-pre-wrap font-sans leading-relaxed">
                {content}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-3 border-t bg-gray-100 text-center text-xs text-gray-500">
           Powered by Gemini 3.0 Pro
        </div>
      </div>
    </div>
  );
};