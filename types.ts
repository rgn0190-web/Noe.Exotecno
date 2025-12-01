export enum ButtonType {
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
  ACTION = 'ACTION',
  FUNCTION = 'FUNCTION',
  NAV = 'NAV',
  CONTROL = 'CONTROL'
}

export enum CalculatorMode {
  COMP = 'Calculate',
  STAT = 'Statistics',
  TABLE = 'Table',
  AI_CHAT = 'AI Tutor'
}

export enum AngleUnit {
  DEG = 'DEG',
  RAD = 'RAD',
  GRA = 'GRA'
}

export enum NumberFormat {
  NORM = 'NORM',
  SCI = 'SCI'
}

export interface CalculatorButtonProps {
  label: string;
  secondary?: string; // Shift function
  type: ButtonType;
  onClick: () => void;
  className?: string;
  row?: number;
  col?: number;
  width?: number; // Span columns
}

export interface HistoryItem {
  expression: string;
  result: string;
}

export type ThemeColor = 'dark' | 'light' | 'blue' | 'gold';