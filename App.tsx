
import React, { useState, useEffect } from 'react';
import { Display } from './components/Display';
import { Keypad } from './components/Keypad';
import { AiModal } from './components/AiModal';
import { MenuModal } from './components/MenuModal';
import { SettingsModal } from './components/SettingsModal';
import { evaluateExpression, formatNumber } from './utils/calculatorEngine';
import { solveWithAI } from './services/geminiService';
import { playClickSound } from './utils/audio';
import { CalculatorMode, AngleUnit, ThemeColor, NumberFormat } from './types';
import { RotateCw, Minus, Maximize, Monitor } from 'lucide-react';

export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [ans, setAns] = useState(0);
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.COMP);
  const [angleUnit, setAngleUnit] = useState<AngleUnit>(AngleUnit.DEG);
  const [numberFormat, setNumberFormat] = useState<NumberFormat>(NumberFormat.NORM);
  const [theme, setTheme] = useState<ThemeColor>('dark');
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // New state for "Minimize"
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // AI State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState('');

  const triggerSound = () => {
    if (soundEnabled) {
      playClickSound();
    }
  };

  const handleInput = (val: string) => {
    triggerSound();
    
    // Logic for handling input after a calculation result is displayed
    if (result) {
        // If the user presses an arithmetic operator, continue calculation using 'Ans'
        if (['+', '-', '×', '÷', '^', '%'].includes(val)) {
             setExpression(`Ans${val}`);
             setResult('');
             return;
        }

        // For any other input (Numbers, Functions, Parentheses), start a fresh expression
        // This mimics standard calculator behavior where typing a new number clears the previous result
        setExpression(val);
        setResult('');
        return;
    }

    setExpression(prev => prev + val);
  };

  const handleFormatToggle = () => {
    const newFormat = numberFormat === NumberFormat.NORM ? NumberFormat.SCI : NumberFormat.NORM;
    setNumberFormat(newFormat);
    
    if (result) {
       setResult(formatNumber(ans, newFormat));
    }
  };

  const handleAction = async (action: string) => {
    triggerSound();
    switch (action) {
      case 'AC':
        setExpression('');
        setResult('');
        break;
      case 'DEL':
        setResult(''); // Clear result if visible to show the expression being edited
        setExpression(prev => prev.slice(0, -1));
        break;
      case 'EXE':
        handleCalculate();
        break;
      case 'OK':
        handleCalculate();
        break;
      case 'HOME':
        setIsMenuOpen(true);
        break;
      case 'AI_HELP':
        handleAiHelp();
        break;
      case 'SETTINGS':
        setIsSettingsOpen(true);
        break;
      case 'FORMAT':
        handleFormatToggle();
        break;
      case 'BACK':
        setIsMenuOpen(false);
        setIsSettingsOpen(false);
        break;
    }
  };

  const handleCalculate = () => {
    if (!expression) return;
    
    if (mode === CalculatorMode.AI_CHAT) {
        handleAiHelp();
        return;
    }

    const res = evaluateExpression(expression, ans, angleUnit, numberFormat);
    setResult(res);
    if (!isNaN(parseFloat(res))) {
      setAns(parseFloat(res));
    }
  };

  const handleModeSelect = (newMode: CalculatorMode) => {
    setMode(newMode);
    setIsMenuOpen(false);
    setExpression('');
    setResult('');
  };

  const handleAiHelp = async () => {
    setIsAiOpen(true);
    setAiLoading(true);
    
    const context = `Mode: ${mode}. Angle Unit: ${angleUnit}. Previous Result: ${result}. Current Expression: ${expression}`;
    const query = expression || result || "Help me with math.";
    
    const explanation = await solveWithAI(query, context);
    
    setAiContent(explanation);
    setAiLoading(false);
  };

  // Keyboard synchronization
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow Escape to close modals
      if (isAiOpen || isMenuOpen || isSettingsOpen) {
          if (e.key === 'Escape') {
              setIsAiOpen(false);
              setIsMenuOpen(false);
              setIsSettingsOpen(false);
          }
          return;
      }

      const key = e.key;
      
      // Numbers and Decimals
      if (/[0-9]/.test(key)) {
        e.preventDefault();
        handleInput(key);
      }
      if (key === '.') {
        e.preventDefault();
        handleInput('.');
      }

      // Operators
      if (['+', '-', '*', '/', '(', ')', '^', '%'].includes(key)) {
         e.preventDefault();
         let val = key;
         if (key === '*') val = '×';
         if (key === '/') val = '÷';
         handleInput(val);
      }

      // Actions
      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleAction('EXE');
      }
      if (key === 'Backspace') {
        e.preventDefault();
        handleAction('DEL');
      }
      if (key === 'Delete' || key === 'Escape') {
        e.preventDefault();
        handleAction('AC');
      }

      // Advanced Shortcuts (Optional but nice for sync)
      if (key.toLowerCase() === 's') handleInput('sin(');
      if (key.toLowerCase() === 'c') handleInput('cos(');
      if (key.toLowerCase() === 't') handleInput('tan(');
      if (key.toLowerCase() === 'l') handleInput('log(');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression, result, isAiOpen, isMenuOpen, isSettingsOpen, soundEnabled]);

  const getThemeStyles = () => {
    const baseCase = "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"; 
    
    switch (theme) {
      case 'light':
        return {
          bg: 'bg-gray-100',
          case: 'bg-white border-gray-300',
          text: 'text-gray-500',
        };
      case 'blue':
        return {
          bg: 'bg-blue-50',
          case: 'bg-[#1e3a8a] border-blue-800',
          text: 'text-blue-200',
        };
      case 'gold':
        return {
          bg: 'bg-[#fffbeb]',
          case: 'bg-[#78350f] border-amber-900',
          text: 'text-amber-200',
        };
      case 'dark':
      default:
        return {
          bg: 'bg-gray-800',
          case: baseCase, 
          text: 'text-gray-300',
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className={`min-h-screen ${themeStyle.bg} flex items-center justify-center p-4 font-sans transition-all duration-500 overflow-x-hidden`}>
      
      {/* Calculator Body */}
      <div 
        className={`
          relative transition-all duration-500 ease-in-out
          ${isLandscape ? 'w-full max-w-[850px]' : 'w-full max-w-[360px]'}
          ${themeStyle.case} 
          rounded-[30px] shadow-calc p-4 sm:p-5 flex flex-col border-2 
          ${isMinimized ? 'h-auto overflow-hidden' : ''}
        `}
      >
        
        {/* Brand Header & Controls */}
        <div className="flex justify-between items-center mb-4 px-2">
            {/* Left: Brand + Rotate */}
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsLandscape(!isLandscape)}
                  className={`
                    p-1.5 rounded-full border border-gray-600 bg-gray-800 text-gray-300 
                    hover:text-white hover:bg-gray-700 hover:border-white transition-all
                    active:scale-95 shadow-lg
                  `}
                  title="Rotate / Girar"
                >
                  <RotateCw size={16} className={isLandscape ? "rotate-90 transition-transform" : "transition-transform"} />
                </button>
                <div className={`${themeStyle.text} font-bold text-lg tracking-widest transition-colors duration-500 font-sans italic`}>
                  Exotecno
                </div>
            </div>

            {/* Right: Window Controls (Minimize / Expand) */}
            <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title={isMinimized ? "Restore" : "Minimize"}
                >
                  <Minus size={20} />
                </button>
                <button 
                  onClick={() => setIsLandscape(!isLandscape)}
                  className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Expand / Maximize"
                >
                  <Maximize size={18} />
                </button>
            </div>
        </div>

        {/* Display Screen */}
        <Display 
          expression={expression} 
          result={result} 
          mode={mode} 
          angleUnit={angleUnit}
          numberFormat={numberFormat}
          cursorPos={expression.length} 
        />

        {/* Keypad Area - Collapsible */}
        <div className={`
            mt-4 bg-[#8B0000] rounded-[20px] p-2 sm:p-3 border-2 border-[#39FF14] shadow-inner 
            flex-1 flex flex-col transition-all duration-500 overflow-hidden
            ${isMinimized ? 'max-h-0 opacity-0 mt-0 p-0 border-0' : 'max-h-[800px] opacity-100'}
        `}>
           <Keypad 
             onInput={handleInput} 
             onAction={handleAction} 
             onModeChange={() => {}} 
             isLandscape={isLandscape}
           />
        </div>

        {/* Solar Panel Fake - Hidden when minimized for cleaner look */}
        {!isMinimized && (
            <div className="absolute top-5 right-20 w-12 h-4 bg-[#38332a] rounded border border-gray-600 opacity-80 grid grid-cols-4 gap-[1px] overflow-hidden shadow-inner hidden sm:grid">
                <div className="bg-[#4a4136]"></div><div className="bg-[#4a4136]"></div>
                <div className="bg-[#4a4136]"></div><div className="bg-[#4a4136]"></div>
            </div>
        )}

        {/* Menu Modal Overlay */}
        <MenuModal 
           isOpen={isMenuOpen} 
           onClose={() => setIsMenuOpen(false)} 
           onSelectMode={handleModeSelect}
           currentMode={mode}
        />

        {/* Settings Modal Overlay */}
        <SettingsModal 
           isOpen={isSettingsOpen} 
           onClose={() => setIsSettingsOpen(false)} 
           angleUnit={angleUnit}
           onSelectAngleUnit={setAngleUnit}
           theme={theme}
           onSelectTheme={setTheme}
           numberFormat={numberFormat}
           onSelectNumberFormat={setNumberFormat}
           soundEnabled={soundEnabled}
           onToggleSound={setSoundEnabled}
        />

      </div>

      {/* AI Modal Overlay - Appears over everything */}
      <AiModal 
        isOpen={isAiOpen} 
        onClose={() => setIsAiOpen(false)} 
        loading={aiLoading} 
        content={aiContent} 
      />

    </div>
  );
}
