import {Interface} from "readline";

const getCoords= () =>{
  if(navigator.geolocation){
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  else{
    console.log('no geolocation');
  }
}
interface IPos{
  lat: number;
  lng: number;
}

export async function getLocation(){
  let pos:IPos = {
    lat: 0,
    lng: 0,
  };

  let position:any = await getCoords();
  pos.lat = position.coords.latitude;
  pos.lng = position.coords.longitude;

  return pos;
}

