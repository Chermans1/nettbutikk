import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import { PAGE_SIZE } from '../api/products';
import CatalogFilters from '../components/CatalogFilters';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import Pagination from '../components/Pagination';
import StatusPanel from '../components/StatusPanel';

const sorts = ['default', 'price-asc', 'price-desc', 'rating-desc'];

export default function Home() {
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const category = params.get('category') || '';
  const sort = sorts.includes(params.get('sort')) ? params.get('sort') : 'default';
  const requested = Number(params.get('page'));
  const page = Number.isSafeInteger(requested) && requested > 0 ? requested : 1;
  const products = useProducts({ search, category, page, sort });
  const pages = Math.max(1, Math.ceil((products.data?.total || 0) / PAGE_SIZE));
  useEffect(() => {
    if (products.data && page > pages) {
      const next = new URLSearchParams(params);
      next.set('page', String(pages));
      setParams(next, { replace: true });
    }
  }, [products.data, page, pages, params, setParams]);
  function change(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, String(value));
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setParams(next);
  }
  return <>
    <section className="hero">
      <div><p className="eyebrow">VELKOMMEN TIL NORD</p>
        <h1>Litt nytt.<br /><em>Litt mer deg.</em></h1>
        <p>Fra små hverdagsfavoritter til ditt neste store funn.<br />Utforsk utvalget, og finn noe du liker.</p>
        <a className="hero-link" href="#catalog">Finn dine favoritter <span>↘</span></a>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="art-star">✳</span><span className="art-caption">GODE FUNN.<br />HVER DAG.</span><span className="art-label">THE EVERYDAY EDIT / 01</span></div>
    </section>
    <section id="catalog" className="catalog" aria-labelledby="catalog-title">
      <div className="catalog-heading"><div><p className="eyebrow">FINN NOE DU LIKER</p>
        <h2 id="catalog-title">{search ? `Søk: «${search}»` : 'Utforsk utvalget'}<span className="result-count">{products.data?.total ?? '…'}</span></h2>
      </div><span className="catalog-note">Utvalgte ting. Uendelige muligheter.</span></div>
      <CatalogFilters category={category} sort={sort} onChange={change} />
      {(search || category) && <div className="active-filters"><span>{category || 'Alle kategorier'}{search && ` · ${search}`}</span>
        <button className="text-button" onClick={() => setParams({})}>Nullstill filtre ×</button></div>}
      {products.isPending ? <ProductSkeleton /> : products.isError
        ? <StatusPanel title="Vi fikk ikke hentet produktene" onRetry={() => products.refetch()}>Sjekk nettforbindelsen og prøv igjen.</StatusPanel>
        : products.data.total === 0 ? <StatusPanel title="Ingen produkter funnet">Prøv et annet søkeord eller nullstill filtrene.</StatusPanel>
        : <><div className="product-grid">{products.data.products.map(product => <ProductCard key={product.id} product={product} />)}</div>
          <Pagination page={page} pages={pages} onChange={value => change('page', value)} /></>}
    </section>
  </>;
}
