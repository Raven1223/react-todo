import React, { useState, useEffect, Fragment } from 'react'; // Import useState, useEffect, and Fragment
import TodoList from './TodoList';  // Import TodoList component
import AddTodoForm from './AddTodoForm';

function App() {
  // Create new state variable for todoList, initializing from localStorage
  const [todoList, setTodoList] = useState(() => {
  const savedTodoList = localStorage.getItem('savedTodoList');
  return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  new Promise((resolve, reject) => {
  setTimeout(() => {
  resolve();
  }, 2000);
  }).then(() => {
  setIsLoading(false); //set to false after 2 seconds
  });
  }, []);

  useEffect(() => {
  if (!isLoading) {
  localStorage.setItem('savedTodoList', JSON.stringify(todoList));  //save the todoList inside localStorage with the key "savedTodoList"
  }
  }, [todoList, isLoading]);

  function addTodo(newTodo) {
  setTodoList([...todoList, newTodo]);
  }

  // New removeTodo function
  function removeTodo(id) {
    // Remove the item with the given id from todoList
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    // Update the state with the new list
    setTodoList(newTodoList);
  }
  
  //replaced the outer <div> with fragment
  return (
  <Fragment> 
  <h1>Todo List</h1>
  <AddTodoForm onAddTodo={addTodo} />
  {isLoading ? (
  <p>Loading...</p>
  ) : (
  <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
  )}
  </Fragment>
  );
}

export default App;
