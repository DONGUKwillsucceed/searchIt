import { IUserLoc, mapView } from "../types/interfaces";
import Image from "next/image";
import MyLocation from "../../../public/myLocation.svg";
import { ActionCreator } from "easy-peasy";
import React from "react";

export function MyLocationButton(props: {
  userLoc: IUserLoc;
  mapView: mapView;
  setMapView: ActionCreator<mapView>;
}) {
  return (
    <div className="absolute bottom-0 z-10 flex w-full flex-row-reverse p-5 sm:max-w-3xl ">
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
        onClick={() =>
          props.setMapView({
            ...props.mapView,
            center: {
              lat: props.userLoc.center.lat + 0.000000001,
              lng: props.userLoc.center.lng,
            },
          })
        }
      >
        <Image src={MyLocation} width={30} height={30} />
      </button>
    </div>
  );
}
