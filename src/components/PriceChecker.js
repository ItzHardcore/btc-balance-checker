import { useCallback, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const PriceChecker = () => {
  const [eurRate, setEurRate] = useState(0.0);
  const [usdRate, setUsdRate] = useState(0.0);
  const [loading, setLoading] = useState(true);

  //Converter
  const [btcValue, setBtcValue] = useState(0);
  const [Value, setValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  const handleBtcChange = (event) => {
    const newBtcValue = event.target.value;
    setBtcValue(newBtcValue);
    setValue(convertBtcToCurrency(newBtcValue, selectedCurrency));
  };

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);
    setValue(convertBtcToCurrency(btcValue, newCurrency));
  };

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    setBtcValue(convertCurrencyToBtc(newValue, selectedCurrency));
  };

  const convertBtcToCurrency = (btcValue, currency) => {
    // replace with your own conversion logic based on current exchange rates
    if (currency === "EUR") {
      return (btcValue * eurRate).toFixed(2);
    }
    if (currency === "USD") {
      return (btcValue * usdRate).toFixed(2);
    }
    return 0;
  };

  const convertCurrencyToBtc = (currencyValue, currency) => {
    // replace with your own conversion logic based on current exchange rates

    if (currency === "EUR") {
      return (currencyValue / eurRate).toFixed(8);
    }
    if (currency === "USD") {
      return (currencyValue / usdRate).toFixed(8);
    }
    return 0;
  };

  const fetchData = useCallback(() => {
    fetch("https://api.blockchain.com/v3/exchange/tickers/")
      .then((res) => res.json())
      .then((data) => {
        // Find the objects with the matching symbols
        const btcEurPrice = data.find((obj) => obj.symbol === "BTC-EUR");
        const btcUsdPrice = data.find((obj) => obj.symbol === "BTC-USD");
        if (btcEurPrice) {
          setEurRate(btcEurPrice.last_trade_price);
        }
        if (btcUsdPrice) {
          setUsdRate(btcUsdPrice.last_trade_price);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
    const timeoutFunction = setInterval(fetchData, 120000);
    return () => clearInterval(timeoutFunction);
  }, [fetchData]);

  return (
    <div>
      <Card className="btc-card">
        <Card.Body>
          Bitcoin@ <br />
          <b>{loading ? "Loading..." : eurRate.toFixed(2) + " €"}</b>
          <br />
          <b>{loading ? "Loading..." : usdRate.toFixed(2) + " $"}</b>
        </Card.Body>
      </Card>
      <Card className="converter-card">
        <Card.Body>
          <label>
            BTC:
            <input
              min={0}
              className="form-control"
              type="text"
              value={btcValue}
              onChange={handleBtcChange}
            />
          </label>
          <label>
            Currency:
            <Form.Select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              {/* add other currency options here */}
            </Form.Select>
          </label>
          <label>
            Value:
            <input
              min={0}
              className="form-control"
              type="text"
              value={Value}
              onChange={handleValueChange}
            />
          </label>
        </Card.Body>
      </Card>
    </div>
  );
};
export default PriceChecker;
