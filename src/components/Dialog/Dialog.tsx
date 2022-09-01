import { Text } from '@/components/Text';
import { useMergeRefs } from '@/utils/useMergeRefs';
import { forwardRef, ReactNode, useRef } from 'react';
import {
  FocusScope,
  useDialog,
  usePreventScroll,
  useOverlay,
  useModal,
  AriaOverlayProps,
} from 'react-aria';
import { overlay, underlay } from './Dialog.css';

type DialogProps = {
  title: string;
  children?: ReactNode;
} & AriaOverlayProps;

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ title, isDismissable, isOpen, onClose, children }, ref) => {
    usePreventScroll();
    const internalOverlayRef = useRef<HTMLDivElement>(null);
    const overlayRef = useMergeRefs(internalOverlayRef, ref);

    const { overlayProps, underlayProps } = useOverlay(
      {
        onClose,
        isOpen,
        isDismissable,
      },
      internalOverlayRef
    );

    const { modalProps } = useModal();

    // Get props for the dialog and its title
    const { dialogProps, titleProps } = useDialog({}, internalOverlayRef);

    return (
      <div className={underlay} {...underlayProps}>
        <FocusScope contain restoreFocus autoFocus>
          <div
            {...overlayProps}
            {...modalProps}
            {...dialogProps}
            ref={overlayRef}
            className={overlay}
          >
            <Text as="h3" type="heading" size="large" {...titleProps}>
              {title}
            </Text>
            {children}
          </div>
        </FocusScope>
      </div>
    );
  }
);
Dialog.displayName = 'Dialog';
