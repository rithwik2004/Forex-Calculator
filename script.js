// script.js
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '2214ee5ed966246123c5cfdb5cb42866'; // Replace with your Fixer API key
    const baseUrl = 'http://data.fixer.io/api/';
    const symbolsUrl = `${baseUrl}symbols?access_key=${apiKey}`;
    const latestRatesUrl = `${baseUrl}latest?access_key=${apiKey}`;
    const forexForm = document.getElementById('forexForm');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const resultDiv = document.getElementById('result');

    // Fetch currency symbols
    fetch(symbolsUrl)
        .then(response => response.json())
        .then(data => {
            const symbols = data.symbols;
            for (const [currency, name] of Object.entries(symbols)) {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = `${name} (${currency})`;
                fromCurrency.appendChild(option.cloneNode(true));
                toCurrency.appendChild(option);
            }
        });

    // Handle form submission
    forexForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        fetch(latestRatesUrl)
            .then(response => response.json())
            .then(data => {
                const rates = data.rates;
                const fromRate = rates[from];
                const toRate = rates[to];

                if (fromRate && toRate) {
                    const convertedAmount = (amount / fromRate) * toRate;
                    resultDiv.textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${to}`;
                } else {
                    resultDiv.textContent = 'Error calculating the rate. Please check the selected currencies.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultDiv.textContent = 'Error calculating the rate. Please try again later.';
            });
    });
});
