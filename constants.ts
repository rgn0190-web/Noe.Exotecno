import { ButtonType } from './types';

export const VALID_KEYS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '.', '+', '-', '*', '/', '(', ')', 'Enter', 'Backspace', 'Escape', '^', 's', 'c', 't'
];

export const FUNCTION_REPLACEMENTS: Record<string, string> = {
  '×': '*',
  '÷': '/',
  'π': 'PI',
  '√': 'sqrt',
  '^': 'pow',
  'sin': 'sin',
  'cos': 'cos',
  'tan': 'tan',
  'log': 'log10',
  'ln': 'log',
  'Ans': 'ans'
};