import { FC, useRef, useState } from "react";

import { InputProps } from "@shared/types";

export const SearchBar: FC<InputProps> = ({ onChange }) => {
  const [isActive, setActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flexcenter relative mx-auto h-12 w-4/5">
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <input
          ref={inputRef}
          className={`border-3 border-solid border-white outline-hidden ${
            isActive ? "h-12 w-72 rounded-none px-5 pr-10 pl-3 md:w-100" : "size-8 rounded-4xl"
          }`}
          style={{
            background: "none",
            transition:
              "width 0.4s 0.1s ease-in-out, border-radius 0.4s 0.2s ease-in-out, padding 0.2s 0.4s",
          }}
          type="text"
          disabled={!isActive}
          onChange={onChange}
          onBlur={(e) => {
            const val = e.currentTarget.value;
            !val.length && setActive(false);
          }}
        />

        <button
          className={`isAnimated before:isAnimated after:isAnimated absolute top-0 right-0 bottom-0 size-12 cursor-pointer border-none bg-none before:absolute before:right-[-5px] before:bottom-[1px] before:h-6 before:w-0.5 before:rotate-[-45deg] before:bg-white before:content-[""] ${
            isActive &&
            `before:absolute before:right-[28px] before:!bottom-[14px] before:h-6 before:w-0.5 before:bg-white before:content-[""] after:absolute after:right-[28px] after:bottom-[14px] after:h-6 after:w-0.5 after:rotate-45 after:bg-white after:content-[""]`
          }`}
          style={{ background: "none" }}
          onClick={() => {
            if (isActive && inputRef !== null && inputRef?.current) {
              inputRef.current.value = "";
            }
            setActive((s) => !s);
          }}
        />
      </div>
    </div>
  );
};
