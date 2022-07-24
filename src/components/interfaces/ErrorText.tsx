import { DivProps } from '@shared/types';
import { FC } from 'react';

export const ErrorText: FC<DivProps> = ({ children, className }) => (
  <div className={`text-center font-bold text-white ${className || ''}`}>{children}</div>
);
