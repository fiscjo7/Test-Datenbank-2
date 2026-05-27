import rawData from "@/data/Datenbank_BA.json";
import { ManualEntry, RawManualEntry } from "@/types/manual";

const toManualEntry = (entry: RawManualEntry): ManualEntry => ({
  key: String(entry.schluessel_ba_m),
  language: String(entry.sprache),
  url: String(entry.link),
});

const manualData = (rawData as RawManualEntry[]).map(toManualEntry);

export const getManualData = (): ManualEntry[] => manualData;

export const getUniqueSortedKeys = (entries: ManualEntry[]): string[] =>
  [...new Set(entries.map((entry) => entry.key))].sort((a, b) => a.localeCompare(b, "de"));

export const getLanguagesByKey = (entries: ManualEntry[], key: string): string[] =>
  [...new Set(entries.filter((entry) => entry.key === key).map((entry) => entry.language))].sort((a, b) =>
    a.localeCompare(b, "de")
  );

export const getUrlBySelection = (entries: ManualEntry[], key: string, language: string): string | null => {
  const match = entries.find((entry) => entry.key === key && entry.language === language);
  return match?.url ?? null;
};
