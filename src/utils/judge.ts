import { createWorker, OEM } from "tesseract.js";

import { ChosenStatusType, RecogResultType, ScoreGroupsType } from "@/shared";

export const recognize = async (img: string, callback: CallableFunction) => {
  try {
    const worker = await createWorker("eng", OEM.TESSERACT_LSTM_COMBINED, {
      legacyCore: false,
      logger: (m) => callback(m),
    });
    await worker.setParameters({
      tessedit_char_whitelist:
        "0123456789" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "@:=. ",
    });

    const { data } = await worker.recognize(img, {}, { blocks: true });

    await worker.terminate();

    return data;
  } catch (error) {
    throw new Error(error + "");
  }
};

export const getChosenStatus = (
  chosen: { [key: string]: string } = {},
  answer: { [key: string]: string } = {},
  length: number,
) => {
  const chosenStatus = {
    notRecognize: 0,
    correct: 0,
    total: length,
    score: 0,
  } as ChosenStatusType;

  Object.keys(answer).forEach((answerKey) => {
    if (
      !chosen[answerKey] ||
      /[^abcd]/gi.test(chosen[answerKey].toLowerCase()) ||
      !answer[answerKey]
    ) {
      chosenStatus.notRecognize++;
      return;
    }

    if (answer[answerKey] === chosen[answerKey]) {
      chosenStatus.correct++;
    }
  });

  chosenStatus.score = 10 * (chosenStatus.correct / length);

  console.log("chosen and answer", chosen, answer);

  return chosenStatus;
};

export const standardize = (lines: RecogResultType) => {
  const questions = lines
    .map((_) =>
      _.text.trim().replace(/[\t]/g, "").replace(/\s\s+/g, " ").replace(/\n\n+/g, "\n").split("\n"),
    )[0]
    .slice(1);

  const scores: { [key: string]: string } = {};

  questions.map((question) => {
    const patterns = question.split("=").map((_) => _.trim());
    patterns.pop();
    if (!patterns.length || patterns.length !== 5) return;

    const order = patterns[0];
    const notChosenAns = patterns.indexOf("@") - 1;
    scores[+order] = notChosenAns !== -1 ? "abcd"[notChosenAns] : "blank";
  });

  return {
    chosen: scores,
    rawChosen: questions,
  };
};

export const standardizeAnswer = (answer: string) => {
  const rawAnswer = answer
    .replace(/[\t]/g, "")
    .replace(/[\s\s+]/g, " ")
    .replace(/[\n\n+]/g, "\n")
    .split(" ")
    .map((item) => item.replace(/\s/g, ""));
  const answerData: { [key: string]: string } = {};

  console.log("🚀 ~ standardizeAnswer ~ rawAnswer:", rawAnswer);

  rawAnswer.forEach((item) => {
    const x = item.split(/[\.\\\/\:]/);
    if (x.length < 2) return;

    answerData[+x[0].trim()] = x[1].trim().toLowerCase();
  });

  return {
    answerData,
    answerLength: rawAnswer.length,
  };
};

export const getFilterGroup = (
  filter: { [key: string]: boolean },
  scoreGroups: ScoreGroupsType,
) => {
  const filterResult: {
    selectLabel: string;
    labels: string[];
  } = {
    selectLabel: "",
    labels: [],
  };

  Object.keys(filter).forEach((key) => {
    if (filter[key]) filterResult.selectLabel = key;
  });

  filterResult.labels = [
    ...new Set(
      [...scoreGroups].map((group) => {
        return group[filterResult.selectLabel] as string;
      }),
    ),
  ];

  filterResult.labels.sort();

  return filterResult;
};
