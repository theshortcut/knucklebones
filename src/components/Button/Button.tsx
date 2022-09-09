import { createComponent, createElement } from '@/utils/system';
import { ReactNode } from 'react';
import { button, ButtonVariants } from './Button.css';

export type ButtonProps = {
  as?: 'button';
  children?: ReactNode;
} & ButtonVariants;

export const Button = createComponent<ButtonProps>(
  ({ size, variant, ...props }) => {
    const className = button({ size, variant });
    return createElement('button', { className, ...props });
  }
);
