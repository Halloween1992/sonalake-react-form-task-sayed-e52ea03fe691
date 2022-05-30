import React from "react";

const UserItme = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.lastName}</td>
      <td>{props.dob}</td>
      <td>{props.userType}</td>
      <td>{props.inActivity}</td>
    </tr>
  );
};

export default UserItme;
