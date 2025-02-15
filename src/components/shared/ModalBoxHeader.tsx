import { FC } from "react";

import { CloseIcon } from "@cpns/icons";
import { ButtonProps } from "@shared/types";

export const ModalBoxHeader: FC<ButtonProps> = ({ className, onClick, children }) => (
  <div
    className={`${
      className || ""
    } sticky top-0 right-0 left-0 z-10 flex items-center justify-between bg-indigo-300 p-8`}
  >
    <div className="flexcenter flex-wrap pr-12">{children || <div className="size-16" />}</div>

    <button onClick={onClick}>
      <CloseIcon className="absolute top-1/2 right-3 mx-4 translate-y-[-50%] cursor-pointer md:right-6" />
    </button>
  </div>
);
