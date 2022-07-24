import { getChosenStatus, standardize, standardizeAnswer } from '@/utils';
import { ChosenStatusType } from '@shared/types';
import { FC, memo, useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { SaveResult } from './SaveResult';

interface TesseractResultProps {
  recogResult: Tesseract.Page | null;
  answer: string;
}

const TesseractResult: FC<TesseractResultProps> = ({ recogResult, answer }) => {
  const [result, setResult] = useState<ChosenStatusType | null>(null);

  useEffect(() => {
    if (!recogResult) return;

    const { chosen, rawChosen } = standardize(recogResult);
    const { answerData, answerLength } = standardizeAnswer(answer);
    const judgeResult = getChosenStatus(chosen, answerData, answerLength);

    setResult(judgeResult);
  }, [recogResult]);

  return (
    <>
      {!!recogResult && (
        <div className="mb-12 flex w-full flex-col items-center justify-start">
          <div className="p-4 text-center text-[3rem] font-bold sm:text-[4rem]">Result</div>
          <SaveResult result={result} />
          {/* <PureResult result={result?.toString() || ''} text={result?.toString() || ''} /> */}
        </div>
      )}
    </>
  );
};

export default memo(TesseractResult);

/* 1.A
2.B
3.C
4.D
5.A
6.B
7.C
8.D
9.A
10.B
11.C
12.D
13.A
14.B
15.C
16.D
17.A
18.B
19.C
20.D
21.A
22.B
23.C
24.D
25.A
26.B
27.C
28.D
*/
