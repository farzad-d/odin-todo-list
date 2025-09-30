import db from "./db.js";

class ToDo {
  #id = crypto.randomUUID();

  constructor({ title, desc, dueDate, priority, status, group }) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.group = group;
  }

  get id() {
    return this.#id;
  }
}

function addTodo(todoData) {
  const newTodo = new ToDo(todoData);
  db[todoData.group].push(newTodo);
}

function removeTodo(groupName, idToRemove) {
  const index = db[groupName].findIndex((todo) => todo.id === idToRemove);
  if (index !== -1) db[groupName].splice(index, 1);
}

export { addTodo, removeTodo };
