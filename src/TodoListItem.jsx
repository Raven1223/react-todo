

function TodoListItem(props){
    return (
        <li>{props.todoList.title}</li> //Access todo object from props
    );
}
export default TodoListItem;