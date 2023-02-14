import React from "react";
import CopyToClipboardButton from "./CopyToClipboardButton";
import { SiBuymeacoffee } from "react-icons/si";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

const Footer = () => (
  <footer
    className="border-top text-center mt-3"
    style={{
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white",
      padding: "1rem",
    }}
  >
    <p>
      <a
        style={{ fontSize: "35px", margin: "10px" }}
        href="https://www.linkedin.com/in/brunomosilva/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
      </a>
      <a
        style={{ fontSize: "35px", margin: "10px" }}
        href="https://github.com/ItzHardcore"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithubSquare />
      </a>
    </p>
    <p>
      <SiBuymeacoffee /> <b>Buy me a coffee?</b>
      <br /> bc1qaja9lynx7jnddnxpsrddz27ez8qecgqpsk90ng{" "}
      <CopyToClipboardButton textToCopy="bc1qaja9lynx7jnddnxpsrddz27ez8qecgqpsk90ng"></CopyToClipboardButton>
    </p>
  </footer>
);

export default Footer;
