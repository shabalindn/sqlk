import { ToStorage, Upsert2Params } from '../types';

/** Приводит к типу параметров из функции upsert */
export const adapter = ({ table, params, columns, collector }: Upsert2Params): ToStorage => {
  const _params: ToStorage['params'] = {};
  for (const [key, value] of Object.entries(params)) {
    const column = columns[key];
    if (column === undefined) throw new Error(`Ключ '${key}' переданный в params функции upsert2 не описан в options`);
    if (column !== false) {
    _params[key] = [value, ...column];
    }
  }

  return {
    table,
    params: _params,
    collector,
  };
};
