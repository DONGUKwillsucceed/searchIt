import { useRouter } from "next/router";
import Image from "next/image";

export default function (props: { headerTitle: string }) {
  const router = useRouter();

  return (
    <nav className="font-Suit 0 sticky top-0 z-10 mx-auto flex max-w-3xl items-center justify-between bg-white px-5 py-3">
      <Image
        src="/logo_noText.svg"
        width={25}
        height={25}
        onClick={() => {
          router.push("/");
        }}
        className="hover:cursor-pointer"
      ></Image>
      <div className="font-Suit">{props.headerTitle}</div>
      <div></div>
    </nav>
  );
}
