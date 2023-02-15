import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Footer from "./components/Footer";
import PriceChecker from "./components/PriceChecker";
import AddressChecker from "./components/AddressChecker";
import Info from "./components/Info";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <>
    <Header />
    <Container style={{ minHeight: "69vh", marginBottom: "100px" }}>
      <Info />
      <PriceChecker />
      <AddressChecker />
    </Container>
    <Footer />
  </>

  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
