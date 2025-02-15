import { FC } from "react";

import { ScoreDetailProps } from "@shared/types";
import { JudgeSaveResult } from "./JudgeSaveResult";

interface TesseractResultProps {
  data: ScoreDetailProps;
}

const TesseractResult: FC<TesseractResultProps> = ({ data: { judgeResult, recogResult } }) => {
  return (
    <>
      {!!recogResult && (
        <div className="mt-2 flex w-full max-w-[50rem] flex-col items-center justify-start">
          <div className="p-2 text-center text-3xl font-bold">Result</div>
          <JudgeSaveResult result={judgeResult} />
        </div>
      )}
    </>
  );
};

export default TesseractResult;
