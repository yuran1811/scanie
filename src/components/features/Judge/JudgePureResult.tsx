import { FC } from "react";

interface JudgePureResultProps {
  text?: string;
  result?: string;
}

export const JudgePureResult: FC<JudgePureResultProps> = ({ result = "", text = "" }) => (
  <div>
    <div className="">
      <div className="p-4 text-center font-bold">Raw</div>
      <div>
        <pre>{text}</pre>
      </div>
    </div>

    <div className="">
      <div className="p-4 text-center font-bold">Standard result</div>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  </div>
);
