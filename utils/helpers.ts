import axios from 'axios';

export const convertUrlToBlob = async (url: string): Promise<Blob | null> => {
  try {
    const response = await axios.get('/api/convert', {
      responseType: 'arraybuffer',
      headers: {
        // headers key 는 소문자로만 작성한다. 대문자로 작성해도 소문자로 됨.
        url: url,
      },
    });

    return new Blob([response.data], { type: 'image/*' });
  } catch (err) {
    console.log(err);
    return null;
  }
};
