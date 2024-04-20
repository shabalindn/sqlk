import { ToStorage } from '../types';
import { ParamsEmptyCollector } from './collector';
import { converter } from './converter';

export const prepare = ({ table, params, collector }: ToStorage, types: ('insert' | 'update')[] = ['insert', 'update']) => {
  if (!(table.pk in params)) throw Error(`Required ${table.pk} in`);

  const columns = [];
  const values: any[] = [];
  const update: { key: string; value: any }[] = [];
  collector = collector ?? new ParamsEmptyCollector();

  // eslint-disable-next-line prefer-const
  for (let [key, [value, type, updated]] of Object.entries(params)) {
    if (value === null) type = 'null';
    let value_: any = value;

    const willInsert = types.includes('insert');
    const willUpdate = updated && types.includes('update');

    const convert = converter(type);
    value_ = convert.process(value_);
    if ((willUpdate || willInsert) && type !== 'raw') {
      value_ = collector.param(value_, convert.quote, type);
    }
    if (willInsert) {
      columns.push(`"${key}"`);
      values.push(value_);
    }
    if (willUpdate) {
      update.push({ key, value: value_ });
    }
  }

  return { columns, values, update };
};
