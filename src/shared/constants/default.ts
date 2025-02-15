import { ToastOptions } from "react-toastify";

import { JudgeSourcesState, ScoreGroupsState } from "@shared/types";

export const defaultScoresStore: ScoreGroupsState = {
  scoreGroups: [],
  searchOpts: {
    value: "",
    isSearch: false,
  },
  filter: {
    class: false,
    subject: false,
    type: false,
  },
  sortAmount: "asc",
};

export const defaultJudgeSourcesStore: JudgeSourcesState = {
  judgeSourceGroups: [],
  searchOpts: {
    value: "",
    isSearch: false,
  },
  filter: {
    class: false,
    subject: false,
    type: false,
  },
};

export const ToastDefaultConfig: ToastOptions = {
  className: "text-2xl text-center px-4",
  autoClose: 1200,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: true,
  position: "bottom-center",
  progress: undefined,
  hideProgressBar: false,
};
