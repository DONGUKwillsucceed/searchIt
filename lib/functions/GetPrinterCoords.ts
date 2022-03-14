import React, { useEffect, useState } from "react";
import { IPrinterData } from "../../src/Interfaces";
import { FetchPrinterCoords } from "../api/PrinterCoords";

export default function () {
  const [printerCoords, setPrinterCoords] = React.useState<
    IPrinterData[] | never[]
  >([]);

  useEffect(() => {
    async function GetPrinterCoords() {
      const res = await FetchPrinterCoords();
      setPrinterCoords(res);
    }

    GetPrinterCoords();
  }, []);

  return printerCoords;
}
