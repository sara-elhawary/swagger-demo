import { nanoid } from "nanoid";
import express from "express";

const router = express.Router();
const idLength = 8;

router.get("/", async (req, res) => {
  let todos = req.app.db.data.todos;
  // await req.app.db.read();
  console.log(todos);
  return res.send(todos);
});

router.post("/", async (req, res) => {
  let todo = {
    id: nanoid(idLength),
    ...req.body,
  };
  try {
    req.app.db.data.todos.push(todo);
    await req.app.db.write();
    return res.send(201, "Todo is saved successfully");
  } catch (err) {
    return res.send(500, { err });
  }
});

router.get("/:id", (req, res) => {
  const given_id = req.params.id;
  let todos = req.app.db.data.todos;

  const wanted_todo = todos.find((todo) => todo.id == given_id);
  return res.send(wanted_todo);
});

// router.delete("/:id", async (req, res) => {
//   const given_id = req.params.id;
//   const todos = req.app.db.data.todos;
//   try {
//     todos.delete(todos.findIndex((todo) => todo.id == given_id));
//     await req.app.db.write();
//     return res.status(200).send("todo is successfullt deleted");
//   } catch (err) {
//     return res.status(500).send({ err });
//   }
// });
export default router;
