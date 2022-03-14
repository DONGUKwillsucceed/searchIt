import Link from "next/link";
import Image from "next/image";
import home_active from "../../public/home_active.svg";
import home_disabled from "../../public/home_disabled.svg";
import map_active from "../../public/map_active.svg";
import map_disabled from "../../public/map_disabled.svg";

export default function (props: { currentPage: string }) {
  return (
    <footer className="font-Suit fixed inset-x-0 bottom-0 z-10 mx-auto flex h-fit w-full justify-evenly border-t-2 bg-white p-2">
      <Link href="/">
        <div className="items-center text-gray-500">
          <Image
            src={props.currentPage === "Home" ? home_active : home_disabled}
          ></Image>
        </div>
        <div className="text-center">홈</div>
      </Link>
      <Link href="map">
        <div className="items-center text-gray-500">
          <div className="flex justify-center">
            <Image
              src={props.currentPage === "Map" ? map_active : map_disabled}
            ></Image>
          </div>
        </div>
        <div className="text-center">지도</div>
      </Link>
    </footer>
  );
}
