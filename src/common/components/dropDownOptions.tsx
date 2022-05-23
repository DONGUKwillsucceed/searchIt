import { Dispatch, SetStateAction } from "react";

export default function (
  area: Array<string>,
  setName: Dispatch<SetStateAction<string>>
) {
  const options = area.map((name) => {
    <div
      className="border-primary flex h-8 items-center justify-center border-b-2 last:border-none"
      onClick={() => setName(`${name}`)}
    >
      {name}
    </div>;
  });
}
