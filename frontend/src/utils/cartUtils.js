export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // item priceの計算
  state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  // 配送料の計算
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  // 税金の計算
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
  // 合計額の計算
  state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
}