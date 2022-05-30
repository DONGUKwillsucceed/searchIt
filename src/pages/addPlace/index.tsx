import Header from "../../common/components/header";
import Image from "next/image";

export default function () {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header hasBack={true} isImageTitle={false} title={"제보하기"}></Header>
      <div className="mx-auto flex h-[calc(100vh-56px)] max-w-3xl flex-col justify-between bg-white p-4">
        <div className="my-8 flex flex-col space-y-8 ">
          <Image src="/noGeoLocation.svg" width={100} height={100} />
          <div className="text-center">프린터가 등록되어 있지 않나요?</div>
        </div>
        <div className="flex h-1/2 flex-col space-y-8">
          <button className="h-32 w-full rounded-sm border-2">
            신규장소 제보하기
          </button>
          <button className="h-32 w-full rounded-sm border-2">
            사업주이신가요?
          </button>
        </div>
      </div>
    </div>
  );
}
