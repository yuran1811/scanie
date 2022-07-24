import { DivProps } from '@shared/types';
import { FC } from 'react';

interface ErrorMessageProps {
  extraStyle?: string;
  content: string;
}

export const ErrorMessage: FC<ErrorMessageProps & DivProps> = ({ content, extraStyle }) => (
  <div
    className={`rounded-[2rem] bg-rose-600 px-6 py-4 text-center font-semibold text-rose-200 ${
      extraStyle || ''
    }`}
  >
    {content}
  </div>
);
