import { useEffect, useState } from "react";

export const useValidation = (value, validations, yearOfStartValue) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [validFio, setValidFio] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [yearOfBirth, setYearOfBirth] = useState(false);
  const [yearOfBirthError, setYearOfBirthError] = useState("");
  const [validYearOfStartJob, setValidYearOfStartJob] = useState(false);
  const [validYearOfStartJobError, setValidYearOfStartJobError] = useState("");
  const [validYearOfEndJob, setValidYearOfEndJob] = useState(false);
  const [validYearOfEndJobError, setValidYearOfEndJobError] = useState("");
  const [isValid, setIsValid] = useState(true);

  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const maxYear = currentYear - 18;
  const isValidYear = /^\d{4}$/.test(value);

  let errors = {
    empty: "Поле не может быть пустым",
    fio: "Должно содержать как минимум 3 слова",
    yearOfBirthError,
    email: "Email неправильного формата",
    validYearOfStartJobError,
    validYearOfEndJobError,
  };

  useEffect(() => {
    let validationFailed = false;
    for (const validation in validations) {
      switch (validation) {
        case "validFio":
          const words = value.trim().split(/\s+/);
          const isValidFio = words.length < 3;
          setValidFio(isValidFio);
          validationFailed = validationFailed || isValidFio;
          break;

        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          validationFailed = validationFailed || !value;
          break;

        case "validBirthYear":
          isValidYear && parseInt(value, 10) >= minYear
            ? setYearOfBirth(true)
            : setYearOfBirthError("Год рождения не может быть меньше 1900");

          isValidYear && parseInt(value, 10) <= maxYear
            ? setYearOfBirth(false)
            : setYearOfBirthError("Вы должны быть старше 18 лет");

          if (
            isValidYear &&
            parseInt(value, 10) >= minYear &&
            parseInt(value, 10) <= maxYear
          ) {
            setYearOfBirthError("");
          } else {
            validationFailed = true;
          }
          break;

        case "emailError":
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLocaleLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          validationFailed =
            validationFailed || !re.test(String(value).toLocaleLowerCase());
          break;

        case "validYearOfStartJob":
          isValidYear && parseInt(value, 10) >= minYear
            ? setValidYearOfStartJob(true)
            : setValidYearOfStartJobError(
                "Год начала работы не может быть меньше 1900"
              );

          isValidYear && parseInt(value, 10) <= maxYear
            ? setValidYearOfStartJob(false)
            : setValidYearOfStartJobError(
                "На год начала работы вам должно быть 18 лет"
              );

          if (
            isValidYear &&
            parseInt(value, 10) >= minYear &&
            parseInt(value, 10) <= maxYear
          ) {
            setValidYearOfStartJobError("");
          } else {
            validationFailed = true;
          }

          break;

        case "validYearOfEndJob":
          isValidYear && parseInt(value, 10) > yearOfStartValue
            ? setValidYearOfEndJob(true)
            : setValidYearOfEndJobError(
                "Год окончания работы не может быть меньше года начала работы"
              );
          isValidYear && parseInt(value, 10) < currentYear
            ? setValidYearOfEndJob(false)
            : setValidYearOfEndJobError(
                "Год окончания работы не может превышать текущий год"
              );

          if (
            isValidYear &&
            parseInt(value, 10) > yearOfStartValue &&
            parseInt(value, 10) < currentYear
          )
            setValidYearOfEndJobError("");
          if (
            isValidYear &&
            parseInt(value, 10) > yearOfStartValue &&
            parseInt(value, 10) <= currentYear
          ) {
            setValidYearOfEndJobError("");
          } else {
            validationFailed = true;
          }

          break;

        default:
          break;
      }
    }
    setIsValid(!validationFailed);
  }, [value]);
  return {
    isValid,
    errors,
    isEmpty,
    validFio,
    yearOfBirth,
    emailError,
    validYearOfStartJob,
    validYearOfEndJob,
  };
};
