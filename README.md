# Nord — React-nettbutikk

En responsiv demobutikk med produkter fra DummyJSON. Du kan søke, filtrere på kategori,
sortere, bla mellom sider og åpne hvert produkt på egen URL. Handlekurven samler like
produkter, lar deg endre antall og viser totalsum. Kurv og lys/mørk modus huskes lokalt.
Grensesnittet er norsk; produkttekster og kategorinavn kommer fra API-et på engelsk.
Prisene vises i USD uten valutakonvertering.

## Teknologier og valg

- React og Vite for komponenter, lokal utvikling og produksjonsbygg.
- React Router med `createBrowserRouter` for `/`, `/products/:id`, `/cart` og `*`.
  `Layout` bruker `Outlet` for felles header og footer.
- Axios for et samlet API-lag, med egne funksjoner for produkter og kategorier.
- TanStack Query for caching, loading, feil og nye forsøk. Søk, kategori, side og
  sortering er del av query-nøkkelen slik at resultatene holdes adskilt.
- Separate Context-er for handlekurv og tema, med `localStorage` gjennom en egen hook.
- Vanlig CSS med variabler for tema og media queries for mobil, uten CSS-rammeverk.

## Kjør lokalt

Du trenger Node.js 22.12 eller nyere.

```sh
npm install
npm run dev
```

Åpne adressen Vite viser i terminalen (normalt http://127.0.0.1:5173).

```sh
npm run build
npm run preview
```

`npm run build` lager produksjonsfiler i `dist/`.
Ingen API-nøkler eller miljøvariabler er nødvendig.

## Struktur

```text
src/
  api/          Axios og all kommunikasjon med DummyJSON
  components/   Layout, header, søk, produktkort, filtre og andre gjenbrukbare deler
  context/      CartContext og ThemeContext med hver sin provider
  hooks/        useLocalStorage og egne Query-hooks for datahenting
  pages/        Home, ProductDetails, Cart og NotFound
  utils/        Rene funksjoner for kurvlogikk og formatering
  App.jsx       Router og ruter
  main.jsx      Providers og oppstart
  styles.css    Responsiv styling og begge temaer
```

## Viktige detaljer

Søk sendes ved Enter eller søkeknappen. Filtre og sidenummer lagres i URL-en slik
at tilbakeknappen og delte lenker fungerer. Endring av søk, kategori eller sortering
nullstiller sidenummeret. Ugyldig eller for høyt sidenummer håndteres også.

API-et har ikke et kombinert kategori- og søkeendepunkt. Når begge brukes, hentes
hele kategorien med `limit=0`, før søket filtreres og pagineres i API-laget. Ellers
brukes API-ets `limit` og `skip`, og antall sider beregnes fra `total`.

Kurvoppdateringene lager nye objekter og arrays. Penger summeres i hele cent for
å unngå avrundingsfeil. Antallet kan ikke overstige produktets lagerbeholdning.
Hvis lagrede data ikke kan leses som JSON, brukes startverdien. Dersom nettleseren
blokkerer lagring, fungerer kurven fremdeles i den åpne økten.

## Publisering og innlevering

Opprett et GitHub-repo og last opp kildekoden, inkludert `package-lock.json`.
Ikke last opp `node_modules` eller `dist` i repoet.

**Netlify:** Importer GitHub-repoet. Dersom `nettbutikk` ligger i roten av repoet,
velg den som base directory. Byggkommandoen er `npm run build`, og output er `dist`.
`netlify.toml` og `public/_redirects` sørger for at direkte produktlenker fungerer.
Du kan også bygge lokalt og laste opp `dist` med Netlify Drop.

**Vercel:** Importer repoet og velg Vite som preset. Bruk `nettbutikk` som root directory
hvis mappen ligger inne i repoet. `vercel.json` gir fallback til React for direkte URL-er.

Test den publiserte løsningen i privat nettleservindu:

- Åpne forsiden og bla frem og tilbake mellom sider.
- Søk med treff og uten treff; velg kategori og nullstill filtrene.
- Åpne en produktlenke direkte i en ny fane og oppdater siden.
- Legg samme vare i kurven to ganger, endre antall og fjern varen.
- Oppdater siden og kontroller at kurv og tema beholdes.
- Test mobilbredde, mørk modus, en ukjent URL og nettverksfeil.

Lever både GitHub-repoets URL og den offentlige nettsteds-URL-en.

## Avgrensninger og videre arbeid

Dette er en demobutikk uten betaling, innlogging eller bestilling. Lagerdata kommer
fra et eksempel-API og reserveres ikke. Kurven huskes i én nettleser; ingen synkronisering
mellom enheter. Videre arbeid kan være bildekarusell, debounce, nylig sette produkter,
automatiske tester, grundigere validering av lagrede data og oppdatering av pris/lager
ved gjenåpning av kurven.

## Kodegjennomgang

Se [GJENNOMGANG.md](GJENNOMGANG.md) for sammenhengen med undervisningsmaterialet,
forklaring av mindre utvidelser og forslag til rekkefølge når koden skal gjennomgås.

## Dokumentasjon

- [DummyJSON Products](https://dummyjson.com/docs/products)
- [React Router createBrowserRouter](https://reactrouter.com/6.30.1/routers/create-browser-router)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
