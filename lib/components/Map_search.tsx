import backArrow from "../../public/backArrow.svg";
import Link from "next/link";
import Image from "next/image";
export default function Map_search() {
  return (
    <div className="absolute z-10 w-full p-5 sm:max-w-3xl ">
      <div className="flex h-12 w-full items-center rounded-md bg-white p-5 shadow-md">
        <Link href="/" passHref>
          <Image src={backArrow} className="hover:cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
