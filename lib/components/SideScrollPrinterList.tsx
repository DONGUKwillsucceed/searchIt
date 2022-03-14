export default function SideScrollPrinterList() {
  let test: JSX.IntrinsicAttributes[] = [];
  const testAmount = 6;

  for (let i = 0; i < testAmount; i++) {
    test.push(
      <div
        key={i}
        className="w-image last:mr-none mr-4 h-fit snap-start rounded-lg"
      >
        <div
          id="images"
          className="w-image h-image bg-primary rounded-lg"
        ></div>
        <div id="descriptions" className="w-image mt-1">
          <div className="font-Suit font-bold">장소 이름</div>
          <div className="font-Suit">주소</div>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-4 mb-9">
      <div className="font-Suit mb-4 text-xl font-bold ">행정구역</div>
      <div className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto">
        {test}
      </div>
    </div>
  );
}
