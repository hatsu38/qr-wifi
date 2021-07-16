import React, { VFC } from "react";
import ReactDOM from "react-dom";
import QRCode from 'qrcode.react';

import "~/styles/index.css";


export const Index: VFC = () => {
  return (
    <QRCode value="http://facebook.github.io/react/" />
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));
