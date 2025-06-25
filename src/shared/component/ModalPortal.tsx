import { useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalPortalProps = {
  children: (helpers: {
    overlayRef: React.RefObject<HTMLDivElement>;
  }) => ReactNode;
};

const ModalPortal = ({ children }: ModalPortalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null!);

  if (typeof window === 'undefined') return null;

  return createPortal(children({ overlayRef }), document.body);
};

export default ModalPortal;
