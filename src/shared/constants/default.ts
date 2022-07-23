import { ScoreGroupsState } from '@shared/types';

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
    sortAmount: 'asc',
  },
};
