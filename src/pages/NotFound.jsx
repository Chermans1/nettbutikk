import { Link } from 'react-router-dom';

export default function NotFound() {
  return <section className="not-found"><p className="eyebrow">404 / PÅ AVVEIE</p>
    <h1>Her var det tomt.</h1><p>Siden du leter etter finnes ikke. Ditt neste funn venter på forsiden.</p>
    <Link className="button" to="/">Tilbake til butikken →</Link>
  </section>;
}
