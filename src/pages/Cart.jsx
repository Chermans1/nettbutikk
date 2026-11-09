import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import CartItem from '../components/CartItem';
import StatusPanel from '../components/StatusPanel';

export default function Cart() {
  const { items, count, total } = useCart();

  return (
    <section className="cart-page">
      <p className="eyebrow">DINE UTVALGTE FAVORITTER</p>
      <h1>Handlekurven din<span className="result-count">{count}</span></h1>

      {!items.length ? (
        <StatusPanel title="Her var det litt tomt">
          Finn noe du liker, så tar vi vare på det her.<br />
          <Link className="button" to="/">Utforsk produktene →</Link>
        </StatusPanel>
      ) : (
        <div className="cart-layout">
          <div>
            {items.map(item => <CartItem key={item.id} item={item} />)}
            <Link className="continue-link" to="/">← Fortsett å utforske</Link>
          </div>
          <aside className="cart-summary">
            <p className="eyebrow">DIN OVERSIKT</p>
            <h2>Ordresammendrag</h2>
            <div><span>Varer ({count})</span><span>{formatPrice(total)}</span></div>
            <div className="summary-total"><strong>Totalsum</strong><strong>{formatPrice(total)}</strong></div>
            <p>Alle priser er i USD, som oppgitt av DummyJSON. Dette er en demobutikk uten betaling eller bestilling.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
