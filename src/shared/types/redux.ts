export interface ScoreGroupProps {
  id: string;
  amount: number;
  class: string;
  subject: string;
  type: string;
  scores: ScoreDetailsType;
  [key: string]: any;
}

export interface ScoreDetailProps {
  id: string;
  name: string;
  score: number;
}

export type ScoreGroupsType = ScoreGroupProps[];
export type ScoreDetailsType = ScoreDetailProps[];

export interface ScoreGroupsState {
  scoreGroups: ScoreGroupsType;
  searchOpts: {
    value: string;
    isSearch: boolean;
  };
  filter: {
    class: boolean;
    subject: boolean;
    type: boolean;
    [key: string]: boolean;
  };
  sortAmount: string;
}

export interface RootState {
  scoreGroups: ScoreGroupsState;
}
