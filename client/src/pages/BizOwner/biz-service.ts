// Import Axios
import axios from 'axios';

// Define the API endpoint URL
const apiUrl = 'http://localhost:3000/api/enquiries/insertEnquiry';


//http://localhost:3000/api/enquiries/insertEnquiry
// Data to send in the POST request (example data)
const postData = {
  uid: 'B0031',
  subject: 'No one can hear me',
  desc : 'ANEEEEHHH WERRYY ANGRYYY!!!!!!!'
};



// Function to make a POST request
async function postDataToApi() {
  try {
    // Use Axios to make the POST request
    const response = await axios.post(apiUrl, postData);

    // Handle the response data
    const data = response.data;
    console.log(data);

    // You can work with the response data here
  } catch (error) {
    // Handle errors
    console.error('An error occurred:', error);
  }
}

export { postDataToApi };