import { FC } from "react";
import { createPortal } from "react-dom";

import { ButtonProps } from "@shared/types";
import { Overlay } from "./Overlay";

interface ModalUIProps {
  title: string;
  cancelHandle: CallableFunction;
}

export const ModalUI: FC<ModalUIProps & ButtonProps> = ({
  children,
  title,
  onClick,
  cancelHandle,
}) => {
  return createPortal(
    <div className="flexcenter fullscreen z-11">
      <Overlay zIdx="-z-1" onClick={() => cancelHandle()} />

      <div className="flex max-w-4xl flex-col gap-4 rounded-3xl bg-gray-900 p-6">
        <h2 className="flex items-center gap-4 leading-tight font-semibold tracking-wide">
          {title}
        </h2>

        {children}

        <div className="flex flex-col justify-end gap-5 sm:flex-row">
          <button
            className="rounded-xl border-2 border-transparent px-4 py-2 transition-colors hover:border-violet-400"
            onClick={() => cancelHandle()}
          >
            Cancel
          </button>
          <button
            className="rounded-xl bg-violet-400 px-4 py-2 font-semibold text-gray-900 transition-colors hover:bg-violet-800 hover:text-violet-300"
            onClick={onClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-container") as HTMLElement,
  );
};
