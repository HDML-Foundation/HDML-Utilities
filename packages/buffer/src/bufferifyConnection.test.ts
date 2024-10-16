/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { Builder } from "flatbuffers";
import { ConnectorTypesEnum } from "@hdml/schemas";
import { Connection } from "@hdml/types";
import { bufferifyConnection } from "./bufferifyConnection";

/**
 * Jest test suite for `bufferifyConnection`.
 * This suite tests the serialization of `Connection` objects
 * with different types of connection options.
 */
describe("The `bufferifyConnection` function", () => {
  let builder: Builder;

  beforeEach(() => {
    builder = new Builder(1024);
  });

  test("should bufferify a JDBC connection", () => {
    const connection: Connection = {
      name: "JDBCConnection",
      description: null,
      options: {
        connector: ConnectorTypesEnum.Postgres,
        parameters: {
          host: "localhost",
          user: "root",
          password: "password",
          ssl: true,
        },
      },
    };

    const offset = bufferifyConnection(builder, connection);
    expect(offset).toBeGreaterThan(0);
  });

  test("should bufferify a BigQuery connection", () => {
    const connection: Connection = {
      name: "BigQueryConnection",
      description: "BigQuery metadata",
      options: {
        connector: ConnectorTypesEnum.BigQuery,
        parameters: {
          project_id: "my-project-id",
          credentials_key: "my-credentials-key",
        },
      },
    };

    const offset = bufferifyConnection(builder, connection);
    expect(offset).toBeGreaterThan(0);
  });

  test("should bufferify a Google Sheets connection", () => {
    const connection: Connection = {
      name: "GoogleSheetsConnection",
      description: "GoogleSheets metadata",
      options: {
        connector: ConnectorTypesEnum.GoogleSheets,
        parameters: {
          sheet_id: "my-sheet-id",
          credentials_key: "my-credentials-key",
        },
      },
    };

    const offset = bufferifyConnection(builder, connection);
    expect(offset).toBeGreaterThan(0);
  });

  test("should bufferify an Elasticsearch connection", () => {
    const connection: Connection = {
      name: "ElasticSearchConnection",
      description: "ElasticSearch metadata",
      options: {
        connector: ConnectorTypesEnum.ElasticSearch,
        parameters: {
          host: "localhost",
          port: 9200,
          user: "elastic",
          password: "password",
          ssl: true,
          region: "us-west-1",
          access_key: "my-access-key",
          secret_key: "my-secret-key",
        },
      },
    };

    const offset = bufferifyConnection(builder, connection);
    expect(offset).toBeGreaterThan(0);
  });

  test("should bufferify a MongoDB connection", () => {
    const connection: Connection = {
      name: "MongoDBConnection",
      description: "MongoDB metadata",
      options: {
        connector: ConnectorTypesEnum.MongoDB,
        parameters: {
          host: "localhost",
          port: 27017,
          user: "admin",
          password: "password",
          schema: "my_schema",
          ssl: false,
        },
      },
    };

    const offset = bufferifyConnection(builder, connection);
    expect(offset).toBeGreaterThan(0);
  });

  test("should bufferify a Snowflake connection", () => {
    const connection: Connection = {
      name: "SnowflakeConnection",
      description: "Snowflake metadata",
      options: {
        connector: ConnectorTypesEnum.Snowflake,
        parameters: {
          account: "my_account",
          user: "my_user",
          password: "my_password",
          database: "my_database",
          role: "my_role",
          warehouse: "my_warehouse",
        },
      },
    };

    const offset = bufferifyConnection(builder, connection);
    expect(offset).toBeGreaterThan(0);
  });
});
