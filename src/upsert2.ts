import { upsert } from "./upsert";
import { adapter } from "./helpers/adapter";
import { Upsert2Params } from "./types";

export const upsert2 = (data: Upsert2Params): string => {
  return upsert(adapter(data));
};
