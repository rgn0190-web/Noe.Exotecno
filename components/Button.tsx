import React from 'react';
import { ButtonType, CalculatorButtonProps } from '../types';

export const Button: React.FC<CalculatorButtonProps> = ({ 
  label, 
  secondary, 
  type, 
  onClick, 
  className = '',
  width = 1
}) => {
  
  // Added border-2 border-[#39FF14] for the fluorescent green frame
  const baseStyles = "relative flex items-center justify-center font-medium transition-all active:scale-[0.96] select-none rounded-[10px] shadow-btn active:shadow-btn-active border-2 border-[#39FF14]";
  
  let colorStyles = "";
  let textStyles = "text-lg";

  switch (type) {
    case ButtonType.NUMBER:
      colorStyles = "bg-white text-gray-900 hover:bg-gray-50";
      textStyles = "text-xl font-bold font-sans";
      break;
    case ButtonType.OPERATOR:
      colorStyles = "bg-gray-200 text-gray-900 hover:bg-gray-300";
      break;
    case ButtonType.ACTION: // AC, DEL
      colorStyles = "bg-[#4a6fa5] text-white hover:bg-[#3d5d8a]"; // Blueish for functional actions
      break;
    case ButtonType.CONTROL: // OK, Cursor
      colorStyles = "bg-gray-100 text-gray-800 hover:bg-gray-200";
      break;
    case ButtonType.FUNCTION: // sin, cos, etc
      colorStyles = "bg-gray-800 text-white hover:bg-gray-700";
      textStyles = "text-sm font-semibold";
      break;
    case ButtonType.NAV:
       colorStyles = "bg-transparent text-gray-600 hover:bg-gray-200 shadow-none border-none"; // Removed border for Nav text items
       break;
  }

  // Override for Enter/Exe key
  if (label === 'EXE') {
    colorStyles = "bg-gray-800 text-white hover:bg-black";
  }
  
  if (label === 'AC') {
      colorStyles = "bg-[#eca645] text-white hover:bg-[#d9963b]";
  }

  const widthClass = width > 1 ? `col-span-${width}` : '';

  return (
    <button 
      className={`${baseStyles} ${colorStyles} ${textStyles} ${widthClass} ${className} h-10 sm:h-12`}
      onClick={onClick}
    >
      {secondary && (
        <span className="absolute top-0.5 left-1 text-xs font-bold text-[#00FFFF] z-10 shadow-black drop-shadow-md">
          {secondary}
        </span>
      )}
      {label}
    </button>
  );
};