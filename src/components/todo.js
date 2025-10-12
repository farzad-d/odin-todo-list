import db from "./db.js";

class ToDo {
  #id = crypto.randomUUID();
  #groupId = "";

  constructor({ title, desc, dueDate, priority, status = false }) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  }

  get id() {
    return this.#id;
  }

  get groupId() {
    return this.#groupId;
  }

  set groupId(gId) {
    this.#groupId = gId;
  }
}

function newTodo(todoData, targetGroupId) {
  const targetGroup = db.find((group) => group.id === targetGroupId);
  if (!targetGroup) return;
  const todo = new ToDo(todoData);
  todo.groupId = targetGroupId;
  targetGroup.addItem(todo);
}

function updateTodo(todoData, todo) {
  todo.title = todoData.title;
  todo.desc = todoData.desc;
  todo.dueDate = todoData.dueDate;
  todo.priority = todoData.priority;
}

function deleteTodo(targetTodoId, targetGroupId) {
  const targetGroup = db.find((group) => group.id === targetGroupId);
  if (!targetGroup) return;
  targetGroup.removeItem(targetTodoId);
}

function getGroupTodos(targetGroupId) {
  const targetGroup = db.find((group) => group.id === targetGroupId);
  return targetGroup.items;
}

function getAllTodos() {
  return db.map((group) => group.items).flat();
}

function getTodo(targetTodoId) {
  for (const group of db) {
    const todo = group.items.find((items) => items.id === targetTodoId);
    if (todo) return todo;
  }
  return null;
}

function statusToggle(todo) {
  todo.status ? (todo.status = false) : (todo.status = true);
}

export {
  newTodo,
  deleteTodo,
  getGroupTodos,
  getAllTodos,
  statusToggle,
  getTodo,
  updateTodo,
};
