import fs from "fs";
import path from "path";

const pagesDirectory = path.join(process.cwd(), "printers");

export function testGetPages() {
  const fileNames = fs.readdirSync(pagesDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
