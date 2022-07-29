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
import { Button, Input, Label, ModalUI, SearchBar, TextArea } from '@cpns/shared';
import { RootState, ScoreDetailsType, ScoreGroupProps } from '@shared/types';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
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
  answer: string;
}

export const DetailItem: FC = () => {
  const [isAsc, setAsc] = useState(false);
  const [answer, setAnswer] = useState('');
  const [seachValue, setSearchValue] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const thisItem = useRef<HTMLDivElement>(null);

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
    dispatch(
      updateScoreGroup({
        data: { ...data, rawAnswer: answer?.toString()?.trim()?.toLowerCase() || '' },
        groupId: resultId,
      })
    );
  };
  const addHandle = () => {
    // if (!resultId) return;
    // dispatch(
    //   addScoreToGroup({
    //     groupId: resultId,
    //     name: 'New ' + (Math.random() * 5 + 5).toFixed(1),
    //     score: (Math.random() * 5 + 5).toFixed(1),
    //     recogResult: null,
    //   })
    // );
  };
  const deleteHandle = (type: string = 'delete') => {
    if (!resultId) return;

    if (!deleteConfirm && type === 'open') {
      setDeleteConfirm(true);
      return;
    }

    if (type === 'delete') {
      setDeleteConfirm(false);
      dispatch(deleteScoreGroup(resultId));
      navigate(-1);
    }
  };
  const copyHandle = () => {
    if (resultId) {
      copyToClipboard(resultId);
      toast.success('Copy to clipboard !', {
        ...ToastDefaultConfig,
        toastId: 'copy-success',
      });
    }
  };

  const { scores, group } = useMemo<{ scores: ScoreDetailsType; group: ScoreGroupProps }>(() => {
    const data = scoreGroups.find((item) => item.id + '' === resultId);
    if (!data) return { scores: [], group: {} as ScoreGroupProps };

    setAnswer(data?.rawAnswer || '');

    return {
      scores:
        [...data?.scores]
          ?.filter((item) => item.name.toLowerCase().includes(seachValue))
          ?.sort((a, b) =>
            isAsc
              ? +a.judgeResult.score - +b.judgeResult.score
              : +b.judgeResult.score - +a.judgeResult.score
          ) || [],
      group: data,
    };
  }, [resultId, scoreGroups, isAsc, seachValue]);

  useEffect(() => {
    thisItem.current?.scrollIntoView({
      block: 'start',
      inline: 'start',
      behavior: 'smooth',
    });
  }, [resultId, deleteConfirm]);

  return (
    <div ref={thisItem} className="p-4">
      <div className="flexcentercol">
        <div className="flexcenter m-4 select-none flex-wrap gap-6 p-6">
          <BackIcon className="!my-0 scale-75 text-sky-200" onClick={() => navigate(-1)} />

          <Label
            className="flexcenter cursor-pointer transition-all"
            theme="teal"
            isActive={isAsc}
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
            onClick={() => deleteHandle('open')}
          />
          <CopyIcon
            className="cursor-pointer"
            fill="#9ca3af"
            width="35"
            height="35"
            onClick={() => copyHandle()}
          />
        </div>

        <div className="container mx-auto my-12 h-[30rem] w-max overflow-hidden rounded-[3rem] bg-ct-bg-600 transition-all hover:h-[54rem]">
          <div className="m-2 p-4 text-center text-[3rem] font-bold">Amount: {scores.length}</div>
          <form
            className="flexcentercol w-full p-8 pt-0 text-center text-[5rem] font-bold line-clamp-1"
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

            <TextArea
              className="h-48 resize-none border-r-sky-200 border-l-sky-200"
              placeholder="Answer"
              value={answer}
              onChange={(e: any) => setAnswer(e?.currentTarget?.value || '')}
            />

            <Button className="text-[3rem]" type="submit">
              Edit
            </Button>
          </form>
        </div>

        <SearchBar onChange={(e) => setSearchValue(e.currentTarget.value.trim().toLowerCase())} />
      </div>

      <div className="flexcentercol container mx-auto min-h-[50rem] !justify-start gap-6 overflow-y-auto overflow-x-hidden">
        <div className="flexcenter sticky top-0 left-0 mt-6 w-full max-w-[80%] select-none flex-wrap !justify-between bg-ct-bg-700 px-2 transition-all">
          <div className="m-2 w-[70%] p-4 text-left text-[2.5rem] font-bold line-clamp-1">Name</div>
          <div className="flexcenter w-[26%] flex-wrap">
            <div className="m-2 p-4 text-center text-[2.5rem] font-bold">Score</div>
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

      {deleteConfirm && (
        <ModalUI
          title="Delete action"
          onClick={() => deleteHandle()}
          cancelHandle={() => setDeleteConfirm(false)}
        >
          <div className="flexcentercol mt-6">
            <p className="text-gray-400">Delete the groups ?</p>
            <p className="text-gray-400">( All the scores will be removed )</p>
          </div>
        </ModalUI>
      )}
    </div>
  );
};
