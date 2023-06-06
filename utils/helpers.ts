import axios from 'axios';

export const convertUrlToBlob = async (url: string): Promise<Blob | null> => {
  try {
    const response = await axios.get('/api/convert', {
      responseType: 'arraybuffer',
      headers: {
        url: url,
      },
    });

    return new Blob([response.data], { type: 'image/*' });
  } catch (err) {
    console.log(err);
    return null;
  }
};
