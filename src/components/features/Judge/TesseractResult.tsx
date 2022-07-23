import { standardize } from '@/utils';
import { FC, memo, useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { SaveResult } from './SaveResult';

interface TesseractResultProps {
  recogResult: Tesseract.Page | null;
  answer: string;
}

const TesseractResult: FC<TesseractResultProps> = ({ recogResult, answer }) => {
  const [result, setResult] = useState<string | number>();

  useEffect(() => {
    if (!recogResult) return;

    const { chosen, rawChosen } = standardize(recogResult);
    const answerData = answer.split('\n').map((item) => item.trim().replace(/\s/g, ''));

    let correctCount = 0;

    answerData.forEach((answer) => {
      const splitAnswer = answer.split('.');

      // console.log(splitAnswer[1], chosen[splitAnswer[0]]);

      if (splitAnswer[1].toUpperCase() === chosen[splitAnswer[0]]) correctCount++;
    });

    // console.log(correctCount,answerData.length);
    setResult((correctCount * 10) / answerData.length);
  }, [recogResult]);

  return (
    <>
      {!!recogResult && (
        <div className="w-full flex flex-col items-center justify-start mb-12">
          <div className="font-bold text-center text-[3rem] sm:text-[4rem] p-4">Result</div>

          <SaveResult score={+(result || 0)} />

          {/* <div className="p-6 text-[2.2rem]">
          <div className="font-bold text-center text-[3rem] sm:text-[3.4rem] p-4">Raw</div>
          <div>
            <pre>{recogResult.text}</pre>
          </div>
        </div> */}

          {/* <div className="p-6 text-[2.2rem]">
            <div className="font-bold text-center text-[3rem] sm:text-[3.4rem] p-4">
              Standard result
            </div>
            <div>
              <pre>{result}</pre>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default memo(TesseractResult);

/* 
1.A
2.B
3.C
4.D
5.C
6.B
7.A
8.B
9.C
10.D
11.C
12.B
13.A
14.B
15.C
16.D
17.C
18.B
19.A
20.B
21.C
22.D
23.C
24.B
25.A
26.B
27.C
28.D
*/

/* 
1.A
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
17.C
18.B
19.A
20.B
21.C
22.D
23.C
24.B
25.A
26.B
27.C
28.D
*/
