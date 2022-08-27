/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactElement, forwardRef, ElementType } from 'react';
import { Component, HTMLProps, Options, Props, RenderProp } from './types';

function isRenderProp(children: any): children is RenderProp {
  return typeof children === 'function';
}

/**
 * Creates a type-safe component with the `as` prop and `React.forwardRef`.
 *
 * @example
 * import { createComponent } from "@/utils/system";
 *
 * type Props = {
 *   as?: "div";
 *   customProp?: boolean;
 * };
 *
 * const Component = createComponent<Props>(({ customProp, ...props }) => {
 *   return <div {...props} />;
 * });
 *
 * <Component as="button" customProp />
 */
export function createComponent<O extends Options>(
  render: (props: Props<O>) => ReactElement
) {
  const Role = (props: Props<O>, ref: React.Ref<any>) =>
    render({ ref, ...props });
  return forwardRef(Role) as unknown as Component<O>;
}

/**
 * Creates a React element that supports the `as` prop, children as a
 * function (render props) and a `wrapElement` function.
 *
 * @example
 * import { createElement } from "@/utils/system";
 *
 * function Component() {
 *   const props = {
 *     as: "button" as const,
 *     children: (htmlProps) => <button {...htmlProps} />,
 *     wrapElement: (element) => <div>{element}</div>,
 *   };
 *   return createElement("div", props);
 * }
 */
export function createElement(Type: ElementType, props: HTMLProps<Options>) {
  const { as: As, wrapElement, ...rest } = props;
  let element: ReactElement;
  const { children, ...otherProps } = rest;
  if (As && typeof As !== 'string') {
    element = <As {...rest} />;
  } else if (isRenderProp(children)) {
    element = children(otherProps) as ReactElement;
  } else if (As) {
    element = <As {...rest} />;
  } else {
    element = <Type {...rest} />;
  }
  if (wrapElement) {
    return wrapElement(element);
  }
  return element;
}
