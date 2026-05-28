# Bedienungsanleitungen Web-App

## Schnellstart (ohne Build-Tooling)

```bash
python3 -m http.server 8000
```

Dann im Browser öffnen: `http://localhost:8000`

## JSON-Format

Die Datei `data/Datenbank_BA.json` nutzt dieses Format:

- `merkmal` (z. B. `SCHLUESSEL_BA_M`)
- `schluessel_ba_m` (Nummer oder String)
- `sprache` (z. B. `DE`, `EN`)
- `link` (URL)

Die App normalisiert intern auf:

- `key`
- `language`
- `url`

und dedupliziert/sortiert Schlüssel und Sprachen alphabetisch.


## URL-basierte Vorauswahl

Wenn in der URL nach dem letzten `/` eine Zahl steht (z. B. `.../1006`), wird dieser Wert automatisch im Dropdown `SCHLUESSEL_BA_M` vorausgewählt (falls vorhanden).


## Wichtig bei `python3 -m http.server`

`http.server` unterstützt keine SPA-Rewrites. Daher führt ein Aufruf wie `/1006` zu `404 File not found`, weil der Server eine Datei/Ordner `1006` sucht.

Nutze stattdessen eine dieser URL-Varianten:

- Query-Parameter: `http://localhost:8000/?key=1006`
- Hash: `http://localhost:8000/#1006`

Beide Varianten wählen `SCHLUESSEL_BA_M` automatisch vor.


## Logo

Das GEA-Logo wird mittig oben in der Karte angezeigt (`public/gea-logo.jpg`).
