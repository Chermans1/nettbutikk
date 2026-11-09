import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Keep the input in sync with the q parameter in the URL.
  useEffect(() => {
    setSearch(new URLSearchParams(location.search).get('q') || '');
  }, [location.search]);

  function submit(event) {
    event.preventDefault();
    const params = new URLSearchParams(location.pathname === '/' ? location.search : '');
    if (search.trim()) params.set('q', search.trim());
    else params.delete('q');
    params.delete('page');
    navigate(`/?${params}`);
  }

  return (
    <form className="search-form" role="search" onSubmit={submit}>
      <label className="sr-only" htmlFor="search">Søk etter produkter</label>
      <input
        id="search"
        type="search"
        placeholder="Finn din neste favoritt …"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      <button type="submit" aria-label="Søk">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
      </button>
    </form>
  );
}
