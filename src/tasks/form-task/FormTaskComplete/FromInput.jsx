import React from "react";

const FromInput = (props) => {
  return (
    <>
      <label htmlFor={props.input.name}>{props.label}</label>
      <props.element {...props.input}>{props.children}</props.element>
    </>
  );
};

export default FromInput;
