import React, { useState, useEffect } from "react";
import { getStuff } from "./regularAsyncModule";
import { loadXHR, blobToBase64, sleep } from "./helpers";

import Uppy from "@uppy/core";
import FileInput from "@uppy/file-input";

const uppy = new Uppy();
uppy.use(FileInput, {
  // Options
});

function App() {
  const doSomethingWithFirstFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];

      // const fileReader = new FileReader();
      // fileReader.onloadend = () => {
      //   if (fileReader.result) {
      //     // as specified in the readme it is assumed any uploaded file will be a well formed taps.json
      //     setTapsInput((JSON.parse(fileReader.result as string) as TapContainer).taps);
      //   }
      // };
      // if (uploadedFile !== undefined) {
      //   fileReader.readAsText(uploadedFile);
      // }
    }
  };

  const [base64ImageProcessed, setBase64ImageProcessed] = useState("");
  const [base64ImageOriginal, setBase64ImageOriginal] = useState("");

  useEffect(() => {
    const doProcessing = async () => {
      console.log("the original is ready for processing");
      const result = await getStuff(base64ImageOriginal);
      setBase64ImageProcessed(result);
    };

    if (base64ImageOriginal) {
      doProcessing();
    }
  }, [base64ImageOriginal]);

  const clickMe = async () => {
    console.log("I will load the original");

    await sleep(1000);

    const myBlob = await loadXHR("/creditcard.png");
    const myBase64 = await blobToBase64(myBlob);

    console.log("now I have loaded the original");

    setBase64ImageOriginal(myBase64);
  };

  return (
    <div className="App">
      <header className="App-header">
        {base64ImageOriginal && !base64ImageProcessed && (
          <img src={base64ImageOriginal} className="App-logo" alt="logo" />
        )}

        {base64ImageProcessed && (
          <img src={base64ImageProcessed} className="App-logo" alt="logo" />
        )}

        <p>
          <button onClick={clickMe}>Load then process card</button>
        </p>

        <p>
          Do something with first file uploaded
          <input type="file" onChange={(e) => doSomethingWithFirstFile(e)} />
        </p>
      </header>
    </div>
  );
}

export default App;
