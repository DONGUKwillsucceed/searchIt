import Image from "next/image";
export function PriceBox(props: {
  double?: boolean;
  colorType?: string;
  type?: string;
  price?: number;
  Image?: string;
}) {
  return (
    <div
      className={`bg-secondary flex flex-col items-center justify-between rounded-md p-3 ${
        props.double ? "mr-2 w-1/2" : "w-full"
      }`}
    >
      <div className="flex w-full text-xs">
        {props.Image ? (
          <Image src={`${props.Image}`} width={16} height={16} />
        ) : null}
        <div className="ml-2">
          {props.colorType ? (
            <div>{`${props.colorType == "color" ? "컬러" : "흑백"} ${
              props.type
            }`}</div>
          ) : (
            props.type + " 가격"
          )}
        </div>
      </div>
      <div className="grid w-full justify-items-end">
        {props.price || "0"}원
      </div>
    </div>
  );
}
