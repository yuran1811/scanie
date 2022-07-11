import { DivProps } from '@shared/types';
import { FC } from 'react';

interface ErrorMessageProps {
  extraStyle?: string;
  content: string;
}

export const ErrorMessage: FC<ErrorMessageProps & DivProps> = ({ content, extraStyle }) => (
  <div className={`text-rose-600 text-center font-semibold ${extraStyle || ''}`}>{content}</div>
);
