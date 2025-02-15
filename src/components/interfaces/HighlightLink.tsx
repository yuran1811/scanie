import { FC } from "react";

import { AnchorProps } from "@shared/types";

interface HighlightLinkProps {
  url: string;
  animate?: boolean;
}

export const HighlightLink: FC<HighlightLinkProps & AnchorProps> = ({
  className,
  children,
  url,
  animate = false,
}) => (
  <a
    className={`${
      className || ""
    } !withUnderline text-ct-link-color selection:text-ct-link-color relative font-semibold after:origin-center after:transition-all after:duration-300 after:ease-in-out ${
      animate ? "after:scale-x-0 hover:after:scale-x-100" : ""
    }`}
    href={url || "/"}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);
