import Logo from "../../../public/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export default function HeaderLogo(props: {
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-10 h-16 w-full border-b-2 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-5">
        <div></div>
        <Image
          src={Logo}
          alt="logo"
          onClick={() => {
            router.push("/");
          }}
          className="hover:cursor-pointer"
        />
        <button className="flex" onClick={() => props.setOpenMenu(true)}>
          <Image src={"/menu.svg"} alt="menu" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
