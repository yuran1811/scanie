import { DivProps } from '@shared/types';
import { FC } from 'react';

export const SearchIcon: FC<DivProps> = ({ className }) => (
  <div
    className={`${
      className || ''
    } w-[5rem] h-[5rem] text-white border-current border-[0.6rem] rounded-[50%]`}
  />
);
