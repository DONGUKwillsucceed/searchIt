import { IUserLoc } from "../../src/Interfaces";
import Image from "next/image";
import MyLocation from "../../public/myLocation.svg";

export function MyLocationButton(props: {
  userLoc: IUserLoc;
  setUserLoc: React.Dispatch<React.SetStateAction<IUserLoc>>;
}) {
  return (
    <div className="absolute bottom-0 z-10 flex w-full flex-row-reverse p-5 sm:max-w-3xl ">
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
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
        <Image src={MyLocation} width={30} height={30} />
      </button>
    </div>
  );
}
