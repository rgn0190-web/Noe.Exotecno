import React from 'react';
import { Button } from './Button';
import { ButtonType } from '../types';
import { 
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, 
  Settings, Home, List
} from 'lucide-react';

interface KeypadProps {
  onInput: (val: string) => void;
  onAction: (action: string) => void;
  onModeChange: () => void;
  isLandscape?: boolean;
}

export const Keypad: React.FC<KeypadProps> = ({ onInput, onAction, onModeChange, isLandscape = false }) => {
  
  const handleNav = (dir: string) => {
    // Nav logic could be implemented to move cursor
    console.log("Nav", dir);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 pt-2">
      
      {/* --- Top Navigation Zone --- */}
      <div className={`grid ${isLandscape ? 'grid-cols-8' : 'grid-cols-4'} gap-2 mb-1 px-1`}>
        {/* Basic Nav Buttons */}
        <button onClick={() => onAction('HOME')} className="flex flex-col items-center justify-center text-white/80 hover:text-white">
          <div className="w-10 h-6 rounded-full bg-gray-300 mb-1 flex items-center justify-center shadow-sm hover:bg-gray-400 transition-colors">
            <Home size={14} className="text-gray-700"/>
          </div>
          <span className="text-[9px] font-bold">HOME</span>
        </button>
        
        <button onClick={() => onAction('SETTINGS')} className="flex flex-col items-center justify-center text-white/80 hover:text-white">
          <div className="w-10 h-6 rounded-full bg-gray-300 mb-1 flex items-center justify-center shadow-sm hover:bg-gray-400 transition-colors">
            <Settings size={14} className="text-gray-700"/>
          </div>
          <span className="text-[9px] font-bold">SETTINGS</span>
        </button>

        {/* Replaced BACK with FORMAT as requested */}
        <button onClick={() => onAction('FORMAT')} className="flex flex-col items-center justify-center text-white/80 hover:text-white">
          <div className="w-10 h-6 rounded-full bg-gray-300 mb-1 flex items-center justify-center shadow-sm hover:bg-gray-400 transition-colors">
            <List size={14} className="text-gray-700"/>
          </div>
          <span className="text-[9px] font-bold">FORMAT</span>
        </button>

        <button onClick={() => onAction('AI_HELP')} className="flex flex-col items-center justify-center text-blue-200 hover:text-white group">
          <div className="w-10 h-6 rounded-full bg-blue-100 mb-1 flex items-center justify-center shadow-sm group-hover:bg-blue-200 transition-colors ring-1 ring-blue-300">
             <span className="text-[10px] font-bold text-blue-700">AI</span>
          </div>
          <span className="text-[9px] font-bold">TUTOR</span>
        </button>

        {isLandscape && (
            <>
                 {/* Placeholders for visual balance in landscape nav row */}
                 <div className="col-span-4"></div>
            </>
        )}
      </div>

      {/* --- D-Pad Container --- */}
      {/* In landscape, we float this or center it differently, but for now we keep it centered relative to container */}
      <div className="flex justify-center items-center py-1 mb-2">
         <div className="relative w-32 h-20">
            <div className="absolute inset-0 bg-gray-200 rounded-[30px] shadow-inner border border-gray-300"></div>
            <button 
              onClick={() => onAction('OK')}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[10px] font-bold hover:bg-gray-50 active:scale-95 text-black"
            >
              OK
            </button>
            <button className="absolute top-1 left-1/2 -translate-x-1/2 text-gray-600 hover:text-black p-1 active:scale-90" onClick={() => handleNav('UP')}><ChevronUp size={16}/></button>
            <button className="absolute bottom-1 left-1/2 -translate-x-1/2 text-gray-600 hover:text-black p-1 active:scale-90" onClick={() => handleNav('DOWN')}><ChevronDown size={16}/></button>
            <button className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black p-1 active:scale-90" onClick={() => handleNav('LEFT')}><ChevronLeft size={16}/></button>
            <button className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black p-1 active:scale-90" onClick={() => handleNav('RIGHT')}><ChevronRight size={16}/></button>
         </div>
      </div>

      {isLandscape ? (
        // LANDSCAPE GRID
        <div className="grid grid-cols-8 gap-2 px-2 pb-2">
            {/* Extended Scientific Block */}
            <Button label="∫" secondary="d/dx" type={ButtonType.FUNCTION} onClick={() => onInput('∫(')} />
            <Button label="x!" secondary="nPr" type={ButtonType.FUNCTION} onClick={() => onInput('!')} />
            <Button label="log" secondary="10ⁿ" type={ButtonType.FUNCTION} onClick={() => onInput('log(')} />
            <Button label="ln" secondary="eⁿ" type={ButtonType.FUNCTION} onClick={() => onInput('ln(')} />
            {/* Standard Func Block moved here */}
            <Button label="x" secondary="calc" type={ButtonType.FUNCTION} onClick={() => onInput('x')} />
            <Button label="sin" secondary="sin⁻¹" type={ButtonType.FUNCTION} onClick={() => onInput('sin(')} />
            <Button label="cos" secondary="cos⁻¹" type={ButtonType.FUNCTION} onClick={() => onInput('cos(')} />
            <Button label="tan" secondary="tan⁻¹" type={ButtonType.FUNCTION} onClick={() => onInput('tan(')} />

            {/* Row 2 Ext */}
            <Button label="Σ" secondary="Π" type={ButtonType.FUNCTION} onClick={() => onInput('sum(')} />
            <Button label="Abs" secondary="" type={ButtonType.FUNCTION} onClick={() => onInput('Abs(')} />
            <Button label="(" secondary="" type={ButtonType.FUNCTION} onClick={() => onInput('(')} />
            <Button label=")" secondary="" type={ButtonType.FUNCTION} onClick={() => onInput(')')} />
            <Button label="√" secondary="x²" type={ButtonType.FUNCTION} onClick={() => onInput('√(')} />
            <Button label="x²" secondary="x³" type={ButtonType.FUNCTION} onClick={() => onInput('^2')} />
            <Button label="x⁻¹" secondary="" type={ButtonType.FUNCTION} onClick={() => onInput('^(-1)')} />
            <Button label="DEL" secondary="INS" type={ButtonType.ACTION} className="bg-[#5c7cfa]" onClick={() => onAction('DEL')} />

            {/* Row 3 - Numpad + Complex */}
            <Button label="Hyp" secondary="" type={ButtonType.FUNCTION} onClick={() => onInput('hyp(')} />
            <Button label="Sto" secondary="" type={ButtonType.FUNCTION} onClick={() => onInput('sto')} />
            <Button label="7" type={ButtonType.NUMBER} onClick={() => onInput('7')} />
            <Button label="8" type={ButtonType.NUMBER} onClick={() => onInput('8')} />
            <Button label="9" type={ButtonType.NUMBER} onClick={() => onInput('9')} />
            <Button label="×" type={ButtonType.OPERATOR} onClick={() => onInput('×')} />
            <Button label="÷" type={ButtonType.OPERATOR} onClick={() => onInput('÷')} />
            <Button label="ENG" type={ButtonType.FUNCTION} onClick={() => onInput('E')} />

            {/* Row 4 */}
            <Button label="i" secondary="∠" type={ButtonType.FUNCTION} onClick={() => onInput('i')} />
            <Button label="%" secondary="" type={ButtonType.FUNCTION} onClick={() => onInput('%')} />
            <Button label="4" type={ButtonType.NUMBER} onClick={() => onInput('4')} />
            <Button label="5" type={ButtonType.NUMBER} onClick={() => onInput('5')} />
            <Button label="6" type={ButtonType.NUMBER} onClick={() => onInput('6')} />
            <Button label="+" type={ButtonType.OPERATOR} onClick={() => onInput('+')} />
            <Button label="-" type={ButtonType.OPERATOR} onClick={() => onInput('-')} />
            <Button label="S⇔D" type={ButtonType.FUNCTION} onClick={() => onAction('FORMAT')} />

            {/* Row 5 */}
            <Button label="Ran#" secondary="RanInt" type={ButtonType.FUNCTION} onClick={() => onInput('ran')} />
            <Button label="π" secondary="e" type={ButtonType.FUNCTION} onClick={() => onInput('π')} />
            <Button label="1" type={ButtonType.NUMBER} onClick={() => onInput('1')} />
            <Button label="2" type={ButtonType.NUMBER} onClick={() => onInput('2')} />
            <Button label="3" type={ButtonType.NUMBER} onClick={() => onInput('3')} />
            <Button label="Ans" type={ButtonType.OPERATOR} onClick={() => onInput('Ans')} />
            <Button label="EXP" type={ButtonType.OPERATOR} onClick={() => onInput('E')} />
            <Button label="AC" type={ButtonType.ACTION} onClick={() => onAction('AC')} />

             {/* Row 6 */}
            <Button label="" type={ButtonType.NAV} onClick={() => {}} /> {/* Spacer */}
            <Button label="" type={ButtonType.NAV} onClick={() => {}} /> {/* Spacer */}
            <Button label="0" type={ButtonType.NUMBER} onClick={() => onInput('0')} width={2} />
            <Button label="." type={ButtonType.NUMBER} onClick={() => onInput('.')} />
            <Button label="EXE" type={ButtonType.CONTROL} onClick={() => onAction('EXE')} width={3} />

        </div>
      ) : (
        // PORTRAIT GRID (Original)
        <>
            <div className="grid grid-cols-4 gap-2 px-2">
                <Button label="x" secondary="calc" type={ButtonType.FUNCTION} onClick={() => onInput('x')} />
                <Button label="sin" secondary="sin⁻¹" type={ButtonType.FUNCTION} onClick={() => onInput('sin(')} />
                <Button label="cos" secondary="cos⁻¹" type={ButtonType.FUNCTION} onClick={() => onInput('cos(')} />
                <Button label="tan" secondary="tan⁻¹" type={ButtonType.FUNCTION} onClick={() => onInput('tan(')} />
                
                <Button label="(" secondary="" type={ButtonType.FUNCTION} onClick={() => onInput('(')} />
                <Button label=")" secondary="" type={ButtonType.FUNCTION} onClick={() => onInput(')')} />
                <Button label="√" secondary="x²" type={ButtonType.FUNCTION} onClick={() => onInput('√(')} />
                <Button label="ln" secondary="eⁿ" type={ButtonType.FUNCTION} onClick={() => onInput('ln(')} />
            </div>

            <div className="grid grid-cols-4 gap-2 mt-2 px-2 pb-2">
                <Button label="7" type={ButtonType.NUMBER} onClick={() => onInput('7')} />
                <Button label="8" type={ButtonType.NUMBER} onClick={() => onInput('8')} />
                <Button label="9" type={ButtonType.NUMBER} onClick={() => onInput('9')} />
                <Button label="DEL" secondary="INS" type={ButtonType.ACTION} className="bg-[#5c7cfa]" onClick={() => onAction('DEL')} />

                <Button label="4" type={ButtonType.NUMBER} onClick={() => onInput('4')} />
                <Button label="5" type={ButtonType.NUMBER} onClick={() => onInput('5')} />
                <Button label="6" type={ButtonType.NUMBER} onClick={() => onInput('6')} />
                <Button label="×" type={ButtonType.OPERATOR} onClick={() => onInput('×')} />

                <Button label="1" type={ButtonType.NUMBER} onClick={() => onInput('1')} />
                <Button label="2" type={ButtonType.NUMBER} onClick={() => onInput('2')} />
                <Button label="3" type={ButtonType.NUMBER} onClick={() => onInput('3')} />
                <Button label="÷" type={ButtonType.OPERATOR} onClick={() => onInput('÷')} />

                <Button label="0" type={ButtonType.NUMBER} onClick={() => onInput('0')} />
                <Button label="." type={ButtonType.NUMBER} onClick={() => onInput('.')} />
                <Button label="Ans" type={ButtonType.OPERATOR} onClick={() => onInput('Ans')} />
                <Button label="+" type={ButtonType.OPERATOR} onClick={() => onInput('+')} />

                <Button label="AC" type={ButtonType.ACTION} onClick={() => onAction('AC')} />
                <Button label="-" type={ButtonType.OPERATOR} onClick={() => onInput('-')} />
                <Button label="EXP" type={ButtonType.OPERATOR} onClick={() => onInput('E')} />
                <Button label="EXE" type={ButtonType.CONTROL} onClick={() => onAction('EXE')} />
            </div>
        </>
      )}

    </div>
  );
};