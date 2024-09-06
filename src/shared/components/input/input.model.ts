export type Validity =
  | 'valueMissing'
  | 'typeMismatch'
  | 'patternMismatch'
  | 'tooLong'
  | 'tooShort'
  | 'rangeUnderflow'
  | 'rangeOverflow'
  | 'stepMismatch'
  | 'badInput'
  | 'valid';

export interface IInputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  validation?: { [key in Validity]?: string };
}
