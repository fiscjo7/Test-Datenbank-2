export interface RawManualEntry {
  merkmal: string;
  schluessel_ba_m: number | string;
  sprache: string;
  link: string;
}

export interface ManualEntry {
  key: string;
  language: string;
  url: string;
}
