import { DivProps } from '@shared/types';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface InfoIconParams {
  url: string;
  background?: string;
}

const beforeStyle =
  'before:content-[""] before:absolute before:bg-ct-gold-light before:w-[0.8rem] before:h-[0.8rem] before:top-[0.8rem] before:rounded-full';
const afterStyle =
  'after:content-[""] after:absolute after:bg-ct-gold-light after:w-[0.8rem] after:h-[1.2rem] after:bottom-[0.8rem] after:rounded-[1rem]';

export const InfoIcon: FC<InfoIconParams & DivProps> = ({ url, background }) => (
  <Link
    to={url || '/'}
    className={`flexcenter absolute top-4 left-4 z-[2] h-16 w-16 rounded-full ${
      background || 'bg-ct-bg-800'
    } ${beforeStyle} ${afterStyle}`}
  />
);
