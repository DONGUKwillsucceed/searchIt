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
  stateChanger: Dispatch<SetStateAction<boolean>>;
  rightButtonImage?: string;
  rightButtonLink?: string;
}) {
  const router = useRouter();
  return (
    <header className="sticky inset-x-0 top-0 z-10 bg-white p-4 ">
      <div className="mx-auto flex max-w-3xl justify-between">
        {props.hasBack ? (
          <Link href={"/"}>
            <div className="flex hover:cursor-pointer">
              <Image src={"/logo_noText.svg"} width={26} height={26}></Image>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {props.isImageTitle ? (
          <Image src={props.imageTitleUrl} width={90} height={24}></Image>
        ) : (
          <div className="font-Suit">{props.title}</div>
        )}

        <div className="flex" onClick={() => props.stateChanger(true)}>
          <Image
            src={props.rightButtonImage}
            width={24}
            height={24}
            className="hover:cursor-pointer"
          ></Image>
        </div>
      </div>
    </header>
  );
}
