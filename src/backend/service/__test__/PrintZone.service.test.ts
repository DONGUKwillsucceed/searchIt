import { printZoneService } from '../PrintZone.service'

test('Full Text Search test', async () => {
  const queryResult = await printZoneService.search('종로')
  console.log(queryResult);
});