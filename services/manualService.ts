import rawData from "@/data/Datenbank_BA.json";
import { ManualEntry } from "@/types/manual";

const manualData = rawData as ManualEntry[];

export const getManualData = (): ManualEntry[] => manualData;

export const getUniqueSortedKeys = (entries: ManualEntry[]): string[] =>
  [...new Set(entries.map((entry) => entry.SCHLUESSEL_BA_M))].sort((a, b) => a.localeCompare(b, "de"));

export const getLanguagesByKey = (entries: ManualEntry[], key: string): string[] =>
  [...new Set(entries.filter((entry) => entry.SCHLUESSEL_BA_M === key).map((entry) => entry.Sprache))].sort((a, b) =>
    a.localeCompare(b, "de")
  );

export const getUrlBySelection = (entries: ManualEntry[], key: string, language: string): string | null => {
  const match = entries.find((entry) => entry.SCHLUESSEL_BA_M === key && entry.Sprache === language);
  return match?.URL ?? null;
};
