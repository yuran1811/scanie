import { standardize } from '@/utils';
import { FC, memo, useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

interface TesseractResultProps {
  recogResult: Tesseract.Page | null;
}

const TesseractResult: FC<TesseractResultProps> = ({ recogResult }) => {
  const [result, setResult] = useState<any>();

  useEffect(() => {
    if (!recogResult) return;

    setResult(standardize(recogResult));
  }, [recogResult]);

  return (
    <>
      {!!recogResult && (
        <div className="w-full flex flex-col items-center justify-start mb-12">
          <div className="font-bold text-center text-[3rem] sm:text-[4rem] p-4">Result</div>

          {/* <div className="p-6 text-[2.2rem]">
          <div className="font-bold text-center text-[3rem] sm:text-[3.4rem] p-4">Raw</div>
          <div>
            <pre>{recogResult.text}</pre>
          </div>
        </div> */}

          <div className="p-6 text-[2.2rem]">
            <div className="font-bold text-center text-[3rem] sm:text-[3.4rem] p-4">
              Standard result
            </div>
            <div>
              <pre>{result}</pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(TesseractResult);
