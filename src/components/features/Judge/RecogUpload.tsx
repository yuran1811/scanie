import { Button } from '@cpns/shared';
import { RootState } from '@shared/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RecogItem } from './RecogItem';

export const RecogUpload = () => {
  const { imgSources } = useSelector((s: RootState) => s.imgSources);

  const [isJudgeAll, setJudgeAll] = useState(false);

  return (
    <div className="flexcentercol">
      <div className="flexcenter">
        {!!imgSources.length && !isJudgeAll && (
          <Button className="text-[3rem]" onClick={() => setJudgeAll(true)}>
            Judge All
          </Button>
        )}
      </div>

      <div className="container mx-auto my-6 flex flex-wrap items-start justify-center gap-6 p-6 lg:max-w-[75rem]">
        {!imgSources.length && <div className="text-[4rem] font-bold">Upload image to see</div>}

        {imgSources.map((imgSource) => (
          <RecogItem key={imgSource.id} data={imgSource} isRecog={isJudgeAll} />
        ))}
      </div>
    </div>
  );
};
