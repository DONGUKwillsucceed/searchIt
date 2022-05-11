-- CreateIndex
CREATE FULLTEXT INDEX `AreaCode_ko_area_1_idx` ON `AreaCode`(`ko_area_1`);

-- CreateIndex
CREATE FULLTEXT INDEX `AreaCode_ko_area_2_idx` ON `AreaCode`(`ko_area_2`);

-- CreateIndex
CREATE FULLTEXT INDEX `AreaCode_ko_area_3_idx` ON `AreaCode`(`ko_area_3`);

-- CreateIndex
CREATE FULLTEXT INDEX `PrintZones_company_idx` ON `PrintZones`(`company`);

-- CreateIndex
CREATE FULLTEXT INDEX `PrintZones_address_detail_idx` ON `PrintZones`(`address_detail`);

-- CreateIndex
CREATE FULLTEXT INDEX `Tag_value_idx` ON `Tag`(`value`);
