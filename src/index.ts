import express from "express";
import "./config/database";
import cors from "cors";
import clientRoutes from "./routes/clientRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import paymentRoutes from "./routes/paymentRoutes";

const app = express();

app.use(cors());

app.use(express.json()); // Чтобы сервер понимал JSON

app.use("/clients", clientRoutes);
app.use("/sessions", sessionRoutes);
app.use("/payments", paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
