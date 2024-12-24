import CryptoJS from "crypto-js";


const apiurl = import.meta.env.VITE_API_URL;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
const agentCode = "TBC";
const requestType = "DASHBRD";


const securityKey = CryptoJS.MD5(`${agentCode}|${accessToken}`).toString();

const handleGetRequest = async () => {
  try {
    const res = await fetch(apiurl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Security-Key': securityKey,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }


    const data = await res.json();

    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Error during GET request:', error);
  }
};
