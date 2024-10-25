/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

/* eslint-disable max-len */

import { HDOM } from "@hdml/types";
import {
  TableTypeEnum,
  DataTypeEnum,
  AggregationTypeEnum,
  OrderTypeEnum,
  TableStruct,
  JoinTypeEnum,
  FilterOperatorEnum,
  FilterTypeEnum,
} from "@hdml/schemas";
import { serialize, deserialize } from "@hdml/buffer";
import { getTableSQL, getModelSQL } from "./model";

describe("The `getTableSQL` function", () => {
  const hdom: HDOM = {
    includes: [],
    connections: [],
    models: [
      {
        name: "model",
        description: null,
        tables: [
          {
            name: "table",
            description: null,
            type: TableTypeEnum.Table,
            identifier: "connection.schema.table",
            fields: [
              {
                name: "field",
                description: null,
                origin: null,
                clause: null,
                type: {
                  type: DataTypeEnum.Unspecified,
                },
                aggregation: AggregationTypeEnum.None,
                order: OrderTypeEnum.None,
              },
            ],
          },
          {
            name: "query",
            description: null,
            type: TableTypeEnum.Query,
            identifier: "select\n\t*\nfrom\n\tsubtable",
            fields: [
              {
                name: "field",
                description: null,
                origin: null,
                clause: null,
                type: {
                  type: DataTypeEnum.Unspecified,
                },
                aggregation: AggregationTypeEnum.None,
                order: OrderTypeEnum.None,
              },
            ],
          },
          {
            name: "sorting",
            description: null,
            type: TableTypeEnum.Table,
            identifier: "connection.schema.table",
            fields: [
              {
                name: "field_b",
                description: null,
                origin: null,
                clause: null,
                type: {
                  type: DataTypeEnum.Unspecified,
                },
                aggregation: AggregationTypeEnum.None,
                order: OrderTypeEnum.None,
              },
              {
                name: "field_a",
                description: null,
                origin: null,
                clause: null,
                type: {
                  type: DataTypeEnum.Unspecified,
                },
                aggregation: AggregationTypeEnum.None,
                order: OrderTypeEnum.None,
              },
              {
                name: "field_c",
                description: null,
                origin: null,
                clause: null,
                type: {
                  type: DataTypeEnum.Unspecified,
                },
                aggregation: AggregationTypeEnum.None,
                order: OrderTypeEnum.None,
              },
              {
                name: "field_c",
                description: null,
                origin: null,
                clause: null,
                type: {
                  type: DataTypeEnum.Unspecified,
                },
                aggregation: AggregationTypeEnum.None,
                order: OrderTypeEnum.None,
              },
              {
                name: null as unknown as string,
                description: null,
                origin: null,
                clause: null,
                type: {
                  type: DataTypeEnum.Unspecified,
                },
                aggregation: AggregationTypeEnum.None,
                order: OrderTypeEnum.None,
              },
            ],
          },
        ],
        joins: [
          {
            type: JoinTypeEnum.Inner,
            description: null,
            left: "table",
            right: "query",
            clause: {
              type: FilterOperatorEnum.None,
              filters: [
                {
                  type: FilterTypeEnum.Keys,
                  options: {
                    left: "field",
                    right: "field",
                  },
                },
              ],
              children: [],
            },
          },
          {
            type: JoinTypeEnum.Left,
            description: null,
            left: "table",
            right: "sorting",
            clause: {
              type: FilterOperatorEnum.None,
              filters: [
                {
                  type: FilterTypeEnum.Keys,
                  options: {
                    left: "field",
                    right: "field_a",
                  },
                },
              ],
              children: [],
            },
          },
        ],
      },
    ],
    frames: [],
  };
  const bytes = serialize(hdom);
  const struct = deserialize(bytes);

  it("should stringlify `table`", () => {
    const table = <TableStruct>struct.models(0)?.tables(0);
    const sql = getTableSQL(table);
    expect(sql).toBe(
      '"table" as (\n  select\n    "field" as "field"\n  from\n    connection.schema.table\n)',
    );
  });

  it("should stringlify `query`", () => {
    const table = <TableStruct>struct.models(0)?.tables(1);
    const sql = getTableSQL(table);
    expect(sql).toBe(
      '"query" as (\n  with _query as (\n    select\n    \t*\n    from\n    \tsubtable\n  )\n  select\n    "field" as "field"\n  from\n    _query\n)',
    );
  });

  it("should stringlify `sorting`", () => {
    const table = <TableStruct>struct.models(0)?.tables(2);
    const sql = getTableSQL(table);
    expect(sql).toBe(
      '"sorting" as (\n  select\n    "field_a" as "field_a",\n    "field_b" as "field_b",\n    "field_c" as "field_c",\n    "field_c" as "field_c"\n  from\n    connection.schema.table\n)',
    );
  });

  it("should stringlify model", () => {
    const sql = getModelSQL(struct.models(0)!);
    console.log(sql);
  });
});