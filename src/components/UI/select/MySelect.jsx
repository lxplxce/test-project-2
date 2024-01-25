import React from "react";
import classes from "./MySelect.module.scss";

const MySelect = ({ options, value, onChange }) => {
  return (
    <select
      className={classes.MySelect}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
