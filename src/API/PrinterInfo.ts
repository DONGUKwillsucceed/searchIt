import axios from "axios";
import { IPrinterData } from "../Interfaces";

const PrinterURL = 'https://api.printitcloud.com/PrintZone/coordinate';

export async function FetchPrinterData(){
  let response_data:any ={};
  const response = await axios.get(PrinterURL)
  .then(function (response) {
    response_data = response.data
  });
  console.log('response_data =', response_data);
  return response_data;
}