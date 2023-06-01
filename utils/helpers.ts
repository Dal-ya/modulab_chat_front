import axios from 'axios';

export const convertUrlToBlob = async (url: string): Promise<Blob | null> => {
  try {
    const res = await axios.get('/api/convert');
    return res.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
