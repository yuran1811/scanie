import { routes } from '@/config';
import { HomePage, JudgePage, ResultPage } from '@/pages';
import { ErrorContent } from '@cpns/shared';
import { RoutesType } from '@shared/types';

export const publicRoutes: RoutesType = [
  {
    path: routes.home,
    component: HomePage || ErrorContent,
  },
  // {
  //   path: routes.judge,
  //   component: JudgePage || ErrorContent,
  // },
  {
    path: routes.results,
    component: ResultPage || ErrorContent,
  },
];

export const privateRoutes: RoutesType = [];
