import { Overlay } from '@cpns/shared/Overlay';
import { DivProps } from '@shared/types';
import { FC } from 'react';
import { createPortal } from 'react-dom';

export const ConfirmBox: FC<DivProps> = ({ children, onClick }) => {
  return createPortal(
    <div className="flexcenter fullscreen z-[100]">
      <Overlay zIdx="1" background="bg-slate-700" onClick={onClick} />

      <div className="absolute top-48 z-[2] max-w-[80%] text-[5rem] text-white">
        <div
          className={`${
            '' || ''
          } scrollY max-h-[calc(100vh-15rem)] rounded-[3rem] bg-indigo-300 text-center font-bold text-rose-600`}
        >
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-container') as HTMLElement
  );
};
