import "dotenv/config";
import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
