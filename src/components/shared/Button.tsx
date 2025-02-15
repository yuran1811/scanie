import { FC, HTMLProps } from "react";

export const Button: FC<HTMLProps<HTMLButtonElement>> = ({ children, className, onClick }) => (
  <button
    className={`${
      className || ""
    } border-ct-color bg-ct-bg-600 hover:border-ct-bg-600 hover:bg-ct-color hover:text-ct-bg-600 rounded-xl border-2 px-4 py-2 font-semibold transition-all`}
    onClick={onClick}
  >
    {children}
  </button>
);
