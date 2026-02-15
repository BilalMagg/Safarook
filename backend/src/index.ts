import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (_req, res) => res.json({ ok: true, service: "safarook-backend" }));

app.use(errorHandler);

app.listen(Number(PORT), () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});
