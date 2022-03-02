import bannerAd from "../../Images/PrinterAd.svg";
export default function Advertism() {
  return (
    <>
      <div className="scrollbar-none mx-4 flex max-w-full snap-x snap-mandatory items-center overflow-x-scroll rounded-lg md:max-w-md md:bg-red-600">
        <img
          src={bannerAd}
          className="w-advertisement bg-primary mx-auto h-24 snap-start"
        />
        <img
          src={bannerAd}
          className="w-advertisement bg-primary mx-auto h-24 snap-start"
        />
        <img
          src={bannerAd}
          className="w-advertisement bg-primary mx-auto h-24 snap-start"
        />
      </div>
    </>
  );
}
