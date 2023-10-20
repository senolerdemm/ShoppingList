const itemForm = document.getElementById("item-form");
const itemİnput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

itemForm.addEventListener("submit", Addlist);

function Addlist(e) {
  e.preventDefault();
  const newItem = itemİnput.value;
  if (itemİnput.value === " ") {
    alert("please add !!");
    return;
  }
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  const btn = createButton("remove-item btn-link text-red");
  li.appendChild(btn);
  itemList.appendChild(li);
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
