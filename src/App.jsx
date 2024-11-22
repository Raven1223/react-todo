import * as React from 'react';
import TodoList from './TodoList';  // Import TodoList component
import AddTodoForm from './AddTodoForm';

function App(){
  // Create new state variable for newTodo
  const [newTodo, setNewTodo] = React.useState('');
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={setNewTodo}/>
      <p>{newTodo}</p>
      <TodoList/>
    </div>
  );
}
export default App;