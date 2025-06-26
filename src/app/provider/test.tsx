import { createPortal } from 'react-dom';
import { useRef, useState, type ReactNode } from 'react';

type ModalPortalProps = {
  children: (helpers: {
    onClose: () => void;
    isMounted: boolean;
    overlayRef: React.RefObject<HTMLDivElement>;
  }) => ReactNode;
};

const ModalPortal = ({ children }: ModalPortalProps) => {
  const [isMounted, setIsMounted] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null!);

  const onClose = () => {
    setIsMounted(false);
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    children({ onClose, isMounted, overlayRef }),
    document.body,
  );
};

export default ModalPortal;

<ModalPortal>
  {({ onClose, overlayRef }) => (
    <div ref={overlayRef} className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>이건 Render Props + 내부 제어 가능한 모달!</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  )}
</ModalPortal>;
