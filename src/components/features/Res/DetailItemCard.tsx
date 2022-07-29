import { deleteScoreFromGroup, updateScoreInGroup } from '@/redux/scoreGroupsSlice';
import { averageScore, getChosenStatus, standardize, standardizeAnswer } from '@/utils';
import { TrashIcon } from '@cpns/icons';
import { Button, Input, ModalUI } from '@cpns/shared';
import { ScoreDetailProps, ScoreGroupsType } from '@shared/types';
import { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import TesseractResult from '../Judge/TesseractResult';

interface ItemCardProps {
  data: ScoreDetailProps;
  groups: ScoreGroupsType;
  groupId: string;
}

const style = {
  good: 'bg-good-bg text-good-color border-good-color hover:bg-good-color hover:text-good-bg hover:border-good-bg',
  need: 'bg-need-bg text-need-color border-need-color hover:bg-need-color hover:text-need-bg hover:border-need-bg',
  normal:
    'bg-normal-bg text-normal-color border-normal-color hover:bg-normal-color hover:text-normal-bg hover:border-normal-bg',
  caution:
    'bg-caution-bg text-caution-color border-caution-color hover:bg-caution-color hover:text-caution-bg hover:border-caution-bg',
  danger:
    'bg-danger-bg text-danger-color border-danger-color hover:bg-danger-color hover:text-danger-bg hover:border-danger-bg',
};

export const DetailItemCard: FC<ItemCardProps> = ({ data, groupId, groups }) => {
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
      })
    );
  };
  const deleteHandle = (e: any, type: string = 'delete') => {
    e.stopPropagation();
    if (!groupId) return;

    if (!deleteConfirm && type === 'open') {
      setDeleteConfirm(true);
      return;
    }

    if (type === 'delete') {
      setDeleteConfirm(false);
      dispatch(deleteScoreFromGroup({ groupId, id: data.id }));
    }
  };
  const judgeHandle = () => {
    const thisGroup = groups.find((_) => _.id === groupId);
    if (!thisGroup) return;

    if (!data.recogResult.length) return;

    const { chosen, rawChosen } = standardize(data.recogResult);
    const { answerData, answerLength } = standardizeAnswer(thisGroup.rawAnswer);
    const judgeResult = getChosenStatus(chosen, answerData, answerLength);

    dispatch(updateScoreInGroup({ groupId, id: data.id, data: { judgeResult } }));
  };

  return (
    <div
      className={`flexcenter scrollY mt-8 w-full max-w-[80%] cursor-pointer select-none flex-wrap !justify-between rounded-[2rem] border-4 transition-all ${style[theme]}`}
      onClick={() => setShowMore((s) => !s)}
      onMouseLeave={() => setShowMore(false)}
    >
      <div className="m-2 w-1/2 px-6 py-4 text-left text-[2.5rem] font-bold line-clamp-2 md:w-[70%]">
        <Input
          className="max-w-full bg-transparent text-current"
          value={data.name}
          disabled={!showMore}
          onChange={(e) => editNameHandle(e)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="flexcenter flex-1 flex-wrap !justify-end px-6">
        <div className="m-2 p-4 text-center text-[2.5rem] font-bold line-clamp-1">
          {+(data.judgeResult?.score || 0).toFixed(2)}
        </div>
        <TrashIcon
          className="cursor-pointer"
          fill="#f87171"
          width="30"
          height="30"
          onClick={(e) => deleteHandle(e, 'open')}
        />
      </div>

      <div
        className={`h-0 w-full overflow-hidden bg-gray-900 text-gray-100 transition-all ${
          showMore ? 'h-[40rem] md:h-[22rem]' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flexcentercol mx-auto w-full max-w-[45rem] origin-top p-6 md:flex-row">
          <div className="flexcentercol w-1/2">
            <Input className="max-w-[10rem]" disabled={!showMore} />
            <Button onClick={() => judgeHandle()}>Judge</Button>
          </div>
          <div className="flex-1">
            <TesseractResult data={data} />
          </div>
        </div>
      </div>

      {deleteConfirm && (
        <ModalUI
          title="Delete action"
          onClick={(e) => deleteHandle(e)}
          cancelHandle={() => setDeleteConfirm(false)}
        >
          <div className="flexcentercol mt-6">
            <p className="text-gray-400">Delete the score ?</p>
          </div>
        </ModalUI>
      )}
    </div>
  );
};
