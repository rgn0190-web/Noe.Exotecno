import React, { useRef, useEffect } from 'react';
import { CalculatorMode, AngleUnit, NumberFormat } from '../types';
import { Battery } from 'lucide-react';

interface DisplayProps {
  expression: string;
  result: string;
  mode: CalculatorMode;
  angleUnit: AngleUnit;
  numberFormat: NumberFormat;
  cursorPos: number;
}

export const Display: React.FC<DisplayProps> = ({ expression, result, mode, angleUnit, numberFormat, cursorPos }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [expression, result]);

  const getAngleBadge = () => {
    switch (angleUnit) {
      case AngleUnit.DEG: return 'D';
      case AngleUnit.RAD: return 'R';
      case AngleUnit.GRA: return 'G';
      default: return 'D';
    }
  };

  const getFormatBadge = () => {
    switch (numberFormat) {
      case NumberFormat.SCI: return 'SCI';
      case NumberFormat.NORM: return 'NORM';
      default: return '';
    }
  };

  return (
    <div className="bg-[#87CEEB] w-full h-40 rounded-t-lg border-4 border-[#39FF14] shadow-inner flex flex-col relative overflow-hidden font-mono">
      {/* Status Bar */}
      <div className="bg-[#333] text-white text-[10px] px-2 py-0.5 flex justify-between items-center w-full h-6 shrink-0 z-20">
        <div className="flex gap-2 font-bold tracking-wider items-center">
          <span className="bg-yellow-500 text-black px-1 rounded-[1px] min-w-[14px] text-center">{getAngleBadge()}</span>
          {numberFormat === NumberFormat.SCI && (
             <span className="bg-white text-black px-1 rounded-[1px] text-[9px]">{getFormatBadge()}</span>
          )}
          <span>Math</span>
        </div>
        <div className="flex gap-2 opacity-80">
           <span>{mode}</span>
           <Battery size={12} />
        </div>
      </div>

      {/* Main Calculation Area */}
      <div className="flex-1 p-3 flex flex-col justify-between relative text-black z-10">
        {/* Input Line - Larger and Darker */}
        <div 
          ref={scrollRef}
          className="text-4xl font-semibold tracking-wide whitespace-nowrap overflow-x-auto scrollbar-hide w-full h-16 flex items-center text-black"
        >
           {expression || "0"}
           {/* Blinking Cursor simulation */}
           <span className="animate-pulse w-1 h-8 bg-black ml-1 inline-block align-middle"></span>
        </div>

        {/* Result Line - Larger and Darker */}
        <div className="text-right w-full h-12 overflow-hidden flex items-end justify-end">
          {result && (
            <span className="text-3xl font-bold text-black">{result}</span>
          )}
        </div>
      </div>
      
      {/* Decorative scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};