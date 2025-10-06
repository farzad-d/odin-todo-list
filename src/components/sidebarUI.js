import { newGroup, getGroupsInfo, deleteGroup } from "./group.js";

const groupList = document.getElementById("group-list");

function createGroupElement(group) {
  const groupEl = document.createElement("li");
  groupEl.className = "group";
  groupEl.dataset.id = group.id;
  groupList.appendChild(groupEl);

  const groupBtnEl = document.createElement("button");
  groupBtnEl.classList.add("group-btn", "side-btn");
  groupBtnEl.textContent = group.name;
  groupEl.appendChild(groupBtnEl);

  const deleteGroupBtnEl = document.createElement("button");
  deleteGroupBtnEl.classList.add("delete-group-btn");
  deleteGroupBtnEl.innerHTML = `<svg class="delete-group-icon"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24">
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg>`;
  groupEl.appendChild(deleteGroupBtnEl);
}

function renderGroupList(groupsInfo) {
  groupList.replaceChildren();

  groupsInfo.forEach((group) => {
    createGroupElement(group);
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
  renderGroupList(getGroupsInfo());
});

function handleSubmit() {
  newGroupDialog.showModal();
}

const closeGroupDialogBtn = document.querySelector(".close-group-dialog-btn");
closeGroupDialogBtn.addEventListener("click", () => newGroupDialog.close());

groupList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-group-btn");
  if (!deleteBtn) return;
  const groupId = deleteBtn.closest(".group").dataset.id;

  deleteGroup(groupId);
  renderGroupList(getGroupsInfo());
});

export { renderGroupList, handleSubmit };
