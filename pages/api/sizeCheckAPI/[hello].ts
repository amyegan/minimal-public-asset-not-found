// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
var fs = require("fs"); // Load the filesystem module

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  var stats = fs.statSync("public/Roboto-Regular.ttf");

  if (req.query.hello === "imageFile") {
    stats = fs.statSync("public/next.svg");
  }

  var fileSizeInBytes = stats.size;
  console.log(fileSizeInBytes);
  res.status(200).json(fileSizeInBytes);
}
