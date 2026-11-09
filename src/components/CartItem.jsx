import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

export default function CartItem({ item }) {
  const { remove, setQuantity } = useCart();
  return <article className="cart-item">
    <Link className="cart-image" to={`/products/${item.id}`} tabIndex={-1} aria-hidden="true"><img src={item.thumbnail} alt="" /></Link>
    <div className="cart-item-info"><h2><Link to={`/products/${item.id}`}>{item.title}</Link></h2>
      <p className="muted">{formatPrice(item.price)} / stk.</p>
      <button className="text-button" onClick={() => remove(item.id)} aria-label={`Fjern ${item.title}`}>Fjern</button>
    </div>
    <div className="quantity-control" role="group" aria-label={`Antall ${item.title}`}>
      <button onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label={`Reduser antall ${item.title}`}>−</button>
      <output aria-live="polite">{item.quantity}</output>
      <button disabled={item.quantity >= item.stock} onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label={`Øk antall ${item.title}`}>+</button>
    </div>
    <strong className="item-total">{formatPrice(Math.round(item.price * 100) * item.quantity / 100)}</strong>
  </article>;
}
