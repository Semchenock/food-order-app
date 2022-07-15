import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
const HeaderCartButton = (props) => {
  const showCartHandler = () => {
    props.onShowCart();
  };
  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your card</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};
export default HeaderCartButton;
