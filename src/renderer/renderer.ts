import { createCanvas, loadImage, NodeCanvasRenderingContext2D } from "canvas";
import { ItemInfo, kLootInfo } from "./kLoot";

export async function renderKLoot(kLoot: kLootInfo) {
  const [width, height] = [350, 350];
  // const [width, height] = [272, 442];
  const canvas = createCanvas(width, height);

  const ctx = canvas.getContext("2d");

  //1 draw background
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, width, height);
  const bg = await loadImage("assets/bg.png");
  ctx.drawImage(bg, 0, 0, width, height);
  const offset = 30;
  //item0
  renderText(kLoot.Nature1, ctx, width / 2, 40 + offset);
  //item1
  renderText(kLoot.Nature2, ctx, width / 2, 60 + offset);
  //item2
  renderText(kLoot.Nature3, ctx, width / 2, 80 + offset);
  //item3
  renderText(kLoot.Mineral1, ctx, width / 2, 100 + offset);
  //item4
  renderText(kLoot.Mineral2, ctx, width / 2, 120 + offset);
  //item5
  renderText(kLoot.Mineral3, ctx, width / 2, 140 + offset);
  //item6
  renderText(kLoot.Monster1, ctx, width / 2, 160 + offset);
  //item7
  renderText(kLoot.Monster2, ctx, width / 2, 180 + offset);
  //item8
  renderText(kLoot.Monster3, ctx, width / 2, 200 + offset);
  //item9
  renderText(kLoot.Monster3, ctx, width / 2, 220 + offset);

  return canvas.toBuffer();
}

function hasRarity(item: ItemInfo) {
  return item.rarity !== "" ? true : false;
}

function renderText(
  item: ItemInfo,
  ctx: NodeCanvasRenderingContext2D,
  x: number,
  y: number
) {
  ctx.font = "14px serif";
  if (hasRarity(item)) {
    ctx.fillStyle = item.rarity || "";
  } else {
    ctx.fillStyle = "white";
  }
  ctx.textAlign = "center";
  ctx.fillText(item.name, x, y);
}
