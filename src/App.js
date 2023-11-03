
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React, { useState, useEffect } from "react";
import { getStuff } from "./regularAsyncModule";
import { loadXHR, blobToBase64, sleep } from "./helpers";

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

function App() {
  const [base64ImageProcessed, setBase64ImageProcessed] = useState("");
  const [base64ImageOriginal, setBase64ImageOriginal] = useState("");

  client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));

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
      </header>
    </div>
  );
}

export default App;
