import React, { useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
import { IUserLoc } from "../src/common/types/Interfaces";
import UserMarker from "../src/common/components/UserMarker";
import PrinterMarker from "../src/common/components/PrinterMarker";
import { MyLocationButton } from "../src/common/components/MyLocationButton";
import Map_search from "../src/common/components/Map_search";

export default function PrinterMap() {
  const [userLoc, setUserLoc] = React.useState<IUserLoc>({
    center: {
      lat: 37.566,
      lng: 126.978,
    },
    changedCenter: false,
  });

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
    <main>
      <div className="mx-auto max-w-3xl">
        <Map_search />
        <MyLocationButton userLoc={userLoc} setUserLoc={setUserLoc} />
        <Map
          center={userLoc.center}
          style={{ width: "100%", height: "calc(var(--vh, 1vh) * 100" }}
          onCenterChanged={() => {
            setUserLoc(() => ({
              ...userLoc,
              changedCenter: true,
            }));
          }}
        >
          <PrinterMarker />
          <UserMarker userLoc={userLoc} />
        </Map>
      </div>
    </main>
  );
}
