import { DivProps } from '@shared/types';
import { FC } from 'react';

const dotStyle = `w-[1.6rem] h-[1.6rem] rounded-full bg-current animate-threeDots`;

export const ThreeDotsFade: FC<DivProps> = ({ className }) => (
  <div className={`${className || ''} flex w-24 flex-row flex-nowrap items-center justify-between`}>
    <div className={dotStyle} style={{ animationDelay: '-0.4s' }}></div>
    <div className={dotStyle} style={{ animationDelay: '-0.2s' }}></div>
    <div className={dotStyle} style={{ animationDelay: '0' }}></div>
  </div>
);
