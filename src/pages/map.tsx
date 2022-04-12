import React, { useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
import { IUserLoc } from "../common/types/interfaces";
import UserMarker from "../common/components/userMarker";
import PrinterMarker from "../common/components/printerMarker";
import { MyLocationButton } from "../common/components/myLocationButton";
import MapSearch from "../common/components/mapSearch";
import { useStoreActions, useStoreState } from "../common/utils/globalState";
import coordsToAddress from "../common/utils/coordsToAddress";

export default function PrinterMap() {
  const [userLoc, setUserLoc] = React.useState<IUserLoc>({
    center: {
      lat: 37.566,
      lng: 126.978,
    },
  });
  const [map, setMap] = React.useState<kakao.maps.Map>();

  const mapView = useStoreState((store) => store.mapView);
  const setMapView = useStoreActions((actions) => actions.setMapView);

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
      <div className="mx-auto max-w-3xl">
        <MapSearch />
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
          onClick={(e) =>
            coordsToAddress(e.getCenter().getLat(), e.getCenter().getLng())
          }
        >
          <PrinterMarker />
          {mapView.hasAllowedGeo ? <UserMarker userLoc={userLoc} /> : null}
        </Map>
      </div>
    </main>
  );
}
