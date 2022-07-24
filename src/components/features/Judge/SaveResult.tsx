import { addScoreToGroup } from '@/redux/scoreGroupsSlice';
import { ChosenStatusType, ToastDefaultConfig } from '@/shared';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input } from '@cpns/shared';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SaveResultProps {
  result: ChosenStatusType | null;
}

interface Inputs {
  name: string;
  groupId: string;
}

export const SaveResult: FC<SaveResultProps> = ({ result }) => {
  const dispatch = useDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!result) return;

    dispatch(
      addScoreToGroup({
        groupId: data.groupId,
        name: data.name,
        score: result.score,
      })
    );

    toast.success('Add successfully !', {
      ...ToastDefaultConfig,
    });

    reset();
  };

  return (
    <div className="flexcenter w-full flex-wrap gap-6">
      <form
        className="flexcentercol w-max gap-4 rounded-[2.6rem] border-4 border-sky-200 border-t-transparent p-8 text-center text-[5rem] font-bold line-clamp-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="!max-w-[40rem] border-b-sky-200"
          placeholder="Name"
          defaultValue=""
          formHandle={{
            ...register('name', {
              validate: {
                notEmpty: (v) => !!v.trim().length || 'Cannot empty',
                isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid name',
              },
            }),
          }}
        />
        {errors?.name && (
          <ErrorMessage className="text-[3rem]" content={errors.name.message || ''} />
        )}

        <Input
          className="!max-w-[20rem] border-b-sky-200"
          placeholder="Group Id"
          defaultValue=""
          formHandle={{
            ...register('groupId', {
              validate: {
                notEmpty: (v) => !!v.trim().length || 'Cannot empty',
                isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid groupId',
              },
            }),
          }}
        />
        {errors?.groupId && (
          <ErrorMessage className="text-[3rem]" content={errors.groupId.message || ''} />
        )}

        <div className="my-6">
          <div className="text-[3rem] font-bold text-zinc-400">
            Not recognize - {result?.notRecognize || 0}
          </div>
          <div className="text-[3rem] font-bold text-green-500">
            Correct - {result?.correct || 0}
          </div>
          <div className="text-[3rem] font-bold">Score - {result?.score || 0}</div>
        </div>

        <Button className="text-[3rem]" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};
