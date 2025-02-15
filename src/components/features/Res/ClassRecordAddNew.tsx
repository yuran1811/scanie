import { Dispatch, FC, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { addScoreGroup } from "@/redux/scoreGroupsSlice";
import { DivProps } from "@/shared";
import { ErrorMessage } from "@cpns/interfaces";
import { Button, Input, ModalBox } from "@cpns/shared";

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
      }),
    );
    onClickHandle(false);
  };

  return (
    <ModalBox className="rounded-xl p-4" onClick={() => onClickHandle(false)}>
      <div className="text-ct-color line-clamp-1 w-full text-3xl">New class record</div>

      <form
        className="flexcentercol **:text-ct-color mt-4 w-full gap-3 text-center font-bold"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Class"
          defaultValue=""
          formHandle={{
            ...register("class", {
              validate: {
                notEmpty: (v) => !!v.trim().length || "Cannot empty",
                isValid: (v) => /[\w\d\s]*/.test(v.trim()) || "Invalid class",
              },
            }),
          }}
        />
        {errors?.class && <ErrorMessage className="" content={errors.class.message || ""} />}

        <Input
          placeholder="Subject"
          defaultValue=""
          formHandle={{
            ...register("subject", {
              validate: {
                notEmpty: (v) => !!v.trim().length || "Cannot empty",
                isValid: (v) => /[\w\d\s]*/.test(v.trim()) || "Invalid subject",
              },
            }),
          }}
        />
        {errors?.subject && <ErrorMessage className="" content={errors.subject.message || ""} />}

        <Input
          placeholder="Type"
          defaultValue=""
          formHandle={{
            ...register("type", {
              validate: {
                notEmpty: (v) => !!v.trim().length || "Cannot empty",
                isValid: (v) => /[\w\d\s]*/.test(v.trim()) || "Invalid type",
              },
            }),
          }}
        />
        {errors?.type && <ErrorMessage className="" content={errors.type.message || ""} />}

        <Button className="" type="submit">
          Add
        </Button>
      </form>
    </ModalBox>
  );
};
