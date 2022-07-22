import { useState, useEffect, useContext } from "react";
import classes from "./CartForm.module.css";
import useInput from "../hooks/use-input";
import CartContext from "../../Store/cart-context";
import usePostOrder from "../hooks/use-post-order";
const CartForm = (props) => {
  const cartCtx = useContext(CartContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const validateName = (name) => {
    if (name.trim() === "") {
      return false;
    } else {
      return true;
    }
  };
  const [
    name,
    nameIsValid,
    nameHasError,
    nameChangeHandler,
    nameBlurHandler,
    nameReset,
  ] = useInput(validateName);
  const [
    phone,
    phoneIsValid,
    phoneHasError,
    phoneChangeHandler,
    phoneBlurHandler,
    phoneReset,
  ] = useInput(validateName);
  const [
    city,
    cityIsValid,
    cityHasError,
    cityChangeHandler,
    cityBlurHandler,
    cityReset,
  ] = useInput(validateName);
  const [
    street,
    streetIsValid,
    streetHasError,
    streetChangeHandler,
    streetBlurHandler,
    streetReset,
  ] = useInput(validateName);
  const [
    apartment,
    apartmentIsValid,
    apartmentHasError,
    apartmentChangeHandler,
    apartmentBlurHandler,
    apartmentReset,
  ] = useInput(validateName);
  const [
    comments,
    commentsIsValid,
    commentsHasError,
    commentsChangeHandler,
    commentsBlurHandler,
    commentsReset,
  ] = useInput(() => {
    return true;
  });
  useEffect(() => {
    if (
      nameIsValid &&
      phoneIsValid &&
      cityIsValid &&
      streetIsValid &&
      apartmentIsValid &&
      commentsIsValid
    ) {
      setFormIsValid(true);
    }
  }, [
    nameIsValid,
    phoneIsValid,
    cityIsValid,
    streetIsValid,
    apartmentIsValid,
    commentsIsValid,
  ]);

  const credentials = { name, phone, city, street, apartment, comments };

  const postOrder = usePostOrder(credentials, cartCtx);

  const resetForm = () => {
    nameReset();
    phoneReset();
    cityReset();
    streetReset();
    apartmentReset();
    commentsReset();
  };
  const submitHandler = (event) => {
    event.preventDefault();
    postOrder();
    resetForm();
    setFormIsValid(false);
  };

  const nameStyle = `${classes.control} ${nameHasError ? classes.invalid : ""}`;
  const phoneStyle = `${classes.control} ${
    phoneHasError ? classes.invalid : ""
  }`;
  const cityStyle = `${classes.control} ${cityHasError ? classes.invalid : ""}`;
  const streetStyle = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;
  const apartmentStyle = `${classes.control} ${
    apartmentHasError ? classes.invalid : ""
  }`;
  const commentsStyle = `${classes.control} ${
    commentsHasError ? classes.invalid : ""
  }`;
  return (
    <form onSubmit={submitHandler}>
      <div className={nameStyle}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={name}
        />
      </div>
      <div className={phoneStyle}>
        <label htmlFor="phone">Phone number</label>
        <input
          type="text"
          id="phone"
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          value={phone}
        />
      </div>
      <div className={cityStyle}>
        <label htmlFor="name">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={city}
        />
      </div>
      <div className={streetStyle}>
        <label htmlFor="name">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={street}
        />
      </div>
      <div className={apartmentStyle}>
        <label htmlFor="name">Apartment</label>
        <input
          type="text"
          id="apartment"
          onChange={apartmentChangeHandler}
          onBlur={apartmentBlurHandler}
          value={apartment}
        />
      </div>
      <div className={commentsStyle}>
        <label htmlFor="name">Comments</label>
        <input
          type="text"
          id="comments"
          onChange={commentsChangeHandler}
          onBlur={commentsBlurHandler}
          value={comments}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={!formIsValid}
          className={classes.submit}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};
export default CartForm;
