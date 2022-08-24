import express from "express";
import cors from "cors";
import { JSONFile, Low } from "lowdb";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import SwaggerUI from "swagger-ui-express";

import docs from "./docs/index.js";
import todosRouter from "./routes/toDosRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "db.json");
const adapter = new JSONFile(filePath);
const db = new Low(adapter);

await db.read();
db.data ||= { todos: [] };
const app = express();
const PORT = process.env.PORT || 4000;

app.db = db;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use("/todos", todosRouter);
app.use("/docs", SwaggerUI.serve, SwaggerUI.setup(docs));

async function initalize() {
  app.listen(4000);
}

initalize().finally(() => console.log(`server is running on port: ${PORT}`));
