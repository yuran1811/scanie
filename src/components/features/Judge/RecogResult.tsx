import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { deleteImgSource } from "@/redux/imgSourcesSlice";
import { addScoreToGroup } from "@/redux/scoreGroupsSlice";
import { RecogResultType, ToastDefaultConfig } from "@/shared";
import { ErrorMessage } from "@cpns/interfaces";
import { Button, Input } from "@cpns/shared";

import "react-toastify/dist/ReactToastify.css";

interface RecogResultProps {
  recogId: string;
  recogResult: RecogResultType;
}

interface Inputs {
  name: string;
  groupId: string;
}

export const RecogResult: FC<RecogResultProps> = ({ recogId, recogResult }) => {
  const dispatch = useDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!recogResult) return;
    dispatch(
      addScoreToGroup({
        groupId: data.groupId,
        name: data.name,
        judgeResult: { score: 0, correct: 0, notRecognize: 0, total: 0 },
        recogResult,
      }),
    );
    dispatch(deleteImgSource(recogId));
    toast.success("Add successfully !", { ...ToastDefaultConfig });
    reset();
  };

  return (
    <form
      className="flexcentercol w-max gap-4 text-center font-bold"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="max-w-[30rem]! border-b-sky-200"
        placeholder="Name"
        defaultValue=""
        formHandle={{
          ...register("name", {
            validate: {
              notEmpty: (v) => !!v.trim().length || "Cannot empty",
              isValid: (v) => /[\w\d\s]*/.test(v.trim()) || "Invalid name",
            },
          }),
        }}
      />
      {errors?.name && <ErrorMessage content={errors.name.message || ""} />}

      <Input
        className="max-w-[20rem]! border-b-sky-200"
        placeholder="Group Id"
        defaultValue=""
        formHandle={{
          ...register("groupId", {
            validate: {
              notEmpty: (v) => !!v.trim().length || "Cannot empty",
              isValid: (v) => /[\w\d\s]*/.test(v.trim()) || "Invalid groupId",
            },
          }),
        }}
      />
      {errors?.groupId && <ErrorMessage content={errors.groupId.message || ""} />}

      <Button type="submit">Add</Button>
    </form>
  );
};
