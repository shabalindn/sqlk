import { ToStorage } from './types';
import { ParamsEmptyCollector } from './helpers/collector';

export const deleteHard = ({ table, params, collector }: ToStorage) => {
  collector = collector ?? new ParamsEmptyCollector();
  const pkValue = collector.param(params[table.pk], true);
  return `DELETE FROM ${table.name} WHERE ${table.pk} = ${pkValue}`;
};
