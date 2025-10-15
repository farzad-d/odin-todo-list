import db from "./db.js";

class Todo {
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

  toJSON() {
    return {
      id: this.#id,
      groupId: this.#groupId,
      title: this.title,
      desc: this.desc,
      dueDate: this.dueDate,
      priority: this.priority,
      status: this.status,
    };
  }

  static fromJSON(todoData) {
    const todo = new Todo(todoData);
    todo.groupId = todoData.groupId;
    return todo;
  }
}

function newTodo(todoData, targetGroupId) {
  const targetGroup = db.get().find((group) => group.id === targetGroupId);
  if (!targetGroup) return;
  const todo = new Todo(todoData);
  todo.groupId = targetGroupId;
  targetGroup.addTodo(todo);
  db.save();
}

function updateTodo(todoData, todo) {
  todo.title = todoData.title;
  todo.desc = todoData.desc;
  todo.dueDate = todoData.dueDate;
  todo.priority = todoData.priority;
  db.save();
}

function deleteTodo(targetTodoId, targetGroupId) {
  const targetGroup = db.get().find((group) => group.id === targetGroupId);
  if (!targetGroup) return;
  targetGroup.removeTodo(targetTodoId);
  db.save();
}

function getGroupTodos(targetGroupId) {
  const targetGroup = db.get().find((group) => group.id === targetGroupId);
  return targetGroup.todos;
}

function getAllTodos() {
  return db
    .get()
    .map((group) => group.todos)
    .flat();
}

function getTodo(targetTodoId) {
  for (const group of db.get()) {
    const todo = group.todos.find((todo) => todo.id === targetTodoId);
    if (todo) return todo;
  }
  return null;
}

function toggleStatus(todo) {
  todo.status ? (todo.status = false) : (todo.status = true);
  db.save();
}

export default Todo;
export {
  newTodo,
  deleteTodo,
  getGroupTodos,
  getAllTodos,
  toggleStatus,
  getTodo,
  updateTodo,
};
