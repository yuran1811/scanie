import { JudgeSourcesState, ScoreGroupsState } from '@shared/types';
import { ToastOptions } from 'react-toastify';

export const defaultScoresStore: ScoreGroupsState = {
  scoreGroups: [],
  searchOpts: {
    value: '',
    isSearch: false,
  },
  filter: {
    class: false,
    subject: false,
    type: false,
  },
  sortAmount: 'asc',
};

export const defaultJudgeSourcesStore: JudgeSourcesState = {
  judgeSourceGroups: [],
  searchOpts: {
    value: '',
    isSearch: false,
  },
  filter: {
    class: false,
    subject: false,
    type: false,
  },
};

export const ToastDefaultConfig: ToastOptions = {
  className: 'text-[2.5rem] text-center',
  autoClose: 1000,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: true,
  position: 'bottom-center',
  progress: undefined,
  hideProgressBar: false,
};
