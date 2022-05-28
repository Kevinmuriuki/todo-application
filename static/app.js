const form = document.getElementById('form');
const description = document.getElementById('description');
const todos = document.getElementById('todos')
const errMessage = document.getElementById('error')

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