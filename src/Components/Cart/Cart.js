import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../Store/cart-context";
import CartForm from "./CartForm";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isFormShown, setIsFormShown] = useState(false);
  const totalAmount = `$${Math.abs(cartCtx.totalAmount.toFixed(2))}`;
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  const togleForm = () => {
    setIsFormShown((prev) => !prev);
  };

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isFormShown && (
        <div className={classes.actions}>
          <button onClick={props.onHideCart} className={classes["button--alt"]}>
            Close
          </button>
          {!!cartCtx.items.length && (
            <button onClick={togleForm} className={classes.button}>
              Order
            </button>
          )}
        </div>
      )}
      {isFormShown && <CartForm onCancel={togleForm} />}
    </Modal>
  );
};
export default Cart;
