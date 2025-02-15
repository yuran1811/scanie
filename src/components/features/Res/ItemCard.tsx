import { FC } from "react";
import { Link } from "react-router-dom";

import { ScoreGroupProps } from "@shared/types";

interface ItemCardProps {
  data: ScoreGroupProps;
}

export const ItemCard: FC<ItemCardProps> = ({ data }) => {
  return (
    <Link
      to={data.id}
      className="flexcentercol hover:border-ct-bg-800 hover:text-ct-bg-800 w-4/5 cursor-pointer rounded-xl border-4 border-sky-400 bg-transparent p-4 text-center font-bold text-sky-400 transition-all select-none *:line-clamp-1 *:w-full hover:bg-sky-400"
    >
      <div className="text-4xl">{data.class}</div>
      <div className="text-2xl">{data.subject}</div>
      <div className="text-2xl">{data.type}</div>
      <div className="text-3xl">{data.scores.length}</div>
    </Link>
  );
};
