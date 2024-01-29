import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import Drawing from "@/pages/Drawing";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Drawing />
    </RecoilRoot>
  </React.StrictMode>,
);
