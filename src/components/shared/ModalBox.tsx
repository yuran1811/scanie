import { Overlay } from '@cpns/shared/Overlay';
import { DivProps } from '@shared/types';
import { FC } from 'react';

export const ModalBox: FC<DivProps> = ({ className, onClick, children }) => (
  <div className="z-[11] flexcenter fullscreen">
    <Overlay zIdx="1" background="bg-slate-800" onClick={onClick} />

    <div className="z-[2] absolute top-[12rem] max-w-[80%] text-[5rem] text-white">
      <div
        className={`${
          className || ''
        } max-h-[calc(100vh-15rem)] font-bold text-center text-rose-600 bg-ct-bg-600 scrollY rounded-[2rem]`}
      >
        {children}
      </div>
    </div>
  </div>
);
