import { Outlet, Link } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return <>
    <a className="skip-link" href="#main">Hopp til innhold</a>
    <div className="announcement">Små funn. Store hverdagsgleder. <span>En demobutikk bygget med React.</span></div>
    <Header />
    <main id="main" className="container"><Outlet /></main>
    <footer className="container footer">
      <Link className="logo" to="/">nord<span>®</span></Link>
      <p>Utvalgt for hverdagen.</p>
      <p>Studentprosjekt · DummyJSON · Priser i USD<br />Ingen betaling eller ekte bestilling.</p>
    </footer>
  </>;
}
