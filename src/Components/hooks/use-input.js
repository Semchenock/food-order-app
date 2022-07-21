import { useState } from "react";
const useInput = (validateValue) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(value);
  const hasError = isTouched && !valueIsValid;

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setIsTouched(false);
    setValue("");
  };
  return [
    value,
    valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  ];
};
export default useInput;
