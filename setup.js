import connection from "./db.js";

const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (255) NOT NULL,
price DECIMAL (10, 2) NOT NULL 
)
`;

connection.query(createProductsTable, (err, results) => {
  if (err) {
    console.error("Error creating users table:", err.stack);
    return;
  }
  console.log("Users table created successfully");
});

connection.end(); //Закрываем соединение после выполнения запроса
