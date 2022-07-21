import { PlusIcon } from '@cpns/icons';
import { Label, SearchBar } from '@cpns/shared';
import { useState } from 'react';
import { ClassRecordAddNew } from './ClassRecordAddNew';

export const SectionBar = () => {
  const [addNew, setAddNew] = useState(false);

  return (
    <div className="flexcentercol">
      <div className="select-none flexcenter flex-wrap p-8 m-4 gap-4">
        <Label theme="teal">Class</Label>
        <Label theme="blue">Subject</Label>
        <Label theme="default">Type</Label>

        <PlusIcon
          className="cursor-pointer"
          fill="white"
          width="45"
          height="45"
          onClick={() => setAddNew((s) => !s)}
        />
      </div>
      <SearchBar />

      {addNew && <ClassRecordAddNew onClickHandle={setAddNew} />}
    </div>
  );
};
