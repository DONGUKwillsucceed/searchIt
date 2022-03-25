import backArrow from "../../public/backArrow.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Map_search() {
  const router = useRouter();

  return (
    <div className="absolute z-10 w-full p-5 sm:max-w-3xl ">
      <div className="flex h-12 w-full items-center rounded-md bg-white p-5 shadow-md">
        <Image
          src={backArrow}
          onClick={() => router.push("/")}
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
