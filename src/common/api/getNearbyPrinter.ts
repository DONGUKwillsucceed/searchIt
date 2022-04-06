import { IUserLoc } from "../types/interfaces";

export default async function getNearbyPrinter(
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
    return json;
  }
}
