import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PaintData, ResultPaintData } from '../../lib/type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResultPaintData>) {
  try {
    const payload: PaintData = req.body;
    console.log('payload: ', payload);
    res.status(200).json({
      url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Ph85WouTtfDQipvs4Z98jYMC/user-q9RH68hpJ4Gd8TQqR3FsQUlH/img-OzhvUSL1cfohuKJeAAoKuOWV.png?st=2023-06-01T07%3A36%3A17Z&se=2023-06-01T09%3A36%3A17Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A31%3A41Z&ske=2023-06-01T20%3A31%3A41Z&sks=b&skv=2021-08-06&sig=kEOzv2tU1Di4wjN2zJkbdTIFOnAa5u3agiLh03wzB1g%3D',
    });
    // await axios.post('https://modulabchatgpt--hyanskygg.repl.co/api/paint', payload);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      url: '',
    });
  }
}
