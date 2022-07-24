import { FC, HTMLProps } from 'react';

export const Button: FC<HTMLProps<HTMLButtonElement>> = ({ children, className, onClick }) => (
  <button
    className={`${
      className || ''
    } m-6 rounded-[2rem] border-4 border-ct-color bg-ct-bg-600 px-6 py-4 text-ct-color transition-all hover:border-ct-bg-800 hover:bg-ct-color hover:text-ct-bg-800`}
    onClick={onClick}
  >
    {children}
  </button>
);
