import { DivProps } from '@shared/types';
import Tippy, { TippyProps } from '@tippyjs/react';
import { FC } from 'react';
import 'tippy.js/dist/tippy.css';

interface TooltipProps {
  content?: string;
  options?: TippyProps;
}

export const Tooltip: FC<TooltipProps & DivProps> = ({ children, content, options }) => {
  return (
    <div>
      <Tippy {...options} content={'tooltip'}>
        <div>{children}</div>
      </Tippy>
    </div>
  );
};
