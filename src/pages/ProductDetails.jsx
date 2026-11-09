import { Link, useParams } from 'react-router-dom';
import useProduct from '../hooks/useProduct';
import { categoryLabel, formatPrice } from '../utils/format';
import StatusPanel from '../components/StatusPanel';
import AddToCartButton from '../components/AddToCartButton';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isPending, isError, error, refetch } = useProduct(id);
  if (isPending) return <StatusPanel title="Laster produkt …" />;
  if (isError) return <StatusPanel title={error.response?.status === 404 ? 'Produktet finnes ikke' : 'Kunne ikke hente produktet'}
    onRetry={error.response?.status === 404 ? undefined : refetch}><Link to="/">Tilbake til produktene</Link></StatusPanel>;
  return <>
    <nav className="breadcrumbs" aria-label="Brødsmulesti"><Link to="/">Alle produkter</Link><span>/</span><span>{product.title}</span></nav>
    <section className="product-details">
      <div className="detail-image"><img src={product.images?.[0] || product.thumbnail} alt={product.title} /></div>
      <div className="detail-info">
        <Link className="eyebrow" to={`/?category=${encodeURIComponent(product.category)}`}>{categoryLabel(product.category)}</Link>
        <h1>{product.title}</h1>
        <p className="detail-rating">★ {product.rating.toFixed(1)} / 5</p>
        <p className="detail-price">{formatPrice(product.price)}</p>
        <p className="description">{product.description}</p>
        <dl><div><dt>Merke</dt><dd>{product.brand || 'Ikke oppgitt'}</dd></div>
          <div><dt>Lagerbeholdning</dt><dd>{product.stock > 0 ? `${product.stock} på lager` : 'Utsolgt'}</dd></div></dl>
        <AddToCartButton key={product.id} product={product} />
        <p className="muted">Demobutikk · Ingen ekte kjøp eller betaling.</p>
      </div>
    </section>
  </>;
}
