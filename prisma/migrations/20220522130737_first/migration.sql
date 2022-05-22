-- CreateTable
CREATE TABLE `PrintZoneReplies` (
    `id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `writer_ip` VARCHAR(100) NOT NULL,
    `writer_emoji` VARCHAR(10) NOT NULL,
    `writer_name` VARCHAR(40) NOT NULL,
    `comment` VARCHAR(800) NOT NULL DEFAULT '',
    `PrintZone_id` VARCHAR(64) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'posted',
    `reportCnt` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    INDEX `PrintZoneReplies_FK`(`PrintZone_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrintZone_Tag` (
    `PrintZone_id` VARCHAR(64) NOT NULL,
    `Tag_id` VARCHAR(64) NOT NULL,

    INDEX `PrintZone_Tag_FK_1`(`Tag_id`),
    UNIQUE INDEX `PrintZone_Tag_UN`(`PrintZone_id`, `Tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrintZones` (
    `id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `writer_ip` VARCHAR(100) NOT NULL,
    `company` VARCHAR(200) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `phone_number` VARCHAR(100) NULL,
    `AreaCode_id` VARCHAR(64) NOT NULL,
    `address_detail` VARCHAR(200) NOT NULL,
    `description` VARCHAR(800) NOT NULL DEFAULT '',
    `banner_html` MEDIUMTEXT NULL,
    `priority` VARCHAR(50) NOT NULL DEFAULT 'basic',
    `status` VARCHAR(50) NOT NULL DEFAULT 'scrapped',

    INDEX `PrintZones_FK`(`AreaCode_id`),
    FULLTEXT INDEX `PrintZones_address_detail_idx`(`address_detail`),
    FULLTEXT INDEX `PrintZones_company_idx`(`company`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `weight` INTEGER NOT NULL DEFAULT 10,
    `value` VARCHAR(40) NOT NULL,
    `search_engine_expose` TINYINT NOT NULL DEFAULT 0,
    `TagType_id` VARCHAR(64) NOT NULL DEFAULT '8690c5dd-4246-49bc-9ac1-f9b32eb9a300',

    INDEX `Tag_FK`(`TagType_id`),
    FULLTEXT INDEX `Tag_value_idx`(`value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AreaCode` (
    `id` VARCHAR(64) NOT NULL,
    `ko_area_1` VARCHAR(100) NOT NULL,
    `ko_area_2` VARCHAR(100) NULL,
    `ko_area_3` VARCHAR(100) NULL,
    `en_area_1` VARCHAR(100) NULL,
    `en_area_2` VARCHAR(100) NULL,
    `en_area_3` VARCHAR(100) NULL,
    `en_area_4` VARCHAR(100) NULL,

    FULLTEXT INDEX `AreaCode_ko_area_1_idx`(`ko_area_1`),
    FULLTEXT INDEX `AreaCode_ko_area_2_idx`(`ko_area_2`),
    FULLTEXT INDEX `AreaCode_ko_area_3_idx`(`ko_area_3`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Images` (
    `id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `url` VARCHAR(400) NOT NULL,
    `description` VARCHAR(100) NOT NULL DEFAULT '',
    `description_en` VARCHAR(100) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notices` (
    `id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `is_deleted` TINYINT NULL,
    `title` VARCHAR(100) NOT NULL,
    `type` VARCHAR(20) NOT NULL DEFAULT 'notice',
    `expose_main` TINYINT NOT NULL DEFAULT 0,
    `content_html` MEDIUMTEXT NOT NULL,
    `opengraph_url` VARCHAR(400) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaperSizes` (
    `id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `name` VARCHAR(20) NOT NULL,
    `name_en` VARCHAR(20) NOT NULL DEFAULT '',
    `description` VARCHAR(100) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaperTypes` (
    `id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `paper` VARCHAR(20) NOT NULL,
    `paper_en` VARCHAR(20) NOT NULL DEFAULT '',
    `description` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrintZoneReply_Image` (
    `PrintZoneReply_id` VARCHAR(64) NOT NULL,
    `Image_id` VARCHAR(64) NOT NULL,

    INDEX `PrintZoneReply_Image_FK`(`Image_id`),
    UNIQUE INDEX `PrintZoneReply_Image_UN`(`PrintZoneReply_id`, `Image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrintZoneReply_Tag` (
    `PrintZoneReply_id` VARCHAR(64) NOT NULL,
    `Tag_id` VARCHAR(64) NOT NULL,

    INDEX `PrintZoneReply_Tag_FK_1`(`Tag_id`),
    UNIQUE INDEX `PrintZoneReply_Tag_UN`(`PrintZoneReply_id`, `Tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrintZone_Image` (
    `PrintZone_id` VARCHAR(64) NOT NULL,
    `Image_id` VARCHAR(64) NOT NULL,

    INDEX `PrintZone_Image_FK_1`(`Image_id`),
    UNIQUE INDEX `PrintZone_Image_UN`(`PrintZone_id`, `Image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceType` (
    `id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `type` VARCHAR(20) NOT NULL,
    `type_en` VARCHAR(20) NOT NULL DEFAULT '',
    `description` VARCHAR(100) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Services` (
    `id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `PrintZone_id` VARCHAR(64) NOT NULL,
    `PaperSize_id` VARCHAR(64) NOT NULL,
    `PaperType_id` VARCHAR(64) NOT NULL,
    `ServiceType_id` VARCHAR(64) NOT NULL,
    `color_type` VARCHAR(64) NOT NULL DEFAULT 'color',
    `price` INTEGER UNSIGNED NOT NULL,
    `price_duplex_explicit` INTEGER UNSIGNED NULL,
    `proposed_reply` VARCHAR(64) NULL,
    `status` VARCHAR(20) NOT NULL,

    INDEX `Prices_FK`(`PaperSize_id`),
    INDEX `Prices_FK_1`(`PaperType_id`),
    INDEX `Prices_FK_2`(`PrintZone_id`),
    INDEX `Services_FK`(`ServiceType_id`),
    INDEX `Services_FK_1`(`proposed_reply`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TagTypes` (
    `id` VARCHAR(64) NOT NULL,
    `type` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PrintZoneReplies` ADD CONSTRAINT `PrintZoneReplies_FK` FOREIGN KEY (`PrintZone_id`) REFERENCES `PrintZones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZone_Tag` ADD CONSTRAINT `PrintZone_Tag_FK` FOREIGN KEY (`PrintZone_id`) REFERENCES `PrintZones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZone_Tag` ADD CONSTRAINT `PrintZone_Tag_FK_1` FOREIGN KEY (`Tag_id`) REFERENCES `Tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZones` ADD CONSTRAINT `PrintZones_FK` FOREIGN KEY (`AreaCode_id`) REFERENCES `AreaCode`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_FK` FOREIGN KEY (`TagType_id`) REFERENCES `TagTypes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZoneReply_Image` ADD CONSTRAINT `PrintZoneReply_Image_FK_1` FOREIGN KEY (`PrintZoneReply_id`) REFERENCES `PrintZoneReplies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZoneReply_Image` ADD CONSTRAINT `PrintZoneReply_Image_FK` FOREIGN KEY (`Image_id`) REFERENCES `Images`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZoneReply_Tag` ADD CONSTRAINT `PrintZoneReply_Tag_FK` FOREIGN KEY (`PrintZoneReply_id`) REFERENCES `PrintZoneReplies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZoneReply_Tag` ADD CONSTRAINT `PrintZoneReply_Tag_FK_1` FOREIGN KEY (`Tag_id`) REFERENCES `Tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZone_Image` ADD CONSTRAINT `PrintZone_Image_FK` FOREIGN KEY (`PrintZone_id`) REFERENCES `PrintZones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PrintZone_Image` ADD CONSTRAINT `PrintZone_Image_FK_1` FOREIGN KEY (`Image_id`) REFERENCES `Images`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Services` ADD CONSTRAINT `Services_FK_1` FOREIGN KEY (`proposed_reply`) REFERENCES `PrintZoneReplies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Services` ADD CONSTRAINT `Prices_FK_2` FOREIGN KEY (`PrintZone_id`) REFERENCES `PrintZones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Services` ADD CONSTRAINT `Prices_FK` FOREIGN KEY (`PaperSize_id`) REFERENCES `PaperSizes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Services` ADD CONSTRAINT `Prices_FK_1` FOREIGN KEY (`PaperType_id`) REFERENCES `PaperTypes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Services` ADD CONSTRAINT `Services_FK` FOREIGN KEY (`ServiceType_id`) REFERENCES `ServiceType`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
