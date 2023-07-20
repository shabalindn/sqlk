import { TDeleteSoftOptions, Upsert2Params } from './types';
import { update } from './update';
import { upsert2 } from './upsert2';

export const deleteSoft = (data: Upsert2Params, options?: TDeleteSoftOptions): string => {
  const pk = data.table.pk;
  const pkValue = data.params[pk];
  let params = {
    [pk]: pkValue,
    delete_time: 'now()',
  };
  if (options?.withUpdate || options?.upsert) {
    params = {
      ...data.params,
      ...params,
    };
  }
  data.params = params;
  data.columns['delete_time'] = ['raw', true];
  const sql = options?.upsert ? upsert2(data) : update(data);
  return sql ?? '';
};
