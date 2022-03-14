import Logo from "../../public/logo.svg";
import Link from "next/link";
import Image from "next/image";

export default function Header_logo() {
  return (
    <div className="sticky top-0 z-10 flex h-16 w-full items-center justify-center bg-white">
      <Link href="/" passHref>
        <a>
          <Image src={Logo} alt="logo"></Image>
        </a>
      </Link>
    </div>
  );
}
