import React, { useState, useEffect, Fragment } from 'react'; // Import useState, useEffect, and Fragment
import TodoList from './TodoList';  // Import TodoList component
import AddTodoForm from './AddTodoForm';

// Custom hook for semi-persistent state
function useSemiPersistentState() {
  // Create new state variable for todoList, initializing from localStorage
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem('savedTodoList');
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));  //save the todoList inside localStorage with the key "savedTodoList"
  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

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
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </Fragment>
  );
}

export default App;
