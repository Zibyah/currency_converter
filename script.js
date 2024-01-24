document.addEventListener('DOMContentLoaded', () => {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    // Fetch currencies from the provided ExchangeRate-API
    fetch('https://v6.exchangerate-api.com/v6/0736335364775b0036928ff8/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrencySelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrencySelect.appendChild(option2);
            });
        })
        .catch(error => console.error('Error fetching currencies:', error));
});

function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/0736335364775b0036928ff8/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.conversion_rates[toCurrency];
            const result = (amount * exchangeRate).toFixed(2);

            const resultElement = document.getElementById('result');
            resultElement.textContent = `${amount} ${fromCurrency} is equal to ${result} ${toCurrency}`;
        })
        .catch(error => console.error('Error converting currency:', error));
}

// Add click event listener to the "Convert" button
document.getElementById('convertButton').addEventListener('click', convertCurrency);
