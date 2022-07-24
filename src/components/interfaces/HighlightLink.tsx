import { customStyle } from '@/utils';
import { AnchorProps } from '@shared/types';
import { FC } from 'react';

interface HighlightLinkProps {
  url: string;
  animate?: boolean;
}

const { underline } = customStyle;

export const HighlightLink: FC<HighlightLinkProps & AnchorProps> = ({
  className,
  children,
  url,
  animate = false,
}) => (
  <a
    className={`${
      className || ''
    } relative font-semibold text-ct-link-color selection:text-ct-link-color ${underline} after:origin-center after:transition-all after:duration-300 after:ease-in-out ${
      animate ? 'after:scale-x-0 hover:after:scale-x-100' : ''
    }`}
    href={url || '/'}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);
