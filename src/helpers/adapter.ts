import { ToStorage, Upsert2Params } from '../types';

/** Приводит к типу параметров из функции upsert */
export const adapter = ({ table, params, columns, collector }: Upsert2Params): ToStorage => {
  const _params: ToStorage['params'] = {};
  for (const [key, value] of Object.entries(params)) {
    if (columns[key] === undefined) throw new Error(`Ключ '${key}' переданный в params функции upsert2 не описан в options`);
    _params[key] = [value, ...columns[key]];
  }

  return {
    table,
    params: _params,
    collector,
  };
};
