import {
  autoUpdate,
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";

import { JudgeContainer } from "./JudgeContainer";
import { UploadIcon } from "@cpns/icons";

export const JudgeBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`isAnimated flexcenter relative size-10 cursor-pointer rounded-full before:absolute before:inset-0 before:z-[-1] before:rounded-full before:bg-sky-400 before:content-[""] ${
          isOpen ? "before:inset-2 before:animate-ping" : ""
        }`}
      >
        <UploadIcon className="size-6 text-sky-700" />
      </div>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            className="max-h-[80vh] w-max overflow-auto"
            style={{ ...floatingStyles, left: "-16rem", top: "0.5rem" }}
            {...getFloatingProps()}
          >
            <JudgeContainer />
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
