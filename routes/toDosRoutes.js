import { nanoid } from "nanoid";
import express from "express";

const router = express.Router();
const idLength = 8;

router.get("/", (req, res) => {
  let todos = req.app.get("todos");
  return res.send({ todos });
});

router.post("/", async (req, res) => {
  let todo = {
    id: nanoid(idLength),
    ...req.body,
  };
  try {
    await req.app.get("todos").push(todo).write();
    return res.send(201, "Todo is saved successfully");
  } catch (err) {
    return res.send(500, { err });
  }
});

export default router;
