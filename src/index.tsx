import React from "react";
import ReactDOM from "react-dom";
import "tw-elements";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import App from "./Pages/Landing/App";
import Map from "./Pages/map/map";
import FindByUni from "./Pages/FindPrinter/FindByUni";
import FindByDistrict from "./Pages/FindPrinter/FindByDistrict";

ReactDOM.hydrate(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="map" element={<Map />} />
        <Route path="findByUni" element={<FindByUni />} />
        <Route path="findByDistrict" element={<FindByDistrict />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
