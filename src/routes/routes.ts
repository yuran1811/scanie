import { routes } from "@/config";
import { HomePage, JudgePage, ResultPage } from "@/pages";
import { RoutesType } from "@/shared";
import { ErrorContent } from "@cpns/shared";

export const publicRoutes: RoutesType = [
  {
    label: routes.home.label,
    path: routes.home,
    component: HomePage || ErrorContent,
  },
  {
    label: routes.judge.label,
    path: routes.judge,
    component: JudgePage || ErrorContent,
  },
  {
    label: routes.results.label,
    path: routes.results,
    component: ResultPage || ErrorContent,
  },
];

export const privateRoutes: RoutesType = [];
