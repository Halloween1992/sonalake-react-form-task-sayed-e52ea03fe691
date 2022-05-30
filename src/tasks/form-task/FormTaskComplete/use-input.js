import { useReducer } from "react";

const initInputState = {
  value: "",
  selectValue: "Active",
  isTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "CHAGE-TEXT")
    return { value: action.value, isTouched: state.isTouched };
  if (action.type === "CHAGE-SELECT")
    return {
      selectValue: action.selectValue,
      isTouched: state.isTouched,
    };
  if (action.type === "BLUR") return { value: state.value, isTouched: true };
  if (action.type === "RESET") return { value: "", isTouched: false };

  return initInputState;
};

const useInput = (inputValidation) => {
  const [input, dispach] = useReducer(inputReducer, initInputState);

  const isEnteredValuIsInvalid = inputValidation(input.value);
  const hasError = isEnteredValuIsInvalid && input.isTouched;

  const onChangeInputHandler = (e) => {
    dispach({
      type: "CHAGE-TEXT",
      value: e.target.value,
    });
  };

  const onSelectChangeHandler = (e) => {
    dispach({
      type: "CHAGE-SELECT",
      selectValue: e.target.value,
    });
  };

  const onInputBlurHandler = () => {
    dispach({
      type: "BLUR",
    });
  };

  const reset = () => {
    dispach({
      type: "RESET",
    });
  };

  const options = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ];

  return {
    selectValue: input.selectValue,
    value: input.value,
    isValueInvalid: isEnteredValuIsInvalid,
    hasError,
    isTouched: input.isTouched,
    onChange: onChangeInputHandler,
    onSelectChange: onSelectChangeHandler,
    onBlur: onInputBlurHandler,
    reset,
    options,
  };
};

export default useInput;
