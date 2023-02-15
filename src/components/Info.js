import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Info = () => {
  return (
    <Row className="justify-content-center mt-5">
      <Col xs={6} sm={6}>
        <p>
          This website offers a simple and intuitive way for users to monitor
          the <b>balance</b> and <b>transactions</b> of their Bitcoin addresses
          and easily convert Bitcoin to Euro or Dollar.
        </p>
        <p>
          Powered by the reliables{" "}
          <a
            href="https://www.blockchain.com/explorer/api"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blockchain
          </a>{" "}
          API &{" "}
          <a
            href="https://blockstream.com/satellite-api-documentation/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blockstream
          </a>{" "}
          API, it provides real-time updates and accurate results. I believe in
          the importance of trust and transparency. <b>Don't Trust, Verify!</b>
        </p>
        <p>
          We do not require access to your private keys, which means that you
          have full control over your Bitcoin. <b>It is Safe!</b>
        </p>
      </Col>
    </Row>
  );
};
export default Info;
