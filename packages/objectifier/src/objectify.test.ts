/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

/* eslint-disable max-len */

import { performance } from "perf_hooks";
import { objectify } from "./objectify";

const html = `
  <!doctype html>
  <html itemtype="http://schema.org/WebPage" lang="en-US">
    <head></head>
    <body>
      Content
    </body>
  </html>
`;

const hdml = `
  <!-- Includes ----------------------------------------------------->
  <div>
    <hdml-include
      path="/my/path/include.hdml">
    </hdml-include>

    <hdml-include
      pat="wrong/attribute/name">
    </hdml-include>
  </div>

  <!-- Connections -------------------------------------------------->
  <div>
    <hdml-connection
      name="db1"
      type="postgres"
      host="example.com"
      user="user"
      password="pass">
    </hdml-connection>

    <hdml-connection
      name="db2"
      meta="MongoDB test connection"
      type="mongodb"
      host="example.com"
      user="user"
      password="pass"
      ssl="true"
      schema="data_schema">
    </hdml-connection>
  </div>

  <!-- HDML Data model ---------------------------------------------->
  <hdml-model
    name="maang_stock">

    <!-- Tables -->
    <div>
      <!-- Amazon stock table -->
      <hdml-table
        name="amazon"
        type="table"
        identifier="\`tenant_postgres\`.\`public\`.\`amazon_stock\`">

        <hdml-field
          name="open">
        </hdml-field>

        <hdml-field
          name="high">
        </hdml-field>

        <hdml-field
          name="low">
        </hdml-field>
        
        <hdml-field
          name="close">
        </hdml-field>
        
        <hdml-field
          name="adj_close">
        </hdml-field>
        
        <hdml-field
          name="volume">
        </hdml-field>
        
        <hdml-field
          name="date">
        </hdml-field>
      </hdml-table>

      <!-- Apple stock table -->
      <hdml-table
        name="apple"
        type="table"
        identifier="\`tenant_postgres\`.\`public\`.\`apple_stock\`">

        <hdml-field
          name="open">
        </hdml-field>

        <hdml-field
          name="high">
        </hdml-field>

        <hdml-field
          name="low">
        </hdml-field>
        
        <hdml-field
          name="close">
        </hdml-field>
        
        <hdml-field
          name="adj_close">
        </hdml-field>
        
        <hdml-field
          name="volume">
        </hdml-field>
        
        <hdml-field
          name="date">
        </hdml-field>
      </hdml-table>

      <!-- Google stock table -->
      <hdml-table
        name="google"
        type="table"
        identifier="\`tenant_postgres\`.\`public\`.\`google_stock\`">

        <hdml-field
          name="open">
        </hdml-field>

        <hdml-field
          name="high">
        </hdml-field>

        <hdml-field
          name="low">
        </hdml-field>
        
        <hdml-field
          name="close">
        </hdml-field>
        
        <hdml-field
          name="adj_close">
        </hdml-field>
        
        <hdml-field
          name="volume">
        </hdml-field>
        
        <hdml-field
          name="date">
        </hdml-field>
      </hdml-table>

      <!-- Microsoft stock table -->
      <hdml-table
        name="microsoft"
        type="table"
        identifier="\`tenant_postgres\`.\`public\`.\`microsoft_stock\`">

        <hdml-field
          name="open">
        </hdml-field>

        <hdml-field
          name="high">
        </hdml-field>

        <hdml-field
          name="low">
        </hdml-field>
        
        <hdml-field
          name="close">
        </hdml-field>
        
        <hdml-field
          name="adj_close">
        </hdml-field>
        
        <hdml-field
          name="volume">
        </hdml-field>
        
        <hdml-field
          name="date">
        </hdml-field>
      </hdml-table>

      <!-- Netflix stock table -->
      <hdml-table
        name="netflix"
        type="table"
        identifier="\`tenant_postgres\`.\`public\`.\`netflix_stock\`">

        <hdml-field
          name="open">
        </hdml-field>

        <hdml-field
          name="high">
        </hdml-field>

        <hdml-field
          name="low">
        </hdml-field>
        
        <hdml-field
          name="close">
        </hdml-field>
        
        <hdml-field
          name="adj_close">
        </hdml-field>
        
        <hdml-field
          name="volume">
        </hdml-field>
        
        <hdml-field
          name="date">
        </hdml-field>
      </hdml-table>
    </div>

    <!-- Joins -->
    <div>
      <!-- Join amazon with apple -->
      <hdml-join
        type="full-outer"
        left="amazon"
        right="apple">
        <hdml-connective
          operator="and">
          <hdml-filter
            type="keys"
            left="date"
            right="date">
          </hdml-filter>
          <hdml-connective
            operator="or">
            <hdml-filter
              type="expr"
              clause="1 = 1">
            </hdml-filter>
            <hdml-filter
              type="expr"
              clause="2 = 2">
            </hdml-filter>
          </hdml-connective>
        </hdml-connective>
      </hdml-join>

      <!-- Join google with apple -->
      <hdml-join
        type="full-outer"
        left="google"
        right="apple">
        <hdml-connective
          operator="and">
          <hdml-filter
            type="keys"
            left="date"
            right="date">
          </hdml-filter>
        </hdml-connective>
      </hdml-join>

      <!-- Join google with microsoft -->
      <hdml-join
        type="full-outer"
        left="google"
        right="microsoft">
        <hdml-connective
          operator="and">
          <hdml-filter
            type="keys"
            left="date"
            right="date">
          </hdml-filter>
        </hdml-connective>
      </hdml-join>

      <!-- Join microsoft with netflix -->
      <hdml-join
        type="full-outer"
        left="microsoft"
        right="netflix">
        <hdml-connective
          operator="and">
          <hdml-filter
            type="keys"
            left="date"
            right="date">
          </hdml-filter>
        </hdml-connective>
      </hdml-join>
    </div>
  </hdml-model>

  <!-- HDML Data frame ---------------------------------------------->
  <hdml-frame
    name="maang_stock"
    source="/maang/model.html?hdml-model=maang_stock">

    <!-- dates -->
    <hdml-field
      name="year"
      clause="
        cast(
          date_format(
            coalesce(
              \`amazon_date\`,
              \`apple_date\`,
              \`google_date\`,
              \`microsoft_date\`,
              \`netflix_date\`
            ),
            '%Y'
          ) as smallint
        )">
    </hdml-field>
    <hdml-field
      name="month"
      clause="
        cast(
          date_format(
            coalesce(
              \`amazon_date\`,
              \`apple_date\`,
              \`google_date\`,
              \`microsoft_date\`,
              \`netflix_date\`
            ),
            '%m'
          ) as smallint
        )">
    </hdml-field>
    <hdml-field
      name="day"
      clause="
        cast(
          date_format(
            coalesce(
              \`amazon_date\`,
              \`apple_date\`,
              \`google_date\`,
              \`microsoft_date\`,
              \`netflix_date\`
            ),
            '%d'
          ) as smallint
        )">
    </hdml-field>

    <!-- amazon -->
    <hdml-field
      name="amazon_open"
      origin="amazon_open">
    </hdml-field>
    <hdml-field
      name="amazon_high"
      origin="amazon_high">
    </hdml-field>
    <hdml-field
      name="amazon_low"
      origin="amazon_low">
    </hdml-field>
    <hdml-field
      name="amazon_close"
      origin="amazon_close">
    </hdml-field>
    <hdml-field
      name="amazon_adj_close"
      origin="amazon_adj_close">
    </hdml-field>
    <hdml-field
      name="amazon_volume"
      origin="amazon_volume">
    </hdml-field>

    <!-- apple -->
    <hdml-field
      name="apple_open"
      origin="apple_open">
    </hdml-field>
    <hdml-field
      name="apple_high"
      origin="apple_high">
    </hdml-field>
    <hdml-field
      name="apple_low"
      origin="apple_low">
    </hdml-field>
    <hdml-field
      name="apple_close"
      origin="apple_close">
    </hdml-field>
    <hdml-field
      name="apple_adj_close"
      origin="apple_adj_close">
    </hdml-field>
    <hdml-field
      name="apple_volume"
      origin="apple_volume">
    </hdml-field>

    <!-- google -->
    <hdml-field
      name="google_open"
      origin="google_open">
    </hdml-field>
    <hdml-field
      name="google_high"
      origin="google_high">
    </hdml-field>
    <hdml-field
      name="google_low"
      origin="google_low">
    </hdml-field>
    <hdml-field
      name="google_close"
      origin="google_close">
    </hdml-field>
    <hdml-field
      name="google_adj_close"
      origin="google_adj_close">
    </hdml-field>
    <hdml-field
      name="google_volume"
      origin="google_volume">
    </hdml-field>

    <!-- microsoft -->
    <hdml-field
      name="microsoft_open"
      origin="microsoft_open">
    </hdml-field>
    <hdml-field
      name="microsoft_high"
      origin="microsoft_high">
    </hdml-field>
    <hdml-field
      name="microsoft_low"
      origin="microsoft_low">
    </hdml-field>
    <hdml-field
      name="microsoft_close"
      origin="microsoft_close">
    </hdml-field>
    <hdml-field
      name="microsoft_adj_close"
      origin="microsoft_adj_close">
    </hdml-field>
    <hdml-field
      name="microsoft_volume"
      origin="microsoft_volume">
    </hdml-field>

    <!-- netflix -->
    <hdml-field
      name="netflix_open"
      origin="netflix_open">
    </hdml-field>
    <hdml-field
      name="netflix_high"
      origin="netflix_high">
    </hdml-field>
    <hdml-field
      name="netflix_low"
      origin="netflix_low">
    </hdml-field>
    <hdml-field
      name="netflix_close"
      origin="netflix_close">
    </hdml-field>
    <hdml-field
      name="netflix_adj_close"
      origin="netflix_adj_close">
    </hdml-field>
    <hdml-field
      name="netflix_volume"
      origin="netflix_volume">
    </hdml-field>

    <!-- Filters -->
    <hdml-filter-by>
      <hdml-connective
        operator="or">
        <hdml-connective
          operator="and">
          <hdml-filter
            type="expr"
            clause="1 = 1">
          </hdml-filter>
          <hdml-filter
            type="named"
            name="equals"
            field="year"
            values="2021">
          </hdml-filter>
        </hdml-connective>
        <hdml-connective
          operator="and">
          <hdml-filter
            type="expr"
            clause="1 = 1">
          </hdml-filter>
          <hdml-filter
            type="expr"
            clause="\`maang_stock\`.\`year\` = 2021">
          </hdml-filter>
        </hdml-connective>
      </hdml-connective>
    </hdml-filter-by>

    <!-- Group By -->
    <hdml-group-by>
      <hdml-field
        name="year">
      </hdml-field>
      <hdml-field
        name="month">
      </hdml-field>
      <hdml-field
        name="day">
      </hdml-field>
    </hdml-group-by>

    <!-- Sort By -->
    <hdml-sort-by>
      <hdml-field
        name="year"
        order="asc">
      </hdml-field>
      <hdml-field
        name="month"
        order="asc">
      </hdml-field>
      <hdml-field
        name="day"
        order="desc">
      </hdml-field>
    </hdml-sort-by>

    <!-- Split By -->
    <hdml-split-by>
      <hdml-field
        name="year">
      </hdml-field>
    </hdml-split-by>

  </hdml-frame>
`;

describe("The `objectify` function", () => {
  it("sould return empty HDDM object if no HDML tags in HTML document", () => {
    const hddm = objectify(html);

    expect(hddm).toEqual({
      includes: [],
      connections: [],
      models: [],
      frames: [],
    });
  });

  it("shoud parse HDML string", () => {
    const hddm = objectify(hdml);
    expect(hddm).toEqual({
      includes: [
        {
          path: "/my/path/include.hdml",
        },
      ],
      connections: [
        {
          name: "db1",
          meta: "",
          options: {
            connector: 0,
            parameters: {
              host: "example.com",
              user: "user",
              password: "pass",
              ssl: false,
            },
          },
        },
        {
          name: "db2",
          meta: "MongoDB test connection",
          options: {
            connector: 12,
            parameters: {
              host: "example.com",
              port: 27017,
              user: "user",
              password: "pass",
              ssl: true,
              schema: "data_schema",
            },
          },
        },
      ],
      models: [
        {
          name: "maang_stock",
          tables: [
            {
              name: "amazon",
              type: 0,
              identifier: "`tenant_postgres`.`public`.`amazon_stock`",
              fields: [
                {
                  name: "open",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "high",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "low",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "close",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "adj_close",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "volume",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "date",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
              ],
            },
            {
              name: "apple",
              type: 0,
              identifier: "`tenant_postgres`.`public`.`apple_stock`",
              fields: [
                {
                  name: "open",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "high",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "low",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "close",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "adj_close",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "volume",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "date",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
              ],
            },
            {
              name: "google",
              type: 0,
              identifier: "`tenant_postgres`.`public`.`google_stock`",
              fields: [
                {
                  name: "open",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "high",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "low",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "close",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "adj_close",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "volume",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "date",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
              ],
            },
            {
              name: "microsoft",
              type: 0,
              identifier:
                "`tenant_postgres`.`public`.`microsoft_stock`",
              fields: [
                {
                  name: "open",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "high",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "low",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "close",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "adj_close",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "volume",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "date",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
              ],
            },
            {
              name: "netflix",
              type: 0,
              identifier:
                "`tenant_postgres`.`public`.`netflix_stock`",
              fields: [
                {
                  name: "open",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "high",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "low",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "close",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "adj_close",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "volume",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
                {
                  name: "date",
                  description: undefined,
                  origin: undefined,
                  clause: undefined,
                  aggregation: 0,
                  order: 0,
                },
              ],
            },
          ],
          joins: [
            {
              type: 5,
              left: "amazon",
              right: "apple",
              clause: {
                type: 1,
                filters: [
                  {
                    type: 1,
                    options: {
                      left: "date",
                      right: "date",
                    },
                  },
                ],
                children: [
                  {
                    type: 0,
                    filters: [
                      {
                        type: 0,
                        options: {
                          clause: "1 = 1",
                        },
                      },
                      {
                        type: 0,
                        options: {
                          clause: "2 = 2",
                        },
                      },
                    ],
                    children: [],
                  },
                ],
              },
            },
            {
              type: 5,
              left: "google",
              right: "apple",
              clause: {
                type: 1,
                filters: [
                  {
                    type: 1,
                    options: {
                      left: "date",
                      right: "date",
                    },
                  },
                ],
                children: [],
              },
            },
            {
              type: 5,
              left: "google",
              right: "microsoft",
              clause: {
                type: 1,
                filters: [
                  {
                    type: 1,
                    options: {
                      left: "date",
                      right: "date",
                    },
                  },
                ],
                children: [],
              },
            },
            {
              type: 5,
              left: "microsoft",
              right: "netflix",
              clause: {
                type: 1,
                filters: [
                  {
                    type: 1,
                    options: {
                      left: "date",
                      right: "date",
                    },
                  },
                ],
                children: [],
              },
            },
          ],
        },
      ],
      frames: [
        {
          name: "maang_stock",
          source: "/maang/model.html?hdml-model=maang_stock",
          offset: 0,
          limit: 100000,
          fields: [
            {
              name: "year",
              description: undefined,
              origin: undefined,
              clause:
                "\n        cast(\n          date_format(\n            coalesce(\n              `amazon_date`,\n              `apple_date`,\n              `google_date`,\n              `microsoft_date`,\n              `netflix_date`\n            ),\n            '%Y'\n          ) as smallint\n        )",
              aggregation: 0,
              order: 0,
            },
            {
              name: "month",
              description: undefined,
              origin: undefined,
              clause:
                "\n        cast(\n          date_format(\n            coalesce(\n              `amazon_date`,\n              `apple_date`,\n              `google_date`,\n              `microsoft_date`,\n              `netflix_date`\n            ),\n            '%m'\n          ) as smallint\n        )",
              aggregation: 0,
              order: 0,
            },
            {
              name: "day",
              description: undefined,
              origin: undefined,
              clause:
                "\n        cast(\n          date_format(\n            coalesce(\n              `amazon_date`,\n              `apple_date`,\n              `google_date`,\n              `microsoft_date`,\n              `netflix_date`\n            ),\n            '%d'\n          ) as smallint\n        )",
              aggregation: 0,
              order: 0,
            },
            {
              name: "amazon_open",
              description: undefined,
              origin: "amazon_open",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "amazon_high",
              description: undefined,
              origin: "amazon_high",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "amazon_low",
              description: undefined,
              origin: "amazon_low",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "amazon_close",
              description: undefined,
              origin: "amazon_close",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "amazon_adj_close",
              description: undefined,
              origin: "amazon_adj_close",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "amazon_volume",
              description: undefined,
              origin: "amazon_volume",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "apple_open",
              description: undefined,
              origin: "apple_open",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "apple_high",
              description: undefined,
              origin: "apple_high",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "apple_low",
              description: undefined,
              origin: "apple_low",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "apple_close",
              description: undefined,
              origin: "apple_close",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "apple_adj_close",
              description: undefined,
              origin: "apple_adj_close",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "apple_volume",
              description: undefined,
              origin: "apple_volume",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "google_open",
              description: undefined,
              origin: "google_open",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "google_high",
              description: undefined,
              origin: "google_high",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "google_low",
              description: undefined,
              origin: "google_low",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "google_close",
              description: undefined,
              origin: "google_close",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "google_adj_close",
              description: undefined,
              origin: "google_adj_close",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "google_volume",
              description: undefined,
              origin: "google_volume",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "microsoft_open",
              description: undefined,
              origin: "microsoft_open",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "microsoft_high",
              description: undefined,
              origin: "microsoft_high",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "microsoft_low",
              description: undefined,
              origin: "microsoft_low",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "microsoft_close",
              description: undefined,
              origin: "microsoft_close",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "microsoft_adj_close",
              description: undefined,
              origin: "microsoft_adj_close",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "microsoft_volume",
              description: undefined,
              origin: "microsoft_volume",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "netflix_open",
              description: undefined,
              origin: "netflix_open",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "netflix_high",
              description: undefined,
              origin: "netflix_high",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "netflix_low",
              description: undefined,
              origin: "netflix_low",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "netflix_close",
              description: undefined,
              origin: "netflix_close",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "netflix_adj_close",
              description: undefined,
              origin: "netflix_adj_close",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "netflix_volume",
              description: undefined,
              origin: "netflix_volume",
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
          ],
          filter_by: {
            type: 0,
            filters: [],
            children: [
              {
                type: 1,
                filters: [
                  {
                    type: 0,
                    options: {
                      clause: "1 = 1",
                    },
                  },
                  {
                    type: 2,
                    options: {
                      name: 0,
                      field: "year",
                      values: ["2021"],
                    },
                  },
                ],
                children: [],
              },
              {
                type: 1,
                filters: [
                  {
                    type: 0,
                    options: {
                      clause: "1 = 1",
                    },
                  },
                  {
                    type: 0,
                    options: {
                      clause: "`maang_stock`.`year` = 2021",
                    },
                  },
                ],
                children: [],
              },
            ],
          },
          group_by: [
            {
              name: "year",
              description: undefined,
              origin: undefined,
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "month",
              description: undefined,
              origin: undefined,
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
            {
              name: "day",
              description: undefined,
              origin: undefined,
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
          ],
          sort_by: [
            {
              name: "year",
              description: undefined,
              origin: undefined,
              clause: undefined,
              aggregation: 0,
              order: 1,
            },
            {
              name: "month",
              description: undefined,
              origin: undefined,
              clause: undefined,
              aggregation: 0,
              order: 1,
            },
            {
              name: "day",
              description: undefined,
              origin: undefined,
              clause: undefined,
              aggregation: 0,
              order: 2,
            },
          ],
          split_by: [
            {
              name: "year",
              description: undefined,
              origin: undefined,
              clause: undefined,
              aggregation: 0,
              order: 0,
            },
          ],
        },
      ],
    });
  });

  it("should parse provided HDML string in less then 12ms (100 iter)", () => {
    const measures: number[] = [];

    for (let i = 0; i < 100; i++) {
      const start = performance.now();
      objectify(hdml);
      measures.push(performance.now() - start);
    }
    const avg =
      measures.reduce((a, b) => a + b, 0) / measures.length || 0;

    expect(avg).toBeLessThan(12);
  });

  it("should parse provided HDML string in less then 5ms (1000 iter)", () => {
    const measures: number[] = [];

    for (let i = 0; i < 1000; i++) {
      const start = performance.now();
      objectify(hdml);
      measures.push(performance.now() - start);
    }
    const avg =
      measures.reduce((a, b) => a + b, 0) / measures.length || 0;

    expect(avg).toBeLessThan(5);
  });
});
