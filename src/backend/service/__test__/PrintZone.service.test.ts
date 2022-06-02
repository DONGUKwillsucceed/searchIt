import printZones from '../../../pages/api/print-zones';
import { printZoneSearchService } from '../PrintZone.service/PrintZoneSearch.service';

test('Full Text Search test', async () => {
  const queryResult = await printZoneSearchService.search('로구')
  console.log(queryResult);
});