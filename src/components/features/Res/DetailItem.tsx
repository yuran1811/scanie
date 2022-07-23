import { addScoreToGroup, deleteScoreGroup } from '@/redux/scoreGroupsSlice';
import { copyToClipboard } from '@/utils';
import { BackIcon, CopyIcon, PlusIcon, TrashIcon } from '@cpns/icons';
import { Label, SearchBar } from '@cpns/shared';
import { RootState, ScoreDetailsType } from '@shared/types';
import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailItemCard } from './DetailItemCard';

export const DetailItem: FC = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const { scoreGroups } = useSelector((s: RootState) => s.scoreGroups);
  const dispatch = useDispatch();

  const addHandle = useCallback(() => {
    if (!resultId) return;

    dispatch(
      addScoreToGroup({
        groupId: resultId,
        name: 'New',
        score: (Math.random() * 5 + 5).toFixed(1),
      })
    );
  }, [resultId, scoreGroups]);
  const deleteHandle = useCallback(() => {
    if (!resultId) return;

    dispatch(deleteScoreGroup(resultId));
    navigate(-1);
  }, [resultId, scoreGroups]);

  const scores = useMemo<ScoreDetailsType>(() => {
    const data = scoreGroups.find((item) => item.id + '' === resultId);
    if (!data) return [];
    return data?.scores || [];
  }, [resultId, scoreGroups]);

  return (
    <div className="p-4">
      <div className="flexcentercol">
        <div className="select-none flexcenter flex-wrap p-6 m-4 gap-6">
          <BackIcon className="text-sky-200 !my-0 scale-75" onClick={() => navigate(-1)} />
          <Label theme="teal">Score</Label>
          <PlusIcon
            className="cursor-pointer"
            fill="white"
            width="45"
            height="45"
            onClick={() => addHandle()}
          />
          <TrashIcon
            className="cursor-pointer"
            fill="#f87171"
            width="35"
            height="35"
            onClick={() => deleteHandle()}
          />
          <CopyIcon
            className="cursor-pointer"
            fill="#9ca3af"
            width="35"
            height="35"
            onClick={() => resultId && copyToClipboard(resultId)}
          />
        </div>
        <SearchBar />
      </div>

      <div className="container min-h-[50rem] h-[50vh] mx-auto flexcentercol !justify-start gap-6 overflow-x-hidden overflow-y-auto">
        <div className="sticky top-0 left-0 flexcenter !justify-between flex-wrap select-none w-full max-w-[80%] mt-6 px-2 bg-ct-bg-700 transition-all">
          <div className="w-[70%] text-left text-[3.2rem] font-bold p-4 m-2 line-clamp-1">Name</div>
          <div className="w-[26%] flexcenter flex-wrap">
            <div className="text-center text-[2.9rem] font-bold p-4 m-2">Score</div>
          </div>
        </div>

        {scores.map((score) => (
          <DetailItemCard
            key={score.id}
            data={score}
            groupId={resultId || ''}
            groups={scoreGroups}
          />
        ))}
      </div>
    </div>
  );
};
