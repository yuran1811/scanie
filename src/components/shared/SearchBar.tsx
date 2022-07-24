import { InputProps } from '@shared/types';
import { FC, useRef, useState } from 'react';

interface SearchBarProps {
  // setSearchOpts: Dispatch<
  //   SetStateAction<{
  //     isSearch: boolean;
  //     value: string;
  //   }>
  // >;
}

export const SearchBar: FC<SearchBarProps & InputProps> = ({ onChange }) => {
  const [isActive, setActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flexcenter relative mb-8 h-24 w-4/5">
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <input
          ref={inputRef}
          className={`border-[0.4rem] border-solid border-white text-[3rem] outline-none
					${
            isActive
              ? 'h-24 w-[28rem] rounded-none py-[0.8rem] pl-[2rem] pr-[5.5rem] tablet:w-[36rem]'
              : 'h-20 w-20 rounded-[5rem]'
          }`}
          style={{
            background: 'none',
            transition:
              'width 0.4s 0.1s ease-in-out, border-radius 0.4s 0.2s ease-in-out, padding 0.2s 0.4s',
          }}
          type="text"
          disabled={!isActive}
          onChange={onChange}
          onBlur={(e) => {
            e.currentTarget.value = '';
            setActive(false);
          }}
        />
        <button
          className={`isAnimated before:isAnimated after:isAnimated absolute top-0 bottom-0 right-0 h-20 w-20 cursor-pointer border-none bg-none before:absolute before:bottom-[-1.6rem] before:right-[-0.6rem] before:h-[2.5rem] before:w-[0.4rem] before:rotate-[-45deg] before:bg-white before:content-[""] ${
            isActive &&
            `!h-24 !w-24 before:absolute before:bottom-[1.2rem] before:right-[2.8rem] before:h-[3.4rem] before:w-[0.4rem] before:bg-white before:content-[""] after:absolute after:bottom-[1.2rem] after:right-[2.8rem] after:h-[3.4rem] after:w-[0.4rem] after:rotate-45 after:bg-white after:content-[""]`
          }`}
          style={{ background: 'none' }}
          onClick={() => {
            if (isActive && inputRef !== null && inputRef?.current) {
              inputRef.current.value = '';
              // setSearchOpts({
              //   isSearch: false,
              //   value: '',
              // });
            }
            setActive((s) => !s);
          }}
        />
      </div>
    </div>
  );
};
