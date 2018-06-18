import knex from "knex";

export default knex({
  client: "mysql2",
  connection: {
    charset: "utf8mb4",
    host: process.env.SQL_HOST,
    posrt: process.env.SQL_PORT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    multipleStatements: true
  }
});
