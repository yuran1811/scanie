import { DivProps } from '@shared/types';
import { FC } from 'react';

interface OverlayProps {
  zIdx?: string;
  background?: string;
}

export const Overlay: FC<OverlayProps & DivProps> = ({ zIdx, background, ...otherProps }) => (
  <div
    {...otherProps}
    className={`${zIdx || 'z-10'} cursor-pointer fullscreen ${
      background || 'bg-slate-700'
    } opacity-90`}
  />
);
