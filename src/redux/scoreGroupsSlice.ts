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
      const idx = state.scoreGroups.findIndex((score) => score.id === payload.groupId);
      idx !== -1 &&
        (state.scoreGroups[idx] = Object.assign(
          {},
          { ...state.scoreGroups[idx], ...payload.data }
        ));
    },
    deleteScoreGroup: (state, { payload }) => {
      const idx = state.scoreGroups.findIndex((score) => score.id === payload);
      idx !== -1 && state.scoreGroups.splice(idx, 1);
    },

    addScoreToGroup: (state, { payload }) => {
      const idx = state.scoreGroups.findIndex((score) => score.id === payload.groupId);
      if (idx === -1) return;

      state.scoreGroups[idx].scores.push({
        id: uuidv4(),
        name: payload.name,
        score: payload.score,
      });
    },
    deleteScoreFromGroup: (state, { payload }) => {
      const idx = state.scoreGroups.findIndex((score) => score.id === payload.groupId);
      if (idx === -1) return;

      const thisIdx = state.scoreGroups[idx].scores.findIndex((item) => item.id === payload.id);
      if (thisIdx === -1) return;

      state.scoreGroups[idx].scores.splice(thisIdx, 1);
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
