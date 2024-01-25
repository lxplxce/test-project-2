import React from "react";
import classes from "./MyInput.module.scss";

const MyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} className={classes.MyInput} {...props} />;
});

export default MyInput;
