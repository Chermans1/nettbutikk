# Nord - React-nettbutikk

Prosjektoppgave i React (Kodehode, Modul 3). En responsiv demobutikk med produkter fra DummyJSON.
Du kan søke, filtrere på kategori, sortere, bla mellom sider og åpne hvert produkt på egen URL.
Handlekurven samler like produkter, lar deg endre antall og viser totalsum. Kurv og lys/mørk
modus huskes i nettleseren. Grensesnittet er norsk; produkttekster og kategorinavn kommer fra
API-et på engelsk, og prisene vises i USD slik API-et oppgir dem.

- Kildekode: https://github.com/Chermans1/nettbutikk
- Publisert: https://nettbutikk-hazel.vercel.app

## Teknologier og valg

- **React 19 og Vite** for komponenter, lokal utvikling og produksjonsbygg.
- **React Router** med `createBrowserRouter` for `/`, `/products/:id`, `/cart` og `*`.
  `Layout` bruker `Outlet`, så header og footer er synlige på alle sider.
- **Axios** for ett samlet API-lag i `src/api/`, med egne funksjoner for produkter og kategorier.
  Komponentene vet ikke hvor dataene kommer fra.
- **TanStack Query** for caching, loading, feil og nye forsøk. Søk, kategori, side og sortering
  er del av query-nøkkelen, så hvert resultat caches for seg.
- **To separate Context-er**, én for handlekurv og én for tema, begge lagret i `localStorage`
  gjennom en felles `useLocalStorage`-hook.
- **Vanlig CSS** med variabler for tema og media queries for mobil. Ingen CSS-rammeverk, for å
  bruke tiden på React-logikken i stedet for å lære et nytt verktøy.

## Kjør lokalt

Krever Node.js 22.12 eller nyere.

```sh
npm install
npm run dev
```

Åpne adressen Vite viser (normalt http://127.0.0.1:5173). `npm run build` lager produksjonsfiler
i `dist/`, og `npm run preview` viser dem lokalt. Ingen API-nøkler eller miljøvariabler er nødvendig.

## Struktur

```text
src/
  api/          Axios-klient og all kommunikasjon med DummyJSON
  components/   Gjenbrukbare deler: Layout, Header, SearchForm, ProductCard, Pagination, CartItem ...
  context/      CartContext og ThemeContext med hver sin provider
  hooks/        useLocalStorage og egne Query-hooks for datahenting
  pages/        Home, ProductDetails, Cart og NotFound (én fil per rute)
  utils/        Rene funksjoner for kurvlogikk og formatering
  App.jsx       Router og ruter
  main.jsx      Providers og oppstart
  styles.css    Responsiv styling og begge temaer
```

## Slik virker det

Søk sendes ved Enter eller søkeknappen. Søk, kategori, sortering og sidenummer ligger i URL-en,
så tilbakeknappen og delte lenker virker. Endres søk, kategori eller sortering, nullstilles
sidenummeret. Et sidenummer utenfor utvalget flyttes til siste gyldige side.

DummyJSON har ikke et endepunkt som kombinerer søk og kategori. Brukes begge samtidig, hentes
hele kategorien med `limit=0`, og søket filtreres og pagineres i API-laget. Ellers brukes
API-ets `limit` og `skip`, og antall sider regnes ut fra `total`.

Kurven oppdateres uten å mutere: hver endring lager nye objekter og arrays. Samme produkt to
ganger gir antall 2, ikke to rader, og antallet kan ikke overstige lagerbeholdningen. Summer
regnes i hele cent for å unngå avrundingsfeil. Kan ikke lagrede data leses som JSON, brukes
startverdien, og blokkerer nettleseren lagring, virker kurven likevel i den åpne økten.

Lys og mørk modus settes som `data-theme` på `<html>`, og CSS-variablene gjør resten.

## Avgrensninger og videre arbeid

Dette er en demobutikk uten betaling, innlogging eller bestilling. Lagerdata kommer fra et
eksempel-API og reserveres ikke, og kurven huskes bare i én nettleser.

Mulige utvidelser: bildekarusell på detaljsiden (produktene har flere bilder), debounce på
søkefeltet, «nylig sett»-liste, automatiske tester av kurvlogikken, og oppdatering av pris og
lager når en lagret kurv åpnes igjen.

## Kilder

- [DummyJSON Products](https://dummyjson.com/docs/products)
- [React Router: createBrowserRouter](https://reactrouter.com/6.30.1/routers/create-browser-router)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
