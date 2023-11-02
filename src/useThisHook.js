import { useEffect, useState } from "react";
import { getStuff } from "./regularAsyncModule";
import { sleep } from "./helpers";

export const useThisHook = (file, setter) => {
  useEffect(() => {
    const doIt = async () => {
      if (file) {
        const stuff = await getStuff(file);
        setter(stuff);
        await sleep(1000);
      }
    };
    doIt();
  }, [file, setter]);
};
