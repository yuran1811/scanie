import { Overlay } from '@cpns/shared/Overlay';
import { DivProps } from '@shared/types';
import { FC } from 'react';

export const ModalBox: FC<DivProps> = ({ className, onClick, children }) => (
  <div className="flexcenter fullscreen z-[11]">
    <Overlay zIdx="z-1" background="bg-slate-900/90" onClick={onClick} />

    <div className="absolute top-48 z-[2] max-w-[80%] text-[5rem] text-white">
      <div
        className={`${
          className || ''
        } scrollY max-h-[calc(100vh-15rem)] rounded-[2rem] bg-ct-bg-600 text-center font-bold text-rose-600`}
      >
        {children}
      </div>
    </div>
  </div>
);
