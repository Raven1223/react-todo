import React, { useState, useEffect, Fragment } from 'react'; // Import useState, useEffect, and Fragment
import TodoList from './TodoList';  // Import TodoList component
import AddTodoForm from './AddTodoForm';
//const apiKey = import.meta.env.VITE_API_KEY; //import API key from environment file
//const apiUrl = import.meta.env.VITE_API_URL; //import API URL from env file


function App() {
  // Create new state variable for todoList, initializing from localStorage
  const [todoList, setTodoList] = useState(() => {
  const savedTodoList = localStorage.getItem('savedTodoList');
  return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  const [isLoading, setIsLoading] = useState(true);
  
  async function fetchData() {
    const options = {};
    options.method = 'GET';
    options.headers = { Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}` };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`; //URL for Airtable
    
    try {
    const response = await fetch(url, options);
    if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    const todos = data.records.map((record) => ({
    title: record.fields.title,
    id: record.id
    }));
    setTodoList(todos);
    setIsLoading(false);
    } catch (error) {
    console.log(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  new Promise((resolve, reject) => {
  setTimeout(() => {
  resolve();
  }, 2000);
  }).then(() => {
  setIsLoading(false); //set to false after 2 seconds
  });
  }, []);

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
      const createdTodo = { id: data.id, title: data.fields.title };
      // Update the local state with the new todo
      setTodoList((prevTodoList) => [...prevTodoList, createdTodo]);
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
  
  //replaced the outer <div> with fragment
  return (
  <Fragment> 
  <h1>Todo List</h1>
  <AddTodoForm onAddTodo={addTodo} />
  {isLoading ? (
  <p>Loading...</p>
  ) : (
  <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
  )}
  </Fragment>
  );
}

export default App;
