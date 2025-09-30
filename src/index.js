import db from "./components/db.js";
import { addTodo, removeTodo } from "./components/todo.js";

const sampleTodo = {
  title: "Test",
  desc: "Check the entry, output, and loader rules for the assets.",
  dueDate: "2025-10-05",
  priority: "High",
  status: false,
  group: "Default",
};

const sampleTodo2 = {
  title: "Test 2",
  desc: "Check the entry, output, and loader rules for the assets.",
  dueDate: "2023-10-05",
  priority: "Low",
  status: true,
  group: "Default",
};

addTodo(sampleTodo);
addTodo(sampleTodo2);

// removeTodo(db[0].id);

console.log(db);
