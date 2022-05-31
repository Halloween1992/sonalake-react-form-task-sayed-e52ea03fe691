import React from "react";
import FormTaskComplete from "./FormTaskComplete/FormTaskComplete.js";
import GetAllUsers from "./FormTaskComplete/GetAllUsers.jsx";

export const FormTask = (props) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "calc(50% - 1px)",

            padding: 10,
          }}
        >
          <FormTaskComplete />
        </div>
        <div style={{ width: "50%", padding: 10 }}>
          {/* <img src={img} alt="" style={{ maxWidth: "100%" }} /> */}
          <GetAllUsers />
        </div>
      </div>
      <div>
        <h3> Validation React form </h3>
        <ul>
          <li>First Name and Last Name are mandatory fields. </li>
          <li>
            User Inactivity Date is mandatory ONLY if the User Type is set to
            "Inactive".{" "}
          </li>
          <li>
            {" "}
            User Inactivity Date value have the format YYYY-MM-DD (This format
            should also be configurable).
          </li>
          <li>
            User Inactivity Date is only valid if it contains a date that is in
            the past. Validation messages appear if a field is invalid and was
            touched.
          </li>
          <li>
            The prject has writen test in it using Jest and React testing
            library.
          </li>
        </ul>
      </div>
    </div>
  );
};
