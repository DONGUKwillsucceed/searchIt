import bannerAd from "../../Images/PrinterAd.svg";
export default function Advertism() {
  return (
    <div className="carousel slide relative" data-bs-ride="carousel">
      <div className="carousel-inner w-ad relative overflow-hidden">
        <div className="carousel-item active relative float-left w-full">
          <img src={bannerAd} alt="bannerAd" className="h-20 w-full" />
        </div>
        <div className="carousel-item relative float-left w-full">
          <img src={bannerAd} alt="bannerAd" className="h-20 w-full" />
        </div>
        <div className="carousel-item relative float-left w-full">
          <img src={bannerAd} alt="bannerAd" className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}
