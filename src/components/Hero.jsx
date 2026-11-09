export default function Hero() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">VELKOMMEN TIL NORD</p>
        <h1>Litt nytt.<br /><em>Litt mer deg.</em></h1>
        <p>Fra små hverdagsfavoritter til ditt neste store funn.<br />Utforsk utvalget, og finn noe du liker.</p>
        <a className="hero-link" href="#catalog">Finn dine favoritter <span>↘</span></a>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <span className="art-star">✳</span>
        <span className="art-caption">GODE FUNN.<br />HVER DAG.</span>
        <span className="art-label">THE EVERYDAY EDIT / 01</span>
      </div>
    </section>
  );
}
