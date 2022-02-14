import axios from "axios";
import { IPrinterData } from "../Interfaces";

const PrinterURL = 'https://api.printitcloud.com';

export async function fetchData(){
  console.log('fetching data');
  axios.get(PrinterURL+'/PrintZone/coordinate').catch(err => {
    console.log(err);
    return []
  }).then(res => 
    console.log(res));
  
  // return res.data
}