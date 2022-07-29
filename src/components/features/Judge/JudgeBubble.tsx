import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import { JudgeContainer } from './JudgeContainer';

export const JudgeBubble = () => {
  const [openModel, setOpenModel] = useState(false);

  return (
    <div className="custom-tippy fixed top-4 right-16 z-[100]">
      <Tippy
        interactive
        visible={openModel}
        placement="bottom-end"
        onClickOutside={() => setOpenModel(false)}
        render={(attrs) => (
          <div
            {...attrs}
            className="z-1 absolute top-24 right-0 max-h-[80vh] max-w-[80vw] overflow-auto rounded-3xl bg-slate-900"
          >
            <JudgeContainer />
          </div>
        )}
      >
        <div onClick={() => setOpenModel((s) => !s)}>
          <div
            className={`isAnimated h-20 w-20 cursor-pointer rounded-full ${
              !openModel ? 'bg-violet-500' : 'bg-emerald-400'
            }`}
          ></div>
        </div>
      </Tippy>
    </div>
  );
};
