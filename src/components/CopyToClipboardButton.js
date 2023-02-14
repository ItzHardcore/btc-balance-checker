import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function CopyToClipboardButton({ textToCopy }) {
  const [copied, setCopied] = useState(false);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(1);
      await delay(5000);
      setCopied(false);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <OverlayTrigger
        key="top"
        placement="top"
        overlay={
          <Tooltip id="tooltip-top">{copied ? "Copied!" : "Copy!"}</Tooltip>
        }
      >
        <a className="copy" onClick={copyToClipboard}>
          <FaCopy />
        </a>
      </OverlayTrigger>
    </>
  );
}

export default CopyToClipboardButton;
