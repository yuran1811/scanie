import { FC, memo } from "react";

interface ProgressBarProps {
  status?: string;
  value: number | string;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, status }) => (
  <div className="w-full max-w-200 p-4">
    <div className="bg-ct-bg-700 relative top-0 left-0 h-12 w-full overflow-hidden rounded-3xl">
      <div
        className="h-full animate-pulse rounded-2xl bg-teal-400 transition-all"
        style={{ width: `calc(100%*${+value})` }}
      />
    </div>

    {!!status && <div className="p-2 text-center text-2xl capitalize">{status}</div>}
  </div>
);

export default memo(ProgressBar);
