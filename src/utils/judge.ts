import { ChosenStatusType, RecogResultType, ScoreGroupsType } from '@/shared';
import Tesseract, { Line } from 'tesseract.js';

export const recognize = async (img: string, callback: CallableFunction) => {
  try {
    const { data } = await Tesseract.recognize(img, 'eng', {
      logger: (m) => {
        callback(m);
      },
    });

    return data;
  } catch (error) {
    throw new Error(error + '');
  }
};

export const getChosenStatus = (
  chosen: { [key: string]: string } = {},
  answer: { [key: string]: string } = {},
  length: number
) => {
  const chosenStatus = {
    notRecognize: 0,
    correct: 0,
    total: length,
    score: 0,
  } as ChosenStatusType;

  Object.keys(answer).forEach((answerKey) => {
    if (!chosen[answerKey] || /[^ABCD]/gi.test(chosen[answerKey]) || !answer[answerKey]) {
      chosenStatus.notRecognize++;
      return;
    }

    if (answer[answerKey] === chosen[answerKey]) {
      chosenStatus.correct++;
    }
  });

  chosenStatus.score = (chosenStatus.correct * 10) / length;

  console.log(chosen, answer);

  return chosenStatus;
};

export const standardize = (lines: RecogResultType) => {
  const questions = lines.map((_) =>
    _.text
      .trim()
      .replace(/[\n\t]/g, '')
      .split('+')
  );

  const scores: { [key: string]: string } = {};

  questions.map((question) => {
    question.forEach((item) => {
      const pattern = item.replace(/[^A-Za-z\d]/gi, '');
      const order = pattern.match(/\d+/gi);
      if (!order) return;

      scores[+order[0]] = 'blank';

      const notChosenAns = pattern.match(/[A-Za-z]+/gi);
      const chosenAns = 'ABCD'.match(new RegExp(`[^${notChosenAns}]`, 'gim'));

      chosenAns && (scores[+order[0]] = chosenAns[0].toLowerCase());
    });
  });

  return {
    chosen: scores,
    rawChosen: questions,
  };
};

export const standardizeAnswer = (answer: string) => {
  const rawAnswer = answer.split('\n').map((item) => item.trim().replace(/\s/g, ''));
  const answerData: { [key: string]: string } = {};

  rawAnswer.forEach((item) => {
    const x = item.split('.');
    if (x.length < 2) return;

    answerData[x[0]] = x[1].toLowerCase();
  });

  return {
    answerData,
    answerLength: rawAnswer.length,
  };
};

export const getFilterGroup = (
  filter: { [key: string]: boolean },
  scoreGroups: ScoreGroupsType
) => {
  const filterResult: {
    selectLabel: string;
    labels: string[];
  } = {
    selectLabel: '',
    labels: [],
  };

  Object.keys(filter).forEach((key) => {
    if (filter[key]) filterResult.selectLabel = key;
  });

  filterResult.labels = [
    ...new Set(
      [...scoreGroups].map((group) => {
        return group[filterResult.selectLabel] as string;
      })
    ),
  ];

  filterResult.labels.sort();

  return filterResult;
};
