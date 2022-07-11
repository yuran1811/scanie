import { HighlightLink } from '@cpns/interfaces';
import { GH_LINK } from '@shared/constants';
import { FC } from 'react';

export const Footer: FC = () => (
  <footer className="relative w-full text-[3rem] text-center px-[1rem] pt-[0.7rem] pb-[2rem]">
    Made by{' '}
    <HighlightLink className="text-[3rem]" url={GH_LINK}>
      yuran1811
    </HighlightLink>
  </footer>
);
