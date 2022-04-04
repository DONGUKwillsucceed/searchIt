import { Map, MapMarker } from "react-kakao-maps-sdk";
import { IUserLoc } from "../types/Interfaces";
import User from "../../../public/user.svg";
import Image from "next/image";

export default function UserMarker(props: { userLoc: IUserLoc }) {
  return (
    <MapMarker
      image={{
        src: "/user.svg",
        size: {
          width: 16,
          height: 16,
        },
      }}
      position={props.userLoc.center}
    />
  );
}
