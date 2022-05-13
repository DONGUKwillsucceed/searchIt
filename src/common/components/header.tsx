import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SetStateAction, Dispatch } from "react";

export default function Header(props: {
  hasBack?: boolean;
  isArrowBack?: boolean;
  isImageTitle?: boolean;
  imageTitleUrl?: string;
  title?: string | string[] | undefined;
  hasRightButton?: boolean;
  isStateChanger?: boolean;
  stateChanger?: Dispatch<SetStateAction<boolean>>;
  rightButtonImage?: string;
  rightButtonLink?: string;
}) {
  const router = useRouter();
  return (
    <header className="sticky inset-x-0 top-0 z-10 bg-white p-4 ">
      <div className="mx-auto flex max-w-3xl justify-between">
        {props.hasBack ? (
          <button
            onClick={() => router.back()}
            className="flex h-6 w-6 items-center justify-center"
          >
            {props.isArrowBack ? (
              <Image src={"/backArrow.svg"} width={24} height={24}></Image>
            ) : (
              <Image src={"/return.svg"} width={6} height={12}></Image>
            )}
          </button>
        ) : (
          <div />
        )}

        {props.isImageTitle ? (
          <Image src={props.imageTitleUrl} width={77} height={21}></Image>
        ) : (
          <div className="font-Suit">{props.title}</div>
        )}

        {props.hasRightButton ? (
          <div className="flex">
            <Link href={props.rightButtonLink}>
              <div className="flex">
                <Image
                  src={props.rightButtonImage}
                  width={24}
                  height={24}
                  className="hover:cursor-pointer"
                ></Image>
              </div>
            </Link>
          </div>
        ) : (
          <div />
        )}
      </div>
    </header>
  );
}
