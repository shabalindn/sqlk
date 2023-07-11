import { prepare } from './helpers/prepare';
import { ToStorage } from './types';

export const upsert = (data: ToStorage): string => {
  const { table } = data;
  const { columns, values, update } = prepare(data);
  let result = `INSERT INTO "${table.name}"\n` + `(${columns.join(', ')})\n` + `VALUES (${values.join(', ')})\n`;

  if (update.length > 0) {
    const updatePart = update.map(({key, value}) => `"${key}"=${value}`).join(',');
    result += `ON CONFLICT ("${table.pk}") DO UPDATE SET ${updatePart}`;
  }

  return result;
};
