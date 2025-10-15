import Group from "./group.js";

let database = [];

function get() {
  return database;
}

function save() {
  localStorage.setItem("database", JSON.stringify(database));
}

function load() {
  const data = localStorage.getItem("database");
  if (!data) {
    database = [];
    return;
  }

  const parsedDB = JSON.parse(data);
  database = parsedDB.map((groupData) => Group.fromJSON(groupData));
}

export default { get, save, load };
