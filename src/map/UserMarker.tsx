import { Map, MapMarker } from "react-kakao-maps-sdk";
import { IUserLoc } from "../Interfaces";

export default function UserMarker(props: { userLoc: IUserLoc }) {
  return (
    <MapMarker
      position={props.userLoc.center}
      image={{
        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
        size: { width: 64, height: 69 },
        options: {
          className: "bg-red-500",
        },
      }}
    />
  );
}
