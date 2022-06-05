import DropDown from "../../common/components/dropDown";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { areaService } from "../../backend/service/Area.service";
import { IArea, IPrinterData } from "../../common/types/interfaces";
import Header from "../../common/components/header";
import { db } from "../../backend/db";
import axios, { Axios } from "axios";
import AddNewPlace from "../../common/components/addNewPlace";
import ColorOptions from "../../common/components/colorOptions";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [searchArea1, setSearchArea1] = useState("");
  const [searchArea2, setSearchArea2] = useState("");
  const [searchArea3, setSearchArea3] = useState("");
  const [hasBackDrop, setHasBackDrop] = useState(false);
  const [isArea1Open, setIsArea1Open] = useState(false);
  const [isArea2Open, setIsArea2Open] = useState(false);
  const [isArea3Open, setIsArea3Open] = useState(false);
  const [area1, setArea1] = useState<string[]>([]);
  const [area2, setArea2] = useState<string[]>([]);
  const [area3, setArea3] = useState<string[]>([]);

  const [printZones, setPrintZones] = useState<IPrinterData[]>([])
  const [area3Metadata, setArea3Metadata] = useState<IArea[]>([]);

    const router = useRouter();

  useEffect(() => {
    let area1Set = new Set<string>(
      props.data.map((area: IArea) => area.ko_area_1)
    );
    setArea1(Array.from(area1Set));
  }, []);

  useEffect(() => {
    let area2Info = new Array<string>();
    setSearchArea2("");

    props.data.map((area: IArea) => {
      if (area.ko_area_1 === searchArea1) {
        area2Info.push(area.ko_area_2);
      }
    });
    setArea2(area2Info);
  }, [searchArea1]);

  useEffect(() => {
    let areaId;
    setSearchArea3("");
    props.data.map((area: IArea) => {
      if (area.ko_area_1 == searchArea1 && area.ko_area_2 === searchArea2) {
        areaId = area.id;
        console.log(areaId);
        getArea3(areaId.toString());
      }
    });

    function getArea3(areaId: string) {
      axios.get(`/api/areas?area2id=${areaId}`).then((res) => {
        let area3Info = new Array<string>();
        res.data.map((area: IArea) => {
          area3Info.push(area.ko_area_3);
        });
        console.log(res.data);

        setArea3(area3Info);
        setArea3Metadata(res.data);
      });
    }
    if (searchArea2 != "") {
      console.log("ran");
      axios
        .get(`/api/print-zones?areacode=${areaId}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchArea2]);

  useEffect(() => {
    let areaId;
    area3Metadata.map((area: IArea) => {
      if (
        area.ko_area_1 == searchArea1 &&
        area.ko_area_2 === searchArea2 &&
        area.ko_area_3 === searchArea3
      ) {
        areaId = area.id;
        console.log(
          "🚀 ~ file: searchDistrict.tsx ~ line 87 ~ props.data.map ~ areaId",
          areaId
        );

        axios
          .get(`/api/print-zones?areacode=${areaId}`)
          .then((res) => {
            setPrintZones(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }, [searchArea3]);

  function closeAllDropDown() {
    setIsArea1Open(false);
    setIsArea2Open(false);
    setIsArea3Open(false);
    setHasBackDrop(false);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className={`${
          hasBackDrop ? "absolute z-10 h-screen w-full bg-black/20" : "hidden"
        }`}
        onClick={() => closeAllDropDown()}
      />
      <Header hasBack={true} title={"행정구역별"} />
      <div className="mx-auto min-h-[calc(100vh-60px)] w-full max-w-3xl bg-white ">
        <div className="relative z-30 flex rounded-b-md bg-white p-4">
          <DropDown
            searchArea={searchArea1}
            setSearchArea={setSearchArea1}
            hasBackDrop={hasBackDrop}
            setHasBackDrop={setHasBackDrop}
            isAreaOpen={isArea1Open}
            setIsAreaOpen={setIsArea1Open}
            closeAllDropDown={closeAllDropDown}
            area={area1}
            defaultValue="시/도"
          />
          <DropDown
            setSearchArea={setSearchArea2}
            searchArea={searchArea2}
            hasBackDrop={hasBackDrop}
            setHasBackDrop={setHasBackDrop}
            isAreaOpen={isArea2Open}
            setIsAreaOpen={setIsArea2Open}
            closeAllDropDown={closeAllDropDown}
            area={area2}
            defaultValue="구/군/시"
          />
          <DropDown
            setSearchArea={setSearchArea3}
            searchArea={searchArea3}
            hasBackDrop={hasBackDrop}
            setHasBackDrop={setHasBackDrop}
            isAreaOpen={isArea3Open}
            setIsAreaOpen={setIsArea3Open}
            closeAllDropDown={closeAllDropDown}
            area={area3}
            defaultValue="동/면/읍"
          />
        </div>
        <div className="flex min-h-[calc(100vh-136px)] flex-col justify-between p-4">
          {!searchArea2 || searchArea2 === "선택" ? (
            <div className="my-auto flex w-full flex-col items-center">
              <div className=" mb-2 font-bold">해정구역을 선택해주세요</div>
              <div className="font-medium">내 주변 프린터를 보려면</div>
              <div className="font-medium">
                상단 구/군/시까지 선택 해야합니다
              </div>
            </div>
          ) : null}
          <div className="mx-auto h-fit w-full">
            {printZones.map((printer: IPrinterData) => (
              <div
                key={printer.id}
                className="mb-2 flex w-full items-center justify-between border-b-2 last:mb-0 last:border-b-0 hover:cursor-pointer"
                onClick={() => {
                  router.push(`/printers/${printer.id}`);
                }}
              >
                <div className="p-2">
                  <div className="font-bold">{printer.company}</div>
                  <div className="text-xs font-semibold text-gray-400">
                    {printer.address_detail}
                  </div>
                  <div className="flex text-xs">
                    <div className="mr-4"></div>
                    <ColorOptions services={[]} paperSize={[]} serviceType={[]} repPaperSize={"A4"} repServiceType={"인쇄"} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <AddNewPlace />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await areaService.findAllArea2();
  return { props: { data } };
};
