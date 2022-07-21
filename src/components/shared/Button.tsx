import { FC, HTMLProps } from 'react';

export const Button: FC<HTMLProps<HTMLButtonElement>> = ({ children, className, onClick }) => (
  <button
    className={`${
      className || ''
    } px-6 py-4 m-6 rounded-[2rem] hover:bg-ct-color bg-ct-bg-600 hover:text-ct-bg-800 text-ct-color border-[4px] border-ct-color hover:border-ct-bg-800 transition-all`}
    onClick={onClick}
  >
    {children}
  </button>
);
