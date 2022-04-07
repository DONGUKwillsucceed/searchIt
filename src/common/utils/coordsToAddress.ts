import { useRef } from "react";

export default function coordsToAddress(lat: number, lng: number) {
  let geoCoder;
  if (typeof window !== "undefined") {
    geoCoder = new window.kakao.maps.services.Geocoder();
  }

  let placeName;
  console.log("lat lng", lat, lng);

  geoCoder?.coord2RegionCode(lng, lat, (result: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      console.log("this didnt run?");
      placeName = result[0].address_name;
    }
  });
  return placeName;
}
