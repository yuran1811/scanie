import { DivProps } from '@shared/types';
import { FC } from 'react';

interface ErrorTextProps {
  extraStyle: string;
}

export const ErrorText: FC<ErrorTextProps & DivProps> = ({ children, extraStyle }) => (
  <div className={`text-white text-center font-bold ${extraStyle || ''}`}>{children}</div>
);
