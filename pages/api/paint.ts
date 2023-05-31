import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PaintData, ResultPaintData } from '../../lib/type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResultPaintData>) {
  try {
    const payload: PaintData = req.body;
    console.log('payload: ', payload);
    res.status(200).json({
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg',
    });
    // await axios.post('https://modulabchatgpt--hyanskygg.repl.co/api/paint', payload);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      url: '',
    });
  }
}
