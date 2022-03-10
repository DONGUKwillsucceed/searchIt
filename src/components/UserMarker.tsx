import { Map, MapMarker } from "react-kakao-maps-sdk";
import { IUserLoc } from "../Interfaces";
import User from "../Images/User.svg";

export default function UserMarker(props: { userLoc: IUserLoc }) {
  return (
    <MapMarker
      image={{
        src: User,
        size: {
          width: 16,
          height: 16,
        },
      }}
      position={props.userLoc.center}
    />
  );
}
