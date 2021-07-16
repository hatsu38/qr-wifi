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
      <h1 className="font-bold text-gray-700 text-3xl text-center">WiFi QRCode</h1>
      <div className="grid grid-cols-12 max-w-screen-md mx-auto mt-8">
        <div className="space-y-4 col-span-8 pr-2">
          <div className="grid grid-cols-6 items-center">
            <label htmlFor="networkName" className="networkFormLabel col-span-2">ネットワーク名</label>
            <input type="text"
              placeholder="SSID"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              className="col-span-4 networkTextField"
              value={network.ssid}
              onChange={(e) => setNetwork({ ...network, ssid: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-6 items-center">
            <label htmlFor="networkName" className="networkFormLabel col-span-2">パスワード</label>
            <input type="text"
              placeholder="password"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              className="col-span-4 networkTextField"
              value={network.password}
              onChange={(e) => setNetwork({ ...network, password: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-6 items-center" >
          <label htmlFor="encryptionType" className="networkFormLabel col-span-2">種類</label>
          <div className="col-span-4 flex items-center space-x-4">
            {Object.keys(EncryptionType).map((key) => (
              <div key={key} className="flex items-center">
                <input
                  type="radio"
                  name="encrypt-select"
                  id={`encryptionType-${EncryptionType[key]}`}
                  className="mr-1"
                  value={EncryptionType[key]}
                  checked={network.encryption === EncryptionType[key]}
                  onChange={() => {
                    setNetwork({ ...network, encryption: EncryptionType[key] });
                  }}
                />
                <label htmlFor={`encryptionType-${EncryptionType[key]}`} className="networkFormLabel">{EncryptionType[key]}</label>
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className="col-span-4">
        <QRCode
          value={qrCodeValue}
        />
        </div>
      </div>
    </>
  );
};