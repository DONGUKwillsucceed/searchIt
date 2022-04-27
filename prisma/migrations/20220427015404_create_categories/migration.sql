-- CreateTable
CREATE TABLE `PrintZoneReplies` (
    `PrintZoneReplyID` VARCHAR(64) NOT NULL,
    `CreatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `PriceA4Color` INTEGER UNSIGNED NULL,
    `PriceA4Mono` INTEGER UNSIGNED NULL,
    `Comment` VARCHAR(400) NULL,
    `PrintZoneID` VARCHAR(64) NOT NULL,

    INDEX `PrintZoneReplies_FK`(`PrintZoneID`),
    PRIMARY KEY (`PrintZoneReplyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrintZone_Tag` (
    `PrintZoneID` VARCHAR(64) NOT NULL,
    `TagID` VARCHAR(64) NOT NULL,

    INDEX `PrintZone_Tag_FK_1`(`TagID`),
    UNIQUE INDEX `PrintZone_Tag_UN`(`PrintZoneID`, `TagID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrintZones` (
    `PrintZoneID` VARCHAR(64) NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `UpdatedAt` DATETIME(0) NOT NULL,
    `Company` VARCHAR(200) NOT NULL,
    `Latitude` DOUBLE NOT NULL,
    `Longitude` DOUBLE NOT NULL,
    `PriceA4Black` INTEGER UNSIGNED NULL,
    `PriceA4Color` INTEGER UNSIGNED NULL,
    `PhoneNumber` VARCHAR(100) NULL,
    `Description` VARCHAR(800) NULL,
    `PrinterCustomHTML` MEDIUMTEXT NULL,
    `Priority` VARCHAR(50) NOT NULL DEFAULT 'basic',
    `Status` VARCHAR(50) NOT NULL DEFAULT 'scrapped',
    `AddressKeyID` VARCHAR(64) NULL,

    PRIMARY KEY (`PrintZoneID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `TagID` VARCHAR(64) NOT NULL,
    `Value` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`TagID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PrintZoneReplies` ADD CONSTRAINT `PrintZoneReplies_FK` FOREIGN KEY (`PrintZoneID`) REFERENCES `PrintZones`(`PrintZoneID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZone_Tag` ADD CONSTRAINT `PrintZone_Tag_FK` FOREIGN KEY (`PrintZoneID`) REFERENCES `PrintZones`(`PrintZoneID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZone_Tag` ADD CONSTRAINT `PrintZone_Tag_FK_1` FOREIGN KEY (`TagID`) REFERENCES `Tag`(`TagID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
