import bannerAd from "../Images/PrinterAd.svg";
export default function Advertism() {
  return (
    <div className=" flex h-20 w-full flex-col items-center justify-center rounded-md px-4">
      <img src={bannerAd} alt="bannerAd" className="h-full w-full" />
    </div>
  );
}
