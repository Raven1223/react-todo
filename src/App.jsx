import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route from react-router-dom
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import axios from 'axios'; //from Textbook, not being used currently 
import PropTypes from 'prop-types'; // Import PropTypes from the "prop-types" package
//const apiKey = import.meta.env.VITE_API_KEY; //import API key from environment file
//const apiUrl = import.meta.env.VITE_API_URL; //import API URL from env file

function App() {
  // Create new state variable for todoList, initializing from localStorage
const [todoList, setTodoList] = useState(() => {
const savedTodoList = localStorage.getItem('savedTodoList');
return savedTodoList ? JSON.parse(savedTodoList) : [];
});
const [isLoading, setIsLoading] = useState(true);
const [sortOrder, setSortOrder] = useState('asc'); // New state variable for sort order

// Function to toggle sort order, makes sure browser order changes when order is changed without the need to refresh the page
const toggleSortOrder = () => {
  setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
};

// Function to sort todos, sorts the list items based on time they were added
const sortTodos = (todos) => {
  return todos.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.createdTime.localeCompare(b.createdTime);
    } else {
      return b.createdTime.localeCompare(a.createdTime);
    }
  });
};

// Function to fetch todo data from Airtable API
async function fetchData() {
const options = {};
options.method = 'GET';
options.headers = { Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}` }; //API token for Airtable
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=createdTime&sort[0][direction]=${sortOrder}`; //URL for Airtable with view parameter and sorting by createdTime
    
try {
const response = await fetch(url, options);
if (!response.ok) {
throw new Error(`Error: ${response.status}`);
}

const data = await response.json();
// Transform Airtable records into todo objects
const todos = data.records.map((record) => ({
title: record.fields.title,
id: record.id.toString(), // Convert id to string
createdTime: record.createdTime
}));
setTodoList(sortTodos(todos));
setIsLoading(false);
} catch (error) {
console.log(error.message);
}
}

// Effect hook to fetch data on component mount and when sort order changes
useEffect(() => {
fetchData();
}, [sortOrder]);

// Effect hook to simulate loading delay
useEffect(() => {
new Promise((resolve, reject) => {
setTimeout(() => {
resolve();
}, 2000);
}).then(() => {
setIsLoading(false); //set to false after 2 seconds
});
}, []);

// Effect hook to save todoList to localStorage when it changes
useEffect(() => {
if (!isLoading) {
localStorage.setItem('savedTodoList', JSON.stringify(todoList));  //save the todoList inside localStorage with the key "savedTodoList"
}
}, [todoList, isLoading]);

  // Updated addTodo function with POST feature to Airtable API
  async function addTodo(newTodo) {
    // Prepare data for Airtable API
    const airtableData = {
      fields: {
        title: newTodo.title
      }
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`  //API token for Airtable
      },
      body: JSON.stringify(airtableData)
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`; //Table base ID and Name

    try {
      // Send POST request to Airtable API
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      // Parse the response from Airtable
      const data = await response.json();
      // Create a new todo object with the response data
      const createdTodo = { id: data.id.toString(), title: data.fields.title, createdTime: data.createdTime };
      // Update the local state with the new todo and sort
      setTodoList((prevTodoList) => sortTodos([...prevTodoList, createdTodo]));
    } catch (error) {
      console.log(error.message);
    }
  }

  // New removeTodo function
  function removeTodo(id) {
    // Remove the item with the given id from todoList
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    // Update the state with the new list
    setTodoList(newTodoList);
  }
  
  // Render the app with React Router setup
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={ // Home route
    <Fragment>
    <h1>Todo List</h1>    
    <AddTodoForm onAddTodo={addTodo} />  
    <button onClick={toggleSortOrder}>Toggle Sort Order ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})</button>
    {isLoading ? (
    <p>Loading...</p> // Display loading message while fetching data
    ) : (
    <TodoList todoList={todoList} onRemoveTodo={removeTodo}/> // Display list of todos
    )}
    </Fragment>
    } />
    <Route path="/new" element={ //Route path for New Todo List
    <h1>New Todo List</h1> //New Todo List heading tested at http://localhost:5173/new
    } />
    </Routes>
    </BrowserRouter>
    );
  
}

export default App
