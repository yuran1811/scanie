import { FC } from 'react';

interface JudgePureResultProps {
  text?: string;
  result?: string;
}

export const JudgePureResult: FC<JudgePureResultProps> = ({ result = '', text = '' }) => (
  <div className="text-[2.5rem]">
    <div className="p-6">
      <div className="p-4 text-center text-[3rem] font-bold sm:text-[3.5rem]">Raw</div>
      <div>
        <pre>{text}</pre>
      </div>
    </div>

    <div className="p-6">
      <div className="p-4 text-center text-[3rem] font-bold sm:text-[3.5rem]">Standard result</div>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  </div>
);
