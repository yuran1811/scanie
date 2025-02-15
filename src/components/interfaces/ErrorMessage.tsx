import { FC } from "react";

import { DivProps } from "@shared/types";

interface ErrorMessageProps {
  extraStyle?: string;
  content: string;
}

export const ErrorMessage: FC<ErrorMessageProps & DivProps> = ({ content, extraStyle }) => (
  <div
    className={`rounded-xl bg-red-500/90 px-4 py-2 text-center font-semibold text-red-200 ${
      extraStyle || ""
    }`}
  >
    {content}
  </div>
);
