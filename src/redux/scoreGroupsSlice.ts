import { createSlice } from '@reduxjs/toolkit';
import { defaultScoresStore, fakeData } from '@shared/constants';
import { ScoreGroupsState } from '@shared/types';
import { v4 as uuidv4 } from 'uuid';

const { actions, reducer } = createSlice({
  name: 'scoreGroupsState',

  initialState: {
    scoreGroups: [...fakeData],
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
  } as ScoreGroupsState,

  reducers: {
    resetState: (state) => {
      Object.assign(state, defaultScoresStore);
    },

    addScoreGroup: (state, { payload }) => {
      state.scoreGroups.push({ ...payload, id: uuidv4() });
    },
    updateScoreGroup: (state, { payload }) => {
      let thisScore = state.scoreGroups.find((score) => score.id === payload);
      thisScore && Object.assign(thisScore, payload.data);
    },
    deleteScoreGroup: (state, { payload }) => {
      const scoreIdx = state.scoreGroups.findIndex((score) => score.id === payload);
      scoreIdx !== -1 && state.scoreGroups.splice(scoreIdx, 1);
    },

    addScoreToGroup: (state, { payload }) => {
      const thisGroupIdx = state.scoreGroups.findIndex((score) => score.id === payload.groupId);
      if (thisGroupIdx === -1) return;

      state.scoreGroups[thisGroupIdx].scores.push({
        id: uuidv4(),
        name: payload.name,
        score: payload.score,
      });
    },
    deleteScoreFromGroup: (state, { payload }) => {
      const thisGroupIdx = state.scoreGroups.findIndex((score) => score.id === payload.groupId);
      if (thisGroupIdx === -1) return;

      const thisIdx = state.scoreGroups[thisGroupIdx].scores.findIndex(
        (item) => item.id === payload.id
      );
      if (thisIdx === -1) return;

      state.scoreGroups[thisGroupIdx].scores.splice(thisIdx, 1);
    },

    setFilter: (state, { payload }) => {
      Object.assign(state.filter, payload);
    },
  },
});

export const {
  resetState,

  addScoreGroup,
  updateScoreGroup,
  deleteScoreGroup,

  addScoreToGroup,
  deleteScoreFromGroup,

  setFilter,
} = actions;

export default reducer;
