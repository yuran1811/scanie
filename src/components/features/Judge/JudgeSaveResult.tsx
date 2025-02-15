import { FC } from "react";

import { ChosenStatusType } from "@/shared";

import "react-toastify/dist/ReactToastify.css";

interface JudgeSaveResultProps {
  result: ChosenStatusType | null;
}

export const JudgeSaveResult: FC<JudgeSaveResultProps> = ({ result }) => {
  return (
    <div className="flexcentercol w-full gap-2 font-bold">
      <div className="text-zinc-400">Not recognize - {result?.notRecognize || 0}</div>
      <div className="text-green-400">Correct - {result?.correct || 0}</div>
      <div className="text-sky-300">Score - {+(result?.score || 0).toFixed(2)}</div>
    </div>
  );
};
