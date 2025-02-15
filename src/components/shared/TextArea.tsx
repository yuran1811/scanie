import { FC } from "react";

import { DivProps } from "@/shared";

interface TextAreaProps {
  formHandle?: any;
  ref?: any;
}

export const TextArea: FC<TextAreaProps & DivProps> = ({
  ref,
  formHandle,
  className,
  placeholder,
  ...otherProps
}) => (
  <textarea
    {...otherProps}
    {...formHandle}
    ref={ref}
    className={`isAnimated bg-ct-bg-800 w-full max-w-[32rem] rounded-xl border-2 border-solid border-transparent px-5 py-2 outline-hidden focus:border-current ${
      className || ""
    }`}
    placeholder={placeholder || "Content"}
  />
);
