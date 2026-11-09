export default function ProductSkeleton() {
  return <div role="status" aria-label="Laster produkter">
    <span className="sr-only">Laster produkter …</span>
    <div className="product-grid" aria-hidden="true">{Array.from({ length: 12 }, (_, index) =>
      <div className="skeleton-card" key={index}><div /><span /><span /></div>)}</div>
  </div>;
}
