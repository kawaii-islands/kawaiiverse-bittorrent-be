const Binance = require('binance-api-node').default;

// Authenticated client, can make signed calls
const client = Binance({
    apiKey: '2GLHNHssgtCRRAAWZi29kI5k2Osuz3tC7LMjACXEU6uVSHT3F3sEhYmVMRQQuZQT',
    apiSecret: 'Gy6xWFXfyAn9rfSWclIox0i7f74JEZuwCknKQHheM04sAl0f3BC5Pdnn5fvDOYbu',
});

async function run() {
    console.log(await client.time())
    console.log(await client.candles({symbol: 'BTCUSDT', interval: "5m", startTime: 1673237371000, endTime: 1673238278000}));
}

run();
