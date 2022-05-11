import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HeaderUniv(props: {
  isArrowBack?: boolean;
  isImageTitle?: boolean;
  title?: string;
  hasRightButton?: boolean;
  rightButtonType?: string;
}) {
  const router = useRouter();
  return (
    <header className="sticky inset-x-0 top-0 z-10 bg-white p-4 ">
      <div className="mx-auto flex max-w-3xl justify-between">
        <button onClick={() => router.back()} className="flex items-center">
          {props.isArrowBack ? (
            <Image src={"/backArrow.svg"} width={24} height={24}></Image>
          ) : (
            <Image src={"/return.svg"} width={10} height={16}></Image>
          )}
        </button>
        <div className="font-Suit ">{props.title}</div>
        {props.hasRightButton && (
          <Link href={`/printers/${router.query.printerId}/addReview`}>
            <button>
              <Image src={"/writeReview.svg"} width={24} height={24}></Image>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
