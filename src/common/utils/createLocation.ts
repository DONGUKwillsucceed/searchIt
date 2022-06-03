import axios from "axios";

export default function (companyName: string) {
  const location = {
    id: uuid(),
    company: "",
    latitude: 0,
    longitude: 0,
    phone_number: "",
    area_code: "",
    address_detail: "",
    description: "",
    tags: [],
    services: [],
    reportedBy: "",
  };

  axios.post("/api/printzones", location);
}
