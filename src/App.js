// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";

import React, { useState, useEffect } from "react";
import { loadXHR, blobToBase64, sleep } from "./helpers";

const GET_WARRIOR = gql`
  query GetWarrior($id: String!) {
    warrior() {
      id
      name
      data
    }
  }
`;

function App() {

  const [base64ImageProcessed, setBase64ImageProcessed] = useState("");
  const [base64ImageOriginal, setBase64ImageOriginal] = useState("");


  const { loading, error, data} = useQuery(GET_CARD, {variables: {id: base64ImageOriginal ? "001" : ""}});

  useEffect(() => {
    console.log("I fire when data returned from the graphql hook changes")
    if (data?.card)
    {
      console.log("data from graph ql has given me an image")
      setBase64ImageProcessed(data.card.data)
    }
  }, [data]);

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
      
      {loading && (<p>Loading</p>)}
      {error && (<p>Error! {error.message}</p>)}

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
