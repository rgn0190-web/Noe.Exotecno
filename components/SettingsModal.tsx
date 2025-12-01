
import React from 'react';
import { AngleUnit, ThemeColor, NumberFormat } from '../types';
import { X, Settings, Check, Palette, Hash, Volume2, VolumeX } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  angleUnit: AngleUnit;
  onSelectAngleUnit: (unit: AngleUnit) => void;
  theme: ThemeColor;
  onSelectTheme: (theme: ThemeColor) => void;
  numberFormat: NumberFormat;
  onSelectNumberFormat: (fmt: NumberFormat) => void;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  angleUnit, 
  onSelectAngleUnit,
  theme,
  onSelectTheme,
  numberFormat,
  onSelectNumberFormat,
  soundEnabled,
  onToggleSound
}) => {
  if (!isOpen) return null;

  const angleOptions = [
    { id: AngleUnit.DEG, label: 'Degree (D)', desc: 'Degrees' },
    { id: AngleUnit.RAD, label: 'Radian (R)', desc: 'Radians' },
    { id: AngleUnit.GRA, label: 'Gradian (G)', desc: 'Gradians' },
  ];

  const formatOptions = [
    { id: NumberFormat.NORM, label: 'Normal (Norm)', desc: 'Standard' },
    { id: NumberFormat.SCI, label: 'Scientific (Sci)', desc: 'Scientific Notation' },
  ];

  const themeOptions: { id: ThemeColor; label: string; color: string }[] = [
    { id: 'dark', label: 'Classic Dark', color: 'bg-[#1f2937]' },
    { id: 'light', label: 'Modern Light', color: 'bg-gray-100 border border-gray-300' },
    { id: 'blue', label: 'Deep Blue', color: 'bg-[#1e3a8a]' },
    { id: 'gold', label: 'Prestige Gold', color: 'bg-[#78350f]' },
  ];

  return (
    <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[1px] flex items-center justify-center rounded-[30px] p-4 animate-in fade-in duration-200">
      <div className="bg-gray-100 w-full max-w-[280px] rounded-xl shadow-2xl overflow-hidden border border-gray-300 flex flex-col animate-in zoom-in-95 duration-200 max-h-[90%]">
        
        {/* Header */}
        <div className="bg-[#1f2937] text-white px-4 py-3 flex justify-between items-center shadow-md shrink-0">
          <div className="flex items-center gap-2">
             <Settings size={16} />
             <span className="font-bold tracking-wider text-sm">SETTINGS</span>
          </div>
          <button 
            onClick={onClose}
            className="hover:bg-gray-700 rounded p-1 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
            
            {/* Sound Section */}
            <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase px-2 py-1 mb-1 flex items-center gap-2">
                    {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
                    Key Tone
                </h3>
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => onToggleSound(!soundEnabled)}
                        className={`flex justify-between items-center px-3 py-3 rounded text-sm font-medium transition-colors ${
                            soundEnabled
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    >
                        <span>{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
                        {soundEnabled ? <Check size={14} /> : <X size={14} />}
                    </button>
                </div>
            </div>

            {/* Angle Unit Section */}
            <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase px-2 py-1 mb-1 flex items-center gap-2">
                    Angle Unit
                </h3>
                <div className="flex flex-col gap-1">
                    {angleOptions.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onSelectAngleUnit(opt.id)}
                            className={`flex justify-between items-center px-3 py-3 rounded text-sm font-medium transition-colors ${
                                angleUnit === opt.id 
                                ? 'bg-blue-600 text-white shadow-sm' 
                                : 'bg-white text-gray-800 hover:bg-gray-200'
                            }`}
                        >
                            <span>{opt.label}</span>
                            {angleUnit === opt.id && <Check size={14} />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Number Format Section */}
            <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase px-2 py-1 mb-1 flex items-center gap-2">
                    <Hash size={12} />
                    Number Format
                </h3>
                <div className="flex flex-col gap-1">
                    {formatOptions.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onSelectNumberFormat(opt.id)}
                            className={`flex justify-between items-center px-3 py-3 rounded text-sm font-medium transition-colors ${
                                numberFormat === opt.id 
                                ? 'bg-blue-600 text-white shadow-sm' 
                                : 'bg-white text-gray-800 hover:bg-gray-200'
                            }`}
                        >
                            <span>{opt.label}</span>
                            {numberFormat === opt.id && <Check size={14} />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Theme Section */}
            <div className="mb-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase px-2 py-1 mb-1 flex items-center gap-2">
                    <Palette size={12} />
                    Theme
                </h3>
                <div className="grid grid-cols-1 gap-1">
                    {themeOptions.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => onSelectTheme(t.id)}
                            className={`flex justify-between items-center px-3 py-3 rounded text-sm font-medium transition-all ${
                                theme === t.id
                                ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-500'
                                : 'bg-white text-gray-800 hover:bg-gray-200'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full shadow-sm ${t.color}`}></div>
                                <span>{t.label}</span>
                            </div>
                            {theme === t.id && <Check size={14} />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Footer */}
        <div className="px-4 py-2 bg-gray-200 text-[10px] text-gray-500 text-center border-t border-gray-300 shrink-0">
          Changes apply immediately
        </div>
      </div>
    </div>
  );
};
