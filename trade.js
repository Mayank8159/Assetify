const ctxGold = document.getElementById('goldChart').getContext('2d');
const ctxSilver = document.getElementById('silverChart').getContext('2d');
let goldPrices = [];
let goldTokPrices = [];
let silverPrices = [];
let silverTokPrices = [];
let labels = [];
const api_key = "bb7f86230628ada7e9e1144b4da974ed";

const goldChart = new Chart(ctxGold, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Gold Price (USD)',
            data: goldPrices,
            borderColor: 'gold',
            backgroundColor: 'rgba(255, 215, 0, 0.2)',
            borderWidth: 2,
            fill: true,
        }, {
            label: 'GoldTok Price (USD)',
            data: goldTokPrices,
            borderColor: '#6a00ff',
            backgroundColor: 'rgba(106, 0, 255, 0.2)',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

const silverChart = new Chart(ctxSilver, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Silver Price (USD)',
            data: silverPrices,
            borderColor: 'silver',
            backgroundColor: 'rgba(192, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true,
        }, {
            label: 'SilverTok Price (USD)',
            data: silverTokPrices,
            borderColor: '#6a00ff',
            backgroundColor: 'rgba(106, 0, 255, 0.2)',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

// Fetch real-time gold and silver price data
function fetchPrices() {
    fetch('https://api.metalpriceapi.com/v1/latest?api_key=bb7f86230628ada7e9e1144b4da974ed&base=USD&currencies=XAU,XAG')

        .then(response => response.json())
        .then(data => {
            const goldPrice = data.rates.XAU; // Get the gold price in USD
            const goldTokPrice = goldPrice * 1.01; // GoldTok price mimicking gold price with a slight increase
            const silverPrice = data.rates.XAG; // Get the silver price in USD
            const silverTokPrice = silverPrice * 1.01; // SilverTok price mimicking silver price with a slight increase

            // Update GoldTok price in the card
            document.getElementById('goldTokPrice').innerText = `$${goldTokPrice.toFixed(2)}`;
            document.getElementById('silverTokPrice').innerText = `$${silverTokPrice.toFixed(2)}`;

            // Update chart data
            if (labels.length >= 10) {
                labels.shift();
                goldPrices.shift();
                goldTokPrices.shift();
                silverPrices.shift();
                silverTokPrices.shift();
            }

            const now = new Date();
            labels.push(now.toLocaleTimeString());
            goldPrices.push(goldPrice);
            goldTokPrices.push(goldTokPrice);
            silverPrices.push(silverPrice);
            silverTokPrices.push(silverTokPrice);

            goldChart.update();
            silverChart.update();
        })
        .catch(error => console.error('Error fetching price data:', error));
}

// Fetch data every 5 seconds
setInterval(fetchPrices, 5000);
fetchPrices(); // Initial fetch 