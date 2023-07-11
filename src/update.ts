import { adapter } from './helpers/adapter';
import { ParamsEmptyCollector } from './helpers/collector';
import { prepare } from './helpers/prepare';
import { Upsert2Params } from './types';

export const update = (data: Upsert2Params): string | undefined => {
  const { table, params } = data;
  const collector = data.collector ?? new ParamsEmptyCollector();
  const { update } = prepare(adapter(data), ['update']);
  if (update.length === 0) return undefined;

  const pk = table.pk;
  const tableName = table.name;
  const pkValue = collector.param(params[pk], true);
  const updatePart = update.map(({ key, value }) => `"${key}"=${value}`).join(',');
  return `UPDATE "${tableName}" SET ${updatePart} WHERE "${pk}" = ${pkValue}`;
};
