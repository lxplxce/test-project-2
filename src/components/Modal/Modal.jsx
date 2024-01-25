import React, { useState } from "react";
import "./Modal.scss";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import { useInput } from "../../hooks/useInput";

const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      organisation: "",
      yearOfStart: "",
      yearOfEnd: "",
    }
  );

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (valid4 && valid5 && valid6) {
      case false:
        return;
      default:
        break;
    }
    onSubmit(formState);

    closeModal();
  };

  const organisation = useInput(
    "",
    { isEmpty: true },
    defaultValue && defaultValue.organisation
  );
  const yearOfStart = useInput(
    "",
    {
      isEmpty: true,
      validYearOfStartJob: false,
    },
    defaultValue && defaultValue.yearOfStart
  );
  const yearOfEnd = useInput(
    "",
    { isEmpty: true, validYearOfEndJob: false },
    defaultValue && defaultValue.yearOfEnd,
    yearOfStart.value
  );

  const valid4 = organisation.isValid;
  const valid5 = yearOfStart.isValid;
  const valid6 = yearOfEnd.isValid;

  return (
    <div
      className="modal__container"
      onClick={(e) => {
        if (e.target.className === "modal__container") closeModal();
      }}
    >
      <div className="modal">
        <div>
          <div className="form__group">
            <label>Организация</label>
            {organisation.isFocus && organisation.isEmpty && (
              <div className="errors-message">{organisation.errors.empty}</div>
            )}
            <MyInput
              name="organisation"
              onBlur={(e) => organisation.onBlur(e)}
              onChange={(e) => {
                handleChange(e);
                organisation.onChange(e);
              }}
              value={formState.organisation}
            />
          </div>
          <div className="form__group">
            <label>Год начала работы</label>
            {yearOfStart.isFocus && yearOfStart.isEmpty && (
              <div className="errors-message">{yearOfStart.errors.empty}</div>
            )}
            {yearOfStart.isFocus && !yearOfStart.isValid && (
              <div className="errors-message">
                {yearOfStart.errors.validYearOfStartJobError}
              </div>
            )}
            <MyInput
              type="number"
              name="yearOfStart"
              onBlur={(e) => yearOfStart.onBlur(e)}
              onChange={(e) => {
                handleChange(e);
                yearOfStart.onChange(e);
              }}
              value={formState.yearOfStart}
            />
          </div>

          <div className="form__group">
            <label>Год окончания работы</label>
            {yearOfEnd.isFocus && yearOfEnd.isEmpty && (
              <div className="errors-message">{yearOfEnd.errors.empty}</div>
            )}
            {yearOfEnd.isFocus && !yearOfEnd.isValid && (
              <div className="errors-message">
                {yearOfEnd.errors.validYearOfEndJobError}
              </div>
            )}
            <MyInput
              type="number"
              name="yearOfEnd"
              onBlur={(e) => yearOfEnd.onBlur(e)}
              onChange={(e) => {
                handleChange(e);
                yearOfEnd.onChange(e);
              }}
              value={formState.yearOfEnd}
            ></MyInput>
          </div>
          <MyButton onClick={handleSubmit}>Подтвердить</MyButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
