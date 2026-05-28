/** @typedef {{ merkmal: string, schluessel_ba_m: number|string, komponentenname: string, sprache: string, link: string }} RawManualEntry */
/** @typedef {{ key: string, componentName: string, language: string, url: string }} ManualEntry */

/** @type {ManualEntry[]} */
let entries = [];

const statusBox = document.getElementById("status");
const controls = document.getElementById("controls");
const errorBox = document.getElementById("error-box");
const keySelect = document.getElementById("key-select");
const componentNameInput = document.getElementById("component-name");
const languageSelect = document.getElementById("language-select");
const openButton = document.getElementById("open-button");

const sortLocale = (a, b) => a.localeCompare(b, "de");
const uniqueSorted = (values) => [...new Set(values)].sort(sortLocale);

const getPrefilledKeyFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("key") ?? "";
  if (/^\d+$/.test(fromQuery)) return fromQuery;

  const hashValue = window.location.hash.replace(/^#/, "");
  if (/^\d+$/.test(hashValue)) return hashValue;

  const segments = window.location.pathname.split("/").filter(Boolean);
  const lastSegment = segments.at(-1) ?? "";
  return /^\d+$/.test(lastSegment) ? lastSegment : "";
};

const normalizeEntry = (raw) => ({
  key: String(raw.schluessel_ba_m),
  componentName: String(raw.komponentenname),
  language: String(raw.sprache),
  url: String(raw.link),
});

const setError = (message) => {
  if (!message) {
    errorBox.classList.add("hidden");
    errorBox.textContent = "";
    return;
  }
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
};

const updateButtonState = () => {
  openButton.disabled = !(keySelect.value && languageSelect.value);
};

const populateSelect = (select, values) => {
  select.innerHTML = '<option value="">Bitte auswählen</option>';
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
};

const getLanguagesByKey = (key) => uniqueSorted(entries.filter((entry) => entry.key === key).map((entry) => entry.language));
const getComponentNameByKey = (key) => entries.find((entry) => entry.key === key)?.componentName ?? "";
const getUrlBySelection = (key, language) => entries.find((entry) => entry.key === key && entry.language === language)?.url ?? null;

const handleKeyChange = () => {
  const key = keySelect.value;
  setError("");

  if (!key) {
    componentNameInput.value = "Bitte zuerst einen Schlüssel auswählen";
    populateSelect(languageSelect, []);
    languageSelect.disabled = true;
    updateButtonState();
    return;
  }

  componentNameInput.value = getComponentNameByKey(key) || "";

  const languages = getLanguagesByKey(key);
  populateSelect(languageSelect, languages);
  languageSelect.disabled = languages.length === 0;

  if (languages.length === 0) {
    setError("Für den gewählten Schlüssel sind keine Sprachen verfügbar.");
  }

  updateButtonState();
};

const handleOpen = () => {
  const url = getUrlBySelection(keySelect.value, languageSelect.value);
  if (!url) {
    setError("Kein Link für die gewählte Kombination gefunden.");
    return;
  }
  setError("");
  window.open(url, "_blank", "noopener,noreferrer");
};

const init = async () => {
  try {
    const response = await fetch("./data/Datenbank_BA.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Die JSON-Daten konnten nicht geladen werden.");

    /** @type {RawManualEntry[]} */
    const raw = await response.json();
    entries = Array.isArray(raw) ? raw.map(normalizeEntry) : [];

    const keys = uniqueSorted(entries.map((entry) => entry.key));
    populateSelect(keySelect, keys);

    const prefilledKey = getPrefilledKeyFromUrl();
    if (prefilledKey && keys.includes(prefilledKey)) {
      keySelect.value = prefilledKey;
      handleKeyChange();
    }

    statusBox.classList.add("hidden");
    controls.classList.remove("hidden");
    updateButtonState();
  } catch (error) {
    statusBox.className = "mb-4 rounded-lg bg-red-50 p-4 text-red-700";
    statusBox.textContent = error instanceof Error ? error.message : "Unbekannter Fehler beim Laden der Daten.";
  }
};

keySelect.addEventListener("change", handleKeyChange);
languageSelect.addEventListener("change", updateButtonState);
openButton.addEventListener("click", handleOpen);

init();
