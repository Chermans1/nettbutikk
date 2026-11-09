export default function Pagination({ page, pages, onChange }) {
  return <nav className="pagination" aria-label="Produktsider">
    <button className="button secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>← Forrige</button>
    <span aria-live="polite">Side <strong>{page}</strong> av {pages}</span>
    <button className="button secondary" disabled={page >= pages} onClick={() => onChange(page + 1)}>Neste →</button>
  </nav>;
}
