import { FC } from 'react';

interface ItemCardProps {
  data: {
    id: number;
    name: string;
    score: number;
  };
}

export const DetailItemCard: FC<ItemCardProps> = ({ data }) => {
  return (
    <div className="flexcenter flex-wrap cursor-pointer select-none bg-transparent hover:bg-sky-400 text-sky-400 hover:text-ct-bg-800 w-max max-w-[80%] mt-8 p-4 border-[4px] border-sky-400 hover:border-ct-bg-800 rounded-[2rem] transition-all">
      <div className="text-center text-[3.5rem] font-bold p-4 m-2 line-clamp-2">{data.name}</div>
      <div className="text-center text-[2.9rem] font-bold p-4 m-2">{data.score}</div>
    </div>
  );
};
