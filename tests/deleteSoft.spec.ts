import { deleteSoft } from '../src/deleteSoft';

describe('deleteSoft()', () => {
  it('Обычное удаление', () => {
    const sql = deleteSoft({
      table: { name: 'user_catalog', pk: 'user_id' },
      params: {
        user_id: 'user_id',
        name: 'User',
      },
      columns: {
        user_id: ['string', true],
        name: ['string', true],
      },
    });
    expect(sql).not.toContain(`"name"='User'`);
    expect(sql).toContain(`"delete_time"=now()`);
  });

  it('Удаление с параметров withUpdate (с сохранением изменений перед удалением)', () => {
    const sql = deleteSoft(
      {
        table: { name: 'user_catalog', pk: 'user_id' },
        params: {
          user_id: 'user_id',
          name: 'User',
        },
        columns: {
          user_id: ['string', true],
          name: ['string', true],
        },
      },
      { withUpdate: true }
    );
    expect(sql).toContain(`"name"='User'`);
    expect(sql).toContain(`"delete_time"=now()`);
  });

  it('Удаление с параметров upsert = true', () => {
    const sql = deleteSoft(
      {
        table: { name: 'user_catalog', pk: 'user_id' },
        params: {
          user_id: 'user_id',
          name: 'User',
        },
        columns: {
          user_id: ['string', true],
          name: ['string', true],
        },
      },
      { upsert: true }
    );
    expect(sql.indexOf('INSERT')).toEqual(0);
    expect(sql).toContain(`"name"='User'`);
    expect(sql).toContain(`UPDATE`);
  });
});
