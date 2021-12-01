export interface kLootInfo {
  tokenId: string;
  Nature1: ItemInfo;
  Nature2: ItemInfo;
  Nature3: ItemInfo;
  Mineral1: ItemInfo;
  Mineral2: ItemInfo;
  Mineral3: ItemInfo;
  Monster1: ItemInfo;
  Monster2: ItemInfo;
  Monster3: ItemInfo;
}

export interface ItemInfo {
  name: string;
  rarity?: string;
}
