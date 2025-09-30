import db from "./components/db.js";
import { addTodo, removeTodo } from "./components/todo.js";

// TEST SECTION ####################
const sampleTodo1 = {
  title: "Test 1",
  desc: "Check the entry, output, and loader rules for the assets.",
  dueDate: "2025-10-05",
  priority: "High",
  status: false,
  group: "t",
};

const sampleTodo2 = {
  title: "Test 2",
  desc: "Check the entry, output, and loader rules for the assets.",
  dueDate: "2023-10-05",
  priority: "Low",
  status: true,
  group: "d",
};

addTodo(sampleTodo1);
addTodo(sampleTodo2);

// removeTodo(sampleTodo1.group, db.t[0].id);

console.log(db);
