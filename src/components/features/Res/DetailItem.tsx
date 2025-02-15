import { FC, useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteScoreGroup, updateScoreGroup } from "@/redux/scoreGroupsSlice";
import { ToastDefaultConfig } from "@/shared";
import { copyToClipboard } from "@/utils";
import {
  AscFilterIcon,
  BackIcon,
  CopyIcon,
  DescFilterIcon,
  PlusIcon,
  TrashIcon,
} from "@cpns/icons";
import { ErrorMessage } from "@cpns/interfaces";
import { Button, Input, Label, ModalUI, SearchBar, TextArea } from "@cpns/shared";
import { RootState, ScoreDetailsType, ScoreGroupProps } from "@shared/types";
import { DetailItemCard } from "./DetailItemCard";

import "react-toastify/dist/ReactToastify.css";

interface Inputs {
  class: string;
  type: string;
  subject: string;
  answer: string;
}

export const DetailItem: FC = () => {
  const [isAsc, setAsc] = useState(false);
  const [answer, setAnswer] = useState("");
  const [seachValue, setSearchValue] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isJudgeAll, setJudgeAll] = useState(false);

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
        data: { ...data, rawAnswer: answer?.toString()?.trim()?.toLowerCase() || "" },
        groupId: resultId,
      }),
    );
  };
  const addHandle = () => {
    // if (!resultId) return;
    // dispatch(
    //   addScoreToGroup({
    //     groupId: resultId,
    //     name: "New " + (Math.random() * 5 + 5).toFixed(1),
    //     score: (Math.random() * 5 + 5).toFixed(1),
    //   }),
    // );
  };
  const deleteHandle = (type: string = "delete") => {
    if (!resultId) return;

    if (!deleteConfirm && type === "open") {
      setDeleteConfirm(true);
      return;
    }

    if (type === "delete") {
      setDeleteConfirm(false);
      dispatch(deleteScoreGroup(resultId));
      navigate(-1);
    }
  };
  const copyHandle = () => {
    if (resultId) {
      copyToClipboard(resultId);
      toast.success("Copy to clipboard!", {
        ...ToastDefaultConfig,
        toastId: "copy-success",
      });
    }
  };
  const judgeAllHandle = () => {
    setJudgeAll(true);
  };

  const { scores, group } = useMemo<{ scores: ScoreDetailsType; group: ScoreGroupProps }>(() => {
    const data = scoreGroups.find((item) => item.id + "" === resultId);
    if (!data) return { scores: [], group: {} as ScoreGroupProps };

    setAnswer(data?.rawAnswer || "");

    return {
      scores:
        [...data?.scores]
          ?.filter((item) => item.name.toLowerCase().includes(seachValue))
          ?.sort((a, b) =>
            isAsc
              ? +a.judgeResult.score - +b.judgeResult.score
              : +b.judgeResult.score - +a.judgeResult.score,
          ) || [],
      group: data,
    };
  }, [resultId, scoreGroups, isAsc, seachValue]);

  useEffect(() => {
    setJudgeAll(false);
  }, [answer]);

  useEffect(() => {
    thisItem.current?.scrollIntoView({
      block: "start",
      inline: "start",
      behavior: "smooth",
    });
  }, [resultId, deleteConfirm]);

  return (
    <div ref={thisItem}>
      <div className="flexcentercol gap-3">
        <div className="flexcenter flex-wrap gap-4 py-6 select-none">
          <BackIcon className="mr-4" onClick={() => navigate(-1)}>
            Back
          </BackIcon>

          <Label
            className="flexcenter cursor-pointer transition-all"
            theme="teal"
            isActive={isAsc}
            onClick={() => setAsc((s) => !s)}
          >
            Score
            {isAsc ? (
              <AscFilterIcon className="ml-2" width="30" height="30" />
            ) : (
              <DescFilterIcon className="ml-2" width="30" height="30" />
            )}
          </Label>

          <PlusIcon className="cursor-pointer text-3xl" onClick={() => addHandle()} />
          <TrashIcon
            className="cursor-pointer text-3xl text-red-300"
            onClick={() => deleteHandle("open")}
          />
          <CopyIcon className="cursor-pointer text-3xl" onClick={() => copyHandle()} />
        </div>

        <div className="bg-ct-bg-600 container mx-auto h-58 w-max overflow-hidden rounded-xl hover:h-max">
          <div className="pt-4 text-center font-bold">Amount: {scores.length}</div>
          <form
            className="flexcentercol w-max gap-3 p-4 text-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              className="!max-w-50"
              placeholder="Class"
              defaultValue={group?.class || ""}
              formHandle={{
                ...register("class", {
                  validate: {
                    notEmpty: (v) => !!v.trim().length || "Cannot empty",
                    isValid: (v) => /[\w\d\s]*/.test(v.trim()) || "Invalid class",
                  },
                }),
              }}
            />
            {errors?.class && <ErrorMessage content={errors.class.message || ""} />}

            <Input
              className="!max-w-50"
              placeholder="Subject"
              defaultValue={group?.subject || ""}
              formHandle={{
                ...register("subject", {
                  validate: {
                    notEmpty: (v) => !!v.trim().length || "Cannot empty",
                    isValid: (v) => /[\w\d\s]*/.test(v.trim()) || "Invalid subject",
                  },
                }),
              }}
            />
            {errors?.subject && <ErrorMessage content={errors.subject.message || ""} />}

            <Input
              className="!max-w-50"
              placeholder="Type"
              defaultValue={group?.type || ""}
              formHandle={{
                ...register("type", {
                  validate: {
                    notEmpty: (v) => !!v.trim().length || "Cannot empty",
                    isValid: (v) => /[\w\d\s]*/.test(v.trim()) || "Invalid type",
                  },
                }),
              }}
            />
            {errors?.type && <ErrorMessage content={errors.type.message || ""} />}

            <TextArea
              className="!max-w-50 resize-y border-r-sky-200 border-l-sky-200"
              value={answer}
              placeholder="Answer"
              onChange={(e: any) => setAnswer(e?.currentTarget?.value || "")}
            />

            <div className="flexcenter gap-3">
              <Button type="submit">{!isJudgeAll ? "Update" : "Edit"}</Button>
              {!isJudgeAll && <Button onClick={() => judgeAllHandle()}>Judge All</Button>}
            </div>
          </form>
        </div>

        <SearchBar onChange={(e) => setSearchValue(e.currentTarget.value.trim().toLowerCase())} />
      </div>

      <div className="flexcentercol container mx-auto mt-6 min-h-120 max-w-156 justify-start! gap-4 overflow-x-hidden overflow-y-auto">
        <div className="flexcenter bg-ct-bg-700 sticky top-0 left-0 w-full flex-wrap justify-between! px-3 py-2 font-bold transition-all select-none">
          <div className="flex-3 text-left">Name</div>
          <div className="flex-1 text-right">Score</div>
        </div>

        {scores.map((score) => (
          <DetailItemCard
            key={score.id}
            data={score}
            groupId={resultId || ""}
            groups={scoreGroups}
            isRecog={isJudgeAll}
          />
        ))}
      </div>

      {deleteConfirm && (
        <ModalUI
          title="Delete action"
          onClick={() => deleteHandle()}
          cancelHandle={() => setDeleteConfirm(false)}
        >
          <div className="flexcentercol">
            <p>Delete the groups ?</p>
            <p className="text-gray-400">(All the scores will be removed)</p>
          </div>
        </ModalUI>
      )}
    </div>
  );
};
