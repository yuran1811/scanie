import { CloseIcon } from '@cpns/icons';
import { DivProps } from '@shared/types';
import { FC } from 'react';

export const ModalBoxHeader: FC<DivProps> = ({ className, onClick, children }) => (
  <div
    className={`${
      className || ''
    } sticky top-0 left-0 right-0 z-10 flex items-center justify-between bg-indigo-300 p-8`}
  >
    <div className="flexcenter flex-wrap pr-[5.5rem]">
      {children || <div className="h-20 w-20"></div>}
    </div>

    <CloseIcon
      className="absolute right-3 top-1/2 mx-4 translate-y-[-50%] cursor-pointer tablet:right-6"
      width="50"
      height="50"
      onClick={onClick}
    />
  </div>
);
