import { tagService } from "../Tag.service";

test('Test find universities', async () => {
  const univWithCount = await tagService.findManyByTagTypeWithPrintZoneCount('university');
  console.log(univWithCount);
});