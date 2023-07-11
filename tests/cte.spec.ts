import { cte } from '../src/helpers/cte';

describe('cte()', () => {
  it('Only update params', () => {
    const sql = cte(['q1', 'q2', 'q3']);
    expect(sql).toBe(`WITH q1 as (\n` + `  q1\n` + `),\n` + `q2 as (\n` + `  q2\n` + `)\n` + `q3`);
  });

  it('Передан один запрос', () => {
    const sql = cte(['q1']);
    expect(sql).toBe(`q1`);
  });
});
