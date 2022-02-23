import bannerAd from "../../Images/PrinterAd.svg";
export default function Advertism() {
  return (
    <div className="flex h-fit snap-x snap-mandatory items-center overflow-x-scroll rounded-md px-4">
      <div className="flex">
        <div className="bg-primary w-advertisement snap-center rounded-lg">
          <img src={bannerAd} alt="bannerAd" className="w-full" />
        </div>
        <div className="bg-primary w-advertisement snap-center rounded-lg">
          <div className="flex h-full w-full items-center justify-center text-white">
            2
          </div>
        </div>
        <div className="bg-primary w-advertisement snap-center rounded-lg">
          <div className="flex h-full w-full items-center justify-center text-white">
            3
          </div>
        </div>
      </div>
    </div>
  );
}
