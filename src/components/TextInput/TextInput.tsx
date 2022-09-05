import { forwardRef, HTMLProps } from 'react';
import { textInput } from './TextInput.css';

type TextInputProps = HTMLProps<HTMLInputElement>;
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => (
    <input type="text" className={textInput} ref={ref} {...props} />
  )
);

TextInput.displayName = 'TextInput';
