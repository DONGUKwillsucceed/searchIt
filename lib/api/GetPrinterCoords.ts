import React, { useEffect, useState } from "react";
import { IPrinterData } from "../../src/Interfaces";

export default function () {
  const [printerCoords, setPrinterCoords] = React.useState<
    IPrinterData[] | never[]
  >([]);

  useEffect(() => {
    const fetchPCoords = async () => {
      const data = await fetch(
        "https://api.printitcloud.com/PrintZone/coordinate"
      );
      const json = await data.json();
      setPrinterCoords(json);
    };

    fetchPCoords();
  }, []);
  return printerCoords;
}
