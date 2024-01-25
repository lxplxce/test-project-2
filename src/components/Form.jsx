import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import ListOfJobs from "./ListOfJobs";
import MySelect from "./UI/select/MySelect";
import Modal from "./Modal/Modal";
import { useInput } from "../hooks/useInput";

const Form = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    fio: "",
    gender: "Пол: М",
    yearOfBirth: "",
    email: "",
  });

  const dataFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [rows, setRows] = useState([
    {
      organisation: "",
      yearOfStart: "",
      yearOfEnd: "",
    },
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  const sendForm = (e) => {
    e.preventDefault();

    switch (valid1 && valid2 && valid3) {
      case false:
        return;
      default:
        break;
    }

    const combinedData = {
      form: { ...form },
      jobsItem: [...rows],
    };
    console.log(combinedData);
  };

  const clearForm = (e) => {
    e.preventDefault();

    setForm({
      fio: "",
      gender: "Пол: М",
      yearOfBirth: "",
      email: "",
    });
    setRows([
      {
        organisation: "",
        yearOfStart: "",
        yearOfEnd: "",
      },
    ]);
  };

  const fio = useInput("", { isEmpty: true, validFio: false });
  const yearOfBirth = useInput("", { isEmpty: true, validBirthYear: false });
  const email = useInput("", { isEmpty: true, emailError: false });

  const valid1 = fio.isValid;
  const valid2 = yearOfBirth.isValid;
  const valid3 = email.isValid;

  return (
    <div className="form__wrapper">
      <div className="form__items">
        {fio.isFocus && fio.isEmpty && (
          <div className="errors-message">{fio.errors.empty}</div>
        )}
        {fio.isFocus && fio.validFio && (
          <div className="errors-message">{fio.errors.fio}</div>
        )}
        <MyInput
          type="text"
          placeholder="ФИО"
          name="fio"
          onBlur={(e) => fio.onBlur(e)}
          onChange={(e) => {
            dataFormChange(e);
            fio.onChange(e);
          }}
          value={form.fio}
        />
        <label>
          Выберите пол:
          <MySelect
            options={[
              { value: "Пол: М", name: "М" },
              { value: "Пол: Ж", name: "Ж" },
            ]}
            name="gender"
            defaultValue="Пол"
            onChange={(gender) => setForm({ ...form, gender })}
          />
        </label>

        {yearOfBirth.isFocus && yearOfBirth.isEmpty && (
          <div className="errors-message">{yearOfBirth.errors.empty}</div>
        )}
        {yearOfBirth.isFocus && !yearOfBirth.isValid && (
          <div className="errors-message">
            {yearOfBirth.errors.yearOfBirthError}
          </div>
        )}
        <MyInput
          type="number"
          placeholder="Год рождения"
          name="yearOfBirth"
          onBlur={(e) => yearOfBirth.onBlur(e)}
          onChange={(e) => {
            dataFormChange(e);
            yearOfBirth.onChange(e);
          }}
          value={form.yearOfBirth}
        />
        {email.isFocus && email.isEmpty && (
          <div className="errors-message">{email.errors.empty}</div>
        )}
        {email.isFocus && email.emailError && (
          <div className="errors-message">{email.errors.email}</div>
        )}
        <MyInput
          type="email"
          placeholder="Email"
          name="email"
          onBlur={(e) => email.onBlur(e)}
          onChange={(e) => {
            dataFormChange(e);
            email.onChange(e);
          }}
          value={form.email}
        />

        <ListOfJobs
          rows={rows}
          handleDeleteRow={handleDeleteRow}
          handleEditRow={handleEditRow}
        />

        <MyButton onClick={() => setModalOpen(true)}>
          Добавить место работы
        </MyButton>

        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null ? rows[rowToEdit] : null}
          />
        )}
        <MyButton onClick={clearForm}>Очистить</MyButton>
        <MyButton onClick={sendForm}>Отправить</MyButton>
      </div>
    </div>
  );
};

export default Form;
