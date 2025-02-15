import { FC } from "react";

import { InputProps } from "@shared/types";

interface CustomInputProps {
  formHandle?: any;
}

export const Input: FC<CustomInputProps & InputProps> = ({
  formHandle,
  className,
  ...otherProps
}) => (
  <input
    autoComplete="off"
    {...otherProps}
    {...formHandle}
    className={`${
      className || ""
    } bg-ct-bg-800 w-full max-w-[32rem] rounded-xl border-2 border-solid border-transparent px-5 py-2 outline-hidden transition-all focus:border-current`}
  />
);
