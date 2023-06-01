import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(
      'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Ph85WouTtfDQipvs4Z98jYMC/user-q9RH68hpJ4Gd8TQqR3FsQUlH/img-w61FqhWzbrYtXZ8FIXotarJo.png?st=2023-06-01T06%3A23%3A41Z&se=2023-06-01T08%3A23%3A41Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A33%3A49Z&ske=2023-06-01T20%3A33%3A49Z&sks=b&skv=2021-08-06&sig=GRQS6glVM3BdXcKVvMVc3P18LHlXHGj0uOw7b4AIRGw%3D',
      { responseType: 'blob' },
    );

    return res.status(200).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(200).json({ data: null });
  }
}
