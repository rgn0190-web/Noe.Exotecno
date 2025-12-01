import { FUNCTION_REPLACEMENTS } from '../constants';
import { AngleUnit, NumberFormat } from '../types';

export const formatNumber = (num: number, format: NumberFormat): string => {
  if (!isFinite(num) || isNaN(num)) return "Math Error";
  
  if (format === NumberFormat.SCI) {
    // Use exponential notation, e.g., 1.2345e+5
    // We adjust precision to avoid excessive digits in SCI mode
    return num.toExponential(5).replace(/\.?0+e/, 'e');
  } else {
    // Normal formatting: precision cleanup
    const precisionResult = parseFloat(num.toPrecision(10));
    return precisionResult.toString();
  }
};

export const evaluateExpression = (
  expression: string, 
  ans: number = 0, 
  angleUnit: AngleUnit = AngleUnit.DEG,
  format: NumberFormat = NumberFormat.NORM
): string => {
  try {
    if (!expression.trim()) return '';

    // Normalize symbols
    let parsed = expression;
    
    // Replace visual symbols with JS math operators
    parsed = parsed.replace(/×/g, '*').replace(/÷/g, '/');
    parsed = parsed.replace(/π/g, 'Math.PI');
    parsed = parsed.replace(/Ans/g, ans.toString());
    
    // Handle Abs
    parsed = parsed.replace(/Abs\(/g, 'Math.abs(');

    // Handle implicit multiplication (e.g., 2(3) -> 2*(3), 2sin(x) -> 2*sin(x))
    parsed = parsed.replace(/(\d)(\()/g, '$1*$2');
    parsed = parsed.replace(/(\d)([a-z])/g, '$1*$2');
    parsed = parsed.replace(/(\))(\d)/g, '$1*$2');
    parsed = parsed.replace(/(\))(\()/g, '$1*$2');

    // Determine trigonometric multiplier based on Angle Unit
    // Math.sin expects radians.
    // DEG: x * (PI/180)
    // GRA: x * (PI/200)
    // RAD: x
    let angleMult = '';
    if (angleUnit === AngleUnit.DEG) angleMult = '*(Math.PI/180)';
    if (angleUnit === AngleUnit.GRA) angleMult = '*(Math.PI/200)';
    
    // Scientific functions replacements
    parsed = parsed.replace(/√\(/g, 'Math.sqrt(');
    
    // For trig functions, we inject the conversion multiplier if needed.
    const trigPrefix = (func: string) => `Math.${func}(${angleMult ? `(${angleMult.replace('*', '')})*` : ''}`;

    if (angleUnit === AngleUnit.RAD) {
       parsed = parsed.replace(/sin\(/g, 'Math.sin(');
       parsed = parsed.replace(/cos\(/g, 'Math.cos(');
       parsed = parsed.replace(/tan\(/g, 'Math.tan(');
    } else {
       parsed = parsed.replace(/sin\(/g, trigPrefix('sin'));
       parsed = parsed.replace(/cos\(/g, trigPrefix('cos'));
       parsed = parsed.replace(/tan\(/g, trigPrefix('tan'));
    }

    parsed = parsed.replace(/log\(/g, 'Math.log10(');
    parsed = parsed.replace(/ln\(/g, 'Math.log(');

    // Factorial (simple implementation for small numbers)
    parsed = parsed.replace(/(\d+)!/g, (_, n) => {
      let num = parseInt(n);
      if (num > 170) return 'Infinity';
      let r = 1;
      for (let i = 2; i <= num; i++) r *= i;
      return r.toString();
    });

    // Power operator handling (^)
    if (parsed.includes('^')) {
        parsed = parsed.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, 'Math.pow($1, $2)');
    }
    
    // Safety check
    if (/[^0-9+\-*/().\sMathPIsqrt,logEabs]/.test(parsed.replace(/Math\.(sin|cos|tan|sqrt|log|log10|PI|pow|abs)/g, ''))) {
       throw new Error("Invalid Format");
    }

    // eslint-disable-next-line no-new-func
    const result = new Function(`"use strict"; return (${parsed})`)();
    
    if (!isFinite(result) || isNaN(result)) return "Math Error";
    
    return formatNumber(result, format);

  } catch (e) {
    console.error(e);
    return "Syntax Error";
  }
};