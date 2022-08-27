import { createComponent, createElement } from '@/utils/system';
import { ReactNode } from 'react';
import { text, TextVariants } from './Text.css';

export type TextProps = {
  as?: 'div';
  children?: ReactNode;
} & TextVariants;

export const Text = createComponent<TextProps>(
  ({ size, textAlign, type, ...props }) => {
    const className = text({ size, textAlign, type });
    return createElement('div', { className, ...props });
  }
);
