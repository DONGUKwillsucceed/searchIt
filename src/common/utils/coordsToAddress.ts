import { action } from "easy-peasy";
import { useStoreActions, useStoreState } from "./globalState";

export default function coordsToAddress(lat: number, lng: number) {
  let geoCoder;
  const setLocationAddress = useStoreActions(
    (actions) => actions.setLocationAddress
  );

  if (typeof window !== "undefined") {
    geoCoder = new window.kakao.maps.services.Geocoder();
  }

  geoCoder?.coord2Address(lng, lat, (result: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setLocationAddress(result[0].address.address_name);
    }
  });
  // return placeName;
}
