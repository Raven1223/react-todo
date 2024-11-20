function AddTodoForm(props){
    function handleAddTodo(event){
        event.preventDefault();

        // Retrieve the value of the 'title' input field from the event target
    const todoTitle = event.target.title.value;

        // Log the value of todoTitle to the console
    console.log(todoTitle);

    // Invoke the onAddTodo callback prop and pass todoTitle as an argument
    props.onAddTodo(todoTitle);

    // reset the form
    event.target.reset();
    }
    return (
         //Add name attribute with value
// Pass handleAddTodo function by reference 
<form onSubmit={handleAddTodo}> 
    <input id = "todoTitle" name= "title"/> 
    <label htmlFor= "todoTitle">Title</label>
    <button type ="Submit">Add</button>
</form>
    );
}
export default AddTodoForm;