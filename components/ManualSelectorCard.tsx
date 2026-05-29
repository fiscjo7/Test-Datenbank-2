"use client";

import { useEffect, useMemo, useState } from "react";
import { LanguageSelector, type UiLanguage } from "@/components/LanguageSelector";
import {
  getComponentNameByKey,
  getLanguagesByKey,
  getManualData,
  getUniqueSortedKeys,
  getUrlBySelection,
} from "@/services/manualService";

const translations: Record<UiLanguage, { title: string; description: string }> = {
  de: {
    title: "Betriebsanleitungen",
    description: "Bitte wähle eine Sprache, um die passende Anleitung zu öffnen.",
  },
  en: {
    title: "Operating instructions",
    description: "Please select a language to open the appropriate manual.",
  },
  es: {
    title: "Manuales de instrucciones",
    description: "Selecciona un idioma para abrir el manual correspondiente.",
  },
  fr: {
    title: "Modes d’emploi",
    description: "Veuillez sélectionner une langue pour ouvrir le manuel correspondant.",
  },
  it: {
    title: "Manuali d’uso",
    description: "Seleziona una lingua per aprire il manuale corrispondente.",
  },
  nl: {
    title: "Gebruiksaanwijzingen",
    description: "Selecteer een taal om de juiste handleiding te openen.",
  },
};

export const ManualSelectorCard = () => {
  const [uiLanguage, setUiLanguage] = useState<UiLanguage>("de");
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const entries = useMemo(() => getManualData(), []);
  const keys = useMemo(() => getUniqueSortedKeys(entries), [entries]);

  const languages = useMemo(
    () => getLanguagesByKey(entries, selectedKey),
    [entries, selectedKey]
  );

  const componentName = useMemo(
    () => getComponentNameByKey(entries, selectedKey),
    [entries, selectedKey]
  );

  const translatedContent = translations[uiLanguage];

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);
    const urlKey = url.searchParams.get("key")?.trim();

    if (!urlKey) {
      return;
    }

    if (keys.includes(urlKey)) {
      setSelectedKey(urlKey);
    }
  }, [keys]);

  useEffect(() => {
    setSelectedLanguage("");

    if (!selectedKey) {
      setErrorMessage(
        "Kein Schlüssel gesetzt. Bitte die Seite mit ?key=... öffnen."
      );
      return;
    }

    if (selectedKey && languages.length === 0) {
      setErrorMessage(
        "Für den gewählten Schlüssel sind keine Sprachen verfügbar."
      );
      return;
    }

    setErrorMessage("");
  }, [selectedKey, languages]);

  const canOpenManual = Boolean(selectedKey && selectedLanguage);

  const openManual = () => {
    const url = getUrlBySelection(
      entries,
      selectedKey,
      selectedLanguage
    );

    if (!url) {
      setErrorMessage(
        "Kein Link für die gewählte Kombination gefunden."
      );
      return;
    }

    setErrorMessage("");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 font-['GEA_Sans'] shadow-xl sm:p-8">
      <div className="mb-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
        <div className="hidden sm:block" aria-hidden="true" />

        <img
          src="/gea-logo.jpg"
          alt="GEA Logo"
          className="mx-auto h-12 w-auto sm:h-14"
        />

        <div className="sm:justify-self-end">
          <LanguageSelector
            activeLanguage={uiLanguage}
            onLanguageChange={setUiLanguage}
          />
        </div>
      </div>

      <h1 className="mb-2 text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
        {translatedContent.title}
      </h1>

      <p className="mb-6 font-['Inter'] text-center text-slate-600 sm:text-base">
        {translatedContent.description}
      </p>

      {loading ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 font-['Inter'] text-slate-700">
          Daten werden geladen…
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="component-name"
              className="mb-2 block font-['Inter'] text-sm font-medium text-slate-700"
            >
              Komponente
            </label>

            <input
              id="component-name"
              type="text"
              value={
                selectedKey
                  ? componentName || "Kein Komponentenname hinterlegt"
                  : "Bitte zuerst einen Schlüssel auswählen"
              }
              readOnly
              disabled
              className="h-12 w-full rounded-lg border border-slate-300 px-4 font-['Inter'] text-base text-slate-600 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="language-select"
              className="mb-2 block font-['Inter'] text-sm font-medium text-slate-700"
            >
              Sprache
            </label>

            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(event) =>
                setSelectedLanguage(event.target.value)
              }
              disabled={!selectedKey || languages.length === 0}
              className="h-12 w-full rounded-lg border border-slate-300 px-4 font-['Inter'] text-base focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
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
            className="h-12 w-full rounded-lg bg-[#1AFF80] px-6 font-['Inter'] text-base font-medium text-black transition hover:bg-[#14e66f] disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Anleitung öffnen
          </button>

          {errorMessage && (
            <div className="rounded-lg bg-red-50 p-3 font-['Inter'] text-sm text-red-700">
              {errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};