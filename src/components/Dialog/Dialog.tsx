import { ReactNode } from 'react';

type DialogProps = {
  isOpen: boolean;
  children?: ReactNode;
};
export const Dialog = ({
  isOpen,
  children,
}: DialogProps): JSX.Element | null => {
  return isOpen ? (
    <div role="dialog" aria-modal="true">
      {children}
    </div>
  ) : null;
};
