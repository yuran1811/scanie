import { createSlice } from '@reduxjs/toolkit';
import { defaultScoresStore } from '@shared/constants';

export const scoresSlice = createSlice({
  name: 'scores',
  initialState: {
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
  },
  reducers: {
    resetState: (state) => {
      Object.assign(state, defaultScoresStore);
    },
    setScores: (state, { payload }) => {
      state.scores = payload;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { resetState, setScores } = scoresSlice.actions;

export default scoresSlice.reducer;
