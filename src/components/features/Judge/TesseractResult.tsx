import { ScoreDetailProps } from '@shared/types';
import { FC } from 'react';
import { JudgeSaveResult } from './JudgeSaveResult';

interface TesseractResultProps {
  data: ScoreDetailProps;
}

const TesseractResult: FC<TesseractResultProps> = ({ data: { judgeResult, recogResult } }) => {
  return (
    <>
      {!!recogResult && (
        <div className="flex w-full max-w-[50rem] flex-col items-center justify-start">
          <div className="p-2 text-center text-[2.6rem] font-bold sm:text-[3rem]">Result</div>
          <JudgeSaveResult result={judgeResult} />
        </div>
      )}
    </>
  );
};

export default TesseractResult;
