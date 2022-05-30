import { Map } from "react-kakao-maps-sdk";
import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "../../common/utils/globalState";
import Image from "next/image";
import { IUserLoc } from "../../common/types/interfaces";
import { MyLocationButton } from "../../common/components/myLocationButton";
import Header from "../../common/components/header";
import HeaderMap from "../../common/components/headerMap";

export default function () {
  const [map, setMap] = React.useState<kakao.maps.Map>();

  const mapView = useStoreState((store) => store.mapView);
  const setMapView = useStoreActions((actions) => actions.setMapView);
  const locationAddress = useStoreState((store) => store.locationAddress);
  const setLocationAddress = useStoreActions(
    (actions) => actions.setLocationAddress
  );
  const [userLoc, setUserLoc] = React.useState<IUserLoc>({
    center: {
      lat: 37.566,
      lng: 126.978,
    },
  });

  let geoCoder: kakao.maps.services.Geocoder;
  if (typeof window !== "undefined") {
    geoCoder = new kakao.maps.services.Geocoder();
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLoc((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }));
      });
    }
  }, []);

  return (
    <div>
      <div className="max-w-3xlz flex justify-center">
        <div className="absolute top-1/2 left-1/2 z-20">
          <Image src="/currentAddress.svg" width={18} height={25} />
        </div>

        {/* <div className="relative bottom-0 z-40 w-full bg-red-300">
          <MyLocationButton
            userLoc={userLoc}
            mapView={mapView}
            setMapView={setMapView}
            mapRef={map}
          />
        </div> */}
        <div className="absolute bottom-0 z-20 w-full">
          <div className="rel"></div>
          <button className="bg-primary absolute bottom-0  z-20 h-12 w-11/12 text-white">
            test
          </button>
        </div>
        <Map
          center={userLoc.center}
          style={{
            width: "768px",
            height: "calc(var(--vh, 1vh) * 100",
          }}
          level={2}
          onCenterChanged={() => {
            setMapView({
              ...mapView,
              hasChangedCenter: true,
            });
          }}
          onCreate={(map) => {
            setMap(map);
          }}
          onIdle={(e) => {
            geoCoder.coord2Address(
              e.getCenter().getLng(),
              e.getCenter().getLat(),
              (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  setLocationAddress(result[0].address.address_name);
                }
              }
            );
          }}
        ></Map>
      </div>
    </div>
  );
}
