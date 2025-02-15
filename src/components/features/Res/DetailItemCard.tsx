import { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { deleteScoreFromGroup, updateScoreInGroup } from "@/redux/scoreGroupsSlice";
import { averageScore, getChosenStatus, standardize, standardizeAnswer } from "@/utils";
import { TrashIcon } from "@cpns/icons";
import { Button, Input, ModalUI } from "@cpns/shared";
import { ScoreDetailProps, ScoreGroupsType } from "@shared/types";
import TesseractResult from "../Judge/TesseractResult";

interface ItemCardProps {
  data: ScoreDetailProps;
  groups: ScoreGroupsType;
  groupId: string;
  isRecog?: boolean;
}

const style = {
  good: "bg-good-bg text-good-color border-good-color hover:bg-good-color hover:text-good-bg hover:border-good-bg",
  need: "bg-need-bg text-need-color border-need-color hover:bg-need-color hover:text-need-bg hover:border-need-bg",
  normal:
    "bg-normal-bg text-normal-color border-normal-color hover:bg-normal-color hover:text-normal-bg hover:border-normal-bg",
  caution:
    "bg-caution-bg text-caution-color border-caution-color hover:bg-caution-color hover:text-caution-bg hover:border-caution-bg",
  danger:
    "bg-danger-bg text-danger-color border-danger-color hover:bg-danger-color hover:text-danger-bg hover:border-danger-bg",
};

export const DetailItemCard: FC<ItemCardProps> = ({ data, groupId, groups, isRecog }) => {
  const [showMore, setShowMore] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const dispatch = useDispatch();

  const theme = averageScore.check(+(data.judgeResult?.score || 0));

  const editNameHandle = (e: FormEvent<HTMLInputElement>) => {
    dispatch(
      updateScoreInGroup({
        groupId,
        id: data.id,
        data: {
          name: e.currentTarget.value,
        },
      }),
    );
  };
  const deleteHandle = (e: any, type: string = "delete") => {
    e.stopPropagation();
    if (!groupId) return;

    if (!deleteConfirm && type === "open") {
      setDeleteConfirm(true);
      return;
    }

    if (type === "delete") {
      setDeleteConfirm(false);
      dispatch(deleteScoreFromGroup({ groupId, id: data.id }));
    }
  };
  const judgeHandle = () => {
    const thisGroup = groups.find((_) => _.id === groupId);
    if (!thisGroup) return;

    if (!data.recogResult.length) return;

    const { chosen } = standardize(data.recogResult);
    const { answerData, answerLength } = standardizeAnswer(thisGroup.rawAnswer);
    const judgeResult = getChosenStatus(chosen, answerData, answerLength);

    console.log("🚀 ~ judgeHandle ~ chosen:", chosen);
    console.log("🚀 ~ judgeHandle ~ answerData:", answerData);

    dispatch(updateScoreInGroup({ groupId, id: data.id, data: { judgeResult } }));
  };

  useEffect(() => {
    if (typeof isRecog === "undefined") return;
    if (isRecog) judgeHandle();
  }, [isRecog]);

  return (
    <div
      className={`flexcenter scrollY w-full cursor-pointer flex-wrap justify-between border-2 transition-all select-none ${style[theme]}`}
      onClick={() => setShowMore((s) => !s)}
      onMouseLeave={() => setShowMore(false)}
    >
      <Input
        className={`${showMore ? "pointer-events-auto" : "pointer-events-none"} w-3/5 flex-3 !rounded-none bg-transparent font-bold`}
        value={data.name}
        disabled={!showMore}
        onChange={(e) => editNameHandle(e)}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="flexcenter pointer-events-none flex-1 flex-wrap justify-end gap-3 px-3">
        <div className="line-clamp-1 text-center font-bold">
          {+(data.judgeResult?.score || 0).toFixed(2)}
        </div>

        <TrashIcon
          className="!pointer-events-auto cursor-pointer text-red-300"
          onClick={(e) => deleteHandle(e, "open")}
        />
      </div>

      <div
        className={`h-0 w-full overflow-hidden bg-gray-900 text-gray-100 transition-all ${
          showMore ? "h-max py-2" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flexcentercol mx-auto w-1/2 max-w-100 gap-3 md:flex-row">
          {/* <Input className="max-w-[10rem]" disabled={!showMore} /> */}
          <Button onClick={() => judgeHandle()}>Judge</Button>
        </div>

        <TesseractResult data={data} />
      </div>

      {deleteConfirm && (
        <ModalUI
          title="Delete action"
          onClick={(e) => deleteHandle(e)}
          cancelHandle={() => setDeleteConfirm(false)}
        >
          <div className="flexcentercol">
            <p>Delete the score ?</p>
          </div>
        </ModalUI>
      )}
    </div>
  );
};
