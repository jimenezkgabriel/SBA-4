//const { createElement } = require("react");

let task = {
    taskName: ``,
    category: ``,
    deadline: new Date().toLocaleDateString(),
    currentStatus: 'Completed'
}

let taskList = [];

const taskInput = document.getElementById(`task`);
const btnAddTask = document.getElementById(`addTask`);
const taskTable = document.getElementById(`taskTable`);

btnAddTask.addEventListener('click', (e) => {
    let newTask = {
        taskName: taskInput.value,
        category: ``,
        deadline: new Date().toLocaleDateString(),
        currentStatus: ''
    }

    task.taskName = taskInput.value;
    taskList.push(task);
    console.log(taskList);
    renderTable();


})

let renderTable = () => {
    taskTable.innerHTML = ``;

    for (let task of taskList) {
        const tr = document.createElement(`tr`);
        for (n in task) {
            let td = document.createElement(`td`);
            if (n == `currentStatus`) {
                const roles = [`In Progress`, `Completed`, `Overdue`];
                const drop = document.createElement(`select`);
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