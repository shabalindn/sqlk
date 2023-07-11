import { ParamsCollector } from '../src/helpers/collector';
import { upsert } from '../src/upsert';

describe('upsert', () => {
  it('Only update params', () => {
    const sql = upsert({
      table: { name: 'estimate_catalog', pk: 'estimate_id' },
      params: {
        estimate_id: ['1cf49ea3-cbf7-4707-852e-e98b41a83cc7', 'string', true],
        estimate_meta_info: [{}, 'json', true],
        estimate_name: ['Name', 'string', true],
        add_time: ['now()', 'raw'],
        update_time: ['now()', 'raw', true],
      },
    });
    expect(sql.indexOf('"estimate_id"="1cf49ea3-cbf7-4707-852e-e98b41a83cc7"')).toBe(-1);
    expect(sql.indexOf('"add_time"=now()')).toBe(-1);
  });

  it('Nullable', () => {
    const sql = upsert({
      table: { name: 'example', pk: 'example_id' },
      params: {
        example_id: ['id_value', 'string'],
        order: [null, 'string', true],
      },
    });

    expect(sql).toContain(`VALUES ('id_value', null)`);
    expect(sql).toContain(`"order"=null`);
    expect(sql).not.toContain(`"order"='null'`);
  });

  it('error if not send Pk', () => {
    expect(() => {
      upsert({
        table: { name: 'table', pk: 'table_id' },
        params: {
          state: [{ asd: 123 }, 'json'],
        },
      });
    }).toThrow();
  });

  it('Array', () => {
    const sql = upsert({
      table: { name: 'table', pk: 'table_id' },
      params: {
        table_id: ['id', 'string'],
        list: [['asd', 'fgh'], 'array'],
      },
    });

    expect(sql).toContain(`'{"asd", "fgh"}'`);
  });

  it('Array. Empty', () => {
    const sql = upsert({
      table: { name: 'table', pk: 'table_id' },
      params: {
        table_id: ['id', 'string'],
        list: [[], 'array'],
      },
    });

    expect(sql).toContain(`'{}'`);
  });

  it('Empty on conflict', () => {
    const sql = upsert({
      table: { name: 'table', pk: 'table_id' },
      params: {
        table_id: ['id', 'string'],
        list: [[], 'array'],
      },
    });

    expect(sql).not.toContain(`ON CONFLICT`);
  });

  it('With collector', () => {
    const collector = new ParamsCollector();
    const sql = upsert({
      table: { name: 'table', pk: 'table_id' },
      params: {
        table_id: ['id', 'string'],
        list: [[], 'array'],
      },
      collector,
    });

    expect(sql).toContain(`$1`);
    expect(sql).toContain(`$2`);
    expect(collector.getParams()).toEqual(['id', '{}']);
  });

  it('Если передали null', () => {
    const collector = new ParamsCollector();
    const sql = upsert({
      table: { name: 'table', pk: 'table_id' },
      params: {
        table_id: ['id', 'string'],
        name: [null, 'date', true],
      },
      collector,
    });

    expect(collector.getParams()).toEqual(['id', null]);
  });
});
