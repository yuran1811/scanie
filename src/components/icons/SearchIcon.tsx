import { DivProps } from '@shared/types';
import { FC } from 'react';

export const SearchIcon: FC<DivProps> = ({ className }) => (
  <div
    className={`${className || ''} h-20 w-20 rounded-full border-[6px] border-current text-white`}
  />
);
