const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

function dateValidator(element) {
    if (!dateRegex.test(element.value) && element.value !== '') {
        alert("Formato inválido!");
        element.value = '';
    }
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

function tasksCount() {
    let count = 0;
    document.querySelectorAll('.task-name').forEach(() => count++);
    return count;
}

document.getElementById('newTask').onclick = () => {
    const newTaskNumber = tasksCount();
    const taskArea = document.createElement('div');
    taskArea.classList.add('task');
    taskArea.id = 'taskArea' + newTaskNumber;
    document.getElementById('taskGroup').appendChild(taskArea)
    
    const taskCheckbox = document.createElement('input');
    taskCheckbox.classList.add('task-checkbox');
    taskCheckbox.id = 'taskCheckboa' + newTaskNumber;
    taskCheckbox.setAttribute('type', 'checkbox');
    taskArea.appendChild(taskCheckbox);
    
    const customCheckbox = document.createElement('label');
    customCheckbox.classList.add('custom-checkbox');
    customCheckbox.setAttribute('for', 'taskCheckboa' + newTaskNumber);
    taskArea.appendChild(customCheckbox);
    
    const taskName = document.createElement('textarea');
    taskName.classList.add('task-name');
    taskName.id = 'taskNama' + newTaskNumber;
    taskName.setAttribute('rows', '1');
    taskName.oninput = () => taskNameRowsRegulator(taskName);
    taskName.onblur = () => taskRemove(taskName);
    taskArea.appendChild(taskName);
    
    const dateArea = document.createElement('div');
    dateArea.classList.add('date-info');
    taskArea.appendChild(dateArea);
    
    const startDateLabel = document.createElement('label');
    startDateLabel.setAttribute('for', 'startData' + newTaskNumber);
    startDateLabel.textContent = 'Start';
    dateArea.appendChild(startDateLabel);
    const startDateInput = document.createElement('input');
    startDateInput.classList.add('date-input');
    startDateInput.id = 'startData' + newTaskNumber;
    startDateInput.setAttribute('type', 'text');
    startDateInput.setAttribute('placeholder', 'dd/mm/yyyy');
    startDateInput.onchange = () => dateValidator(startDateInput);
    dateArea.appendChild(startDateInput);
    
    const endDateLabel = document.createElement('label');
    endDateLabel.setAttribute('for', 'endData' + newTaskNumber);
    endDateLabel.textContent = 'End';
    dateArea.appendChild(endDateLabel);
    const endDateInput = document.createElement('input');
    endDateInput.classList.add('date-input');
    endDateInput.id = 'endData' + newTaskNumber;
    endDateInput.setAttribute('type', 'text');
    endDateInput.setAttribute('placeholder', 'dd/mm/yyyy');
    endDateInput.onchange = () => dateValidator(endDateInput);
    dateArea.appendChild(endDateInput);
    
    taskArea.appendChild(document.createElement('hr'));
    taskName.focus();
}
 
