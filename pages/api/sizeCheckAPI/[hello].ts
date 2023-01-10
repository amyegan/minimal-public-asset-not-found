// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
var fs = require("fs"); // Load the filesystem module
const env = process.env.NODE_ENV;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  var fileSizeInBytes = 0;

  var finalFontFilePath,
    finalImageFilePath = "";

  console.log("In Environment: ", env);

  if (env === "development") {
    finalFontFilePath = "public/staticAssets/Roboto-Regular.ttf"; // for dev / localhost only;
    finalImageFilePath = "public/staticAssets/next.svg"; // for dev / localhost only
  } else {
    // Attempt at using path.join as seen in https://vercel.com/guides/how-can-i-use-files-in-serverless-functions
    /* finalFontFilePath = path.join(
      process.cwd(),
      "staticAssets",
      "Roboto-Regular.ttf"
    );
    finalImageFilePath = path.join(process.cwd(), "staticAssets", "next.svg"); */

    // Based on the output source in vercel deployment this is the file path I would expect to work
    /* finalFontFilePath = "staticAssets/Roboto-Regular.ttf";
    finalImageFilePath = "staticAssets/next.svg"; */

    // Based on URL
    finalFontFilePath =
      "https://minimal-public-asset-not-found.vercel.app/staticAssets/Roboto-Regular.ttf";
    finalImageFilePath =
      "https://minimal-public-asset-not-found.vercel.app/staticAssets/next.svg";
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
