function TodoListItem({ todo, onRemoveTodo }) { // Destructure the todo and onRemoveTodo props directly
return (
<li>
{todo.title}
<button type="button"  onClick={() => onRemoveTodo(todo.id)} // Add onClick handler to call onRemoveTodo with todo.id
> Remove </button>    </li>
);
}
  
  export default TodoListItem;
  