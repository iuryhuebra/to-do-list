function dateValidator(element) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    if (!dateRegex.test(element.value) && element.value !== '') {
        alert("Formato inválido!");
        element.value = '';
    }
}

function taskCreate(tittle='', endDate='', status = false) {
    const newTaskNumber = taskCount();
    const taskArea = document.createElement('div');
    taskArea.classList.add('task');
    taskArea.id = 'taskArea' + newTaskNumber;
    document.getElementById('taskGroup').appendChild(taskArea)
    
    const taskCheckbox = document.createElement('input');
    taskCheckbox.classList.add('task-checkbox');
    taskCheckbox.id = 'taskCheckbox' + newTaskNumber;
    taskCheckbox.setAttribute('type', 'checkbox');
    taskCheckbox.checked = status;
    taskCheckbox.onchange = () => taskSave();
    taskArea.appendChild(taskCheckbox);
    
    const customCheckbox = document.createElement('label');
    customCheckbox.classList.add('custom-checkbox');
    customCheckbox.setAttribute('for', 'taskCheckbox' + newTaskNumber);
    taskArea.appendChild(customCheckbox);
    
    const taskName = document.createElement('textarea');
    taskName.classList.add('task-name');
    taskName.id = 'taskName' + newTaskNumber;
    taskName.setAttribute('rows', '1');
    taskName.oninput = () => taskNameRowsRegulator(taskName);
    taskName.onblur = () => {
        if (taskName.value === '') {
            taskName.parentElement.remove();
        } else {            
            taskSave();
        }
    };
    taskName.value = tittle;
    taskName.setAttribute("spellcheck", "false");
    taskArea.appendChild(taskName);

    const removeTask = document.createElement('button');
    removeTask.id = 'removeTask';
    removeTask.setAttribute('type', 'button');
    removeTask.textContent = 'X';
    removeTask.onclick = () => taskRemove(removeTask)
    taskArea.appendChild(removeTask);
    
    const dateArea = document.createElement('div');
    dateArea.classList.add('date-info');
    taskArea.appendChild(dateArea);
    
    const endDateLabel = document.createElement('label');
    endDateLabel.setAttribute('for', 'endDate' + newTaskNumber);
    endDateLabel.classList.add('end-date-label');
    const calendarIcon = document.createElement('img');
    calendarIcon.classList.add('end-date-icon');
    calendarIcon.src = './img/calendar.png';
    endDateLabel.appendChild(calendarIcon);
    dateArea.appendChild(endDateLabel);
    const endDateInput = document.createElement('input');
    endDateInput.classList.add('date-input');
    endDateInput.id = 'endDate' + newTaskNumber;
    endDateInput.setAttribute('type', 'text');
    endDateInput.setAttribute('placeholder', 'dd/mm/yyyy');
    endDateInput.onchange = () => dateValidator(endDateInput);
    endDateInput.onblur = () => taskSave();
    endDateInput.value = endDate;
    endDateInput.autocomplete = 'off';
    dateArea.appendChild(endDateInput);
    
    taskArea.appendChild(document.createElement('hr'));
    return taskName;
}

function taskSave() {
    let currentTask = 0;
    const taskLists = { list1: [] };
    document.querySelectorAll('.task-name').forEach((element) => {
        const tittle = element.value;
        const endDate = document.getElementById('endDate' + currentTask).value;
        const status = document.getElementById('taskCheckbox' + currentTask).checked;
        const task = {
            tittle: tittle,
            endDate: endDate,
            status: status
        };
        taskLists.list1.push(task);
        currentTask++;
    });
    localStorage.setItem('lists', JSON.stringify(taskLists));
    return storage;
}

function taskNameRowsRegulator(element) {
    element.style.height = 'auto';
    const newHeight = element.scrollHeight;
    element.style.height = newHeight + 'px';   
}

function taskRemove(element) {
    if (element.value === '') {
        element.parentElement.remove();
    } 
}

function taskCount() {
    let count = 0;
    document.querySelectorAll('.task-name').forEach(() => count++);
    return count;
}

document.getElementById('newTask').onclick = () => {
    const task = taskCreate();
    task.focus();
}

document.getElementById('save').onclick = () => {
    taskSave();
}

const storage = JSON.parse(localStorage.getItem('lists'));
console.log(storage);

storage.list1.forEach((task) => {
    taskCreate(task.tittle,
        task.endDate,
        task.status);
});