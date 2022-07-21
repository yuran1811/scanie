import { themes } from '@/utils';
import { FC, PropsWithChildren } from 'react';

interface LabelProps {
  isActive?: boolean;
  theme?: string;
}

export const Label: FC<LabelProps & PropsWithChildren> = ({
  children,
  isActive = false,
  theme = 'default',
}) => (
  <div
    className="font-bold px-4 py-2 rounded-[2rem] border-[2px]"
    style={{
      color: isActive ? themes[theme].bg : themes[theme].color,
      background: isActive ? themes[theme].color : 'transparent',
      borderColor: isActive ? themes[theme].bg : themes[theme].color,
    }}
  >
    {children}
  </div>
);
