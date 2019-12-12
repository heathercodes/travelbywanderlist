module.exports = {
    client: "pg",
    connection: 9000 || {
      user: "yourname",
      password: "yourpassword",
      database: "yourdb"
    },
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
};