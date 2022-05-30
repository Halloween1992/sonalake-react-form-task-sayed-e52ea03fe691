import React, { useState } from "react";

export const userContext = React.createContext({
  newUserAdded: false,
  addUser() {},
});

const ContextProvider = (props) => {
  const [newUserAdded, setNewUserAdded] = useState(false);

  const addUser = (e) => {
    setNewUserAdded(e);
  };

  const initValue = {
    newUserAdded,
    addUser,
  };

  return (
    <userContext.Provider value={initValue}>
      {props.children}
    </userContext.Provider>
  );
};

export default ContextProvider;
