import bannerAd from "../../Images/PrinterAd.svg";
export default function Advertism() {
  return (
    <>
      <div className="scrollbar-none flex snap-x snap-mandatory items-center overflow-x-scroll sm:max-w-md md:bg-red-600">
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
      <div className="mt-1 flex">
        <div className=" mr-1 h-2 w-2 rounded-full bg-gray-300"></div>
        <div className=" mr-1 h-2 w-2 rounded-full bg-gray-300"></div>
        <div className=" h-2 w-2 rounded-full bg-gray-300"></div>
      </div>
    </>
  );
}
