import bannerAd from "../../Images/PrinterAd.svg";
export default function Advertism() {
  return (
    <>
      <div className="scrollbar-none mx-4 flex snap-x snap-mandatory items-center overflow-x-scroll rounded-lg sm:max-w-md md:bg-red-600">
        <img
          src={bannerAd}
          className="w-advertisement bg-primary xsm:h-24 mx-auto h-16 snap-start"
        />
        <img
          src={bannerAd}
          className="w-advertisement bg-primary xsm:h-24 mx-auto h-16 snap-start"
        />
        <img
          src={bannerAd}
          className="w-advertisement bg-primary xsm:h-24 mx-auto h-16 snap-start"
        />
      </div>
    </>
  );
}
