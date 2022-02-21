import { IUserLoc } from "../Interfaces";
import MyLocation from "../Images/MyLocation.svg";

export function MyLocationButton(props: {
  userLoc: IUserLoc;
  setUserLoc: React.Dispatch<React.SetStateAction<IUserLoc>>;
}) {
  return (
    <div className="absolute bottom-14 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
      <button
        className="text-xl text-gray-800"
        onClick={() =>
          props.setUserLoc(() => ({
            ...props.userLoc,
            center: {
              lat: props.userLoc.center.lat + 0.000000001,
              lng: props.userLoc.center.lng,
            },
            changedCenter: false,
          }))
        }
      >
        <img src={MyLocation}></img>
      </button>
    </div>
  );
}
