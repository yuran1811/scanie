import { FC, memo } from 'react';

interface ProgressBarProps {
  status?: string;
  value: number | string;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, status }) => (
  <div className="w-full max-w-[50rem] p-6">
    <div className="relative top-0 left-0 h-[4rem] w-full overflow-hidden rounded-[2.5rem] bg-ct-bg-700">
      <div
        className="h-full animate-pulse rounded-[2.5rem] bg-teal-400 transition-all"
        style={{ width: `calc(100%*${+value})` }}
      />
    </div>

    {!!status && <div className="p-2 text-center text-[2.4rem] capitalize">{status}</div>}
  </div>
);

export default memo(ProgressBar);
