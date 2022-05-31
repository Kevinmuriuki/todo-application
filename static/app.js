const form = document.getElementById('form');
const description = document.getElementById('description');
const todos = document.getElementById('todos')
const errMessage = document.getElementById('error')
const checkBoxes = document.querySelectorAll('.check-completed');

console.log('todos', todos.innerText)

checkBoxes.forEach((checkBox) => {
    checkBox.onchange = (e) => {
        const newCompleted = e.target.checked;
        const todoId = e.target.dataset['id'];

        fetch(`/todos/${todoId}/set-completed`, {
            method: 'POST',
            body: JSON.stringify({
                'completed': newCompleted
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            errMessage.className = 'hidden';
        })
        .catch(() => {
            errMessage.className = '';
        })
    }
})

form.onsubmit = e => {
    e.preventDefault();

    fetch('/todos/create', {
        method: 'POST',
        body: JSON.stringify({
            'description': description.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {return res.json()})
    .then(jsonResponse => {
        const liItem = document.createElement('LI');
        liItem.innerHTML = jsonResponse['description'];
        todos.appendChild(liItem);
        errMessage.className = 'hidden';
    })
    .catch(() => {
        errMessage.className = '';
    })
}