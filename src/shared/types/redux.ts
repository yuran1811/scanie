import { Line } from "tesseract.js";

import { ChosenStatusType } from "./recognition";

export type RecogResultType = Pick<Line, "text">[];

export interface ScoreGroupProps {
  id: string;
  amount: string;
  subject: string;
  class: string;
  type: string;
  rawAnswer: string;
  answerKeys: {
    [answerId: string]: {
      [key: string]: string;
    };
  };
  scores: ScoreDetailsType;
  [key: string]: any;
}

export interface ScoreDetailProps {
  id: string;
  name: string;
  answerId: string;
  judgeResult: ChosenStatusType;
  recogResult: RecogResultType;
}

export type ScoreGroupsType = ScoreGroupProps[];
export type ScoreDetailsType = ScoreDetailProps[];

export interface ScoreGroupsState {
  scoreGroups: ScoreGroupsType;
  searchOpts: {
    value: string;
    isSearch: boolean;
  };
  filter: {
    class: boolean;
    subject: boolean;
    type: boolean;
    [key: string]: boolean;
  };
  sortAmount: "desc" | "asc";
}

// <-- === . === --->
export interface JudgeSourceGroupProps {
  id: string;
  class: string;
  subject: string;
  type: string;
  sources: JudgeSourceDetailProps[];
  [key: string]: any;
}

export interface JudgeSourceDetailProps {
  id: string;
  name: string;
}

export interface JudgeSourcesState {
  judgeSourceGroups: JudgeSourceGroupProps[];
  searchOpts: {
    value: string;
    isSearch: boolean;
  };
  filter: {
    class: boolean;
    subject: boolean;
    type: boolean;
    [key: string]: boolean;
  };
}

// <-- === . === --->
export interface ImgSourcesProps {
  id: string;
  url: string;
  recogResult: RecogResultType;
}

export interface ImgSourcesState {
  imgSources: ImgSourcesProps[];
}

// <-- === . === --->
export interface RootState {
  scoreGroups: ScoreGroupsState;
  judgeSources: JudgeSourcesState;
  imgSources: ImgSourcesState;
}
