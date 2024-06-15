import axios from 'axios';
import { BEARER_TOKEN } from '../config/config';



export const getTwitterFollowers = async (username) => {
  try {
    const response = await axios.get(`https://api.twitter.com/2/users/by/username/${username}`, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    });
    const userId = response.data.data.id;

    const followersResponse = await axios.get(`https://api.twitter.com/2/users/${userId}/followers`, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    });

    return followersResponse.data.meta.result_count;
  } catch (error) {
    console.error('Error fetching Twitter followers:', error);
    return 0;
  }
};
