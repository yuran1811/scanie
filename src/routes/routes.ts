import { routes } from '@/config';
import { HomePage, JudgePage, ResultPage } from '@/pages';
import { RoutesType } from '@/shared';
import { ErrorContent } from '@cpns/shared';

export const publicRoutes: RoutesType = [
  {
    path: routes.home,
    component: HomePage || ErrorContent,
  },
  {
    path: routes.judge,
    component: JudgePage || ErrorContent,
  },
  {
    path: routes.results,
    component: ResultPage || ErrorContent,
  },
];

export const privateRoutes: RoutesType = [];
