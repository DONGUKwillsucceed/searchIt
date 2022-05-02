import { printZoneService } from '../PrintZone.service'

test('Full Text Search test', async () => {
  const queryResult = await printZoneService.search('로구')
  console.log(queryResult);
});