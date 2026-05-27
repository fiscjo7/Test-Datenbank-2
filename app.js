/** @typedef {{ SCHLUESSEL_BA_M: string, Sprache: string, URL: string }} ManualEntry */

/** @type {ManualEntry[]} */
let entries = [];

const statusBox = document.getElementById("status");
const controls = document.getElementById("controls");
const errorBox = document.getElementById("error-box");
const keySelect = document.getElementById("key-select");
const languageSelect = document.getElementById("language-select");
const openButton = document.getElementById("open-button");

const sortLocale = (a, b) => a.localeCompare(b, "de");

const uniqueSorted = (values) => [...new Set(values)].sort(sortLocale);

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

const getLanguagesByKey = (key) => uniqueSorted(entries.filter((entry) => entry.SCHLUESSEL_BA_M === key).map((entry) => entry.Sprache));

const getUrlBySelection = (key, language) => {
  const match = entries.find((entry) => entry.SCHLUESSEL_BA_M === key && entry.Sprache === language);
  return match ? match.URL : null;
};

const handleKeyChange = () => {
  const key = keySelect.value;
  setError("");

  if (!key) {
    populateSelect(languageSelect, []);
    languageSelect.disabled = true;
    updateButtonState();
    return;
  }

  const languages = getLanguagesByKey(key);
  populateSelect(languageSelect, languages);
  languageSelect.disabled = languages.length === 0;

  if (languages.length === 0) {
    setError("Für den gewählten Schlüssel sind keine Sprachen verfügbar.");
  }

  updateButtonState();
};

const handleOpen = () => {
  const key = keySelect.value;
  const language = languageSelect.value;

  if (!key || !language) {
    return;
  }

  const url = getUrlBySelection(key, language);
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
    if (!response.ok) {
      throw new Error("Die JSON-Daten konnten nicht geladen werden.");
    }

    /** @type {ManualEntry[]} */
    const raw = await response.json();
    entries = Array.isArray(raw) ? raw : [];

    const keys = uniqueSorted(entries.map((entry) => entry.SCHLUESSEL_BA_M));
    populateSelect(keySelect, keys);

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
