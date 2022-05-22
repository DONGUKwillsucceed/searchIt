export default async function getPrinterCoords() {
  const data = await fetch("https://api.printitcloud.com/PrintZone/coordinate");

  const json = await data.json();
  return json;
}
