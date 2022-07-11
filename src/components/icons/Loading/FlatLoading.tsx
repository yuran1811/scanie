import { DivProps } from '@shared/types';
import { FC } from 'react';

export const FlatLoading: FC<DivProps> = ({ className }) => (
  <div style={{ perspective: '100px' }} className={className || ''}>
    <div className="w-[5rem] h-[5rem] bg-red-400 rotate-0 animate-flatLoading"></div>
  </div>
);
