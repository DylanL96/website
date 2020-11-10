import axios from 'axios';

//HTTP Post Request
export const postDataForm = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = await axios.post('/admin/create', data, config);

  return response
}