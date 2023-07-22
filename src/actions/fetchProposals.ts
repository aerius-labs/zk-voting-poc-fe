import axios from 'axios';

export async function fetchDataFromCID(cid: string) {
  // Replace with the IPFS gateway you are using
  const ipfsGateway =
    'https://crimson-psychological-fox-104.mypinata.cloud/ipfs/';

  try {
    const response = await axios.get(ipfsGateway + cid);
    const data = response.data;

    // Return an object containing the required properties
    return {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
    };
  } catch (error) {
    console.error('Error fetching data from IPFS', error);
    return null;
  }
}
