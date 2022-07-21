import { fakeData } from '@shared/constants';
import { ItemCard } from './ItemCard';
import { SectionBar } from './SectionBar';

export const ResultContainer = () => {
  return (
    <div className="p-4">
      <SectionBar />
      <div className="w-full lg:max-w-[75rem] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {fakeData.map((item) => (
          <ItemCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};
