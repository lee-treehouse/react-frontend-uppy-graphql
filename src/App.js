
// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

import React, { useState, useEffect } from "react";
import { getStuff } from "./regularAsyncModule";
import { loadXHR, blobToBase64, sleep } from "./helpers";

const GET_LOCATIONS = gql`
  query GetLocations {
    warriors {
      id
      name
      data
    }
  }
`;


function App() {
  const [base64ImageProcessed, setBase64ImageProcessed] = useState("");
  const [base64ImageOriginal, setBase64ImageOriginal] = useState("");


  const { loading, error, data } = useQuery(GET_LOCATIONS);


  useEffect(() => {
    console.log("I fire when data changes")
  }, [data]);



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
      

      {loading && (<p>Loading</p>)}
      
      {error && (<p>Error! {error.message}</p>)}


      {data && data.warriors &&  data.warriors.map(({ id, name, data}) => (
      <div key={id}>
        <h3>{name}</h3>
        <img src={data} className="App-logo" alt="logo" />
     </div>
      ))}





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
