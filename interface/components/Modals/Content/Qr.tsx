"use client";

import React from "react";
import QRCode from "qrcode.react";

type QrProps = {
  qrUrl: string;
};

export const Qr = ({ qrUrl }: QrProps) => {
  return (
    <>
      <div className="p-4 rounded-lg flex justify-center">
        <QRCode
          value={qrUrl}
          size={256}
          bgColor="#ffffff" // Fondo blanco del QR
          fgColor="#000000" // QR negro
          level="H" // Nivel de corrección de errores alto
        />
      </div>
    </>
  );
};

export default Qr;
