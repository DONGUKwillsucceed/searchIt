import { NotFoundError } from "../errors";
import { db } from "../db";

class PrintDetailService {
  async findUnique(tid: string) {
    const queryResult = await db.printZones.findUnique({
      where: {
        id: tid,
      },
      select: {
        id: true,
        company: true,
        address_detail: true,
        phone_number: true,
        banner_html: true,
        description: true,
        PrintZone_Tag: {
          select: {
            Tag: {
              select: {
                value: true,
              },
            },
          },
        },
        PrintZone_Image: {
          select: {
            Images: {
              select: {
                url: true,
              },
            },
          },
        },
        Services: {
          select: {
            color_type: true,
            price: true,
            price_duplex_explicit: true,
            PaperSizes: {
              select: {
                name: true,
                name_en: true,
                description: true,
              },
            },
            PaperTypes: {
              select: {
                paper: true,
                paper_en: true,
                description: true,
              },
            },
          },
        },
      },
    });

    if (!queryResult) {
      throw new NotFoundError("No PrintZone with id");
    }

    const {
      id,
      company,
      address_detail,
      phone_number,
      banner_html,
      description,
    } = queryResult;

    const image_url = queryResult.PrintZone_Image.map((pi) => pi.Images.url);
    const services = queryResult.Services;
    const tag = queryResult.PrintZone_Tag.map((pt) => pt.Tag.value);

    return {
      id,
      company,
      address_detail,
      phone_number,
      banner_html,
      description,
      image_url,
      services,
      tag,
    };
  }
}

export const printDetailService = new PrintDetailService();
