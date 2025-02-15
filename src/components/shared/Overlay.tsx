import { FC } from "react";

import { DivProps } from "@shared/types";

interface OverlayProps {
  zIdx?: string;
  background?: string;
}

export const Overlay: FC<OverlayProps & DivProps> = ({ zIdx, background, ...otherProps }) => (
  <div
    {...otherProps}
    className={`${zIdx || "z-10"} bg-ct-bg-800/90 fullscreen cursor-pointer backdrop-blur-xs`}
  />
);
