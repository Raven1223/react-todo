import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
function App() {
  // Create new state variable for todoList, initializing from localStorage
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem('savedTodoList');
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('Title');
  const [tableName] = useState(import.meta.env.VITE_TABLE_NAME); 

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  }, []);

  const toggleSortField = useCallback(() => {
    setSortField(prevField => prevField === 'Title' ? 'createdTime' : 'Title');
  }, []);

  const sortTodos = useCallback((todos) => {
    return todos.sort((a, b) => {
      const fieldA = sortField === 'Title' ? a.title : a.createdTime;
      const fieldB = sortField === 'Title' ? b.title : b.createdTime;
      if (sortOrder === 'asc') {
        return fieldA.localeCompare(fieldB);
      } else {
        return fieldB.localeCompare(fieldA);
      }
    });
  }, [sortField, sortOrder]);
  
  // Function to fetch todo data from Airtable API
  const fetchData = useCallback(async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };        
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=${sortField}&sort[0][direction]=${sortOrder}`; //URL for Airtable with view parameter and sorting
    
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
        createdTime: record.createdTime,
        completed: record.fields.completed || false
      }));
      setTodoList(sortTodos(todos));
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [sortField, sortOrder, sortTodos, tableName]); 

  // Effect hook to fetch data on component mount and when sort order changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Effect hook to simulate loading delay
  useEffect(() => {
    new Promise((resolve) => {
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

  // Effect hook to re-sort todoList when sortOrder or sortField changes
  useEffect(() => {
    setTodoList(prevTodoList => sortTodos([...prevTodoList]));
  }, [sortOrder, sortField, sortTodos]);

  //Effect hook to re-sort new todo list page
  // Effect hook to re-sort newTodoList when sortOrder or sortField changes
  useEffect(() => {
    setNewTodoList(prevNewTodoList => sortTodos([...prevNewTodoList]));
  }, [sortOrder, sortField, sortTodos]);

  async function addTodo(newTodo) {
    const tempId = Date.now().toString();
    const todoToAdd = {
      id: tempId,
      title: newTodo.title,
      createdTime: new Date().toISOString(),
      completed: false
    };

    // Update state immediately
    setTodoList(prevTodoList => sortTodos([...prevTodoList, todoToAdd]));

    // Then sync with Airtable
    const createdTodo = { 
      fields: {
        title: newTodo.title,
        completed: false
      }
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      },
      body: JSON.stringify(createdTodo)
    };

    try {
      const response = await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}`, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // Update the todo with the actual Airtable ID
      setTodoList(prevTodoList => prevTodoList.map(todo => 
        todo.id === tempId ? {...todo, id: data.id} : todo
      ));
    } catch (error) {
      console.log(error.message);
      // If there's an error, we'll keep the todo in the list but mark it as unsaved
      setTodoList(prevTodoList => prevTodoList.map(todo => 
        todo.id === tempId ? {...todo, unsaved: true} : todo
      ));
    }
  }
  function toggleTodoComplete(id) {
    setTodoList(prevTodoList => {
      return prevTodoList.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed, completedTime: !todo.completed ? new Date().toISOString() : null } : todo
      );
    });
  }
  async function removeTodo(id) {
    // Remove from state immediately
    setTodoList(prevTodoList => {
      const newTodoList = prevTodoList.filter((todo) => todo.id !== id);
      return sortTodos(newTodoList);
    });

    // Then sync with Airtable
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };

    try {
      const response = await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}/${id}`, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
      // If there's an error, add the todo back to the list
      fetchData(); // Re-fetch the data from Airtable to ensure consistency
    }
  }
  //New todo list
  const [newTodoList, setNewTodoList] = useState([]);

  //function to add new todos to a new list
  function addNewTodo(newTodo) {
    const createdTodo = { 
      id: Date.now().toString(), 
      title: newTodo.title, 
      createdTime: new Date().toISOString(), 
      completedTime: null,
      completed: false
    };
    setNewTodoList(prevTodoList => sortTodos([...prevTodoList, createdTodo]));
  }
  function toggleNewTodoComplete(id) {
    setNewTodoList(prevTodoList => {
      const updatedList = prevTodoList.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed, completedTime: !todo.completed ? new Date().toISOString() : null } : todo
      );
      return sortTodos(updatedList);
    });
  }
  function removeNewTodo(id) {
    setNewTodoList(prevTodoList => {
      const updatedList = prevTodoList.filter((todo) => todo.id !== id);
      return sortTodos(updatedList);
    });
  }
  // Render the app with React Router setup
  return (
    <BrowserRouter>
      {/* Added Navigation Menu */}
      <nav>
        <ul style={{ listStyleType: 'none', padding: '0' }}> {/* Removed bullet points */}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/todos">Todo List</Link></li>
          <li><Link to="/new">New Todo List</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={ // Home route
          <Fragment>
            <h1>Welcome to the Todo App</h1>
            <p>Navigate to the Todo List to manage your tasks.</p>
          </Fragment>
        } />
        <Route path="/todos" element={ // Todo List route
          <Fragment>
            <h1>{tableName}</h1>    
            <AddTodoForm onAddTodo={addTodo} />
            <button onClick={toggleSortOrder}>
              Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            </button>
            <button onClick={toggleSortField}>
              Sort by {sortField === 'Title' ? 'Date Created' : 'Title'}
            </button>
            {isLoading ? (
              <p>Loading...</p> 
            ) : (
              <TodoList todoList={todoList} onRemoveTodo={removeTodo} onToggleComplete={toggleTodoComplete}/> // Display list of todos
            )}
          </Fragment>
        } />
        <Route path="/new" element={
          <Fragment>
            <h1>New Todo List</h1>
            <AddTodoForm onAddTodo={addNewTodo} />
            <button onClick={toggleSortOrder}>
              Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            </button>
            <button onClick={toggleSortField}>
              Sort by {sortField === 'Title' ? 'Date Created' : 'Title'}
            </button>
            <TodoList 
              todoList={newTodoList} 
              onRemoveTodo={removeNewTodo} 
              onToggleComplete={toggleNewTodoComplete}
            />
          </Fragment>
        } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
