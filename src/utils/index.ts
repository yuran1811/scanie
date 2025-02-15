import { ScoreGroupsType } from "@shared/types";

export * from "./dayjsUsage";
export * from "./judge";
export * from "./preprocessingImg";
export * from "./styles";

interface CmpObject extends Object {
  [key: string]: any;
}

const isObject = (object: Object) => {
  return object != null && typeof object === "object";
};

export const deepObjectCompare = (a: CmpObject, b: CmpObject) => {
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = a[key];
    const val2 = b[key];

    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepObjectCompare(val1, val2)) || (!areObjects && val1 !== val2))
      return false;
  }

  return true;
};

export const shallowObjectCompare = (a: CmpObject, b: CmpObject) => {
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) if (a[key] !== b[key]) return false;

  return true;
};

export const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data);
};

export const exportScoreGroups = (scoreGroups: ScoreGroupsType) => {
  const data = JSON.stringify(scoreGroups, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "scoreGroups.json";
  a.click();
};
