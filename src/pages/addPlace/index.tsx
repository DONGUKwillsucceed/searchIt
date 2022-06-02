import Header from "../../common/components/header";
import Image from "next/image";
import ButtonPrimary from "../../common/components/buttonPrimary";
import Link from "next/link";

export default function () {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header hasBack={true} isImageTitle={false} title={"제보하기"}></Header>
      <div className="mx-auto flex h-[calc(100vh-56px)] max-w-3xl flex-col justify-between bg-white p-4">
        <div className="my-8 flex h-1/2 flex-col justify-center space-y-8 ">
          <Image src="/noResult.svg" width={100} height={100} />
          <div className="text-center">프린터가 등록되어 있지 않나요?</div>
        </div>
        <Link href={"/addPlace/address"}>
          <button className="bg-primary w-full rounded-md p-4 text-white">
            신규장소 제보하기
          </button>
        </Link>
      </div>
    </div>
  );
}
