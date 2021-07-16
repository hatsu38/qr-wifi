import React, { VFC, useState } from "react";
import QRCode from "qrcode.react";

type StringKeyObject = {
  [key: string]: string;
}

const EncryptionType: StringKeyObject = {
  None: "nopass",
  WPA: "WPA",
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
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(false);

  const qrCodeValue=`WIFI:T:${network.encryption};S:${network.ssid};P:${network.password};;`;
  const fgColor = (!network.ssid || !network.password) ? "#ddd" : "#000";

  return (
    <>
      <h1 className="font-bold text-gray-700 text-3xl text-center mt-6">WiFi QRCode</h1>
      <div className="grid grid-cols-12 max-w-screen-md mt-12 mx-3 md:mx-auto">
        <div className="space-y-4 col-span-12 md:col-span-8 pr-2">
          <div className="grid grid-cols-6 items-center">
            <label htmlFor="networkName" className="networkFormLabel col-span-2">ネットワーク名</label>
            <input type="text"
              id="networkName"
              placeholder="SSID"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              className="col-span-4 networkTextField"
              value={network.ssid}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNetwork({ ...network, ssid: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-6 items-center">
            <label htmlFor="password" className="networkFormLabel col-span-2">パスワード</label>
            <input type={hiddenPassword ? "password" : "text"}
              id="password"
              placeholder="password"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              className="col-span-4 networkTextField"
              value={network.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNetwork({ ...network, password: e.target.value })}
            />
            <div className="col-start-3 col-span-4 items-center">
              <label htmlFor="hiddenPassword" className="text-gray-500 text-sm font-bold">非表示にする</label>
              <input type="checkbox"
                id="hiddenPassword"
                placeholder="password"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                className="networkTextField col-span-4"
                defaultChecked={hiddenPassword}
                onChange={() => setHiddenPassword(!hiddenPassword)}
              />
            </div>
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
                    value={key}
                    checked={network.encryption === EncryptionType[key]}
                    onChange={() => {
                      setNetwork({ ...network, encryption: EncryptionType[key] });
                    }}
                  />
                  <label htmlFor={`encryptionType-${EncryptionType[key]}`} className="networkFormLabel">{key}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-6 col-span-12 md:col-span-4 md:mt-0">
          <QRCode
            value={qrCodeValue}
            fgColor={fgColor}
          />
        </div>
      </div>
    </>
  );
};