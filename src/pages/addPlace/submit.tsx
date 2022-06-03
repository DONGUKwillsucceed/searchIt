import { useRouter } from "next/router";
import Header from "../../common/components/header";
import Image from "next/image";

export default function () {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100">
      <Header hasBack={false} isImageTitle={false} title={"제보 확인"}></Header>
      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-3xl flex-col justify-between bg-white p-4">
        <div className=" my-auto flex flex-col items-center justify-center">
          <Image src="/submitted.svg" width={360} height={200} />
          <div className="font-Suit text-center">
            <div className="font-bold">제보가 완료 되었습니다</div>
            <div>관리자의 승인 후 등록됩니다</div>
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          className="bg-primary w-full rounded py-4 px-3 text-sm text-white "
        >
          {"확인"}
        </button>
      </div>
    </div>
  );
}
