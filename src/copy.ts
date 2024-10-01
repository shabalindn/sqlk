import { adapter } from "./helpers/adapter";
import { prepare } from "./helpers/prepare";
import { Upsert2Params } from "./types";

export const copy = (
  data: Upsert2Params,
  config: { with: string }
): { query: string; raw: string } => {
  const { table } = data;
  const { columns, stringValues } = prepare(adapter(data), ["copy"]);
  return {
    query: `COPY ${table.name} (${columns.join(
      ", "
    )}) FROM STDIN with delimiter ',' ${config.with}`,
    raw: stringValues,
  };
};
