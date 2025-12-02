const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const fromCurrencySelect = document.querySelector(".from-select");

let currencyRates = {
  real: 1,
  dolar: 5.25,
  euro: 6.50,
  libra: 7.40,
  yen: 0.036,
  bitcoin: 310000
};

const currencyDetails = {
  real: { name: "Real Brasileiro", image: "./assets/brasil.png", locale: "pt-BR", symbol: "BRL" },
  dolar: { name: "Dólar Americano", image: "./assets/estados-unidos.png", locale: "en-US", symbol: "USD" },
  euro: { name: "Euro", image: "./assets/euro.png", locale: "de-DE", symbol: "EUR" },
  libra: { name: "Libra Esterlina", image: "./assets/libra.png", locale: "en-GB", symbol: "GBP" },
  yen: { name: "Iene Japonês", image: "./assets/yen.png", locale: "ja-JP", symbol: "JPY" },
  bitcoin: { name: "Bitcoin", image: "./assets/bitcoin.png", locale: "en-US", symbol: "BTC" }
};

// Busca taxas em tempo real (BRL por unidade das outras moedas) usando AwesomeAPI
async function fetchCurrencyRates() {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,BTC-BRL');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();

    // Atualiza currencyRates com valores em BRL por unidade
    if (data.USDBRL) currencyRates.dolar = parseFloat(data.USDBRL.bid);
    if (data.EURBRL) currencyRates.euro = parseFloat(data.EURBRL.bid);
    if (data.GBPBRL) currencyRates.libra = parseFloat(data.GBPBRL.bid);
    if (data.JPYBRL) currencyRates.yen = parseFloat(data.JPYBRL.bid);
    if (data.BTCBRL) currencyRates.bitcoin = parseFloat(data.BTCBRL.bid);

    console.log('Taxas atualizadas:', currencyRates);
  } catch (err) {
    console.warn('Não foi possível atualizar taxas em tempo real:', err);
  }
}

// Chama no carregamento e atualiza a cada 5 minutos
window.addEventListener('load', () => {
  fetchCurrencyRates();
  setInterval(fetchCurrencyRates, 5 * 60 * 1000);
});

function convertValues() {
  const inputCurrencyValue = parseFloat(document.querySelector(".input-corrency").value);
  const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
  const currencyValueConverted = document.querySelector(".currency-value");

  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = currencySelect.value;

  if (isNaN(inputCurrencyValue)) {
    alert("Por favor, insira um valor válido.");
    return;
  }

  const brlAmount = inputCurrencyValue * currencyRates[fromCurrency];
  const convertedValue = brlAmount / currencyRates[toCurrency];

  function formatCurrency(value, currencyKey) {
    const details = currencyDetails[currencyKey];
    if (currencyKey === 'bitcoin') {
      return Number(value).toLocaleString(undefined, { minimumFractionDigits: 8, maximumFractionDigits: 8 }) + ' ' + details.symbol;
    }
    return new Intl.NumberFormat(details.locale, {
      style: 'currency',
      currency: details.symbol
    }).format(value);
  }

  currencyValueToConvert.innerHTML = formatCurrency(inputCurrencyValue, fromCurrency);
  currencyValueConverted.innerHTML = formatCurrency(convertedValue, toCurrency);
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