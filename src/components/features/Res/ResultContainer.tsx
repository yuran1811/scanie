import { getFilterGroup } from '@/utils';
import { RootState } from '@shared/types';
import { useSelector } from 'react-redux';
import { ItemCard } from './ItemCard';
import { SectionBar } from './SectionBar';

export const ResultContainer = () => {
  const { scoreGroups, filter } = useSelector((s: RootState) => s.scoreGroups);

  const { selectLabel, labels } = getFilterGroup(filter, scoreGroups);

  return (
    <div className="p-4">
      <SectionBar />
      <div
        className={
          selectLabel.length
            ? 'flexcentercol gap-12'
            : 'mx-auto grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-[75rem]'
        }
      >
        {(!selectLabel || !selectLabel.length) && (
          <>
            {scoreGroups.map((item, index) => (
              <ItemCard key={item.id || index + item.class + item.subject} data={item} />
            ))}
          </>
        )}

        {!!selectLabel.length && (
          <>
            {labels.map((label) => (
              <div key={label} className="flexcentercol flex-wrap">
                <div className="text-[3.5rem] font-bold">{label}</div>

                <div className="flexcenter flex-wrap gap-6">
                  {scoreGroups
                    .filter((item) => item[selectLabel] === label)
                    .map((item, index) => (
                      <ItemCard key={item.id || index + item.class + item.subject} data={item} />
                    ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
