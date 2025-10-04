import "normalize.css";
import "./styles.css";
import db from "./components/db.js";
import { newGroup, deleteGroup, getGroupNames } from "./components/group.js";
import {
  newTodo,
  deleteTodo,
  getGroupTodos,
  getAllTodos,
} from "./components/todo.js";
import renderGroupList from "./components/sidebarUI.js";

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

newGroup("group foo");
newGroup("group bar");
newGroup("group buz");
// deleteGroup(db[0].id);

newTodo(sampleTodo1, db[0].id);
newTodo(sampleTodo2, db[1].id);
// deleteTodo(db[0].items[0].id, "123");

console.log(db);
console.log(getGroupNames());
// console.log(getGroupTodos(db[0].id));
// console.log(getAllTodos());

renderGroupList(getGroupNames());
