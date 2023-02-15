import React, { useCallback, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

const BitcoinTransaction = ({ address }) => {
  const [transactions, setTransactions] = useState([]);
  const [eur, setEur] = useState(0);
  const [usd, setUsd] = useState(0);

  const fetchData = useCallback(() => {
    fetch("https://api.blockchain.com/v3/exchange/tickers/")
      .then((res) => res.json())
      .then((data) => {
        const btcEurPrice = data.find((obj) => obj.symbol === "BTC-EUR");
        const btcUsdPrice = data.find((obj) => obj.symbol === "BTC-USD");
        if (btcEurPrice) {
          setEur(btcEurPrice.last_trade_price);
        }
        if (btcUsdPrice) {
          setUsd(btcUsdPrice.last_trade_price);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  fetchData();
  useEffect(() => {
    const fetchTransactions = async () => {
      const url = `https://blockstream.info/api/address/${address}/txs`;
      const response = await axios.get(url);
      const transactions = response.data;
      const transactionHistory = [];

      let balance = 0;

      for (const transaction of transactions) {
        const date = new Date(
          transaction.status.block_time * 1000
        ).toLocaleDateString();
        const outputs = transaction.vout;

        for (const output of outputs) {
          if (output.scriptpubkey_address === address) {
            balance += output.value;
          }
        }

        const inputs = transaction.vin;
        for (const input of inputs) {
          if (input.prevout.scriptpubkey_address === address) {
            balance -= input.prevout.value;
          }
        }

        const tx = {
          date: date,
          balance: balance / 100000000,
          confirmations: transaction.status.confirmed,
          txid: transaction.txid,
        };
        transactionHistory.push(tx);
      }
      setTransactions(transactionHistory);
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
              <td>{transaction.date}</td>

              <td style={{ color: transaction.balance < 0 ? "red" : "green" }}>
                {transaction.balance}
              </td>
              <td style={{ color: transaction.balance < 0 ? "red" : "green" }}>
                {(transaction.balance * eur).toFixed(2)} €
              </td>
              <td style={{ color: transaction.balance < 0 ? "red" : "green" }}>
                {(transaction.balance * usd).toFixed(2)} $
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
