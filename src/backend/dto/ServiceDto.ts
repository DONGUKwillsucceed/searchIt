import { PaperSizes, PaperTypes, Services, ServiceType } from "@prisma/client";

export type ServiceDto = Services & {
  PaperSizes: PaperSizes;
  PaperTypes: PaperTypes;
  ServiceType: ServiceType;
};
