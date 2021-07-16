import React, { VFC, useState } from "react";
import QRCode from "qrcode.react";

type StringKeyObject = {
  [key: string]: string;
}

const EncryptionType: StringKeyObject = {
  None: "None",
  WPA: "WPA/WPA2",
  WEP: "WEP",
} as const;

type Encryption = typeof EncryptionType[keyof typeof EncryptionType];

type Network = {
  ssid: string;
  encryption: Encryption;
  password: string;
}

export const Home: VFC = () => {
  const [network, setNetwork] = useState<Network>({
    ssid: "",
    encryption: EncryptionType.WPA,
    password:"",
  });

  const qrCodeValue=`WIFI:T:${network.encryption};S:${network.ssid};P:${network.password}`;

  return (
    <>
      <h1>WiFi QR Code</h1>
      <div>
        <label htmlFor="networkName">ネットワーク名</label>
        <input type="text"
          placeholder="SSID"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          value={network.ssid}
          onChange={(e) => setNetwork({ ...network, ssid: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="networkName">パスワード</label>
        <input type="text"
          placeholder="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          value={network.password}
          onChange={(e) => setNetwork({ ...network, password: e.target.value })}
        />
      </div>
      <div>
        {Object.keys(EncryptionType).map((key) => (
          <div key={key}>
            <label htmlFor="encryptionType">{EncryptionType[key]}</label>
            <input
              type="radio"
              name="encrypt-select"
              id="encryptionType"
              value={EncryptionType[key]}
              onChange={(e) => {
                setNetwork({ ...network, encryption: EncryptionType[key] });
              }}
            />
          </div>
        ))}
      </div>
      <QRCode
        value={qrCodeValue}
      />
    </>
  );
};