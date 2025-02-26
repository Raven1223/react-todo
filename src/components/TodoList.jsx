import * as React from 'react';
import TodoListItem from './TodoListItem'; // Import TodoListItem component
import PropTypes from 'prop-types'; // Import PropTypes from the "prop-types" package

function TodoList({ todoList, onRemoveTodo, onToggleComplete }) { 
return (
<ul>
{todoList.map(function(todo) {
return (
<TodoListItem key={todo.id}  // Pass key as todo.id
todo={todo} // Pass todo as a prop
onRemoveTodo={onRemoveTodo} // Pass onRemoveTodo as a prop
onToggleComplete={onToggleComplete}
/>
)
})}
</ul> 
);
}

TodoList.propTypes = {
    onRemoveTodo: PropTypes.func,
    onToggleComplete: PropTypes.func,
    todoList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      completed: PropTypes.bool  
    }))
  };
  
export default TodoList;
