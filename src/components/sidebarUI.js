const groupList = document.getElementById("group-list");

function createGroupElement(groupName) {
  const group = document.createElement("li");
  groupList.appendChild(group);

  const groupBtn = document.createElement("button");
  groupBtn.classList.add("group-btn");
  groupBtn.textContent = groupName;
  group.appendChild(groupBtn);
}

function renderGroupList(groupNames) {
  groupNames.forEach((name) => {
    createGroupElement(name);
  });
}

export default renderGroupList;
