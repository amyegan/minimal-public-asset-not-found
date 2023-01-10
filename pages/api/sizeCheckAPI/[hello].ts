// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
var fs = require("fs"); // Load the filesystem module
const env = process.env.NODE_ENV;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  var fileSizeInBytes = 0;

  var finalFontFilePath,
    finalImageFilePath = "";

  if (env === "development") {
    finalFontFilePath = "public/Roboto-Regular.ttf"; // for dev / localhost only;
    finalImageFilePath = "public/next.svg"; // for dev / localhost only
  } else {
    console.log("In Environment: ", env);
    finalFontFilePath = path.join(process.cwd(), "Roboto-Regular.ttf");
    finalImageFilePath = path.join(process.cwd(), "next.svg");
  }

  try {
    var stats = fs.statSync(finalFontFilePath);

    if (req.query.hello === "imageFile") {
      stats = fs.statSync(finalImageFilePath);
    }

    fileSizeInBytes = stats.size;
    console.log(fileSizeInBytes);
  } catch (err) {
    console.log(JSON.stringify(err));
  }

  res.status(200).json(fileSizeInBytes);
}
