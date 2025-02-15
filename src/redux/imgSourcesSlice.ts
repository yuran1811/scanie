import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { ImgSourcesProps, ImgSourcesState } from "@shared/types";

const { actions, reducer } = createSlice({
  name: "imgSourcesState",

  initialState: {
    imgSources: [],
  } as ImgSourcesState,

  reducers: {
    resetState: (state) => {
      state.imgSources.length = 0;
    },

    addImgSource: (
      state,
      { payload }: { payload: Omit<ImgSourcesProps, "id" | "recogResult"> }
    ) => {
      state.imgSources.unshift({ ...payload, id: uuidv4(), recogResult: [] });
    },
    updateImgSource: (state, { payload }: { payload: { id: string; data: any } }) => {
      const idx = state.imgSources.findIndex((source) => source.id === payload.id);
      idx !== -1 &&
        (state.imgSources[idx] = Object.assign({}, { ...state.imgSources[idx], ...payload.data }));
    },
    deleteImgSource: (state, { payload }: { payload: string }) => {
      const idx = state.imgSources.findIndex((source) => source.id === payload);
      idx !== -1 && state.imgSources.splice(idx, 1);
    },
  },
});

export const {
  resetState,

  addImgSource,
  updateImgSource,
  deleteImgSource,
} = actions;

export default reducer;
