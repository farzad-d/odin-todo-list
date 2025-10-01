import db from "./components/db.js";
import { newGroup, deleteGroup } from "./components/group.js";
import { newTodo, deleteTodo } from "./components/todo.js";

// TEST SECTION ####################
const sampleTodo1 = {
  title: "Test 1",
  desc: "Check the entry, output, and loader rules for the assets.",
  dueDate: "2025-10-05",
  priority: "High",
  status: false,
};

const sampleTodo2 = {
  title: "Test 2",
  desc: "Check the entry, output, and loader rules for the assets.",
  dueDate: "2023-10-05",
  priority: "Low",
  status: true,
};

// newTodo(sampleTodo1, "222222");
// newTodo(sampleTodo2, "333333");

newGroup("new foo");
newGroup("new bar");
// deleteGroup(db[0].id);

// newTodo(sampleTodo1, "123");
// deleteTodo(db[0].items[0].id, "123");

console.log(db);
