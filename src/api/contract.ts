import { providers, Contract } from "ethers";
import { abi, address } from "../blockchain/kLootContractABI";
import { bkcTestnetInfo, bkcMainnetInfo } from "../blockchain/provider";
import { ItemInfo, kLootInfo } from "../renderer/kLoot";

const bkcTestnetProvider = new providers.JsonRpcProvider(bkcTestnetInfo.rpc, {
  chainId: bkcTestnetInfo.chainId,
  name: bkcTestnetInfo.name,
});

const contract = new Contract(address, abi, bkcTestnetProvider);

export async function getItemOfTokenByIndex(
  tokenId: string,
  itemIndex: number
): Promise<ItemInfo> {
  let item: ItemInfo = {
    name: "",
    rarity: "",
  };
  switch (itemIndex) {
    case 0: {
      [item.name, item.rarity] = await contract.getNature1(tokenId);
      break;
    }
    case 1: {
      [item.name, item.rarity] = await contract.getNature2(tokenId);
      break;
    }
    case 2: {
      [item.name, item.rarity] = await contract.getNature3(tokenId);
      break;
    }
    case 3: {
      [item.name, item.rarity] = await contract.getMineral1(tokenId);
      break;
    }
    case 4: {
      [item.name, item.rarity] = await contract.getMineral2(tokenId);
      break;
    }
    case 5: {
      [item.name, item.rarity] = await contract.getMineral2(tokenId);
      break;
    }
    case 6: {
      [item.name, item.rarity] = await contract.getMineral3(tokenId);
      break;
    }
    case 7: {
      [item.name, item.rarity] = await contract.getMonster1(tokenId);
      break;
    }
    case 8: {
      [item.name, item.rarity] = await contract.getMonster2(tokenId);
      break;
    }
    case 9: {
      [item.name, item.rarity] = await contract.getMonster3(tokenId);
      break;
    }
    default:
      break;
  }

  return item;
}

export async function getAllItems(tokenId: string): Promise<kLootInfo> {
  const item0 = await getItemOfTokenByIndex(tokenId, 0);
  const item1 = await getItemOfTokenByIndex(tokenId, 1);
  const item2 = await getItemOfTokenByIndex(tokenId, 2);
  const item3 = await getItemOfTokenByIndex(tokenId, 3);
  const item4 = await getItemOfTokenByIndex(tokenId, 4);
  const item5 = await getItemOfTokenByIndex(tokenId, 5);
  const item6 = await getItemOfTokenByIndex(tokenId, 6);
  const item7 = await getItemOfTokenByIndex(tokenId, 7);
  const item8 = await getItemOfTokenByIndex(tokenId, 8);
  return {
    tokenId,
    Nature1: item0,
    Nature2: item1,
    Nature3: item2,
    Mineral1: item3,
    Mineral2: item4,
    Mineral3: item5,
    Monster1: item6,
    Monster2: item7,
    Monster3: item8,
  };
}
