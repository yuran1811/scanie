import { addScoreGroup } from '@/redux/scoreGroupsSlice';
import { DivProps } from '@/shared';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input, ModalBox } from '@cpns/shared';
import { Dispatch, FC, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface Inputs {
  class: string;
  type: string;
  subject: string;
}

interface ClassRecordAddNewProps {
  onClickHandle: Dispatch<SetStateAction<boolean>>;
}

export const ClassRecordAddNew: FC<ClassRecordAddNewProps & DivProps> = ({ onClickHandle }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      addScoreGroup({
        ...data,
        amount: 0,
        scores: [],
      })
    );
    onClickHandle(false);
  };

  return (
    <ModalBox onClick={() => onClickHandle(false)}>
      <div className="w-full p-4 text-[4rem] text-ct-color line-clamp-1">New class record</div>
      <form
        className="flexcentercol w-full p-8 text-center text-[5rem] font-bold line-clamp-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Class"
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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

        <Button className="text-[3rem]" type="submit">
          Add
        </Button>
      </form>
    </ModalBox>
  );
};
