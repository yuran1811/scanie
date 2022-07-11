import { FC, HTMLProps } from 'react';

export const Button: FC<HTMLProps<HTMLButtonElement>> = ({ children, className, onClick }) => (
  <button
    className={`${className || ''} p-6 m-6 rounded-[2rem] bg-ct-color text-ct-bg-800`}
    onClick={onClick}
  >
    {children}
  </button>
);
