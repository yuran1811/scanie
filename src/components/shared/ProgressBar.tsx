import { FC, memo } from 'react';

interface ProgressBarProps {
  status?: string;
  value: number | string;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, status }) => (
  <div className="w-full max-w-[50rem] p-6">
    <div className="relative w-full h-[4rem] top-0 left-0 bg-ct-bg-700 rounded-[2.5rem] overflow-hidden">
      <div
        className="h-full rounded-[2.5rem] bg-teal-400 transition-all animate-pulse"
        style={{ width: `calc(100%*${+value})` }}
      />
    </div>

    {!!status && <div className="text-[2.4rem] text-center capitalize p-2">{status}</div>}
  </div>
);

export default memo(ProgressBar);
