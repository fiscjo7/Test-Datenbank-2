# Bedienungsanleitungen Web-App

## Setup

1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```
3. Anwendung öffnen:
   - Lokal: `http://localhost:3000`
   - In Codespaces: im Tab **Ports** den Port `3000` öffnen

## Datenquelle

Die zentrale JSON-Datenbank liegt unter:

- `data/Datenbank_BA.json`

Erwartete Struktur pro Eintrag:

- `SCHLUESSEL_BA_M`
- `Sprache`
- `URL`

## Hinweis zu Next.js-Konfiguration

Für Next.js wird `next.config.mjs` verwendet. `next.config.ts` wird von Next.js beim Start **nicht** unterstützt.
