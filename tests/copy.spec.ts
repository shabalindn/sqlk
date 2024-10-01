import { copy } from "../src/copy";
import { ParamsCollector } from "../src/helpers/collector";

describe("copy()", () => {
  it("JSONB", () => {
    const sql = copy(
      {
        table: { name: "table", pk: "table_id" },
        params: {
          table_id: "user_id",
          name: "User",
          list: [
            {
              id: "iRGMM496Pu4J_3PmHBIbw",
              common_use: true,
              parent_use: true,
              pointer_use: false,
              attribute_id: "dQTVm4zRFGdSVqLrra2bk",
              is_inherited: true,
              milestone_use: true,
              parent_change: false,
              common_require: false,
              parent_require: false,
              attribute_title: "Этаж",
              pointer_require: false,
              milestone_require: false,
              parent_inheritance: false,
              attribute_description: null,
            },
          ],
          context: {
            code: "8",
            title: "Работа",
            sequence: 8,
            source_group: "Namespace",
          },
          bool: true,
          null: null,
          date: new Date(),
        },
        columns: {
          table_id: ["string", true],
          name: ["string", true],
          list: ["json", true],
          context: ["json", true],
          bool: ["boolean", true],
          null: ["string", true],
          date: ["date", true],
        },
      },
      { with: `NULL AS 'null'` }
    );
    expect(sql.query).toContain(`COPY table (table_id, name, list, context`);
    expect(sql.query).toContain(`FROM STDIN with delimiter ',' NULL AS 'null'`);
    expect(sql.raw).toContain(`t,null,2024-10-01`);
    expect(sql.raw).toContain(
      `{"code":"8","title":"Работа","sequence":8,"source_group":"Namespace"}`
    );
  });
});
