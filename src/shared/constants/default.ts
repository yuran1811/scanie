import { ScoreGroupsState } from '@shared/types';
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

export const ToastDefaultConfig: ToastOptions = {
  className: 'text-[2.4rem] text-center',
  autoClose: 1500,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: true,
  position: 'bottom-center',
  progress: undefined,
  hideProgressBar: false,
};
