import { newGroup, getGroupNames } from "./group.js";

const groupList = document.getElementById("group-list");

function createGroupElement(groupName) {
  const group = document.createElement("li");
  group.className = "group";
  groupList.appendChild(group);

  const groupBtn = document.createElement("button");
  groupBtn.classList.add("group-btn", "side-btn");
  groupBtn.textContent = groupName;
  group.appendChild(groupBtn);

  const deleteGroupBtn = document.createElement("button");
  deleteGroupBtn.classList.add("delete-group-btn");
  deleteGroupBtn.innerHTML = `<svg class="delete-group-icon"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24">
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg>`;
  group.appendChild(deleteGroupBtn);
}

function renderGroupList(groupNames) {
  groupList.replaceChildren();
  groupNames.forEach((name) => {
    createGroupElement(name);
  });
}

const newGroupDialog = document.getElementById("new-group-dialog");
const newGroupForm = document.getElementById("new-group-form");

newGroupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(newGroupForm);
  const name = formData.get("group-name");
  newGroupForm.reset();
  newGroupDialog.close();

  newGroup(name);
  renderGroupList(getGroupNames());
});

function handleSubmit() {
  newGroupDialog.showModal();
}

const closeGroupDialogBtn = document.querySelector(".close-group-dialog-btn");
closeGroupDialogBtn.addEventListener("click", () => newGroupDialog.close());

export { renderGroupList, handleSubmit };
