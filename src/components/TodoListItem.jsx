import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types'; 

function TodoListItem({ todo, onRemoveTodo, onToggleComplete }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <li className={style.ListItem}>
      <input
        type="checkbox"
        id={`todo-checkbox-${todo.id}`} //unique id for each checkbox
        name={`todo-checkbox-${todo.id}`} //unique name for each checkbox
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </span>
      <span> (Created: {formatDate(todo.createdTime)})</span>
      {todo.completed && <span> (Completed: {formatDate(todo.completedTime)})</span>}
      <button 
        type="button"  
        onClick={() => onRemoveTodo(todo.id)} // Add onClick handler to call onRemoveTodo with todo.id
      > 
        Remove 
      </button>
    </li>
  );
}

TodoListItem.propTypes = { //Added the propTypes property to the TodoListItem function after its definition
  onRemoveTodo: PropTypes.func, //defined a property with key onRemoveTodo and value PropTypes.func  
  onToggleComplete: PropTypes.func,
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
    createdTime: PropTypes.string,
    completedTime: PropTypes.string
  })
};

export default TodoListItem;
