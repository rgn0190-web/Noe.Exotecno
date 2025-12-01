import React from 'react';
import { Calculator, BarChart3, Table, Sparkles, X } from 'lucide-react';
import { CalculatorMode } from '../types';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: CalculatorMode) => void;
  currentMode: CalculatorMode;
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, onSelectMode, currentMode }) => {
  if (!isOpen) return null;

  const modes = [
    { id: CalculatorMode.COMP, icon: Calculator, label: 'Calculate', color: 'text-gray-700' },
    { id: CalculatorMode.STAT, icon: BarChart3, label: 'Statistics', color: 'text-green-600' },
    { id: CalculatorMode.TABLE, icon: Table, label: 'Table', color: 'text-purple-600' },
    { id: CalculatorMode.AI_CHAT, icon: Sparkles, label: 'AI Tutor', color: 'text-blue-600' },
  ];

  return (
    <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[1px] flex items-center justify-center rounded-[30px] p-4 animate-in fade-in duration-200">
      <div className="bg-gray-100 w-full max-w-[280px] rounded-xl shadow-2xl overflow-hidden border border-gray-300 flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1f2937] text-white px-4 py-2 flex justify-between items-center shadow-md">
          <span className="font-bold tracking-wider text-sm">MENU</span>
          <button 
            onClick={onClose}
            className="hover:bg-gray-700 rounded p-1 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Grid */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectMode(m.id)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all active:scale-95 h-24
                ${currentMode === m.id 
                  ? 'border-blue-500 bg-blue-50 shadow-inner' 
                  : 'border-white bg-white shadow-sm hover:border-gray-300'
                }
              `}
            >
              <div className={`mb-2 ${m.color}`}>
                <m.icon size={28} strokeWidth={1.5} />
              </div>
              <span className={`text-[10px] font-bold uppercase ${currentMode === m.id ? 'text-blue-800' : 'text-gray-600'}`}>
                {m.label}
              </span>
            </button>
          ))}
        </div>
        
        {/* Footer */}
        <div className="px-4 py-2 bg-gray-200 text-[10px] text-gray-500 text-center border-t border-gray-300">
          Select App Icon
        </div>
      </div>
    </div>
  );
};