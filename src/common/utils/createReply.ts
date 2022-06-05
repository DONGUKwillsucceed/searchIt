import axios from "axios";
import { Iservices } from "../types/interfaces";

export default function (
  replyId: string,
  userName: string,
  comment: string,
  printZoneId: string
  // tags: string[],
  // services: Iservices[],
  // images: string[]
) {
  const review = {
    id: replyId,

    writer_emoji: "😊",

    writer_name: userName,

    comment: comment,

    printZoneId: printZoneId,

    tags: [],

    services: [],

    images: [],
  };

  axios.post(`/api/print-zones/${printZoneId}/reply`, review);
}
