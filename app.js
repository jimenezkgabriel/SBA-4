let taskList = [];
// local storage will be updated everytime add task button is clicked
// if tasks exist, populate our task list with the saved tasks
if (localStorage.getItem('tasks') != null) {
    taskList = JSON.parse(localStorage.getItem(`tasks`));
}
let filteredList = [];

// set variables to DOM elements
const taskInput = document.getElementById(`task`);
const taskCategory = document.getElementById(`category`);
const taskDeadline = document.getElementById(`deadline`);
const taskStatus = document.getElementById(`status`);
const btnAddTask = document.getElementById(`addTask`);
const taskTable = document.getElementById(`taskTable`);

const fltCategory = document.getElementById(`filterCategory`);
const fltStatus = document.getElementById(`filterStatus`);

btnAddTask.addEventListener('click', (e) => {

    // create a new task and set its properties to whatever values
    // each input has
    let task = {
        taskName: taskInput.value,
        category: taskCategory.value,
        deadline: new Date(`${taskDeadline.value}T00:00`).toLocaleDateString(), // weird hack to stop the date to show up as one day earlier due to UTC nonsense
        currentStatus: taskStatus.value
    }

    // Just a way to set a default date if user didn't put anything on the calendar
    if (task.deadline == `Invalid Date`) {
        task.deadline = new Date().toLocaleDateString();
    }

    // if the date on the calendar is older than today, then automatically
    // mark the current status as "Overdue"
    let dateToday = new Date();
    dateToday.setUTCHours(0, 0, 0);

    if (Date.parse(task.deadline) < dateToday) {
        task.currentStatus = `Overdue`;
    }

    // add the fresh task into our task list
    taskList.push(task);
    console.log(taskList); // Just to test
    renderTable(taskList); // Call renderTable function to display the tasklist onto the table

    // Cleanup input fields
    taskInput.value = ``;
    taskCategory.value = ``;
    taskDeadline.value = ``;

    // Save the task list into local storage
    localStorage.setItem(`tasks`, JSON.stringify(taskList));
})

let renderTable = (list) => {
    // wipe the contents of the table to update it
    taskTable.innerHTML = ``;

    list.forEach((task, index) => {
        // for each task in our list, create a table row
        const tr = document.createElement(`tr`);
        for (n in task) {
            // n takes on the form of the current iterated task's property (such as taskName, category, deadline, etc.)
            // then create a table data for each task's properties
            let td = document.createElement(`td`);
            if (n == `currentStatus`) {
                // special case to prepare a dropdown element when n reaches the "currentStatus" property
                const roles = [`In Progress`, `Completed`, `Overdue`];
                const drop = document.createElement(`select`);
                drop.className = `form-select`;
                for (let r of roles) {
                    // populate the dropdown element with In Progress, Completed, and Overdue
                    const option = document.createElement(`option`);
                    option.value = r;
                    option.textContent = r;

                    // this checks if task's currentStatus is the same as the role we're populating
                    // then we set the dropdown's attribute "selected" as that role
                    // that way, we can show what the current status is on the task when we eventually render the table
                    if (r == task[n]) {
                        option.selected = r;
                    }
                    drop.appendChild(option);
                }
                // we add a listener to these dropdown menus so we can update the task's currentStatus property
                // since we used a .forEach() we can keep track of which task in this dynamic list is being updated by passing in the index
                drop.addEventListener(`change`, (e) => {
                    list[index].currentStatus = e.target.value;
                })
                // attach the dropdown menu to the td element, then attach the td element to the table's row
                td.appendChild(drop);
                tr.appendChild(td);
            }
            // if n isn't currentStatus, we simply populate the text within the table data
            // to be whatever value the task's property is.
            // then attach the table data element to the table row
            else {
                td.textContent = task[n];
                tr.appendChild(td);
            }
        }
        // after iterating through a task object's properties, attach the row full of data to the table
        // then do it again for each task in the list
        taskTable.appendChild(tr);
    })
}

// when you begin typing the category filter, it'll call 
// a function to build a new task list that only carries the filtered list
fltCategory.addEventListener(`input`, (e) => {
    buildFilter();
})

// when you select a new item from the filter dropwdown menu, it'll call
// a function explained above
fltStatus.addEventListener(`change`, (e) => {
    buildFilter();
})

// a function to dual filter
let buildFilter = () => {
    filteredList = taskList.filter((n) => {
        // checks to see if the filtering dropdown menu is set to something like "In Progress"
        // then filter to only return whatever is in the category filter AND matches the dropdown
        if (fltStatus.value != ``) {
            return (n.category.toLowerCase().includes(fltCategory.value.toLowerCase()) && n.currentStatus.includes(fltStatus.value))
        }
        // else just return whatever is typed in the category filter. .includes() helps to return a category that's half-way typed
        // .toLowerCase() makes it so the category and whatever is typed isn't case sensitive
        return n.category.toLowerCase().includes(fltCategory.value.toLowerCase());
    })
    // then render the table but only using our filtered list
    renderTable(filteredList);
}

// when the page loads, render the table. This works to interact with local stoarge declared earlier
renderTable(taskList)