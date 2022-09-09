import { createComponent, createElement } from '@/utils/system';
import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { flex, FlexVariants } from './Flex.css';

export type FlexProps = {
  as?: 'div';
  children?: ReactNode;
} & FlexVariants;

export const Flex = createComponent<FlexProps>(
  ({
    alignItems,
    justifyContent,
    flexDirection,
    gap,
    placeItems,
    padding,
    className: customClassName,
    ...props
  }) => {
    const className = clsx(
      flex({
        alignItems,
        justifyContent,
        flexDirection,
        gap,
        placeItems,
        padding,
      }),
      customClassName
    );
    return createElement('div', { className, ...props });
  }
);
