import useCategories from '../hooks/useCategories';

export default function CatalogFilters({ category, sort, onChange }) {
  const categories = useCategories();

  return (
    <div className="filters">
      <label>Kategori
        <select value={category} onChange={event => onChange('category', event.target.value)} disabled={!categories.data}>
          <option value="">{categories.isPending ? 'Laster kategorier …' : 'Alle kategorier'}</option>
          {categories.data?.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}
        </select>
      </label>
      <label>Sorter etter
        <select value={sort} onChange={event => onChange('sort', event.target.value)}>
          <option value="default">Anbefalt</option>
          <option value="price-asc">Pris: lav til høy</option>
          <option value="price-desc">Pris: høy til lav</option>
          <option value="rating-desc">Høyest vurdering</option>
        </select>
      </label>
      {categories.isError && (
        <p role="alert">
          Kunne ikke hente kategorier.{' '}
          <button className="text-button" onClick={() => categories.refetch()}>Prøv igjen</button>
        </p>
      )}
    </div>
  );
}
