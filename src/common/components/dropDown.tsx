import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

export default function DropDown(props: {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  area1?: Array<string>;
  area?: Array<string> | undefined;
  defaultValue?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const options = props.area?.map((name) => {
    return (
      <div
        className="border-primary flex h-8 items-center justify-center border-b-2 last:border-none"
        onClick={() => props.setName(`${name}`)}
        key={name}
      >
        {name}
      </div>
    );
  });

  return (
    <div>
      <button
        className="border-primary font-Suit text-primary relative z-10 my-2 mr-2 h-8 w-24 rounded-md border-2 bg-white px-2 py-1 text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between">
          <div>{props.name ? props.name : props.defaultValue}</div>
          <div className="mx-1">
            <Image src="/dropDownBlue.svg" width={8} height={8} />
          </div>
        </div>
        {isOpen && (
          <div>
            <div className="border-primary absolute -left-0.5 top-7 w-24 rounded-b-md border-2 bg-white">
              {options}
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
