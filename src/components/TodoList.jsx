import * as React from 'react';
import TodoListItem from './TodoListItem'; // Import TodoListItem component
import PropTypes from 'prop-types'; // Import PropTypes from the "prop-types" package

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

TodoList.propTypes = { //Added the propTypes property to the TodoList function after its definition
onRemoveTodo: PropTypes.func, //defined a property with key onRemoveTodo and value PropTypes.func
todoList: PropTypes.arrayOf(PropTypes.shape( //todoList has an Id that is a string and a title that is also a string
{id: PropTypes.string,
title: PropTypes.string}    
))   
};

export default TodoList;
