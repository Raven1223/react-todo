import * as React from 'react';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
  // State to manage the todo title input
  const [todoTitle, setTodoTitle] = React.useState('');

  // Handler for input changes
  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  // Handler for form submission
  function handleAddTodo(event) {
    event.preventDefault();
    // Create a new todo object
    const newTodo = {
      title: todoTitle,
      id: Date.now()
    };

    console.log(newTodo);
    // Call the onAddTodo function passed as a prop
    onAddTodo(newTodo);
    // Reset the input field
    setTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo}> 
      {/* InputWithLabel component with children prop for label text */}
      <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
        Title
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
