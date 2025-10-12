const groupNameHeading = document.querySelector("h2");
const cardsContainer = document.getElementById("cards-container");

function createCardElement(todo) {
  const todoCard = document.createElement("div");
  todoCard.classList.add("todo-card");
  todoCard.dataset.id = todo.id;
  todoCard.dataset.groupId = todo.groupId;
  cardsContainer.appendChild(todoCard);

  const deleteCardBtnEl = document.createElement("button");
  deleteCardBtnEl.classList.add("delete-card-btn", "del-btn");
  deleteCardBtnEl.innerHTML = `<svg class="delete-icon"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24">
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg>`;
  todoCard.appendChild(deleteCardBtnEl);

  const cardTitle = document.createElement("h3");
  cardTitle.className = "todo-title";
  cardTitle.textContent = todo.title;
  todoCard.appendChild(cardTitle);

  const todoDate = document.createElement("p");
  todoDate.className = "todo-due-date";
  todoDate.textContent = todo.dueDate;
  todoCard.appendChild(todoDate);

  const todoDesc = document.createElement("p");
  todoDesc.className = "todo-desc";
  todoDesc.textContent =
    todo.desc.length > 60 ? todo.desc.slice(0, 60) + "..." : todo.desc;
  todoCard.appendChild(todoDesc);

  const todoStatus = document.createElement("div");
  todoStatus.className = "todo-status";
  todoCard.appendChild(todoStatus);

  const todoStatusLabel = document.createElement("label");
  todoStatusLabel.htmlFor = `todo-status-${todo.id}`;
  todoStatus.appendChild(todoStatusLabel);

  const todoStatusInput = document.createElement("input");
  todoStatusInput.type = "checkbox";
  todoStatusInput.name = "todo-status";
  todoStatusInput.id = `todo-status-${todo.id}`;
  todoStatus.appendChild(todoStatusInput);

  if (!todo.status) {
    todoStatusInput.checked = false;
    todoStatusLabel.textContent = "Pending";
    todoCard.classList.remove("done-status");
  } else {
    todoStatusInput.checked = true;
    todoStatusLabel.textContent = "Done";
    todoCard.classList.add("done-status");
  }

  todoCard.classList.remove("high-priority", "low-priority");
  switch (todo.priority) {
    case "low":
      todoCard.classList.add("low-priority");
      break;
    case "high":
      todoCard.classList.add("high-priority");
      break;
  }
}

function renderCards(todoArr, addNewTodo) {
  cardsContainer.replaceChildren();
  todoArr.forEach((todo) => createCardElement(todo));
  addNewTodo && cardsContainer.appendChild(addNewTodo);
}

export default cardsContainer;
export { renderCards };
