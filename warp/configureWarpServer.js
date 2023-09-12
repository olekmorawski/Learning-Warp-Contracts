import { WarpFactory } from "warp-contracts";
import { DeployPlugin } from "warp-contracts-plugin-deploy";
import { ArweaveSigner } from "warp-contracts-plugin-deploy";
import fs from "fs";

const enviroment = process.env.WARPENV || "testnet";
let warp;

if (enviroment === "testnet") {
  warp = WarpFactory.forTestnet().use(new DeployPlugin());
} else if (enviroment === "mainnet") {
  warp = WarpFactory.forMainnet();
} else {
  throw Error("enviroment not set properly...");
}

async function configureWallet() {
  try {
    let walletJSON;
    if (enviroment === "testnet") {
      try {
        walletJSON = JSON.parse(fs.readFileSync("../testwallet.json", "utf-8"));
      } catch (error) {
        const { jwk } = await warp.generateWallet();
        fs.writeFileSync("../testwallet.json", JSON.stringify(jwk));
        walletJSON = jwk;
      }
    } else if (enviroment === "mainnet") {
      walletJSON = JSON.parse(fs.readFileSync("../wallet.json", "utf-8"));
    } else {
      throw Error("Environment not set properly...");
    }
    return new ArweaveSigner(walletJSON);
  } catch (error) {
    console.log("Error configurating wallet: ", error);
  }
}

export { configureWallet, warp };
