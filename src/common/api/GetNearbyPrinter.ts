import React, { useEffect } from "react";
import { INearPrinter, IPrinterData, IUserLoc } from "../../src/Interfaces";

// export default function (userLat: string, userLon: string, m: string) {
//   const [nearbyPrinter, setNearbyPrinter] = React.useState<
//     INearPrinter[] | never[]
//   >([]);

//   useEffect(() => {
//     const fetchNearCoords = async (
//       userLat: string,
//       userLon: string,
//       m: string
//     ) => {
//       const data = await fetch(
//         "https://api.printitcloud.com/PrintZone/nearest?lat=" +
//           userLat +
//           "&lon=" +
//           userLon +
//           "&m=" +
//           m
//       );
//       const json = await data.json();
//       console.log("json = ", json);
//       setNearbyPrinter(json);
//     };

//     fetchNearCoords(userLat, userLon, m);
//   }, []);
//   console.log("nearby Printer =", nearbyPrinter);
//   // return nearbyPrinter;
// }

export default async function GetNearbyPrinter(
  userLoc: IUserLoc | undefined,
  distance: string
) {
  if (userLoc) {
    const data = await fetch(
      "https://api.printitcloud.com/PrintZone/nearest?lat=" +
        userLoc.center.lat +
        "&lon=" +
        userLoc.center.lng +
        "&m=" +
        distance
    );
    const json = await data.json();
    // console.log("json =", json);
    return json;
  }
}
