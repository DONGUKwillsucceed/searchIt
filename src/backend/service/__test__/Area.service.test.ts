import { areaService } from "../Area.service";

test("Test Area2 fetching", async () => {
  const areas = await areaService.findAllArea2();
  // console.log(areas.splice(0, 3));
});

test("Test Area3 fetching", async () => {
  const 광진구ID = "1121500000";
  const areas = await areaService.findArea3WithinArea2(광진구ID);
  // console.log(areas.splice(0, 3));
});
