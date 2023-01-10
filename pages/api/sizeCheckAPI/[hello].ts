// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
var fs = require("fs"); // Load the filesystem module

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  var fileSizeInBytes = 0;
  try {
    var stats = fs.statSync("/Roboto-Regular.ttf");

    if (req.query.hello === "imageFile") {
      stats = fs.statSync("/next.svg");
    }

    fileSizeInBytes = stats.size;
    console.log(fileSizeInBytes);
  } catch (err) {
    console.log(JSON.stringify(err));
  }

  res.status(200).json(fileSizeInBytes);
}
