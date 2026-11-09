import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import SearchForm from './SearchForm';

export default function Header() {
  const { count } = useCart();
  const { theme, toggle } = useTheme();
  return <header className="header">
    <div className="container header-inner">
      <Link to="/" className="logo" aria-label="Nord, forsiden">nord<span>®</span></Link>
      <NavLink className="shop-link" to="/">Alle produkter</NavLink>
      <SearchForm />
      <button className="icon-button" onClick={toggle}
        aria-label={theme === 'light' ? 'Bytt til mørk modus' : 'Bytt til lys modus'}>
        <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
      </button>
      <NavLink className="cart-link" to="/cart">Handlekurv <span className="badge">{count}</span></NavLink>
    </div>
  </header>;
}
