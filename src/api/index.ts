import express from "express";
import { getItemOfTokenByIndex, getAllItems } from "./contract";
import fs from "fs";
import path from "path";
import { renderKLoot } from "../renderer/renderer";

const app = express();

const port = process.env.PORT || 3000;

const generatedPath = "generated";

app.use("/token", express.static(generatedPath));
app.get("/token/:tokenId.svg", async (req, res) => {
  const { tokenId } = req.params;
  try {
    //get all items from bag
    const bag = await getAllItems(tokenId);
    //render bag image
    const rendered = await renderKLoot(bag);
    //save bag to file if not exist
    const outputFilePath = path.join(
      generatedPath,
      `${req.params.tokenId}.svg`
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
  console.log("server is connected");
});
