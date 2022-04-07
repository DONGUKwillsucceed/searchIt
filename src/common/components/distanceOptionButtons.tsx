import { ActionCreator } from "easy-peasy";
import { SetStateAction } from "react";

export default function DistanceOptionButtons(props: {
  nearbyDistance: string;
  setNearbyDistance: ActionCreator<string>;
}) {
  const distance = [1000, 3000, 5000];

  const buttons = distance.map((distances, index) =>
    props.nearbyDistance === distances.toString() ? (
      <div
        key={index + 1 + "km"}
        className="font-Suit bg-primary-light text-primary mr-2 flex h-7 w-fit items-center justify-center rounded-2xl py-2 px-3 text-sm "
      >
        <button
          onClick={() =>
            props.setNearbyDistance(distances.toString() + "km 이내")
          }
        >
          {(distances / 1000).toString() + "km 이내"}
        </button>
      </div>
    ) : (
      <div
        key={index + 1 + "km"}
        className="font-Suit mr-2 flex h-7 w-fit items-center justify-center rounded-2xl bg-gray-100 py-2 px-3 text-sm text-gray-400 "
      >
        <button onClick={() => props.setNearbyDistance(distances.toString())}>
          {(distances / 1000).toString() + "km 이내"}
        </button>
      </div>
    )
  );
  return (
    <>
      <div className="flex w-full">{buttons}</div>
    </>
  );
}
