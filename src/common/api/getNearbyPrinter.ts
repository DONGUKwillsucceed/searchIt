export default async function getNearbyPrinter(
  lat: number,
  lng: number,
  distance: string
) {
  const data = await fetch(
    "https://api.printitcloud.com/PrintZone/nearest?lat=" +
      lat.toString() +
      "&lon=" +
      lng.toString() +
      "&m=" +
      distance
  );
  const json = await data.json();
  return json;
}
