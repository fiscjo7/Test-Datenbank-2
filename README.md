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
