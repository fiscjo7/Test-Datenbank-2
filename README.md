# Bedienungsanleitungen Web-App

## Schnellstart (ohne Build-Tooling)

Du kannst die App direkt mit Python starten:

```bash
python3 -m http.server 8000
```

Dann im Browser öffnen:

- `http://localhost:8000`

## Funktionsweise

- Die Daten werden aus `data/Datenbank_BA.json` geladen.
- Dropdown 1 zeigt deduplizierte + alphabetisch sortierte `SCHLUESSEL_BA_M`.
- Dropdown 2 zeigt passende, ebenfalls deduplizierte + alphabetisch sortierte Sprachen.
- Der Button **Anleitung öffnen** bleibt deaktiviert, bis beide Auswahlen gültig sind.
- Die URL wird in einem neuen Tab geöffnet.

## Datenquelle

Erwartete Felder pro Eintrag:

- `SCHLUESSEL_BA_M`
- `Sprache`
- `URL`
