import * as React from 'react';
import TodoListItem from './TodoListItem'; // Import TodoListItem component

function TodoList({ todoList, onRemoveTodo }) { // Add props as a parameter to the TodoList functional component
  return (
    <ul>
      {todoList.map(function(todo) {
        return (
          <TodoListItem key={todo.id}  // Pass key as todo.id
            todo={todo} // Pass todo as a prop
            onRemoveTodo={onRemoveTodo} // Pass onRemoveTodo as a prop
          />
        )
      })}
    </ul> 
  );
}

export default TodoList;
