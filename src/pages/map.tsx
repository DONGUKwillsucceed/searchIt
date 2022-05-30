import React, { useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
import { IUserLoc } from "../common/types/interfaces";
import UserMarker from "../common/components/userMarker";
import PrinterMarker from "../common/components/printerMarker";
import { MyLocationButton } from "../common/components/myLocationButton";
import MapSearchbar from "../common/components/mapSearchbar";
import { useStoreActions, useStoreState } from "../common/utils/globalState";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { printZoneService } from "../backend/service/PrintZone.service";
import HeaderMap from "../common/components/headerMap";
import SearchAllDesktop from "../common/components/searchAllDesktop";
import Search from "./search";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  console.log(props);
  const [userLoc, setUserLoc] = React.useState<IUserLoc>({
    center: {
      lat: 37.566,
      lng: 126.978,
    },
  });
  const [map, setMap] = React.useState<kakao.maps.Map>();
  const mapView = useStoreState((store) => store.mapView);
  const setMapView = useStoreActions((actions) => actions.setMapView);
  const [isSearching, setIsSearching] = React.useState(false);

  const searchPrinterOnMap = useStoreState((store) => store.searchPrinterOnMap);

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
        if (searchPrinterOnMap.center.lat && searchPrinterOnMap.center.lng) {
          setMapView({
            ...mapView,
            center: {
              lat: searchPrinterOnMap.center.lat,
              lng: searchPrinterOnMap.center.lng,
            },
            viewLevel: 2,
            hasAllowedGeo: true,
          });
        } else {
          setMapView({
            ...mapView,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            viewLevel: 3,
            hasAllowedGeo: true,
          });
        }
      });
    }
  }, []);

  return (
    <main>
      {isSearching === true && <Search />}
      <div className="mx-auto">
        <div>
          <HeaderMap
            title="프린터 찾기"
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
          <div className="absolute right-0 hidden h-screen w-1/4 xl:block">
            <SearchAllDesktop />
          </div>
        </div>
        <MapSearchbar setIsSearching={setIsSearching} />
        <MyLocationButton
          userLoc={userLoc}
          mapView={mapView}
          setMapView={setMapView}
          mapRef={map}
        />
        <Map
          center={mapView.center}
          style={{ width: "100%", height: "calc(var(--vh, 1vh) * 100" }}
          level={mapView.viewLevel}
          onCenterChanged={() => {
            setMapView({
              ...mapView,
              hasChangedCenter: true,
            });
          }}
          onCreate={(map) => {
            setMap(map);
          }}
        >
          <PrinterMarker />
          {mapView.hasAllowedGeo ? <UserMarker userLoc={userLoc} /> : null}
        </Map>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await printZoneService.pzInfomationOnMap();
  return { props: { data } };
};
