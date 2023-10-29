const itemForm = document.getElementById("item-form");
const itemİnput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemClear = document.getElementById("clear");
const items = itemList.querySelectorAll("li");
const filter = document.getElementById("filter");

itemForm.addEventListener("submit", onAddItemSubmıt);
itemList.addEventListener("click", onClickItem);
itemClear.addEventListener("click", removeAll);
filter.addEventListener("input", filterİtems);
document.addEventListener("DOMContentLoaded", displayItems);

function filterİtems(e) {
  const items = Array.from(itemList.querySelectorAll("li"));
  const text = e.target.value.toLowerCase();

  items.forEach(function (item) {
    const name = item.firstChild.textContent.toLowerCase();
    if (name.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
}

function onAddItemSubmıt(e) {
  e.preventDefault();
  const newItem = itemİnput.value;
  if (itemİnput.value === "") {
    alert("Lütfen ekleyiniz");
    return;
  }
  if (isItemAlreadyExists(newItem)) {
    alert("Bu ürün zaten sepetinizde!");
  }
  addItemToDom(newItem);
  addItemToStorage(newItem);
  itemİnput.value = "";
  checkUI();
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();

    removeItemFromStorage(item.textContent);

    checkUI();
  }
}
function removeItemFromStorage(item) {
  let itemFromStorage = getItemFromStorage();
  itemFromStorage = itemFromStorage.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function removeAll(e) {
  if (e.target === itemClear) {
    const itemList = document.getElementById("item-list");
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem("items");
    checkUI();
  }
}
function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    itemClear.style.display = "none";
    filter.style.display = "none";
  } else {
    itemClear.style.display = "block";
    filter.style.display = "block";
  }
}

function addItemToDom(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const btn = createButton("remove-item btn-link text-red");
  li.appendChild(btn);
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemFromStorage = getItemFromStorage();

  itemFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function isItemAlreadyExists(newItem) {
  const items = itemList.querySelectorAll("li");
  for (const item of items) {
    if (item.firstChild.textContent.toLowerCase() === newItem.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function getItemFromStorage() {
  let itemFromStorage;
  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemFromStorage;
}
function displayItems() {
  const itemFromStorage = getItemFromStorage();
  itemFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
}

document.addEventListener("DOMContentLoaded", displayItems);

checkUI();
