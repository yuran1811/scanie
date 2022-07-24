import { DivProps } from '@/shared';
import { FC, RefObject } from 'react';

interface TextAreaProps {
  formHandle?: any;
  ref?: any;
}

export const TextArea: FC<TextAreaProps & DivProps> = ({
  ref,
  formHandle,
  className,
  placeholder,
  ...otherProps
}) => (
  <textarea
    {...otherProps}
    {...formHandle}
    ref={ref}
    className={`${
      className || ''
    } isAnimated my-[0.5rem] w-full max-w-[32rem] rounded-[2.5rem] border-[0.5rem] border-solid border-transparent bg-ct-bg-800 px-[2rem] py-[1rem] text-[3rem] text-ct-color outline-none focus:border-current`}
    placeholder={placeholder || 'Content'}
  />
);
