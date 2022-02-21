import axios, { Axios, AxiosResponse } from "axios";
import { IPrinterData } from "../Interfaces";

const PrinterURL = "https://api.printitcloud.com/PrintZone/coordinate";

function correctRes(res: AxiosResponse | never[]): res is AxiosResponse {
  return res !== undefined;
}

export async function FetchPrinterData() {
  const response: AxiosResponse<IPrinterData[]> | never[] = await axios
    .get(PrinterURL)
    .catch((err) => {
      console.log(err);
      return [];
    });

  return correctRes(response) ? response.data : response;
}
