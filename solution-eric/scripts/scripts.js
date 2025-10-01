const input = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");

// creating a list item
function makeListItem(text) {
  const li = document.createElement("li"); //create new list item

  const label = document.createElement("span"); //create a span element called label
  label.className = "item-text";
  label.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";

  // Remove (no .closest — we already have li via closure)
  removeBtn.addEventListener("click", function () {
    list.removeChild(li);
  });

  // Edit/Save toggle using replaceChild
  let isEditing = false;
  editBtn.addEventListener("click", function () {
    if (!isEditing) {
      // Switch to edit mode: <span> -> <input>
      const editor = document.createElement("input");
      editor.type = "text";
      editor.value = label.textContent;

      // swap label -> editor
      li.replaceChild(editor, label);

      editBtn.textContent = "Save";
      isEditing = true;

      // Optional Enter-to-save (still only addEventListener)
      editor.addEventListener("keydown", function (e) {
        if (e.key === "Enter") editBtn.click();
      });

    } else {
      // Save: <input> -> <span>
      const editor = li.querySelector("input"); // within this li only
      const newText = (editor.value || "").trim();
      if (!newText) return; // don't save empty

      label.textContent = newText;

      // swap editor -> label
      li.replaceChild(label, editor);

      editBtn.textContent = "Edit";
      isEditing = false;
    }
  });

  li.appendChild(label);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);
  return li;
}

function handleAdd() {
  const value = (input.value || "").trim();
  if (!value) return;

  const li = makeListItem(value);
  list.appendChild(li);

  // No .focus(); just clear
  input.value = "";
}

addBtn.addEventListener("click", handleAdd);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") handleAdd();
});
