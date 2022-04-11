import { useState } from "react";

export default function coordsToAddress(lat: number, lng: number) {
  let geoCoder;
  if (typeof window !== "undefined") {
    geoCoder = new window.kakao.maps.services.Geocoder();
  }

  let placeName = "failed";

  geoCoder?.coord2RegionCode(lng, lat, (result: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      return result[0].address_name;
    }
    return placeName;
  });
  // return placeName;
}
