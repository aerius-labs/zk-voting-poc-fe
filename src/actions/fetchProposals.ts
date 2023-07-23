import axios from 'axios';

export async function fetchDataFromCID(cid: string) {
  // Replace with the IPFS gateway you are using
  const ipfsGateway = 'https://ipfs.io/ipfs/';

  try {
    const response = await axios.get(ipfsGateway + cid);
    const data = response.data;
    
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
