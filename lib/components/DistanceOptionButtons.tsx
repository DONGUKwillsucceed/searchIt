import { IDistanceOptions } from "../../src/Interfaces";

export default function DistanceOptionButtons() {
  const distance = ["1km 이내", "3km 이내", "5km 이내"];
  return (
    <>
      <div className="flex w-full">
        {distance.map((distance, index) => (
          <div
            key={(index + 1) * 2 - 1 + "km"}
            className="font-Suit bg-primary-light text-primary mr-2 flex h-7 w-fit items-center justify-center rounded-2xl py-2 px-3 text-sm "
          >
            <button>{distance}</button>
          </div>
        ))}
      </div>
    </>
  );
}
