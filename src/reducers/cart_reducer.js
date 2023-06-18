import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, color, product } = action.payload;
    const item = state.cart.find((i) => i.id === `${id}-${color}`);

    if (item) {
      const newCart = state.cart.filter((i) => i.id !== item.id);
      return {
        ...state,
        cart: [
          ...newCart,
          {
            ...item,
            amount:
              item.amount + amount > item.max ? item.max : item.amount + amount,
          },
        ],
        total_items: state.total_items + amount,
        total_amount: state.total_amount + amount * item.price,
      };
    } else {
      const newItem = {
        id: `${id}-${color}`,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    return {
      ...state,
      cart: state.cart.map((item) =>
        item.id !== id ? item : { ...item, amount: value }
      ),
    };
  }
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
      total_items: 0,
      total_amount: 0,
      shipping_fee: 0,
    };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const cart = state.cart;
    return {
      ...state,
      cart: [...cart.filter((item) => item.id !== action.payload.id)],
    };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const [total_items, total_amount] = state.cart.reduce(
      ([ti, ta], e) => [ti + e.amount, ta + e.amount * e.price],
      [0, 0]
    );
    return {
      ...state,
      total_items,
      total_amount,
      shipping_fee: 534,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
