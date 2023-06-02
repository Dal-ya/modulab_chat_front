import axios from 'axios';

export const convertUrlToBlob = async (url: string): Promise<Blob | null> => {
  try {
    const url2 =
      'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Ph85WouTtfDQipvs4Z98jYMC/user-q9RH68hpJ4Gd8TQqR3FsQUlH/img-l6ipnV8XV4qPBcGQnFodK1b0.png?st=2023-06-02T06%3A48%3A03Z&se=2023-06-02T08%3A48%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-01T21%3A01%3A07Z&ske=2023-06-02T21%3A01%3A07Z&sks=b&skv=2021-08-06&sig=tlTBUTLjhICkKzZjoUz1TWDKjxWt8IjJjHOdJF7jDWo%3D';
    const response = await axios.get('/api/convert?imgUrl=' + url2, {
      responseType: 'arraybuffer',
    });

    return new Blob([response.data], { type: 'image/*' });
  } catch (err) {
    console.log(err);
    return null;
  }
};
