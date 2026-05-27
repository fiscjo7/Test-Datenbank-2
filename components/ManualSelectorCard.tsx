"use client";

import { useEffect, useMemo, useState } from "react";
import { getLanguagesByKey, getManualData, getUniqueSortedKeys, getUrlBySelection } from "@/services/manualService";

export const ManualSelectorCard = () => {
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const entries = useMemo(() => getManualData(), []);
  const keys = useMemo(() => getUniqueSortedKeys(entries), [entries]);
  const languages = useMemo(() => getLanguagesByKey(entries, selectedKey), [entries, selectedKey]);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setSelectedLanguage("");
    if (selectedKey && languages.length === 0) {
      setErrorMessage("Für den gewählten Schlüssel sind keine Sprachen verfügbar.");
      return;
    }
    setErrorMessage("");
  }, [selectedKey, languages]);

  const canOpenManual = Boolean(selectedKey && selectedLanguage);

  const openManual = () => {
    const url = getUrlBySelection(entries, selectedKey, selectedLanguage);

    if (!url) {
      setErrorMessage("Kein Link für die gewählte Kombination gefunden.");
      return;
    }

    setErrorMessage("");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl sm:p-8">
      <h1 className="mb-2 text-2xl font-semibold text-slate-900 sm:text-3xl">Bedienungsanleitungen finden</h1>
      <p className="mb-6 text-sm text-slate-600 sm:text-base">
        Wähle einen Schlüssel und anschließend eine Sprache, um die passende Anleitung zu öffnen.
      </p>

      {loading ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">Daten werden geladen…</div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="key-select" className="mb-2 block text-sm font-medium text-slate-700">
              SCHLUESSEL_BA_M
            </label>
            <select
              id="key-select"
              value={selectedKey}
              onChange={(event) => setSelectedKey(event.target.value)}
              className="h-12 w-full rounded-lg border border-slate-300 px-4 text-base focus:border-blue-500 focus:outline-none"
            >
              <option value="">Bitte auswählen</option>
              {keys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="language-select" className="mb-2 block text-sm font-medium text-slate-700">
              Sprache
            </label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(event) => setSelectedLanguage(event.target.value)}
              disabled={!selectedKey || languages.length === 0}
              className="h-12 w-full rounded-lg border border-slate-300 px-4 text-base focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value="">Bitte auswählen</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={openManual}
            disabled={!canOpenManual}
            className="h-12 w-full rounded-lg bg-blue-600 px-6 text-base font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Anleitung öffnen
          </button>

          {errorMessage && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errorMessage}</div>}
        </div>
      )}
    </div>
  );
};
