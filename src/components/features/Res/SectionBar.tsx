import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { importScoreGroups, setFilter } from "@/redux/scoreGroupsSlice";
import { exportScoreGroups } from "@/utils";
import { ExportIcon, PlusIcon, UploadIcon } from "@cpns/icons";
import { Label } from "@cpns/shared";
import { RootState } from "@shared/types";
import { ClassRecordAddNew } from "./ClassRecordAddNew";

export const SectionBar = () => {
  const [addNew, setAddNew] = useState(false);

  const scoreGroupsState = useSelector((s: RootState) => s.scoreGroups);
  const { scoreGroups, filter } = scoreGroupsState;
  const dispatch = useDispatch();

  const filterHandle = (option: string) => {
    dispatch(
      setFilter({
        ...filter,
        class: false,
        subject: false,
        type: false,
        [option]: !filter[option],
      }),
    );
  };

  return (
    <div className="flexcentercol gap-4">
      <div className="flexcenter flex-wrap gap-4 py-4 select-none">
        <Label
          className="cursor-pointer"
          isActive={filter.class}
          theme="teal"
          onClick={() => filterHandle("class")}
        >
          Class
        </Label>
        <Label
          className="cursor-pointer"
          isActive={filter.subject}
          theme="blue"
          onClick={() => filterHandle("subject")}
        >
          Subject
        </Label>
        <Label
          className="cursor-pointer"
          isActive={filter.type}
          theme="default"
          onClick={() => filterHandle("type")}
        >
          Type
        </Label>

        <div className="flexcenter flex-wrap gap-3">
          <PlusIcon
            className="cursor-pointer text-4xl text-white"
            onClick={() => setAddNew((s) => !s)}
          />

          <ExportIcon
            className="cursor-pointer text-4xl text-white"
            onClick={() => exportScoreGroups(scoreGroups)}
          />

          <div>
            <input
              type="file"
              accept=".json"
              id="uploadScoreGroups"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const result = e.target?.result as string;
                    const data = JSON.parse(result);

                    dispatch(importScoreGroups(data));
                  };
                  reader.readAsText(file);
                }
              }}
            />
            <label htmlFor="uploadScoreGroups">
              <UploadIcon className="cursor-pointer text-4xl text-white" />
            </label>
          </div>
        </div>
      </div>

      {addNew && <ClassRecordAddNew onClickHandle={setAddNew} />}
    </div>
  );
};
