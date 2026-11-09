export function addItem(items, product) {
  if (product.stock < 1) return items;

  const existing = items.find(item => item.id === product.id);
  if (existing) {
    return items.map(item => {
      if (item.id !== product.id) return item;
      const quantity = Math.min(item.quantity + 1, item.stock);
      return { ...item, quantity };
    });
  }

  const { id, title, price, thumbnail, stock } = product;
  return [...items, { id, title, price, thumbnail, stock, quantity: 1 }];
}

export function setItemQuantity(items, id, quantity) {
  if (!Number.isInteger(quantity)) return items;
  if (quantity <= 0) {
    return items.filter(item => item.id !== id);
  }

  return items.map(item => {
    if (item.id !== id) return item;
    return { ...item, quantity: Math.min(quantity, item.stock) };
  });
}

export function getCartTotals(items) {
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  // Sum whole cents so decimal prices do not introduce rounding errors.
  const cents = items.reduce((sum, item) => {
    return sum + Math.round(item.price * 100) * item.quantity;
  }, 0);
  return { count, cents };
}
