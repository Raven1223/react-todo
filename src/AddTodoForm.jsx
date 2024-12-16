import * as React from 'react';

function AddTodoForm({ onAddTodo }) { // Destructure onAddTodo directly from props
const [todoTitle, setTodoTitle] = React.useState(''); // Create new state variable named todoTitle with setter setTodoTitle

function handleTitleChange(event) {
     // Retrieve the input value from the event object and store in variable named newTodoTitle
const newTodoTitle = event.target.value;
// Call the state setter setTodoTitle and pass newTodoTitle
setTodoTitle(newTodoTitle);
}

function handleAddTodo(event) {
event.preventDefault();
 // Retrieve the value of the 'title' input field from the event target
    //const todoTitle = event.target.title.value;
const newTodo = {
title: todoTitle,
id: Date.now()
};

console.log(newTodo);

 // Invoke the onAddTodo callback prop and pass the newTodo object as an argument
onAddTodo(newTodo);

// Reset the todoTitle state to an empty string
setTodoTitle('');
}

return (
<form onSubmit={handleAddTodo}> 
<input 
id="todoTitle" 
name="title"
value={todoTitle}
onChange={handleTitleChange}
/> 
<label htmlFor="todoTitle">Title</label>
<button type="submit">Add</button>
</form>
);
}

export default AddTodoForm;
