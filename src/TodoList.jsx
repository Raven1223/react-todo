import * as React from 'react';
import TodoListItem from './TodoListItem'; // Import TodoListItem component


const todoList = [
    {id: 1, title: "Complete my next CTD assignments on time" }, {id : 2, title: "Schedule and Attend mentor sessions" }, 
    {id: 3, title: "Finish setting up the cloud for my capstone" }
  ];

function TodoList(){
    return (
        <ul>{todoList.map(function(todoList){
            return (
              <TodoListItem 
            key={todo.id}  // Pass key as todo.id
            todo={todo}     // Pass todo as a prop
          />
            )
          })}
          </ul> 
    );
}

export default TodoList;