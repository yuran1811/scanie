import { DetailItem } from "@cpns/features/Res/DetailItem";
import { ErrorContent } from "@cpns/shared";

export const routes = {
  home: {
    label: "Home",
    index: "/",
  },

  judge: {
    label: "Judge",
    index: "/judge",
  },

  results: {
    label: "Results",
    index: "/results",
    others: {
      detail: {
        path: ":resultId",
        component: DetailItem || ErrorContent,
      },
    },
  },
};
