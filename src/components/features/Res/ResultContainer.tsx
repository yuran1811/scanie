import { useSelector } from "react-redux";

import { getFilterGroup } from "@/utils";
import { RootState } from "@shared/types";
import { ItemCard } from "./ItemCard";
import { SectionBar } from "./SectionBar";

export const ResultContainer = () => {
  const { scoreGroups, filter } = useSelector((s: RootState) => s.scoreGroups);

  const { selectLabel, labels } = getFilterGroup(filter, scoreGroups);

  return (
    <section className="container mx-auto">
      <SectionBar />

      {(!selectLabel || !selectLabel.length) && (
        <div className="mt-8 grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {scoreGroups.map((item, index) => (
            <ItemCard key={item.id || `${index} : ${item.class} - ${item.subject}`} data={item} />
          ))}
        </div>
      )}

      {!!selectLabel.length && (
        <>
          {labels.map((label) => (
            <div key={label} className="flexcentercol my-5 w-full gap-4">
              <div className="text-center text-4xl font-bold">{label}</div>
              <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </section>
  );
};
