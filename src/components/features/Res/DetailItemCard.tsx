import { deleteScoreFromGroup } from '@/redux/scoreGroupsSlice';
import { averageScore } from '@/utils';
import { TrashIcon } from '@cpns/icons';
import { ScoreDetailProps, ScoreGroupsType } from '@shared/types';
import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface ItemCardProps {
  data: ScoreDetailProps;
  groupId: string;
  groups: ScoreGroupsType;
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
  const theme = averageScore.check(+data.score);

  const dispatch = useDispatch();

  const deleteHandle = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (!groupId) return;
      dispatch(deleteScoreFromGroup({ groupId, id: data.id }));
    },
    [groupId, groups]
  );

  return (
    <div
      className={`flexcenter mt-8 w-full max-w-[80%] cursor-pointer select-none flex-wrap !justify-between border-[4px] p-4 ${style[theme]} rounded-[2rem] transition-all`}
    >
      <div className="m-2 w-[70%] p-4 text-left text-[3.2rem] font-bold line-clamp-2 md:w-[50%]">
        {data.name}
      </div>
      <div className="flexcenter flex-1 flex-wrap">
        <div className="m-2 p-4 text-center text-[2.9rem] font-bold line-clamp-1">{data.score}</div>
        <TrashIcon
          className="cursor-pointer"
          fill="#f87171"
          width="30"
          height="30"
          onClick={deleteHandle}
        />
      </div>
    </div>
  );
};
