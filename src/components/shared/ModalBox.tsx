import { FC } from "react";

import { Overlay } from "@cpns/shared/Overlay";
import { DivProps } from "@shared/types";

export const ModalBox: FC<DivProps> = ({ className, onClick, children }) => (
  <div className="flexcenter fullscreen z-11">
    <Overlay zIdx="z-1" onClick={onClick} />

    <div className="absolute top-48 z-2 max-w-4/5">
      <div
        className={`${
          className || ""
        } scrollY bg-ct-bg-600 max-h-[calc(100vh-15rem)] text-center font-bold text-rose-600`}
      >
        {children}
      </div>
    </div>
  </div>
);
