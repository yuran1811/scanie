import { RootState } from '@shared/types';
import { useSelector } from 'react-redux';
import { ItemCard } from './ItemCard';
import { SectionBar } from './SectionBar';

export const ResultContainer = () => {
  const { scoreGroups } = useSelector((s: RootState) => s.scoreGroups);

  return (
    <div className="p-4">
      <SectionBar />
      <div className="w-full lg:max-w-[75rem] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {scoreGroups.map((item, index) => (
          <ItemCard key={item.id || index + item.class + item.subject} data={item} />
        ))}
      </div>
    </div>
  );
};
