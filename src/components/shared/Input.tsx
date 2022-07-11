import { InputProps } from '@shared/types';
import { FC } from 'react';

interface CustomInputProps {
  formHandle?: any;
}

export const Input: FC<CustomInputProps & InputProps> = ({
  formHandle,
  className,
  ...otherProps
}) => (
  <div className="flexcenter w-full">
    <input
      {...otherProps}
      {...formHandle}
      className={`${
        className || ''
      } text-[3.2rem] text-ct-color bg-ct-bg-800 w-full max-w-[32rem] my-[0.5rem] px-[1.8rem] py-[0.5rem] outline-none border-[0.5rem] border-solid border-transparent rounded-[2.4rem] isAnimated focus:border-current`}
    />
  </div>
);
