import React, { useState, useEffect } from "react";

import QRCode from "react-qr-code";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import { FaBitcoin } from "react-icons/fa";
import BitcoinTransaction from "./BitcoinTransaction";
import CopyToClipboardButton from "./CopyToClipboardButton";

const bitcoinAPI = "https://blockchain.info/balance?active=";
const BalanceAPI = "https://blockchain.info/ticker";

const AddressChecker = () => {
  const [addresses, setAddresses] = useState([""]);
  const [balances, setBalances] = useState([]);
  const [rates, setRates] = useState({});
  const [errors, setErrors] = useState({});

  const handleAddAddress = () => {
    setAddresses([...addresses, ""]);
  };

  const handleRemoveAddress = (index) => {
    setAddresses(
      addresses.filter((address, i) => {
        return i !== index;
      })
    );
  };

  const handleUpdateAddress = (index, address) => {
    setAddresses(
      addresses.map((addr, i) => {
        if (i === index) {
          return address;
        }
        return addr;
      })
    );
  };

  const fetchBalance = async (address) => {
    const response = await fetch(`${bitcoinAPI}${address}`);
    const data = await response.json();
    if (!data[address]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [address]: "Invalid address",
      }));
      return null;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [address]: "" }));
    return data[address].final_balance / 100000000;
  };

  const fetchRates = async () => {
    const response = await fetch(BalanceAPI);
    const data = await response.json();
    setRates(data);
  };

  const convertToEuro = (balance) => {
    console.log(rates);
    return balance * rates.EUR.last;
  };

  const convertToDollar = (balance) => {
    console.log(rates);
    return balance * rates.USD.last;
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleGetBalances = async () => {
    const balancePromises = addresses.map((address) => fetchBalance(address));
    const allBalances = await Promise.all(balancePromises);
    const balanceObjects = allBalances.map((balance, index) => {
      return {
        address: addresses[index],
        euro: convertToEuro(balance),
        dollar: convertToDollar(balance),
        btc: balance,
      };
    });
    setBalances(balanceObjects);
  };

  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col xs={6} sm={6}>
          <h4>Bitcoin Addresses: </h4>
          {addresses.map((address, index) => (
            <Form.Group className="mb-3 " controlId={index}>
              <div style={{ display: "flex" }}>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => handleUpdateAddress(index, e.target.value)}
                />

                {index !== addresses.length - 1 && (
                  <Button
                    className="ms-3"
                    onClick={() => handleRemoveAddress(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              {errors[address] && (
                <Alert className="mt-2" variant="danger">
                  {errors[address]}
                </Alert>
              )}
            </Form.Group>
          ))}

          <Stack direction="horizontal" gap={2}>
            <Button onClick={handleAddAddress}>Add Address</Button>
            <Button onClick={handleGetBalances}>Get Balances</Button>
          </Stack>
        </Col>
      </Row>
      <Row className="justify-content-center mt-2">
        {balances.map(
          (balance) =>
            !errors[balance.address] && (
              <Col
                auto
                className="fluid mt-4 mb-4 "
                style={{ textAlign: "-webkit-center" }}
              >
                <Card style={{ width: "22rem" }}>
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        placeContent: "center",
                      }}
                    >
                      <QRCode
                        size={256}
                        style={{ height: "auto", width: "100px" }}
                        value={balance.address}
                        viewBox={`0 0 256 256`}
                      />
                      <div
                        className="text-start ms-4 "
                        style={{ alignSelf: "center" }}
                      >
                        <h6>
                          <b>BTC Value: {balance.btc} </b>
                          <FaBitcoin />
                        </h6>
                        <h6>
                          <b>EUR Value: {balance.euro.toFixed(2)} €</b>
                        </h6>
                        <h6>
                          <b>USD Value: {balance.dollar.toFixed(2)} $</b>
                        </h6>
                      </div>
                    </div>
                  </Card.Body>
                  <BitcoinTransaction address={balance.address} />

                  <Card.Footer
                    className="text-center text-muted"
                    style={{ fontSize: "13px" }}
                  >
                    {balance.address}
                    {"  "}

                    <CopyToClipboardButton
                      textToCopy={balance.address}
                    ></CopyToClipboardButton>
                  </Card.Footer>
                </Card>
              </Col>
            )
        )}
      </Row>
    </>
  );
};

export default AddressChecker;
