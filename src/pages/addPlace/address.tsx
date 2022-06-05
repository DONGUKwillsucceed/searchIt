import { Map } from "react-kakao-maps-sdk";
import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "../../common/utils/globalState";
import Image from "next/image";
import { IUserLoc } from "../../common/types/interfaces";
import { MyLocationButton } from "../../common/components/myLocationButton";
import Header from "../../common/components/header";
import Link from "next/link";

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
  const [areacode, setAreacode] = React.useState("");
  const [pinCoord, setPinCoord] = React.useState({
    lat: 37.566,
    lng: 126.978,
  });

  useEffect(() => {
    console.log(areacode);
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
    <div className="min-h-screen bg-gray-100">
      <div className="absolute w-full">
        <Header
          hasBack={true}
          isImageTitle={false}
          title="프린터 위치"
        ></Header>
      </div>
      <div className="relative mx-auto flex max-w-3xl justify-center">
        <div className="absolute top-1/2 left-1/2 z-20">
          <Image src="/currentAddress.svg" width={30} height={30} />
        </div>

        <div className="absolute z-20 mt-20 flex h-10 w-11/12 items-center justify-center rounded-md border-2 bg-white py-1 ">
          {locationAddress}
        </div>

        <div className="absolute bottom-32 right-8 z-20 max-w-3xl ">
          <MyLocationButton
            userLoc={userLoc}
            mapView={mapView}
            setMapView={setMapView}
            mapRef={map}
          />
        </div>
        <div className="absolute bottom-0 z-20 flex w-full max-w-3xl justify-center pb-8">
          <Link
            href={`/addPlace/details?d=${JSON.stringify({
              locationAddress,
              pinCoord,
              areacode,
            })}`}
          >
            <button className="bg-primary font-Suit w-11/12 rounded-md p-4 text-white">
              현위치로 지정
            </button>
          </Link>
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
            const lat = e.getCenter().getLng();
            const lng = e.getCenter().getLat();

            setPinCoord({ lat, lng });

            geoCoder.coord2Address(lat, lng, (result, status) => {
              console.log("🚀 ~ file: address.tsx ~ line 111 ~ result", result);
              if (status === kakao.maps.services.Status.OK) {
                setLocationAddress(result[0].address.address_name);
              }
            });

            geoCoder.coord2RegionCode(lat, lng, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                setAreacode(result[0].code);
              }
            });
          }}
        ></Map>
      </div>
    </div>
  );
}
