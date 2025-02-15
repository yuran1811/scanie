import { FC } from "react";

import { HighlightLink } from "@cpns/interfaces";
import { GH_LINK } from "@shared/constants";

export const Footer: FC = () => (
  <footer className="relative w-full py-8 text-center text-xl">
    Made by <HighlightLink url={GH_LINK}>yuran1811</HighlightLink>
  </footer>
);
