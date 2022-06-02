import Link from "next/link";

export default function AddNewPlace() {
  return (
    <div className="relative bottom-0 my-2 flex w-full justify-center">
      <Link href="/addPlace/address">
        <div className="flex flex-col items-center space-y-2 text-sm font-semibold text-gray-500">
          <div>아직 등록되지 않은 인쇄소가 있나요?</div>
          <button className="font-Suit bg-primary/20 text-primary flex items-center rounded-md py-2 px-3 text-sm">
            제보하기
          </button>
        </div>
      </Link>
    </div>
  );
}
