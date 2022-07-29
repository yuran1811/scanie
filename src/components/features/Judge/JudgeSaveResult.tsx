import { ChosenStatusType } from '@/shared';
import { FC } from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface JudgeSaveResultProps {
  result: ChosenStatusType | null;
}

export const JudgeSaveResult: FC<JudgeSaveResultProps> = ({ result }) => {
  return (
    <div className="flexcentercol my-2 w-full gap-4 px-6">
      <div className="text-[2.4rem] font-bold text-zinc-400">
        Not recognize - {result?.notRecognize || 0}
      </div>
      <div className="text-[2.4rem] font-bold text-green-500">Correct - {result?.correct || 0}</div>
      <div className="text-[2.4rem] font-bold">Score - {+(result?.score || 0).toFixed(2)}</div>
    </div>
  );
};
