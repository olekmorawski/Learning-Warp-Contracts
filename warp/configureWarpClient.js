import { WarpFactory } from "warp-contracts";
import { transactionId } from "../transactionid";
import wallet from "testwallet";
import Error from "next/error";

const enviroment = process.env.NEXT_PUBLIC_WARPENV || "testnet";
let warp;
let contract;

async function getContract() {
  if (enviroment === "testnet") {
    warp = WarpFactory.forTestnet();
    contract = warp.contract(transactionId).connect(wallet);
  } else if (enviroment === "mainnet") {
    warp = WarpFactory.forMainnet();
    contract = warp.contract(transactionId).connect();
  } else {
    throw new Error("badly configured");
  }
  return contract;
}

export { getContract };
