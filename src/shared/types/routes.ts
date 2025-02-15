export type RoutesType = {
  label: string;
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
