import { useState } from "react";
import { useValidation } from "./useValidation";

export const useInput = (
  initialValue,
  validations,
  defaultValue,
  additionalValue
) => {
  const [value, setValue] = useState(defaultValue || initialValue);
  const [isFocus, setIsFocus] = useState(false);
  const valid = useValidation(value, validations, additionalValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsFocus(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isFocus,
    ...valid,
  };
};
