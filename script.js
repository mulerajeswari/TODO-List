const sections = ["todo", "focus"];
const lineCounts = {
  todo: 8,
  focus: 6
};
let data = JSON.parse(localStorage.getItem("cleanEditorData")) || {
  todo: Array(lineCounts.todo).fill(""),
  focus: Array(lineCounts.focus).fill(""),
  notes: "",
  remember: ""
};

function saveData() {
  localStorage.setItem("cleanEditorData", JSON.stringify(data));
}

function createLine(section, index) {
  const li = document.createElement("li");

  if (section === "todo") {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = () => {
      data[section][index] = "";
      renderAll();
      saveData();
    };
    li.appendChild(checkbox);
  }

  const input = document.createElement("input");
  input.type = "text";
  input.value = data[section][index];

  input.oninput = (e) => {
    data[section][index] = e.target.value;
    saveData();
  };

  li.appendChild(input);
  return li;
}

function renderAll() {
  sections.forEach(section => {
    const ul = document.getElementById(`${section}-list`);
    if (!ul) return;

    ul.innerHTML = "";
    data[section].forEach((_, i) => {
      ul.appendChild(createLine(section, i));
    });
  });

  document.getElementById("notes-box").innerText = data.notes;
  document.getElementById("remember-box").innerText = data.remember;
}

function setupEditableDivs() {
  const notes = document.getElementById("notes-box");
  const remember = document.getElementById("remember-box");

  notes.oninput = () => {
    data.notes = notes.innerText;
    saveData();
  };

  remember.oninput = () => {
    data.remember = remember.innerText;
    saveData();
  };
}

renderAll();
setupEditableDivs();
