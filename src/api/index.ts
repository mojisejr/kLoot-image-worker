import express, { Request, Response } from "express";
import { getAllItems } from "./contract";
import fs from "fs";
import path from "path";
import { renderKLoot } from "../renderer/renderer";
import { kLootInfo } from "../renderer/kLoot";

const app = express();

const port = process.env.PORT || 8080;

const generatedPath = "generated";

app.use("/token", express.static(generatedPath));
app.get("/token/:tokenId.png", async (req: Request, res: Response) => {
  const { tokenId } = req.params;
  try {
    //get all items from bag
    const bag: kLootInfo = await getAllItems(tokenId);
    //render bag image
    const rendered = await renderKLoot(bag);
    //save bag to file if not exist
    const outputFilePath = path.join(
      generatedPath,
      `${req.params.tokenId}.png`
    );
    fs.writeFile(outputFilePath, rendered, (err) => {
      if (err) {
        console.error(
          `There was an error in writing card image to ${outputFilePath}`,
          err
        );
      } else {
        console.log(`successfully wrote card image to ${outputFilePath}`);
      }
    });
    res.status(200).end(rendered);
  } catch (e: any) {
    res.status(400).json({
      result: "error",
      message: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`server is connecting on port ${port}`);
});
