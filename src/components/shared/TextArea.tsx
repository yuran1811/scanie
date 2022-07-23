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
    } text-[3.5rem] text-ct-color bg-ct-bg-800 w-full max-w-[32rem] my-[0.5rem] px-[2rem] py-[1rem] outline-none border-[0.5rem] border-solid border-transparent rounded-[2.5rem] isAnimated focus:border-current`}
    placeholder={placeholder || 'Content'}
  />
);
