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
      } isAnimated my-[0.5rem] w-full max-w-[32rem] rounded-[2.4rem] border-[0.5rem] border-solid border-transparent bg-ct-bg-800 px-[1.8rem] py-[0.5rem] text-[3rem] text-ct-color outline-none focus:border-current`}
    />
  </div>
);
