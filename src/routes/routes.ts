import { routes } from '@/config';
import { HomePage, JudgePage } from '@/pages';
import { ErrorContent } from '@cpns/shared';
import { RoutesType } from '@shared/types';

export const publicRoutes: RoutesType = [
  {
    path: routes.home,
    component: HomePage || ErrorContent,
  },
  {
    path: routes.judge,
    component: JudgePage || ErrorContent,
  },
];

export const privateRoutes: RoutesType = [];
