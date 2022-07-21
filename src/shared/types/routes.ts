export type RoutesType = {
  path: {
    index: string;
    others?: {
      [key: string]: {
        path: string;
        component: any;
      };
    };
  };
  component: any;
}[];
