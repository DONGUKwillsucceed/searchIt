import Logo from "../../../public/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header_logo() {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-10 flex h-16 w-full items-center justify-center bg-white">
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
