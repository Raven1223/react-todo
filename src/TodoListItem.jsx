function TodoListItem({ todo }) { // Destructure the todo prop directly
    return (
    <li>{todo.title}</li> // Access the title property directly from the todo object
    );
    }
    
    export default TodoListItem;
    