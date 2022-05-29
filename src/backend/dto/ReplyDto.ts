import { Images, Tag } from "@prisma/client";
import { ReplyStatus } from "../types/ReplyStatus";

export interface PrintZoneReply {
  id: string;
  created_at: Date | null;
  writer_emoji: string;
  writer_name: string;
  comment: string;
  PrintZone_id: string;
  status: ReplyStatus;
  reportCnt: number;
  tags: Tag[];
  images: Images[];
};
