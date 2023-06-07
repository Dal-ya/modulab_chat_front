import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PaintData, ResultPaintData } from '../../lib/type';

// TODO: 불안정한 코드이므로, 추후에 수정할 것
const LIMIT_COUNT = 999;
let REQUEST_COUNT = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResultPaintData>) {
  try {
    if (REQUEST_COUNT >= LIMIT_COUNT) {
      return res.status(200).json({ url: 'LIMIT' });
    }

    const payload: PaintData = req.body;

    const response = await axios.post(process.env.API_URL || '', payload);
    REQUEST_COUNT++;

    if (response.data.success) {
      return res.status(200).json({ url: response.data.data[0].url });
    } else {
      throw new Error('failed fetch image url from server');
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({
      url: '',
    });
  }
}
