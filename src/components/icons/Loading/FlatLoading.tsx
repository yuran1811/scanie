import { FC } from "react";

import { DivProps } from "@shared/types";

export const FlatLoading: FC<DivProps> = ({ className }) => (
  <div style={{ perspective: "100px" }} className={className || ""}>
    <div className="animate-flatLoading h-20 w-20 rotate-0 bg-red-400"></div>
  </div>
);
