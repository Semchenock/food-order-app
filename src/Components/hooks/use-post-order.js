const usePostOrder = (credentials, cartCtx) => {
  const meals = cartCtx.items.map((item) => {
    return { id: item.id, amount: item.amount };
  });
  const orderData = {
    totalAmount: Math.abs(cartCtx.totalAmount.toFixed(2)),
    meals,
    credentials,
    date: Date.now(),
  };
  const postOrder = async () => {
    const response = await fetch(
      "https://food-order-app-51d5e-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
  };
  return postOrder;
};
export default usePostOrder;
