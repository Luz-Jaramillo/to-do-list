
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const form = document.querySelector('.input');
    const addTaskButton = document.getElementById('add-new');
    const taskList = document.getElementById('taskList');
    const emptyImage = document.querySelector('.empty-image');
    const todosContainer = document.querySelector('.todo-con');

    const toggleEmptyState = () => {
        if(!emptyImage) return;
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    }

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        // .trim will remuve any start or end whitespace
        if(!taskText) {
            return;
        }
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox"></input>
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class='delete-button'>
            <i class="fa-solid fa-trash"></i>
            </button>
        </div>`;

        const checkbox = li.querySelector('.checkbox');
       

        li.querySelector('.delete-button').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
    }
    // handle form submit (button click or Enter)
    if(form) form.addEventListener('submit', addTask);
    else if(addTaskButton) addTaskButton.addEventListener('click', addTask);

    // event delegation for delete/edit/checkbox inside the list
    taskList.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-button');
        if(deleteBtn){
            const li = deleteBtn.closest('li');
            if(li){ li.remove(); toggleEmptyState(); }
            return;
        }
    });

    toggleEmptyState();
});