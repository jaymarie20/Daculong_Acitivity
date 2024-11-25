const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const mockData = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 30 },
];

// to create a new product
app.post("/mockData", (req, res) => {
  const { name, price } = req.body; // Get name and price from the request body
  const newProduct = { id: mockData.length + 1, name, price }; // Create a new product object
  mockData.push(newProduct); // Add the new product to the array
  res.status(201).json(newProduct); // Send the new product as a response
});

// to get all products
app.get("/mockData", (req, res) => {
  res.json(mockData); // Send the mock data array as a response
});

// to get a product by id
app.get("/mockData/:id", (req, res) => {
  const product = mockData.find((p) => p.id === parseInt(req.params.id)); // Find the product by id
  if (!product) return res.status(404).json({ message: "Product not found" }); // If not found, send 404
  res.json(product); // Send the product as a response
});

// to update a product
app.put("/mockData/:id", (req, res) => {
  const product = mockData.find((p) => p.id === parseInt(req.params.id)); // Find the product by id
  if (!product) return res.status(404).json({ message: "Product not found" }); // If not found, send 404
  const { name, price } = req.body; // Get updated name and price from the request body
  product.name = name; // Update the product name
  product.price = price; // Update the product price
  res.json(product); // Send the updated product as a response
});

// to delete a product
app.delete("/mockData/:id", (req, res) => {
  const index = mockData.findIndex((p) => p.id === parseInt(req.params.id)); // Find the index of the product by id
  if (index === -1) return res.status(404).json({ message: "Product not found" }); // If not found, send 404
  mockData.splice(index, 1); // Delete the product from the array
  res.status(204).send(); // Send a 204 No Content response
});
