import bannerAd from "../Images/PrinterAd.svg";
export default function Advertism() {
  return (
    <div className="bg-primary mx-auto flex h-20 w-11/12 flex-col items-center justify-center rounded-md">
      <img src={bannerAd} alt="bannerAd" className="h-full w-full" />
    </div>
  );
}
