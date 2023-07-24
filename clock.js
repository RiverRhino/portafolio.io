//VARIABLES DEL PROGRAMA
let fecha = document.getElementById('TIME')
let check = document.getElementById('Firmar');
let reloj = new Date()
const input = document.querySelector('input');
const addBtn = document.querySelector('.btn-add');
const ul = document.querySelector("ul");
const empty = document.querySelector('.empty');

window.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    fecha.innerHTML = "Fecha: " + reloj.toDateString();
});

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = input.value.trim();

    if (text !== '') {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.textContent = text;

        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        ul.appendChild(li);

        input.value = "";

        empty.style.display = "none";

        // Guardar el nuevo elemento en LocalStorage
        saveTask(text);
    }
});

function addDeleteBtn() {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "x";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);

        const items = document.querySelectorAll('li');

        if (items.length === 0) {
            empty.style.display = "block";
        }

        // Eliminar el elemento de LocalStorage
        deleteTask(item.firstChild.textContent);
    });
    return deleteBtn;
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(task) {
    let tasks = getTasks();
    tasks = tasks.filter((t) => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    const tasksString = localStorage.getItem('tasks');
    return tasksString ? JSON.parse(tasksString) : [];
}

function loadTasks() {
    const tasks = getTasks();

    if (tasks.length === 0) {
        empty.style.display = "block";
    } else {
        empty.style.display = "none";
        tasks.forEach((task) => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.textContent = task;

            li.appendChild(p);
            li.appendChild(addDeleteBtn());
            ul.appendChild(li);
        });
    }
}

check.addEventListener("click", () => {
    const notas = document.getElementById('no');
    console.log("Task created");
    const task = document.createElement('input');
    task.type = 'text';

    notas.appendChild(task);
});