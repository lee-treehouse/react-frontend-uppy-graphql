import { loadXHR, blobToBase64, sleep } from "./helpers";

export const getStuff = async (original) => {
  console.log("now i'll get the redacted");

  await sleep(4000);

  const myBlob = await loadXHR("/creditcard_redacted.png");
  const myBase64 = await blobToBase64(myBlob);

  console.log("now I have loaded the redacted");

  return myBase64;
};
