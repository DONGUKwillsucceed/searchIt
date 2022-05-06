import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Menu(props: {
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  disableScroll();
  return (
    <>
      <div
        className="fixed z-30 flex h-full w-full flex-row-reverse bg-black/[0.5]"
        onClick={() => {
          props.setOpenMenu(false), enableScroll();
        }}
      >
        <div
          className=" h-full w-3/5 bg-white shadow-md lg:w-1/3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mt-4 mb-9 flex w-full flex-row-reverse px-4">
            <button
              className="flex"
              onClick={() => {
                props.setOpenMenu(false), enableScroll();
              }}
            >
              <Image src={"/close.svg"} width={28} height={28}></Image>
            </button>
          </div>

          <div className="font-Suit ml-8 flex flex-col text-xl">
            <button
              className="mb-6 w-fit text-left"
              onClick={() => {
                router.push("/"), enableScroll();
              }}
            >
              홈
            </button>
            <button
              className="mb-6 w-fit text-left"
              onClick={() => {
                router.push("/map"), enableScroll();
              }}
            >
              지도 보기
            </button>
          </div>

          <div className="font-Suit fixed bottom-0 my-4 mx-8 flex w-full flex-col text-xl">
            <button className="mb-6 w-fit text-left">후원하기</button>
            <button
              className="mb-6 w-fit text-left"
              onClick={() => {
                router.push("/addPlace"), enableScroll();
              }}
            >
              제보/문의
            </button>
            <button className="mb-6 w-fit text-left">Languages</button>
          </div>
        </div>
      </div>
    </>
  );
}

export function disableScroll() {
  document.body.style.overflow = "hidden";
}

export function enableScroll() {
  document.body.style.overflow = "auto";
}
