export type ScoresType = string[];

export interface ScoresState {
  scores: ScoresType;
  searchOpts: {
    value: string;
    isSearch: boolean;
  };
  filter: {
    class: boolean;
    subject: boolean;
    type: boolean;
    sortAmount: string;
  };
}

export interface RootState {
  scores: ScoresState;
}
