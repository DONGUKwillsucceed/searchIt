import Image from "next/image";

export default function PaperSizeDropDown() {
  <button className="flex items-center rounded-md border-2 px-3 py-2">
    <div className="mr-2">A4</div>
    <Image
      src="/dropDownArrow.svg"
      className="rotate-180"
      width={12}
      height={8}
    ></Image>
  </button>;
}