import { FC, memo } from 'react';

interface TesseractResultProps {
  text: string;
}

const TesseractResult: FC<TesseractResultProps> = ({ text }) => (
  <>
    {!!text && (
      <div className="w-full flex flex-col items-center justify-start mb-12">
        <div className="font-bold text-center text-[3rem] sm:text-[4rem] p-4">Result</div>
        <div className="p-6 text-[2.2rem]">{text}</div>
      </div>
    )}
  </>
);

export default memo(TesseractResult);
