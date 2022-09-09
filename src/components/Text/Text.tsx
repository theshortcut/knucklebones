import { clsx } from 'clsx';
import { createComponent, createElement } from '@/utils/system';
import { ReactNode } from 'react';
import { text, TextVariants } from './Text.css';

export type TextProps = {
  as?: 'div';
  children?: ReactNode;
} & TextVariants;

export const Text = createComponent<TextProps>(
  ({ size, textAlign, type, className: customClassName, ...props }) => {
    const className = clsx(text({ size, textAlign, type }), customClassName);
    return createElement('div', { className, ...props });
  }
);
