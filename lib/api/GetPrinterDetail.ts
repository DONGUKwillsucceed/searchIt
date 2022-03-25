export async function GetPrinterDetail(id: string | string[] | undefined) {
  const data = await fetch("https://api.printitcloud.com/PrintZone/" + id);
  const json = await data.json();

  return json;
}
