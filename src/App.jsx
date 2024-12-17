import React, { useState } from 'react';
import TodoList from './TodoList';  // Import TodoList component
import AddTodoForm from './AddTodoForm';

function App() {
  // Create new state variable for todoList
  const [todoList, setTodoList] = React.useState([]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }
  
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
