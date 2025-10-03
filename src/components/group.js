import db from "./db.js";

class Group {
  #id = crypto.randomUUID();

  #items = [];
  constructor(name) {
    this.name = name;
  }

  get id() {
    return this.#id;
  }
  get items() {
    return [...this.#items];
  }

  addItem(item) {
    this.#items.push(item);
  }
  removeItem(itemToRemoveId) {
    this.#items = this.#items.filter((item) => item.id !== itemToRemoveId);
  }
}

function newGroup(name) {
  const group = new Group(name);
  db.push(group);
}

function deleteGroup(targetGroupId) {
  const targetGroupIndex = db.findIndex((group) => group.id === targetGroupId);
  db.splice(targetGroupIndex, 1);
}

function getGroupNames() {
  db.map((group) => group.name);
}

export { newGroup, deleteGroup, getGroupNames };
