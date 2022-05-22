export async function getPrinterDetail(id: string | string[] | undefined) {
  const data = await fetch("https://api.printitcloud.com/PrintZone/" + id);
  const json = await data.json();

  return json;
}
