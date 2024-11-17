import express from "express";
import connection from "./db.js";

const app = express();
const port = 3000;
// Middleware для обработки JSON
app.use(express.json());
//
app.use(express.urlencoded({ extended: true }));
//
app.use((err, req, res, next) => {
  console.error(err.stack); //Логирование ошибки
  res.status(500).send("Something broke!"); // Отправка ответа с ошибкой
});

// Маршрут GET /
app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello, my Express server!");
  } catch (error) {
    console.error("Error in GET /:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//
app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products: ", err.stack);
      res.status(500).send("Error fetching products");
      return;
    }
    res.json(results); // Возвращаем данные в формате JSON
  });
});
//

// Маршрут POST /
app.post("/", (req, res) => {
  try {
    const user = req.body;

    if (!user || Object.keys(user).length === 0) {
      return res.status(400).json({ message: "No user data provided" });
    }
    res.status(200).send(`User: ${JSON.stringify(user)}`);
  } catch (error) {
    console.error("Error in POST /:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//Маршрут для добавления нового продукта
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  const query = "INSERT INTO products (name, price) VALUES (?, ?)";

  connection.query(query, [name, price], (err, results) => {
    if (err) {
      console.error("Error adding product: ", err.stack);
      res.status(500).send("Error adding product");
      return;
    }
    res.status(201).send("Product added successfully");
  });
});
// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
