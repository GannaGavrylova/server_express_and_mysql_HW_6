//Настройка подключения к базе данных
import mysql from "mysql2";

// Создание подключения к БД
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2017Katja",
  database: "product_db",
});

// Подключение к БД

connection.connect((err) => {
  if (err) {
    console.error("error connesting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
});

export default connection;
