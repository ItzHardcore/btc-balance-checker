import React, { useCallback, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const BitcoinTransaction = ({ address }) => {
  const [transactions, setTransactions] = useState([]);
  const [eur, setEur] = useState(0);
  const [usd, setUsd] = useState(0);

  const fetchData = useCallback(() => {
    fetch("https://api.blockchain.com/v3/exchange/tickers/BTC-EUR")
      .then((res) => res.json())
      .then((data) => {
        setEur(data.last_trade_price);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("https://api.blockchain.com/v3/exchange/tickers/BTC-USD")
      .then((res) => res.json())
      .then((data) => {
        setUsd(data.last_trade_price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  fetchData();
  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch(
        `https://blockchain.info/rawaddr/${address}?cors=true`
      );
      const data = await res.json();
      setTransactions(data.txs);
    };

    fetchTransactions();
  }, [address]);

  return transactions.length > 0 ? (
    <div style={{ height: "165px", overflow: "overlay" }}>
      <Table className="mb-0" striped hover size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>BTC</th>
            <th>Euros</th>
            <th>Dollars</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.txid}>
              <td>{new Date(transaction.time * 1000).toLocaleDateString()}</td>

              <td style={{ color: transaction.result < 0 ? "red" : "green" }}>
                {transaction.result / 100000000}
              </td>
              <td style={{ color: transaction.result < 0 ? "red" : "green" }}>
                {((transaction.result / 100000000) * eur).toFixed(2)} €
              </td>
              <td style={{ color: transaction.result < 0 ? "red" : "green" }}>
                {((transaction.result / 100000000) * usd).toFixed(2)} $
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  ) : (
    <p className="border-top pt-2 pb-2 mb-0">
      This address has <b>0</b> transactions
    </p>
  );
};

export default BitcoinTransaction;
