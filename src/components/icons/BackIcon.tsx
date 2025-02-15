import { FC, PropsWithChildren } from "react";

import { ButtonProps } from "@shared/types";

export const BackIcon: FC<ButtonProps & PropsWithChildren> = ({ children, className, onClick }) => (
  <button
    className={`${className || ""} flexcenter text-ct-bg-800 group cursor-pointer rounded-md bg-violet-400 px-5 py-2 font-semibold`}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className="-translate-x-2 transition-all group-hover:-translate-x-3"
    >
      <path
        fill="currentColor"
        d="M20 11H6.83l2.88-2.88A.996.996 0 1 0 8.3 6.71L3.71 11.3a.996.996 0 0 0 0 1.41L8.3 17.3a.996.996 0 1 0 1.41-1.41L6.83 13H20c.55 0 1-.45 1-1s-.45-1-1-1"
      />
    </svg>
    {children}
  </button>
);
