import express from "express";
import cors from "cors";
import { Low } from "./node_modules/lowdb/lib/Low.js";
import { TextFileSync } from "./node_modules/lowdb/lib/adapters/TextFileSync.js";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import SwaggerUI from "swagger-ui-express";

import docs from "./docs/index.js";
import todosRouter from "./routes/toDosRoutes.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const adapter = new TextFileSync(__dirname, "db.json");
const db = new Low(adapter);
// db.defaults({ todos: [] }).write();
db.data = { todos: [] };
const app = express();
const PORT = process.env.PORT || 3000;

app.db = db;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use("/todos", todosRouter);
app.use("/docs", SwaggerUI.serve, SwaggerUI.setup(docs));

async function initalize() {
  app.listen(3000);
}

initalize().finally(() => console.log(`server is running on port: ${PORT}`));
