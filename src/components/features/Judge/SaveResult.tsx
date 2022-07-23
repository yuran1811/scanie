import { addScoreToGroup } from '@/redux/scoreGroupsSlice';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input } from '@cpns/shared';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface SaveResultProps {
  score: number;
}

interface Inputs {
  name: string;
  groupId: string;
}

export const SaveResult: FC<SaveResultProps> = ({ score }) => {
  const dispatch = useDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      addScoreToGroup({
        groupId: data.groupId,
        name: data.name,
        score,
      })
    );

    reset();
  };

  return (
    <div className="flexcenter flex-wrap w-full gap-6">
      <form
        className="flexcentercol p-8 font-bold text-[5rem] text-center w-full line-clamp-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="border-b-sky-200 !max-w-[40rem]"
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
          className="border-b-sky-200 !max-w-[20rem]"
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

        <div className="font-bold text-[4rem]">{score}</div>

        <Button type="submit" />
      </form>
    </div>
  );
};
