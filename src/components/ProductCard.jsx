import { Link } from 'react-router-dom';
import { formatPrice, categoryLabel } from '../utils/format';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }) {
  return <article className="product-card">
    <Link className="product-image" to={`/products/${product.id}`} tabIndex={-1} aria-hidden="true">
      <img src={product.thumbnail} alt="" loading="lazy" />
      <span className="rating">★ {product.rating.toFixed(1)}</span>
    </Link>
    <div className="product-info">
      <p className="eyebrow">{categoryLabel(product.category)}</p>
      <h3><Link to={`/products/${product.id}`}>{product.title}</Link></h3>
      <div className="card-bottom"><strong>{formatPrice(product.price)}</strong>
        <AddToCartButton product={product} compact />
      </div>
    </div>
  </article>;
}
