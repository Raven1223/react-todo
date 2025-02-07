import style from './TodoListItem.module.css';
import PropTypes from 'prop-types'; // Import PropTypes from the "prop-types" package

function TodoListItem({ todo, onRemoveTodo }) { // Destructure the todo and onRemoveTodo props directly
return (
<li className={style.ListItem}>
{todo.title}
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
todo: PropTypes.arrayOf(PropTypes.shape(
{id: PropTypes.string,
title: PropTypes.string}    
))   
};
  
export default TodoListItem;
