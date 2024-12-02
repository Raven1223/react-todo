

function TodoListItem({todo}){  // Destructure the todo prop directly
    return (
        <li>{todoList.title}</li> // Access the title property directly from the todo object
    );
}
export default TodoListItem;