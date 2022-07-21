import { DivProps } from '@shared/types';
import { FC } from 'react';

interface ErrorMessageProps {
  extraStyle?: string;
  content: string;
}

export const ErrorMessage: FC<ErrorMessageProps & DivProps> = ({ content, extraStyle }) => (
  <div
    className={`px-6 py-4 rounded-[2rem] bg-rose-600 text-rose-200 text-center font-semibold ${
      extraStyle || ''
    }`}
  >
    {content}
  </div>
);
