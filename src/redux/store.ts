import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import imgSourcesReducer from "./imgSourcesSlice";
import scoreGroupsReducer from "./scoreGroupsSlice";
// import judgeSourcesReducer from "./judgeSourcesSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      imgSources: imgSourcesReducer,
      scoreGroups: scoreGroupsReducer,
      // judgeSources: judgeSourcesReducer,
    })
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
