import classes from "./Input.module.css";
const Input = (props) => {
  const updateHandler = (event) => {
    console.log(+event.target.value);
    props.onUpdateAmount(+event.target.value);
  };
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} onChange={updateHandler} />
    </div>
  );
};
export default Input;
