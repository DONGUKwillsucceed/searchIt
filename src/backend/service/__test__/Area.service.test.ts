import { areaService } from "../Area.service";

test("Test Area2 fetching", async () => {
  const areas = await areaService.findAllArea2();
  // console.log(areas.splice(0, 3));
});

test("Test Area3 fetching", async () => {
  const 강화군ID = "2871000000";
  const areas = await areaService.findArea3WithinArea2(강화군ID);
  // console.log(areas.splice(0, 3));
});
