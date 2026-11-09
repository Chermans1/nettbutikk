import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { addItem, getCartTotals, setItemQuantity } from '../utils/cart';

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('nord-cart', []);
  const totals = getCartTotals(items);

  function add(product) {
    setItems(previous => addItem(previous, product));
  }

  function remove(id) {
    setItems(previous => previous.filter(item => item.id !== id));
  }

  function setQuantity(id, quantity) {
    setItems(previous => setItemQuantity(previous, id, quantity));
  }

  const value = {
    items,
    count: totals.count,
    total: totals.cents / 100,
    add,
    remove,
    setQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
