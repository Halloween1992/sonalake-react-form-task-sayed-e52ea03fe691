import React, { useContext, useEffect, useState } from "react";
import UserItme from "./UserItme";
import { userContext } from "./user-context";
import "./UserItem.module.css";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUserAdded, setNewUserAdded] = useState(false);

  const userCtx = useContext(userContext);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(
          "https://react-http-d79c3-default-rtdb.firebaseio.com/users.json"
        );

        if (!response.status === "ok") throw new Error("something wend wrong");

        const data = await response.json();
        // console.log(data);
        const loadedData = [];
        for (const key in data) {
          loadedData.push({
            id: key,
            name: data[key].name,
            lastName: data[key].lastName,
            dateOfBirth: data[key].dateOfBirth,
            userType: data[key].userType,
            inactivityDate: data[key].inactivityDate,
          });
        }
        setUsers(loadedData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();

    setNewUserAdded(userCtx.newUserAdded);
  }, [userCtx.newUserAdded, newUserAdded]);

  const uersList = users.map((user) => (
    <UserItme
      key={user.id}
      id={user.id}
      name={user.name}
      lastName={user.lastName}
      dob={user.dateOfBirth}
      userType={user.userType}
      inActivity={user.inactivityDate}
    />
  ));

  return (
    <>
      <div>
        <h1>Users List</h1>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of birth</th>
              <th>User Type</th>
              <th>Inactivity Date</th>
            </tr>
          </thead>
          <tbody>{uersList}</tbody>
        </table>
      </div>
    </>
  );
};

export default GetAllUsers;
