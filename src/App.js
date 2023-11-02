import React, { useState, useEffect } from "react";
import { getStuff } from "./regularAsyncModule";
import { loadXHR, blobToBase64, sleep } from "./helpers";

function App() {
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

    await sleep(2000);

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
          <button onClick={clickMe}>Click Me</button>
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
