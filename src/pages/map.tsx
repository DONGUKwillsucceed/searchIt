import React, { useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
import { IUserLoc } from "../common/types/interfaces";
import UserMarker from "../common/components/userMarker";
import PrinterMarker from "../common/components/printerMarker";
import { MyLocationButton } from "../common/components/myLocationButton";
import Map_search from "../common/components/map_search";

export default function PrinterMap() {
  const [userLoc, setUserLoc] = React.useState<IUserLoc>({
    center: {
      lat: 37.578112,
      lng: 127.06783,
    },
    changedCenter: false,
    allowedGeo: false,
    defaultLevel: 6,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLoc((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            allowedGeo: true,
            defaultLevel: 3,
          }));
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }, []);

  return (
    <main>
      <div className="mx-auto max-w-3xl">
        <Map_search />
        <MyLocationButton userLoc={userLoc} setUserLoc={setUserLoc} />
        <Map
          center={userLoc.center}
          style={{ width: "100%", height: "calc(var(--vh, 1vh) * 100" }}
          level={6}
          onCenterChanged={() => {
            setUserLoc(() => ({
              ...userLoc,
              changedCenter: true,
            }));
          }}
        >
          <PrinterMarker />
          {userLoc.allowedGeo ? <UserMarker userLoc={userLoc} /> : null}
        </Map>
      </div>
    </main>
  );
}
