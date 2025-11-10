let taskList = [];
let filteredList = [];

const taskInput = document.getElementById(`task`);
const taskCategory = document.getElementById(`category`);
const taskDeadline = document.getElementById(`deadline`);
const taskStatus = document.getElementById(`status`);
const btnAddTask = document.getElementById(`addTask`);
const taskTable = document.getElementById(`taskTable`);

const fltCategory = document.getElementById(`filterCategory`);
const fltStatus = document.getElementById(`filterStatus`);

btnAddTask.addEventListener('click', (e) => {

    let task = {
        taskName: taskInput.value,
        category: taskCategory.value,
        deadline: new Date(`${taskDeadline.value}T00:00`).toLocaleDateString(),
        currentStatus: taskStatus.value
    }

    if (task.deadline == `Invalid Date`) {
        task.deadline = new Date().toLocaleDateString();
    }

    taskList.push(task);
    console.log(taskList);
    renderTable(taskList);

    taskInput.value = ``;
    taskCategory.value = ``;
    taskDeadline.value = ``;
})

let renderTable = (list) => {
    taskTable.innerHTML = ``;

    for (let task of list) {
        const tr = document.createElement(`tr`);
        for (n in task) {
            let td = document.createElement(`td`);
            if (n == `currentStatus`) {
                const roles = [`In Progress`, `Completed`, `Overdue`];
                const drop = document.createElement(`select`);
                drop.className = `form-select`;
                for (let r of roles) {
                    const option = document.createElement(`option`);
                    option.value = r;
                    option.textContent = r;
                    if (r == task[n]) {
                        option.selected = r;
                    }
                    drop.appendChild(option);
                }
                td.appendChild(drop);
                tr.appendChild(td);
            }
            else {
                td.textContent = task[n];
                tr.appendChild(td);
            }
        }
        taskTable.appendChild(tr);
    }
}

fltCategory.addEventListener(`input`, (e) => {
    buildFilter();
})

fltStatus.addEventListener(`change`, (e) => {
    buildFilter();
})

let buildFilter = () => {
    filteredList = taskList.filter((n) => {
        if (fltStatus.value != ``) {
            return (n.category.toLowerCase().includes(fltCategory.value.toLowerCase()) && n.currentStatus.includes(fltStatus.value))
        }
        return n.category.toLowerCase().includes(fltCategory.value.toLowerCase());
    })
    renderTable(filteredList);
}