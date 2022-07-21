import { ScoresState } from '@shared/types';

export const defaultScoresStore: ScoresState = {
  scores: [],
  searchOpts: {
    value: '',
    isSearch: false,
  },
  filter: {
    class: false,
    subject: false,
    type: false,
    sortAmount: 'asc',
  },
};
