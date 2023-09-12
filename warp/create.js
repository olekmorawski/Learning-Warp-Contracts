import { configureWallet, warp } from "./configureWarpServer.js";
import { transactionId } from "../transactionid.js";
import { v4 as uuid } from "uuid";

async function createPost() {
  let wallet = await configureWallet();
  const contract = warp.contract(transactionId).connect(wallet);

  await contract.writeInteraction({
    function: "createPost",
    post: {
      title: "Hi from the first post",
      content: "This is my first post",
      id: uuid(),
    },
  });
}

createPost();
