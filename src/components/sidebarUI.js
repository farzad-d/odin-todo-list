const groupList = document.getElementById("group-list");

function createGroupElement(group) {
  const groupEl = document.createElement("li");
  groupEl.classList.add("group");
  groupEl.dataset.id = group.id;
  groupList.appendChild(groupEl);

  const groupBtnEl = document.createElement("button");
  groupBtnEl.classList.add("group-btn", "side-btn", "list-btn");
  groupBtnEl.textContent =
    group.name.length > 24 ? group.name.slice(0, 24) + "..." : group.name;
  groupEl.appendChild(groupBtnEl);

  const deleteGroupBtnEl = document.createElement("button");
  deleteGroupBtnEl.classList.add("delete-group-btn", "del-btn");
  deleteGroupBtnEl.innerHTML = `<svg class="delete-icon"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24">
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg>`;
  groupEl.appendChild(deleteGroupBtnEl);
}

function renderGroupList(groupsInfo) {
  const first = groupList.firstElementChild;
  groupList.replaceChildren(first);
  groupsInfo.forEach((group) => createGroupElement(group));
}

function highlightOnSelect(btnEl) {
  if (!btnEl) return;
  const listBtns = document.querySelectorAll(".list-btn");
  listBtns.forEach((btn) => btn.classList.remove("selected-group"));
  btnEl.classList.add("selected-group");
}

export default groupList;
export { renderGroupList, highlightOnSelect };
