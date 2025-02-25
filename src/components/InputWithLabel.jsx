import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes from the "prop-types" package

const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  // Create a ref to store a reference to the input DOM element
  const inputRef = useRef();

  // Use useEffect to focus the input after component mounts or updates
  useEffect(() => {
    // Focus the input element
    inputRef.current.focus();
  }, []); // Empty dependency array means this effect runs only once after initial render

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

InputWithLabel.propTypes = { //Added the propTypes property to the InputWithLabel function after its definition
handleTitleChange: PropTypes.func, //defined a property with key handleTitleChange and value PropTypes.func
todoTitle: PropTypes.string,
children: PropTypes.node
};

export default InputWithLabel;
