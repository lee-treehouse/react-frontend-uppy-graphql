import { sleep } from "./helpers";


export const getStuff = async (original) => {
   console.log("now i'll get the redacted");

   await sleep(2000);

  const dataFromGraphQL = await queryGraphQLServer();

  console.log("now I have loaded the redacted");

   return dataFromGraphQL;
};


async function queryGraphQLServer() {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: '{ warriors { data } }',
    }),
  })
  const data = await response.json()
  
  return data.data.warriors[0].data
}

