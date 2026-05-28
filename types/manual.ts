export interface RawManualEntry {
  merkmal: string;
  schluessel_ba_m: number | string;
  komponentenname?: string;
  sprache: string;
  link: string;
}

export interface ManualEntry {
  key: string;
  componentName: string;
  language: string;
  url: string;
}
