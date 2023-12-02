import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";

function QR() {
  const { id } = useParams();
  console.log(id);

  const QrCodeDownload = async () => {
    const canvas = await (
      await html2canvas(document.getElementById("canvas"))
    ).toDataURL();

    if (canvas) {
      const a = document.createElement("a");
      a.download = "QrCode.png";
      a.href = canvas;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const QrCodeCopy = async () => {
    const canvas = await (
      await html2canvas(document.getElementById("canvas"))
    ).toDataURL();

    if (canvas) {
      navigator.clipboard.writeText(canvas);
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <p style={{ fontSize: "x-large" }}>QrCode</p>
      </div>
      {!id ? (
        <CircularProgress />
      ) : (
        <div>
          <div>
            <QRCodeCanvas
              id="canvas"
              value={`https://main.dfcfqsves8s5q.amplifyapp.com/BuyProductQR/${id}`}
              size={350}
              style={{ padding: 15 }}
            />
          </div>
          <br />

          <div>
            <button
              style={{ marginRight: 20 }}
              onClick={() => QrCodeDownload()}
            >
              <DownloadIcon />
              Download
            </button>

            <button onClick={() => QrCodeCopy()}>
              <ContentCopyIcon />
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QR;
