import { addScoreToGroup, deleteScoreGroup, updateScoreGroup } from '@/redux/scoreGroupsSlice';
import { ToastDefaultConfig } from '@/shared';
import { copyToClipboard } from '@/utils';
import {
  AscFilterIcon,
  BackIcon,
  CopyIcon,
  DescFilterIcon,
  PlusIcon,
  TrashIcon,
} from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input, Label, SearchBar } from '@cpns/shared';
import { RootState, ScoreDetailsType, ScoreGroupProps } from '@shared/types';
import { FC, useCallback, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DetailItemCard } from './DetailItemCard';

interface Inputs {
  class: string;
  type: string;
  subject: string;
}

export const DetailItem: FC = () => {
  const [isAsc, setAsc] = useState(false);
  const [seachValue, setSearchValue] = useState('');

  const { resultId } = useParams();
  const navigate = useNavigate();

  const { scoreGroups } = useSelector((s: RootState) => s.scoreGroups);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(updateScoreGroup({ data, groupId: resultId }));
  };

  const addHandle = useCallback(() => {
    if (!resultId) return;

    dispatch(
      addScoreToGroup({
        groupId: resultId,
        name: 'New ' + (Math.random() * 5 + 5).toFixed(1),
        score: (Math.random() * 5 + 5).toFixed(1),
      })
    );
  }, [resultId, scoreGroups]);
  const deleteHandle = useCallback(() => {
    if (!resultId) return;

    dispatch(deleteScoreGroup(resultId));
    navigate(-1);
  }, [resultId, scoreGroups]);
  const copyHandle = useCallback(() => {
    if (resultId) {
      copyToClipboard(resultId);
      toast.success('Copy to clipboard !', {
        ...ToastDefaultConfig,
        toastId: 'copy-success',
      });
    }
  }, [resultId]);

  const { scores, group } = useMemo<{ scores: ScoreDetailsType; group: ScoreGroupProps }>(() => {
    const data = scoreGroups.find((item) => item.id + '' === resultId);
    if (!data) return { scores: [], group: {} as ScoreGroupProps };

    return {
      scores:
        [...data?.scores]
          ?.filter((item) => item.name.toLowerCase().includes(seachValue))
          ?.sort((a, b) => (isAsc ? a.score - b.score : b.score - a.score)) || [],
      group: data,
    };
  }, [resultId, scoreGroups, isAsc, seachValue]);

  return (
    <div className="p-4">
      <div className="flexcentercol">
        <div className="flexcenter m-4 select-none flex-wrap gap-6 p-6">
          <BackIcon className="!my-0 scale-75 text-sky-200" onClick={() => navigate(-1)} />

          <Label
            className="flexcenter cursor-pointer"
            theme="teal"
            onClick={() => setAsc((s) => !s)}
          >
            Score
            {isAsc ? (
              <AscFilterIcon className="mx-2" width="30" height="30" />
            ) : (
              <DescFilterIcon className="mx-2" width="30" height="30" />
            )}
          </Label>

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
            onClick={() => copyHandle()}
          />
        </div>

        <div className="container mx-auto my-12 h-[8rem] w-max overflow-hidden rounded-[3rem] bg-ct-bg-600 transition-all hover:h-[46rem]">
          <div className="m-2 p-4 text-center text-[3rem] font-bold">Amount: {scores.length}</div>
          <form
            className="flexcentercol w-full p-8 text-center text-[5rem] font-bold line-clamp-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              placeholder="Class"
              defaultValue={group?.class || ''}
              formHandle={{
                ...register('class', {
                  validate: {
                    notEmpty: (v) => !!v.trim().length || 'Cannot empty',
                    isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid class',
                  },
                }),
              }}
            />
            {errors?.class && (
              <ErrorMessage className="text-[3rem]" content={errors.class.message || ''} />
            )}

            <Input
              placeholder="Subject"
              defaultValue={group?.subject || ''}
              formHandle={{
                ...register('subject', {
                  validate: {
                    notEmpty: (v) => !!v.trim().length || 'Cannot empty',
                    isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid subject',
                  },
                }),
              }}
            />
            {errors?.subject && (
              <ErrorMessage className="text-[3rem]" content={errors.subject.message || ''} />
            )}

            <Input
              placeholder="Type"
              defaultValue={group?.type || ''}
              formHandle={{
                ...register('type', {
                  validate: {
                    notEmpty: (v) => !!v.trim().length || 'Cannot empty',
                    isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid type',
                  },
                }),
              }}
            />
            {errors?.type && (
              <ErrorMessage className="text-[3rem]" content={errors.type.message || ''} />
            )}

            <Button className="!text-[3.2rem]" type="submit">
              Edit
            </Button>
          </form>
        </div>

        <SearchBar onChange={(e) => setSearchValue(e.currentTarget.value.trim().toLowerCase())} />
      </div>

      <div className="flexcentercol container mx-auto h-[50vh] min-h-[50rem] !justify-start gap-6 overflow-y-auto overflow-x-hidden">
        <div className="flexcenter sticky top-0 left-0 mt-6 w-full max-w-[80%] select-none flex-wrap !justify-between bg-ct-bg-700 px-2 transition-all">
          <div className="m-2 w-[70%] p-4 text-left text-[3.2rem] font-bold line-clamp-1">Name</div>
          <div className="flexcenter w-[26%] flex-wrap">
            <div className="m-2 p-4 text-center text-[2.9rem] font-bold">Score</div>
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
