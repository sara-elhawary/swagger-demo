// import { nanoid } from "../node_modules/nanoid/nanoid.js";
import express from "express";

const router = express.Router();
const idLength = 8;

router.get("/", (req, res) => {
  let todos = req.app.get("todos");
  return res.send({ todos });
});

router.post("/", (req, res) => {
  let todo = {
    // id: nanoid(idLength),
    ...req.body,
  };
  try {
    req.app.get("todos").push(todo).write();
    return res.sendStatus(201).send("Todo is saved successfully");
  } catch (err) {
    return res.sendStatus(500).send({ err });
  }
});

export default router;
