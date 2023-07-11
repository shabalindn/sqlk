/**
 * Объединяет массив запрос в один с использованием технологии CTE в PostgreSQL
 *
 * @param queries - массив запросов
 */
export function cte(queries: string[]): string {
  if (queries.length === 1) return queries[0];
  const last = queries.pop();
  const sql = queries.map((query, i) => `q${i + 1} as (\n  ${query}\n)`).join(',\n');
  return `WITH ${sql}\n${last}`;
}
