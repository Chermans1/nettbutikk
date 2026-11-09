import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AddToCartButton({ product, compact = false }) {
  const { items, add } = useCart();
  const [added, setAdded] = useState(false);
  const quantity = items.find(item => item.id === product.id)?.quantity || 0;
  const full = quantity >= product.stock;
  function handleAdd() {
    add(product);
    setAdded(true);
  }
  const label = product.stock === 0 ? 'Utsolgt' : full ? 'Maks antall' : 'Legg i kurv';
  return <div className="add-control">
    <button className={compact ? 'add-button' : 'button'} disabled={full} onClick={handleAdd}
      aria-label={`${label}: ${product.title}`}>
      {compact ? <span aria-hidden="true">{full ? '✓' : '+'}</span> : `${label}  +`}
    </button>
    <span className={compact ? 'sr-only' : 'add-feedback'} role="status">{added ? 'Lagt i handlekurven' : ''}</span>
  </div>;
}
