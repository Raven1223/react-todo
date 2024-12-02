

function AddTodoForm({onAddTodo}){  // Destructure onAddTodo directly from props
    
    const [todoTitle, setTodoTitle] = React.useState(''); // Create new state variable named todoTitle with setter setTodoTitle

    function handleTitleChange(event){
        // Retrieve the input value from the event object and store in variable named newTodoTitle
        const newTodoTitle = event.target.value;

        // Call the state setter setTodoTitle and pass newTodoTitle
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event){
        event.preventDefault();

        // Retrieve the value of the 'title' input field from the event target
    //const todoTitle = event.target.title.value;

        // Log the value of todoTitle to the console
    console.log(todoTitle);

    // Invoke the onAddTodo callback prop and pass todoTitle as an argument
    props.onAddTodo({titel: todoTitle, id: Date.now()});

    // Reset the todoTitle state to an empty String 
    setTodoTitle('');
    }
    return (
         //Add name attribute with value
// Pass handleAddTodo function by reference 
<form onSubmit={handleAddTodo}> 
    {/*Add value prop equal to todoTitle from component props, Add onChange prop equal to handleTitleChange function reference (we will declare this function in the next step)*/}
    <input id = "todoTitle" name= "title" value = {todoTitle} onChange = {handleTitleChange}/> 
    <label htmlFor= "todoTitle">Title</label>
    <button type ="Submit">Add</button>
</form>
    );
}
export default AddTodoForm;