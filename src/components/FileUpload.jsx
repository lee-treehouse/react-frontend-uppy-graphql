// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";

import React, { useState, useEffect } from "react";
import { loadXHR, blobToBase64, sleep } from "../helpers";

const GET_WARRIOR = gql`
  query asyncGetWarrior($id: String!) {
    asyncGetWarrior(id: $id) {
      id
      name
      data
    }
  }
`;

// const GET_WARRIOR = gql`
//   query getWarrior($id: String!) {
//     getWarrior(id: $id) {
//       id
//       name
//       data
//     }
//   }
// `;

function FileUpload() {
  const [base64ImageProcessed, setBase64ImageProcessed] = useState("");
  const [base64ImageOriginal, setBase64ImageOriginal] = useState("");

  const { loading, error, data } = useQuery(GET_WARRIOR, {
    variables: { id: base64ImageOriginal ? "001" : "" },
  });

  useEffect(() => {
    console.log("I fire when data returned from the graphql hook changes");
    if (data?.getWarrior) {
      console.log("data from graph ql has given me an image");
      setBase64ImageProcessed(data.getWarrior.data);
    }
    if (data?.asyncGetWarrior) {
      console.log("data from graph ql has given me an image");
      setBase64ImageProcessed(data.asyncGetWarrior.data);
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
      <h1>File Upload</h1>
      {loading && <p>Loading</p>}
      {error && <p>Error! {error.message}</p>}

      {base64ImageOriginal && !base64ImageProcessed && (
        <img src={base64ImageOriginal} className="App-logo" alt="logo" />
      )}

      {base64ImageProcessed && (
        <img src={base64ImageProcessed} className="App-logo" alt="logo" />
      )}

      <p>
        <button onClick={clickMe}>Load then process card</button>
      </p>
    </div>
  );
}

export default FileUpload;