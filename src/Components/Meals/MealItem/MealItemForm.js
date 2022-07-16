import { useState, useContext } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import CartContext from "../../../Store/cart-context";
const MealItemForm = (props) => {
  const [amount, setAmount] = useState(1);
  const cartCtx = useContext(CartContext);
  const submitHandler = (event) => {
    event.preventDefault();
    const updatedItem = { ...props.item };
    updatedItem.amount = amount;
    cartCtx.addItem(updatedItem);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        onUpdateAmount={setAmount}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};
export default MealItemForm;
