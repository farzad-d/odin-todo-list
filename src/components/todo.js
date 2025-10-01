import db from "./db.js";

class ToDo {
  #id = crypto.randomUUID();

  constructor({ title, desc, dueDate, priority, status }) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  }

  get id() {
    return this.#id;
  }
}

function newTodo(todoData, targetGroupId) {
  const todo = new ToDo(todoData);
  const targetGroup = db.find((group) => group.id === targetGroupId);
  if (!targetGroup) return;
  targetGroup.addItem(todo);
}

function deleteTodo(targetTodoId, targetGroupId) {
  const targetGroup = db.find((group) => group.id === targetGroupId);
  if (!targetGroup) return;
  targetGroup.removeItem(targetTodoId);
}

export { newTodo, deleteTodo };
