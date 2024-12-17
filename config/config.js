module.exports = {
  development: {
    username: "kaseyklimes",
    password: null,
    database: "handson_db",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432          
  },
  test: {
    username: "kaseyklimes",
    password: null,
    database: "handson_test",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: 5432
  }
};
