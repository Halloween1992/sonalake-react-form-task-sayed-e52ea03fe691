import React, { useState, useContext } from "react";

import SaveUserForm from "./Form-api";
import FromInput from "./FromInput";
import classes from "./From.module.css";
import useInput from "./use-input";
import { userContext } from "./user-context";
import Card from "../UI/Card";

const FormTaskComplete = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [fromHasError, setFromHasError] = useState(false);
  const [isSending, setIsSending] = useState(false);

 
  const userCtx = useContext(userContext);

  //using custom hooks for inputs
  const {
    value: enteredName,
    isValueInvalid: isEnterNameInvalid,
    hasError: nameInputHasErr,
    isTouched: isNameInputTouched,
    onChange: onNameChangeHandler,
    onBlur: onNameInputeBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() === "");

  const {
    value: enteredLastName,
    isValueInvalid: isEnterLastNameInvalid,
    hasError: lastNameInputHasErr,
    isTouched: isLastNameInputTouched,
    onChange: onLastNameChangeHandler,
    onBlur: onLastNameInputeBlurHandler,
    reset: restLastName,
  } = useInput((value) => value.trim() === "");

  let { value: enteredBirthDay, onChange: onBirthDayChangeHandler } = useInput(
    (value) => null
  );

  const {
    selectValue: enteredUserType,
    onSelectChange: onUserTypeChangeHandler,
    options,
    reset: resetSelect,
  } = useInput(() => null);

  const {
    value: enteredInactiveDate,
    isValueInvalid: isInactiveDateInvalid,
    hasError: inactiveDateHasErr,
    isTouched: isInactviDateInputTouched,
    onChange: onInactiveDateChangeHandler,
    onBlur: onInactiveDateBlureHandler,
    reset: restInactiveDate,
  } = useInput(
    (value) => enteredUserType === "Inactive" && value.trim() === ""
  );

  // Creating date and then passing it to input 'type date' for max prop, to force the user to pick a date in the past
  const date = new Date();
  const curDate = date.toISOString().slice(0, 10);

  // Form submit handler fun
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (isEnterNameInvalid || isEnterLastNameInvalid || isInactiveDateInvalid) {
      setFromHasError(true);
      return;
    }
    // Continue if form inputs are valid
    setIsFormValid(true);
    setIsSending(true);

    const formData = {
      name: enteredName,
      lastName: enteredLastName,
      dateOfBirth: enteredBirthDay,
      userType: enteredUserType,
      inactivityDate: enteredInactiveDate,
    };

    // Send the data to Form APi
    await SaveUserForm(formData);

    setIsSending(false);

    // An app wide state I need to use to trigger a fetch fn to get updated users list and showe them in the UI
    userCtx.addUser(true);

    // Rest inputs
    resetName();
    restLastName();
    resetSelect();
    restInactiveDate();

    setTimeout(() => {
      setIsFormValid(false);
      userCtx.addUser(false);
    }, 3000);
  };

  //Custome classes for inputs
  const nameClasse =
    (fromHasError && !isNameInputTouched) || nameInputHasErr
      ? classes.invalid
      : "";
  const lastNameClass =
    (fromHasError && !isLastNameInputTouched) || lastNameInputHasErr
      ? classes.invalid
      : "";

  const inActiveDateClass =
    (fromHasError && !isInactviDateInputTouched) || inactiveDateHasErr
      ? classes.invalid
      : "";

  return (
    <Card>
      <div className={classes.FormTaskComplete}>
        <form onSubmit={formSubmitHandler}>
          <h1>Personal info</h1>
          <div className={classes.personalInfo}>
            <div>
              <FromInput
                element="input"
                label={
                  <p>
                    first name <span className={classes.text__error}>*</span>
                  </p>
                }
                input={{
                  value: enteredName,
                  onChange: onNameChangeHandler,
                  onBlur: onNameInputeBlurHandler,
                  className: nameClasse,
                  name: "first name",
                  "data-testid": "name input",
                  type: "text",
                  placeholder: "John",
                }}
              />
              {nameClasse && (
                <p
                  className={classes.text__error}
                  data-testid="first name error"
                >
                  Please, provide your name.
                </p>
              )}
            </div>

            <div>
              <FromInput
                element="input"
                label={
                  <p>
                    Last name <span className={classes.text__error}>*</span>{" "}
                  </p>
                }
                input={{
                  value: enteredLastName,
                  onChange: onLastNameChangeHandler,
                  onBlur: onLastNameInputeBlurHandler,
                  className: lastNameClass,
                  name: "last name",
                  "data-testid": "last name input",
                  type: "text",
                  placeholder: "Doe",
                }}
              />
              {lastNameClass && (
                <p
                  className={classes.text__error}
                  data-testid="last name error"
                >
                  Please, provid your last name.
                </p>
              )}
            </div>
            <div>
              <FromInput
                element="input"
                label="Date of birth"
                input={{
                  value: enteredBirthDay,
                  onChange: onBirthDayChangeHandler,
                  max: curDate,
                  name: "date of birth",
                  type: "date",
                }}
              />
            </div>
          </div>
          <h1>User management</h1>
          <div className={classes.userManage}>
            <div>
              <FromInput
                element="select"
                label={<p>User Type</p>}
                input={{
                  value: enteredUserType,
                  onChange: onUserTypeChangeHandler,
                  name: "user type",
                  "data-testid": "user type",
                  type: "select",
                }}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FromInput>
            </div>
            <div>
              <FromInput
                element={"input"}
                label={
                  <p>
                    User inactivity date
                    {enteredUserType === "Inactive" && (
                      <span className={classes.text__error}> *</span>
                    )}
                  </p>
                }
                input={{
                  value: enteredInactiveDate,
                  onChange: onInactiveDateChangeHandler,
                  onBlur: onInactiveDateBlureHandler,
                  className: inActiveDateClass,
                  name: "user inactivity date",
                  "data-testid": "inactivity date",
                  max: curDate,
                  type: "date",
                }}
              />
              {inActiveDateClass && (
                <p
                  className={classes.text__error}
                  data-testid="user inactivity date error"
                >
                  Please choose a date, in case the user type is inactive.
                </p>
              )}
            </div>
          </div>
          <button disabled={isSending} type="submit">
            Save
          </button>
        </form>
      </div>

      {isSending && (
        <div className={classes.feedback}>
          <h4>Sending...</h4>
        </div>
      )}
      {isFormValid && !isSending && (
        <div className={classes.feedback}>
          <h4>The user hase been added to the list.</h4>
        </div>
      )}
    </Card>
  );
};

export default FormTaskComplete;
