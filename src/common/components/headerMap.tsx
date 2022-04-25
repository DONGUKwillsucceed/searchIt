import Logo from "../../../public/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export default function HeaderMap() {
  const router = useRouter();
  return (
    <div className="absolute z-20 flex h-10 w-full justify-center border-b-2 bg-white">
      <Image
        src={Logo}
        alt="logo"
        onClick={() => {
          router.push("/");
        }}
        className="hover:cursor-pointer"
      />
    </div>
  );
}
