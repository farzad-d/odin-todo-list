import Todo from "./todo.js";
import db from "./db.js";

class Group {
  #id = crypto.randomUUID();
  #todos = [];

  constructor(name) {
    this.name = name;
  }

  get id() {
    return this.#id;
  }
  get todos() {
    return [...this.#todos];
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }
  removeTodo(targetTodoId) {
    this.#todos = this.#todos.filter((todo) => todo.id !== targetTodoId);
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.name,
      todos: this.#todos.map((todo) => todo.toJSON()),
    };
  }

  static fromJSON(groupData) {
    const group = new Group(groupData.name);
    group.#id = groupData.id;
    group.#todos = groupData.todos.map((todo) => Todo.fromJSON(todo));
    return group;
  }
}

function newGroup(name) {
  const group = new Group(name);
  db.get().push(group);
  db.save();
}

function deleteGroup(targetGroupId) {
  const targetGroupIndex = db
    .get()
    .findIndex((group) => group.id === targetGroupId);
  db.get().splice(targetGroupIndex, 1);
  db.save();
}

function getGroupName(targetGroupId) {
  const targetGroup = db.get().find((group) => group.id === targetGroupId);
  return targetGroup.name;
}

export default Group;
export { newGroup, deleteGroup, getGroupName };
