import React, { FC } from 'react';

interface PureResultProps {
  text?: string;
  result?: string;
}

export const PureResult: FC<PureResultProps> = ({ result = '', text = '' }) => (
  <div>
    <div className="p-6 text-[2.2rem]">
      <div className="p-4 text-center text-[3rem] font-bold sm:text-[3.4rem]">Raw</div>
      <div>
        <pre>{text}</pre>
      </div>
    </div>

    <div className="p-6 text-[2.2rem]">
      <div className="p-4 text-center text-[3rem] font-bold sm:text-[3.4rem]">Standard result</div>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  </div>
);
