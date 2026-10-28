const express = require("express");
const cors = require("cors");

// Import Routes
const productsRouter = require("./routes/products")

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product API is running!",
  });
});

// Add the Routes 
app.use("/api/products", productsRouter)

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})