"use client";
import React, { useState } from "react";

const NFCReaderPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [scanning, setScanning] = useState(false);

  const startNFCScan = async () => {
    if ("NDEFReader" in window) {
      const nfcReader = new (window as any).NDEFReader();

      try {
        setScanning(true);
        setError("");

        await nfcReader.scan();

        nfcReader.onreading = ({ message, serialNumber }: any) => {
          setMessage(serialNumber);
          setScanning(false);
          setSuccess(true);
          sendDataToBackend(serialNumber);
        };

        nfcReader.onerror = (err: any) => {
          setError("Error during NFC reading. Please try again.");
          setScanning(false);
        };
      } catch (err: any) {
        if (err.name === "NotAllowedError") {
          setError(
            "NFC permissions are required for this feature. Please enable NFC and reload the page."
          );
        } else {
          setError(
            "Error starting NFC scan. Please ensure NFC is enabled and try again."
          );
        }
        setScanning(false);
      }
    } else {
      setError("Web NFC API is not available on this device.");
    }
  };

  const sendDataToBackend = async (data: string) => {
    try {
      await fetch("/api/nfc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nfcData: data }),
      });
    } catch (error) {
      setError("Error sending data to backend.");
    }
  };

  return (
    <div
      className={`container flex flex-col items-center justify-center min-h-screen transition-colors duration-500 ${
        error ? "bg-red-500" : success ? "bg-green-500" : "bg-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4 text-white">NFC Reader</h1>
      {scanning ? (
        <p className="text-greenMatrix px-10 text-center">
          Scanning for NFC tags... Please hold your tag near the device.
        </p>
      ) : message ? (
        <p className="text-white">NFC Data: {message}</p>
      ) : (
        <>
          <p className="text-white">
            {error ? error : "Press the button to scan an NFC tag..."}
          </p>
          <button
            onClick={startNFCScan}
            className="bg-greenMatrix text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
          >
            Start NFC Scan
          </button>
        </>
      )}
    </div>
  );
};

export default NFCReaderPage;
