import "normalize.css";
import "./styles.css";
import db from "./components/db.js";

import { newGroup, deleteGroup, getGroups } from "./components/group.js";
import {
  newTodo,
  deleteTodo,
  getGroupTodos,
  getAllTodos,
} from "./components/todo.js";
import groupList, { renderGroupList } from "./components/sidebarUI.js";
import cardsContainer, { renderCards } from "./components/cardsUI.js";

const newGroupDialog = document.getElementById("new-group-dialog");
const newGroupBtn = document.querySelector(".new-group");
newGroupBtn.addEventListener("click", () => newGroupDialog.showModal());

const newGroupForm = document.getElementById("new-group-form");
newGroupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(newGroupForm);
  const name = formData.get("group-name");
  newGroupForm.reset();
  newGroupDialog.close();
  newGroup(name);
  renderGroupList(getGroups());
});

const closeGroupDialogBtn = document.querySelector(".close-group-dialog-btn");
closeGroupDialogBtn.addEventListener("click", () => newGroupDialog.close());

groupList.addEventListener("click", (e) => {
  const deleteGroupBtn = e.target.closest(".delete-group-btn");
  const group = e.target.closest(".group");
  const allTodos = e.target.closest("#all-todos");

  function highlightSelectedGroup() {
    const listBtns = document.querySelectorAll(".list-btn");
    listBtns.forEach((btn) => btn.classList.remove("selected-group"));
    const selectedGroup = e.target.closest(".list-btn");
    selectedGroup.classList.add("selected-group");
  }

  if (deleteGroupBtn) {
    const groupToDelete = deleteGroupBtn.closest(".group");
    deleteGroup(groupToDelete.dataset.id);
    renderGroupList(getGroups());
  } else if (group) {
    renderCards(getGroupTodos(group.dataset.id));
    highlightSelectedGroup();
    cardsContainer.dataset.displayType = "group";
  } else if (allTodos) {
    renderCards(getAllTodos());
    highlightSelectedGroup();
    cardsContainer.dataset.displayType = "all";
  } else {
    return;
  }
});

cardsContainer.addEventListener("click", (e) => {
  const deleteCardBtn = e.target.closest(".delete-card-btn");
  const card = e.target.closest(".todo-card");

  if (deleteCardBtn) {
    const todoToDelete = deleteCardBtn.closest(".todo-card");
    deleteTodo(todoToDelete.dataset.id, todoToDelete.dataset.groupId);

    if (cardsContainer.dataset.displayType === "group") {
      renderCards(getGroupTodos(todoToDelete.dataset.groupId));
    } else {
      renderCards(getAllTodos());
    }
  } else if (card) {
    console.log("Show Todo dialog");
  } else {
    return;
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
  status: true,
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

// todo: Add new todo button (UI & handler)
// todo: Add handler for cards
// todo: Add handler to change group name heading
// todo: Update cards container when the current group deleted
