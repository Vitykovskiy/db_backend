import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "db_project_user",
  password: "db_project_pass",
  database: "psychology_accounting",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to the MySQL database.");
});

export default connection;
