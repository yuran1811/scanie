import { DivProps } from '@shared/types';
import { FC } from 'react';

export const FlatLoading: FC<DivProps> = ({ className }) => (
  <div style={{ perspective: '100px' }} className={className || ''}>
    <div className="h-20 w-20 rotate-0 animate-flatLoading bg-red-400"></div>
  </div>
);
