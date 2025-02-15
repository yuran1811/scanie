import { ScoreGroupsType } from "..";

export const fakeData: ScoreGroupsType = [
  {
    id: "6bc68f1b-b59f-48a9-bab1-1f1cf2b3bd71",
    amount: "10",
    subject: "calculus-1",
    class: "23clc09",
    type: "60mins",
    rawAnswer: "1",
    answerKeys: {
      "101": {
        "1": "A",
        "2": "B",
        "3": "C",
        "4": "D",
        "5": "A",
      },
      "102": {
        "1": "A",
        "2": "B",
        "3": "C",
        "4": "D",
        "5": "D",
      },
    },
    scores: [
      {
        id: "23127065",
        name: "Khoa Ngo",
        answerId: "101",
        judgeResult: {
          notRecognize: 0,
          correct: 5,
          total: 5,
          score: 10,
        },
        recogResult: [],
      },
      {
        id: "23127040",
        name: "Duy Bui",
        answerId: "102",
        judgeResult: {
          notRecognize: 0,
          correct: 5,
          total: 5,
          score: 10,
        },
        recogResult: [],
      },
    ],
  },
];
