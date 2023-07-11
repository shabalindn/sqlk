import { adapter } from './helpers/adapter';
import { prepare } from './helpers/prepare';
import { Upsert2Params } from './types';

export const insert = (data: Upsert2Params): string => {
  const { table } = data;
  const { columns, values } = prepare(adapter(data), ['insert']);
  return `INSERT INTO "${table.name}"\n` + `(${columns.join(', ')})\n` + `VALUES (${values.join(', ')})`;
};
