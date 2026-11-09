export default function StatusPanel({ title, children, onRetry }) {
  return <div className="status-panel" role={onRetry ? 'alert' : 'status'}>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
    {onRetry && <button className="button" onClick={onRetry}>Prøv igjen</button>}
  </div>;
}
