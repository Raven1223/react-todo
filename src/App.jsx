import * as React from 'react';
import TodoList from './TodoList';  // Import TodoList component
import AddTodoForm from './AddTodoForm';

function App(){
  // Create new state variable for newTodo
  //const [newTodo, setNewTodo] = React.useState('');
  function addTodo(newTodo){
    setTodoList(prevTodoList => [...prevTodoList, { id: prevTodoList.length + 1, title: newTodo }]);
  }
  // Create new state variable named todoList with setter setTodoList and default value of an empty Array
  const [todoList, setTodoList] = React.useState([]);

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      <p>{newTodo}</p>
      {/* Pass todoList state as a prop named todoList to the TodoList component */}
      
      <TodoList todoList={todoList}/> 
    </div>
  );
}

export default App;
