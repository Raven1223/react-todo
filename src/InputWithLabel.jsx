import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  // Create a ref to store a reference to the input DOM element
  const inputRef = useRef();

  // Use useEffect to focus the input after component mounts or updates
  useEffect(() => {
    // Focus the input element
    inputRef.current.focus();
  }); // No dependency array means this effect runs after every render

  return (
  <React.Fragment>
  <label htmlFor="todoTitle">{children}</label>
  <input 
  ref={inputRef} // Attach the ref to the input element
  id="todoTitle" 
  name="title"
  value={todoTitle}
  onChange={handleTitleChange}
  />
  </React.Fragment>
  );
};

export default InputWithLabel;
