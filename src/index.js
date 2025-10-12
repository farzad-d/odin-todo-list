import "normalize.css";
import "./styles.css";
import db from "./components/db.js";
import cardsContainer, { renderCards } from "./components/cardsUI.js";

import {
  newGroup,
  deleteGroup,
  getGroups,
  getGroupName,
} from "./components/group.js";

import {
  newTodo,
  deleteTodo,
  getGroupTodos,
  getAllTodos,
  statusToggle,
  getTodo,
  updateTodo,
} from "./components/todo.js";

import groupList, {
  renderGroupList,
  highlightOnSelect,
} from "./components/sidebarUI.js";

const newGroupDialog = document.getElementById("new-group-dialog");
const newGroupBtn = document.querySelector(".new-group");
newGroupBtn.addEventListener("click", () => newGroupDialog.showModal());

const newGroupForm = document.getElementById("new-group-form");
newGroupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(newGroupForm);
  const name = formData.get("group-name");

  newGroup(name);
  renderGroupList(getGroups());
  newGroupForm.reset();
  newGroupDialog.close();
  groupList.lastChild.click();
});

const newTodoDialog = document.getElementById("new-todo-dialog");
const addNewTodo = document.getElementById("add-new-todo");
addNewTodo.addEventListener("click", () => {
  newTodoDialog.showModal();
  submitBtn.textContent = "Create Todo";
});

const submitBtn = document.getElementById("submit-todo-form");
const newTodoForm = document.getElementById("new-todo-form");
newTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(newTodoForm);
  const title = formData.get("todo-title");
  const desc = formData.get("todo-desc");
  const dueDate = formData.get("todo-due-date");
  const priority = formData.get("todo-priority");

  const currentGroupId = cardsContainer.dataset.activeGroupId;

  if (newTodoForm.dataset.editingId) {
    updateTodo(
      { title, desc, dueDate, priority },
      getTodo(newTodoForm.dataset.editingId)
    );
    delete newTodoForm.dataset.editingId;
  } else {
    newTodo({ title, desc, dueDate, priority }, currentGroupId);
  }

  renderCurrentView(currentGroupId);
  newTodoForm.reset();
  newTodoDialog.close();
});

function openEditDialog(todo) {
  newTodoForm.querySelector("[name='todo-title']").value = todo.title;
  newTodoForm.querySelector("[name='todo-desc']").value = todo.desc;
  newTodoForm.querySelector("[name='todo-due-date']").value = todo.dueDate;
  newTodoForm.querySelector("[name='todo-priority']").value = todo.priority;

  newTodoForm.dataset.editingId = todo.id;
  newTodoDialog.showModal();
}

const closeGroupDialogBtn = document.querySelector(".close-group-dialog-btn");
closeGroupDialogBtn.addEventListener("click", () => {
  newGroupForm.reset();
  newGroupDialog.close();
});

const closeTodoDialogBtn = document.querySelector(".close-todo-dialog-btn");
closeTodoDialogBtn.addEventListener("click", () => {
  delete newTodoForm.dataset.editingId;
  newTodoForm.reset();
  newTodoDialog.close();
});

groupList.addEventListener("click", (e) => {
  const deleteGroupBtn = e.target.closest(".delete-group-btn");
  const group = e.target.closest(".group");
  const allTodos = e.target.closest("#all-todos");
  const groupNameHeading = document.querySelector("h2");

  if (deleteGroupBtn) {
    const prevSibling = group.previousElementSibling;
    const prevId = prevSibling?.dataset?.id ?? null;

    deleteGroup(group.dataset.id);
    renderGroupList(getGroups());

    const buttonToSelect = prevId
      ? document.querySelector(`[data-id="${prevId}"]`)
      : document.querySelector("#all-todos");
    buttonToSelect?.click();
  } else if (group) {
    renderCards(getGroupTodos(group.dataset.id), addNewTodo);
    highlightOnSelect(group.querySelector(".list-btn"));
    cardsContainer.dataset.activeGroupId = group.dataset.id;
    groupNameHeading.textContent = getGroupName(group.dataset.id);
  } else if (allTodos) {
    renderCards(getAllTodos());
    highlightOnSelect(allTodos.querySelector(".list-btn"));
    cardsContainer.dataset.activeGroupId = "";
    groupNameHeading.textContent = "All Todos";
  }
});

function renderCurrentView(groupId) {
  cardsContainer.dataset.activeGroupId
    ? renderCards(getGroupTodos(groupId), addNewTodo)
    : renderCards(getAllTodos());
}

cardsContainer.addEventListener("click", (e) => {
  const deleteCardBtn = e.target.closest(".delete-card-btn");
  const card = e.target.closest(".todo-card");
  const status = e.target.closest("input[type='checkbox'], label");

  if (deleteCardBtn) {
    deleteTodo(card.dataset.id, card.dataset.groupId);
    renderCurrentView(card.dataset.groupId);
  } else if (status) {
    statusToggle(getTodo(card.dataset.id));
    renderCurrentView(card.dataset.groupId);
  } else if (card) {
    openEditDialog(getTodo(card.dataset.id));
    submitBtn.textContent = "Update Todo";
    renderCurrentView(card.dataset.groupId);
  }
});

// TEST SECTION ####################
const sampleTodo1 = {
  title: "Test 1",
  desc: "Check the entry, output, and loader rules for the assets word word word word.",
  dueDate: "2025-10-05",
  priority: "High",
  status: false,
};

const sampleTodo2 = {
  title: "Test 2",
  desc: "Check the entry, output, and loader rules for the assets.",
  dueDate: "2023-10-05",
  priority: "Low",
  status: false,
};

const sampleTodo3 = {
  title: "Test 3",
  desc: "Check the entry, output, and loader rules for the assets.",
  dueDate: "2022-10-05",
  priority: "Low",
  status: true,
};

newGroup("group foo");
newGroup("group bar");
newGroup("group buz");

newTodo(sampleTodo1, db[0].id);
newTodo(sampleTodo2, db[1].id);
newTodo(sampleTodo3, db[1].id);

console.log(db);
// #################################

renderGroupList(getGroups());

// todo: Add a default group selection at start
