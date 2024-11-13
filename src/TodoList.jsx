//import * as React from 'react';

const todoList = [
    {id: 1, title: "Complete my next CTD assignments on time" }, {id : 2, title: "Schedule and Attend mentor sessions" }, 
    {id: 3, title: "Finish setting up the cloud for my capstone" }
  ];

function TodoList(){
    return (
        <ul>{todoList.map(function(todoList){
            return <li key = {todoList.title}>{todoList.title}</li>;
          })}
          </ul> 
    );
}

export default TodoList;