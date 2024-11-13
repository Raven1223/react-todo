import * as React from 'react';
import TodoList from './TodoList';  // Import TodoList component
import AddTodoForm from './AddTodoForm';

function App(){
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm/>
    </div>
  );
}
export default App;