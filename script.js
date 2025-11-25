const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const fromCurrencySelect = document.querySelector(".from-select");

const currencyRates = {
  real: 1,
  dolar: 5.00,
  euro: 6.50,
  libra: 7.40,
  yen: 0.036,
  bitcoin: 310000,
  pesoArgentino: 0.026,
  pesoChileno: 0.0065
};

const currencyDetails = {
  real: { name: "Real Brasileiro", image: "./assets/brasil.png", locale: "pt-BR", symbol: "BRL" },
  dolar: { name: "Dólar Americano", image: "./assets/estados-unidos.png", locale: "en-US", symbol: "USD" },
  euro: { name: "Euro", image: "./assets/euro.png", locale: "de-DE", symbol: "EUR" },
  libra: { name: "Libra Esterlina", image: "./assets/libra.png", locale: "en-GB", symbol: "GBP" },
  yen: { name: "Iene Japonês", image: "./assets/yen.png", locale: "ja-JP", symbol: "JPY" },
  bitcoin: { name: "Bitcoin", image: "./assets/bitcoin.png", locale: "en-US", symbol: "BTC" },
  pesoArgentino: { name: "Peso Argentino", image: "./assets/argentina.png", locale: "es-AR", symbol: "ARS" },
  pesoChileno: { name: "Peso Chileno", image: "./assets/chile.png", locale: "es-CL", symbol: "CLP" }
};

async function convertValues() {
  const inputCurrencyValue = parseFloat(document.querySelector(".input-corrency").value);
  const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
  const currencyValueConverted = document.querySelector(".currency-value");

  /*const data = await fetch("https://api.exchangerate-api.com/v4/latest/BRL");*/

  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = currencySelect.value;

  if (isNaN(inputCurrencyValue)) {
    alert("Por favor, insira um valor válido.");
    return;
  }

  const brlAmount = inputCurrencyValue * currencyRates[fromCurrency];
  const convertedValue = brlAmount / currencyRates[toCurrency];

  currencyValueToConvert.innerHTML = new Intl.NumberFormat(currencyDetails[fromCurrency].locale, {
    style: 'currency',
    currency: currencyDetails[fromCurrency].symbol
  }).format(inputCurrencyValue);

  currencyValueConverted.innerHTML = new Intl.NumberFormat(currencyDetails[toCurrency].locale, {
    style: 'currency',
    currency: currencyDetails[toCurrency].symbol
  }).format(convertedValue);
  function applyHighlight() {
  const fromValue = document.querySelector(".currency-value-to-convert");
  const toValue = document.querySelector(".currency-value");

  fromValue.classList.add("highlight");
  toValue.classList.add("highlight");

  setTimeout(() => {
    fromValue.classList.remove("highlight");
    toValue.classList.remove("highlight");
  }, 400);
}
applyHighlight();
}

function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImage = document.querySelector(".corrency-img");
  const selected = currencyDetails[currencySelect.value];

  currencyName.textContent = selected.name;
  currencyImage.src = selected.image;

  convertValues();
}
function changeFromCurrency() {
  const fromCurrencyName = document.querySelector(".from-currency-name");
  const fromCurrencyImage = document.querySelector(".from-currency-img");

  const selected = currencyDetails[fromCurrencySelect.value];
  fromCurrencyName.textContent = selected.name;
  fromCurrencyImage.src = selected.image;

  convertValues();
}
fromCurrencySelect.addEventListener("change", changeFromCurrency);
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);









