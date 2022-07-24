import { DivProps } from '@shared/types';
import { FC } from 'react';

interface OverlayProps {
  zIdx?: string;
  background?: string;
}

export const Overlay: FC<OverlayProps & DivProps> = ({ zIdx, background, ...otherProps }) => (
  <div
    {...otherProps}
    className={`${zIdx || 'z-10'} fullscreen cursor-pointer ${
      background || 'bg-slate-700/90'
    }`}
  />
);
