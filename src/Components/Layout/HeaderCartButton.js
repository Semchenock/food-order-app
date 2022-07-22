import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/cart-context";
const HeaderCartButton = (props) => {
  const [btnIsBump, setBtnIsBump] = useState(false);
  const cartCtx = useContext(CartContext);

  const showCartHandler = () => {
    props.onShowCart();
  };
  const numberOfCartItems = cartCtx.items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  const { items } = cartCtx;

  const btnClasses = `${classes.button} ${btnIsBump ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsBump(true);
    const timer = setTimeout(() => {
      setBtnIsBump(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button onClick={showCartHandler} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.title}>Your card</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
