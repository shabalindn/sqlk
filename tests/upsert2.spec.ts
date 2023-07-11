import { upsert2 } from '../src/upsert2';

describe('upsert2', () => {
  it('Simple', () => {
    const sql = upsert2({
      table: { name: 'estimate_catalog', pk: 'estimate_id' },
      params: {
        estimate_id: '1cf49ea3-cbf7-4707-852e-e98b41a83cc7',
        update_time: 'now()',
      },
      columns: {
        estimate_id: ['string', true],
        update_time: ['raw', false],
      },
    });
    expect(sql.indexOf('"estimate_id"="1cf49ea3-cbf7-4707-852e-e98b41a83cc7"')).toBe(-1);
    expect(sql.indexOf('"add_time"=now()')).toBe(-1);
  });

  it('Options не содержат все поля из params', () => {
    const test = () =>
      upsert2({
        table: { name: 'estimate_catalog', pk: 'estimate_id' },
        params: {
          estimate_id: '1cf49ea3-cbf7-4707-852e-e98b41a83cc7',
          update_time: 'now()',
        },
        columns: {
          asd: ['string', true],
        },
      });
    expect(test).toThrowError();
  });
});
