import { ScoreGroupProps } from '@shared/types';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ItemCardProps {
  data: ScoreGroupProps;
}

export const ItemCard: FC<ItemCardProps> = ({ data }) => {
  return (
    <Link
      to={data.id}
      className="flexcentercol mt-8 w-[80%] cursor-pointer select-none rounded-[2rem] border-[4px] border-sky-400 bg-transparent p-4 text-sky-400 transition-all hover:border-ct-bg-800 hover:bg-sky-400 hover:text-ct-bg-800 sm:w-[20rem]"
    >
      <div className="w-full text-center text-[2.9rem] font-bold line-clamp-1">{data.class}</div>
      <div className="w-full text-center text-[2.9rem] font-bold line-clamp-1">{data.subject}</div>
      <div className="w-full text-center text-[2.9rem] font-bold line-clamp-1">{data.type}</div>
      <div className="w-full text-center text-[2.9rem] font-bold line-clamp-1">
        {data.scores.length}
      </div>
    </Link>
  );
};
