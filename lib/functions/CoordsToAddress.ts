import { useEffect, useRef, useState } from "react";

export default function CoordsToAddress(lat: number, lng: number) {
  const address = useRef<string>("");
  var geoCoder;
  if (typeof window !== "undefined") {
    geoCoder = new window.kakao.maps.services.Geocoder();
  }

  let placeName;
  console.log("lat lng", lat, lng);

  geoCoder?.coord2RegionCode(lng, lat, (result: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // return result[0].address_name;
      console.log("this didnt run?");
      placeName = result[0].address_name;
    }
  });
  return placeName;
}
