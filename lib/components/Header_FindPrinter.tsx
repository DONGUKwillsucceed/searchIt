import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import backArrow from "../../public/backArrow.svg";

export default function Header_District() {
  const router = useRouter();
  const currentPageUrl = router.pathname.split("/")[2];
  const headerTitle = currentPageUrl === "findByUni" ? "대학별" : "행정구역별";
  return (
    <header>
      <nav className="font-Suit fixed inset-x-0 top-0 z-10 mx-auto flex max-w-3xl items-center justify-between bg-white px-5 py-3">
        <Link href="/" passHref>
          <a className="w-6">
            <Image src={backArrow} className="hover:cursor-pointer"></Image>
          </a>
        </Link>
        <div className="font-Suit">{headerTitle}</div>
        <div></div>
      </nav>
    </header>
  );
}
