import { defaultJudgeSourcesStore, JudgeSourcesState } from '@/shared';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const { actions, reducer } = createSlice({
  name: 'judgeSourcesState',

  initialState: {
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
  } as JudgeSourcesState,

  reducers: {
    resetState: (state) => {
      Object.assign(state, defaultJudgeSourcesStore);
    },

    addJudeSourceGroup: (state, { payload }) => {
      state.judgeSourceGroups.push({ ...payload, id: uuidv4() });
    },
    updateJudeSourceGroup: (state, { payload }) => {
      const idx = state.judgeSourceGroups.findIndex((source) => source.id === payload.groupId);
      idx !== -1 &&
        (state.judgeSourceGroups[idx] = Object.assign(
          {},
          { ...state.judgeSourceGroups[idx], ...payload.data }
        ));
    },
    deleteJudeSourceGroup: (state, { payload }) => {
      const idx = state.judgeSourceGroups.findIndex((source) => source.id === payload);
      idx !== -1 && state.judgeSourceGroups.splice(idx, 1);
    },

    addJudgeSourceToGroup: (state, { payload }) => {
      const idx = state.judgeSourceGroups.findIndex((source) => source.id === payload.groupId);
      if (idx === -1) return;

      state.judgeSourceGroups[idx].sources.push({ id: uuidv4(), name: payload.name });
    },
    deleteJudgeSourceFromGroup: (state, { payload }) => {
      const idx = state.judgeSourceGroups.findIndex((source) => source.id === payload.groupId);
      if (idx === -1) return;

      const thisIdx = state.judgeSourceGroups[idx].sources.findIndex(
        (item) => item.id === payload.id
      );
      if (thisIdx === -1) return;

      state.judgeSourceGroups[idx].sources.splice(thisIdx, 1);
    },

    setFilter: (state, { payload }) => {
      Object.assign(state.filter, payload);
    },
  },
});

export const {
  resetState,

  addJudeSourceGroup,
  updateJudeSourceGroup,
  deleteJudeSourceGroup,

  addJudgeSourceToGroup,
  deleteJudgeSourceFromGroup,

  setFilter,
} = actions;

export default reducer;
