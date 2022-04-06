import React, { useEffect, useState } from "react";
import { IUserLoc } from "../../src/Interfaces";

export default function GetUserLocation() {
  const [userLoc, setUserLoc] = React.useState<IUserLoc>();

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

  return userLoc;
}
