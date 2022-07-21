import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ItemCardProps {
  data: { id: number; amount: number; class: string; subject: string; type: string };
}

export const ItemCard: FC<ItemCardProps> = ({ data }) => {
  return (
    <Link
      to={data.id + ''}
      className="flexcentercol cursor-pointer select-none bg-transparent hover:bg-sky-400 text-sky-400 hover:text-ct-bg-800 w-[80%] sm:w-[20rem] mt-8 p-4 border-[4px] border-sky-400 hover:border-ct-bg-800 rounded-[2rem] transition-all"
    >
      <div className="w-full text-center text-[2.9rem] font-bold line-clamp-1">{data.subject}</div>
      <div className="w-full text-center text-[2.9rem] font-bold line-clamp-1">{data.class}</div>
      <div className="w-full text-center text-[2.9rem] font-bold line-clamp-1">{data.amount}</div>
      <div className="w-full text-center text-[2.9rem] font-bold line-clamp-1">{data.type}</div>
    </Link>
  );
};
