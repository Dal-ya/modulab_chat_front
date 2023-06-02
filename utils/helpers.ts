import axios from 'axios';

export const convertUrlToBlob = async (url: string): Promise<Blob | null> => {
  try {
    const url2 =
      'https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg';
    const response = await axios.get('/api/convert?imgUrl=' + url2);
    console.log('helpers res data: ', response.data);

    return new Blob([response.data.data], { type: 'image/*' });
  } catch (err) {
    console.log(err);
    return null;
  }
};
